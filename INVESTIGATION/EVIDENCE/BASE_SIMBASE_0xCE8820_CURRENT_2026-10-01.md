# Evidence Record - Current Base SIMBASE Contract (October 1, 2026)

## Target

- Network: Base Mainnet
- Contract: `0xcE8820F5F6d4bE63Ed171f09a0b48571FFFB014D`
- Verification block: `52024637`
- Verification date: October 1, 2026

## Confirmed contract observations

A fresh on-chain check recorded the following:

- Name: `SimBase`
- Total supply: `235,000,000` tokens
- Decimals: `18`
- `owner()` returns the zero address.
- The two previously tracked brand wallets hold zero SIMBASE at the time of the check.
- DexScreener returned no indexed pools. This does not exclude unindexed or non-Dex liquidity.

## Deployment provenance

Blockscout identifies the contract creator as:

`0xAEce168F44DbE83517f9161b394Dfca7AE63846c`

Creation transaction:

`0x8bb62b6b14ab3af24c6181d70077635877ed1bc650724ca7f3219995979cbec9`

Creation time: June 6, 2024 at 01:59:27 UTC.
Creation block: `15424910`.

The deployment receipt emitted `OwnershipTransferred` with:

- Previous owner: `0x0000000000000000000000000000000000000000`
- New owner: `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`

## Renunciation provenance

The owner address then called `renounceOwnership()` directly.

Renunciation transaction:

`0x6ebba0c5ed73decbd190689b5f6c7985ec291e6ab593eeb0826330d988229c55`

- Block: `15424919`
- Time: June 6, 2024 at 01:59:45 UTC
- Sender: `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`
- Method: `renounceOwnership()`
- Result: successful

The event recorded:

- Previous owner: `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`
- New owner: `0x0000000000000000000000000000000000000000`

This is not evidence of a third-party seizure. The initial owner address itself executed the renunciation approximately 18 seconds after deployment. It identifies the on-chain actor, not the real-world person controlling that address.

## Code and gasSaver finding

The deployed bytecode contains `gasSaver(uint256)`, the supplied hard-coded hash, and a conditional branch using `SLOAD`, `DIV`, and `SSTORE`. Renouncing ownership did not remove this code.

The remaining questions are:

1. Whether an external caller can satisfy the hash gate.
2. Whether the branch has ever been successfully executed.
3. Which historical callers invoked the function or selector.
4. What storage slots changed after any such call.

Shared bytecode or a shared hash is a technical correlation only. It does not prove common human ownership, OpenSea involvement, or control of the 0x15CaA drain.

## Cross-reference to Base wallet A

The creator and renunciation sender, `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`, exactly matches the address listed as Base wallet A in the September 20, 2026 wallet-scan baseline. This is a confirmed address-level overlap. It is not, by itself, proof of the human identity or control behind Base wallet A.

## Evidence classification

- VERIFIED: current contract address, creator address, creation transaction, initial ownership event, renunciation transaction, sender, timestamp, and resulting zero owner.
- VERIFIED: creator address equals the Base wallet A address in the public baseline.
- VERIFIED: gasSaver-related bytecode remains deployed, subject to the saved bytecode/hash reproduction.
- UNRESOLVED: hash-gate satisfiability, historical successful use, and storage effects.
- UNPROVEN: real-world identity or common human control.
- UNPROVEN: connection to the 0x15CaA drainage incident.

## Sources

- Base Blockscout contract: https://base.blockscout.com/address/0xcE8820F5F6d4bE63Ed171f09a0b48571FFFB014D
- Creation transaction: https://base.blockscout.com/tx/0x8bb62b6b14ab3af24c6181d70077635877ed1bc650724ca7f3219995979cbec9
- Renunciation transaction: https://base.blockscout.com/tx/0x6ebba0c5ed73decbd190689b5f6c7985ec291e6ab593eeb0826330d988229c55
- Reproduction package: `investigation_oct01/verify_simbase.py` and accompanying raw results/bytecode.

## Important address distinction

This record concerns `0xcE8820F5F6d4bE63Ed171f09a0b48571FFFB014D`. The repository also contains earlier evidence records for `0x1e4d2113D8E304122f2ceAA20B194d7801a84984`. Those records should not be silently conflated. Any relationship between the two contracts requires a separate transaction-level comparison.

## Historical gasSaver caller scan

The verified source declares `gasSaver(uint256)`, whose canonical function selector is `0xa91e5e21`. The complete Base Blockscout transaction history for this contract was paged and inspected.

