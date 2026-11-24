import { useState } from "react";
import { Container } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { project } from "../../project";
import { DnaCore } from "../../components/graphics/DnaCore";
import { NicknameForm } from "./NicknameForm";
import { WelcomeHero } from "./WelcomeHero";
import "./welcome.css";

function StartPreview({
  nickname,
  onBack,
}: {
  nickname: string;
  onBack: () => void;
}) {
  return (
    <section
      className="welcome-preview"
      aria-labelledby="welcome-preview-title"
    >
      <h2
        id="welcome-preview-title"
        tabIndex={-1}
        ref={(heading) => {
          heading?.focus();
        }}
      >
        Tudo pronto, <bdi>{nickname}</bdi>!
      </h2>
      <p>
        Seu nickname foi confirmado. As perguntas estarão disponíveis na próxima
        versão.
      </p>
      <Button variant="secondary" size="sm" onClick={onBack}>
        Voltar à entrada
      </Button>
    </section>
  );
}

export function WelcomePage() {
  const [session, setSession] = useState({ view: "welcome", nickname: "" });

  return (
    <main className="welcome">
      <header className="welcome-header">
        <Container className="welcome-brand">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            width="32"
            height="32"
          >
            <path
              d="M4 10V4h6m12 0h6v6m0 12v6h-6m-12 0H4v-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10 11h4v4h-4zm8 0h4v4h-4zm-4 4h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4z"
              fill="currentColor"
            />
          </svg>
          <div>
            <p className="welcome-brand__school">
              EEEP Guiomar Belchior Aguiar
            </p>
            <p className="welcome-brand__course">{project.course}</p>
          </div>
        </Container>
      </header>
      <Container className="welcome-stage">
        <div className="welcome-content">
          <WelcomeHero />
          {session.view === "preview" ? (
            <StartPreview
              nickname={session.nickname}
              onBack={() =>
                setSession((current) => ({ ...current, view: "welcome" }))
              }
            />
          ) : (
            <NicknameForm
              initialNickname={session.nickname}
              onStart={(nickname) =>
                setSession((current) =>
                  current.view === "welcome"
                    ? { view: "preview", nickname }
                    : current,
                )
              }
            />
          )}
        </div>
        <DnaCore />
      </Container>
    </main>
  );
}
