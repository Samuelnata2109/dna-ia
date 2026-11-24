import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "phase-1" | "phase-2" | "accent" | "achievement";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span className="ds-badge" data-tone={tone}>
      {children}
    </span>
  );
}
