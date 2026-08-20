# Evidence Record — Base SIMBASE Address

**Assessment:** VERIFIED identification of the token address; ownership/deployer linkage remains unverified.

## Address

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

## Network

Base Mainnet (chain ID 8453).

## Primary observation

Coinbase's SIMBASE asset page identifies SIMBASE/SIMBA on Base and lists the exact contract address above. This independently establishes the address-to-asset association, but Coinbase states that its market data is supplied by third parties and does not itself establish contract ownership or deployment provenance.

## Important distinction

This record does **not** establish that the address:

- was deployed by the person under investigation;
- is controlled by the same private key as any Ethereum Mainnet address;
- is the source of the June 2024 Base deployments;
- produces the supplied `gasSaver()` hash; or
- has an EAS attestation proving common control.

Those are separate hypotheses requiring transaction-level evidence.

## Next verification targets

1. Identify the exact Base deployment transaction for the contract.
2. Identify the deployment sender/creator address.
3. Identify the first funding transaction(s) received by that sender.
4. Compare the sender/funder graph with the previously investigated Mainnet and Base addresses.
5. Extract contract bytecode and verified source/ABI, if available.
6. Search the contract's transaction history for `gasSaver()` or the relevant function selector.
7. For every candidate sender address `a0`, compute `keccak256(abi.encode(a0, uint256(100)))` and compare against the supplied target hash.
8. Record any match with the exact address, encoded preimage, hash, transaction context, and independent explorer reference.

## Evidence grade

**VERIFIED:** address is associated with SIMBASE on Base.  
**UNPROVEN:** any identity/control relationship to the broader investigation.

## Sources

- Coinbase SIMBASE asset page: https://www.coinbase.com/fr-fr/price/base-simbase
- Base documentation identifies Base Mainnet as chain ID 8453 and lists Base explorers including Blockscout and Etherscan.
