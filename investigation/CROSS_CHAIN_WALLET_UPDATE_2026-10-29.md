# Cross-Chain Wallet Investigation Update — 2026-10-29

## Status

Preliminary record of user-supplied observations. The transactions described below have not been independently replayed in this update.

**Target wallet:** `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`

**Source wallet:** Not recovered from the handoff or repository searches performed for this update. Do not infer or invent it.

**Identifier limitation:** Transaction hashes in the available handoff are abbreviated. Prefixes and suffixes below are not complete transaction IDs.

## Reported observations

### Ethereum → Base bridge, 2024-10-13
- L1 transaction: `0x445af710…ee240`
- Reported amount: 0.001438721629946038 ETH.
- Reported destination chain ID: 8453 (Base).
- Reported bridge output: 1,435,576,812,984,087 wei.
- Reported Base receipt: same amount from `0x09aea4b2…ec64`, transaction `0x731afcde…cab9`, approximately four seconds later.
- Reported bridge contract: `0x5c7bcd6e…35c5`; an Across-style SpokePool identity is only a hypothesis pending ABI/contract verification.

The matching reported amount is consistent with a completed bridge, but requires raw transaction, receipt, log, and trace verification.

### Base activity, 2024-11-16
- Around 02:20 UTC, reported mint call `0xd0a7bb06…0884` to `0x77777775…b4b5`, method `timedSaleMintAndComment(…)`, value 0.000111 ETH, quantity 1, comment “YAY !”.
- Around 07:27 UTC, reported transfer `0x02015b90…72dd` of 0.001315092 ETH to the target wallet.

The reported order is mint first, target transfer later; independent replay remains outstanding.

### Other reported Ethereum activity
- Reported inbound internal transaction of 0.011402 ETH from `0x74de5d4f…6631` in swap transaction `0x9f7a9f75…8c3f`, dated 2024-08-16; described in the handoff as output of a 30 PYUSD swap.
- A call to `0xa5f56565…9934` is reported around the sweep period; selector `0x044089a5` remains undecoded.
- The handoff reports the target received L1 ETH, 48 PYUSD, and dust on 2024-11-16/17, and Base ETH on 2024-11-16. Exact transaction IDs and amounts require verification.

### NFT/event leads
- ERC-721 transfers: none in the queried view; completeness is not established.
- Four ERC-1155 events are described as inbound phishing-lure “claim rewards on …” tokens, dated 2024-10-04, 2025-02-11, 2025-04-27, plus an apparent outbound event dated 2024-12-07.
- The apparent outbound event is suspected to be spoofed. Reported deployment transaction `0x1460fdf9…0e5` allegedly emitted transfer-shaped logs using the target address in a constructor-provided sender list. This remains a hypothesis until deployment input, receipt logs, and the target's nonce history are checked.
- Possible YIELDX/FAM/DIXT spoofed-event effects are untested hypotheses. Verify actual state changes before classification.
- Zora-side lead: collection `0xb4703a3a…8941`, token ID 2; transaction and contract identity remain unverified.
- Base ERC-20 transfers: none in the queried view; completeness is not established.

## Evidence status

| Claim | Status |
|---|---|
| Bridge output matches reported Base receipt | Derived lead from supplied summary; not independently verified |
| Mint preceded transfer to target | Reported chronology; not independently verified |
| ERC-1155 outbound event is spoofed | Hypothesis |
| Bridge contract is Across-style SpokePool | Hypothesis |
| Target and source wallet share an owner/controller | Not established |
| Current Base balance and complete NFT history | Unresolved |

## Next actions
1. Recover the source-wallet address and complete hashes from original explorer exports or source notes. Searches of the repository for the abbreviated transaction prefixes did not recover them.
2. Verify the L1 bridge and Base receipt from raw transactions, receipts, logs, and traces.
3. Verify the mint and transfer, then identify the target's exact inbound transactions on both chains.
4. Decode the call to `0xa5f56565…9934` and investigate the Zora token lead.
5. Test the ERC-1155 spoofing hypothesis against constructor input, logs, and wallet nonce history; test the ERC-20 leads against actual state changes.
6. Query current Base balances and complete ERC-721/ERC-1155 histories with timestamps.

## Provenance limitation

This file preserves reported observations from the investigation handoff and the results of repository searches performed on 2026-10-29. It does not claim independent verification of the reported chain data. Keep reported observations, verified facts, calculations, hypotheses, and unresolved questions separate. A shared destination address alone does not prove common ownership.
