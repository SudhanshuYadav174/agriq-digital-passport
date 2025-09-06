import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory } from '../../ic/passport_registry/declarations';

// Get canister ID from environment or default for local development
const PASSPORT_CANISTER_ID = import.meta.env.VITE_PASSPORT_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai';
const IC_HOST = import.meta.env.VITE_IC_HOST || 'https://ic0.app';

export const getPassportActor = async () => {
  const agent = new HttpAgent({
    host: IC_HOST,
  });

  // Fetch root key for local development
  if (IC_HOST.includes('127.0.0.1') || IC_HOST.includes('localhost')) {
    await agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: Principal.fromText(PASSPORT_CANISTER_ID),
  });
};
