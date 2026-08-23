# Etherscan API Forensic Workflow

## Purpose
Use Etherscan as a primary on-chain verification layer for the investigation. The API supports Ethereum and Base through the same v2 endpoint with different `chainid` values.

## Priority target
`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

## Highest-value endpoints
1. `account/txlist` — complete normal transaction history; use pagination and bounded block ranges.
2. `account/txlistinternal` — internal ETH transfers and contract-created flows.
3. `account/fundedby` — first known EOA funding source and funding transaction; useful for origin tracing. This is a PRO endpoint and is unavailable for contract addresses.
4. `nametag/getaddresstag` — Etherscan metadata/labels; treat labels as contextual evidence, not ownership proof.
5. `contract/getcontractcreation` — deployer and creation transaction for contracts.
6. `contract/getsourcecode` — verified source, ABI, compiler settings, and proxy information.
7. `logs/getlogs` — event-level evidence for contract interactions.
8. `eth_getTransactionByHash` / `eth_getTransactionReceipt` — transaction and receipt verification.

## Cross-chain plan
Run the same address investigation on:
- Ethereum: `chainid=1`
- Base: `chainid=8453`

Compare:
- first funding transaction
- funding sources
- outbound ETH transfers
- internal transfers
- contract interactions
- deployment relationships
- transaction timing
- repeated counterparties
- method selectors / calldata
- event signatures

## Current evidence chain
`0x264bd8291fAE1D75DB2c5F573b07faA6715997B5`
→ `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

Known transaction:
`0x985d9f796b811a2b9aa03c360732c7b76c7268daec09c6655a7beeb3293b35f8`

The recipient later appears in the Nov. 15, 2024 Reservoir Relay transaction supplied by the investigator:
`0x1423190f6d4cf0934ae98e7db07494ba5a5e19821fd5c467783339556c56f7c4`

## Evidence standard
Etherscan labels, relay infrastructure, and transaction proximity are correlation evidence only. Upgrade to stronger evidence only when a reproducible cryptographic, transactional, or control relationship is established.

## Security
Never commit Etherscan API keys to this repository. Store credentials in environment variables or a secrets manager. The Etherscan documentation explicitly warns against committing keys to public repositories or client-side code.

## Sources
- https://docs.etherscan.io/llms.txt
- https://docs.etherscan.io/api-reference/endpoint/txlist
- https://docs.etherscan.io/api-reference/endpoint/fundedby
- https://docs.etherscan.io/api-reference/endpoint/getaddresstag
- https://docs.etherscan.io/api-reference/endpoint/getcontractcreation
- https://docs.etherscan.io/api-reference/endpoint/getsourcecode
