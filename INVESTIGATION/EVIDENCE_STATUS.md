# Evidence Status

| Track | Current assessment | Next verification target |
|---|---|---|
| Ethereum Mainnet ↔ Base operational overlap | **UNPROVEN / investigation target** | Compare deployment, funding, calldata, and execution fingerprints from primary chain data |
| `gasSaver()` hard-coded hash | **PARTIALLY TESTED** | Test actual transaction `msg.sender` candidates and exact function inputs; SIMBASE contract candidate tested negative |
| Base EAS Schema #15 | **CORRELATION ARTIFACT** | Establish whether any attestation creates a cryptographic bridge to investigated addresses |
| Sepolia Land Registry / Sign Document attester | **CORRELATION ARTIFACT** | Verify attester, schema UIDs, timestamps, recipients, and cross-chain links |
| SIMBASE | **SECONDARY CORRELATION TARGET** | Test concrete deployer/caller/funding addresses; the SIMBASE contract address itself does not reproduce the supplied hash with `n=100` |
| 1800PROLOVE | **ARTIFACT TO PRESERVE** | Establish exact creation/deployment provenance and any independently verifiable relationship to the case |

## Completed deterministic test

For Base address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` with `n0 = 100`, the exact `abi.encode(address,uint256)` input produces:

`0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0`

This does **not** equal the supplied target:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

Therefore that specific address/value hypothesis is **DISPROVED**.

## Interpretation policy

No identity or ownership conclusion should be upgraded beyond **STRONG CORRELATION** without a reproducible bridge. A matching hash, similar contract logic, shared funding source, or similar transaction cadence is evidence only in context and must be tested against alternative explanations.
