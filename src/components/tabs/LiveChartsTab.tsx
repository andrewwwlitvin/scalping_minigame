import React, { useEffect, useMemo, useRef, useState } from "react";
import Sparkline from "../Sparkline";

const PAIRS = ["BTC-USDT", "ETH-USDT", "SOL-USDT"];

type Point = { t: number; p: number };

export default function LiveChartsTab() {
  const [active, setActive] = useState<string | null>(null);
  const [series, setSeries] = useState<Point[]>([]);
  const timerRef = useRef<number | null>(null);

  // Start polling when a pair is selected
  useEffect(() => {
    if (!active) return;

    let cancelled = false;

    // 1) Load initial history (up to 60 × 1s points)
    (async () => {
      try {
        const r = await fetch(`/api/history?pair=${encodeURIComponent(active)}&limit=60`);
        const json = await r.json();
        if (json.ok && Array.isArray(json.points) && !cancelled) {
          setSeries(json.points);
        } else {
          // Fallback: seed with a single point (will fill over time)
          const p = await fetch(`/api/price?pair=${encodeURIComponent(active)}`).then(r=>r.json());
          if (p.ok) setSeries([{ t: p.point.t, p: p.point.p }]);
        }
      } catch {
        // ignore
      }
    })();

    // 2) Poll latest price every 5s, append, cap to 60
    timerRef.current = window.setInterval(async () => {
      try {
        const r = await fetch(`/api/price?pair=${encodeURIComponent(active)}`);
        const j = await r.json();
        if (!j.ok) return;
        setSeries(prev => {
          const next = [...prev, j.point];
          // dedupe if same timestamp from upstream
          const trimmed = next.slice(-120); // small buffer
          const unique = trimmed.filter((p, i, arr) => i===0 || p.t !== arr[i-1].t);
          return unique.slice(-60);
        });
      } catch {
        // ignore
      }
    }, 5000) as unknown as number;

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active]);

  const header = useMemo(() => active ? `Live: ${active}` : "Quick pairs", [active]);

  return (
    <div className="card" role="region" aria-label="Live Charts">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10 }}>
        <div className="subtle" style={{ marginBottom: 6 }}>{header}</div>
        {active && (
          <button className="btn" onClick={() => { setActive(null); setSeries([]); }}>
            ← Back
          </button>
        )}
      </div>

      {!active && (
        <div className="pair-grid">
          {PAIRS.map((p) => (
            <button
              key={p}
              className="pair"
              onClick={() => setActive(p)}
              aria-label={`Open ${p}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {active && (
        <div style={{ display:'grid', gap:12 }}>
          <Sparkline data={series} width={320} height={120} />
          <div className="subtle">
            Updating every 5s. Shows up to 60 × 1s points from jup.ag.  
            (History fetch → latest price polling.)
          </div>
        </div>
      )}
    </div>
  );
}
