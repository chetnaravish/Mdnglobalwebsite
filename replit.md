# MDN Global School Kaithal

A school website for MDN Global School Kaithal, Haryana — CBSE affiliated, est. 2000.

## Stack

- **Frontend** (`artifacts/mdn-school`): React + Vite + Tailwind CSS v4, Wouter routing, shadcn/ui components
- **API Server** (`artifacts/api-server`): Express 5 + TypeScript, built with esbuild, logged with pino
- **Database** (`lib/db`): PostgreSQL via Drizzle ORM (Replit managed, `DATABASE_URL` auto-provisioned)
- **Shared libs**: `lib/api-zod` (Zod schemas), `lib/api-client-react` (React Query hooks), `lib/api-spec` (OpenAPI spec + orval codegen)

## Pages

Home, About, Academics, Facilities, Events, Contact

## Running the project

Dependencies are managed with pnpm (monorepo). Install with:

```sh
pnpm install
```

Workflows start automatically:
- **Frontend** (`artifacts/mdn-school: web`): Vite dev server
- **API Server** (`artifacts/api-server: API Server`): builds with esbuild then starts with Node

## Environment variables

- `DATABASE_URL` — automatically provided by Replit (do not set manually)
- `SESSION_SECRET` — already configured as a Replit secret

## User preferences

_None recorded yet._
