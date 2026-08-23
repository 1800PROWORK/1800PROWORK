# Blockchain / EAS Identity Investigation Casefile

**Case status:** Framework established / origin verification pending  
**Working repository:** `1800PROWORK/1800PROWORK`  
**Case branch:** `investigation/blockchain-eas-casefile`  
**Prepared:** 2026-08-21  
**Last reviewed:** 2026-08-23

## 1. Objective

Determine whether apparently separate blockchain deployments and operational footprints can be tied to a common controlling entity through independently verifiable cryptographic, transaction-level, contract-level, or procedural evidence.

The investigation is **not primarily a SIMBASE investigation**. SIMBASE is treated only as a possible correlation target. The primary objective is to identify concrete linkages and, where possible, independently verify control/ownership of relevant blockchain addresses.

## 2. Investigation Model

The working hypothesis is that a cross-chain behavioral fingerprint may reveal a common operational origin between legacy Ethereum Mainnet activity and transient Base deployments. Behavioral similarity alone is not proof of common ownership. The evidentiary standard should escalate from:

1. **Structural similarity** — Similar code, contract patterns
2. **Temporal / procedural overlap** — Timing and operation correlations
3. **Shared deployment or funding infrastructure** — Common treasury or bridge patterns
4. **Shared signing patterns or repeated exact calldata constructions** — Identical transaction fingerprints
5. **Direct cryptographic linkage** — Hash or signature verification
6. **Independent proof of address control** — Signed messages or key-controlled transactions

Only the final categories can establish strong identity attribution.

## 3. Current Target Artifact

A contract address examined during the investigation is:

```
0x1e4d2113D8E304122f2ceAA20B194d7801a84984
```

The investigation previously identified a need to retrieve and independently inspect its ABI and verified source where available.

## 4. Solidity / Hash Artifact Under Investigation

The following logic was supplied during the investigation and is preserved as an analysis artifact:

```solidity
function gasSaver(uint256 n) external {
    address a0 = msg.sender;
    uint256 n0 = 100;
    bytes memory bb = abi.encode(a0, n0);
    if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
        // subsequent assembly / contract logic was examined separately
    }
}
```

### Important Interpretation

The 32-byte value above is a **candidate comparison constant in contract logic**. It is **not**, by itself, evidence of a wallet private key, seed phrase, owner identity, or address ownership.

**For verification**, the exact encoding must be reproduced:
- `abi.encode(a0, uint256(100))` uses Solidity ABI word encoding (not packed encoding)
- Candidate addresses should be tested by computing the exact **Keccak-256 digest** of the canonical ABI encoding
- Compare the complete 32-byte result against the constant
- Record both input and output for chain-of-custody

## 5. EAS Evidence Track

The investigation included Base EAS Schema #15 (described as **Sign Document**) and an EAS attester on Sepolia associated with a blockchain land-registry experiment.

**Reported schema artifacts:**

| Metric | Value |
|---|---|
| Schema #16 (Land Registry) | `uint8 holdType, uint8 useType, uint64 expiration, int40[2][] polygonArea` |
| Schema #15 (Sign Document) | Base network |
| Total attestations | 1,425 (reported) |
| Land Registry attestations | 9 (reported) |
| Sign Document attestations | 1,416 (reported) |
| Multichain attestations | 59 (reported) |
| Reported creation date | 2023-02-23 |

**Status:** These figures are **investigation leads supplied in prior work**, not independently re-verified facts in this repository commit. They **must** be checked against:
- Relevant EAS contracts
- Explorer records
- Schema registry data
- Transaction receipts

before being promoted to verified evidence.

## 6. Cross-Chain Hypothesis

The principal working hypothesis concerns possible operational overlap between:

- **Legacy Ethereum Mainnet:** token infrastructure with high-volume distribution activity
- **Transient Base L2:** token deployments reported in June 2024
- **Repeated procedures:** deployment, funding, distribution, or calldata-generation that may reveal common automation

**Critical distinction:** The investigation must distinguish three separate propositions:

