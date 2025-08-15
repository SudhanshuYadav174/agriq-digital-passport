import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "@/ic/passport_registry/declarations";

const CANISTER_ID = import.meta.env.VITE_PASSPORT_CANISTER_ID || (window as any).PASSPORT_CANISTER_ID;
let cached: any;
export const getPassportActor = async () => {
  if (cached) return cached;
  if (!CANISTER_ID) throw new Error("Passport canister ID not set");
  const host = import.meta.env.VITE_IC_HOST || "http://127.0.0.1:4943";
  const agent = new HttpAgent({ host });
  if (import.meta.env.DEV && host.includes("127.0.0.1")) {
    try { await agent.fetchRootKey(); } catch { console.warn('Local root key fetch failed'); }
  }
  cached = Actor.createActor(idlFactory as any, { agent, canisterId: CANISTER_ID });
  return cached;
};
