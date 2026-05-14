# Add a Second Entity Type

## Learning Objectives

By the end of this step, you'll:
- Know why real Arkiv apps use multiple entity types
- Have added a second entity type linked to the first
- Understand foreign-key style relationships via shared attributes
- Have set differentiated `expiresIn` per entity type

## Content

### Why a second entity type?

Real Arkiv apps almost never have one entity type. The basic shape is **a parent and one or more child types linked by a shared attribute**. Think:

- Posts and comments
- Documents and access grants
- Devices and readings
- Agents and memories
- Notes and tags

In this step we add **reactions** to messages. Each reaction is its own entity, linked back to the message it reacts to. Once you can do this, you can model anything else.

### The pattern

Arkiv has no built-in foreign-key field. You make a relationship by putting the parent's entity key into a shared attribute on the child.

```typescript
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import { PROJECT_ATTRIBUTE } from '../../../../lib/config';

// 1. The parent (a message)
const { entityKey: messageKey } = await walletClient.createEntity({
  payload: jsonToPayload({ text: 'Hello workshop' }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'workshop_message' },
    { key: 'createdAtMs', value: Date.now() },
  ],
  expiresIn: ExpirationTime.fromDays(180),
});

// 2. The child (a reaction) shares the project and points at the parent
await walletClient.createEntity({
  payload: jsonToPayload({ emoji: 'heart' }),
  contentType: 'application/json',
  attributes: [
    PROJECT_ATTRIBUTE,
    { key: 'type', value: 'workshop_reaction' },
    { key: 'messageKey', value: messageKey },   // <-- the foreign key
    { key: 'createdAtMs', value: Date.now() },
  ],
  expiresIn: ExpirationTime.fromDays(30),
});
```

Two details worth pausing on:

1. **Reactions expire faster than messages.** Reactions are ephemeral interactions; messages are durable content. **Differentiated `expiresIn` per entity type** is a signature mark of an Arkiv app that knows what it is doing.
2. **Both have `PROJECT_ATTRIBUTE` and a `type` discriminator.** Project namespacing always; type lets you filter the right shape.

### Querying the children of a parent

To load all reactions for a specific message in one round trip:

```typescript
import { eq } from '@arkiv-network/sdk/query';

const reactions = await publicClient.buildQuery()
  .where([
    eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
    eq('type', 'workshop_reaction'),
    eq('messageKey', messageKey),
  ])
  .withPayload(true)
  .limit(200)
  .fetch();
```

One round trip, one query. This same shape works for any parent and child: posts and comments, agents and memories, devices and readings, documents and access grants.

## AI-Assisted Path

```prompt
I'm at step 9: Add a Second Entity Type.

The workshop has me adding "reactions" to messages, where each reaction is its own
Arkiv entity linked back to the parent message via a shared "messageKey" attribute.

Help me:
1. Add a POST endpoint at /api/serverless-dapp101/reactions that takes { messageKey, emoji }
   and creates a workshop_reaction entity. Include the project attribute and a 30-day
   expiresIn using ExpirationTime.fromDays.
2. Add a GET endpoint that lists reactions for a given messageKey by querying with
   eq('type', 'workshop_reaction') and eq('messageKey', ...).
3. In the hello-world page, add three emoji buttons under each message that POST a
   reaction and refresh the list.

Constraints I want enforced:
- PROJECT_ATTRIBUTE on every write and every query
- Reactions expire after 30 days (messages stay 180)
- Use jsonToPayload and ExpirationTime helpers (not raw seconds)
- Catch EntityMutationError by name on writes

Update the internal implementation plan with notes and show me the plan so I can track your progress.
```

## Manual Path

### Step 9.1: Add a reactions API route

