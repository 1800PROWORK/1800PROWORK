# `gasSaver()` Hash Analysis

**Track:** Cryptographic / deterministic hash investigation  
**Status:** Open — candidate preimage verification pending  
**Evidence grade:** **UNPROVEN**  

## 1. Supplied code fragment

The investigation supplied the following Solidity pattern:

```solidity
function gasSaver(uint256 n) external {
    address a0 = msg.sender;
    uint256 n0 = 100;
    bytes memory bb = abi.encode(a0, n0);
    if (keccak256(bb) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1) {
        // subsequent assembly/body supplied separately in the investigation
    }
}
```

The critical expression is therefore:

```text
keccak256(abi.encode(msg.sender, uint256(100)))
```

subject to the exact source being preserved and verified against the deployed bytecode.

## 2. Deterministic encoding model

For two static ABI values, `address` and `uint256`, `abi.encode` produces two 32-byte ABI words:

1. The address occupies the low-order 20 bytes of a 32-byte word, with zero padding on the left.
2. `uint256(100)` is represented as a 32-byte big-endian integer word.
3. The resulting 64-byte sequence is hashed with Keccak-256.

Thus the mathematical test is:

```text
H(A) = Keccak256(encode32(A) || encode32(100))
```

where `A` is a candidate Ethereum-style address.

## 3. Supplied target

```text
0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1
```

This value is preserved exactly as supplied.

## 4. What would constitute a verified match

A match should only be recorded as **VERIFIED** if all of the following are independently established:

- the candidate address is identified from primary blockchain evidence;
- the deployed contract actually contains the relevant logic, or an equivalent verified source/bytecode reconstruction establishes it;
- the exact ABI encoding is reproduced;
- Keccak-256 of that exact 64-byte input equals the supplied 32-byte target;
- the candidate address is not merely selected because it makes the result convenient;
- the transaction/deployment context independently connects the candidate to the contract under investigation.

A mathematical hash match alone establishes a preimage relationship. It does **not**, by itself, establish ownership of the address or control of the private key.

## 5. What is not established yet

No candidate address has been recorded here as a verified preimage. The investigation therefore must not state that the supplied hash identifies a particular person, wallet, deployer, or organization.

Likewise, a failure to reproduce the hash for one candidate does not disprove the overall hypothesis; it only eliminates that candidate under the tested encoding and value.

## 6. Candidate-source priority

Candidates should be tested in this order:

1. `msg.sender` values observed in calls to the relevant deployed contract;
2. the transaction sender of the contract's deployment transaction;
3. addresses appearing in directly related funding transactions;
4. addresses involved in the same operational cluster;
5. other addresses proposed by the investigation, clearly labeled as hypotheses.

This ordering reduces selection bias and keeps the cryptographic test downstream of observable blockchain evidence.

## 7. Reproduction record template

For every candidate, record:

| Field | Value |
|---|---|
| Network | pending |
| Contract | pending |
| Candidate address | pending |
| Candidate source transaction | pending |
| `n0` | `100` |
| ABI input length | `64 bytes` |
| Computed Keccak-256 | pending |
| Supplied target | `0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1` |
| Match | pending |
| Evidence grade | pending |

## 8. Investigative conclusion at this stage

**UNPROVEN.** The hash construction is deterministic and testable, but the investigation does not yet possess a verified candidate preimage that can be tied to the relevant deployed contract and transaction history.

The next step is therefore candidate extraction from primary chain activity, followed by deterministic hashing. The process should not begin with a guessed identity and search backward for a convenient hash match.
