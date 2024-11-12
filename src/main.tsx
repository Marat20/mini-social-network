import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Ошибка в получении id root");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
