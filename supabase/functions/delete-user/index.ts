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

    const { user_id } = await req.json()

    if (!user_id) {
      throw new Error('User ID is required')
    }

    // Delete from profiles first (will cascade properly)
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .delete()
      .eq('user_id', user_id)

    if (profileError) {
      console.error('Profile deletion error:', profileError)
      throw profileError
    }

    // Delete from auth (this will cascade to other tables)
    const { error: authError } = await supabaseClient.auth.admin.deleteUser(user_id)

    if (authError) {
      console.error('Auth deletion error:', authError)
      throw authError
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'User deleted successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error deleting user:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to delete user',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})