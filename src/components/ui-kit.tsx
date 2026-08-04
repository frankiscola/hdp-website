import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { useMagnetic } from "../hooks/use-magnetic";

export function ArrowLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.18, 8);

  return (
    <Link
      ref={magneticRef}
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-semibold text-primary-glow transition-colors will-change-transform hover:text-foreground",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function CtaButton({
  to,
  children,
  variant = "solid",
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.3, 14);

  return (
    <span className="inline-block">
      <Link
        ref={magneticRef}
        to={to}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 will-change-transform",
          variant === "solid"
            ? "bg-primary text-primary-foreground hover:glow-ring hover:bg-primary-glow"
            : "surface-glass text-foreground hover:bg-secondary",
        )}
      >
        {children}
      </Link>
    </span>
  );
}


export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}
