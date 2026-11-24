import { questions } from "../data/questions";
import type { ProfileId, QuizSession } from "../types/quiz";
import { validateSession } from "./validateSession";

export function resolveTie(
  session: QuizSession,
  candidates: readonly ProfileId[],
): ProfileId {
  validateSession(session, true);
  if (
    candidates.length < 2 ||
    new Set(candidates).size !== candidates.length ||
    candidates.some(
      (id) => !questions[0].options.some((option) => option.profileId === id),
    )
  ) {
    throw new Error("Grupo de perfis empatados inválido.");
  }

  const phaseThree = new Map(candidates.map((id) => [id, 0]));
  for (const question of questions.filter(
    (item) => item.levelId === "level-03",
  )) {
    const profileId = question.options.find(
      (option) => option.id === session.answers[question.id],
    )!.profileId;
    if (phaseThree.has(profileId)) {
      phaseThree.set(profileId, phaseThree.get(profileId)! + question.weight);
    }
  }

  const highest = Math.max(...phaseThree.values());
  const stillTied = candidates.filter((id) => phaseThree.get(id) === highest);
  if (stillTied.length === 1) return stillTied[0];

  for (const question of [...questions].reverse()) {
    const profileId = question.options.find(
      (option) => option.id === session.answers[question.id],
    )!.profileId;
    if (stillTied.includes(profileId)) return profileId;
  }

  throw new Error("Não foi possível resolver o desempate.");
}
