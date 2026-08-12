import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme, getPreferredTheme, type Theme } from "../lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  // Start undefined so we render nothing meaningful until mounted — the
  // no-flash script already set the right class on <html> before hydration,
  // we just need to mirror it into React state.
  const [theme, setTheme] = useState<Theme | null>(null);

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
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}
