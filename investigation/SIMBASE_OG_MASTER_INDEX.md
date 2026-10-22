# SIMBASE OG — Master Investigation Index

**Updated:** 2026-10-22 (Ethereum wallet-access and transaction-lead checkpoint)  
**Repository:** `1800PROWORK/1800PROWORK`  
**Purpose:** Central index for active blockchain investigations, engineering work, source records, verification gaps, and recovered workflow instructions.

## Operating standard

Preserve original records and unresolved leads. Do not equate missing evidence with evidence of absence. Keep verified facts, derived findings, investigative leads, conflicting evidence, unverified claims, and disproven claims distinct. Retain source identifiers, timestamps, transaction hashes, addresses, methods, and limitations. Corrections must explain what changed without silently overwriting prior conclusions.

**Working principle:** Preserve first. Verify thoroughly. Reconcile contradictions. Reassess conclusions. Document every material change.

The protocol above is preserved in the project record *Forensic Audit Followup* (2026-10-20). It is a recovered project instruction fragment, **not verified as the complete original custom-instructions text**.

## Workstream index

| ID | Workstream | Primary target / scope | Current evidence position | Next action |
|---|---|---|---|---|
| SW-01 | Polygon wallet and counterparty graph | `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA` | Existing casefile, evidence matrix, source list, legacy reconciliation, chronological ledger, counterparty graph, and a dated counterparty addendum documenting three near-exact POL pass-through candidates involving `0xf2B1…`, recurring upstream source `0x44c7…`, and one mixed-source top-up from `0x469C…`. Ownership/control remains unestablished. | Obtain raw transaction/receipt data to verify exact wei-level reconciliation; trace other recipients and upstream funding of `0x44c7…`; test whether similar relay patterns occur for other counterparties; retain service/automation and other alternative explanations. |
| SW-02 | Bitcoin address | `1PuJjnF476W3zXfVYmJfGnouzFDAXakkL4` | Prior report records conflicting explorer balance snapshots (22.14864203 BTC vs approximately 47.15 BTC); neither should be treated as current verified balance without direct API/UTXO reconciliation. | Query a direct Bitcoin data source; reconcile confirmed UTXOs, mempool state, transaction history, and explorer snapshot times before drawing balance conclusions. |
| SW-03 | Base / EIP-7702 / Basename | `0xC0e8d8Df729a91FB3920A026Ce548b3A9d00BA06`; name lead `i900protech.base.eth` | Delegation target, paymaster, bundler, and Basenames controller have been identified as leads, but the specific registration transaction and exact sponsorship/delegation path remain to be tied together. | Obtain registration transaction hash; inspect receipt, logs, call trace, UserOperation, EntryPoint, paymaster and bundler participation; verify current name ownership/resolver and delegation state from authoritative chain data. |
| SW-04 | SIMBASE engineering / repository state | `1800PROWORK/1800PROWORK` | Repository is accessible with push permission. Latest commit discovered during this checkpoint: `8e2ae850383eda75fce027c23f3cb9657edc149c` (2026-10-13), which adds a preliminary OP Mainnet DefaultReceiver investigation. Etherscan V2 normalization/provider work and earlier 7/7 tests are documented in project records; current CI state has not been re-run in this checkpoint. | Keep provider, normalization, canonical model, market enrichment, valuation, and reporting layers separate. Verify current code/tests before claiming present test status; prioritize auditable evidence ingestion and provenance. |
| SW-05 | TON / cross-chain lead | TON counterparties and any claimed relationship to SW-01 | Retained as an open lead; a wallet-level connection has not been established in the cited investigation records. | Identify candidate TON account/transaction identifiers from source records, then trace transactions and counterparties. Do not infer identity from Telegram/project metadata alone. |
| SW-06 | TRON / TRX lead | Candidate block ID `0000000005345f3be4895b35cf28b3669d8f5b94547ca4f40a5af50a0fcce089` (claimed parent `0000000005345f3a4cbb12a6dfb8e51786c109f2f291a5d5a1d83487b0267cf6`) | Candidate and parent IDs encode consecutive heights 87,318,331 and 87,318,330; canonical IDs, parentHash, transactions, and confirmation depth remain unverified. A retrieved TRONSCAN summary height of 87,180,165 conflicts with the reported >200 confirmations if current, but may be stale. | Verify both IDs and parentHash via a POST-capable TRON FullNode/SolidityNode; reconcile the height/confirmation discrepancy before tracing transactions. See `investigation/TRON_BLOCK_87318331_VERIFICATION.md`. |
| SW-07 | PENGU / Pudgy Penguins | Exact token-contract and NFT interactions related to SW-01 | Investigative lead only; connection not yet proven. Keep PENGU distinct from similarly named assets and keep PEPE and APEPE separate. | Search exact contract interactions and NFT transfers, then connect only through transaction-level evidence. |
| SW-08 | Ethereum NFT marketplace and wallet-access follow-up | Case `ETH-9616B7`; primary address `0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49` | Existing Phase 2 report documents marketplace activity. New user-reported leads are preserved in `investigation/ETH_WALLET_ACCESS_AND_TRANSACTION_LEADS_2026-10-22.md`, including hashes `0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4` and `0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9`; their details and explorer labels remain independently unverified. Common ownership, fraud, or wallet compromise are not established. | Verify both transaction receipts, chain, timestamp, sender/recipient, assets, logs and traces; separately identify original wallet provider/account type and safe recovery path. |
| SW-09 | Original custom-instructions recovery | Original instruction text and surviving fragments | Complete original text not yet recovered. Existing investigation protocol is a reliable project fragment, but must not be mislabeled as the original full instructions. | Continue searching project files, library artifacts, repository history, and prior conversation records. Preserve verbatim fragments with provenance and label any new synthesis as reconstruction. |

