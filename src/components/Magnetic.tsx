import type { ReactNode } from "react";
import { useMagnetic } from "../hooks/use-magnetic";
import { cn } from "../lib/utils";

/**
 * Wraps any content in a magnetic layer that follows the pointer gently.
 * Keeps its own transform separate from hover transitions on children.
 */
export function Magnetic({
  children,
  className,
  strength = 0.08,
  max = 10,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
  as?: "div" | "span";
}) {
  const ref = useMagnetic<HTMLDivElement>(strength, max);
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={cn(as === "span" ? "inline-block" : "h-full", "will-change-transform", className)}
    >
      {children}
    </Tag>
  );
}
