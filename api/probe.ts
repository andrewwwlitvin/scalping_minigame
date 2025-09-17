// GET /api/probe?path=/whatever&pair=BTC-USDT
// Safely fetches lite-api.jup.ag and returns {status, url, bodySnippet} for debugging.
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const base = process.env.JUP_API_BASE!;
    const key  = process.env.JUP_API_KEY!;
    const path = (req.query.path as string) || '/';
    const pair = (req.query.pair as string) || '';
    const url  = `${base}${path}${pair ? (path.includes('?') ? '&' : '?') + 'pair=' + encodeURIComponent(pair) : ''}`;

    const r = await fetch(url, { headers: { 'x-api-key': key } });
    const text = await r.text();

    // Don't blast huge responses
    const bodySnippet = text.length > 4000 ? text.slice(0, 4000) + '…(truncated)' : text;

    return res.status(200).json({
      ok: true,
      url,
      status: r.status,
      headers: Object.fromEntries(r.headers.entries()),
      bodySnippet
    });
  } catch (e:any) {
    return res.status(500).json({ ok:false, error: e.message || 'probe_failed' });
  }
}
