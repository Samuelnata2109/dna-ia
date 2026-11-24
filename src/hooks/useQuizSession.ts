import { useState } from "react";
import { createSession } from "../engine/session";
import {
  clearJourney,
  readJourney,
  saveJourney,
  type StoredJourney,
} from "../storage/sessionStorage";

const unavailable =
  "Não foi possível salvar neste dispositivo. Sua jornada continua nesta aba, mas pode ser perdida ao fechar ou atualizar.";
const savedNotice = "Progresso salvo neste dispositivo.";
export function useQuizSession() {
  const [loaded] = useState(readJourney);
  const [candidate, setCandidate] = useState(
    loaded.kind === "valid" ? loaded.journey : null,
  );
  const [invalid, setInvalid] = useState(loaded.kind === "invalid");
  const [active, setActive] = useState<StoredJourney | null>(null);
  const [skipReveal, setSkipReveal] = useState(false);
  const [notice, setNotice] = useState(
    loaded.kind === "unavailable" ? unavailable : "",
  );

  function update(journey: StoredJourney) {
    const saved = saveJourney(journey);
    setActive(journey);
    setNotice(saved ? savedNotice : unavailable);
  }
  function start(nickname: string) {
    if (candidate || invalid || active) return;
    setSkipReveal(false);
    update({
      storageVersion: 1,
      session: createSession(nickname),
      navigation: { kind: "question", index: 0 },
      passedMilestones: 0,
    });
  }
  function resume() {
    if (!candidate) return;
    setSkipReveal(candidate.navigation.kind === "complete");
    setActive(candidate);
    setCandidate(null);
    setNotice(
      "Jornada retomada. Suas respostas e a ordem das alternativas foram preservadas.",
    );
  }
  function restart() {
    if (!clearJourney()) return false;
    setActive(null);
    setCandidate(null);
    setInvalid(false);
    setSkipReveal(false);
    setNotice("");
    return true;
  }
  return {
    candidate,
    invalid,
    active,
    skipReveal,
    notice,
    liveNotice: notice === savedNotice ? "" : notice,
    start,
    update,
    resume,
    restart,
  };
}
