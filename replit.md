# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### AcedCases (`artifacts/acedcases`)
React + Vite web app — case competition deck library with Midnight Professional theme (navy `#0A1128`, electric blue `#3B82F6`, bright cyan `#06B6D4`). Frontend-only (no backend).

- **Routes**: `/` (Home), `/library` (filterable deck list), `/viewer/:id` (PDF-style canvas viewer with non-downloadable demo slides), `/about`
- **Routing**: wouter, base = `import.meta.env.BASE_URL.replace(/\/$/, "")`
- **Fonts**: Poppins (headings) + Inter (body), loaded via Google Fonts in `index.html`
- **Data**: 10 hardcoded deck records in `src/data/decks.ts`
- **Viewer**: Canvas-rendered demo slides (15 pages per deck) — disables right-click, Ctrl+S, Ctrl+P; supports prev/next + zoom + arrow-key navigation
- **Components**: `Navbar`, `Footer`, `DeckCard` in `src/components/`
