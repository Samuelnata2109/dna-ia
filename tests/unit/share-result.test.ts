import { expect, it, vi } from "vitest";
import { profiles } from "../../src/data/profiles";
import {
  shareResult,
  shareMessage,
  QUIZ_URL,
} from "../../src/utils/shareResult";

it("compartilha somente perfil e URL pública após chamada explícita", async () => {
  const share = vi.fn().mockResolvedValue(undefined),
    writeText = vi.fn();
  const profile = {
    ...profiles[3],
    nickname: "SEGREDO",
    answers: { q01: "q01-a" },
    points: 30,
  };
  expect((await shareResult(profile, { share, writeText })).status).toBe(
    "shared",
  );
  expect(share).toHaveBeenCalledWith({
    title: "Meu DNA:IA",
    text: shareMessage(profile),
    url: QUIZ_URL,
  });
  expect(JSON.stringify(share.mock.calls)).not.toMatch(/SEGREDO|q01|points|30/);
  expect(writeText).not.toHaveBeenCalled();
});
it("copia quando Web Share não existe e fornece alternativa manual sem clipboard", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  expect((await shareResult(profiles[0], { writeText })).status).toBe("copied");
  expect(writeText).toHaveBeenCalledWith(expect.stringContaining(QUIZ_URL));
  expect((await shareResult(profiles[0], {})).status).toBe("manual");
  expect(
    (
      await shareResult(profiles[0], {
        writeText: vi.fn().mockRejectedValue(new Error("denied")),
      })
    ).status,
  ).toBe("manual");
});
it("distingue cancelamento de falha real sem copiar após cancelar", async () => {
  const writeText = vi.fn();
  expect(
    (
      await shareResult(profiles[0], {
        share: vi
          .fn()
          .mockRejectedValue(new DOMException("Cancelado", "AbortError")),
        writeText,
      })
    ).status,
  ).toBe("cancelled");
  expect(writeText).not.toHaveBeenCalled();
  expect(
    (
      await shareResult(profiles[0], {
        share: vi.fn().mockRejectedValue(new Error("falhou")),
      })
    ).status,
  ).toBe("manual");
});

it.each(["copied", "manual"] as const)(
  "tenta copiar após falha do Web Share e retorna %s",
  async (status) => {
    const profile = profiles[3];
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException("Sem acesso", "NotAllowedError"));
    const writeText = vi.fn(async () => {
      if (status === "manual") throw new Error("Cópia indisponível");
    });
    const text = `${shareMessage(profile)} ${QUIZ_URL}`;

    await expect(shareResult(profile, { share, writeText })).resolves.toEqual({
      status,
      text,
    });
    expect(share).toHaveBeenCalledBefore(writeText);
    expect(writeText).toHaveBeenCalledExactlyOnceWith(text);
  },
);
