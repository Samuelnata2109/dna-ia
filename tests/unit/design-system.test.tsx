// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { ProgressBar } from "../../src/components/ui/ProgressBar";

afterEach(cleanup);

it("usa um botão nativo com tipo seguro, variantes e estado desabilitado", () => {
  const onClick = vi.fn();
  render(
    <Button size="sm" variant="secondary" disabled onClick={onClick}>
      Avançar
    </Button>,
  );
  const button = screen.getByRole("button", { name: "Avançar" });
  expect(button).toHaveAttribute("type", "button");
  expect(button).toHaveAttribute("data-size", "sm");
  expect(button).toHaveAttribute("data-variant", "secondary");
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});

it("associa o rótulo, a ajuda e o erro ao campo e conserva descrições externas", () => {
  const { rerender } = render(
    <>
      <p id="format">Formato do campo</p>
      <Input
        id="code"
        label="Código"
        hint="Informe letras."
        error="Campo obrigatório."
        aria-describedby="format"
      />
    </>,
  );
  const field = screen.getByRole("textbox", { name: "Código" });
  expect(field).toHaveAccessibleDescription(
    "Formato do campo Informe letras. Atenção: Campo obrigatório.",
  );
  expect(field).toBeInvalid();
  rerender(<Input id="code" label="Código" />);
  const updatedField = screen.getByRole("textbox", { name: "Código" });
  expect(updatedField).not.toBeInvalid();
  expect(updatedField).not.toHaveAttribute("aria-describedby");
});

it("limita valores de progresso e sinaliza conclusão com texto", () => {
  const { rerender } = render(
    <ProgressBar label="Identity" value={Infinity} phase={3} />,
  );
  const progress = screen.getByRole("progressbar", { name: "Identity" });
  expect(progress).toHaveAttribute("value", "0");

  rerender(<ProgressBar label="Identity" value={99.9} phase={3} />);
  expect(progress).toHaveAttribute("aria-valuetext", "99%");

  rerender(<ProgressBar label="Identity" value={110} phase={3} />);
  expect(progress).toHaveAttribute("value", "100");
  expect(progress).toHaveAttribute("aria-valuetext", "Completo, 100%");
});
