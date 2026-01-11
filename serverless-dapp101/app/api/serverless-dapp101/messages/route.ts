import { NextRequest, NextResponse } from 'next/server';
import { getPublicClient, getWalletClientFromPrivateKey } from '../../../../lib/arkiv/client';
import { SPACE_ID, getPrivateKey } from '../../../../lib/config';
import { handleTransactionWithTimeout } from '../../../../lib/arkiv/transaction-utils';
import { isTransactionTimeoutError, isRateLimitError } from '../../../../lib/arkiv/transaction-utils';
import { eq } from '@arkiv-network/sdk/query';

// TextEncoder is available globally in Node.js 18+
const enc = new TextEncoder();

// GET: List messages
export async function GET() {
  try {
    const publicClient = getPublicClient();
    
    // Query messages from Arkiv using query builder
    // IMPORTANT: Query by type ONLY (no spaceId filter) to show ALL messages regardless of wallet or spaceId
    // This ensures messages from all students appear on the demo page, even if they used different spaceIds
    // Use BETA_SPACE_ID env var if set (for workshop), otherwise use default from config
    const querySpaceId = process.env.BETA_SPACE_ID || SPACE_ID;
    const spaceIdsToQuery = Array.from(new Set([querySpaceId, 'ns']));
    
    // Try querying WITHOUT spaceId filter first to get ALL messages of type 'workshop_message'
    // If that fails (Arkiv requires spaceId), fall back to querying specific spaceIds
    let messageResult, txHashResult;
    
    try {
      // Attempt to query without spaceId filter (shows ALL messages regardless of spaceId or wallet)
      [messageResult, txHashResult] = await Promise.all([
        publicClient
          .buildQuery()
          .where(eq('type', 'workshop_message'))
          .withAttributes(true)
          .withPayload(true)
          .limit(500)
          .fetch(),
        publicClient
          .buildQuery()
          .where(eq('type', 'workshop_message_txhash'))
          .withAttributes(true)
          .withPayload(true)
          .limit(500)
          .fetch(),
      ]);
    } catch (error) {
      // If querying without spaceId fails, fall back to querying specific spaceIds
      console.warn('[messages/route] Query without spaceId failed, falling back to spaceId-specific queries:', error);
      const [messageResults, txHashResults] = await Promise.all([
        Promise.all(
          spaceIdsToQuery.map(spaceId =>
            publicClient
              .buildQuery()
              .where(eq('type', 'workshop_message'))
              .where(eq('spaceId', spaceId))
              .withAttributes(true)
              .withPayload(true)
              .limit(100)
              .fetch()
              .catch(() => ({ entities: [] }))
          )
        ),
        Promise.all(
          spaceIdsToQuery.map(spaceId =>
            publicClient
              .buildQuery()
              .where(eq('type', 'workshop_message_txhash'))
              .where(eq('spaceId', spaceId))
              .withAttributes(true)
              .withPayload(true)
              .limit(100)
              .fetch()
              .catch(() => ({ entities: [] }))
          )
        ),
      ]);
      
      messageResult = {
        entities: messageResults.flatMap(r => r.entities || []),
      };
      txHashResult = {
        entities: txHashResults.flatMap(r => r.entities || []),
      };
    }
    
    const result = messageResult || { entities: [] };
    const finalTxHashResult = txHashResult || { entities: [] };
    
    // Debug logging to help diagnose query issues
    console.log('[messages/route] Query results:', {
      totalEntities: result.entities?.length || 0,
      txHashEntities: finalTxHashResult.entities?.length || 0,
      sampleWallets: result.entities?.slice(0, 3).map((e: any) => {
        const attrs = e.attributes || {};
        const getAttr = (key: string) => {
          if (Array.isArray(attrs)) {
            return attrs.find((a: any) => a.key === key)?.value;
          }
          return attrs[key];
        };
        return {
          wallet: getAttr('wallet'),
          spaceId: getAttr('spaceId'),
          type: getAttr('type'),
        };
      }),
    });
    
    // Build txHash map from companion entities
    const txHashMap: Record<string, string> = {};
    if (finalTxHashResult?.entities && Array.isArray(finalTxHashResult.entities)) {
      finalTxHashResult.entities.forEach((entity: any) => {
        try {
          const attrs = entity.attributes || {};
          const getAttr = (key: string): string => {
            if (Array.isArray(attrs)) {
              const attr = attrs.find((a: any) => a.key === key);
              return String(attr?.value || '');
            }
            return String(attrs[key] || '');
          };
          const messageKey = getAttr('messageKey');
          if (messageKey) {
            let payload: any = {};
            if (entity.payload) {
              const decoded = entity.payload instanceof Uint8Array
                ? new TextDecoder().decode(entity.payload)
                : typeof entity.payload === 'string'
                ? entity.payload
                : JSON.stringify(entity.payload);
              payload = JSON.parse(decoded);
            }
            txHashMap[messageKey] = payload.txHash || getAttr('txHash') || '';
          }
        } catch (e) {
          console.error('[messages/route] Error processing txHash entity:', e);
        }
      });
    }
    
    // Parse messages from entities
    const messages = (result.entities || []).map((entity: any) => {
      let payload: any = {};
      try {
        if (entity.payload) {
          const decoded = entity.payload instanceof Uint8Array
            ? new TextDecoder().decode(entity.payload)
            : typeof entity.payload === 'string'
            ? entity.payload
            : JSON.stringify(entity.payload);
          payload = JSON.parse(decoded);
        }
      } catch (e) {
        console.error('Error decoding payload:', e);
      }
      
      const attrs = entity.attributes || {};
      const getAttr = (key: string): string => {
        if (Array.isArray(attrs)) {
          const attr = attrs.find((a: any) => a.key === key);
          return String(attr?.value || '');
        }
        return String(attrs[key] || '');
      };
      
      const entityKey = entity.key || entity.entityKey || '';
      return {
        id: entityKey,
        text: payload.text || getAttr('text') || '',
        wallet: getAttr('wallet') || '',
        createdAt: payload.createdAt || getAttr('created_at') || '',
        txHash: txHashMap[entityKey] || getAttr('txHash') || (entity as any).txHash || '',
      };
    });
    
    // Deduplicate by entity key (in case same message appears in multiple spaces)
    const seenKeys = new Set<string>();
    const uniqueMessages = messages.filter(msg => {
      if (seenKeys.has(msg.id)) {
        return false;
      }
      seenKeys.add(msg.id);
      return true;
    });
    
    // Sort by creation time (newest first)
    uniqueMessages.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return bTime - aTime;
    });
    
    return NextResponse.json({
      ok: true,
      messages: uniqueMessages,
    });
  } catch (error: any) {
    console.error('[messages/route] Error listing messages:', {
      message: error?.message,
      stack: error?.stack,
      error,
    });
    // Return empty array on query failure (graceful degradation per engineering guidelines)
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || 'Failed to list messages',
        messages: [],
      },
      { status: 500 }
    );
  }
}

