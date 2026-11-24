import { lazy, Suspense, useEffect, useRef } from "react";
import { Container } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { questions } from "../../data/questions";
import { levels } from "../../data/levels";
import { calculateProgress } from "../../engine/calculateProgress";
import {
  getAnswer,
  getOptionsInSessionOrder,
  recordAnswer,
} from "../../engine/session";
import { validateSession } from "../../engine/validateSession";
import type {
  StoredJourney,
  QuizNavigation,
} from "../../storage/sessionStorage";
import { QuestionCard } from "../../components/quiz/QuestionCard";
import "./quiz.css";
const ResultPage = lazy(() =>
  import("../Result/ResultPage").then((module) => ({
    default: module.ResultPage,
  })),
);

export function QuizPage({
  journey,
  onChange,
  onRestart,
  skipReveal,
}: {
  journey: StoredJourney;
  onChange: (journey: StoredJourney) => void;
  onRestart: () => void;
  skipReveal: boolean;
}) {
  const { session, navigation: view, passedMilestones } = journey;
  function setView(navigation: QuizNavigation, passed = passedMilestones) {
    onChange({ ...journey, navigation, passedMilestones: passed });
  }
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progress = calculateProgress(session);
  const question = view.kind === "question" ? questions[view.index] : null;
  const currentLevel = question
    ? levels.find((level) => level.id === question.levelId)!
    : view.kind === "level"
      ? levels[view.completed]
      : levels[2];
  const phase = (levels.indexOf(currentLevel) + 1) as 1 | 2 | 3;

  useEffect(() => {
    headingRef.current?.focus();
  }, [view]);

  function advance() {
    if (!question || !getAnswer(session, question.id)) return;
    if (view.kind !== "question") return;
    if (view.index === questions.length - 1) {
      validateSession(session, true);
      setView({ kind: "complete" });
    } else if (
      (question.number === 5 || question.number === 10) &&
      passedMilestones < phase
    ) {
      setView({
        kind: "level",
        completed: phase - 1,
        nextIndex: view.index + 1,
      });
    } else {
      setView({ kind: "question", index: view.index + 1 });
    }
  }

  if (view.kind === "complete")
    return (
      <Suspense
        fallback={
          <main className="session-screen">
            <p role="status">Carregando seu resultado…</p>
          </main>
        }
      >
        <ResultPage
          session={session}
          onRestart={onRestart}
          skipReveal={skipReveal}
        />
      </Suspense>
    );

  return (
    <main className="quiz" data-phase={phase}>
      <Container className="quiz-shell">
        <header className="quiz-header">
          <div className="quiz-brand">
            <span aria-hidden="true">◇</span> DNA:IA <small>QUEST MODE</small>
          </div>
          <span className="quiz-player">
            JOGADOR <bdi>{session.nickname}</bdi>
          </span>
        </header>
        <div className="quiz-status">
          <div className="quiz-level">
            <span>LEVEL {String(phase).padStart(2, "0")}</span>
            <strong>{currentLevel.label.toUpperCase()}</strong>
          </div>
          <ProgressBar
            label={`XP da experiência: ${progress.answered} de ${progress.total} perguntas respondidas`}
            value={progress.percent}
            phase={phase}
          />
        </div>
        {question && view.kind === "question" ? (
          <section
            className="quiz-content"
            aria-labelledby="quiz-question-title"
            key={question.id}
          >
            <div className="quiz-counter">
              PERGUNTA {String(question.number).padStart(2, "0")}{" "}
              <span>/ {questions.length}</span>
            </div>
            <h1 id="quiz-question-title" tabIndex={-1} ref={headingRef}>
              {question.prompt}
            </h1>
            <QuestionCard
              question={question}
              options={getOptionsInSessionOrder(session, question.id)}
              selectedId={getAnswer(session, question.id)}
              onSelect={(optionId) =>
                onChange({
                  ...journey,
                  session: recordAnswer(session, question.id, optionId),
                })
              }
            />
            <nav
              className="quiz-navigation"
              aria-label="Navegação das perguntas"
            >
              <Button
                variant="secondary"
                onClick={() =>
                  setView({ kind: "question", index: view.index - 1 })
                }
                disabled={view.index === 0}
              >
                ← Voltar
              </Button>
              <Button
                onClick={advance}
                disabled={!getAnswer(session, question.id)}
              >
                {view.index === 14 ? "Concluir" : "Avançar →"}
              </Button>
            </nav>
          </section>
        ) : view.kind === "level" ? (
          <section
            className="quiz-milestone"
            aria-labelledby="quiz-milestone-title"
          >
            <span className="quiz-milestone__symbol" aria-hidden="true">
              ✦
            </span>
            <p className="quiz-kicker">FASE CONCLUÍDA</p>
            <h1 id="quiz-milestone-title" tabIndex={-1} ref={headingRef}>
              LEVEL {String(view.completed + 1).padStart(2, "0")} COMPLETO
            </h1>
            <p>
              Boa! Você registrou {progress.answered} respostas e chegou a{" "}
              {progress.percent}% de XP.
            </p>
            <p>
              Próxima fase:{" "}
              <strong>{levels[view.completed + 1].label.toUpperCase()}</strong>.
            </p>
            <div className="quiz-navigation">
              <Button
                variant="secondary"
                onClick={() =>
                  setView({ kind: "question", index: view.nextIndex - 1 })
                }
              >
                Rever pergunta
              </Button>
              <Button
                onClick={() =>
                  setView(
                    { kind: "question", index: view.nextIndex },
                    (view.completed + 1) as 1 | 2,
                  )
                }
              >
                Continuar →
              </Button>
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
