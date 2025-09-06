import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { 
      email, 
      password, 
      first_name, 
      last_name, 
      role, 
      organization_name, 
      organization_type, 
      country, 
      address 
    } = await req.json()

    console.log('Creating user with email:', email)

    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabaseClient.auth.admin.listUsers()
    
    if (checkError) {
      console.error('Error checking existing users:', checkError)
      throw checkError
    }

    // Check if email already exists
    const emailExists = existingUsers.users.some(user => user.email === email)
    
    if (emailExists) {
      console.log('User with email already exists:', email)
      return new Response(
        JSON.stringify({ 
          error: `User with email ${email} already exists`,
          success: false,
          code: 'email_exists'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    // Create user in auth
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name,
        last_name,
        role
      }
    })

    if (authError) {
      console.error('Auth creation error:', authError)
      throw authError
    }

    console.log('User created in auth, creating profile...')

    // Create profile
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .insert({
        user_id: authData.user.id,
        first_name,
        last_name,
        email,
        role,
        organization_name: organization_name || `${first_name} ${last_name} Organization`,
        organization_type: organization_type || role,
        country: country || 'India',
        address: address || 'Address not provided',
        status: 'active'
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // If profile creation fails, delete the auth user
      await supabaseClient.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    console.log('User and profile created successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: {
          id: authData.user.id,
          email: authData.user.email
        },
        message: `User ${first_name} ${last_name} created successfully` 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating user:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create user',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})