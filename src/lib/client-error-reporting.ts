/**
 * Lightweight client-side error reporting. Logs a structured error to the
 * console; swap the body of `reportClientError` for a real error-tracking
 * service (Sentry, etc.) if/when one is added.
 */
export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  console.error("[client error]", {
    message,
    stack,
    route: window.location.pathname,
    ...context,
  });
}
