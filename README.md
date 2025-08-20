# AgriQ Digital Passport

Tamperproof agricultural batch & certificate verification using a hybrid architecture: Supabase for rich relational + auth, Internet Computer (ICP) canister for immutable integrity + status.

##  Summary
AgriQ empowers exporters, quality auditors, and importers to issue, manage, and verify digital quality certificates. Core certificate fields + revocation+expiry logic live on-chain in `passport_registry` ensuring transparency and antitamper guarantees. Extended metadata (profiles, analytics) stays in Supabase for flexibility & speed.

##  Architecture
Frontend (React + Vite + shadcn-ui)  Supabase Edge Functions (issue / verify)  ICP Canister (Motoko) for anchoring & verification status.

```
[User] -> [React UI] --(HTTPS)--> [Supabase Functions] --(Agent)--> [ICP Canister]
                                 |                               
                                 +--> [Supabase DB / Auth]
```

##  Canister `passport_registry`
Motoko actor storing minimal certificate records and providing:
- `upsert` create/update
- `verify` returns {valid,status,reason,certificate}
- `get`
- `list`

##  Integrity & Roadmap
Current: On-chain anchor of critical fields + status.
Planned (priority):
1. Content hash anchoring of full batch JSON
2. Revocation event log + audit trail
3. DID / II integration (issuer identity)
4. Merkle aggregation for large batch sets
5. DAO policy governance for revocations

##  Stack
React, TypeScript, Vite, Tailwind, shadcn-ui, @tanstack/react-query, Supabase, ICP (Motoko), @dfinity/agent.

##  Local Development
```powershell
npm install
npm run ic:start      # start local ICP replica
npm run ic:deploy     # deploy canister, writes .ic-env
# copy CANISTER_ID for passport_registry into .env.local as VITE_PASSPORT_CANISTER_ID
npm run ic:seed       # seed demo certificate AGR-2024-001
npm run dev           # start frontend (http://localhost:8080)
```
Visit /verify and test AGR-2024-001.

##  Environment (.env.local)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_PASSPORT_CANISTER_ID=
VITE_IC_HOST=http://127.0.0.1:4943
```

##  Scripts
| Script | Purpose |
|--------|---------|
| ic:start | Start local replica |
| ic:deploy | Deploy canister(s) |
| ic:generate | Generate bindings (optional) |
| ic:seed | Seed sample certificate |
| dev:full | Start replica, deploy, run Vite |

##  Verification Flow
1. User enters certificate ID.
2. Supabase edge function verify (off-chain business logic / enrichment).
3. Frontend cross-checks ICP `verify` for authoritative status (revoked/expired/valid).
4. UI merges results.


##  Business Model
Usage-based (per certificate issuance) + analytics tier + enterprise compliance integration (API SLAs). Future marketplace for auditor plugins.

##  Roadmap (High Level)
- Q3: Hash anchoring, revocation UI
- Q4: DID & Merkle proofs
- Q1: DAO governance + auditor marketplace

## 📈 Round Changelog
See `CHANGELOG.md` for features added this hackathon round.

## 🤝 Contributing
PRs welcome. Run `npm run lint`. Follow conventional commits.

## 🛡 Security Notes
No private keys in client. Future: ECDSA signing via canister or wallet; DID for issuer auth.

