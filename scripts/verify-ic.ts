import { getPassportActor } from "../src/integrations/ic/agent";

async function main() {
  try {
    console.log('🔍 Testing IC canister connection...');
    
    const actor = await getPassportActor();
    
    // Test basic connectivity
    console.log('📋 Listing certificates...');
    const certificates = await actor.list(0, 5);
    console.log(`Found ${certificates.length} certificates`);
    
    if (certificates.length > 0) {
      const firstCert = certificates[0];
      console.log(`\n🧪 Testing verification for: ${firstCert.id}`);
      
      const verification = await actor.verify(firstCert.id);
      console.log('Verification result:', {
        valid: verification.valid,
        status: verification.status,
        reason: verification.reason || 'None'
      });
      
      console.log('\n📄 Certificate details:');
      console.log(`- Product: ${firstCert.productName}`);
      console.log(`- Origin: ${firstCert.origin}`);
      console.log(`- Issuer: ${firstCert.issuer}`);
      console.log(`- Batch: ${firstCert.batchNumber}`);
      console.log(`- Issued: ${new Date(Number(firstCert.issuedAt)).toLocaleDateString()}`);
      console.log(`- Expires: ${new Date(Number(firstCert.expiresAt)).toLocaleDateString()}`);
      console.log(`- Revoked: ${firstCert.revoked}`);
    }
    
    // Test non-existent certificate
    console.log('\n🔍 Testing non-existent certificate...');
    const nonExistent = await actor.verify('NON-EXISTENT-001');
    console.log('Non-existent verification:', {
      valid: nonExistent.valid,
      status: nonExistent.status,
      reason: nonExistent.reason || 'None'
    });
    
    console.log('\n✅ IC canister is working correctly!');
    
  } catch (error) {
    console.error('❌ IC canister test failed:', error);
    process.exit(1);
  }
}

main();