| Proposition | Definition |
|---|---|
| **A. Same software/operator** | Similar scripts or procedures were used |
| **B. Same controlling entity** | Same person/organization controlled the signing keys |
| **C. Same ultimate identity** | Controlling entity connected to real-world identity |

**Important:** A does not prove B, and B does not automatically prove C.

## 7. Required Verification Sequence

### Phase 1 — Contract Provenance

- [ ] Retrieve verified source and ABI for each target contract
- [ ] Record deployment transaction hashes in full
- [ ] Record deployer addresses in full
- [ ] Record creation block numbers and timestamps
- [ ] Compare compiler version, optimizer configuration, metadata hash, and bytecode

### Phase 2 — Transaction Fingerprinting

- [ ] Compare exact calldata selectors and argument encoding
- [ ] Compare transaction ordering and nonce behavior
- [ ] Compare gas-limit and fee-selection behavior
- [ ] Identify repeated recipient-batching patterns
- [ ] Identify shared intermediate funding addresses

### Phase 3 — Cryptographic Linkage

- [ ] Recompute all candidate Keccak-256 constants from exact ABI encodings
- [ ] Test every candidate address against the complete digest
- [ ] Preserve the input address, encoding method, digest, and source transaction together
- [ ] **Do not** treat partial or visually similar hashes as matches

### Phase 4 — Cross-Chain Linkage

- [ ] Trace ETH and token funding from Ethereum Mainnet into Base
- [ ] Identify bridge deposits and withdrawals
- [ ] Compare timestamps and nonce sequences around deployment events
- [ ] Identify common fee-payer or treasury addresses
- [ ] Check whether deployment contracts or factories recur across chains

### Phase 5 — Ownership Verification

Use **only** evidence capable of establishing control:

- Signed message from the address
- Transaction requiring control of the private key
- Verifiable ownership claim independently tied to the same key/address
- Cryptographic signature with independently validated provenance

**Not sufficient for proof:** Social-media names, ENS labels, explorer labels, transaction comments, or behavioral similarity (these are correlation evidence, not cryptographic proof).

## 8. Evidence Classification

| Classification | Meaning |
|---|---|
| **VERIFIED** | Independently reproduced from on-chain or cryptographic data |
| **CORROBORATED** | Supported by multiple independent records but not yet cryptographically conclusive |
| **REPORTED** | Supplied during the investigation and awaiting independent verification |
| **HYPOTHESIS** | Plausible investigative theory requiring testing |
| **DISPROVED** | Contradicted by independently verified evidence |

## 9. Current Conclusion

The investigation has a viable forensic framework but **does not yet establish a single point-of-origin identity**. 

**Strongest path forward:** Deterministic reconstruction of:
- Deployment patterns
- Funding flows
- Calldata construction
- Bytecode comparison
- Cryptographic relationships

The `gasSaver` hash comparison is especially suitable for deterministic testing because the relevant encoding method is explicit. A confirmed exact digest match for a uniquely identified address would materially strengthen the linkage, although significance still depends on:
- How the constant entered the contract
- Whether the contract itself can be attributed to a controller

## 10. Chain of Custody / Reproducibility Requirements

Every future finding **must** preserve:

- Full blockchain address
- Full transaction hash
- Full block number
- Chain/network identifier
- UTC timestamp
- Contract address
- Function selector and complete calldata (where relevant)
- Source URL / explorer record
- Exact computation performed
- Input bytes and resulting hash (for cryptographic tests)
- Evidence classification
- Date the finding was independently rechecked

**Critical:** Abbreviated addresses such as `0x1234...abcd` **must not** be used when the complete address is available.

## 11. Next Investigation Target

The next concrete task is to independently reconstruct the candidate-hash relationship and then correlate any confirmed address with the deployment/funding graph across Ethereum Mainnet and Base.

**Parallel work:** EAS artifacts should be checked in parallel as a secondary evidence track, without assuming that EAS is either the source or the explanation until the on-chain evidence establishes that connection.

---

## Document Control

- **Version:** 1.0
- **Status:** Ready for Investigation Review
- **Last updated:** 2026-08-23
