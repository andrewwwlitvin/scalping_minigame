// Vercel Serverless Function: /api/price?pair=BTC-USDT
// Fetches latest price (1s) for a pair from jup.ag and returns {t, p}
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const pair = (req.query.pair as string) || 'BTC-USDT';

    // TODO: replace with your real jup.ag latest price endpoint.
    // Example:
    //   GET `${process.env.JUP_API_BASE}/price?pair=${pair}&interval=1s`
    const url = `${process.env.JUP_API_BASE}/price?pair=${encodeURIComponent(pair)}&interval=1s`;

    const r = await fetch(url, {
      headers: process.env.JUP_API_KEY ? { 'Authorization': `Bearer ${process.env.JUP_API_KEY}` } : undefined,
    });

    if (!r.ok) return res.status(502).json({ ok: false, error: 'upstream_failed' });

    const raw = await r.json();

    // TODO: Map raw to {t,p}. Example assumes raw = { ts: 1711111111, price: 123.45 }
    const t = (raw.ts_ms ?? (raw.ts * 1000) ?? Date.now());
    const p = Number(raw.price ?? raw.close);
    if (!Number.isFinite(p)) return res.status(500).json({ ok: false, error: 'bad_price' });

    return res.json({ ok: true, pair, point: { t, p } });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e.message || 'internal_error' });
  }
}
