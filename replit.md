# MDN Global School Kaithal

A school website for MDN Global School Kaithal (CBSE affiliated, Kaithal, Haryana). Built as a pnpm monorepo with a React/Vite frontend, an Express API server, and a PostgreSQL database via Drizzle ORM.

---

## 📁 File Tree — Har File Mein Kya Hai

### 📁 `artifacts/mdn-school/` — Frontend (Jo Website Dikhti Hai)

Yeh woh cheez hai jo user browser mein dekhta hai.

```
artifacts/mdn-school/
├── index.html                        ← Website ka HTML shell (browser yahan se load karta hai)
├── vite.config.ts                    ← Vite build tool ki settings (port, paths, plugins)
├── tsconfig.json                     ← TypeScript settings frontend ke liye
├── package.json                      ← Frontend ke npm packages ki list
├── components.json                   ← shadcn/ui component config

├── public/                           ← Static files (directly browser ko serve hoti hain)
│   ├── favicon.png / favicon.svg     ← Browser tab pe dikhne wala school icon
│   ├── og-image.png                  ← WhatsApp/social media share pe dikhne wali image
│   ├── robots.txt                    ← Google ko batata hai kya index kare
│   └── images/                       ← ⭐ SAARI IMAGES YAHAN HAIN
│       ├── mdn-logo.svg              ← School ka logo (SVG format)
│       ├── hero-bg.jpg               ← Home page ka background photo
│       ├── about-school.jpg          ← About page ki image
│       ├── director.png              ← Director ki photo
│       ├── principal.jpg             ← Principal ki photo
│       ├── classroom.png             ← Classroom ki photo
│       ├── science-lab.png           ← Science lab ki photo
│       ├── computer-lab.png          ← Computer lab ki photo
│       ├── library-students.jpg      ← Library ki photo
│       ├── school-buses.jpg          ← Transport/buses ki photo
│       ├── skating.jpg               ← Skating activity ki photo
│       ├── annual-function.png       ← Annual function ki photo
│       ├── mdn-building-*.avif/png   ← School building ke alag alag photos
│       └── ...                       ← Baaki saari school photos

└── src/                              ← ⭐ WEBSITE KA PURA SOURCE CODE YAHAN HAI
    ├── main.tsx                      ← Website ka starting point (yahan se sab shuru hota hai)
    ├── App.tsx                       ← Routes define hote hain (URL → Page mapping)
    ├── index.css                     ← Global CSS (colors, fonts, Tailwind setup)

    ├── pages/                        ← ⭐ WEBSITE KE SAARE PAGES
    │   ├── Home.tsx                  ← Home page — hero slider, stats, highlights
    │   ├── About.tsx                 ← About page — school intro, leadership team
    │   ├── Academics.tsx             ← Academics page — classes, streams, curriculum
    │   ├── Facilities.tsx            ← Facilities page — labs, library, sports, transport
    │   ├── Events.tsx                ← Events page — annual function, sports day, cultural
    │   ├── Gallery.tsx               ← Gallery page — photo grid
    │   ├── Contact.tsx               ← Contact page — enquiry form, map, contact details
    │   └── not-found.tsx             ← 404 page (jab koi galat URL dale)

    ├── components/                   ← ⭐ REUSABLE PARTS (kai pages pe use hote hain)
    │   ├── ChatBot.tsx               ← 🤖 CHATBOT KA PURA UI CODE — button, chat window,
    │   │                                messages, input box, loading dots sab yahan
    │   ├── Layout.tsx                ← Navbar + Footer — har page pe same header/footer
    │   └── ui/                       ← shadcn/ui components (buttons, cards, dialogs, etc.)
    │       ├── button.tsx            ← Button component
    │       ├── card.tsx              ← Card component
    │       ├── dialog.tsx            ← Popup/modal component
    │       ├── carousel.tsx          ← Image slider component
    │       ├── form.tsx              ← Form component
    │       ├── input.tsx             ← Text input component
    │       ├── toast.tsx             ← Notification pop-up component
    │       └── ...                   ← Baaki saare UI components

    ├── hooks/                        ← Custom React hooks
    │   ├── use-mobile.tsx            ← Detect karta hai mobile hai ya desktop
    │   └── use-toast.ts              ← Toast notifications ka logic

    └── lib/
        └── utils.ts                  ← Chhote helper functions (jaise class merging)
```

