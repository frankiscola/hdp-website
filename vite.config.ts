import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig(({ command, mode }) => {
  const isDevBuild = command === "build" && mode === "development";

  return {
    css: { transformer: "lightningcss" },
    server: {
      host: "::",
      port: 8080,
    },
    resolve: {
      alias: { "@": srcDir },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    ...(isDevBuild
      ? {
          environments: {
            client: { define: { "process.env.NODE_ENV": JSON.stringify("development") } },
          },
          esbuild: { keepNames: true },
        }
      : {}),
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        server: { entry: "server" },
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
      }),
      // Nitro packages the server output; only needed for production builds.
      // Preset is explicit — this project deploys to Vercel.
      ...(command === "build"
        ? [
            nitro({
              preset: "vercel",
              routeRules: {
                // Vite fingerprints these filenames on every build (content
                // hash in the name), so a permanent, immutable cache is
                // safe — a changed file always gets a new URL.
                "/assets/**": {
                  headers: { "cache-control": "public, max-age=31536000, immutable" },
                },
                // Static files in public/ keep a fixed filename across
                // deploys, so cache for a day and let the CDN/browser
                // revalidate rather than marking them immutable.
                "/og/**": {
                  headers: { "cache-control": "public, max-age=86400, must-revalidate" },
                },
                "/favicon*.png": {
                  headers: { "cache-control": "public, max-age=86400, must-revalidate" },
                },
                "/apple-touch-icon.png": {
                  headers: { "cache-control": "public, max-age=86400, must-revalidate" },
                },
              },
            }),
          ]
        : []),
      viteReact(),
    ],
  };
});
