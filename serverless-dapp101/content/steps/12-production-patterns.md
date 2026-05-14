# Production Patterns (Bonus)

## Learning Objectives

By the end of this step, you'll:
- Know five patterns that turn a workshop project into something production-ready
- Have a working code snippet for each, ready to copy into your own app
- Pick one (or more) and start building

## How to use this step

Each pattern below is self-contained. You do not need to do all five. Pick the one most relevant to what you want to build next, copy the snippet into your fork, and iterate. Every snippet uses the same `PROJECT_ATTRIBUTE`, `jsonToPayload`, and `ExpirationTime` helpers from the rest of the workshop.

## Pattern A: Bring Your Own Wallet

The workshop signs writes server-side with `ARKIV_PRIVATE_KEY`. That is fine for a hosted demo, but a production app usually wants **the user's own wallet** to sign their own writes. The wallet on the entity becomes theirs, they pay their own gas, and you do not manage a hot wallet on your server.

The pattern is the same `createWalletClient`, but with `transport: custom(provider)` where `provider` is the EIP-1193 provider from your wallet connector (wagmi, RainbowKit, viem's `injected()` connector, etc.).

```typescript
'use client';
import { useAccount } from 'wagmi';
import { createWalletClient, custom } from '@arkiv-network/sdk';
import { braga } from '@arkiv-network/sdk/chains';
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import { PROJECT_ATTRIBUTE } from '@/lib/config';

export async function postMessageFromWallet(text: string) {
  const { address, connector } = useAccount();
  if (!connector || !address) throw new Error('Connect a wallet first');
  const provider = await connector.getProvider();

  const walletClient = createWalletClient({
    chain: braga,
    transport: custom(provider as any),
    account: address,
  });

  return walletClient.createEntity({
    payload: jsonToPayload({ text, createdAt: new Date().toISOString() }),
    contentType: 'application/json',
    attributes: [
      PROJECT_ATTRIBUTE,
      { key: 'type', value: 'workshop_message' },
      { key: 'createdAtMs', value: Date.now() },
    ],
    expiresIn: ExpirationTime.fromDays(180),
  });
}
```

When the user signs, the wallet on the entity is theirs, the gas comes from their wallet, and you do not have to run a hot-wallet API route at all. This is the default pattern for any Arkiv app that ships to real users.

## Pattern B: Real-Time with Live Events

Replace the Refresh button with a subscription. `subscribeEntityEvents` listens for six event types and returns an `unsubscribe()` function:

```typescript
'use client';
import { useEffect } from 'react';
import { eq } from '@arkiv-network/sdk/query';
import { getPublicClient } from '@/lib/arkiv/client';
import { PROJECT_ATTRIBUTE } from '@/lib/config';

export function useMessageStream(onChange: () => void) {
  useEffect(() => {
    const unsubscribe = getPublicClient().subscribeEntityEvents({
      filter: {
        attributes: [
          eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
          eq('type', 'workshop_message'),
        ],
      },
      onEntityCreated: onChange,
      onEntityUpdated: onChange,
      onEntityDeleted: onChange,
      onError: (err) => console.error('[arkiv-subscribe]', err),
    });
    return () => unsubscribe();
  }, [onChange]);
}
```

Six events you can hook into: `onEntityCreated`, `onEntityUpdated`, `onEntityDeleted`, `onEntityExpired`, `onEntityExpiresInExtended`, `onEntityOwnerChanged`.

## Pattern C: Encrypt Before Storing

Arkiv stores **bytes**. It does not care whether they are encrypted. If you encrypt the payload client-side before calling `createEntity`, only key-holders can read the contents. Combine encryption with `expiresIn` and you get auto-revoking access: when the entity expires, the encrypted bytes are gone, whether the key-holder revokes access or not.

```typescript
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import { PROJECT_ATTRIBUTE } from '@/lib/config';

// Encrypt a string payload with AES-GCM. `key` is a CryptoKey known only to authorized readers.
async function encryptString(plaintext: string, key: CryptoKey): Promise<Uint8Array> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext),
  );
  // Prepend the IV so the decrypter can recover it.
  return new Uint8Array([...iv, ...new Uint8Array(ciphertext)]);
}

const encrypted = await encryptString('confidential note', sharedKey);

await walletClient.createEntity({
  payload: encrypted,
  contentType: 'application/octet-stream',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'encrypted_note' },
    { key: 'createdAtMs', value: Date.now() },
  ],
  expiresIn: ExpirationTime.fromDays(7),
});
```

For multi-recipient access, the standard pattern is **envelope encryption**: encrypt the payload with a per-entity symmetric key, then store one entity per recipient containing that symmetric key wrapped by the recipient's public key. Revocation is then just letting the wrapper entity expire.

## Pattern D: Lifecycle Tiers (Raw and Aggregated)

When you ingest a lot of data over time (sensor readings, telemetry, prices), raw entries should not live forever. They cost gas to keep alive, and you usually only need them long enough to compute an aggregate. The idiomatic pattern is **raw entities with short `expiresIn`, plus aggregate entities with much longer `expiresIn`**:

```typescript
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import { PROJECT_ATTRIBUTE } from '@/lib/config';

// 1) Each raw reading is short-lived
await walletClient.createEntity({
  payload: jsonToPayload({ value: 42, unit: 'celsius' }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'raw_reading' },
    { key: 'sensorId', value: 'sensor-7' },
    { key: 'tsMs', value: Date.now() },
  ],
  expiresIn: ExpirationTime.fromHours(48),
});

// 2) Each hourly aggregate is long-lived and derived from many raw readings
await walletClient.createEntity({
  payload: jsonToPayload({ avg: 41.8, min: 39.1, max: 44.2, count: 60 }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'hourly_aggregate' },
    { key: 'sensorId', value: 'sensor-7' },
    { key: 'hourBucket', value: Math.floor(Date.now() / 3600000) },
  ],
  expiresIn: ExpirationTime.fromDays(365),
});
```

Use `walletClient.mutateEntities({ creates: [...] })` to batch many raw creates in a single transaction when you write in bursts.

## Pattern E: Memory Layer for an LLM

If you store every agent thought or document as an Arkiv entity, your agent's memory **survives the model, the chat tool, and the session**. Any other agent or app that knows the project attribute can read the same memory. This is the simplest possible portable-agent-memory pattern.

```typescript
import { eq, gte, desc } from '@arkiv-network/sdk/query';
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import { PROJECT_ATTRIBUTE } from '@/lib/config';

// Save a memory item
await walletClient.createEntity({
  payload: jsonToPayload({
    content: 'User prefers concise answers',
    embedding: await embed('User prefers concise answers'),
  }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'memory' },
    { key: 'agentId', value: 'concierge-v1' },
    { key: 'importance', value: 8 },        // numeric, for range queries
    { key: 'createdAtMs', value: Date.now() },
  ],
  expiresIn: ExpirationTime.fromDays(180),
});

// Retrieve recent high-importance memories for this agent
const memories = await publicClient
  .buildQuery()
  .where([
    eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
    eq('type', 'memory'),
    eq('agentId', 'concierge-v1'),
    gte('importance', 5),
  ])
  .orderBy(desc('createdAtMs'))
  .withPayload(true)
  .limit(20)
  .fetch();
```

Variants worth exploring: tier memory by lifespan (scratchpad expires in hours, working memory in days, long-term beliefs in months); attribute attribution to a specific agent via `.createdBy(agentWallet)` for tamper-proof "agent X wrote this"; store vector embeddings alongside content for semantic retrieval.

## Production checklist

When you graduate from "workshop demo" to "real app on Braga", confirm:

1. **Pin the SDK exactly.** `"@arkiv-network/sdk": "0.6.8"` (no caret) in production, until you have a CI gate that catches breaking changes.
2. **Tag every entity with `PROJECT_ATTRIBUTE`.** Braga is shared. Without project tagging, your queries return everyone else's data.
3. **Right-size `expiresIn` per entity type.** `ExpirationTime.fromDays/fromHours/fromMinutes`. Ephemeral types live shorter; durable types live longer.
4. **Catch named error classes.** `EntityMutationError`, `NoMoreResultsError`, `NoCursorOrLimitError`, `NoEntityFoundError`. String-matching error messages breaks on every SDK upgrade.
5. **Subscribe, do not poll.** `subscribeEntityEvents` is cheaper than polling and gives a better UX.
6. **Rotate environment variables when the network rotates.** Braga is current. When Arkiv announces the next testnet, refund the deployment signing wallet on the new faucet (balances do not port across testnets).
7. **Validate input at the API edge.** Zod or similar. A bad payload is a permanent bad payload until you `updateEntity` or `deleteEntity`.
8. **Watch the status page.** `status.braga.hoodi.arkiv.network` is the source of truth when something looks off.

## Checkpoint

- [ ] I have read all five patterns
- [ ] I have picked one and applied it to my fork
- [ ] I have re-run typecheck and dev server to confirm nothing broke
- [ ] I know which production-checklist items I have not yet done

## Where to go next

- [TS SDK / Best Practices](https://docs.arkiv.network/typescript-sdk/best-practices/): the official 15-item checklist
- [TS SDK / Live Events](https://docs.arkiv.network/typescript-sdk/live-events/): full reference for Pattern B
- [TS SDK / React integration](https://docs.arkiv.network/typescript-sdk/react-integration/): wagmi and TanStack Query patterns
- [Arkiv Discord](https://discord.gg/arkiv): help and project showcases