---

### 📁 `artifacts/api-server/` — Backend (Server Side Code)

Yeh user ko nahi dikhta — website ke andar ka engine hai. API calls handle karta hai.

```
artifacts/api-server/
├── build.mjs                         ← TypeScript ko JavaScript mein convert karne ka script
├── tsconfig.json                     ← TypeScript settings backend ke liye
├── package.json                      ← Backend ke npm packages ki list

└── src/                              ← ⭐ SERVER KA PURA SOURCE CODE
    ├── index.ts                      ← Server yahan start hota hai (PORT set, listen shuru)
    ├── app.ts                        ← Express app setup — middleware aur routes connect hote hain

    ├── routes/                       ← ⭐ SAARE API ENDPOINTS YAHAN HAIN
    │   ├── chat.ts                   ← 🤖 CHATBOT KA AI BRAIN YAHAN HAI
    │   │                                - Groq AI se connection
    │   │                                - SCHOOL_SYSTEM_PROMPT (school-only rules)
    │   │                                - POST /api/chat endpoint
    │   ├── contact.ts                ← 📧 CONTACT FORM KA CODE
    │   │                                - Form data receive karta hai
    │   │                                - Resend API se email bhejta hai
    │   │                                - POST /api/contact endpoint
    │   ├── health.ts                 ← Server theek chal raha hai check karne ke liye
    │   │                                - GET /api/healthz endpoint
    │   └── index.ts                  ← Sab routes ek jagah register hote hain

    ├── middlewares/                  ← Request processing middleware (future use ke liye)
    └── lib/
        └── logger.ts                 ← Console logs likhne ka code (Pino logger)
```

---

### 📁 `artifacts/mockup-sandbox/` — Design Canvas

Replit ka internal design/mockup tool. Agent isko design karne ke liye use karta hai. Manually edit karne ki zaroorat nahi.

---

### 📁 `lib/` — Shared Libraries (Frontend + Backend dono use karte hain)

```
lib/
├── db/                               ← 🗄️ DATABASE KA CODE
│   ├── drizzle.config.ts             ← Database connection settings
│   └── src/
│       ├── index.ts                  ← Database pool export (DATABASE_URL use karta hai)
│       └── schema/
│           └── index.ts              ← ⭐ DATABASE TABLES YAHAN DEFINE HOTI HAIN
│                                        (abhi empty hai — tables add karne hain toh yahan)

├── api-spec/
│   ├── openapi.yaml                  ← API ka blueprint — kaunse endpoints hain,
│   │                                    kya data aata/jaata hai (source of truth)
│   ├── orval.config.ts               ← Code generation ki settings
│   └── package.json

├── api-zod/                          ← API request/response validation rules
│   └── src/
│       └── generated/
│           ├── api.ts                ← Auto-generated Zod validation schemas
│           └── types/
│               └── healthStatus.ts  ← Health check ka type

└── api-client-react/                 ← Frontend ke liye API call functions
    └── src/
        ├── index.ts                  ← Export entry point
        ├── custom-fetch.ts           ← Custom fetch wrapper (BASE_URL handle karta hai)
        └── generated/
            ├── api.ts                ← Auto-generated React Query hooks
            └── api.schemas.ts        ← Auto-generated Zod schemas
```

---

### 📁 `scripts/` — Automation Scripts

```
scripts/
└── post-merge.sh                     ← GitHub se merge hone ke baad automatically chalta hai
                                         1. pnpm install (packages install karta hai)
                                         2. pnpm db push (database update karta hai)
```

---

### 📄 Root Level Files — Project Settings

