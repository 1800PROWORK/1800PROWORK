# SIMBASE (SIMBA) — Base Contract Evidence

**Status:** UNPROVEN as an identity linkage; contract activity is VERIFIED from the supplied BaseScan record.

## Contract

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

BaseScan identifies the contract as **ERC-20: SIMBASE (SIMBA)**.

## Creator shown by BaseScan

`0x9db64303...c0EcC3AeF`

The supplied BaseScan page reports the contract creator as this address and indicates the contract was created approximately two years before the supplied screenshot.

**Important:** the displayed creator is truncated in the supplied evidence. The complete address must be recovered directly from BaseScan before using it as a forensic identifier.

## Observed transaction set

The supplied BaseScan page reports exactly 10 transactions for the contract, all shown as `Approve` actions. The visible senders include:

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

All displayed transaction values are 0 ETH; the page shows small transaction fees.

## Investigative significance

The creator address is the highest-value lead. The approval transactions alone do not establish common control between SIMBASE and any other investigated address.

Required follow-up:

1. Recover the complete creator address.
2. Recover the deployment transaction hash, block, and timestamp.
3. Obtain verified source code/ABI and deployed bytecode where available.
4. Recover complete addresses for all 10 approval senders.
5. Compare creator funding paths with the June 2024 Base deployment cluster.
6. Compare bytecode/function selectors against the transient Base contracts under investigation.
7. Test for relationships with `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`.
8. Keep SIMBASE classified as a correlation target unless reproducible evidence establishes a stronger linkage.

## Evidence classification

**VERIFIED:** The supplied BaseScan record shows this contract as SIMBASE (SIMBA), identifies a creator, and lists 10 approval transactions.

**UNPROVEN:** Any claim that the SIMBASE creator controls the investigated addresses or that SIMBASE is part of the same ownership structure.

## Source

Primary visual evidence supplied by the investigator from BaseScan for contract `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`.
