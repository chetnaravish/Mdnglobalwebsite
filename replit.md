# MDN Global School Kaithal — Website

A school website for MDN Global School, Kaithal (Haryana), built as a pnpm monorepo with a React frontend and Express API backend.

## Stack

- **Frontend** (`artifacts/mdn-school`): React + Vite + Tailwind CSS + shadcn/ui, wouter routing
- **API** (`artifacts/api-server`): Express 5, pnpm build with esbuild, Pino logging
- **Shared libs** (`lib/`): `api-client-react`, `api-spec` (OpenAPI/orval), `api-zod`, `db` (Drizzle ORM + PostgreSQL)

## Running the project

Two workflows are configured and start automatically:

| Workflow | Command | Preview |
|----------|---------|---------|
| `artifacts/mdn-school: web` | `pnpm --filter @workspace/mdn-school run dev` | `/` (root) |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | `/api` |

## Pages

- Home, About, Academics, Facilities, Events, Gallery, Contact

## Contact / Admission form

The Contact page sends admission inquiries by email using **Brevo SMTP**. Two secrets are required for this to work:

- `BREVO_SMTP_USER` — your Brevo SMTP login (usually your Brevo account email)
- `BREVO_SMTP_KEY` — your Brevo SMTP API key

Without these, the contact form will return a 500 error. The rest of the site works without them.

## Database

A Drizzle ORM + PostgreSQL `@workspace/db` package is wired up but the schema is currently empty — no tables are defined yet. A `DATABASE_URL` secret is needed if/when the DB is used.

## User preferences

<!-- Add preferences here as you work with the agent -->
