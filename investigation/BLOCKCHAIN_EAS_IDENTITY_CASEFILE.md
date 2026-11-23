# Blockchain / EAS Identity Investigation Casefile

**Case status:** Evidence reconciliation in progress; no common-origin or real-world identity conclusion established by this casefile  
**Working repository:** `1800PROWORK/1800PROWORK`  
**Working branch:** `investigation/casefile-verifiable-improvements`  
**Prepared:** 2026-08-21  
**Reviewed:** 2026-11-23

> **Scope and caution:** This document is an investigative framework, not a finding of wrongdoing, ownership, or real-world identity. Repository records cited below are leads until their underlying primary data are independently retrieved and reproduced. Do not publish attribution claims based solely on code similarity, explorer labels, names, or behavioral correlation.

## 1. Objective

Determine whether independently identified blockchain deployments and operational activity have demonstrable technical links. Keep separate the questions of (1) shared software or procedure, (2) address control, (3) control of multiple addresses or contracts, and (4) attribution to a real-world person or organization.

SIMBASE is one possible correlation target, not a premise or conclusion of this investigation.

## 2. Evidentiary model

Use the following evidence ladder as an ordering of investigative strength, not as a substitute for assessing the quality and independence of each source:

1. Structural or code similarity — may indicate shared source, template, or compiler pipeline.
2. Temporal or procedural similarity — may indicate correlated operations, but can have alternative explanations.
3. Shared funding, bridge, deployment, or transaction infrastructure — strengthens a relationship hypothesis; intermediaries and custodial services are possible confounders.
4. Exact transaction, calldata, or bytecode correspondence — supports a technical relationship, not necessarily common control.
5. A reproduced cryptographic relationship — proves only the precise cryptographic proposition tested.
6. Evidence of control of a specific address at a particular time — does not, without more, identify the human or organization behind it.
7. Independently corroborated real-world attribution — requires separate, reliable evidence and careful review.

Do not treat any single rung as automatically proving the next. In particular, code reuse does not prove common ownership; a signature proves authorization by a key under the signature scheme, not necessarily the key-holder's legal identity.

## 3. Target artifact and scope limitation

A target address recorded in prior investigation material is:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

This casefile does not independently establish its chain, contract status, verified source, deployer, or relationship to the `gasSaver` code. Record and verify those attributes separately before drawing conclusions.

## 4. `gasSaver` hash investigation

The supplied code artifact contains this comparison:

```solidity
bytes memory bb = abi.encode(msg.sender, uint256(100));
if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
    // implementation details must be taken from verified source
}
```

The candidate digest is a code constant. It is not a private key, seed phrase, identity proof, or address by itself.

### Reproducible test specification

For each candidate address obtained independently from a cited primary record:

1. Validate and preserve the full 20-byte address.
2. ABI-encode `(address, uint256(100))` using standard ABI encoding (not packed encoding). The result is 64 bytes: the address left-padded to one 32-byte word, followed by the integer 100 as a 32-byte big-endian word.
3. Compute Ethereum Keccak-256 (not NIST SHA3-256) over those exact bytes.
4. Compare the complete 32-byte output to `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`.
5. Record the address source, input bytes, algorithm/library and version, digest, result, and independent recheck.
6. Separately establish whether that address actually called the relevant function and whether the transaction succeeded. A mathematical preimage match alone does not establish that the address executed the code or controlled a contract.

**Current result:** No candidate preimage result is asserted in this casefile. Repository evidence describes matching code/hash patterns in multiple Base contracts, but that is evidence of code reuse only and must be checked against each live explorer/source record before being treated as independently verified here. See `INVESTIGATION/EVIDENCE_001_GASSAVER_HASH.md` and `INVESTIGATION/GASSAVER_SOURCE_REUSE.md` as leads.

## 5. EAS evidence — keep networks separate

### Sepolia Schema #15 record

The repository contains a source-linked record for an EAS Sepolia schema described as “Sign Document.” The recorded details are:

- Network: Ethereum Sepolia
- Schema UID: `0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80`
- Schema definition: `bytes32 hashOfDocument,string note`
- Creator recorded: `0x01a93612f26100B6E18a2e3dd57df5c3ccaFeca1`
- Creation transaction recorded: `0x27fc6ef0439d11dc2243e2254c9e2da850f3a3c34dc91d70f713361b6a7e0c65`
- Creation time recorded: 2023-02-23 08:00:36 UTC
- EAS Scan count recorded in the evidence note: 190 attestations (a time-sensitive indexer count, not a permanent chain fact)
- Example attestation UID recorded: `0xb3d80f5328b1a415ba7c77fe5ba704d3d678ad4743a90d84474c23ba5d4c2b9c`
- Example transaction recorded: `0xb3a3493e24a4ca14540a4c216ad01325270076333c9b8c67fced964f61a83051`

Primary references recorded in the repository:

- Schema: https://sepolia.easscan.org/schema/view/0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80
- Example attestation: https://sepolia.easscan.org/attestation/view/0xb3d80f5328b1a415ba7c77fe5ba704d3d678ad4743a90d84474c23ba5d4c2b9c
- Detailed repository evidence record: [`INVESTIGATION/EVIDENCE/EAS_SCHEMA_15_SEPOLIA.md`](../INVESTIGATION/EVIDENCE/EAS_SCHEMA_15_SEPOLIA.md)

