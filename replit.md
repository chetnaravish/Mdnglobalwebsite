# MDN Global School — Kaithal

A school website for MDN Global School, Kaithal, Haryana. Built as a pnpm monorepo with a React frontend and an Express API backend.

## Stack

- **Frontend** (`artifacts/mdn-school`): React + Vite + Tailwind CSS + shadcn/ui, routed via Wouter. Pages: Home, About, Academics, Facilities, Events, Gallery, Contact.
- **API Server** (`artifacts/api-server`): Express 5 + Drizzle ORM + PostgreSQL. Served at `/api`.
- **Shared libs** (`lib/`): `api-spec` (OpenAPI + Orval), `api-zod` (Zod schemas), `api-client-react` (React Query hooks), `db` (Drizzle schema + connection).

## How to run

Dependencies are installed with `pnpm install` from the workspace root.

| Service | Command |
|---------|---------|
| Frontend | `pnpm --filter @workspace/mdn-school run dev` |
| API Server | `pnpm --filter @workspace/api-server run dev` |

Both workflows are pre-configured in Replit and start automatically.

## Database

Replit's built-in PostgreSQL is used. `DATABASE_URL` is injected automatically. To push schema changes: `pnpm --filter @workspace/db run push`.

## User Preferences
