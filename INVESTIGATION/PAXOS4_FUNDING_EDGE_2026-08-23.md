# Paxos 4 Funding Edge — 2026-08-23

## Evidence

Funding address:
`0x264bd8291fAE1D75DB2c5F573b07faA6715997B5`

Target address:
`0x33D2443Bf16e48012D520c9ced7467814F9F8AEF`

Funding transaction:
`0x985d9f796b811a2b9aa03c360732c7b76c7268daec09c6655a7beeb3293b35f8`

Amount:
`0.00190382 ETH`

Funding timestamp supplied from Etherscan:
`2024-08-16 22:20:11 UTC`

## Source observations

Etherscan currently displays the funding address with the public labels `Paxos 4`, `Paxos`, and `Exchange`, and states that the address was tagged based on the hildobby compilation. It also displays `Funded By: Paxos: Treasury`.

The funding address is a very high-volume operational address. The supplied Etherscan snapshot reports 6,174,804 transactions and continuing activity. This makes the existence of a transfer to the target address a concrete on-chain relationship, but not by itself evidence that the same person or private-key controller operated both addresses.

## Forensic interpretation

The strongest presently supportable finding is:

**Confirmed:** `0x264bd8291fAE1D75DB2c5F573b07faA6715997B5` directly funded `0x33D2443Bf16e48012D520c9ced7467814F9F8AEF` with `0.00190382 ETH` in transaction `0x985d9f796b811a2b9aa03c360732c7b76c7268daec09c6655a7beeb3293b35f8`.

**Not established:** common ownership/control, human identity, or deliberate coordination between the two addresses.

## Next test

Analyze the funding batch around `2024-08-16 22:20:11 UTC`: identify other recipients funded by the same source in the relevant window and compare their subsequent transaction, token, contract, and cross-chain behavior with the target address.

A Paxos label should be treated as attribution metadata, not cryptographic proof of ownership.
