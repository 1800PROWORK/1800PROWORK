# CoinStats MCP — Investigation Data Source

## Purpose
CoinStats can provide wallet balances and transaction history across 120+ blockchains after the user's own CoinStats account is authorized through OAuth. It is therefore potentially useful as a secondary portfolio/transaction source for the ongoing blockchain investigation.

## Documented connection
Server URL: `https://mcp.coinstats.app/mcp`

Authentication: OAuth 2.1 with PKCE (S256), user authorization required.

## Investigative use
Use CoinStats as a corroborating source for:

- wallet balances and historical activity
- cross-chain transaction discovery
- asset movements that may be missed by a single-chain explorer
- portfolio/address relationships already visible in the user's CoinStats account

CoinStats data should be treated as a secondary evidence source. Any material forensic conclusion should still be independently verified against primary on-chain transaction data, contract logs, block explorers, or RPC-derived evidence.

## Immediate target
Investigate:
`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

Priority networks:
1. Ethereum Mainnet
2. Base
3. Other EVM networks where CoinStats shows activity

Priority correlation targets:
- June 2024 Base deployment cluster
- downstream activity from the Nov. 15, 2024 Reservoir Relay transaction
- funding sources and subsequent destinations
- EAS-related addresses
- SIMBASE-related addresses
- 1800PROLOVE-related addresses

## Limitation
The CoinStats MCP authorization described in the supplied documentation is account-specific. No CoinStats account data is asserted here unless it is actually returned through an authorized connector/tool call.

## Evidence classification
CoinStats observations: **CORROBORATING DATA** until independently verified on-chain.

Ownership/control conclusions require stronger evidence and must not be inferred solely from CoinStats labels or portfolio grouping.