```
.replit                               ← Replit ko batata hai project kaise chalana hai
                                         (modules, workflows, deployment settings)
replit.md                             ← ⭐ YEH FILE — project ka documentation
package.json                          ← Root workspace package
pnpm-workspace.yaml                   ← Kaunse folders workspace mein hain
pnpm-lock.yaml                        ← Exact package versions (kabhi manually change mat karna)
tsconfig.json                         ← Root TypeScript settings
tsconfig.base.json                    ← Shared TypeScript base config
.env                                  ← Environment variables (TO_EMAIL saved hai yahan)
.gitignore                            ← Kaunsi files GitHub pe na jaayein (node_modules, dist, etc.)
.npmrc                                ← pnpm ke liye npm settings
replit.nix                            ← Nix packages (Node.js version, system tools)
```

---

## 🎯 Quick Reference — Kya Kahan Milega

| Kya dhundh rahe ho | File ka path |
|---|---|
| 🤖 Chatbot ka UI (design, window, messages) | `artifacts/mdn-school/src/components/ChatBot.tsx` |
| 🤖 Chatbot ka AI + System Prompt (school-only rules) | `artifacts/api-server/src/routes/chat.ts` |
| 📧 Contact form email bhejne ka code | `artifacts/api-server/src/routes/contact.ts` |
| 🏠 Home page ka code | `artifacts/mdn-school/src/pages/Home.tsx` |
| ℹ️ About page ka code | `artifacts/mdn-school/src/pages/About.tsx` |
| 📚 Academics page ka code | `artifacts/mdn-school/src/pages/Academics.tsx` |
| 🏋️ Facilities page ka code | `artifacts/mdn-school/src/pages/Facilities.tsx` |
| 🎉 Events page ka code | `artifacts/mdn-school/src/pages/Events.tsx` |
| 🖼️ Gallery page ka code | `artifacts/mdn-school/src/pages/Gallery.tsx` |
| 📞 Contact page ka code | `artifacts/mdn-school/src/pages/Contact.tsx` |
| 🖼️ Images / Photos | `artifacts/mdn-school/public/images/` |
| 🔝 Navbar + Footer | `artifacts/mdn-school/src/components/Layout.tsx` |
| 🗄️ Database tables | `lib/db/src/schema/index.ts` |
| ⚙️ Server startup | `artifacts/api-server/src/index.ts` |
| 🌐 API routes registration | `artifacts/api-server/src/routes/index.ts` |
| 📋 API blueprint (OpenAPI) | `lib/api-spec/openapi.yaml` |
| 🔗 URL → Page routing | `artifacts/mdn-school/src/App.tsx` |

---

## 🚀 Running the Project

### On Replit
GitHub se import karne ke baad sab automatically start ho jaata hai — `pnpm install` aur workflows apne aap chalta hai.

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

| Service | Local URL | Replit URL |
|---|---|---|
| Frontend | `http://localhost:5173` | `/` |
| API server | `http://localhost:3000/api` | `/api` |

---

## 🛠️ Stack

- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui, Wouter (routing), TanStack Query, Framer Motion
- **Backend**: Express 5, TypeScript, Pino (logging), Groq AI (chatbot), Resend (email)
- **Database**: PostgreSQL via Drizzle ORM (`lib/db/`) — `DATABASE_URL` auto-provisioned by Replit
- **Package manager**: pnpm workspaces

---

## 🔑 Required Secrets (Replit Secrets Tab)

Jab bhi project nayi Replit ID pe transfer ho, yeh secrets **Secrets tab** mein dobara add karni hain:

| Key | Description |
|---|---|
| `RESEND_API_KEY` | Resend.com se email bhejne ke liye (contact form) |
| `SESSION_SECRET` | Session encryption ke liye (koi bhi lamba random string) |
| `GROQ_API_KEY` | Groq AI ke liye (chatbot kaam karne ke liye zaroori) |

Non-secret env var (already `.replit` mein saved hai):
- `TO_EMAIL` = `chetnaravishchetnaravish@gmail.com` — jis email pe form submissions aayengi

---

## 🗄️ Database

Tables `lib/db/src/schema/index.ts` mein define hoti hain. Nai table add karne ke baad:
```bash
pnpm --filter @workspace/db push
```
`DATABASE_URL` Replit automatically provide karta hai — manually set mat karna.

---

## User Preferences

- Keep the existing monorepo structure (pnpm workspaces, `artifacts/`, `lib/`)
