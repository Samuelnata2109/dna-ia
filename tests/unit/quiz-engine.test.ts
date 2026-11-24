import { describe, expect, it } from "vitest";
import { profiles } from "../../src/data/profiles";
import { questions } from "../../src/data/questions";
import { calculateProgress } from "../../src/engine/calculateProgress";
import { calculateScores, getFinalResult } from "../../src/engine/scoring";
import {
  createSession,
  getAnswer,
  getAnsweredQuestionIds,
  getOptionsInSessionOrder,
  getPendingQuestionIds,
  isComplete,
  recordAnswer,
  removeAnswer,
} from "../../src/engine/session";
import { shuffleOptions } from "../../src/engine/shuffleOptions";
import { validateSession } from "../../src/engine/validateSession";
import type { ProfileId, QuizSession } from "../../src/types/quiz";

function answerWithProfiles(ids: readonly ProfileId[], random = () => 0.5) {
  return questions.reduce(
    (session, question, index) => {
      const option = question.options.find(
        (item) => item.profileId === ids[index],
      )!;
      return recordAnswer(session, question.id, option.id);
    },
    createSession("  Lú  ", random),
  );
}

function fillWith(profileId: ProfileId) {
  return answerWithProfiles(questions.map(() => profileId));
}

describe("sessão e embaralhamento", () => {
  it("normaliza o nickname e embaralha uma única vez por sessão", () => {
    const first = createSession("  Fênix 🧩  ", () => 0);
    const second = createSession("  Fênix 🧩  ", () => 0);
    expect(first.nickname).toBe("Fênix 🧩");
    expect(first.optionOrder).toEqual(second.optionOrder);
    expect(first.optionOrder.q01).not.toEqual(
      questions[0].options.map((option) => option.id),
    );
    const answered = recordAnswer(first, "q01", "q01-a");
    expect(answered.optionOrder).toBe(first.optionOrder);
    expect(
      getOptionsInSessionOrder(answered, "q01").map((option) => option.id),
    ).toEqual(first.optionOrder.q01);
    expect(
      getOptionsInSessionOrder(answered, "q01").find(
        (option) => option.id === "q01-a",
      )?.profileId,
    ).toBe("builder");
    expect(first.answers).toEqual({});
  });

  it("usa Fisher-Yates sem alterar a origem e rejeita fonte aleatória inválida", () => {
    const source = ["A", "B", "C", "D", "E", "F"];
    expect(shuffleOptions(source, () => 0)).toEqual([
      "B",
      "C",
      "D",
      "E",
      "F",
      "A",
    ]);
    expect(source).toEqual(["A", "B", "C", "D", "E", "F"]);
    expect(() => shuffleOptions(source, () => 1)).toThrow(RangeError);
    expect(() => shuffleOptions(source, () => Number.NaN)).toThrow(RangeError);
  });

  it("registra, substitui, recupera e remove respostas sem acumular pontos", () => {
    const initial = createSession("Lú");
    const first = recordAnswer(initial, "q01", "q01-a");
    const changed = recordAnswer(first, "q01", "q01-f");
    expect(getAnswer(first, "q01")).toBe("q01-a");
    expect(getAnswer(changed, "q01")).toBe("q01-f");
    expect(calculateScores(changed)).toMatchObject({ builder: 0, guardian: 1 });
    expect(getAnsweredQuestionIds(changed)).toEqual(["q01"]);
    expect(getPendingQuestionIds(changed)).toHaveLength(14);
    expect(removeAnswer(changed, "q01").answers).toEqual({});
  });

  it("preserva a sequência oficial das perguntas e as associações apesar do sorteio", () => {
    const session = createSession("Lú", () => 0);
    expect(questions.map((question) => question.id)).toEqual(
      Array.from(
        { length: 15 },
        (_, index) => `q${String(index + 1).padStart(2, "0")}`,
      ),
    );
    for (const question of questions) {
      const shuffled = getOptionsInSessionOrder(session, question.id);
      expect(new Set(shuffled.map((option) => option.id))).toEqual(
        new Set(question.options.map((option) => option.id)),
      );
      for (const option of shuffled) {
        expect(option.profileId).toBe(
          question.options.find((item) => item.id === option.id)?.profileId,
        );
      }
    }
  });
});

