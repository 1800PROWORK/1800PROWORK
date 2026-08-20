# Evidence Status

| Track | Current assessment | Next verification target |
|---|---|---|
| Ethereum Mainnet ↔ Base operational overlap | **UNPROVEN / investigation target** | Compare deployment, funding, calldata, and execution fingerprints from primary chain data |
| `gasSaver()` hard-coded hash | **UNPROVEN until reproduced** | Recompute `keccak256(abi.encode(address,uint256))` over exact candidates and record results |
| Base EAS Schema #15 | **CORRELATION ARTIFACT** | Establish whether any attestation creates a cryptographic bridge to investigated addresses |
| Sepolia Land Registry / Sign Document attester | **CORRELATION ARTIFACT** | Verify attester, schema UIDs, timestamps, recipients, and cross-chain links |
| SIMBASE | **SECONDARY CORRELATION TARGET** | Test concrete address/transaction relationships; do not treat naming similarity as evidence |
| 1800PROLOVE | **ARTIFACT TO PRESERVE** | Establish exact creation/deployment provenance and any independently verifiable relationship to the case |

## Interpretation policy

No identity or ownership conclusion should be upgraded beyond **STRONG CORRELATION** without a reproducible bridge. A matching hash, similar contract logic, shared funding source, or similar transaction cadence is evidence only in context and must be tested against alternative explanations.
