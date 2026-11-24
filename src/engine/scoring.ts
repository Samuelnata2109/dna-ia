import { profiles } from "../data/profiles";
import { questions } from "../data/questions";
import type { Profile, ProfileScores, QuizSession } from "../types/quiz";
import { resolveTie } from "./tieBreaker";
import { validateSession } from "./validateSession";

export function calculateScores(session: QuizSession): ProfileScores {
  validateSession(session);
  const scores = Object.fromEntries(
    profiles.map((profile) => [profile.id, 0]),
  ) as ProfileScores;

  for (const question of questions) {
    const answer = session.answers[question.id];
    if (!answer) continue;
    const profileId = question.options.find(
      (option) => option.id === answer,
    )!.profileId;
    scores[profileId] += question.weight;
  }

  return scores;
}

export function getFinalResult(session: QuizSession): Profile {
  validateSession(session, true);
  const scores = calculateScores(session);
  const highest = Math.max(...Object.values(scores));
  const candidates = profiles
    .filter((profile) => scores[profile.id] === highest)
    .map((profile) => profile.id);
  const winner =
    candidates.length === 1 ? candidates[0] : resolveTie(session, candidates);
  const profile = profiles.find((item) => item.id === winner);
  if (!profile) throw new Error("Perfil final inválido.");
  return profile;
}