describe("progresso e pontuação", () => {
  it("aplica pesos 1, 2 e 3 e contabiliza exatamente 30 pontos", () => {
    let session = createSession("Lú");
    for (const id of ["q01", "q06", "q11"]) {
      session = recordAnswer(session, id, `${id}-a`);
    }
    expect(calculateScores(session).builder).toBe(6);
    for (const profile of profiles) {
      const complete = fillWith(profile.id);
      const scores = calculateScores(complete);
      expect(Object.values(scores).reduce((sum, score) => sum + score, 0)).toBe(
        30,
      );
      expect(scores[profile.id]).toBe(30);
      expect(getFinalResult(complete).id).toBe(profile.id);
    }
  });

  it("mede respostas, fases e XP apenas como progresso de 0 a 100%", () => {
    let session = createSession("Lú");
    expect(calculateProgress(session)).toMatchObject({
      answered: 0,
      pending: 15,
      percent: 0,
      xp: 0,
      complete: false,
      activeLevelId: "level-01",
    });
    for (const question of questions) {
      session = recordAnswer(session, question.id, question.options[0].id);
      if ([5, 10, 15].includes(question.number)) {
        const progress = calculateProgress(session);
        expect(progress.percent).toBe([33, 66, 100][question.number / 5 - 1]);
        expect(progress.xp).toBe(progress.percent);
        expect(progress.levels[question.number / 5 - 1].complete).toBe(true);
      }
    }
    expect(isComplete(session)).toBe(true);
    expect(calculateProgress(session)).toMatchObject({
      answered: 15,
      pending: 0,
      percent: 100,
      complete: true,
    });
  });

  it("desempata primeiro pela terceira fase, mesmo se a última resposta favorecer outro perfil", () => {
    const ids: ProfileId[] = [
      "builder",
      "creator",
      "creator",
      "creator",
      "creator",
      "builder",
      "creator",
      "detective",
      "detective",
      "detective",
      "builder",
      "builder",
      "builder",
      "detective",
      "detective",
    ];
    const session = answerWithProfiles(ids);
    expect(calculateScores(session)).toMatchObject({
      builder: 12,
      detective: 12,
      creator: 6,
    });
    expect(getFinalResult(session).id).toBe("builder");
  });

  it("desempata pela primeira resposta do grupo encontrada de q15 para q01", () => {
    const ids: ProfileId[] = [
      "detective",
      "detective",
      "creator",
      "creator",
      "creator",
      "builder",
      "builder",
      "builder",
      "detective",
      "detective",
      "builder",
      "detective",
      "builder",
      "detective",
      "creator",
    ];
    const session = answerWithProfiles(ids);
    expect(calculateScores(session)).toMatchObject({
      builder: 12,
      detective: 12,
      creator: 6,
    });
    expect(getFinalResult(session).id).toBe("detective");
  });

  it("produz o mesmo resultado para respostas iguais com ordens sorteadas diferentes", () => {
    const ids = questions.map(
      (question) => profiles[question.number % profiles.length].id,
    );
    const first = answerWithProfiles(ids, () => 0);
    const second = answerWithProfiles(ids, () => 0.999);
    expect(first.optionOrder).not.toEqual(second.optionOrder);
    expect(calculateScores(first)).toEqual(calculateScores(second));
    expect(getFinalResult(first)).toEqual(getFinalResult(second));
  });
});

describe("rejeição explícita de dados inválidos", () => {
  it("não entrega resultado para sessão incompleta ou nickname inválido", () => {
    expect(() => getFinalResult(createSession("Lú"))).toThrow(/15 perguntas/);
    expect(() => createSession("   ")).toThrow();
    expect(() => createSession("A".repeat(25))).toThrow();
    const complete = fillWith("builder");
    expect(() => getFinalResult({ ...complete, nickname: "  Lú " })).toThrow(
      /Nickname/,
    );
  });

  it("rejeita pergunta, alternativa e associação inexistentes", () => {
    const session = createSession("Lú");
    expect(() => recordAnswer(session, "q99", "q99-a")).toThrow();
    expect(() => recordAnswer(session, "q01", "nonsense")).toThrow();
    expect(() => recordAnswer(session, "q01", "q02-a")).toThrow();
    expect(() => removeAnswer(session, "q99")).toThrow();
    expect(() => getAnswer(session, "q99")).toThrow();
  });

  it("rejeita ordem duplicada, incompleta ou inconsistente", () => {
    const session = createSession("Lú");
    const duplicated: QuizSession = {
      ...session,
      optionOrder: { ...session.optionOrder, q01: Array(6).fill("q01-a") },
    };
    const missing: QuizSession = {
      ...session,
      optionOrder: Object.fromEntries(
        Object.entries(session.optionOrder).filter(([id]) => id !== "q15"),
      ),
    };
    const wrong: QuizSession = {
      ...session,
      optionOrder: {
        ...session.optionOrder,
        q01: ["q02-a", ...session.optionOrder.q01.slice(1)],
      },
    };
    for (const invalid of [duplicated, missing, wrong]) {
      expect(() => validateSession(invalid)).toThrow();
      expect(() => calculateProgress(invalid)).toThrow();
      expect(() => getFinalResult(invalid)).toThrow();
    }
  });

  it("rejeita respostas adulteradas e versões incompatíveis", () => {
    const session = createSession("Lú");
    for (const invalid of [
      { ...session, answers: { q99: "q99-a" } },
      { ...session, answers: { q01: "q02-a" } },
      { ...session, answers: { q01: "fake" } },
      { ...session, version: 2 },
    ]) {
      expect(() => validateSession(invalid)).toThrow();
    }
  });
});
