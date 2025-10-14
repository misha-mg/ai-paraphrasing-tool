import { NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/ai-service';
import { validateParaphraseInput, sanitizeText } from '@/lib/utils/validation';
import { ERROR_MESSAGES } from '@/lib/utils/constants';
import { toErrorMessage } from '@/lib/utils/error';
import { logger } from '@/lib/utils/logger';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const ipHits = new Map<string, { count: number; windowStart: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (now - rec.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = (request.headers as any).get?.('x-forwarded-for') || 'unknown';
    if (!rateLimit(String(ip))) {
      return NextResponse.json({ error: 'Too many requests', timestamp: new Date().toISOString() }, { status: 429 });
    }

    const body = await request.json();
    const text = typeof body?.text === 'string' ? body.text : '';

    const validation = validateParaphraseInput(text);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error, timestamp: new Date().toISOString() }, { status: 400 });
    }

    const cleanText = sanitizeText(text);
    const service = new AIService();
    const result = await service.paraphrase(cleanText);

    logger.info('paraphrase.success', { provider: result.provider, timestamp: result.timestamp });
    return NextResponse.json({ paraphrasedText: result.text, provider: result.provider, timestamp: result.timestamp });
  } catch (e: any) {
    const message = toErrorMessage(e, ERROR_MESSAGES.GENERIC);
    logger.error('paraphrase.error', message);
    return NextResponse.json({ error: message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}


