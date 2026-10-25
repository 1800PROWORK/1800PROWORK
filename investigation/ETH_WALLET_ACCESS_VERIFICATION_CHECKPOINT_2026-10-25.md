# Ethereum Wallet Verification Checkpoint — 2026-10-25

## Scope and confidence
This checkpoint records explorer-visible facts and separates them from interpretation. Explorer labels are leads, not proof of beneficial ownership or control. Balances are snapshots and may change.

## Primary address
`0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49`

Explorer page reviewed: https://etherscan.io/address/0x4023c5DB63d01c0A797D7949B2D5396Fd963EA49

At retrieval, Etherscan displayed an ETH balance of approximately `0.00053499440048988 ETH` and showed cross-chain activity/holdings including Base WETH and activity on Robinhood Chain. This is not a complete portfolio statement.

## Transaction A — inbound ETH
Hash: `0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9`
Explorer: https://etherscan.io/tx/0x28289bd23ca3f07c72f542f92d2bf89c2b41decb5a9f84b92fc6a0aa79926cf9

- Status shown: Success
- Ethereum block: `25867179`
- Timestamp shown: `2026-08-30 09:26:23 UTC`
- From: `0xf30ba13e4b04Ce5dC4D254Ae5FA95477800F0EB0` (Etherscan label: Kraken Hot Wallet 2)
- To: primary address above
- Value: `0.116780537 ETH`
- Transaction fee shown: `0.00004304046521293 ETH`

The explorer also associated the recipient with `deletedaccount.eth` / an Etherscan 10th Anniversary Badge. This label does not establish who controls the address or whether an account was deleted.

## Transaction B — Relay-labelled native deposit
Hash: `0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4`
Explorer: https://etherscan.io/tx/0xe27d3f3076e67c733d7858628a9b02b3553a54c56aba78550f1238ee42f640c4

- Status shown: Success
- Ethereum block: `25876062`
- Timestamp shown: `2026-08-31 15:09:11 UTC`
- Method shown: `depositNative(address depositor,bytes32 id)`
- Decoded depositor: primary address above
- Amount: `157965676373161 wei` (`0.000157965676373161 ETH`)
- Decoded ID: `BE07996BF4F4C121F5E5679239E644D70BDA66466B04A36A5BB82E4EB438EF77`
- Explorer action text described a deposit to Robinhood via Relay and linked Robinhood-chain transaction `0x4c719463f6e9c3b589026d6e625be52620590ca296fc887a34b4e345340752ab`.

## Interpretation limits
The inbound transfer preceded the Relay-labelled deposit by roughly 29 hours. Timing alone does not prove that the inbound transfer funded the deposit. Do not infer common ownership, account access, fraud, or fund tracing from explorer labels alone.

## Next verification steps
1. Retrieve and preserve transaction receipts and decoded logs for both Ethereum transactions.
2. Inspect the deposit contract bytecode and verified source, if available; identify the event emitted for the decoded deposit ID.
3. Verify the linked Robinhood-chain transaction and reconcile asset, amount, destination, and timestamps across chains.
4. Review intervening transactions and account abstraction / EIP-7702 activity before asserting any causal funding path.
5. Compare findings with the existing case notes and record exact retrieval time and source links for any changed balances or labels.

## Status
Explorer-visible details above were reviewed on 2026-10-25. Contract-level, trace-level, and cross-chain reconciliation remain outstanding. This note is an investigation checkpoint, not a conclusion about identity or control.