- Total contract transactions examined: `43`
- Direct calls beginning with selector `0xa91e5e21`: `0`
- Observed successful gasSaver executions: `0`
- Observed gasSaver storage writes: `0`

This establishes no observed historical direct use in the contract's current transaction history. It does not prove that the function is unreachable in the future, nor does it rule out a call attempt that reverted or an indirect execution path. The verified source shows no fallback or delegatecall path that would obviously route an unrelated selector into `gasSaver`; that point should still be preserved as a source-level observation, not an identity conclusion.

The function is externally callable in source and is not protected by `onlyOwner`, but its branch executes only if `msg.sender` and the fixed `n0 = 100` produce the hard-coded Keccak-256 value. No caller satisfying that gate was found in the 43-transaction scan.

Scan method: Base Blockscout `/api/v2/addresses/{contract}/transactions`, all returned pages, matching raw calldata against `0xa91e5e21`.

## October 2, 2026 cross-reference to the 0x15CaA incident contract

A fresh internal-transaction and token-transfer trace found a direct address-level funding path between the current SIMBASE creator and `0x15CaA83766b20261f5c30E074056FA83261d9418`, the contract identified in the existing drainage casefile.

### ETH transfer before SIMBASE deployment

- Transaction: `0x9e3aefe0ae5dfd6323304ef17d952b4f346de5c6cf1fcdf418aa5cc936e7dab4`
- Block: `15423538`
- Time: June 6, 2024 at 01:13:43 UTC
- Outer transaction sender: `0x62b381828A1EC2AE35dF8a1cB87C1269dEaba653`
- Outer transaction target: `0x15CaA83766b20261f5c30E074056FA83261d9418`
- Internal transfer: `0x15CaA83766b20261f5c30E074056FA83261d9418` to `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`
- Amount: `0.02 ETH`

This occurred approximately 45 minutes before the SIMBASE deployment.

### WETH transfer before liquidity creation

- Transaction: `0x7ae61b472e89787a37fe47b03abdc81fb227407808083e8ba62477d223d73b3d`
- Block: `15508127`
- Time: June 8, 2024 at 00:13:21 UTC
- Outer transaction sender: `0x62b381828A1EC2AE35dF8a1cB87C1269dEaba653`
- Outer transaction target: `0x15CaA83766b20261f5c30E074056FA83261d9418`
- Transfer: `15 WETH` from `0x15CaA83766b20261f5c30E074056FA83261d9418` to `0xAEce168F44DbE83517f9161b394Dfca7AE63846c`

### SIMBASE liquidity creation and removal

Six seconds after the 15 WETH transfer, `0xAEce...846c` called `addLiquidity` in transaction `0x705046e3332f817064350583493f200f0e567e1c0d45bd0404fe8dc4f793d582`. The transaction created pair `0x566b52f9f0fEC2fFc3F936dbed218F4B8142B9f7` and supplied:

- `15 WETH`
- `231,522,000 SIMBASE`

The same address removed liquidity later that day in transaction `0xa6beea6a1ff7fde635848f41a689d3341631894c25667fe50b2f340a101521d6`, receiving:

- `16.309510577061169384 WETH`
- `213,505,618.849324727334213774 SIMBASE`

This explains why a later DexScreener check may show no indexed pool: the observed pool was created and then liquidity was removed on the same day.

### Interpretation

This is a STRONG ADDRESS-LEVEL / TRANSACTION-LEVEL CORRELATION between the current SIMBASE creator wallet and the 0x15CaA contract. It materially changes the investigation posture. It does not, by itself, prove that the SIMBASE creator, the 0x62b3 operator, and the real-world incident actor were the same person. The connection could reflect an operator relationship, authorized contract activity, a payment route, or another explanation that requires full call decoding and control analysis.

The earlier September 6 `FULLY DISJOINT` result remains valid only for its stated scope: the older SIMBASE wallet universe and the drain dataset used in that scan. It must not be generalized to this current `0xcE8820...` contract, because the current creator and the 0x15CaA funding path were not included in that earlier exact-address comparison.

### Next verification targets

1. Decode methods `0x29c86e2e` and `0x5f62b1c3` from verified source or selector databases.
2. Determine whether `0x62b3` was the routine operator for both transfers and what authorization path the 0x15CaA contract used.
3. Trace all funding and withdrawals of `0xAEce...846c` before and after June 6-8, 2024.
4. Compare the 0x15CaA contract's full operator history against SIMBASE deployment and liquidity events.
5. Test whether any `gasSaver` calls or storage writes occurred on the current SIMBASE contract after this funding path.
