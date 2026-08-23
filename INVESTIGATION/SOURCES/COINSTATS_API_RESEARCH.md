# CoinStats API — Investigation Integration

## Finding
CoinStats documents a wallet transaction endpoint that can query a specific address by blockchain, date range, transaction hash, coin, and pagination. It can also query multiple wallets. The API supports 120+ blockchains, including Ethereum and Base.

Primary documentation:
- https://coinstats.app/api-docs/openapi/get-wallet-transactions/
- https://coinstats.app/api-docs/openapi/get-wallet-balances/
- https://coinstats.app/api-docs/mcp/tools/

## Relevant investigation target
`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

## Highest-value CoinStats queries

### Ethereum
Query transaction history for the target address with:
- address = `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`
- blockchain/connectionId = `ethereum`
- date range covering at least 2024-08-16 through 2024-11-15 and preferably the full history

### Base
Repeat with:
- blockchain = `base`

### Specific transaction
Query TX:
`0x1423190f6d4cf0934ae98e7db07494ba5a5e19821fd5c467783339556c56f7c4`

## Why this matters
CoinStats transaction responses can include transaction hash, explorer URL, timestamps, token/asset amounts, fees, and transaction direction. Its changelog also documents `fromAddress` and `toAddress` response fields. This can help construct the backward/forward transaction graph, but primary chain explorers/RPC data remain the evidentiary authority.

## Authorization note
The documented REST endpoint requires an `X-API-KEY`. The CoinStats MCP route instead uses OAuth for a user's own CoinStats account. No CoinStats credential should be placed in this repository or chat.

## Evidence standard
CoinStats-derived observations are corroborating/indexing evidence. A CoinStats record does not by itself establish ownership or common control. Any material finding must be independently checked against primary on-chain data.

## Next step
Obtain the target wallet's Ethereum and Base transaction datasets, identify the exact Reservoir relay receiver/downstream destination, and compare discovered addresses with the June 2024 Base deployment cluster and the `gasSaver()` candidate set.
