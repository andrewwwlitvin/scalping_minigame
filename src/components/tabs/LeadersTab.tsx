import React from "react";

const LEADERS = [
  { rank: 1, name: "alpha_trader", pnl: "+42.3%", streak: "7W" },
  { rank: 2, name: "delta_scalp", pnl: "+31.8%", streak: "5W" },
  { rank: 3, name: "quant_owl", pnl: "+27.1%", streak: "4W" },
  { rank: 4, name: "fiber_fx", pnl: "+19.4%", streak: "3W" },
  { rank: 5, name: "nova_k", pnl: "+15.2%", streak: "2W" }
];

export default function LeadersTab() {
  return (
    <div className="card" role="region" aria-label="Leaders">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <strong>Leaderboard</strong>
        <span className="subtle">dummy data</span>
      </div>

      <table className="table" aria-label="Leaderboard table">
        <thead>
          <tr>
            <th className="rank">#</th>
            <th>Trader</th>
            <th>Streak</th>
            <th className="score">PnL</th>
          </tr>
        </thead>
        <tbody>
          {LEADERS.map((r) => (
            <tr key={r.rank}>
              <td className="rank">{r.rank}</td>
              <td className="name">@{r.name}</td>
              <td><span className="badge">{r.streak}</span></td>
              <td className="score" style={{ color: r.pnl.startsWith("+") ? "var(--good)" : "var(--danger)" }}>
                {r.pnl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
