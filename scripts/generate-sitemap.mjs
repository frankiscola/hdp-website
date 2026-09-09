// Regenerates public/sitemap.xml from the static route list below and the
// news articles in src/data/site.ts.
//
// Run manually after adding/removing a page or news article:
//   node scripts/generate-sitemap.mjs
//
// (Not wired into the build automatically — run it by hand when the route
// list or news data changes; see vite.config.ts.)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://www.hyperloopdevelopmentprogram.com";

// Static pages, with relative priority (1.0 = most important) and how often
// they realistically change. Keep this in sync with src/routes/*.tsx.
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about-hdp", priority: "0.8", changefreq: "monthly" },
  { path: "/research", priority: "0.8", changefreq: "monthly" },
  { path: "/thechallenge-hdp", priority: "0.7", changefreq: "monthly" },
  { path: "/hyperloop", priority: "0.8", changefreq: "monthly" },
  { path: "/testing-infrastructure", priority: "0.7", changefreq: "monthly" },
  { path: "/partners", priority: "0.7", changefreq: "monthly" },
  { path: "/news", priority: "0.8", changefreq: "weekly" },
  { path: "/results-and-downloads", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/team-and-board", priority: "0.5", changefreq: "monthly" },
  { path: "/open-positions", priority: "0.5", changefreq: "weekly" },
  { path: "/contact", priority: "0.5", changefreq: "yearly" },
  { path: "/privacy", priority: "0.2", changefreq: "yearly" },
];

function getNewsEntries() {
  const siteDataPath = path.join(__dirname, "../src/data/site.ts");
  const source = readFileSync(siteDataPath, "utf-8");

  // Lightweight extraction (no TS execution needed): pull every
  // `slug: "..."` / `date: "..."` pair from the news array in order.
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const dates = [...source.matchAll(/\n\s{4}date:\s*"([^"]+)"/g)].map((m) => m[1]);

  return slugs.map((slug, i) => ({ slug, date: toIsoDate(dates[i]) }));
}

// Site data stores human-readable dates ("19 June 2025"); sitemap <lastmod>
// requires W3C datetime (YYYY-MM-DD).
function toIsoDate(humanDate) {
  if (!humanDate) return undefined;
  const parsed = new Date(humanDate);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

function urlEntry({ loc, priority, changefreq, lastmod }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function build() {
  const news = getNewsEntries();

  const entries = [
    ...staticPages.map((p) =>
      urlEntry({ loc: `${SITE_URL}${p.path}`, priority: p.priority, changefreq: p.changefreq }),
    ),
    ...news.map((n) =>
      urlEntry({
        loc: `${SITE_URL}/news/${n.slug}`,
        priority: "0.5",
        changefreq: "yearly",
        lastmod: n.date,
      }),
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

  const outPath = path.join(__dirname, "../public/sitemap.xml");
  writeFileSync(outPath, xml, "utf-8");
  console.log(`sitemap.xml generato: ${staticPages.length} pagine + ${news.length} news`);
}

build();
