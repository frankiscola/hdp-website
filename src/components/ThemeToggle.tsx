import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { applyTheme, getPreferredTheme, type Theme } from "../lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  // Start undefined so we render nothing meaningful until mounted — the
  // no-flash script already set the right class on <html> before hydration,
  // we just need to mirror it into React state.
  const [theme, setTheme] = useState<Theme | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, []);

  if (!theme) {
    // Reserve the space so the header doesn't shift once mounted.
    return <span className={className} aria-hidden="true" style={{ width: 40, height: 40 }} />;
  }

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {reduce ? (
        theme === "dark" ? (
          <Sun className="h-[18px] w-[18px]" />
        ) : (
          <Moon className="h-[18px] w-[18px]" />
        )
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className="flex items-center justify-center"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
