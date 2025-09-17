import React from "react";

export default function Live() {
  const pairs = ["BTC-USDT", "ETH-USDT", "SOL-USDT"];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">Quick pairs</h2>

      <div className="space-y-4">
        {pairs.map((p) => (
          <button
            key={p}
            className="w-full bg-slate-800 text-white font-semibold py-5 px-6 rounded-xl shadow-md 
                       hover:bg-slate-700 active:scale-95 transition transform"
          >
            {p}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-6">
        Tip: tap a pair to open its live chart in a future update.
        Buttons already have a tactile press effect.
      </p>
    </div>
  );
}
