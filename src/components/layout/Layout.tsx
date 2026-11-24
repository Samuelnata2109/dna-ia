import type { ComponentPropsWithoutRef } from "react";

type LayoutProps = ComponentPropsWithoutRef<"div">;
type StackProps = LayoutProps & { gap?: "sm" | "md" | "lg" };

export function Container({ className, ...props }: LayoutProps) {
  return (
    <div
      {...props}
      className={["ds-container", className].filter(Boolean).join(" ")}
    />
  );
}

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return (
    <div
      {...props}
      className={["ds-stack", className].filter(Boolean).join(" ")}
      data-gap={gap}
    />
  );
}

export function Grid({ className, ...props }: LayoutProps) {
  return (
    <div
      {...props}
      className={["ds-grid", className].filter(Boolean).join(" ")}
    />
  );
}
