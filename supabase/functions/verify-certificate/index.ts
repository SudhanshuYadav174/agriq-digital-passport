import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const certificateNumber = url.searchParams.get('certificate');

    if (!certificateNumber) {
      throw new Error('Certificate number is required');
    }

    console.log('Verifying certificate:', certificateNumber);

    // Initialize Supabase client (public access for verification)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get certificate with batch information
    const { data: certificate, error } = await supabaseClient
      .from('certificates')
      .select(`
        *,
        batches (
          batch_number,
          product_name,
          product_type,
          quantity,
          unit,
          harvest_date,
          origin_location,
          profiles!batches_user_id_fkey (
            organization_name,
            country
          )
        )
      `)
      .eq('certificate_number', certificateNumber)
      .single();

    if (error || !certificate) {
      return new Response(JSON.stringify({
        valid: false,
        error: 'Certificate not found',
        certificateNumber
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if certificate is expired
    const isExpired = new Date(certificate.expiry_date) < new Date();
    const isRevoked = certificate.status === 'revoked';

    const verificationResult = {
      valid: !isExpired && !isRevoked && certificate.status === 'valid',
      certificateNumber: certificate.certificate_number,
      status: certificate.status,
      issuedDate: certificate.issue_date,
      expiryDate: certificate.expiry_date,
      isExpired,
      isRevoked,
      batch: certificate.batches,
      verifiableCredential: certificate.vc_data,
      qrCode: certificate.qr_code,
      digitalSignature: certificate.digital_signature,
      verificationTimestamp: new Date().toISOString()
    };

    console.log('Certificate verification result:', {
      certificateNumber,
      valid: verificationResult.valid,
      status: certificate.status
    });

    return new Response(JSON.stringify(verificationResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    return new Response(JSON.stringify({
      valid: false,
      error: error.message || 'Verification failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});