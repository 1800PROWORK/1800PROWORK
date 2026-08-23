# SIMBASE — BaseScan Evidence Record

**Status:** Evidence consolidation in progress

## Contract

- **Network:** Base
- **Contract:** `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`
- **Token:** ERC-20 SIMBASE (SIMBA)
- **ETH balance shown:** `0 ETH`
- **Transactions shown:** 10 total
- **Contract creator displayed by BaseScan:** `0x9db64303...c0EcC3AeF` (truncated in supplied screenshot; full address must be independently recovered before use)

## Observed transaction pattern

The supplied BaseScan record shows all 10 listed transactions as `Approve` calls into the SIMBASE contract. The senders displayed include:

- `0x34c5097B...E27B7BE60`
- `0x3dB6Ef0f...bB1e9B550`
- `0x1415A5CF...7AEFe5D35`
- `0x8aF7e4Be...A94d2cc5b`
- `gazomlg.base.eth`
- `0xdeF469d1...Dc4dC5112`
- `0x9db64303...c0EcC3AeF`
- `0x05d66690...61331F374`
- `0x16C0Ed87...48f42d051`
- `0xa2A5C62E...B91D6200D`

The screenshot also supplies the complete transaction hashes for each approval.

## Investigative interpretation

The record establishes interaction with the SIMBASE contract. It does **not** establish that the approval senders share a controller, that the contract creator controls all participants, or that SIMBASE is the source of the broader Ethereum/Base activity under investigation.

SIMBASE therefore remains a **correlation target**, consistent with the case methodology.

## Highest-value follow-up

1. Recover the complete SIMBASE creator address.
2. Recover the deployment transaction and block/timestamp.
3. Retrieve verified source code/bytecode and ABI.
4. Resolve every approval sender to its complete address.
5. Trace creator funding provenance.
6. Compare creator and participant addresses against the existing Ethereum/Base investigation clusters.
7. Compare deployment/function structure against the June 2024 Base transient deployments.
8. Test any candidate address from this chain against the deterministic `gasSaver()` hash construction only after the address is independently established.

## Evidence classification

**VERIFIED:** SIMBASE contract identity and the 10 displayed approval interactions, based on the supplied BaseScan record.

**UNPROVEN:** common ownership/control, relationship to the June 2024 Base deployments, relationship to `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`, EAS linkage, or `gasSaver()` linkage.

## Source

Supplied BaseScan screenshot in the investigation conversation. Primary explorer verification should be retained alongside this record when available.
