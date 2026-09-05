# TON Contract Verification — `Ef8hHxV0v2I9FHh3CMX91WXjKaJav6SQlemEQm8ZvPBJdLde`

## Verification status

The TON Contract Verifier reported a successful local verification:

> In-Browser compiler output hash matches this on-chain contract.

This establishes that the supplied source, when compiled in the verifier's browser environment, produces bytecode matching the deployed contract's on-chain code hash.

### Recorded hashes

- Code hash (Base64): `GhR7fbpsF+SRxbugvccB9+ZDTiO7bMaqpuLG1tRqO9Q=`
- Data hash (Base64): `F0vV3kzEgC1POFrjv63cUgZYtYk+kEx05trARoqTV54=`
- Verifier identifier: `Ef8hHxV0v2I9FHh3CMX91WXjKaJav6SQlemEQm8ZvPBJdLde`

## Contract architecture

The verified FunC source implements a threshold-signature authorization mechanism associated with bridge-related messaging.

The persistent state contains:

- `wallet_id`
- `n` — signer/public-key count
- `k` — required signature threshold
- `owner_infos` — dictionary containing signer public keys and flood counters
- `pending_queries`
- `last_cleaned`
- `lock_until`

Each owner record stores a 256-bit public key and an 8-bit flood counter.

Authorization is performed with `check_signature(...)` against stored 256-bit public keys. Incoming messages contain a 512-bit signature, and the contract checks the signature against the corresponding public key. Additional signatures can be accumulated until the configured threshold `k` is reached.

## Bridge configuration

`get_bridge_config()` reads a TON configuration parameter identified by `CONFIG_PARAM_ID` (and, if absent, its negative form). It parses a configuration cell containing:

- an 8-bit prefix
- a 256-bit `bridge_address`
- a 256-bit `oracles_address`

When the required signature count reaches `k`, `update_pending_queries()` obtains these configured addresses and conditionally forwards the approved message with `send_raw_message(...)`.

## Authority finding

The source does **not** expose a conventional single `owner` or `admin` variable. The visible authorization model is distributed across a configured set of public keys with a threshold `k`.

Therefore:

**Verified code correspondence does not by itself establish who controls the contract.**

The relevant control question is which public keys are actually stored in the deployed contract state, what `n` and `k` are, and how those keys were initialized.

## Next read-only checks

The source exposes two particularly relevant getter methods:

### `get_n_k()`

Returns `(n, k)`, allowing the configured signer count and required threshold to be read from the deployed state.

### `get_public_keys()`

Returns the public-key dictionary stored in contract state.

These should be queried against the deployed contract before drawing conclusions about the identities or control represented by the signer set.

## Scope / interpretation

The local verifier result establishes a code-hash match. It does not prove ownership, private-key possession, identity, or unilateral control. Those questions require analysis of the deployed state and, where appropriate, cryptographic signature relationships.

## Source excerpt analyzed

The verified source includes:

```fc
#include "stdlib.fc";
#include "params.fc";
```

and the functions `get_bridge_config`, `unpack_state`, `pack_state`, `pack_owner_info`, `unpack_owner_info`, `check_signatures`, `parse_msg`, `check_proposed_query`, `unpack_query_data`, `update_pending_queries`, `recv_external`, `recv_internal`, `get_public_keys`, `check_query_signatures`, `get_n_k`, and related query/state getters.

## Reproduction target

The next reproducible step is to call the deployed contract's read-only getters:

1. `get_n_k()`
2. `get_public_keys()`
3. Compare the returned state with the recorded data hash where technically appropriate.

No private keys, seed phrases, passwords, or signing credentials are required for these read-only checks.
