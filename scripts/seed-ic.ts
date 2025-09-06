import { getPassportActor } from "../src/integrations/ic/agent";

interface Certificate {
  id: string;
  batchNumber: string;
  productName: string;
  origin: string;
  issuer: string;
  issuedAt: bigint;
  expiresAt: bigint;
  revoked: boolean;
}

const sampleCertificates: Certificate[] = [
  {
    id: 'AGR-2024-001',
    batchNumber: 'BAT-2024-001',
    productName: 'Premium Organic Rice',
    origin: 'Punjab, India',
    issuer: 'Green Valley Farms',
    issuedAt: BigInt(Date.now()),
    expiresAt: BigInt(Date.now() + 31536000000), // 1 year
    revoked: false
  },
  {
    id: 'AGR-2024-002', 
    batchNumber: 'BAT-2024-002',
    productName: 'Organic Coffee Beans',
    origin: 'Colombia, Huila',
    issuer: 'Mountain Coffee Co.',
    issuedAt: BigInt(Date.now()),
    expiresAt: BigInt(Date.now() + 31536000000), // 1 year
    revoked: false
  },
  {
    id: 'AGR-2024-003',
    batchNumber: 'BAT-2024-003', 
    productName: 'Fair Trade Cocoa',
    origin: 'Ghana, Ashanti Region',
    issuer: 'Fair Trade Cocoa Ltd.',
    issuedAt: BigInt(Date.now()),
    expiresAt: BigInt(Date.now() + 31536000000), // 1 year
    revoked: false
  }
];

async function main() {
  try {
    console.log('🌱 Seeding IC canister with sample certificates...');
    
    const actor = await getPassportActor();
    
    for (const cert of sampleCertificates) {
      console.log(`📝 Adding certificate: ${cert.id}`);
      const result = await actor.upsert(cert);
      
      if (result) {
        console.log(`✅ Successfully added certificate: ${cert.id}`);
      } else {
        console.log(`❌ Failed to add certificate: ${cert.id}`);
      }
    }
    
    console.log('🎉 Seeding completed successfully!');
    
    // Verify by listing certificates
    console.log('\n📋 Verifying certificates:');
    const certificates = await actor.list(0, 10);
    console.log(`Found ${certificates.length} certificates in registry`);
    
    for (const cert of certificates) {
      console.log(`- ${cert.id}: ${cert.productName} from ${cert.origin}`);
    }
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();