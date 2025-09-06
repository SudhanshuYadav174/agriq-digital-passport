# Internet Computer Canister Deployment Guide

This guide will help you deploy the AgriQ Digital Passport canister to the Internet Computer network.

## Prerequisites

1. **Install DFINITY SDK (dfx)**
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **Verify installation**
   ```bash
   dfx --version
   ```

## Local Development Deployment

### 1. Deploy to Local Replica

```bash
# Make deployment script executable and deploy locally
npm run deploy:ic:local
```

This will:
- Start a local IC replica
- Deploy the passport_registry canister
- Update `.env.local` with the canister ID
- Display the canister ID for reference

### 2. Seed with Sample Data

```bash
npm run seed:ic
```

### 3. Verify Deployment

```bash
npm run verify:ic
```

## Mainnet Deployment

### 1. Create Identity (First Time Only)

```bash
dfx identity new production --storage-mode=plaintext
dfx identity use production
```

### 2. Get Cycles (ICP Tokens Required)

You need ICP tokens to get cycles for deployment:

```bash
# Convert ICP to cycles (you need ICP tokens in your wallet)
dfx ledger account-id
dfx ledger --network ic balance
dfx ledger --network ic create-canister <principal-id> --amount <icp-amount>
```

### 3. Deploy to Mainnet

```bash
npm run deploy:ic:mainnet
```

### 4. Update Frontend Configuration

Copy the canister ID from the deployment output and update your production environment:

```bash
# The deployment script creates .env.production
# Copy these values to your production deployment platform
cat .env.production
```

## Manual dfx Commands

If you prefer using dfx directly:

```bash
# Start local replica
dfx start --background --clean

# Deploy locally
dfx deploy --network local passport_registry

# Deploy to mainnet
dfx deploy --network ic passport_registry

# Get canister ID
dfx canister id passport_registry --network local
dfx canister id passport_registry --network ic

# Call canister functions
dfx canister call passport_registry list '(0, 10)' --network local
```

## Canister Functions

The passport_registry canister provides these functions:

- `upsert(certificate)` - Add or update a certificate
- `get(id)` - Retrieve a certificate by ID
- `verify(id)` - Verify a certificate's validity
- `list(offset, limit)` - List certificates with pagination

## Environment Variables

### Local Development (.env.local)
```
VITE_PASSPORT_CANISTER_ID=rrkah-fqaaa-aaaaa-aaaaq-cai
VITE_IC_HOST=http://127.0.0.1:4943
```

### Production (.env.production)
```
VITE_PASSPORT_CANISTER_ID=<mainnet-canister-id>
VITE_IC_HOST=https://ic0.app
```

## Troubleshooting

### Replica Not Starting
```bash
dfx stop
dfx start --background --clean
```

### Build Errors
```bash
dfx build passport_registry
```

### Checking Canister Status
```bash
dfx canister status passport_registry --network local
dfx canister status passport_registry --network ic
```

### Reset Local State
```bash
dfx stop
rm -rf .dfx
dfx start --background --clean
dfx deploy
```

## Cost Estimation (Mainnet)

- Initial deployment: ~1-2 ICP
- Monthly storage costs: ~0.1 ICP per GB
- Compute costs: ~0.000001 ICP per million instructions

## Next Steps

1. Deploy your canister using the scripts provided
2. Update your frontend environment variables
3. Test the integration using the verify script
4. Monitor your canister's cycles and top up as needed

For more information, visit the [DFINITY Documentation](https://docs.dfinity.org/)