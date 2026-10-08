# Counterparty Findings — 0x5E1c

Target: `0x5E1cf44F3E0314E9F28bf7140166A4F113A9D6DA`

## Finding 1 — Repeated direct Polygon funding source

Address `0xf2B1ceA4e5AaAbDD1799ec04D74d23F3FFEDB17D` directly sent POL to the target on multiple dates:

- 2024-11-26: 0.352851862443908 POL
- 2024-11-29: 0.169792608339052 POL
- 2024-12-16: 0.204071567929187516 POL
- 2024-12-16: 0.001011930674595 POL
- 2024-12-27: 0.14879605527256223 POL

This establishes a repeated direct funding relationship on Polygon. It does not establish common ownership or identity.

## Finding 2 — Funding-source activity predates target trading

The same source address was active on Polygon before and during the target's December 2024 DEX activity. On 2024-11-30 it interacted with the 0x Settler V1.7 contract, and on 2024-11-25 it interacted with the JumpTask JMPT token contract.

These are behavioral/context clues only; they are not attribution evidence by themselves.

## Finding 3 — DEX activity is infrastructure, not attribution

The target's verified December 2024 and January 2025 swaps route through KyberSwap and Uniswap infrastructure. Those router addresses should not be treated as counterparties or owners.

## Finding 4 — Base-chain meme-token holdings

BaseScan currently indexes the target with balances of PEPE, FWOG, MOG, and other meme/community tokens. These holdings support the observation that the wallet traded or accumulated multiple meme-token assets. They do not establish affiliation with the respective projects.

## Investigative priority

The strongest new lead is `0xf2B1...EDB17D` because it is a repeated direct EOA-to-target funding source. Next steps are to reconstruct its full funding history, determine whether it shares bridge or exchange sources with the target, and identify whether it ever receives assets back from the target.

## Evidence standard

No person, company, project, Telegram channel, or exchange is attributed to either wallet without independent evidence. Transactional proximity is recorded separately from ownership/control.

## Follow-up tracing — 2026-10-08

Public explorer evidence confirms the repeated funding relationship and also shows that the funding wallet itself participates in other token transfers and DEX/settler activity. In particular, `0xf2B1...EDB17D` used the Polygon 0x Settler V1.7 infrastructure on 2024-11-30 and later sent RCKT and other assets to separate addresses. This means the wallet is an active trading/transfer node rather than a one-off gas faucet. However, no public evidence reviewed in this pass identifies its human owner or proves that it is controlled by the same entity as `0x5E1c`.

Verified examples:
- 2024-11-30: `0xf2B1...EDB17D` called the 0x Settler V1.7 contract; internal flow included 0.920340709365657693 POL into the Settler route. Source: https://polygonscan.com/tx/0x3b48184c8b3b9039f8ebaa70881bd194436bdb5cefc90f258fa971b8603fd644
- 2025-01-30: `0xf2B1...EDB17D` sent 0.119628631603060858 POL to `0x469CA19C1a83AdaB2E25bAE229A87510F193aA69`. Source: https://polygonscan.com/tx/0x9e5f249fdfaa94e4120fd7f73812a5f10592ddb9afeb4b30dc8ded9293e74285
- 2025-09-05: `0xf2B1...EDB17D` sent 5,000,000 RCKT to `0xE1fB78C271c7a37Ef5E3DF1c5EC38aB5bc1E5bc9`. Source: https://polygonscan.com/tx/0x21fa7d52fedc2a2dff065ee9588b24be2b78681f0c06c2e51183e428a48c6595

### Assessment

The evidence raises the priority of `0xf2B1...EDB17D` as a funding/counterparty node, but does not yet justify attributing it to a named person, project, exchange, or organization. The strongest next test is temporal correlation: compare the source wallet's inbound funding immediately before each transfer to `0x5E1c`, then compare downstream destinations after those transfers. Reciprocal transfers between the two wallets would materially strengthen the relationship; shared upstream exchange/bridge sources would be a weaker but useful correlation.


## Finding 5 — Reciprocal flow between funding-source node and a second EOA

A second Polygon EOA, `0x469CA19C1a83AdaB2E25bAE229A87510F193aA69`, has a repeated reciprocal relationship with `0xf2B1...EDB17D`.

Verified examples:
- 2024-11-25: `0xf2B1...` sent 0.11316 USDT0 to `0x469C...`.
- 2024-11-30: `0xf2B1...` sent 1.221655676108120095 POL to `0x469C...`.
- 2024-12-15: `0xf2B1...` sent 10,000,000 RCKT to `0x469C...`.
- 2024-12-20: `0xf2B1...` sent 0.108869177570120063 POL to `0x469C...`.
- 2024-12-25: `0x469C...` sent 0.15262806448535723 POL back to `0xf2B1...`.
- 2025-01-30: `0xf2B1...` sent 0.119628631603060858 POL to `0x469C...`.
- 2025-11-17: `0xf2B1...` sent 0.066349819642894428 POL to `0x469C...`.

This is stronger than a one-off transfer because the relationship is bidirectional and persists across months. It still does not prove that the two EOAs share an owner.

## Finding 6 — Current graph shape

The verified graph now has:

`0x469C...A69 <-> 0xf2B1...B17D -> 0x5E1c...D6DA`

The `0xf2B1 -> 0x5E1c` leg is directly verified on multiple dates in November/December 2024. The `0x469C <-> 0xf2B1` leg is independently verified through multiple POL and token transfers. This makes `0x469C` a priority second-hop node for funding-source and ownership analysis.

### Caution

The amounts are generally small. Therefore the relationship is currently best characterized as a **persistent operational/transactional cluster**, not evidence of financial control or common ownership.


## Finding 7 — Additional downstream distribution node

Address `0xE1fB78C271c7a37Ef5E3DF1c5EC38aB5bc1E5bc9` is a separate downstream recipient of `0xf2B1...EDB17D`.

Verified examples:
- 2025-09-05: `0xf2B1...` sent 5,000,000 RCKT to `0xE1fB...`.
- 2025-09-05: `0xf2B1...` sent 0.141407956109834661 POL to the same `0xE1fB...` address approximately 12 minutes earlier.

Sources:
- https://polygonscan.com/tx/0x21fa7d52fedc2a2dff065ee9588b24be2b78681f0c06c2e51183e428a48c6595
- https://polygonscan.com/tx/0x3a85c2bdeb509500a4f6731137d1e5c8bf1e8ace615663a13465d945bb332342

### Assessment

This strengthens the characterization of `0xf2B1...` as an active distribution/transfer node. It does not establish that `0xE1fB...` is controlled by the same party as `0x5E1c...`. The temporal proximity between the POL and RCKT transfers is notable but is not, by itself, evidence of a coordinated operation.

## Next investigative test

Priority order is now:
1. Trace inbound funding to `0xf2B1...` immediately before its transfers to `0x5E1c...`.
2. Trace the reciprocal `0x469C...` relationship for common upstream sources.
3. Trace `0xE1fB...` around the September 2025 RCKT/POL transfers.
4. Search for bridge/exchange contracts shared by these nodes.
5. Test whether any of these nodes intersect with the target's PENGU, PEPE, MAGA/TRUMP, TON, or TRON activity.
