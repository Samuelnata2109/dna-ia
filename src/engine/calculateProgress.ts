import { levels } from "../data/levels";
import { questions } from "../data/questions";
import type { QuizSession } from "../types/quiz";
import { validateSession } from "./validateSession";

export function calculateProgress(session: QuizSession) {
  validateSession(session);
  const answered = Object.keys(session.answers).length;
  const levelProgress = levels.map((level) => {
    const total = level.lastQuestion - level.firstQuestion + 1;
    const completed = questions.filter(
      (question) =>
        question.levelId === level.id &&
        Object.hasOwn(session.answers, question.id),
    ).length;
    return {
      levelId: level.id,
      answered: completed,
      total,
      complete: completed === total,
    };
  });
  const percent = Math.floor((answered / questions.length) * 100);

  return {
    answered,
    pending: questions.length - answered,
    total: questions.length,
    percent,
    xp: percent,
    complete: answered === questions.length,
    activeLevelId:
      levelProgress.find((level) => !level.complete)?.levelId ?? levels[2].id,
    levels: levelProgress,
  };
}
