// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { App } from "../../src/App";
import { ResultPage } from "../../src/pages/Result/ResultPage";
import { questions } from "../../src/data/questions";
import { SESSION_KEY } from "../../src/storage/sessionStorage";
import { journeyFixture } from "../helpers/journey";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
it("oferece escolha sem sobrescrever e retoma pergunta, respostas e ordem", async () => {
  const saved = journeyFixture();
  localStorage.setItem(SESSION_KEY, JSON.stringify(saved));
  const writes = vi.spyOn(Storage.prototype, "setItem");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Sua jornada está aqui." }),
  ).toHaveFocus();
  expect(writes).not.toHaveBeenCalled();
  expect(screen.queryByText(/THE BUILDER/)).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "CONTINUAR MINHA JORNADA" }),
  );
  await screen.findByRole("heading", { name: questions[2].prompt });
  expect(
    screen.getByRole("heading", { name: questions[2].prompt }),
  ).toHaveFocus();
  expect(
    screen.getAllByRole("radio").map((r) => (r as HTMLInputElement).value),
  ).toEqual(saved.session.optionOrder.q03);
  fireEvent.click(screen.getByRole("button", { name: /Voltar/ }));
  expect(
    (
      screen.getByRole("radio", {
        name: questions[1].options[0].text,
      }) as HTMLInputElement
    ).checked,
  ).toBe(true);
  fireEvent.click(
    screen.getByRole("radio", { name: questions[1].options[1].text }),
  );
  const next = JSON.parse(localStorage.getItem(SESSION_KEY)!);
  expect(Object.keys(next.session.answers)).toHaveLength(2);
  expect(next.session.answers.q02).toBe("q02-b");
  expect(next.session.optionOrder).toEqual(saved.session.optionOrder);
});
it("recupera sessão completa sem repetir animação e pede confirmação para reiniciar", async () => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(journeyFixture(15, true)));
  render(<App />);
  fireEvent.click(
    screen.getByRole("button", { name: "CONTINUAR MINHA JORNADA" }),
  );
  await screen.findByRole("heading", { name: "THE BUILDER" });
  expect(
    screen.queryByRole("button", { name: "Pular animação" }),
  ).not.toBeInTheDocument();
  const restart = screen.getByRole("button", { name: "REFAZER QUIZ" });
  restart.focus();
  fireEvent.click(restart);
  expect(screen.getByRole("dialog")).toBeVisible();
  expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();
  fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
  expect(restart).toHaveFocus();
  expect(localStorage.getItem(SESSION_KEY)).not.toBeNull();
  fireEvent.click(restart);
  fireEvent.click(screen.getByRole("button", { name: "APAGAR E RECOMEÇAR" }));
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
  expect(screen.getByRole("textbox", { name: "Seu nickname" })).toHaveFocus();
  vi.spyOn(Math, "random").mockReturnValue(0.9);
  fireEvent.change(screen.getByRole("textbox", { name: "Seu nickname" }), {
    target: { value: "Nova" },
  });
  fireEvent.click(screen.getByRole("button", { name: "START" }));
  await screen.findByRole("heading", { name: questions[0].prompt });
  expect(
    JSON.parse(localStorage.getItem(SESSION_KEY)!).session.answers,
  ).toEqual({});
  expect(
    JSON.parse(localStorage.getItem(SESSION_KEY)!).session.optionOrder,
  ).not.toEqual(journeyFixture(15, true).session.optionOrder);
});
it("rejeita JSON corrompido e mantém a jornada quando a limpeza falha", () => {
  localStorage.setItem(SESSION_KEY, "{");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /Não foi possível recuperar/ }),
  ).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "COMEÇAR NOVAMENTE" }));
  vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
    throw new Error("denied");
  });
  fireEvent.click(screen.getByRole("button", { name: "APAGAR E RECOMEÇAR" }));
  expect(screen.getByRole("dialog")).toBeVisible();
  expect(screen.getByRole("alert")).toHaveTextContent("não pôde ser apagado");
  expect(localStorage.getItem(SESSION_KEY)).toBe("{");
});
it("continua em memória e informa indisponibilidade sem falhar", async () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("denied");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("quota");
  });
  render(<App />);
  expect(
    screen.getByText(/Não foi possível salvar neste dispositivo/),
  ).toBeVisible();
  fireEvent.change(screen.getByRole("textbox", { name: "Seu nickname" }), {
    target: { value: "Lú" },
  });
  fireEvent.click(screen.getByRole("button", { name: "START" }));
  await screen.findByRole("heading", { name: questions[0].prompt });
  fireEvent.click(screen.getAllByRole("radio")[0]);
  expect(screen.getByRole("button", { name: /Avançar/ })).toBeEnabled();
});
it("oferece mensagem manual acessível se compartilhar falha", async () => {
  vi.stubGlobal("navigator", {
    share: vi.fn().mockRejectedValue(new Error("denied")),
  });
  render(
    <ResultPage
      session={journeyFixture(15, true).session}
      onRestart={() => {}}
      skipReveal
    />,
  );
  fireEvent.click(
    screen.getByRole("button", { name: "COMPARTILHAR RESULTADO" }),
  );
  const text = await screen.findByRole("textbox", { name: "Mensagem pública" });
  expect((text as HTMLTextAreaElement).value).not.toContain("Fênix");
  expect((text as HTMLTextAreaElement).value).toContain(
    "https://samuelnata2109.github.io/dna-ia/",
  );
});