**Assessment:** This is a Sepolia artifact according to the cited repository evidence. The reported count is indexer-derived and time-sensitive. This record does not verify a Base Schema #15, a Base Schema #16, the previously reported totals of 1,425 / 9 / 1,416 / 59, or any Mainnet/Base identity linkage. Those figures are retained only as unverified leads in `investigation/EVIDENCE_REGISTER.md`; they are not current findings.

An EAS document hash is a commitment to bytes under a specified hashing procedure. It does not identify a document or signer unless the original bytes, hashing procedure, attestation fields, transaction, and signer/control evidence are independently established.

## 6. Cross-chain hypotheses

Prior material proposes possible overlap among Ethereum Mainnet activity, Base deployments reportedly from June 2024, and EAS activity. These are **hypotheses**, not established links. For each proposed edge in a graph, record the source and testable proposition (for example: a bridge deposit is followed by a Base transaction from an independently matched address). Do not infer identity merely from temporal proximity or a shared label.

## 7. Verification plan

### Phase 1 — Contract provenance

- [ ] Establish chain ID and contract address for each target.
- [ ] Retrieve source, ABI, runtime bytecode, and verification metadata from primary explorer or chain data.
- [ ] Record creation transaction, block number, timestamp, deployer/creator and full transaction hash.
- [ ] Compare compiler settings, metadata, creation/runtime bytecode, and proxy/factory structure.

### Phase 2 — Transaction evidence

- [ ] Identify actual calls to the relevant selector and decode complete calldata.
- [ ] Record sender, recipient, success status, block, transaction index, and receipt/logs.
- [ ] Compare funding and bridge paths with explicit alternative explanations.
- [ ] Treat nonce, timing, gas, and batching similarities as supporting evidence only.

### Phase 3 — Hash reproduction

- [ ] Obtain candidate addresses from independent transaction/provenance evidence.
- [ ] Reproduce the exact Keccak-256 computation specified in Section 4.
- [ ] Preserve successful and unsuccessful tests alike.
- [ ] Do not claim a match without the full input, digest, code, and review record.

### Phase 4 — EAS verification

- [ ] Query the schema registry on the stated network using the full schema UID.
- [ ] Verify the creation transaction and decode schema registration event/data.
- [ ] Verify any attestation by UID, schema UID, recipient, attester, timestamp, transaction, and raw data.
- [ ] Recompute the document hash from the exact candidate document bytes where applicable.
- [ ] Keep Sepolia, Base, and other networks as separate records; do not combine counts across networks without a defined, reproducible query.

### Phase 5 — Control and attribution

- [ ] Establish address control only with appropriate cryptographic or transaction evidence and state exactly what it proves and when.
- [ ] Account for contract wallets, multisigs, custodians, relayers, and delegated execution.
- [ ] Require independent corroboration before real-world attribution.
- [ ] Preserve contrary and exculpatory observations and record unresolved contradictions.

## 8. Evidence classification

| Classification | Meaning |
|---|---|
| **VERIFIED** | The specific stated fact was reproduced from cited primary data; scope, chain, and observation date are recorded. |
| **CORROBORATED** | Multiple independent sources support the fact, but the stated proposition is not conclusively established. |
| **REPORTED** | Present in prior notes or secondary/indexer data and not independently rechecked for this revision. |
| **HYPOTHESIS** | A testable interpretation or proposed linkage, not a finding. |
| **DISPROVED** | A precisely stated claim contradicted by reproducible evidence; retain the evidence and scope. |
| **UNKNOWN** | Available evidence does not answer the question. |

A classification applies to an individual claim, not an entire document or address. “Verified contract code” does not mean “verified owner.”

## 9. Contradictions and current conclusion

The repository includes an investigation changelog entry asserting “sole attribution and control,” while the gas-saver evidence records and this casefile describe identity linkage as unproven. This contradiction is **unresolved**. The changelog assertion must not be treated as a verified conclusion until its exact subject, scope, primary evidence, reviewer, and date are documented in the evidence register. It may refer to a distinct finding; no assumption is made here.

**Current conclusion:** The repository contains leads for repeated `gasSaver` code and a Sepolia EAS Schema #15 record. The evidence summarized here does not establish a common controller across contracts/chains or a real-world identity. The hash preimage remains unreported/unreproduced in this casefile. The previously reported Base/EAS counts remain unverified.

## 10. Publication and handling safeguards

- Do not publish a real-world identity or allegation on the basis of code reuse, funding adjacency, labels, or an unreproduced hash.
- Describe observed facts separately from interpretation and confidence.
- Include alternative explanations, limitations, and disconfirming evidence.
- Have a second reviewer inspect primary-source links and calculations before an attribution claim is circulated.
- Minimize unnecessary personal data; preserve only what is required for a legitimate, authorized investigation.

## 11. Chain of custody

Each evidence-register row must include, as applicable: claim ID; exact proposition; chain/network and chain ID; full address and transaction hash; block number and UTC timestamp; source URL and retrieval date; raw input or artifact; method/tool and version; output; classification; limitations; reviewer; and next verification action. Never replace a full identifier with a truncated form when the full value is available.

## 12. Document control

- **Version:** 1.1
- **Status:** Methodology and evidence reconciliation; not an attribution finding
- **Last updated:** 2026-11-23
- **Evidence register:** [`investigation/EVIDENCE_REGISTER.md`](EVIDENCE_REGISTER.md)
