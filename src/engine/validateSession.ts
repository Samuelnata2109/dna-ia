import { levels } from "../data/levels";
import { profiles } from "../data/profiles";
import { questions } from "../data/questions";
import type { Profile, Question, QuizSession } from "../types/quiz";
import { validateNickname } from "../utils/nickname";

const letters = ["A", "B", "C", "D", "E", "F"] as const;
const profileIds = [
  "builder",
  "detective",
  "brain",
  "creator",
  "maker",
  "guardian",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateQuestionBank(
  questionBank: readonly Question[] = questions,
  profileBank: readonly Profile[] = profiles,
): void {
  if (
    profileBank.length !== profileIds.length ||
    profileBank.some((profile, index) => profile.id !== profileIds[index])
  ) {
    throw new Error(
      "O banco de perfis deve conter os seis IDs oficiais únicos.",
    );
  }

  if (questionBank.length !== 15) {
    throw new Error("O banco deve conter exatamente 15 perguntas.");
  }

  for (const [index, question] of questionBank.entries()) {
    const number = index + 1;
    const level = levels.find(
      (item) => number >= item.firstQuestion && number <= item.lastQuestion,
    );
    if (
      question.number !== number ||
      question.id !== `q${String(number).padStart(2, "0")}` ||
      question.levelId !== level?.id ||
      question.weight !== level?.weight ||
      !question.prompt ||
      !question.imageDescription ||
      question.options.length !== letters.length
    ) {
      throw new Error(`Dados inconsistentes na pergunta ${number}.`);
    }

    for (const [optionIndex, option] of question.options.entries()) {
      const letter = letters[optionIndex];
      if (
        option.letter !== letter ||
        option.id !== `${question.id}-${letter.toLowerCase()}` ||
        option.profileId !== profileIds[optionIndex] ||
        !option.text
      ) {
        throw new Error(`Alternativa inválida na pergunta ${number}.`);
      }
    }
  }
}

export function validateSession(
  value: unknown,
  requireComplete = false,
): asserts value is QuizSession {
  if (!isRecord(value)) throw new Error("Sessão inválida.");
  if (
    Object.keys(value).sort().join(",") !==
    "answers,nickname,optionOrder,version"
  ) {
    throw new Error("Estrutura da sessão inválida.");
  }
  if (value.version !== 1) throw new Error("Versão da sessão inválida.");
  if (typeof value.nickname !== "string") {
    throw new Error("Nickname inválido.");
  }
  const nickname = validateNickname(value.nickname);
  if (nickname.error || nickname.nickname !== value.nickname) {
    throw new Error("Nickname inválido.");
  }
  if (!isRecord(value.answers) || !isRecord(value.optionOrder)) {
    throw new Error("Respostas ou ordem das alternativas inválidas.");
  }

  const orderKeys = Object.keys(value.optionOrder);
  if (
    orderKeys.length !== questions.length ||
    orderKeys.some((id) => !questions.some((question) => question.id === id))
  ) {
    throw new Error("Ordem das alternativas incompleta ou desconhecida.");
  }

  for (const question of questions) {
    const order = value.optionOrder[question.id];
    const expected = new Set<string>(
      question.options.map((option) => option.id),
    );
    if (
      !Array.isArray(order) ||
      order.length !== expected.size ||
      new Set(order).size !== expected.size ||
      order.some((id) => typeof id !== "string" || !expected.has(id))
    ) {
      throw new Error(`Ordem das alternativas inválida: ${question.id}.`);
    }
  }

  for (const [questionId, optionId] of Object.entries(value.answers)) {
    const question = questions.find((item) => item.id === questionId);
    if (
      !question ||
      typeof optionId !== "string" ||
      !question.options.some((option) => option.id === optionId)
    ) {
      throw new Error(`Resposta inválida: ${questionId}.`);
    }
  }

  if (
    requireComplete &&
    Object.keys(value.answers).length !== questions.length
  ) {
    throw new Error(
      "As 15 perguntas devem ser respondidas antes do resultado.",
    );
  }
}
