import { useState, useSyncExternalStore } from "react";
import { DesignSystem } from "./pages/DesignSystem";
import { WelcomePage } from "./pages/Welcome/WelcomePage";
import { QuizPage } from "./pages/Quiz/QuizPage";
import { createSession } from "./engine/session";
import type { QuizSession } from "./types/quiz";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHash() {
  return window.location.hash;
}

export function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash);
  const [session, setSession] = useState<QuizSession | null>(null);
  if (hash === "#design-system") return <DesignSystem />;
  return session ? (
    <QuizPage session={session} onSessionChange={setSession} />
  ) : (
    <WelcomePage onStart={(nickname) => setSession(createSession(nickname))} />
  );
}
