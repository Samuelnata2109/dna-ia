import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@fontsource/press-start-2p/latin-400.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./styles/global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Elemento raiz da aplicação ausente.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
