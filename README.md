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

- Update portfolio text, projects, gear, social links, and image paths in `src/data/content.ts`.
- Images intentionally start as layout-stable placeholders. To add a photo, copy it into `public/images/`, then set the matching `heroPortrait`, `aboutPortrait`, project `image`, or gear `image` value in `src/data/content.ts` to a path such as `/images/hero-portrait.jpg`. Keep the component's `aspectRatio` unchanged to preserve the layout.
- Main page composition is in `src/components/PortfolioSite.tsx`.
- Global styles are in `src/app/globals.css`.

Comments and likes are stored in the browser's local storage; they are not shared across browsers or devices. The contact form is a front-end demo and needs a messaging service or API before it can deliver messages.

## Dependencies and Git

Commit `package-lock.json` so installs stay reproducible. `node_modules/` and Next.js build output are intentionally excluded from Git; `npm ci` recreates dependencies from the lockfile. Local `.env*` files are also ignored and should not be committed.
