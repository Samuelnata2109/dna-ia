import { questions } from "../data/questions";
import type { Option, QuizSession } from "../types/quiz";
import { validateNickname } from "../utils/nickname";
import { shuffleOptions } from "./shuffleOptions";
import { validateQuestionBank, validateSession } from "./validateSession";

function findQuestion(questionId: string) {
  const question = questions.find((item) => item.id === questionId);
  if (!question) throw new Error(`Pergunta inexistente: ${questionId}.`);
  return question;
}

export function createSession(
  nicknameInput: string,
  random: () => number = Math.random,
): QuizSession {
  validateQuestionBank();
  if (typeof nicknameInput !== "string") {
    throw new Error("Nickname inválido.");
  }
  const { nickname, error } = validateNickname(nicknameInput);
  if (error) throw new Error(error);

  const optionOrder = Object.fromEntries(
    questions.map((question) => [
      question.id,
      shuffleOptions(question.options, random).map((option) => option.id),
    ]),
  );
  const session: QuizSession = {
    version: 1,
    nickname,
    answers: {},
    optionOrder,
  };
  validateSession(session);
  return session;
}

export function recordAnswer(
  session: QuizSession,
  questionId: string,
  optionId: string,
): QuizSession {
  validateSession(session);
  const question = findQuestion(questionId);
  if (!question.options.some((option) => option.id === optionId)) {
    throw new Error(`Alternativa inválida para ${questionId}: ${optionId}.`);
  }
  return {
    ...session,
    answers: { ...session.answers, [questionId]: optionId },
  };
}

export function removeAnswer(
  session: QuizSession,
  questionId: string,
): QuizSession {
  validateSession(session);
  findQuestion(questionId);
  const answers = { ...session.answers };
  delete answers[questionId];
  return { ...session, answers };
}

export function getAnswer(session: QuizSession, questionId: string) {
  validateSession(session);
  findQuestion(questionId);
  return session.answers[questionId];
}

export function getOptionsInSessionOrder(
  session: QuizSession,
  questionId: string,
): readonly Option[] {
  validateSession(session);
  const question = findQuestion(questionId);
  return session.optionOrder[questionId].map((id) =>
    question.options.find((option) => option.id === id)!,
  );
}

export function getAnsweredQuestionIds(session: QuizSession) {
  validateSession(session);
  return questions
    .filter((question) => Object.hasOwn(session.answers, question.id))
    .map((question) => question.id);
}

export function getPendingQuestionIds(session: QuizSession) {
  validateSession(session);
  return questions
    .filter((question) => !Object.hasOwn(session.answers, question.id))
    .map((question) => question.id);
}

export function isComplete(session: QuizSession) {
  validateSession(session);
  return Object.keys(session.answers).length === questions.length;
}
