# Evidence Status

| Track | Current assessment | Next verification target |
|---|---|---|
| Ethereum Mainnet ↔ Base operational overlap | **UNPROVEN / investigation target** | Compare deployment, funding, calldata, bytecode, and execution fingerprints from primary chain data |
| Base `gasSaver()` source reuse | **VERIFIED / STRONG CORRELATION** | Expand to additional contracts and compare creation bytecode, metadata, deployers, funding, and callers |
| `gasSaver()` hard-coded hash | **PARTIALLY TESTED** | Test actual `gasSaver(uint256)` callers and exact function inputs; one investigated Base contract address candidate is disproved |
| Base EAS Schema #15 | **CORRELATION ARTIFACT** | Establish whether any attestation creates a cryptographic bridge to investigated addresses |
| Sepolia Land Registry / Sign Document attester | **CORRELATION ARTIFACT** | Verify attester, schema UIDs, timestamps, recipients, and cross-chain links |
| SIMBASE | **SECONDARY CORRELATION TARGET** | Test concrete deployer/caller/funding addresses; the SIMBASE contract address itself does not reproduce the supplied hash with `n=100` |
| 1800PROLOVE | **ARTIFACT TO PRESERVE** | Establish exact creation/deployment provenance and any independently verifiable relationship to the case |

## Verified code-reuse finding

The investigation has established that the distinctive `gasSaver(uint256)` implementation appears in at least two verified Base contracts:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590` — CC8 ON BASE / `CCONBASE`
- `0xe47434de787ff9d14f59400687167d7e06c888a3` — 1MDC / `OMDC`

The repeated fingerprint includes the same `msg.sender` capture, fixed `n0 = 100`, `abi.encode(a0, n0)`, the same hard-coded Keccak-256 target, and the same inline-assembly storage division/write sequence. The detailed evidence record is `INVESTIGATION/EVIDENCE/BASE_GASSAVER_SOURCE_REUSE.md`.

This establishes **code reuse/common code lineage as a strong correlation**, but not common ownership or common private-key control.

## Completed deterministic hash test

For Base address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` with `n0 = 100`, the exact `abi.encode(address,uint256)` input produces:

`0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0`

This does **not** equal the supplied target:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

Therefore the specific hypothesis that this contract address is the encoded `msg.sender` satisfying the condition at `n0 = 100` is **DISPROVED**.

Importantly, this negative result does not disprove the `gasSaver()` mechanism or the broader investigation. The function hashes the caller (`msg.sender`), not necessarily the contract address. The next test must therefore examine actual caller addresses from `gasSaver(uint256)` transactions.

## Interpretation policy

No identity or ownership conclusion should be upgraded beyond **STRONG CORRELATION** without a reproducible bridge. A matching hash, similar contract logic, shared funding source, or similar transaction cadence is evidence only in context and must be tested against alternative explanations.
