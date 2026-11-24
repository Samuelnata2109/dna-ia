import type { ComponentPropsWithoutRef } from "react";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "default" | "dark";
};

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={["ds-card", className].filter(Boolean).join(" ")}
      data-variant={variant}
    />
  );
}
