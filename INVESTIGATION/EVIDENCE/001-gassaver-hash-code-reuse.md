# Evidence 001 — `gasSaver()` hash and code reuse on Base

**Classification:** STRONG CORRELATION (code-level), NOT ownership proof  
**Network:** Base Mainnet  
**Primary artifact:** `keccak256(abi.encode(msg.sender, 100)) == 0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1`

## 1. Observation

BaseScan independently exposes verified source code containing the same `gasSaver(uint256 n)` implementation and the same hard-coded Keccak-256 constant in multiple Base ERC-20 contracts.

Observed implementation:

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

The MINTB contract at `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450` contains this exact function and constant in its verified source. BaseScan identifies the token as Mint Blockchain (MINTB), with verified contract name `MINTB`, compiler `v0.8.10+commit.fc410830`, optimizer enabled with 200 runs. The source explicitly shows the hash comparison and the storage division by 100.  

Source: BaseScan MINTB contract page: https://basescan.org/token/0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450

## 2. Additional contracts with the same implementation

The same hard-coded hash and `gasSaver(uint256 n)` pattern were independently located in BaseScan verified source for at least these additional contracts:

| Contract | Token identified by source/search | Evidence observed |
|---|---|---|
| `0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450` | Mint Blockchain (MINTB) | Verified source contains exact `gasSaver` and hash |
| `0x823ce23d648fe0c528c73b74bd20cf8e44427ed7` | Chakra (CHAKRA) | Verified source contains `gasSaver` and same hash |
| `0x5f4d8c4f73db53c461987e60877386d4a259f590` | CC8 ON BASE (CC8) | Verified source contains `gasSaver` and same hash |
| `0x98225185fed2ac9c824d79a8dd9da152bbcd5d21` | Token page / verified bytecode located | Verified deployed bytecode contains the same hash and `gasSaver` logic |

Primary sources:
- https://basescan.org/token/0xb6006893b2c8f5d2a7f175b8d45629b1f16d8450
- https://basescan.org/token/0x823ce23d648fe0c528c73b74bd20cf8e44427ed7
- https://basescan.org/token/0x5f4d8c4f73db53c461987e60877386d4a259f590
- https://basescan.org/token/0x98225185fed2ac9c824d79a8dd9da152bbcd5d21

## 3. Why this matters

This is materially stronger than observing the function in only one contract.

A single occurrence could be explained as an isolated implementation choice, copied example, experiment, or unrelated code fragment. Multiple independently deployed Base contracts containing the same unusual function structure and the same 32-byte hard-coded value establish a reusable code artifact or template.

The pattern is especially distinctive because `gasSaver()` is not a standard ERC-20 requirement. The function:

1. takes an arbitrary storage slot `n`;
2. obtains `msg.sender`;
3. fixes `n0` to 100;
4. ABI-encodes `(msg.sender, 100)`;
5. checks the resulting Keccak-256 hash against one exact constant;
6. only if the check succeeds, divides the selected storage slot by 100 and writes the result back.

That is a highly specific behavioral/code signature.

## 4. Critical distinction: code reuse ≠ common ownership

The presence of the same implementation across several contracts does **not**, by itself, establish that the same private key, deployer, owner, or operator controlled all of them.

Possible explanations include:

- one developer deploying multiple contracts;
- one deployment script/template reused by multiple parties;
- copied source code;
- a public/private token-generation template;
- a shared development operation;
- deliberate code reuse without common financial control.

Therefore the correct evidence grade is currently **STRONG CORRELATION at the code/template level**, not VERIFIED identity linkage.

## 5. Hash-preimage investigation

The supplied candidate address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` was previously tested using the intended Solidity semantics:

```text
keccak256(abi.encode(0x1e4d2113D8E304122f2ceAA20B194d7801a84984, 100))
```

The reproduced result was:

```text
0x599116af...1747aff0
```

and **not** the target:

```text
0x5c53c7d6ea38ad0e745b72557f2752b0d8873a30c040b4f665725c033b82a3a1
```

Therefore the SIMBASE contract address itself is not established as the direct address preimage for the constant.

Importantly, `msg.sender` is the caller of `gasSaver()`, not automatically the token contract address. Consequently, testing only the token contract address is insufficient to identify the intended preimage.

## 6. New investigation implication

The existence of the same hard-coded hash in multiple Base contracts changes the next investigative question.

The question is no longer merely:

> "Which address produces this hash?"

It becomes:

> "Which externally owned account(s), if any, actually called `gasSaver()` on these contracts, and do those callers form a common cluster through funding, deployment, ownership, or transaction behavior?"

That is the more probative route because a successful call supplies an on-chain relationship between a real caller and the embedded authorization condition.

## 7. Required next tests

### A. Enumerate `gasSaver()` calls

For every identified Base contract:

- identify all transactions invoking the `gasSaver(uint256)` selector;
- extract the transaction sender;
- extract the calldata argument `n`;
- record block number and timestamp;
- determine success/revert status;
- compare the sender against the target hash.

### B. Test actual callers

For each caller `A`, calculate:

```text
H(A) = keccak256(abi.encode(A, uint256(100)))
```

If `H(A)` equals the embedded constant, record this as a **VERIFIED hash-preimage match**.

### C. Cross-contract join

If the same caller appears across multiple contracts containing the constant, that would materially strengthen the correlation because the same external address would be demonstrably interacting with multiple instances of the same unusual mechanism.

### D. Deployment/funding join

For any matching caller:

- identify its funding source;
- identify its first-funding transaction;
- trace relevant ETH/asset flows;
- compare deployer relationships;
- compare timing between funding, deployment, and `gasSaver()` calls;
- compare relationships with the Ethereum Mainnet addresses already under investigation.

### E. Ownership/control test

Only after these joins should we attempt to classify the relationship as a likely common operator. A common caller is strong evidence of operational linkage, but it still does not automatically prove that the same human owns every associated address.

## 8. Current conclusion

**Verified:** multiple Base contracts contain the same unusual `gasSaver()` implementation and the exact same hard-coded Keccak-256 constant.

**Verified:** the candidate SIMBASE contract address `0x1e4d2113D8E304122f2ceAA20B194d7801a84984` does not reproduce the target hash when encoded with `uint256(100)` under the stated Solidity semantics.

**Not yet verified:** the address whose ABI-encoded `(address,100)` value produces the target constant.

**Not yet verified:** that the contracts sharing this code were controlled by one entity.

**Highest-value next step:** enumerate actual `gasSaver()` callers and test their addresses against the embedded constant, then perform cross-contract and funding-path joins.

## 9. Evidence grade

**STRONG CORRELATION — code/template fingerprint.**

This artifact should be upgraded only if transaction-level evidence establishes a common caller/deployer/funding/control relationship. It should be downgraded if the same code is shown to be broadly distributed through an unrelated public template with no operational linkage among the investigated contracts.