// POST: Create a new message
export async function POST(request: NextRequest) {
  try {
    const privateKey = getPrivateKey(); // Throws if not configured
    const body = await request.json();
    const { text } = body;
    
    if (!text || !text.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Message text is required' },
        { status: 400 }
      );
    }
    
    const walletClient = getWalletClientFromPrivateKey(privateKey);
    const walletAddress = walletClient.account.address.toLowerCase();
    
    // Use BETA_SPACE_ID env var if set (for workshop), otherwise use default from config
    const querySpaceId = process.env.BETA_SPACE_ID || SPACE_ID;
    
    // Create payload
    const payload = JSON.stringify({
      text: text.trim(),
      createdAt: new Date().toISOString(),
    });
    
    // Create attributes (as array of key-value pairs, matching codebase pattern)
    const attributes = [
      { key: 'type', value: 'workshop_message' },
      { key: 'wallet', value: walletAddress }, // Already normalized to lowercase
      { key: 'spaceId', value: querySpaceId },
      { key: 'created_at', value: new Date().toISOString() },
    ];
    
    // Create entity on Arkiv with timeout handling (required by engineering guidelines)
    const result = await handleTransactionWithTimeout(async () => {
      return await walletClient.createEntity({
        payload: enc.encode(payload),
        attributes,
        contentType: 'application/json',
        expiresIn: 15768000, // 6 months
      });
    });
    
    const { entityKey, txHash } = result;
    
    // Create txHash companion entity for reliable querying (required by engineering guidelines)
    try {
      await walletClient.createEntity({
        payload: enc.encode(JSON.stringify({ txHash })),
        contentType: 'application/json',
        attributes: [
          { key: 'type', value: 'workshop_message_txhash' },
          { key: 'messageKey', value: entityKey },
          { key: 'txHash', value: txHash },
          { key: 'spaceId', value: querySpaceId },
        ],
        expiresIn: 15768000,
      });
    } catch (error: any) {
      // Non-blocking: log warning but don't fail the request
      console.warn('[messages/route] Failed to create txhash entity, but message was created:', error);
    }
    
    return NextResponse.json({
      ok: true,
      status: 'submitted',
      entityKey,
      txHash,
      message: 'Message created. It may take a moment to appear in queries.',
    });
  } catch (error: any) {
    console.error('[messages/route] Error creating message:', {
      message: error?.message,
      error,
    });
    
    // Handle transaction timeout errors (common on testnets)
    if (isTransactionTimeoutError(error)) {
      return NextResponse.json(
        {
          ok: false,
          error: error?.message || 'Transaction submitted but confirmation pending. Please wait a moment and refresh.',
          status: 'submitted_or_pending',
        },
        { status: 202 } // Accepted but not yet confirmed
      );
    }
    
    // Handle rate limit errors
    if (isRateLimitError(error)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Rate limit exceeded. Please wait a moment and try again.',
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || 'Failed to create message',
      },
      { status: 500 }
    );
  }
}

