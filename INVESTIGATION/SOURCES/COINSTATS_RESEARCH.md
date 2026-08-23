# CoinStats Research Source

## Relevance to the investigation
CoinStats documents a wallet-data layer covering 120+ blockchains, including Ethereum and Base, with wallet balances, transactions and DeFi positions. Its MCP catalog exposes `get-wallet-balance`, `get-wallet-balances`, `get-wallet-transactions`, and transaction-sync tools.

## Critical capability
`get-wallet-transactions` supports an address plus a blockchain/connection identifier, transaction-hash filtering, date ranges, and sender/recipient fields in current responses. This makes it suitable for structured cross-chain corroboration of the investigation target:

`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

## Investigation workflow
1. Query Ethereum transactions for the target address.
2. Query Base transactions for the same address.
3. Identify inbound funding and outbound transfers around Aug. 16 and Nov. 15, 2024.
4. Resolve the Reservoir Relay transaction and downstream destination.
5. Compare discovered addresses against the June 2024 Base deployment set.
6. Use CoinStats as a corroborating data source; verify material conclusions against primary on-chain records.

## Authentication boundary
The CoinStats MCP uses OAuth for a user's own CoinStats account. The REST API uses an API key. No CoinStats credentials should be stored in this repository or provided in chat.

## Sources
- CoinStats MCP tool catalog: https://coinstats.app/api-docs/mcp/tools/
- Wallet transactions: https://coinstats.app/api-docs/openapi/get-wallet-transactions/
- Transactions sync: https://coinstats.app/api-docs/openapi/transactions-sync
- MCP connection/authentication: https://coinstats.app/api-docs/mcp/connecting/

## Evidence status
CoinStats is currently a **CORROBORATION SOURCE**, not a substitute for primary blockchain evidence. Access to a user's private CoinStats account data requires OAuth authorization; public blockchain investigation can continue independently.
