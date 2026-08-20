# SIMBASE / `gasSaver()` Hash Check

**Date:** 2026-08-20  
**Network:** Base Mainnet  
**Contract:** `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

## 1. Contract identity

Coinbase's public SIMBASE asset page identifies SIMBASE (SIMBA) as a Base asset and lists the contract address above. This establishes the address-to-token association as a secondary-source identification, not ownership evidence.

## 2. Supplied hash test

The investigation supplied the Solidity construction:

```solidity
address a0 = msg.sender;
uint256 n0 = 100;
bytes memory bb = abi.encode(a0, n0);
if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
    // ...
}
```

The target hash is:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

For `abi.encode(address,uint256)`, the address is ABI-encoded as a 32-byte word and `100` as a 32-byte uint256 word. The hash therefore depends deterministically on the exact `msg.sender` address and the constant value 100.

## 3. Current result

**UNPROVEN — no reproducible match has been established between the supplied target hash and the SIMBASE contract address.**

A token contract address is not automatically the `msg.sender` that generated a particular hash. The correct candidate set must come from actual transaction callers or other independently established addresses.

## 4. Required next evidence

1. Identify the SIMBASE deployment transaction.
2. Identify its deployer/creator address.
3. Enumerate relevant caller addresses for the contract/function containing `gasSaver()`.
4. ABI-encode each candidate as `(address,uint256(100))`.
5. Compute Ethereum Keccak-256 for each candidate.
6. Compare against the supplied target exactly.
7. If a match occurs, preserve the transaction hash, block, caller address, calldata, and reproduction procedure.
8. Separately establish whether that caller address is cryptographically or transactionally linked to the other investigated entities.

## 5. Evidence classification

| Claim | Status |
|---|---|
| Address is associated publicly with SIMBASE | **VERIFIED as a public token listing** |
| Address is the hash preimage for the supplied `gasSaver()` target | **UNPROVEN** |
| SIMBASE controls the address | **UNPROVEN** |
| SIMBASE establishes the investigator's proposed identity linkage | **UNPROVEN** |

## Primary-source requirement

The next stage should use Base RPC / explorer transaction data. Base documents the public Mainnet RPC at `https://mainnet.base.org` and confirms that `eth_getCode`, transaction, receipt, log, and related Ethereum JSON-RPC methods are available for Base Mainnet.

## Important limitation

This record deliberately does not infer an identity from the token name, contract address, code similarity, or a presumed hash relationship. A cryptographic match must be reproduced before it is treated as evidence.
