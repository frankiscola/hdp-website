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
export const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (stored === "dark") document.documentElement.classList.add("dark");
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
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore write failures — the toggle still works for this session.
  }
}
