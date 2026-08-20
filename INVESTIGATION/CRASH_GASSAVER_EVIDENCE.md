# CRASH / `gasSaver()` Evidence Record

**Status:** VERIFIED CODE ARTIFACT / HASH-PREIMAGE LINK UNPROVEN  
**Network:** Base  
**Contract:** `0x5136691Bd7826eBa653A81AbDCfD86494448C280`  
**Token:** Crash On Base (`CRASH`)  
**Contract creator shown by BaseScan:** `0x542724cD...51A99A9d1`

## 1. Primary-source observations

BaseScan reports the contract as **CRASH**, with verified source code and an exact-match verification result. The source identifies Solidity `v0.8.10+commit.fc410830`, optimization enabled with 200 runs, and an ERC-20 / Ownable implementation.

The verified source contains the following function:

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

The same hash constant is visible in the deployed bytecode reported by BaseScan, independently corroborating that the constant is not merely a source-code transcription artifact.

## 2. Deterministic condition

The condition is evaluated from:

`keccak256(abi.encode(msg.sender, uint256(100)))`

Therefore the input is completely determined by the caller address and the fixed integer `100`.

For a particular candidate address `A`, the investigation target is:

`Keccak256(ABI_encode(A, 100)) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

A successful match would establish that the candidate address satisfies the contract's gate. It would **not by itself establish ownership of the address**, because an address can interact with a contract without proving who controls the underlying private key beyond what the signed transaction itself establishes.

## 3. What happens after the gate

If the hash condition passes, the function executes raw storage operations:

- `sload(n)` reads storage slot `n`.
- The value is divided by `100`.
- `sstore(n, b)` writes the divided value back to the same slot.

Thus, for a caller satisfying the embedded hash condition, `gasSaver(n)` is capable of modifying an arbitrary storage slot selected by the supplied `n`.

This is materially different from an ordinary ERC-20 helper function. The function does not identify a token balance mapping or restrict `n` to a documented storage variable. The caller gate is therefore a significant forensic artifact.

## 4. Important distinction: code fingerprint vs identity proof

The verified presence of this unusual function and exact hash is **VERIFIED** for the CRASH contract.

The following conclusions are not established merely from that fact:

1. The CRASH creator controls SIMBASE.
2. The CRASH creator controls YIELDX.
3. The CRASH creator controls either of the previously identified Base wallets.
4. The CRASH creator controls 1800PROLOVE.
5. The same person/entity authored every contract containing similar code.

Those propositions require separate evidence.

## 5. Candidate-address testing

Previously identified candidate addresses for the wider investigation include:

- SIMBASE: `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`
- Base wallet A: `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`
- Base wallet B: `0x12bbF04806a25D124e389B4c9871aC6D21EfC6f4`
- YIELDX: `0x5C16384341D3A8d3796E8524Af5615f9b529f44F`
- CRASH contract: `0x5136691bd7826eba653a81abdcfd86494448c280`
- CRASH creator: `0x542724cD...51A99A9d1` (full address must be preserved from primary explorer data before being used as a cryptographic candidate)

No candidate should be marked as a hash match until the exact Ethereum Keccak-256 computation is reproduced from the full 20-byte address and integer `100`.

## 6. Transaction-level follow-up

The highest-value next checks are:

1. Obtain the exact CRASH contract-creation transaction.
2. Preserve the full creator/deployer address.
3. Enumerate all calls to `gasSaver(uint256)` on the CRASH contract.
4. Decode each call's `n` argument.
5. Identify the transaction sender for each call.
6. Determine whether any sender satisfies the embedded hash condition.
7. Compare those senders against SIMBASE, the identified Base wallets, YIELDX, and funding ancestors.
8. If a sender matches, determine whether the transaction actually succeeded and whether the corresponding storage slot changed as predicted.

## 7. Current evidentiary grade

**CRASH contains the exact `gasSaver()` implementation and embedded Keccak constant: VERIFIED.**

**The embedded constant identifies a particular caller/input pair only if the Keccak preimage is reproduced: UNPROVEN.**

**A cross-project identity linkage from CRASH to SIMBASE/YIELDX/1800PROLOVE: UNPROVEN.**

## Primary web evidence

- BaseScan contract page: `https://basescan.org/address/0x5136691bd7826eba653a81abdcfd86494448c280`

The BaseScan page reports the contract creator, verified exact-match source, compiler settings, `gasSaver(uint256)` ABI entry, the source implementation, and the corresponding constant in deployed bytecode.
