import React, { useMemo, useState } from "react";
import TabBar from "./components/TabBar";
import DepositTab from "./components/tabs/DepositTab";
import LiveChartsTab from "./components/tabs/LiveChartsTab";
import LeadersTab from "./components/tabs/LeadersTab";

type TabKey = "deposit" | "live" | "leaders";

export default function App() {
  const [tab, setTab] = useState<TabKey>("deposit");
  const title = useMemo(() => {
    switch (tab) {
      case "deposit": return "Deposit";
      case "live":    return "Live Charts";
      case "leaders": return "Leaders";
    }
  }, [tab]);

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="header">
          <h1>Scalping Opps</h1>
          <span className="subtle">Mini App</span>
        </div>

        {tab === "deposit" && <DepositTab />}
        {tab === "live" && <LiveChartsTab />}
        {tab === "leaders" && <LeadersTab />}
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}

