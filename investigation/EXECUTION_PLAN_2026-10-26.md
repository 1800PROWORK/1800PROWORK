# Investigation Execution Plan — 2026-10-26

## Objective
Move the existing investigation from accumulated leads to reproducible verification. This plan does not claim that outstanding checks have already been completed.

## Repository review
Reviewed `INVESTIGATION/CASE_INDEX.md`, `INVESTIGATION/EVIDENCE_STATUS.md`, `investigation/ETH_WALLET_ACCESS_VERIFICATION_CHECKPOINT_2026-10-25.md`, `investigation/EVIDENCE_MATRIX.md`, and `.github/copilot-instructions.md`.

## Priority 1 — Verify Ethereum transactions
Query these transactions through a trusted Ethereum Mainnet JSON-RPC endpoint and preserve the raw transaction, receipt, logs, block hash, retrieval time, and endpoint identity:
- `0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9`
- `0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4`

Repeat against a second independent endpoint before calling the result independently corroborated.

## Priority 2 — Verify the cross-chain deposit
Identify the destination contract and decode emitted logs using a verified ABI/source where available. Verify the linked Robinhood-chain transaction using primary chain data. Reconcile destination, asset, amount, timestamps, and bridge/message identifiers. Do not claim the earlier inbound ETH transfer funded the later deposit unless transaction-level evidence supports the path.

## Priority 3 — Test the gasSaver hash lead
Retrieve actual `gasSaver(uint256)` transactions for the documented contracts. Test actual caller addresses because the function hashes `msg.sender`, not necessarily the contract address. Reproduce `abi.encode(address,uint256)` and Keccak-256 with a known-correct Ethereum Keccak implementation. Scope negative findings to the exact candidate tested.

## Priority 4 — Evidence matrix
For each claim, record evidence ID, network, transaction/contract, primary source and retrieval time, raw data or content hash, reproduction method, result, alternative explanations, limitations, status, and the next decisive verification step.

## Privacy and handling
Do not commit seed phrases, private keys, passwords, recovery codes, or unnecessary personal data. Public RPC providers receive queried hashes and request metadata. Never sign or broadcast transactions during forensic verification. Tool failure is not proof an on-chain event did not occur.

## Validation status
- Repository documentation reviewed: yes.
- Live RPC verification: not run.
- Independent endpoint cross-check: pending.
- Cross-chain causal link: pending.
