import { useId } from "react";

type ProgressBarProps = {
  label: string;
  value: number;
  phase?: 1 | 2 | 3;
};

export function ProgressBar({ label, value, phase = 1 }: ProgressBarProps) {
  const id = useId();
  const percentage = Number.isFinite(value)
    ? Math.floor(Math.min(100, Math.max(0, value)))
    : 0;
  const complete = Number.isFinite(value) && value >= 100;

  return (
    <div className="ds-progress" data-phase={phase} data-complete={complete}>
      <div className="ds-progress__header">
        <label id={id} htmlFor={`${id}-value`}>
          {label}
        </label>
        <span aria-hidden="true" className="ds-progress__number">
          {complete ? "Completo · " : ""}
          {percentage}%
        </span>
      </div>
      <progress
        id={`${id}-value`}
        aria-labelledby={id}
        aria-valuetext={complete ? "Completo, 100%" : `${percentage}%`}
        max={100}
        value={percentage}
      />
    </div>
  );
}
