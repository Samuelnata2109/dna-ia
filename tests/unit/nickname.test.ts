import { describe, expect, it } from "vitest";
import { nicknameLimit, validateNickname } from "../../src/utils/nickname";

describe("validação do nickname", () => {
  it.each(["", " \t ", "\u00a0\u2003"])(
    "rejeita vazio e espaços: %j",
    (input) => {
      expect(validateNickname(input)).toMatchObject({
        nickname: "",
        length: 0,
        error: expect.any(String),
      });
    },
  );

  it("aceita acentos e remove apenas os espaços das extremidades", () => {
    expect(validateNickname("  Lú da IA  ")).toEqual({
      nickname: "Lú da IA",
      length: 8,
      error: undefined,
    });
  });

  it("mede caracteres percebidos, incluindo acentos combinados e emojis", () => {
    const input = "a\u0301👩🏽‍💻".repeat(nicknameLimit / 2);
    expect(validateNickname(input)).toMatchObject({
      length: nicknameLimit,
      error: undefined,
    });
    expect(validateNickname(input + "é")).toMatchObject({
      length: nicknameLimit + 1,
      error: expect.any(String),
    });
  });
});
