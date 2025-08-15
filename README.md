# AgriQ Digital Passport
Tamper-proof agricultural batch & certificate verification: Supabase (rich data) + ICP canister (integrity & status).

## 🚀 Summary
Exporters, auditors, and importers issue & verify quality certificates. Critical fields anchored on Internet Computer for immutability & revocation; full metadata + auth in Supabase.

##  Architecture
React UI  Supabase (Auth, Edge Functions)  ICP Canister (`passport_registry`). Verification calls Supabase function then cross-checks on-chain status.

##  Stack
React, Vite, TypeScript, Tailwind, shadcn-ui, Supabase, ICP (Motoko), @tanstack/react-query.

##  Canister (`passport_registry`)
APIs: upsert, verify, get, list. See `src/ic/passport_registry/main.mo`.

##  Integrity Strategy
- On-chain minimal record (id, product, batch, issuer, times, revoked flag)
- Off-chain extended relational data
- Roadmap: hashed payload anchoring, DID signatures, revocation event log, DAO governance.

## 🧪 Local Dev
```powershell
npm install
npm run ic:start
npm run ic:deploy
# copy canister id from .ic-env to .env.local as VITE_PASSPORT_CANISTER_ID
npm run ic:seed
npm run dev
```
Visit http://localhost:8080/verify and test AGR-2024-001.

##  Env (.env.local)
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_PASSPORT_CANISTER_ID=...
VITE_IC_HOST=http://127.0.0.1:4943

##  Scripts
ic:start | ic:deploy | ic:generate | ic:seed | dev:full

##  Submission Assets (Add before submission)
Demo Video: LINK
Pitch Video: LINK
Deck: docs/pitch-deck.pdf

##  Business Model
Tiered per certificate + analytics & enterprise compliance API.

## 🗺 Roadmap
Q3: Hash anchoring, revocation UI
Q4: DID (Internet Identity), Merkle batch proofs
Q1: DAO governance, auditor plugin marketplace

## 📈 Round Changelog
See `CHANGELOG.md` for new features this round.

## 🤝 Contributing
PRs welcome. Run `npm run lint` before commit.

##  Security Notes
No private keys in client. Future: ECDSA signing & DID integration.

##  Team
Add team bios & roles here.
