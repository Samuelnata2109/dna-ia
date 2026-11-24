// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { App } from "../../src/App";

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", window.location.pathname);
});

it("demonstra as ações e os estados de formulário e progresso", () => {
  window.history.replaceState(null, "", "#design-system");
  render(<App />);
  const region = screen.getByRole("region", {
    name: "Componentes de interface",
  });
  const status = within(region).getByRole("status");
  fireEvent.click(within(region).getByRole("button", { name: "Testar ação" }));
  expect(status).toHaveTextContent("Ação registrada na demonstração.");
  fireEvent.click(within(region).getByRole("button", { name: "Limpar teste" }));
  expect(status).toHaveTextContent("Experimente os botões");
  expect(
    within(region).getByRole("textbox", { name: "Exemplo de validação" }),
  ).toBeInvalid();

  const progress = screen.getByRole("region", { name: "Progressão" });
  expect(within(progress).getAllByRole("progressbar")).toHaveLength(3);
  expect(
    within(progress).getByRole("progressbar", { name: "Identity" }),
  ).toHaveAttribute("aria-valuetext", "Completo, 100%");
});
