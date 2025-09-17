import React from "react";

const PAIRS = ["BTC-USDT", "ETH-USDT", "SOL-USDT"];

export default function LiveChartsTab() {
  return (
    <div className="card" role="region" aria-label="Live Charts">
      <div style={{ marginBottom: 10 }}>
        <div className="subtle" style={{ marginBottom: 6 }}>Quick pairs</div>
        <div className="pair-grid">
          {PAIRS.map((p) => (
            <button
              key={p}
              className="pair"
              onClick={() => alert(`${p} — charts coming soon`)}
              aria-label={`Open ${p}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="subtle">
        Tip: tap a pair to open its live chart in a future update. Buttons already have a tactile press effect.
      </div>
    </div>
  );
}
