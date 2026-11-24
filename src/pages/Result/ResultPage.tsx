import { useEffect, useRef } from "react";
import { getFinalResult } from "../../engine/scoring";
import type { Profile, QuizSession } from "../../types/quiz";
import { profileEditorial } from "../../data/profileEditorial";
import { ResultReveal } from "../../components/animations/ResultReveal";
import { ProfileDetails } from "../../components/result/ProfileDetails";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Container } from "../../components/layout/Layout";
import { ResultActions } from "../../components/result/ResultActions";
import "./result.css";

function ProfileResult({
  profile,
  nickname,
  onRestart,
}: {
  profile: Profile;
  nickname: string;
  onRestart: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  return (
    <article className="result-profile" aria-labelledby="result-title">
      <div className="result-hero">
        <figure className="result-portrait">
          <img
            src={`${import.meta.env.BASE_URL}images/profiles/the-${profile.id}.webp`}
            alt={profileEditorial[profile.id].imageAlt}
            width="960"
            height="960"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>IDENTIDADE / {profile.id.toUpperCase()}</figcaption>
        </figure>
        <div className="result-identity">
          <p className="result-kicker">PROFILE UNLOCKED</p>
          <h1 id="result-title" tabIndex={-1} ref={heading}>
            {profile.codename}
          </h1>
          <p className="result-profession">{profile.professionalName}</p>
          <p className="result-congratulations">
            Parabéns, <bdi>{nickname}</bdi>, você tem todas as características
            de um {profile.professionalName}.
          </p>
          <p className="result-description">{profile.description}</p>
          <span className="result-seal">✦ IDENTIDADE DESBLOQUEADA</span>
        </div>
      </div>
      <ProfileDetails profile={profile} />
      <ResultActions profile={profile} onRestart={onRestart} />
      <p className="result-disclaimer">
        Este resultado é uma descoberta recreativa baseada nos seus interesses e
        escolhas.
      </p>
    </article>
  );
}

export function ResultPage({
  session,
  onRestart,
  skipReveal = false,
}: {
  session: QuizSession;
  onRestart: () => void;
  skipReveal?: boolean;
}) {
  // getFinalResult performs full validation before any result UI is rendered.
  const profile = getFinalResult(session);
  return (
    <main className="result-page">
      <Container className="result-shell">
        <header className="result-header">
          <span>DNA:IA</span>
          <span>IDENTITY / COMPLETE</span>
        </header>
        <ProgressBar
          label="Experiência concluída: 15 de 15 respostas"
          value={100}
          phase={3}
        />
        <ResultReveal skip={skipReveal}>
          <ProfileResult
            profile={profile}
            nickname={session.nickname}
            onRestart={onRestart}
          />
        </ResultReveal>
      </Container>
    </main>
  );
}
