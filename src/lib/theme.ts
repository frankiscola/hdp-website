export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "hdp-theme";

/**
 * Runs synchronously in <head>, before first paint, so the correct theme
 * class is already on <html> when the page renders — no light/dark flash.
 * Keep this in perfect sync with getPreferredTheme() below.
 *
 * Light is always the default on a first visit — deliberately ignoring the
 * OS/browser's prefers-color-scheme, since the site's default identity is
 * the light theme. Dark only applies once the person explicitly picks it
 * with the toggle (and it's then remembered via localStorage).
 */
// Kept in sync with the <meta name="theme-color"> value declared in
// __root.tsx, so the browser chrome (mobile status bar, PWA title bar) never
// shows a mismatched color while the page is interactive.
export const THEME_COLOR = { light: "#fafaf9", dark: "#0e0e16" } as const;

export const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var isDark = stored === "dark";
    var root = document.documentElement;
    if (isDark) root.classList.add("dark");
    // Tell the browser which native UI palette (scrollbars, form controls,
    // date pickers) to use, before first paint — same reasoning as the class
    // above: avoids a mismatched flash between page content and browser chrome.
    root.style.colorScheme = isDark ? "dark" : "light";
    if (isDark) {
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", "${THEME_COLOR.dark}");
    }
  } catch (e) {}
})();
`;

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through to the default.
  }
  return "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLOR[theme]);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore write failures — the toggle still works for this session.
  }
}
