/**
 * Single source of truth for the site's canonical domain. Used to build
 * absolute canonical URLs, og:url / og:image tags and the sitemap – so a
 * future domain change only needs to happen here.
 */
export const SITE_URL = "https://www.hyperloopdevelopmentprogram.com";

/** Resolves a site-relative path (e.g. "/faq") to an absolute URL. */
export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

/**
 * Default social-share image (1200×630) used on pages that don't have a
 * more specific image of their own (e.g. a news article photo).
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
