# Cross-chain wallet investigation update

Status: preliminary; transaction-level verification is still required.

The supplied investigation summary reports that a source wallet bridged ETH from Ethereum to Base on 2024-10-13, used Base ETH for a mint on 2024-11-16, and sent assets to `0x5e1cf44f3e0314e9f28bf7140166a4f113a9d6da` on Ethereum and Base on 2024-11-16/17.

These reports support a possible cross-chain transaction relationship, not proof of shared ownership. The source wallet's full address and complete transaction hashes are missing from the handoff, and the reported evidence has not been independently replayed in this update.

Next steps:
1. Recover the full source-wallet address and complete transaction hashes.
2. Verify raw transactions, receipts, logs, and traces for the bridge, mint, and transfers.
3. Decode the `0xa5f56565…9934` contract interaction and inspect the reported collection `0xb4703a3a…8941`, token ID 2.
4. Trace the destination's subsequent activity on Ethereum and Base without assuming common control.
5. Check current Base balances and ERC-721/ERC-1155 activity.
6. Test suspicious ERC-20 events against actual state changes.

Evidence handling: distinguish reported observations, verified facts, derived findings, hypotheses, and unresolved questions. A shared receiving address establishes a transaction relationship, not shared ownership.