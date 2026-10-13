# OP Mainnet Contract Investigation — DefaultReceiver

**Target:** `0x2a8010A9D71D2a5AEA19D040F8b4797789A194a9`  
**Network:** Optimism (OP Mainnet)  
**Status:** Preliminary investigation; several deployment and attribution details remain unverified  
**Prepared:** 2026-10-13

## Executive summary

The target address has been associated in preliminary research with a contract described as `DefaultReceiver` and with Coinbase/Base EIP-7702 proxy infrastructure. This is a working lead, not a final attribution. Before treating the association as established, verify the target's current explorer record, source code, creation transaction and trace, and any relevant upstream deployment documentation.

This report does **not** establish beneficial ownership, prove that a particular person or company controls the address, or establish that the contract is safe or malicious. No conclusion about the absence of transactions, tokens, or NFTs should be drawn without complete chain-specific queries.

## Target and primary references

- Target address: `0x2a8010A9D71D2a5AEA19D040F8b4797789A194a9`
- OP Mainnet explorer: https://optimistic.etherscan.io/address/0x2a8010A9D71D2a5AEA19D040F8b4797789A194a9
- Reported deployment transaction (verify independently): https://optimistic.etherscan.io/tx/0xdb5fb0cbec22115e59f2ebefe0e67488efd8d46a24eec289dcf6db8f820cbfd9
- Upstream repository lead: https://github.com/base/eip-7702-proxy
- Possible source file: https://github.com/base/eip-7702-proxy/blob/main/src/EIP7702Proxy.sol

## Related-address leads — verify before relying on them

The following addresses were mentioned in preliminary notes as potentially related. Their roles and relationships have **not** been independently established in this report.

| Label from preliminary notes | Address | Verification needed |
|---|---|---|
| EIP-7702 Proxy | `0x7702cb554e6bFb442cb743A7dF23154544a7176C` | Confirm network, bytecode, source and relationship to target |
| NonceTracker | `0xD0Ff13c28679FDd75Bc09c0a430a0089bf8b95a8` | Confirm network and deployed contract role |
| CoinbaseSmartWalletValidator | `0x79A33f950b90C7d07E66950daedf868BD0cDcF96` | Confirm network, code and relationship |
| CREATE2 factory (reported) | `0x4e59b44847b379578588920cA78FbF26c0B4956C` | Confirm factory call in the actual deployment trace |
| Creator/initiator (reported) | `0xd6fA83443CBe5F7ef9345b315F203f4F01AB06C6` | Distinguish transaction sender, factory caller and CREATE2 deployer |

A deployment transaction's sender, the account calling a CREATE2 factory, the factory address, and any explorer-labelled “creator” are different roles. None alone proves beneficial ownership or ongoing control.

## Investigation plan

### 1. Ownership and purpose

1. Confirm the target's chain ID and deployed bytecode.
2. Inspect verified source code and compiler metadata, if available; compare deployed runtime bytecode against the published build.
3. Review constructor/initialization behavior, immutable values, storage layout, access-control paths and any external-call/delegatecall behavior.
4. Look for authoritative upstream documentation tying the exact address and network to a named deployment.
5. Record the strongest supported attribution and confidence level. Do not infer ownership from a label, repository name, or a single transaction sender.

### 2. Crypto and NFT activity

Query OP Mainnet history for the target address and distinguish:
- Native ETH transfers from internal calls.
- ERC-20 transfers from token balances.
- ERC-721 and ERC-1155 transfers from current ownership.
- Direct calls from activity routed through a smart account or proxy.
- Historical activity from current balances.

Record the query window, block range, data provider, and limitations. A zero balance at one point in time would not prove that an address has never held assets. An empty explorer page or incomplete index is not proof of no activity.

### 3. Transaction and deployment tracing

1. Retrieve the reported deployment transaction and receipt.
2. Confirm chain, block number, timestamp, status, transaction sender, input data, logs and contract-creation result.
3. Inspect the execution trace to identify CREATE/CREATE2 operations and the exact caller/factory relationships.
4. If CREATE2 was used, independently derive the expected address from factory, salt and init-code hash.
5. Follow the deployer's prior transactions only as far as evidence supports; avoid attributing a human or organization without corroboration.

Reported transaction to check: `0xdb5fb0cbec22115e59f2ebefe0e67488efd8d46a24eec289dcf6db8f820cbfd9`. A date of May 5, 2025 was also reported in preliminary notes; confirm against the chain timestamp before citing it as fact.

### 4. Security review

Review source and deployed bytecode for:
- Authorization and initialization assumptions.
- Arbitrary external calls, delegatecall targets and upgrade paths.
- Signature validation, replay protection and nonce handling.
- Reentrancy and asset-transfer edge cases.
- Chain-specific assumptions and interactions with related contracts.
- Known audits, scope, commit/version audited, and whether the deployed bytecode matches the audited artifact.

Source verification is not proof of safety. An explorer's audit/submission field is not a complete audit registry. This preliminary report establishes no vulnerability finding and does not establish maliciousness or compromise of anyone's assets.

## Evidence and confidence standard

Every material claim added in later revisions should be labelled as one of:

- **Verified on-chain:** supported by a reproducible transaction, receipt, trace, block or contract query on the named network.
- **Verified source:** source and compiler/build details match the deployed bytecode.
- **Documented upstream:** an authoritative project source explicitly identifies the exact address and network.
- **Inference / lead:** plausible relationship that still needs corroboration.
- **Unknown / not checked:** evidence has not yet been collected or is incomplete.

For each verified claim, retain the chain, block number, transaction hash or contract address, source link, retrieval date and a short explanation of what the evidence does—and does not—prove.

## Current limitations

- Deployment metadata and related-address labels above are preliminary leads and must be independently rechecked.
- No complete native-asset, ERC-20, ERC-721 or ERC-1155 export is included here.
- No full execution trace or independent bytecode comparison is included here.
- No audit report has been confirmed as applicable to the exact deployed bytecode.
- This document is a research worklog, not a formal audit, legal attribution, or proof of ownership.

## Next update

Replace preliminary leads with reproducible evidence, preserve links and block/transaction identifiers, and explicitly note any unresolved discrepancies. Do not promote an inference to a verified fact without supporting evidence.
