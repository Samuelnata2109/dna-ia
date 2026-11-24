// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { App } from "../../src/App";

afterEach(cleanup);

it("apresenta o nome e o curso com estrutura semântica", () => {
  render(<App />);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "DNA:IA", level: 1 }),
  ).toBeVisible();
  expect(
    screen.getByText("Curso Técnico em Inteligência Artificial"),
  ).toBeVisible();
});
