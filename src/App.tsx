import { useSyncExternalStore } from "react";
import { DesignSystem } from "./pages/DesignSystem";
import { WelcomePage } from "./pages/Welcome/WelcomePage";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHash() {
  return window.location.hash;
}

export function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash);
  return hash === "#design-system" ? <DesignSystem /> : <WelcomePage />;
}
