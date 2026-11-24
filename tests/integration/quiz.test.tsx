// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { App } from "../../src/App";
import { questions } from "../../src/data/questions";

afterEach(cleanup);

function start() {
  render(<App />);
  fireEvent.change(screen.getByRole("textbox", { name: "Seu nickname" }), {
    target: { value: "Fênix" },
  });
  fireEvent.click(screen.getByRole("button", { name: "START" }));
}

it("inicia na pergunta oficial, bloqueia avanço e preserva resposta e ordem ao voltar", () => {
  start();
  expect(
    screen.getByRole("heading", { name: questions[0].prompt }),
  ).toHaveFocus();
  const firstOrder = screen
    .getAllByRole("radio")
    .map((radio) => (radio as HTMLInputElement).value);
  expect(firstOrder).toHaveLength(6);
  expect(screen.getByRole("button", { name: /Avançar/ })).toBeDisabled();
  fireEvent.click(screen.getAllByRole("radio")[0]);
  expect(screen.getByRole("button", { name: /Avançar/ })).toBeEnabled();
  expect(screen.getByRole("progressbar")).toHaveAttribute("value", "6");
  fireEvent.click(screen.getByRole("button", { name: /Avançar/ }));
  expect(
    screen.getByRole("heading", { name: questions[1].prompt }),
  ).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: /Voltar/ }));
  expect(
    screen
      .getAllByRole("radio")
      .map((radio) => (radio as HTMLInputElement).value),
  ).toEqual(firstOrder);
  expect(screen.getAllByRole("radio")[0]).toBeChecked();
  fireEvent.click(screen.getAllByRole("radio")[1]);
  expect(screen.getAllByRole("radio")[1]).toBeChecked();
  expect(screen.getAllByRole("radio")[0]).not.toBeChecked();
  expect(screen.getByRole("progressbar")).toHaveAttribute("value", "6");
  expect(
    screen.queryByText(/THE BUILDER|THE BRAIN|THE CREATOR/),
  ).not.toBeInTheDocument();
});

it("percorre as três fases, mostra 100% e conclui sem revelar perfil", () => {
  start();
  for (let index = 0; index < questions.length; index++) {
    expect(
      screen.getByRole("heading", { name: questions[index].prompt }),
    ).toBeVisible();
    fireEvent.click(screen.getAllByRole("radio")[index % 6]);
    fireEvent.click(
      screen.getByRole("button", {
        name: index === 14 ? "Concluir" : /Avançar/,
      }),
    );
    if (index === 4 || index === 9) {
      expect(
        screen.getByRole("heading", { name: /LEVEL 0[12] COMPLETO/ }),
      ).toHaveFocus();
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "value",
        index === 4 ? "33" : "66",
      );
      fireEvent.click(screen.getByRole("button", { name: /Continuar/ }));
    }
  }
  expect(
    screen.getByRole("heading", { name: "15 respostas registradas!" }),
  ).toHaveFocus();
  expect(screen.getByRole("progressbar")).toHaveAttribute("value", "100");
  expect(
    screen.queryByText(/THE BUILDER|THE BRAIN|THE CREATOR/),
  ).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Rever última pergunta" }),
  );
  expect(
    screen.getByRole("heading", { name: questions[14].prompt }),
  ).toBeVisible();
  expect(
    screen
      .getAllByRole("radio")
      .some((radio) => (radio as HTMLInputElement).checked),
  ).toBe(true);
});
