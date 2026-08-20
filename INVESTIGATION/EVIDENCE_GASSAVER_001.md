# Evidence Record GASSAVER-001 — Reused Hard-Coded Hash Gate

**Classification:** STRONG CORRELATION for code reuse; UNPROVEN for common ownership  
**Network:** Base Mainnet  
**Primary artifact:** `gasSaver(uint256)` implementation containing a hard-coded Keccak-256 comparison

## 1. Verified observation

Public BaseScan contract records show the following implementation pattern:

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

The exact source is publicly visible in BaseScan records for multiple Base ERC-20 contracts, including:

- `0x5f4d8c4f73db53c461987e60877386d4a259f590` — CC8 ON BASE (CC8)
- `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450` — Mint Blockchain (MINTB)
- `0xc0177359a9a0291334d94e086974388e9556d44e`
- `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21`

The MINTB BaseScan record explicitly shows the source at lines corresponding to the `gasSaver` function and the same hard-coded hash, and its ABI includes `gasSaver(uint256)`. See the primary explorer record: https://basescan.org/token/0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450

## 2. Cryptographic construction

The hash input is not the raw textual address. Solidity ABI encoding produces two 32-byte static words:

1. the 20-byte address, left-padded to 32 bytes;
2. the integer `100`, encoded as a 32-byte unsigned integer.

Thus the tested preimage is:

`abi.encode(candidateAddress, uint256(100))`

followed by Keccak-256.

## 3. Candidate reproduction test

Using an independent Keccak-256 implementation, the supplied target was tested against the following known addresses:

| Candidate | Result | Match? |
|---|---|---|
| `0x5f4d8c4f73db53c461987e60877386d4a259f590` | `5656f4f452f90703000d019fc86466e3d8376a25b07f1fa4fa9fcb1e71211855` | NO |
| `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450` | `1d3abe07b2ae0a138350252d6bc3caa6ecd8ba659fa1cee766b613467e4c5c0b` | NO |
| `0xc0177359a9a0291334d94e086974388e9556d44e` | `92d363a60feaf87134b24c752ea8832898eb0968936c21e76d5c668221812024` | NO |
| `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21` | `2dd2bf35f04729a5bdb9a6194420d502c0126578b43e6fa78e4558edd6700253` | NO |
| `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` | `599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0` | NO |

**Target:** `5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

None of the tested addresses reproduces the target.

## 4. Important interpretation

The presence of the same unusual `gasSaver()` source and the same hard-coded hash in multiple Base contracts is materially more significant than a generic ERC-20 code similarity. It establishes a recognizable code artifact that can be searched for across deployments.

However, it does **not** establish that the same person controlled all contracts. Possible explanations include:

- one developer deploying multiple tokens;
- a copied public source template;
- a deployment service or token generator reusing the same implementation;
- multiple actors copying the same code;
- contracts generated from a common source repository.

Therefore the current finding is **STRONG CORRELATION for code reuse**, not ownership attribution.

## 5. Why the hard-coded hash matters

The condition appears designed to restrict the storage-modification branch to a specific `msg.sender`, because `n0` is constant at `100` and the remaining variable is `a0 = msg.sender`.

If a candidate address produces the target hash, that would establish that the address is the intended preimage of the gate. It would still not, by itself, prove that the address controlled the contract. The stronger evidentiary sequence would be:

`candidate address → hash match → actual gasSaver transaction → successful branch execution → address's broader deployment/funding relationships`

A transaction invoking `gasSaver` from the matching address would be substantially stronger than source-code presence alone.

## 6. Next verification targets

1. Identify every Base contract containing the exact target hash.
2. Enumerate the creators/deployers of those contracts.
3. Determine whether the same deployer appears across multiple instances.
4. Search transaction histories for calls to `gasSaver(uint256)`.
5. Decode each call's `n` argument.
6. Determine whether any successful execution could have reached the storage mutation branch.
7. Compare deployment timestamps and funding sources.
8. Compare the resulting deployer cluster against the Ethereum Mainnet entities in the broader case.
9. Only then evaluate whether the code artifact provides evidence of common control.

## 7. Current conclusion

**Verified:** multiple Base contracts publicly expose the same distinctive `gasSaver()` implementation and hard-coded Keccak target.  
**Verified:** the five candidate addresses tested here do not produce the supplied target under `abi.encode(address,uint256(100))`.  
**Not established:** the identity of the address that does produce the target.  
**Not established:** common ownership of the contracts containing the code.  
**High-value next step:** enumerate all contracts and transaction callers associated with this exact hash/code artifact.
