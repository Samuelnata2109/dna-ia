import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { levels } from "../../src/data/levels";
import { profiles } from "../../src/data/profiles";
import { questions } from "../../src/data/questions";
import { validateQuestionBank } from "../../src/engine/validateSession";

const prompt = readFileSync(
  new URL("../../docs/PROMPT_MESTRE.md", import.meta.url),
  "utf8",
).replace(/\r\n/g, "\n");

function officialSection(start: number, end: number) {
  return prompt.slice(
    prompt.indexOf(`# ${start}.`),
    prompt.indexOf(`# ${end}.`),
  );
}

describe("banco oficial de dados", () => {
  it("contém 15 perguntas, seis alternativas por pergunta e seis perfis com IDs únicos", () => {
    expect(questions).toHaveLength(15);
    expect(profiles).toHaveLength(6);
    expect(new Set(questions.map((question) => question.id)).size).toBe(15);
    expect(new Set(profiles.map((profile) => profile.id)).size).toBe(6);
    expect(questions.every((question) => question.options.length === 6)).toBe(
      true,
    );
    expect(
      new Set(
        questions.flatMap((question) =>
          question.options.map((option) => option.id),
        ),
      ).size,
    ).toBe(90);
    expect(() => validateQuestionBank()).not.toThrow();
  });

  it("preserva integralmente enunciados, alternativas e descrições de imagem da seção 10", () => {
    const source = officialSection(10, 11);
    const markers = [...source.matchAll(/^### QUEST (\d{2})$/gm)];
    expect(markers).toHaveLength(15);
    markers.forEach((match, index) => {
      const body = source.slice(
        match.index! + match[0].length,
        markers[index + 1]?.index ?? source.length,
      );
      const text = body
        .split("\n")
        .map((line) => line.trim())
        .find(Boolean);
      const options = [...body.matchAll(/^([A-F])\. (.+)$/gm)];
      const image = body.match(/^Imagem: (.+)$/m)?.[1];
      const question = questions[index];
      expect(question.id).toBe(`q${match[1]}`);
      expect(question.number).toBe(index + 1);
      expect(question.prompt).toBe(text);
      expect(question.imageDescription).toBe(image);
      expect(question.levelId).toBe(levels[Math.floor(index / 5)].id);
      expect(question.weight).toBe(levels[Math.floor(index / 5)].weight);
      expect(options).toHaveLength(6);
      options.forEach((option, optionIndex) => {
        expect(question.options[optionIndex]).toEqual({
          id: `${question.id}-${option[1].toLowerCase()}`,
          letter: option[1],
          text: option[2],
          profileId: profiles[optionIndex].id,
        });
      });
    });
  });

  it("preserva codinomes, profissões, descrições e listas da seção 11", () => {
    const source = officialSection(11, 12);
    const markers = [...source.matchAll(/^## PERFIL (\d{2}) — (THE .+)$/gm)];
    expect(markers).toHaveLength(6);
    markers.forEach((match, index) => {
      const body = source.slice(
        match.index! + match[0].length,
        markers[index + 1]?.index ?? source.length,
      );
      const professionalName = body.match(/^\*\*(.+)\*\*$/m)?.[1];
      const description = body.match(/^Descrição:\n\n(.+)$/m)?.[1];
      const group = (label: string) => {
        const from = body.indexOf(`${label}:`);
        const remainder = body.slice(from + label.length + 1);
        return [...remainder.matchAll(/^- (.+)$/gm)]
          .map((item) => item[1])
          .slice(0, label === "Características" ? 5 : 4);
      };
      expect(profiles[index]).toEqual({
        id: profiles[index].id,
        codename: match[2],
        professionalName,
        description,
        traits: group("Características"),
        projectExamples: group("Exemplos de projetos"),
        graphicIdentity: group("Identidade gráfica"),
      });
    });
  });

  it("rejeita IDs duplicados no catálogo", () => {
    expect(() =>
      validateQuestionBank([questions[0], questions[0], ...questions.slice(2)]),
    ).toThrow();
    expect(() =>
      validateQuestionBank(questions, [
        profiles[0],
        profiles[0],
        ...profiles.slice(2),
      ]),
    ).toThrow();
    const duplicateOption = {
      ...questions[0],
      options: [
        questions[0].options[0],
        questions[0].options[0],
        ...questions[0].options.slice(2),
      ],
    };
    expect(() =>
      validateQuestionBank([duplicateOption, ...questions.slice(1)]),
    ).toThrow();
  });
});
