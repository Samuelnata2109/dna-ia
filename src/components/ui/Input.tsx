import { useId } from "react";
import type { ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({
  label,
  hint,
  error,
  id,
  className,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const descriptions = [describedBy, hint && hintId, error && errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="ds-field">
      <label htmlFor={inputId}>{label}</label>
      <input
        {...props}
        id={inputId}
        className={["ds-input", className].filter(Boolean).join(" ")}
        aria-describedby={descriptions || undefined}
        aria-invalid={error ? true : invalid}
      />
      {hint && (
        <p id={hintId} className="ds-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="ds-field__error">
          Atenção: {error}
        </p>
      )}
    </div>
  );
}
