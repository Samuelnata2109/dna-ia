// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { App } from "../../src/App";
import { NicknameForm } from "../../src/pages/Welcome/NicknameForm";

afterEach(cleanup);

it("apresenta a experiência e inicia com START desabilitado", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "DNA:IA", level: 1 }),
  ).toBeVisible();
  expect(
    screen.getByText("Desbloqueie sua identidade tecnológica."),
  ).toBeVisible();
  expect(screen.getByText("EEEP Guiomar Belchior Aguiar")).toBeVisible();
  expect(
    screen.getByText("Curso Técnico em Inteligência Artificial"),
  ).toBeVisible();
  expect(screen.getByText("15")).toBeVisible();
  expect(screen.getByText("3")).toBeVisible();
  expect(screen.getByRole("button", { name: "START" })).toBeDisabled();
});

it("anuncia espaços e excesso de caracteres e habilita START com nickname válido", async () => {
  render(<App />);
  const field = screen.getByRole("textbox", { name: "Seu nickname" });
  const start = screen.getByRole("button", { name: "START" });
  fireEvent.change(field, { target: { value: "   " } });
  fireEvent.blur(field);
  expect(start).toBeDisabled();
  expect(field).toBeInvalid();
  expect(field).toHaveAccessibleDescription(/Escolha um nickname/);

  fireEvent.change(field, { target: { value: "ú".repeat(25) } });
  expect(start).toBeDisabled();
  expect(screen.getByRole("status", { name: "" })).toHaveTextContent(
    "Use até 24 caracteres",
  );

  fireEvent.change(field, { target: { value: "  Lú 🧩  " } });
  expect(field).not.toBeInvalid();
  expect(start).toBeEnabled();
  fireEvent.click(start);
  const question = await screen.findByText(
    /Se você pudesse/,
    {},
    { timeout: 5000 },
  );
  expect(question).toHaveFocus();
  expect(screen.getByText("Lú 🧩")).toBeVisible();
  expect(screen.getAllByRole("radio")).toHaveLength(6);
  expect(
    screen.queryByRole("button", { name: "START" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Avançar/ })).toBeDisabled();
});

it("envia texto literal e ignora submissões repetidas do mesmo formulário", () => {
  const onStart = vi.fn();
  render(<NicknameForm initialNickname="" onStart={onStart} />);
  const field = screen.getByRole("textbox", { name: "Seu nickname" });
  const form = field.closest("form")!;
  fireEvent.submit(form);
  expect(onStart).not.toHaveBeenCalled();
  fireEvent.change(field, { target: { value: "  <b>Lú</b>  " } });
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(onStart).toHaveBeenCalledTimes(1);
  expect(onStart).toHaveBeenCalledWith("<b>Lú</b>");
});
