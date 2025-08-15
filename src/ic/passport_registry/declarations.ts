export const idlFactory = ({ IDL }: any) => {
  const Certificate = IDL.Record({ id: IDL.Text, batchNumber: IDL.Text, productName: IDL.Text, origin: IDL.Text, issuer: IDL.Text, issuedAt: IDL.Nat, expiresAt: IDL.Nat, revoked: IDL.Bool });
  return IDL.Service({
    upsert: IDL.Func([Certificate],[IDL.Bool],[]),
    get: IDL.Func([IDL.Text],[IDL.Opt(Certificate)],['query']),
    verify: IDL.Func([IDL.Text],[IDL.Record({ valid: IDL.Bool, status: IDL.Text, certificate: IDL.Opt(Certificate), reason: IDL.Opt(IDL.Text) })],['query']),
    list: IDL.Func([IDL.Nat, IDL.Nat],[IDL.Vec(Certificate)],['query'])
  });
};
export const init = ({ IDL }: any) => [];
