import { lazy, Suspense, useState, useSyncExternalStore } from "react";
import { WelcomePage } from "./pages/Welcome/WelcomePage";
import { useQuizSession } from "./hooks/useQuizSession";
import { ResumeSession } from "./components/session/ResumeSession";
import { RestartConfirmation } from "./components/session/RestartConfirmation";
import "./styles/session.css";

const QuizPage = lazy(() =>
  import("./pages/Quiz/QuizPage").then((module) => ({
    default: module.QuizPage,
  })),
);
const DesignSystem = lazy(() =>
  import("./pages/DesignSystem").then((module) => ({
    default: module.DesignSystem,
  })),
);

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHash() {
  return window.location.hash;
}

export function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash);
  const journey = useQuizSession();
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [restartError, setRestartError] = useState("");
  const [focusWelcome, setFocusWelcome] = useState(false);
  function requestRestart() {
    setRestartError("");
    setConfirmRestart(true);
  }
  return (
    <>
      {hash !== "#design-system" && (
        <>
          {journey.notice && !journey.liveNotice && (
            <p className="session-notice">{journey.notice}</p>
          )}
          <p
            className={
              journey.liveNotice ? "session-notice" : "session-announcement"
            }
            aria-label="Estado da jornada"
            role="status"
            aria-atomic="true"
          >
            {journey.liveNotice}
          </p>
        </>
      )}
      <Suspense
        fallback={
          <main className="session-screen">
            <p role="status">Carregando sua jornada…</p>
          </main>
        }
      >
        {hash === "#design-system" ? (
          <DesignSystem />
        ) : journey.candidate || journey.invalid ? (
          <ResumeSession
            journey={journey.candidate}
            onContinue={journey.resume}
            onRestart={requestRestart}
          />
        ) : journey.active ? (
          <QuizPage
            journey={journey.active}
            onChange={journey.update}
            onRestart={requestRestart}
            skipReveal={journey.skipReveal}
          />
        ) : (
          <WelcomePage onStart={journey.start} focusOnMount={focusWelcome} />
        )}
      </Suspense>
      {confirmRestart && (
        <RestartConfirmation
          message={restartError}
          onCancel={() => setConfirmRestart(false)}
          onConfirm={() => {
            if (journey.restart()) {
              setFocusWelcome(true);
              setConfirmRestart(false);
            } else
              setRestartError(
                "O progresso não pôde ser apagado. A jornada foi mantida. Tente novamente ou cancele.",
              );
          }}
        />
      )}
    </>
  );
}
