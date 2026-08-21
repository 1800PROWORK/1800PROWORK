# Evidence Record — EAS Schema #15 / Sign Document (Sepolia)

**Evidence class:** VERIFIED artifact / contextual correlation only  
**Network:** Ethereum Sepolia  
**Schema:** #15 — Sign Document  
**Schema UID:** `0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80`  
**Created:** 2023-02-23 08:00:36 UTC  
**Creator:** `0x01a93612f26100B6E18a2e3dd57df5c3ccaFeca1`  
**Creation transaction:** `0x27fc6ef0439d11dc2243e2254c9e2da850f3a3c34dc91d70f713361b6a7e0c65`  
**Schema definition:** `bytes32 hashOfDocument,string note`  
**On-chain attestations reported by EAS Scan:** 190

## Primary-source observation

EAS Scan identifies this exact schema as Schema #15, named “Sign Document”, and reports the UID, creator, creation timestamp, transaction, schema fields, and current on-chain attestation count. This establishes the schema as a real Sepolia EAS artifact. It does **not**, by itself, establish any relationship to the investigated Mainnet/Base addresses.

## Example attestation

EAS Scan records an on-chain attestation using Schema #15 with UID:

`0xb3d80f5328b1a415ba7c77fe5ba704d3d678ad4743a90d84474c23ba5d4c2b9c`

Created: 2023-02-23 08:10:12 UTC  
From: `0x01a93612f26100B6E18a2e3dd57df5c3ccaFeca1`  
To: `0x787aE854B93F759299FEAFCe0Ac5dF84533fa7cE`  
Transaction: `0xb3a3493e24a4ca14540a4c216ad01325270076333c9b8c67fced964f61a83051`

The raw data contains a 32-byte document hash followed by ABI-encoded dynamic string data, consistent with the declared schema.

## Analytical significance

The schema is a legitimate cryptographic-document-attestation mechanism. The `hashOfDocument` field can provide a deterministic commitment to a document, but a schema's existence is not an identity proof. To establish a case linkage, a specific attestation must be tied to a specific investigated address and its contents/hash must be independently reconstructed.

## Current classification

**VERIFIED:** Schema #15 exists on Sepolia and has on-chain attestations.  
**NOT ESTABLISHED:** A cryptographic identity bridge from this schema to the investigation's target addresses.

## Primary references

- EAS Scan schema page: https://sepolia.easscan.org/schema/view/0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80
- Example EAS Scan attestation: https://sepolia.easscan.org/attestation/view/0xb3d80f5328b1a415ba7c77fe5ba704d3d678ad4743a90d84474c23ba5d4c2b9c
