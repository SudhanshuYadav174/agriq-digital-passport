#!/bin/bash

# Deploy Internet Computer Canister Script
set -e

echo "🚀 Starting IC Canister Deployment"

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "❌ dfx is not installed. Please install the DFINITY SDK first:"
    echo "sh -ci \"\$(curl -fsSL https://internetcomputer.org/install.sh)\""
    exit 1
fi

# Check if we're deploying locally or to mainnet
NETWORK=${1:-local}

if [ "$NETWORK" = "local" ]; then
    echo "📡 Starting local IC replica..."
    dfx start --background --clean
    
    echo "⏳ Waiting for replica to be ready..."
    sleep 5
fi

echo "🏗️  Building and deploying passport_registry canister to $NETWORK..."
dfx deploy --network $NETWORK passport_registry

# Get the canister ID
CANISTER_ID=$(dfx canister id passport_registry --network $NETWORK)
echo "✅ Canister deployed successfully!"
echo "📋 Canister ID: $CANISTER_ID"

# Update environment variables
if [ "$NETWORK" = "local" ]; then
    echo "VITE_PASSPORT_CANISTER_ID=$CANISTER_ID" > .env.local
    echo "VITE_IC_HOST=http://127.0.0.1:4943" >> .env.local
    echo "📝 Updated .env.local with local canister configuration"
else
    echo "VITE_PASSPORT_CANISTER_ID=$CANISTER_ID" > .env.production
    echo "VITE_IC_HOST=https://ic0.app" >> .env.production
    echo "📝 Created .env.production with mainnet canister configuration"
fi

echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Copy the canister ID to your environment variables"
echo "2. Run 'npm run seed-ic' to add sample data"
echo "3. Start your frontend with 'npm run dev'"