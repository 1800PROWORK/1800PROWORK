# Counterparty Node — 0xf2B1...EDB17D

Target wallet: `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`
Counterparty: `0xf2B1ceA4e5AaAbDD1799ec04D74d23F3FFEDB17D`

## Direct funding relationship

The counterparty sent POL directly to the target at least five times between 2024-11-26 and 2024-12-27, totaling **0.8765240246593047 POL**:

| Date | POL | Tx |
|---|---:|---|
| 2024-11-26 | 0.352851862443908 | https://polygonscan.com/tx/0x7377127e43d2ce6eeffea2ff26b85ce2ce82730a9de1c8eb79f2549ea439f2a4 |
| 2024-11-29 | 0.169792608339052 | https://polygonscan.com/tx/0xdb6f604a86197c7e8ef493e39598b66bafdc42dc698e07b7d33c83664e5f2f23 |
| 2024-12-16 | 0.204071567929187516 | https://polygonscan.com/tx/0xd814822249d54fab280607dbfdeb83732343a2e16ac912de28c760d6b0a3a949 |
| 2024-12-16 | 0.001011930674595 | https://polygonscan.com/tx/0x6d1bbbf586024c607a271addb65a945c939cfbbdbae941f9c0f8bc02900e8784 |
| 2024-12-27 | 0.14879605527256223 | https://polygonscan.com/tx/0xc6f5d028d5ba6120d5b96591fe4963b7733e75bc8c724df035c1b4e263b04c72 |

These are native POL transfers directly from the EOA to the target, not router-mediated transfers. Explorer records verify the sender and recipient on each transaction. cite references omitted from GitHub artifact; source URLs above are primary records.

## Counterparty's own upstream funding

PolygonScan identifies `0x44c7e46a3e3af17a1b2002893b46fc6481a5cfaf` as the funding source for `0xf2B1...EDB17D`. This creates a second-hop graph lead:

`0x44c7...5cFaF` → `0xf2B1...EDB17D` → `0x5E1c...9D6DA`

PolygonScan's address record for `0xf2B1...EDB17D` also shows 56 transactions and identifies `0x44c7...5cFaF` as its funder. https://polygonscan.com/address/0xf2b1cea4e5aaabdd1799ec04d74d23f3ffedb17d

## Counterparty behavior

The `0xf2B1` wallet has additional token activity, including transfers involving USDT0 and RCKT, and DEX/Settler interactions. For example, on 2024-11-25 it sent 0.11316 USDT0 to `0x469CA19C...0F193aA69`; on 2024-12-15 it sent 10,000,000 RCKT to the same address. These observations are behavioral context, not attribution. Sources:

- https://polygonscan.com/tx/0xd1805385096c78f4503024422cc43d49825c0855a0e50ca53e4c9647d4bea924
- https://polygonscan.com/tx/0xdcb37b34d2f5e76b4b38284a6d44c4a4a96f2db1080a441ceec72b340a182dc4

## Assessment

**Confirmed:** repeated direct funding from `0xf2B1` to the target.

**Confirmed lead:** `0xf2B1` itself is funded by `0x44c7...5cFaF` according to PolygonScan's address graph.

**Not established:** common ownership, operator identity, exchange ownership, Telegram affiliation, MAGA/TRUMP affiliation, Pepe/PENGU affiliation, or control by any named person/entity.

## Next investigative step

Trace `0x44c7...5cFaF` and determine whether it is an exchange/service/treasury/router-like hub, and compare its outbound flows against the target's funding chronology. Then test whether the target ever sends assets to `0xf2B1` or to other addresses funded by the same upstream node.
