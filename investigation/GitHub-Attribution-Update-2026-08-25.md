# GitHub Attribution Investigation Update — 2026-08-25

## Scope
Fresh GitHub attribution pass for the blockchain/EAS identity investigation. This record distinguishes GitHub-source evidence from on-chain evidence and does not treat absence of a GitHub match as evidence of absence of on-chain control.

## Repository under investigation
- `1800PROWORK/1800PROWORK`
- Default branch: `main`

## Exact address searches performed
No direct GitHub repository/code attribution was identified for:

- `0xf5279440e1da8fc1bf27eA7D64dB90373E2559C0`
- `0xea9eeafdada27d502115afc591b0a6eb5d14351e`
- `0xe12eB4879b7b53e91117f2925f45e9c895CB560B`
- `0xc2B5f79a5768893b8087667B391C1381c502Ab5c`

A search for the distinctive EIP-1167 proxy implementation fingerprint containing `0xea9eeafdada27d502115afc591b0a6eb5d14351e` likewise produced no direct attribution.

## Incidental GitHub result
`0x33D82C144717FCd83965ca26fAd4D4256E6052DD` produced an incidental repository result. It is not sufficient to attribute the contract, Coinbase, the factory, or `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` to that repository.

## On-chain relationship currently under investigation
The investigation record documents the following deployment/control structure:

`0xc2B5f79a5768893b8087667B391C1381c502Ab5c`
→ caller / transaction origin in the relevant factory activity

`0xe12eB4879b7b53e91117f2925f45e9c895CB560B`
→ factory / CREATE2 deployment infrastructure

`0xf5279440e1da8fc1bf27eA7D64dB90373E2559C0`
→ EIP-1167 proxy instance

`0xea9eeafdada27d502115afc591b0a6eb5d14351e`
→ implementation referenced by the proxy family

The investigation record also documents explicit `OwnershipTransferred` events in which `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` became owner of at least one clone produced through the same factory sequence.

## Evidentiary boundary
The following propositions must remain separate:

1. `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` interacted with the factory — on-chain evidence.
2. `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` was made owner of documented clone(s) produced through that factory — on-chain ownership-event evidence.
3. `0xf5279440e1da8fc1bf27eA7D64dB90373E2559C0` belongs to the same implementation/deployment family — structural/on-chain evidence.
4. `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` is specifically the owner/controller of `0xf5279440e1da8fc1bf27eA7D64dB90373E2559C0` — requires instance-specific ownership/initialization evidence.
5. `0xc2B5f79a5768893b8087667B391C1381c502Ab5c` identifies a particular human or organization — not established by an EOA address alone.

## GitHub conclusion
GitHub currently provides no direct public-source attribution for the exact addresses or proxy implementation fingerprint above. This is a negative GitHub finding only. It does not negate the separate on-chain evidence.

## Next GitHub research targets
Search for source-level fingerprints rather than addresses:

- distinctive Solidity function signatures
- ABI selectors
- event definitions
- CREATE2 factory logic
- initialization routines
- storage-slot patterns
- ERC-1155/account functionality
- unusual constants
- distinctive revert strings
- EIP-1167 clone deployment code

## Repository history context
Recent commits already present in `1800PROWORK/1800PROWORK` include:

- `094ab05afb6fcf3c69f56ea3da89563cf20e7fad` — Add Etherscan forensic workflow and cross-chain verification targets
- `e52d5ec4bbaae62a97a40e7bff4ea92a6c1267d5` — Refine casefile structure: improve formatting, add checklists, clarify evidence standards, and document chain of custody
- `6f9e479d4bfeca66bc18cf29502e26579f6bde02` — Document EIP-1271 owner-based signature verification
- `f9c69cbd0ee0734065b54df282aef14a07018a92` — Add cryptographic ownership proof standard to investigation

## Status
**Updated:** 2026-08-25

**GitHub attribution:** No direct attribution identified.

**On-chain control:** Partial relationships established; instance-specific ownership of `0xf5279440e1da8fc1bf27eA7D64dB90373E2559C0` remains a discrete verification target.

**Real-world identity attribution:** Not established.
