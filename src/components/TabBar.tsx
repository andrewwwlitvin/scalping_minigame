import React from "react";

type TabKey = "deposit" | "live" | "leaders";

export default function TabBar({
  active,
  onChange
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  return (
    <div className="tabbar">
      <div className="tabbar-inner">
        <button
          className={`tab-btn ${active === "deposit" ? "active" : ""}`}
          onClick={() => onChange("deposit")}
          aria-label="Deposit tab"
        >
          <span className="tab-icon">💎</span>
          <span className="tab-label">Deposit</span>
        </button>

        <button
          className={`tab-btn ${active === "live" ? "active" : ""}`}
          onClick={() => onChange("live")}
          aria-label="Live charts tab"
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Live</span>
        </button>

        <button
          className={`tab-btn ${active === "leaders" ? "active" : ""}`}
          onClick={() => onChange("leaders")}
          aria-label="Leaders tab"
        >
          <span className="tab-icon">🏆</span>
          <span className="tab-label">Leaders</span>
        </button>
      </div>
    </div>
  );
}
