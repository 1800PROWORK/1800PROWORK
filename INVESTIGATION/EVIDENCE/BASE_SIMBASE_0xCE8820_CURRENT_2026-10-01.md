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
