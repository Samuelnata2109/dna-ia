import { useEffect, useRef } from "react";
import { calculateProgress } from "../../engine/calculateProgress";
import type { StoredJourney } from "../../storage/sessionStorage";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";

export function ResumeSession({
  journey,
  onContinue,
  onRestart,
}: {
  journey: StoredJourney | null;
  onContinue: () => void;
  onRestart: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  const progress = journey ? calculateProgress(journey.session) : null;
  const nav = journey?.navigation;
  const phase = (
    nav?.kind === "question"
      ? Math.floor(nav.index / 5) + 1
      : nav?.kind === "level"
        ? nav.completed + 1
        : 3
  ) as 1 | 2 | 3;
  return (
    <main className="session-screen">
      <section className="session-panel" aria-labelledby="resume-title">
        <p className="session-kicker">DNA:IA / CONTINUE</p>
        <h1 id="resume-title" tabIndex={-1} ref={heading}>
          {journey
            ? "Sua jornada está aqui."
            : "Não foi possível recuperar esta jornada."}
        </h1>
        {journey && progress ? (
          <>
            <p>
              Olá, <bdi>{journey.session.nickname}</bdi>! Você já respondeu{" "}
              {progress.answered} de 15 perguntas.
            </p>
            <ProgressBar
              label="XP salvo"
              value={progress.percent}
              phase={phase}
            />
            <p>
              {nav?.kind === "complete"
                ? "As 15 respostas foram registradas. Você pode acessar seu resultado."
                : nav?.kind === "question"
                  ? `Retomada na pergunta ${nav.index + 1} de 15.`
                  : "Uma transição de fase aguarda você."}
            </p>
          </>
        ) : (
          <p>
            O arquivo salvo está incompatível ou contém dados inválidos. Você
            pode apagá-lo e começar uma nova experiência.
          </p>
        )}
        <div className="session-buttons">
          {journey && (
            <Button onClick={onContinue}>CONTINUAR MINHA JORNADA</Button>
          )}
          <Button variant="secondary" onClick={onRestart}>
            COMEÇAR NOVAMENTE
          </Button>
        </div>
      </section>
    </main>
  );
}