## Canonical repository records

### Polygon / `0x5E1c…D6DA`
- `investigation/WALLET_0x5E1c_CASEFILE.md`
- `investigation/EVIDENCE_MATRIX.md`
- `investigation/SOURCES.md` (verify exact path before relying on it)
- `investigation/TODO.md`
- `investigation/LEGACY_MEMORY_RECONCILIATION.md`
- `investigation/TRANSACTION_LEDGER_0x5E1c.md`
- `investigation/COUNTERPARTY_FINDINGS_0x5E1c.md`
- `investigation/COUNTERPARTY_ADDENDUM_0x5E1c_2026-10-21.md` — dated pass-through funding trace; includes displayed-value reconciliation limits.

### Other repository records
- `investigation/ETH_WALLET_ACCESS_AND_TRANSACTION_LEADS_2026-10-22.md` — preserves user-reported Ethereum hashes, address labels, wallet-access issue, verification gaps, and recovery precautions.
- `investigation/CONTRACT_0x2a8010A9_DefaultReceiver_OP_MAINNET.md` — preliminary OP Mainnet lead; verify before attribution.
- `INVESTIGATION/CASE_INDEX.md` — separate identity/EAS investigation framework.
- `INVESTIGATION/SIMBASE_IDENTITY_VERIFICATION_BRIEF.md` — related identity-verification brief.

Paths above are index pointers, not assertions that each file has been freshly reviewed in this checkpoint.

## Evidence-status vocabulary

- **Verified fact:** directly supported by authenticated primary evidence.
- **Derived finding:** reproducible calculation or inference from verified records; method documented.
- **Investigative lead:** plausible avenue requiring testing; retained even if currently inaccessible.
- **Conflicting evidence:** sources disagree; reconciliation remains open.
- **Unverified claim:** currently insufficient evidence to substantiate.
- **Disproven claim:** reliable evidence affirmatively contradicts the claim.
- **Blocked:** verification cannot proceed until a specific source, identifier, permission, or technical dependency is available.

These labels describe evidentiary strength; they do not authorize automatic deletion or closure of a lead.

## Immediate execution order

1. Resume the Polygon graph from the repository's current counterparty findings and preserve the existing graph.
2. Verify the Bitcoin balance conflict from direct UTXO data.
3. Recover the Base registration transaction and reconstruct its actual execution path.
4. Gather exact TON, TRON, and PENGU identifiers from surviving records and test those leads.
5. Re-run or inspect the current SIMBASE tests before reporting engineering readiness.
6. Continue original instruction recovery; keep original text, recovered fragments, and reconstruction in separate categories.

## Checkpoint and change control

This index was created as a navigation and status layer. It does not replace underlying casefiles, transaction ledgers, or source records. Future changes should add the source, observation time, chain/network, transaction/address identifiers, verification method, status change, and reason for the change. Never overwrite a prior finding without preserving its earlier wording and provenance.
