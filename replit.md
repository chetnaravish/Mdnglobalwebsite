# MDN Global School Kaithal — Project Overview

A pnpm monorepo for the MDN Global School website (Kaithal, Haryana). CBSE-affiliated school with a React/Vite frontend and an Express API server.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion, Wouter, shadcn/ui |
| API Server | Express 5, Pino (structured logging), esbuild |
| Database | PostgreSQL via Drizzle ORM (`lib/db`) |
| Monorepo | pnpm workspaces |

## Artifacts

| Artifact | Path | Preview |
|----------|------|---------|
| School website | `artifacts/mdn-school` | `/` |
| API server | `artifacts/api-server` | `/api` |
| Mockup sandbox | `artifacts/mockup-sandbox` | `/__mockup` |

## Shared Libraries (`lib/`)

- `lib/api-spec` — OpenAPI spec + Orval codegen config
- `lib/api-client-react` — Generated React Query hooks for the API
- `lib/api-zod` — Generated Zod schemas from the OpenAPI spec
- `lib/db` — Drizzle ORM setup + schema (requires `DATABASE_URL`)

## Running the project

Dependencies are managed by pnpm. To install:
```
pnpm install
```

Workflows are pre-configured and start automatically:
- **`artifacts/mdn-school: web`** — Vite dev server for the school website
- **`artifacts/api-server: API Server`** — Express API (build + start)
- **`artifacts/mockup-sandbox: Component Preview Server`** — Vite for component previews

## Environment variables

| Variable | Required by | Notes |
|----------|-------------|-------|
| `DATABASE_URL` | `lib/db`, `artifacts/api-server` | PostgreSQL connection string. Required if the API server uses database routes. |
| `SESSION_SECRET` | (reserved) | Secret for session management |
| `PORT` | All artifact servers | Set automatically by Replit per artifact |

## Website pages

Home · About · Academics · Facilities · Events · Gallery · Contact

## User preferences
