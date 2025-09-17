// Vercel Serverless Function: /api/history?pair=BTC-USDT&limit=60
// Fetches last N=limit 1s prices from jup.ag and returns an array of {t, p}
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const pair = (req.query.pair as string) || 'BTC-USDT';
    const limit = Math.min(parseInt((req.query.limit as string) || '60', 10), 600);

    // TODO: replace this with your real jup.ag history endpoint + params.
    // Example shape (adapt to your API):
    //   GET `${process.env.JUP_API_BASE}/history?pair=${pair}&interval=1s&limit=${limit}`
    const url = `${process.env.JUP_API_BASE}/history?pair=${encodeURIComponent(pair)}&interval=1s&limit=${limit}`;

    const r = await fetch(url, {
      headers: process.env.JUP_API_KEY ? { 'Authorization': `Bearer ${process.env.JUP_API_KEY}` } : undefined,
      // @ts-ignore – optional: small timeout via AbortController in real code
    });

    if (!r.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }

    // Expect upstream JSON; map to [{ t: number (ms), p: number }]
    const raw = await r.json();

    // TODO: Map raw fields to {t,p}. Below is a generic mapper – change as needed.
    // Suppose raw.candles = [{ ts: 1711111111, close: 123.45 }, ...]
    const points = (raw.candles || raw.points || raw.data || []).slice(-limit).map((c: any) => ({
      t: (c.ts_ms ?? (c.ts * 1000)) as number,
      p: Number(c.close ?? c.price),
    })).filter((x: any) => Number.isFinite(x.p));

    return res.json({ ok: true, pair, points });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e.message || 'internal_error' });
  }
}
