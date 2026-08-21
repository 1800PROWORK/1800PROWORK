# Evidence Record: `gasSaver()` Hard-Coded Keccak Target

**Record ID:** GS-HASH-001  
**Status:** Reproduced code pattern; target preimage remains unresolved  
**Evidence grade:** **STRONG CORRELATION for code reuse; UNPROVEN for identity/ownership**

## 1. Observed code

Multiple BaseScan-verified token pages contain the same `gasSaver(uint256 n)` implementation pattern:

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

Primary web evidence currently located:

- BaseScan token `0x5f4d8c4f73db53c461987e60877386d4a259f590` contains the function and exact hard-coded hash.
- BaseScan token `0xb48d9c88c68bbf209783b6b6e3551b5a98fb842f` contains the same function and hash.
- BaseScan token `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21` contains the same hash in deployed bytecode.
- BaseScan token `0xe47434de787ff9d14f59400687167d7e06c888a3` contains the same hash in deployed bytecode.
- BaseScan token `0x915c7900c7373e2222a705dd877afc6e6fa32d2f` contains the same hash in deployed bytecode.

The bytecode evidence is significant because the constant is not merely a source-code comment: it appears in deployed bytecode for multiple contracts.

## 2. Deterministic test

The expected input for the comparison is:

`abi.encode(candidateAddress, uint256(100))`

The Ethereum Keccak-256 calculation was independently recomputed for the following candidate addresses using the exact 32-byte ABI address slot followed by the 32-byte uint256 slot:

| Candidate | Keccak result | Matches target? |
|---|---|---|
| `0x5f4d8c4f73db53c461987e60877386d4a259f590` | `0x5656f4f452f90703000d019fc86466e3d8376a25b07f1fa4fa9fcb1e71211855` | NO |
| `0xb48d9c88c68bbf209783b6b6e3551b5a98fb842f` | `0x169f8a38644cfbdbce8b0f0ed3f5ca23de74bec55cee890584fdc0fe8a3ea856` | NO |
| `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21` | `0x2dd2bf35f04729a5bdb9a6194420d502c0126578b43e6fa78e4558edd6700253` | NO |
| `0xe47434de787ff9d14f59400687167d7e06c888a3` | `0x43533dcd04e5d950c67840b5b2496c66d9a2b71e3c4e58bf1559e54ed370643f` | NO |
| `0x915c7900c7373e2222a705dd877afc6e6fa32d2f` | `0x06c7aa7abf8df5d24f6b2c3e88f5c011a38c7d795d9f48348bdb2fdef5eed101` | NO |
| `0x1e4d2113d8e304122f2ceaa20b194d7801a84984` | `0x599116af7f2e65df9a2bb046a7ce5d7a228e5e36aa7051f3df8cde6d1747aff0` | NO |

## 3. Important finding

The supplied target hash is **not** the Keccak-256 result for `abi.encode(address,100)` for the SIMBASE contract address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`, nor for the five additional Base token contracts identified above.

Therefore the current evidence does **not** establish that the hash is an encoding of the contract address itself.

At the same time, the recurrence of the exact hash inside multiple deployed Base contracts is a reproducible code-reuse/copy-pattern signal.

## 4. Interpretation

### Verified

1. The exact `gasSaver()` source pattern exists on multiple BaseScan token records.
2. The exact 256-bit constant `0x5c53...b82a3a1` is present in deployed bytecode of multiple contracts.
3. The supplied ABI/hash computation does not match the tested contract addresses.

### Not established

1. The identity of the address for which the hash comparison evaluates true.
2. Whether the hash was deliberately generated from a wallet address, a deployer address, or another address.
3. Whether the same person/entity controlled the contracts containing the repeated code.
4. Whether the `gasSaver()` branch was ever successfully triggered on-chain.

## 5. Next test

The next candidate set should be constructed from **actual transaction participants**, in this order:

1. Contract deployers.
2. First funders of deployers.
3. Addresses that called `gasSaver()`.
4. Addresses interacting with the contracts immediately before/after deployment.
5. Common upstream funding addresses across the Base contracts.

For every candidate, compute the exact Keccak preimage test and record the transaction provenance. A match would establish a deterministic relationship to the hard-coded constant, but would still require separate evidence to establish control/ownership.

## 6. Sources

BaseScan evidence:

- `https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590`
- `https://basescan.org/token/0xb48d9c88c68bbf209783b6b6e3551b5a98fb842f`
- `https://basescan.org/token/0x98225185fed2ac9c824d79a8dd9da152bbcd5d21`
- `https://basescan.org/token/0xe47434de787ff9d14f59400687167d7e06c888a3`
- `https://basescan.org/token/0x915c7900c7373e2222a705dd877afc6e6fa32d2f`

SIMBASE address cross-reference:

- Coinbase identifies Base SIMBASE/SIMBA contract address as `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`.
