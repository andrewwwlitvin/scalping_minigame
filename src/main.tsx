import './index.css';   // <-- Tailwi
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

declare global {
  interface Window { Telegram?: any }
}

const tg = window.Telegram?.WebApp;
tg?.ready?.();
tg?.expand?.(); // use full height if allowed

createRoot(document.getElementById("root")!).render(<App />);
