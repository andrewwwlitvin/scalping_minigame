import React from "react";

export default function DepositTab() {
  return (
    <div className="card" role="region" aria-label="Deposit Stars">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div className="subtle" style={{ marginBottom: 4 }}>Your balance</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>0 ⭐</div>
        </div>
        <div className="badge">Telegram Stars</div>
      </div>

      <button className="btn" onClick={() => alert("UI only (no payments wired yet).")}>
        💳 Deposit Stars
      </button>

      <div className="subtle" style={{ marginTop: 10, lineHeight: 1.4 }}>
        Payments are powered by Telegram Stars. This is a visual prototype — no funds move here yet.
      </div>
    </div>
  );
}
