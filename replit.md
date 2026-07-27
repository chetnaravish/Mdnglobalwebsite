# MDN Global School Kaithal

A school website for MDN Global School Kaithal (CBSE affiliated, Kaithal, Haryana). Built as a pnpm monorepo with a React/Vite frontend, an Express API server, and a PostgreSQL database via Drizzle ORM.

## Project Structure

```
artifacts/
  mdn-school/       # React + Vite frontend (serves at /)
  api-server/       # Express API server (serves at /api)
  mockup-sandbox/   # Design canvas / component preview (serves at /__mockup)
lib/
  db/               # Drizzle ORM schema + PostgreSQL pool (DATABASE_URL is auto-provisioned)
  api-client-react/ # Generated API client for the frontend
  api-zod/          # Shared Zod schemas for API validation
  api-spec/         # OpenAPI spec
```

## Running the Project

All three services are managed as workflows and start automatically:

| Workflow | Command | URL |
|---|---|---|
| `artifacts/mdn-school: web` | `pnpm --filter @workspace/mdn-school run dev` | `/` |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | `/api` |
| `artifacts/mockup-sandbox: Component Preview Server` | `pnpm --filter @workspace/mockup-sandbox run dev` | `/__mockup` |

## Stack

- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui, Wouter (routing), TanStack Query
- **Backend**: Express 5, TypeScript, Pino (logging)
- **Database**: PostgreSQL via Drizzle ORM (`lib/db/`) — `DATABASE_URL` is runtime-managed by Replit
- **Package manager**: pnpm workspaces

## Database

The database schema lives in `lib/db/src/schema/index.ts`. It is currently empty — add Drizzle table definitions there and run `pnpm --filter @workspace/db push` to apply them.

`DATABASE_URL` is automatically provided by Replit — do not set it manually.

## User Preferences

- Keep the existing monorepo structure (pnpm workspaces, `artifacts/`, `lib/`)
