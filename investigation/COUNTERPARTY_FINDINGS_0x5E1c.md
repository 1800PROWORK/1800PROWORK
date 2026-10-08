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
