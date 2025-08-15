import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {
  public type Certificate = {
    id : Text; batchNumber : Text; productName : Text; origin : Text; issuer : Text; issuedAt : Nat; expiresAt : Nat; revoked : Bool;
  };
  stable var certificatesEntries : [(Text, Certificate)] = [];
  let certificates = HashMap.HashMap<Text, Certificate>(64, Text.equal, Text.hash);

  system func preupgrade() { certificatesEntries := Iter.toArray(certificates.entries()); };
  system func postupgrade() { for ((k,v) in certificatesEntries.vals()) { certificates.put(k,v) }; certificatesEntries := []; };

  public shared ({ caller }) func upsert(c : Certificate) : async Bool {
    // TODO: add caller authorization (whitelist / role based)
    certificates.put(c.id, c);
    true
  };

  public query func get(id : Text) : async ?Certificate { certificates.get(id) };

  public query func verify(id : Text) : async { valid: Bool; status: Text; certificate: ?Certificate; reason: ?Text } {
    switch (certificates.get(id)) {
      case (null) { { valid=false; status="not_found"; certificate=null; reason=?"Certificate not found" } };
      case (?c) {
        if (c.revoked) { { valid=false; status="revoked"; certificate=?c; reason=?"Revoked" } }
        else if (Time.now() > c.expiresAt) { { valid=false; status="expired"; certificate=?c; reason=?"Expired" } }
        else { { valid=true; status="valid"; certificate=?c; reason=null } }
      };
    }
  };

  public query func list(offset: Nat, limit: Nat) : async [Certificate] {
    let all = Iter.toArray(certificates.vals());
    let start = if (offset < all.size()) offset else all.size();
    let end = Nat.min(all.size(), start + limit);
    var acc : [Certificate] = [];
    var i = start; while (i < end) { acc := Array.append<Certificate>(acc,[all[i]]); i += 1 }; acc
  };
}
