# Wallet Investigation Casefile — 0x5E1c...9D6DA

Target: `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`

## Evidence status
- Verified: direct on-chain transaction or contract-state evidence.
- Correlated: strong relationship, but not proof of ownership/control.
- Investigating: lead requiring additional verification.
- Hypothesis: unverified theory.

## Current findings

| Item | Status | Finding |
|---|---|---|
| MAGA (TRUMP) ERC-20 | Verified | Wallet held approximately 762.9M units of the older MAGA/TRUMP token on Ethereum. |
| APEPE | Verified | Polygon transaction on 2024-12-13 swapped 5,188,571.9488 APEPE for 42.3664 POL. |
| PEPE | Verified | PEPE balance exists on Base; cited explorer snapshot valued it at about $1.65. |
| PENGU / Pudgy Penguins | Investigating | No reliable wallet-level transaction proof established yet. |
| Telegram relationship | Investigating | Project-level metadata exists; wallet-level attribution is unproven. |
| TON | Investigating | Wallet-level connection not established. |
| TRON / TRX | Investigating | Wallet-level connection not established. |
| $151M claim | Unverified | No supporting evidence established. |
| $870M claim | Unverified | No supporting evidence established. |
| Historical ~$2,789 valuation | Recalculate | Must be rebuilt from balances and historical prices. |

## Primary transaction evidence

### Polygon APEPE swap
https://polygonscan.com/tx/0x73d98abfe6147358a2b56af8fe936dce1d721d6970ed6e30d4c0259c815af13f

Observed: `5,188,571.9488 APEPE -> 42.3664 POL` on 2024-12-13.

### Polygon Uniswap activity
https://polygonscan.com/tx/0xcc685fc1acc0a6ce15d0b66e41a669fa2bf078bf779c23769c4e05cc6c5a7483

Observed activity included approximately 329.65 POL and USDT0 through Uniswap infrastructure on 2025-01-28.

### Base PEPE
https://basescan.org/token/0x698dc45e4f10966f6d1d98e3bfd7071d8144c233?a=0x5e1cf44f3e0314e9f28bf7140166a4f113a9d6da

Observed: approximately 4.127B PEPE in the cited snapshot.

### Ethereum MAGA/TRUMP
https://etherscan.io/token/0x4f4a556361B8B4869F97b8709ff47c1B057Ea13b?a=0x5e1cf44f3e0314e9f28bf7140166a4f113a9d6da

Observed: approximately 762,922,884.52 MAGA (TRUMP).

Important: this is the older MAGA/TRUMP ERC-20, not the later Official Trump token.

## Attribution caution

Holding or trading a token does not prove affiliation with its issuer, project, public figure, Telegram group, exchange, or protocol. Explorer labels, ENS names, dust transfers, and common counterparties are leads rather than proof of common control.

## Next verification steps
1. Enumerate complete Ethereum, Polygon, and Base histories.
2. Identify bridges and cross-chain exits/entries.
3. Search exact PENGU contract interactions and Pudgy Penguins NFT transfers.
4. Search TON and TRON/TRX flows.
5. Cluster repeated counterparties and exchange endpoints.
6. Reconstruct historical balances at key dates.
7. Test the alleged $151M/$870M figures against transaction-level evidence.

## Current conclusion

The address is demonstrably an actively used multi-chain wallet with real DEX and meme-token activity. Extraordinary wealth and ownership claims remain unsubstantiated.
