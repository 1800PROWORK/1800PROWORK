# Investigation Evidence Register

**Purpose:** Track claims individually with provenance, reproduction status, limitations, and next actions. This register is not a finding of identity or wrongdoing. A row is not “verified” merely because a repository note labels it verified.

**Last updated:** 2026-11-23

## Evidence entries

| ID | Proposition / artifact | Network | Source or identifier currently recorded | Current classification | What this supports | What it does not support / limits | Next action |
|---|---|---|---|---|---|---|---|
| EAS-SEP-015 | Schema #15, “Sign Document,” definition `bytes32 hashOfDocument,string note` | Ethereum Sepolia | UID `0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80`; creation tx `0x27fc6ef0439d11dc2243e2254c9e2da850f3a3c34dc91d70f713361b6a7e0c65`; [schema page](https://sepolia.easscan.org/schema/view/0xd3f24e873e8df2d9bb9af6f08ea1ddf61f65754d023f3ea761081e3e6a226a80) | REPORTED from source-linked repository record; needs fresh primary-data reproduction | A specific Sepolia schema is recorded with a UID, definition, creator, transaction, and timestamp | Does not establish Base deployment, current attestation count, Mainnet/Base linkage, address ownership, or real-world identity | Re-query registry and transaction; record chain ID, block, receipt, UTC retrieval date, and independently compare schema fields |
| EAS-SEP-EXAMPLE | Example attestation associated with the Sepolia schema | Ethereum Sepolia | Attestation UID `0xb3d80f5328b1a415ba7c77fe5ba704d3d678ad4743a90d84474c23ba5d4c2b9c`; tx `0xb3a3493e24a4ca14540a4c216ad01325270076333c9b8c67fced964f61a83051`; [attestation page](https://sepolia.easscan.org/attestation/view/0xb3d80f5328b1a415ba7c77fe5ba704d3d678ad4743a90d84474c23ba5d4c2b9c) | REPORTED from source-linked repository record; needs receipt/data recheck | A specific attestation is cited as an example | Does not prove document authorship, truth, identity, or relation to investigation targets; cited raw data not independently decoded in this revision | Fetch transaction/attestation data; decode schema data; retain raw bytes and verify document hash against candidate document |
| EAS-COUNT-190 | EAS Scan count of 190 attestations for Schema #15 | Ethereum Sepolia | Count recorded in `INVESTIGATION/EVIDENCE/EAS_SCHEMA_15_SEPOLIA.md` | REPORTED, time-sensitive indexer observation | A prior repository note records this count | Count may change and is not independently reproduced here; it is not the earlier Base count | Record query timestamp and reproduce via documented registry/indexer query with a defined inclusion rule |
| EAS-BASE-COUNTS | Prior figures: total 1,425; Land Registry 9; Sign Document 1,416; multichain 59 | Unclear / claimed Base context | Prior casefile only; no source transaction or query method supplied | REPORTED / UNVERIFIED | Only that these figures were previously written down | No verified network, denominator, query, schema UID, block height, or relation among totals; do not cite as facts | Locate schema UIDs and registry contract on Base; define query and snapshot block; recompute counts or remove the figures |
| GAS-HASH-CONSTANT | Code constant `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1` compared to `keccak256(abi.encode(msg.sender,100))` | Base examples reported | `INVESTIGATION/EVIDENCE_001_GASSAVER_HASH.md`; examples include BaseScan addresses in `INVESTIGATION/GASSAVER_SOURCE_REUSE.md` | REPORTED from repository’s source-search records; fresh explorer/source verification pending | The repository records repeated code/hash patterns | Does not identify the preimage address, prove any caller invoked the function, prove common control, or attribute a real-world person | Reopen each full BaseScan source/bytecode; record exact contracts and retrieval date; verify code, deployed bytecode, and selector |
| GAS-PREIMAGE | Candidate address produces the fixed hash for `(address, uint256(100))` | Base | No complete preimage, 64-byte input, digest output, or reproducible script recorded in reviewed evidence | UNKNOWN / NOT REPRODUCED | Nothing yet | Do not claim any candidate address is a hash match | Obtain candidates independently; run Ethereum Keccak-256, not SHA3-256; publish inputs, output, tool/version, and independent check |
| GAS-CALLER | Candidate address actually called `gasSaver` and executed the gated branch | Base | No complete call transaction/receipt or decoded sender record in the reviewed casefile | UNKNOWN | Nothing yet | A preimage match alone is not proof of an observed call or state change | Find selector calls and receipts; record sender, calldata, success, block, and state effect |
| TARGET-0x1e4d | Target address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` | Chain not established in casefile | Address appears in casefile as a target artifact | REPORTED lead | The address is under investigation | Chain, role, source, deployer, and relationship to `gasSaver` are not established by the casefile | Identify intended chain and cite primary explorer/RPC record before analysis |
| ATTRIBUTION-CHANGELOG | Changelog states “sole attribution and control” was confirmed | Unspecified | `CHANGELOG.md`, entry dated 2026-10-06 | CONFLICT / UNRESOLVED | A repository document contains that assertion | Subject, scope, supporting primary evidence, reviewer, and relationship to the casefile are unclear; conflicts with records that say identity is unproven | Locate the underlying evidence and reconcile the exact claim; until then do not use as a conclusion |

## Hash-test worksheet

Fill this for each candidate separately. Do not copy a result across addresses or chains.

| Field | Value |
|---|---|
| Candidate address (full 20 bytes) | TODO |
| Independent source for candidate | TODO |
| Chain / role (deployer, caller, funder, etc.) | TODO |
| ABI type tuple | `(address,uint256)` |
| Integer value | `100` |
| 64-byte ABI preimage (hex) | TODO |
| Hash algorithm and implementation/version | Ethereum Keccak-256; TODO |
| Computed 32-byte digest | TODO |
| Target digest | `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1` |
| Exact byte-for-byte match? | TODO |
| Function-call transaction and successful execution? | TODO |
| Independent reviewer / recheck date | TODO |
| Classification and limitations | TODO |

## Contradiction-resolution log

| ID | Conflicting claims | Current handling | Resolution evidence needed |
|---|---|---|---|
| CON-001 | `CHANGELOG.md` says sole attribution/control confirmed; gas-saver records and casefile say identity linkage is unproven | Unresolved; neither statement is treated as established by this register | Identify the exact entity/address and proposition; retrieve underlying primary records; distinguish key control from legal/real-world attribution; document independent review and amend all affected records consistently |
| CON-002 | Prior casefile associates Schema #15 with Base, while source-linked EAS record identifies Schema #15 on Sepolia | Separate networks; only Sepolia record retained as a specific sourced lead | Verify any Base schema independently using Base chain ID, schema UID, registry address, creation transaction, and block; do not assume numbering maps across networks |

## Evidence handling rules

1. “Verified” must be attached to a narrow, falsifiable claim and cite the primary record and reproduction method.
2. Indexer counts must include the indexer, query/filter, retrieval time, and snapshot block if available.
3. Record negative results and limits of search; absence from an explorer/search result is not proof of absence.
4. Keep source observations separate from interpretation and identity claims.
5. Preserve contrary evidence and do not silently overwrite prior conclusions; log the correction and reason.
