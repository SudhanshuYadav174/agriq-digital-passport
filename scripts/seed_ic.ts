import { getPassportActor } from "../src/integrations/ic/agent";
(async () => {
  try {
    const actor = await getPassportActor();
    const now = Date.now();
    await actor.upsert({
      id: 'AGR-2024-001',
      batchNumber: 'BAT-2024-001',
      productName: 'Premium Organic Rice',
      origin: 'Punjab, India',
      issuer: 'Green Valley Farms',
      issuedAt: BigInt(now),
      expiresAt: BigInt(now + 31536000000),
      revoked: false
    });
    console.log('Seeded certificate AGR-2024-001');
  } catch (e) { console.error('Seed failed', e); process.exit(1); }
})();
