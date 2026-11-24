import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "../ui/Button";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return window.matchMedia(query).matches;
}

export function ResultReveal({
  children,
  skip = false,
}: {
  children: React.ReactNode;
  skip?: boolean;
}) {
  const reduced = useSyncExternalStore(subscribe, getReducedMotion);
  const [step, setStep] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const revealed = skip || reduced || step >= 3;
  useEffect(() => {
    if (revealed) return;
    const timers = [1, 2, 3].map((nextStep) =>
      window.setTimeout(
        () => setStep((current) => Math.max(current, nextStep)),
        nextStep * 750,
      ),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [revealed]);
  useEffect(() => {
    if (!revealed) heading.current?.focus();
  }, [revealed]);
  if (revealed) return children;
  return (
    <section className="result-scan" aria-labelledby="result-scan-title">
      <div className="result-scan__core" aria-hidden="true">
        <span>◇</span>
        <i />
        <i />
        <i />
      </div>
      <p className="result-kicker">15 respostas registradas!</p>
      <h1 ref={heading} tabIndex={-1} id="result-scan-title">
        Sua identidade está chegando.
      </h1>
      <p className="result-scan__status" role="status">
        {
          [
            "ANALISANDO ESCOLHAS...",
            "PROCESSANDO PERFIL...",
            "IDENTIDADE DESBLOQUEADA.",
          ][step]
        }
      </p>
      <Button onClick={() => setStep(3)}>Pular animação</Button>
    </section>
  );
}
