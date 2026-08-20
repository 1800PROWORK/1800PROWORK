# Hash Finding 001 — `gasSaver()` Target Hash

**Status:** VERIFIED as a code artifact; **UNPROVEN as an identity identifier**

## Target

The investigated Solidity pattern contains:

```solidity
function gasSaver(uint256 n) external {
    address a0 = msg.sender;
    uint256 n0 = 100;
    bytes memory bb = abi.encode(a0, n0);
    if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
        assembly {
            let a := sload(n)
            let b := div(a, n0)
            sstore(n, b)
        }
    }
}
```

## Primary observation

A public BaseScan search independently returns multiple ERC-20 contracts containing this same `gasSaver(uint256)` implementation and the same hard-coded Keccak-256 target. Examples returned include:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590`
- `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`
- `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450`
- `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21`

The search results show the exact hash embedded in the deployed contract/source representation. This establishes that the hash is **not unique merely because it appears in the investigated code pattern**.

## Important implication

The target hash cannot, by itself, be treated as a fingerprint proving a particular deployer, owner, or address. The same constant appearing in multiple contracts is consistent with code reuse, template reuse, copying, or a common source implementation.

## Required next test

For a candidate caller address `A`, compute exactly:

`keccak256(abi.encode(A, uint256(100)))`

and compare the resulting 32-byte value with:

`0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

A match would establish that `A` satisfies the contract's conditional branch. It would **not**, by itself, establish that `A` controls the contract or that the person associated with `A` controls any other investigated address.

## SIMBASE status

Coinbase's public asset page identifies Base SIMBASE at:

`0x1e4d2113D8E304122f2ceAA20B194d7801a84984`

That establishes the address/token association, but the present evidence does not establish that the supplied target hash is the Keccak result for that address with `n0 = 100`.

## Evidence classification

**Hash constant reused across multiple Base contracts:** VERIFIED.  
**Hash uniquely identifies SIMBASE:** DISPROVED as a uniqueness proposition.  
**Hash proves common ownership:** UNPROVEN.  
**Common code lineage is plausible:** POSSIBLE / STRONG CORRELATION depending on bytecode-level comparison.

## Sources

- BaseScan search result for `0x5f4d8c4f73db53c461987e60877386d4a259f590`
- BaseScan search result for `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7`
- BaseScan search result for `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450`
- BaseScan search result for `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21`
- Coinbase SIMBASE asset/address listing
