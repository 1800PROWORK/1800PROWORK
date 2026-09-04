# ROAR — Ownership and Control Status

**Recorded:** 2026-09-04
**Scope:** Public-chain ownership and control assessment

## Purpose

Record the current status of cryptographic control and on-chain control for the principal addresses presently under review. This document distinguishes address activity, contract administration, and cryptographic control by a person or wallet operator.

## Control standard

An address should not be described as personally controlled merely because it:

- receives or sends assets;
- appears in a contract creation record;
- operates a contract;
- appears in a token distribution;
- shares code or transaction patterns with another address; or
- is labelled by an explorer or third-party service.

The strongest direct test for an EOA is a fresh signature from that address over a unique challenge. For a smart-contract wallet, control must be established through the wallet's applicable signature or authorization mechanism, such as ERC-1271 where implemented.

## Current address set

### Base wallet

`0x2300d8E6604e8E9B27170739cE520F4C76237BDA`

Current project record identifies this as the Base wallet associated with the SHARK and WHALE collectibles. No fresh cryptographic signature from this address has been recorded in the project materials reviewed for this update.

**Status:** Control not cryptographically demonstrated in the current record.

### SIMBASE contract

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

Recorded BaseScan fields:

- Creator: `0x9db64303c5d07f7eF68d18b370BE1BDc0EcC3AeF`
- tokenDeployer: `0x31C0282Fa6D0A82aD22ab63BbaCd87F62B2a9bfD`

Creator and tokenDeployer are distinct addresses.

**Status:** Contract identity established. Human or personal control of either address is not established by the current record.

### Base Jump

`0x31C0282Fa6D0A82aD22ab63BbaCd87F62B2a9bfD`

Independently identified in the project record as the Base Jump contract. The record also identifies a proxy administration layer associated with the contract.

**Status:** On-chain administrative structure established. Human controller not established.

### Polygon operational node

`0xc2B5f79a5768893b8087667B391C1381c502Ab5c`

The project record documents this address as an operator of the Coinbase: Eager Explorers contract and records an ownership transition involving a factory-produced clone.

**Status:** Strong on-chain control/operation signal. Human identity or personal ownership not established.

## Conclusion

The current public-chain record supports several concrete control relationships, but it does not yet contain a fresh cryptographic signature establishing that any of the above addresses is controlled by a particular person.

The next ownership operation is therefore a fresh challenge-response signature from the address whose control is being claimed. The challenge must be unique to the session and must never require disclosure of a seed phrase or private key.

**Current classification: TECHNICAL CONTROL RELATIONSHIPS ESTABLISHED; PERSONAL CRYPTOGRAPHIC CONTROL NOT YET DEMONSTRATED.**
