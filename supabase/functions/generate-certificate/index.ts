import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import QRCode from "https://esm.sh/qrcode@1.5.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CertificateRequest {
  batchId: string;
  qualityScore: number;
  testResults: any;
  notes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { batchId, qualityScore, testResults, notes }: CertificateRequest = await req.json();

    console.log('Generating certificate for batch:', batchId);

    // Get batch information
    const { data: batch, error: batchError } = await supabaseClient
      .from('batches')
      .select('*')
      .eq('id', batchId)
      .single();

    if (batchError || !batch) {
      throw new Error('Batch not found');
    }

    // Generate certificate number
    const certificateNumber = `AGR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create Verifiable Credential (W3C compliant)
    const verifiableCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://w3id.org/traceability/v1"
      ],
      "type": ["VerifiableCredential", "AgricultureQualityCertificate"],
      "issuer": {
        "id": "did:web:agriqcert.com",
        "name": "AgriQCert Quality Assurance"
      },
      "issuanceDate": new Date().toISOString(),
      "expirationDate": new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(), // 1 year from now
      "credentialSubject": {
        "id": `did:example:batch-${batchId}`,
        "type": "AgriculturalProduct",
        "product": {
          "name": batch.product_name,
          "type": batch.product_type,
          "quantity": batch.quantity,
          "unit": batch.unit,
          "harvestDate": batch.harvest_date,
          "originLocation": batch.origin_location,
          "batchNumber": batch.batch_number
        },
        "qualityAssessment": {
          "score": qualityScore,
          "testResults": testResults,
          "notes": notes,
          "assessmentDate": new Date().toISOString()
        },
        "certificateNumber": certificateNumber
      }
    };

    // Generate QR code for verification
    const verificationUrl = `https://agriqcert.com/verify?cert=${certificateNumber}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: '#16a34a',
        light: '#ffffff'
      }
    });

    // Insert certificate into database
    const { data: certificate, error: certError } = await supabaseClient
      .from('certificates')
      .insert({
        batch_id: batchId,
        certificate_number: certificateNumber,
        issued_by: req.headers.get('x-user-id'),
        issued_to: batch.user_id,
        expiry_date: verifiableCredential.expirationDate,
        vc_data: verifiableCredential,
        qr_code: qrCodeDataUrl,
        digital_signature: `signature_${certificateNumber}` // In production, use proper digital signature
      })
      .select()
      .single();

    if (certError) {
      throw new Error(`Failed to create certificate: ${certError.message}`);
    }

    // Update batch status
    await supabaseClient
      .from('batches')
      .update({ 
        status: qualityScore >= 70 ? 'approved' : 'rejected',
        certificate_id: certificate.id,
        qr_code: qrCodeDataUrl
      })
      .eq('id', batchId);

    console.log('Certificate generated successfully:', certificateNumber);

    return new Response(JSON.stringify({
      success: true,
      certificate: {
        id: certificate.id,
        certificateNumber,
        qrCode: qrCodeDataUrl,
        verifiableCredential,
        verificationUrl
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error generating certificate:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate certificate' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});