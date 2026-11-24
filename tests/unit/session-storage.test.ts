import { describe, expect, it, vi } from "vitest";
import {
  readJourney,
  saveJourney,
  clearJourney,
  validateJourney,
  SESSION_KEY,
} from "../../src/storage/sessionStorage";
import { journeyFixture } from "../helpers/journey";

function storage() {
  const values = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
  };
}
describe("persistência estrita", () => {
  it("salva e recupera nickname, respostas, ordem e navegação sem dados derivados", () => {
    const target = storage(),
      journey = journeyFixture();
    expect(readJourney(target)).toEqual({ kind: "empty" });
    expect(saveJourney(journey, target)).toBe(true);
    expect(readJourney(target)).toEqual({ kind: "valid", journey });
    expect(
      Object.keys(JSON.parse(target.getItem(SESSION_KEY)!)).sort(),
    ).toEqual(["navigation", "passedMilestones", "session", "storageVersion"]);
    expect(clearJourney(target)).toBe(true);
    expect(target.getItem(SESSION_KEY)).toBeNull();
  });
  it.each([
    "{",
    "null",
    JSON.stringify({ ...journeyFixture(), storageVersion: 2 }),
    JSON.stringify({
      ...journeyFixture(),
      session: { ...journeyFixture().session, nickname: " " },
    }),
    JSON.stringify({
      ...journeyFixture(),
      navigation: { kind: "question", index: 99 },
    }),
    JSON.stringify({ ...journeyFixture(), navigation: { kind: "complete" } }),
    JSON.stringify({ ...journeyFixture(), passedMilestones: 2 }),
  ])("rejeita conteúdo corrompido sem apagar ou sobrescrever: %s", (raw) => {
    const target = storage();
    target.setItem(SESSION_KEY, raw);
    target.setItem.mockClear();
    expect(readJourney(target)).toEqual({ kind: "invalid" });
    expect(target.setItem).not.toHaveBeenCalled();
    expect(target.removeItem).not.toHaveBeenCalled();
  });
  it("valida conclusão, sequência de respostas, IDs e transições", () => {
    expect(() => validateJourney(journeyFixture(15, true))).not.toThrow();
    const j = journeyFixture();
    expect(() =>
      validateJourney({
        ...j,
        session: { ...j.session, answers: { q02: "q02-a" } },
      }),
    ).toThrow();
    expect(() =>
      validateJourney({
        ...j,
        session: { ...j.session, answers: { q01: "q02-a" } },
      }),
    ).toThrow();
    expect(() =>
      validateJourney({
        ...j,
        session: {
          ...j.session,
          optionOrder: { ...j.session.optionOrder, q01: ["q01-a", "q01-a"] },
        },
      }),
    ).toThrow();
    expect(() =>
      validateJourney({
        ...journeyFixture(5),
        passedMilestones: 0,
        navigation: { kind: "level", completed: 0, nextIndex: 5 },
      }),
    ).not.toThrow();
    expect(() =>
      validateJourney({ ...j, navigation: { kind: "question", index: 3 } }),
    ).toThrow();
  });
  it("informa falhas de leitura, gravação e remoção sem afirmar sucesso", () => {
    const fail = () => {
      throw new Error("blocked");
    };
    expect(
      readJourney({ getItem: fail, setItem: fail, removeItem: fail }),
    ).toEqual({ kind: "unavailable" });
    expect(
      saveJourney(journeyFixture(), {
        getItem: fail,
        setItem: fail,
        removeItem: fail,
      }),
    ).toBe(false);
    expect(
      clearJourney({ getItem: fail, setItem: fail, removeItem: fail }),
    ).toBe(false);
    expect(
      clearJourney({
        getItem: () => "not removed",
        setItem: fail,
        removeItem: () => {},
      }),
    ).toBe(false);
  });
});
