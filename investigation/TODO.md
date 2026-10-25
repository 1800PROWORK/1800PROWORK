# Investigation TODO — 0x5E1c...9D6DA

## Priority 0 — wallet graph
- [ ] Enumerate complete Ethereum history
- [ ] Enumerate complete Polygon history
- [ ] Enumerate complete Base history
- [ ] Enumerate other EVM chains with activity
- [ ] Extract bridge transactions
- [ ] Build chronological transaction dataset

## Priority 1 — remembered assets
- [ ] Search exact PENGU contract interactions
- [ ] Search Pudgy Penguins NFT transfers
- [ ] Search TON counterparties
- [ ] Verify candidate block 87,318,331 and claimed parent via POST-capable TRON node; reconcile explorer-height/confirmation discrepancy (see `investigation/TRON_BLOCK_87318331_VERIFICATION.md`)
- [ ] After block verification, extract and trace relevant TRON transactions; test any link to SW-01
- [ ] Search TRON/TRX flows
- [ ] Keep PEPE and APEPE separate in every record

## Priority 2 — attribution
- [ ] Cluster repeated counterparties
- [ ] Identify centralized-exchange endpoints
- [ ] Compare funding paths with legacy addresses
- [ ] Test common-control hypotheses

## Priority 3 — valuation
- [ ] Reconstruct balances on 2024-12-13
- [ ] Reconstruct balances on 2024-12-17
- [ ] Reconstruct balances on 2025-01-28
- [ ] Reconstruct historical peak value
- [ ] Exclude unpriced/illiquid tokens from headline valuations

## Priority 4 — extraordinary claims
- [ ] Trace alleged $151M assets
- [ ] Trace alleged $870M assets
- [ ] Determine whether figures were assets, token-unit counts, UI errors, or unrelated protocol balances


## Priority 0 — Ethereum wallet access follow-up (2026-10-22)
- [ ] Verify transaction 0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4 on the correct network; capture receipt, block timestamp, from/to, value, token transfers, logs, and trace.
- [ ] Verify transaction 0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9; confirm or correct the reported “Kraken Hot Wallet 2” label and inbound direction using primary transaction data.
- [ ] Trace inflows/outflows for 0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49 and compare with the existing ETH-9616B7 case without assuming common control.
- [ ] Verify the reported Relay Depository, contract-creator, Binance 20, MetaMask EIP-7702, and World Liberty Financial labels independently; preserve as reported leads until verified.
- [ ] Determine the original wallet provider/account type and safe recovery path. Never request or enter seed phrases/private keys on untrusted sites.
- [ ] See investigation/ETH_WALLET_ACCESS_AND_TRANSACTION_LEADS_2026-10-22.md; do not infer missing transaction data from explorer labels alone.


## Ethereum verification checkpoint (2026-10-25)
- [x] Capture explorer-visible details for inbound ETH transaction `0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9` and Relay-labelled deposit `0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4`.
- [ ] Retrieve primary receipts, logs, contract/source details, and traces for both transactions.
- [ ] Verify the linked Robinhood-chain transaction `0x4c719463f6e9c3b589026d6e625be52620590ca296fc887a34b4e345340752ab` and reconcile cross-chain amount and destination.
- [ ] Check intervening transactions before making any claim that the inbound ETH funded the later deposit.
- [ ] Record retrieval timestamps and distinguish explorer labels from verified ownership/control.
- Evidence checkpoint: `investigation/ETH_WALLET_ACCESS_VERIFICATION_CHECKPOINT_2026-10-25.md`.
