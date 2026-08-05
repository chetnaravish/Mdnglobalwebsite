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

### On Replit
All services start automatically as managed workflows.

### Locally
Requires Node 20+ and pnpm (`npm i -g pnpm`).

```bash
# 1. Install dependencies
pnpm install

# 2. Start the API server (runs on http://localhost:3000)
pnpm --filter @workspace/api-server run dev

# 3. In a second terminal, start the frontend (runs on http://localhost:5173)
pnpm --filter @workspace/mdn-school run dev
```

No environment variables are required to run locally — both services have built-in defaults (`PORT` 3000 for API, 5173 for frontend; `BASE_PATH` `/`).

If you want the contact form to work locally, add a `.env` file in `artifacts/api-server/` with:
```
RESEND_API_KEY=your_key_here
```

| Service | Local URL | Replit URL |
|---|---|---|
| Frontend | `http://localhost:5173` | `/` |
| API server | `http://localhost:3000/api` | `/api` |

## Stack

- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui, Wouter (routing), TanStack Query
- **Backend**: Express 5, TypeScript, Pino (logging)
- **Database**: PostgreSQL via Drizzle ORM (`lib/db/`) — `DATABASE_URL` is runtime-managed by Replit
- **Package manager**: pnpm workspaces

## Database

The database schema lives in `lib/db/src/schema/index.ts`. It is currently empty — add Drizzle table definitions there and run `pnpm --filter @workspace/db push` to apply them.

`DATABASE_URL` is automatically provided by Replit — do not set it manually.

## Required Secrets (Replit Secrets Tab)

Jab bhi project nayi Replit ID pe transfer ho, yeh secrets **Secrets tab** mein dobara add karni hain:

| Key | Description |
|---|---|
| `RESEND_API_KEY` | Resend.com se email bhejne ke liye (form submissions) |
| `SESSION_SECRET` | Session encryption ke liye (koi bhi lamba random string) |

Non-secret env var (already `.replit` mein saved hai):
- `TO_EMAIL` = `chetnaravishchetnaravish@gmail.com` — jis email pe form submissions aayengi

> **Note:** Replit `.env` files ko security reasons se block karta hai. Secrets sirf Replit Secrets tab mein hi store hoti hain aur project transfer pe manually re-add karni padti hain.

## User Preferences

- Keep the existing monorepo structure (pnpm workspaces, `artifacts/`, `lib/`)
