# Ownership / Control Proof Standard

## Target
`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

## Core rule
On-chain behavior can establish that an address acted, but it does not by itself establish who controls the private key. The strongest direct proof for an EOA is a fresh cryptographic signature produced by that address and independently verified. Ethereum authentication is based on proving control of an address by signing a message. EIP-191 defines signed-data framing; EIP-712 provides structured, human-readable typed-data signing. EIP-1271 applies when the address is a smart-contract account rather than an EOA.

## Evidence tiers

### Tier 1 — Direct cryptographic control
A fresh challenge is signed by the target address and the signature recovers to the exact address, or a smart-contract wallet returns the EIP-1271 magic value for the challenge signature. This is the preferred proof of present control.

Challenge should contain:
- exact target address
- chain ID
- unique nonce
- purpose of investigation
- timestamp / expiration
- statement that signing does not authorize a transaction

Prefer EIP-712 for structured challenges. Preserve the exact typed-data JSON and returned signature.

### Tier 2 — On-chain control evidence
Strong indicators include:
- target address directly deploying a contract
- target address authorizing an operation
- target address signing transactions whose nonce/signature can be independently verified
- target address controlling an EOA that funds and operates another address in a distinctive, repeated pattern

These establish control relationships but generally do not identify the human/entity behind the key.

### Tier 3 — Corroborative attribution
Useful but not independently conclusive:
- repeated funding relationships
- synchronized cross-chain behavior
- identical deployment tooling / bytecode / calldata patterns
- EAS attestations
- exchange or service labels
- Reservoir interactions
- CoinStats portfolio records
- public statements or account associations

Multiple independent correlations can strengthen attribution, but should not be labeled cryptographic proof.

## Current investigation
Known artifacts include:
- `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`
- Aug. 16, 2024 transfer of `0.00190382 ETH` from `0x264bd8291fAE1D75DB2c5F573b07faA6715997B5`
- Tx `0x985d9f796b811a2b9aa03c360732c7b76c7268daec09c6655a7beeb3293b35f8`
- Nov. 15, 2024 Reservoir Relay activity showing `0.031211 ETH`
- suspected YIELDX distribution relationship
- June 2024 Base deployment cluster
- `gasSaver()` hash hypothesis

None of these, individually or collectively, should currently be described as proof that a particular human controls the target address.

## Required preservation package
For every claimed ownership relationship preserve:
1. Full address, never abbreviated.
2. Transaction hash / attestation UID / contract address.
3. Chain ID.
4. Block number and timestamp.
5. Exact raw calldata or signature payload where applicable.
6. Source URL or API response.
7. Computation used to derive any hash.
8. Independent verification result.
9. Evidence tier and confidence assessment.
10. Clear separation between `CONTROL PROVEN`, `CONTROL INFERRED`, and `ATTRIBUTION UNPROVEN`.

## Safety
Never request or record a private key or seed phrase. A legitimate ownership test requires only a fresh signature from the wallet; it must not require disclosure of wallet secrets or authorization to move assets.