Create `app/api/serverless-dapp101/reactions/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getPublicClient, getWalletClientFromPrivateKey } from '../../../../lib/arkiv/client';
import { PROJECT_ATTRIBUTE, getPrivateKey } from '../../../../lib/config';
import { eq } from '@arkiv-network/sdk/query';
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import { EntityMutationError } from '@arkiv-network/sdk';

const REACTION_TYPE = 'workshop_reaction';
const ALLOWED_EMOJIS = new Set(['heart', 'fire', 'sparkles']);

export async function GET(request: NextRequest) {
  const messageKey = new URL(request.url).searchParams.get('messageKey');
  if (!messageKey) {
    return NextResponse.json({ ok: false, error: 'messageKey query param is required' }, { status: 400 });
  }

  const publicClient = getPublicClient();
  const result = await publicClient
    .buildQuery()
    .where([
      eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
      eq('type', REACTION_TYPE),
      eq('messageKey', messageKey),
    ])
    .withPayload(true)
    .limit(200)
    .fetch();

  const reactions = result.entities.map((e) => {
    const data = (() => {
      try { return e.toJson() as { emoji?: string }; } catch { return {}; }
    })();
    return { id: e.key, wallet: (e.owner ?? '').toLowerCase(), emoji: data.emoji ?? '' };
  });

  return NextResponse.json({ ok: true, reactions });
}

export async function POST(request: NextRequest) {
  try {
    const { messageKey, emoji } = await request.json();
    if (!messageKey || !emoji || !ALLOWED_EMOJIS.has(emoji)) {
      return NextResponse.json({ ok: false, error: 'messageKey and a valid emoji are required' }, { status: 400 });
    }

    const walletClient = getWalletClientFromPrivateKey(getPrivateKey());
    const { entityKey, txHash } = await walletClient.createEntity({
      payload: jsonToPayload({ emoji }),
      contentType: 'application/json',
      attributes: [
        PROJECT_ATTRIBUTE,
        { key: 'type', value: REACTION_TYPE },
        { key: 'messageKey', value: messageKey },
        { key: 'createdAtMs', value: Date.now() },
      ],
      expiresIn: ExpirationTime.fromDays(30),
    });

    return NextResponse.json({ ok: true, entityKey, txHash });
  } catch (error: any) {
    if (error instanceof EntityMutationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    }
    return NextResponse.json({ ok: false, error: error?.message || 'Failed to create reaction' }, { status: 500 });
  }
}
```

### Step 9.2: Add reaction buttons to the UI

In `app/hello-world/page.tsx`, under each message in the message list, add three emoji buttons:

```tsx
const react = async (messageKey: string, emoji: string) => {
  await fetch('/api/serverless-dapp101/reactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageKey, emoji }),
  });
};

// ...inside the message card, after the existing entity links:
<div className="flex gap-2 mt-2">
  {['heart', 'fire', 'sparkles'].map((emoji) => (
    <button
      key={emoji}
      onClick={() => react(msg.id, emoji)}
      className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
    >
      {emoji === 'heart' ? '❤️' : emoji === 'fire' ? '🔥' : '✨'}
    </button>
  ))}
</div>
```

For the workshop you can keep the read side simple: a "Load reactions" link per message that calls the GET endpoint and displays the count. The full optimistic-UI pattern (server returns immediately, indexer catches up in seconds) is the same as for messages.

### Step 9.3: Try the variations

Once it works end to end, try these on your own. Each is one small change:

- **Filter your own reactions:** add `.ownedBy(walletAddress)` to the reactions query to see only the reactions you posted (vs everyone's).
- **Filter by creator instead of owner:** swap `.ownedBy` for `.createdBy`. Since reactions are never transferred, they behave the same, but on a real app where ownership can change, `.createdBy` is the tamper-proof choice.
- **Range-query recent reactions:** import `gte` from `@arkiv-network/sdk/query` and filter `gte('createdAtMs', Date.now() - 60 * 60 * 1000)` to see only reactions from the last hour.
- **Add a third entity type:** an `agent_response` that points at a message via `messageKey` (same FK pattern). Now you have a tree.

## Three rules to remember

1. **Project tag every entity, in every type.** Always.
2. **Use a shared attribute key to link parent and child.** Always.
3. **Right-size `expiresIn` per entity type.** Ephemeral types live shorter; durable types live longer.

## Checkpoint

Before moving to the next step, verify:

- [ ] I have added a second entity type to my app
- [ ] My second entity type uses `PROJECT_ATTRIBUTE`, a distinct `type` value, and a shared FK attribute pointing at the parent
- [ ] My second entity type has a shorter `expiresIn` than the parent
- [ ] I can query children of a specific parent in one round trip
- [ ] I have tried at least one of the variations in step 9.3

## Troubleshooting

**Q: My reactions return as an empty list even though I posted some.**
A: Indexer lag, give it 5 to 30 seconds and refresh. If they still do not appear, check (a) that you stamped `PROJECT_ATTRIBUTE` on both the write and the read, and (b) that the `messageKey` value on the write exactly matches the entity key you are querying for.

**Q: Can I model many-to-many relationships?**
A: Yes, but not with an array attribute on either side. Use a third entity type that represents the link itself (for example `workshop_message_tag` with `messageKey` and `tag` attributes). Then a many-to-many is two `eq` filters on that link type.

**Q: Should `messageKey` be a string or a number attribute?**
A: String. Entity keys are hex strings, not numbers. Only store numerics as numbers (timestamps, scores, counts) so you can range-query them.

**Q: What if I want to "edit" a message instead of adding a reaction?**
A: Use `walletClient.updateEntity({ entityKey, ... })`. Two caveats from step 8: only the current `$owner` can update, and any attribute you omit is dropped (it is a full replace).
