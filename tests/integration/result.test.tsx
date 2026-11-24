// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ResultPage } from "../../src/pages/Result/ResultPage";
import { createSession, recordAnswer } from "../../src/engine/session";
import { getFinalResult } from "../../src/engine/scoring";
import { questions } from "../../src/data/questions";
import { profiles } from "../../src/data/profiles";
import type { ProfileId } from "../../src/types/quiz";

function completed(id: ProfileId) {
  return questions.reduce(
    (session, question) =>
      recordAnswer(
        session,
        question.id,
        question.options.find((o) => o.profileId === id)!.id,
      ),
    createSession("<b>Fênix</b>"),
  );
}
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});
for (const profile of profiles) {
  it(`revela ${profile.codename} pelo motor e preserva todos os textos oficiais`, () => {
    const session = completed(profile.id);
    render(<ResultPage session={session} />);
    expect(screen.queryByText(profile.codename)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Pular animação" }));
    expect(getFinalResult(session).id).toBe(profile.id);
    expect(
      screen.getByRole("heading", { name: profile.codename }),
    ).toHaveFocus();
    expect(screen.getByText(profile.description)).toBeVisible();
    for (const text of [...profile.traits, ...profile.projectExamples])
      expect(screen.getByText(text)).toBeVisible();
    expect(screen.getByText(/Parabéns,/)).toHaveTextContent(
      `<b>Fênix</b>, você tem todas as características de um ${profile.professionalName}.`,
    );
    expect(document.querySelector("b")).toBeNull();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining(`the-${profile.id}.webp`),
    );
    expect(
      screen.getByText(
        "Este resultado é uma descoberta recreativa baseada nos seus interesses e escolhas.",
      ),
    ).toBeVisible();
  });
}
it("rejeita sessões incompletas e corrompidas antes de revelar", () => {
  expect(() => render(<ResultPage session={createSession("Lú")} />)).toThrow();
  expect(() =>
    render(<ResultPage session={{ ...completed("builder"), nickname: " " }} />),
  ).toThrow();
  expect(() =>
    render(
      <ResultPage
        session={{ ...completed("builder"), answers: { q01: "inexistente" } }}
      />,
    ),
  ).toThrow();
});
it("conclui a sequência curta e remove os timers ao desmontar", () => {
  vi.useFakeTimers();
  const view = render(<ResultPage session={completed("maker")} />);
  act(() => {
    vi.advanceTimersByTime(750);
  });
  expect(screen.getByRole("status")).toHaveTextContent("PROCESSANDO PERFIL");
  act(() => {
    vi.advanceTimersByTime(750);
  });
  expect(screen.getByRole("status")).toHaveTextContent(
    "IDENTIDADE DESBLOQUEADA",
  );
  act(() => {
    vi.advanceTimersByTime(750);
  });
  expect(screen.getByRole("heading", { name: "THE MAKER" })).toHaveFocus();
  view.unmount();
  const schedule = vi.spyOn(window, "setTimeout");
  const cancel = vi.spyOn(window, "clearTimeout");
  const pending = render(<ResultPage session={completed("maker")} />);
  const timerIndex = schedule.mock.calls.findIndex((call) => call[1] === 750);
  expect(timerIndex).toBeGreaterThanOrEqual(0);
  const timer = schedule.mock.results[timerIndex].value;
  pending.unmount();
  expect(cancel).toHaveBeenCalledWith(timer);
});
it("revela diretamente quando movimento reduzido está ativo", () => {
  vi.mocked(window.matchMedia).mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
  render(<ResultPage session={completed("guardian")} />);
  expect(screen.getByRole("heading", { name: "THE GUARDIAN" })).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "Pular animação" }),
  ).not.toBeInTheDocument();
});
