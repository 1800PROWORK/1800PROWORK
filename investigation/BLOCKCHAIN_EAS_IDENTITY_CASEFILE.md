# Blockchain / EAS Identity Investigation Casefile

**Case status:** Framework established / origin verification pending  
**Working repository:** `1800PROWORK/1800PROWORK`  
**Case branch:** `investigation/blockchain-eas-casefile`  
**Prepared:** 2026-08-21

## 1. Objective

Determine whether apparently separate blockchain deployments and operational footprints can be tied to a common controlling entity through independently verifiable cryptographic, transaction-level, contract-level, or procedural evidence.

The investigation is **not primarily a SIMBASE investigation**. SIMBASE is treated only as a possible correlation target. The primary objective is to identify concrete linkages and, where possible, independently verify control/ownership of relevant blockchain addresses.

## 2. Investigation model

The working hypothesis is that a cross-chain behavioral fingerprint may reveal a common operational origin between legacy Ethereum Mainnet activity and transient Base deployments. Behavioral similarity alone is not proof of common ownership. The evidentiary standard should escalate from:

1. Structural similarity
2. Temporal / procedural overlap
3. Shared deployment or funding infrastructure
4. Shared signing patterns or repeated exact calldata constructions
5. Direct cryptographic linkage
6. Independent proof of address control

Only the final categories can establish strong identity attribution.

## 3. Current target artifact

A contract address examined during the investigation is:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

The investigation previously identified a need to retrieve and independently inspect its ABI and verified source where available.

## 4. Solidity / hash artifact under investigation

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

### Important interpretation

The 32-byte value above is a **candidate comparison constant in contract logic**. It is not, by itself, evidence of a wallet private key, seed phrase, owner identity, or address ownership.

For verification, the exact encoding must be reproduced. `abi.encode(a0, uint256(100))` uses Solidity ABI word encoding, not packed encoding. Candidate addresses should therefore be tested by computing the exact Keccak-256 digest of the canonical ABI encoding and comparing the complete 32-byte result.

## 5. EAS evidence track

The investigation included Base EAS Schema #15, described as **Sign Document**, and an EAS attester on Sepolia associated with a blockchain land-registry experiment.

Reported schema artifacts included:

- Schema #16: `Land Registry`
- Fields: `uint8 holdType, uint8 useType, uint64 expiration, int40[2][] polygonArea`
- Schema #15: `Sign Document`
- Reported total attestations: 1,425
- Reported Land Registry attestations: 9
- Reported Sign Document attestations: 1,416
- Reported multichain attestations: 59
- Reported deployment / schema creation date: 2023-02-23

These figures are preserved as **investigation leads supplied in prior work**, not as independently re-verified facts in this repository commit. They must be checked against the relevant EAS contracts, explorer records, schema registry data, and transaction receipts before being promoted to verified evidence.

## 6. Cross-chain hypothesis

The principal working hypothesis concerns possible operational overlap between:

- Legacy Ethereum Mainnet token infrastructure with high-volume distribution activity.
- Transient Base L2 token deployments reported in June 2024.
- Repeated deployment, funding, distribution, or calldata-generation procedures that may reveal a common automation framework.

The investigation must distinguish three separate propositions:

**A. Same software/operator:** similar scripts or procedures were used.

**B. Same controlling entity:** the same person or organization controlled the relevant signing keys.

**C. Same ultimate identity:** the controlling entity can be independently connected to a real-world identity.

A does not prove B, and B does not automatically prove C.

## 7. Required verification sequence

### Phase 1 — Contract provenance

- Retrieve verified source and ABI for each target contract.
- Record deployment transaction hashes in full.
- Record deployer addresses in full.
- Record creation block numbers and timestamps.
- Compare compiler version, optimizer configuration, metadata hash, and bytecode.

### Phase 2 — Transaction fingerprinting

- Compare exact calldata selectors and argument encoding.
- Compare transaction ordering and nonce behavior.
- Compare gas-limit and fee-selection behavior where meaningful.
- Identify repeated recipient-batching patterns.
- Identify shared intermediate funding addresses.

### Phase 3 — Cryptographic linkage

- Recompute all candidate Keccak-256 constants from exact ABI encodings.
- Test every candidate address against the complete digest.
- Preserve the input address, encoding method, digest, and source transaction together.
- Do not treat a partial or visually similar hash as a match.

### Phase 4 — Cross-chain linkage

- Trace ETH and token funding from Ethereum Mainnet into Base.
- Identify bridge deposits and withdrawals.
- Compare timestamps and nonce sequences around deployment events.
- Identify common fee-payer or treasury addresses.
- Check whether deployment contracts or factories recur across chains.

### Phase 5 — Ownership verification

Use only evidence capable of establishing control, such as:

- A signed message from the address.
- A transaction that requires control of the relevant private key.
- A verifiable ownership claim independently tied to the same key/address.
- A cryptographic signature whose provenance can be independently validated.

Social-media names, ENS labels, explorer labels, transaction comments, or behavioral similarity are correlation evidence, not cryptographic proof of ownership.

## 8. Evidence classification

| Classification | Meaning |
|---|---|
| VERIFIED | Independently reproduced from on-chain or cryptographic data |
| CORROBORATED | Supported by multiple independent records but not yet cryptographically conclusive |
| REPORTED | Supplied during the investigation and awaiting independent verification |
| HYPOTHESIS | Plausible investigative theory requiring testing |
| DISPROVED | Contradicted by independently verified evidence |

## 9. Current conclusion

The investigation has a viable forensic framework but **does not yet establish a single point-of-origin identity**. The strongest path forward is not additional speculation about names or platforms; it is deterministic reconstruction of deployment, funding, calldata, bytecode, and cryptographic relationships.

The `gasSaver` hash comparison is especially suitable for deterministic testing because the relevant encoding method is explicit. A confirmed exact digest match for a uniquely identified address would materially strengthen the linkage, although the significance would still depend on how the constant entered the contract and whether the contract itself can be attributed to a controller.

## 10. Chain of custody / reproducibility requirements

Every future finding should preserve:

- Full blockchain address.
- Full transaction hash.
- Full block number.
- Chain/network.
- UTC timestamp.
- Contract address.
- Function selector and complete calldata where relevant.
- Source URL / explorer record.
- Exact computation performed.
- Input bytes and resulting hash for cryptographic tests.
- Evidence classification.
- Date the finding was independently rechecked.

Abbreviated addresses such as `0x1234...abcd` should not be used in the casefile when the complete address is available.

## 11. Next investigation target

The next concrete task is to independently reconstruct the candidate-hash relationship and then correlate any confirmed address with the deployment/funding graph across Ethereum Mainnet and Base. EAS artifacts should be checked in parallel as a secondary evidence track, without assuming that EAS is either the source or the explanation until the on-chain evidence establishes that connection.
