# Hyperloop Development Program — website

Marketing and information website for the Hyperloop Development Program (HDP).

## Stack

- [TanStack Start](https://tanstack.com/start) (React, file-based routing, SSR)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript

## Development

Requires Node.js and npm.

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

## Scripts

| Command                    | Description                                          |
| --------------------------- | ----------------------------------------------------- |
| `npm run dev`               | Start the local development server                    |
| `npm run build`              | Production build                                       |
| `npm run preview`            | Preview the production build locally                   |
| `npm run lint`               | Run ESLint                                              |
| `npm run format`             | Format the codebase with Prettier                       |
| `npm run generate:sitemap`   | Regenerate `public/sitemap.xml` from the current routes and news data |

## Deployment

Deployed on [Vercel](https://vercel.com), connected to the `main` branch.
