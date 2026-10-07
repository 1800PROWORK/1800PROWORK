# Chronological Transaction Ledger — 0x5E1c...9D6DA

Target: `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`

## Status
First-pass ledger from directly indexed explorer records. This is not yet a complete chain-wide export.

| Date | Chain | Activity | Amount / detail | Transaction |
|---|---|---|---|---|
| 2024-12-13 | Polygon | APEPE -> POL | 5,188,571.9488 APEPE -> 42.3664 POL | https://polygonscan.com/tx/0x73d98abfe6147358a2b56af8fe936dce1d721d6970ed6e30d4c0259c815af13f |
| 2024-12-13 | Polygon | $CULO DEX swap | 666,590.57318251 $CULO; KyberSwap/QuickSwap route | https://polygonscan.com/tx/0xc4e9683c98f23b63e351811bd4607c0c14c9e2a27fd762716bebad5cf8795e95 |
| 2024-12-17 | Base | ETH inbound dust | 0.000000144322353661 ETH; `emadalshamery.base.eth` | https://basescan.org/tx/0x698646b7d71395d34152b67def25b2237269488a1de3f792323504c68e83ca83 |
| 2025-01-28 | Polygon | Uniswap DEX | 586.4621823214 POL internal transfer | https://polygonscan.com/tx/0xfbc2a17a7810857c55ce99d4585a1f0d05d862a5c9e3f01e83c0760d6ecae8f4 |
| 2025-01-28 | Polygon | Uniswap DEX | 329.6494994373 POL + 129.882726 USDT0 | https://polygonscan.com/tx/0xcc685fc1acc0a6ce15d0b66e41a669fa2bf078bf779c23769c4e05cc6c5a7483 |
| 2025-02-12 | Polygon | POL inbound | 0.039442970656370885 POL | https://polygonscan.com/tx/0xe01c830942c95c2b1c3547a64e438d9683132063a851d5ed374e2946e04ee3a7 |
| 2025-02-13 | Polygon | POL inbound | 0.75634825291434849 POL | https://polygonscan.com/tx/0x024b3ef09320367366d37b9e55841c71f05221eabbd5746d652d442c18d0dcd1 |
| 2025-02-22 | Polygon | POL inbound | 0.003061956904065528 POL | https://polygonscan.com/tx/0xbfd0ab6d6360ada886644a2a52f9a7fda7b66062ae40895aba95bd45d7a22472 |
| 2025-11-30 | Polygon | USDT0 contract interaction | 0 POL native value | https://polygonscan.com/tx/0x5b401e9b864f913a7e05531db59ddbeec8bac8577765dcbecfe9ecd6e8214b00 |

## Interpretation

- The wallet shows repeated Polygon DEX activity from December 2024 onward.
- APEPE and PEPE are distinct assets and must remain separate in analysis.
- Small inbound POL transfers are graph leads, not proof of funding or common control.
- The Base ETH dust transfer is economically negligible and is retained only as an attribution lead.
- The ledger still needs complete Ethereum, Polygon, Base, bridge, NFT, PENGU, TON, and TRON coverage.

## Evidence standard

Verified means directly supported by an explorer transaction/state. Token/project metadata, ENS names, dust transfers, or thematic similarities do not establish ownership or affiliation.

## Next pass

1. Complete chain-wide transaction enumeration.
2. Extract all bridge paths.
3. Search PENGU and Pudgy Penguins NFT transfers.
4. Search TON/Telegram and TRON/TRX relationships.
5. Cluster repeated counterparties and exchange endpoints.
6. Reconstruct historical balances and valuations.
