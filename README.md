# Chantikka Revinna Portfolio

Dark, single-page portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check the production build:

```bash
npm run build
```

## Continue editing

- Update portfolio text, projects, links, and other content in `src/data/content.ts`.
- Replace placeholder images in `public/images/` and update their paths in the content data as needed.
- Main page composition is in `src/components/PortfolioSite.tsx`.
- Global styles are in `src/app/globals.css`.

Comments and likes are stored in the browser's local storage; they are not shared across browsers or devices.

## Dependencies and Git

Commit `package-lock.json` so installs stay reproducible. `node_modules/` and Next.js build output are intentionally excluded from Git; `npm ci` recreates dependencies from the lockfile. Local `.env*` files are also ignored and should not be committed.
