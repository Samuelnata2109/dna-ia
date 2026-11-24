import { questions } from "../data/questions";
import { validateSession } from "../engine/validateSession";
import type { QuizSession } from "../types/quiz";

export const SESSION_KEY = "dna-ia:journey:v1";
export type QuizNavigation =
  | { kind: "question"; index: number }
  | { kind: "level"; completed: number; nextIndex: number }
  | { kind: "complete" };
export type StoredJourney = {
  storageVersion: 1;
  session: QuizSession;
  navigation: QuizNavigation;
  passedMilestones: 0 | 1 | 2;
};
type StorageAccess = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export type ReadJourney =
  | { kind: "empty" }
  | { kind: "valid"; journey: StoredJourney }
  | { kind: "invalid" }
  | { kind: "unavailable" };

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
export function validateJourney(
  value: unknown,
): asserts value is StoredJourney {
  if (
    !record(value) ||
    Object.keys(value).sort().join() !==
      "navigation,passedMilestones,session,storageVersion" ||
    value.storageVersion !== 1
  )
    throw new Error("Formato salvo incompatível.");
  validateSession(value.session);
  const session = value.session;
  const answered = Object.keys(session.answers).length;
  if (
    questions.some(
      (question, index) =>
        index < answered !== Object.hasOwn(session.answers, question.id),
    )
  )
    throw new Error("Respostas fora da sequência.");
  const passed = value.passedMilestones;
  if ((passed !== 0 && passed !== 1 && passed !== 2) || answered < passed * 5)
    throw new Error("Fases inconsistentes.");
  const nav = value.navigation;
  if (!record(nav)) throw new Error("Navegação inválida.");
  if (
    nav.kind === "question" &&
    Object.keys(nav).sort().join() === "index,kind" &&
    typeof nav.index === "number" &&
    Number.isInteger(nav.index) &&
    nav.index >= 0 &&
    nav.index < 15 &&
    nav.index <= answered &&
    Math.floor(nav.index / 5) <= passed
  )
    return;
  if (
    nav.kind === "level" &&
    Object.keys(nav).sort().join() === "completed,kind,nextIndex" &&
    (nav.completed === 0 || nav.completed === 1) &&
    nav.completed === passed &&
    nav.nextIndex === (nav.completed + 1) * 5 &&
    answered >= nav.nextIndex
  )
    return;
  if (
    nav.kind === "complete" &&
    Object.keys(nav).length === 1 &&
    passed === 2
  ) {
    validateSession(value.session, true);
    return;
  }
  throw new Error("Navegação inconsistente.");
}

export function readJourney(storage?: StorageAccess): ReadJourney {
  let raw: string | null;
  try {
    raw = (storage ?? window.localStorage).getItem(SESSION_KEY);
  } catch {
    return { kind: "unavailable" };
  }
  if (raw === null) return { kind: "empty" };
  try {
    const journey: unknown = JSON.parse(raw);
    validateJourney(journey);
    return { kind: "valid", journey };
  } catch {
    return { kind: "invalid" };
  }
}
export function saveJourney(
  journey: StoredJourney,
  storage?: StorageAccess,
): boolean {
  validateJourney(journey);
  try {
    (storage ?? window.localStorage).setItem(
      SESSION_KEY,
      JSON.stringify(journey),
    );
    return true;
  } catch {
    return false;
  }
}
export function clearJourney(storage?: StorageAccess): boolean {
  try {
    const target = storage ?? window.localStorage;
    target.removeItem(SESSION_KEY);
    return target.getItem(SESSION_KEY) === null;
  } catch {
    return false;
  }
}
