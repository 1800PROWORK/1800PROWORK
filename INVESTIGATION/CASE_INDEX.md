# Blockchain Forensics Investigation — Case Index

**Status:** Framework established / evidence consolidation in progress  
**Repository:** `1800PROWORK/1800PROWORK`  
**Purpose:** Preserve, structure, and independently test the blockchain/EAS identity investigation.

## Core objective

Determine whether the observed Ethereum Mainnet and Base Layer-2 activity can be linked through reproducible cryptographic, transactional, deployment, funding, or operational fingerprints to a common controlling identity. SIMBASE and EAS are correlation targets, not assumptions of identity.

## Evidence standards

Every substantive finding should be classified as one of:

- **VERIFIED** — independently reproducible from on-chain or otherwise primary evidence.
- **STRONG CORRELATION** — multiple independent indicators align, but ownership/control is not proven.
- **POSSIBLE** — technically plausible but insufficiently corroborated.
- **UNPROVEN** — hypothesis requiring additional evidence.
- **DISPROVED** — contradicted by reproducible evidence.

## Investigation tracks

### 1. Ethereum Mainnet legacy architecture
- High-volume token contract(s)
- Holder and transfer structure
- Deployment provenance
- Distribution mechanisms
- Repeated operational patterns

### 2. Base Layer-2 transient deployments
- June 2024 deployments
- Deployment transactions and deployer addresses
- Function selectors and calldata
- Funding/source relationships
- Behavioral comparison with Mainnet architecture

### 3. `gasSaver()` / hash investigation
- Preserve the supplied Solidity implementation verbatim when available.
- Test `abi.encode(a0, n0)` semantics.
- Test the supplied `keccak256` target.
- Record reproducible candidate inputs and exact calldata.
- Do not call a hash match an identity proof without an independently established address/control bridge.

### 4. EAS
- Base EAS Schema #15 / Sign Document
- Sepolia Sign Document and Land Registry schemas
- Attestation counts and timestamps
- Multichain attestations
- Attester/address relationships
- Test whether EAS produces a cryptographic linkage or only contextual correlation.

### 5. OpenSea / 1800PROLOVE
- Preserve the exact confirmed name: **1800PROLOVE**.
- Record deployment/creation evidence separately from investigative hypotheses.
- Test relationships to other addresses only through reproducible evidence.

## Evidence ledger

For every artifact record:

1. Network
2. Address / contract
3. Transaction hash
4. Block number and timestamp
5. Source URL or explorer reference
6. Exact observed data
7. Interpretation
8. Alternative explanations
9. Evidence classification
10. Reproduction method

## Critical rule

Behavioral similarity is not proof of common ownership. The investigation should prioritize evidence that can be independently reproduced: transaction history, deployment bytecode, calldata, event logs, funding paths, deterministic hashes, signatures, and explicit cryptographic attestations.

## Current state

This repository is the working case index. Detailed evidence files should be added as separate artifacts so that each conclusion can be audited without relying on conversational memory.
