# AGENT.md — MDN Global School Kaithal Website

> ⚠️ **AGENT RULES — SABSE PEHLE YEH PADHO:**
>
> 1. **Har naya session shuru karne se pehle yeh file poora read karo.** Isme project ka pura context hai — kya bana hai, kaise bana hai, aur kyu bana hai.
> 2. **Jo bhi change karo (code, text, image, config, bug fix), kaam complete hone ke baad is file ke "Change Log" section mein entry add karo** — Task number, date, kya kiya, kaunsi files badlin, kyu kiya.
> 3. Kabhi guess mat karo — agar kuch samajh na aaye to `replit.md` (file structure doc) aur `project.md` (purana change log) bhi padho.
> 4. Secrets/API keys ko code, docs ya commits mein kabhi nahi likhna. Sirf environment variables use karo.
> 5. `pnpm-lock.yaml` manually change mat karna.

---

## 1. Project Kya Hai? (Overview)

**MDN Global School Kaithal** ka official school website project — CBSE affiliated school, Kaithal, Haryana.

- **School address:** Behind Gulmohar City, Deod Kheri Road, Kaithal, Haryana 136027
- **Phone:** +91 87087 71586 | **Email:** info@mdnglobalschool.com
- **GitHub repo:** https://github.com/chetnaravish/Mdnglobalwebsite (branch: `main`)
- **Hosting:** Replit pe deploy hota hai (project Replit se import kiya gaya tha)
- **Owner/User:** Chetna Ravish (contact form submissions `chetnaravishchetnaravish@gmail.com` pe aati hain)

Website ke features:
1. School info pages — Home, About, Academics, Facilities, Events, Gallery, Contact
2. 🤖 **AI Chatbot** — sirf school se related questions ka answer deta hai (Groq AI), voice reply ke saath (Cartesia TTS) + mic input (browser STT)
3. 📧 **Contact/Admission enquiry form** — Resend email service se owner ko email bhejta hai
4. 📱 Official school app (Google Play: `com.campuspro.mdngs`) ka promotion Home page pe

---

## 2. Tech Stack (Kaise Bana Hai)

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces (`pnpm-workspace.yaml`) |
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui components |
| Routing | Wouter (frontend), TanStack Query |
| Animations | Framer Motion |
| Backend | Express 5 + TypeScript (esbuild se build) |
| Logging | Pino |
| Chatbot AI | Groq API (`llama-3.3-70b-versatile` prod / `allam-2-7b` dev plugin) |
| Chatbot Voice | Cartesia TTS (`sonic-3.5` model) |
| Email | Resend |
| Database | PostgreSQL via Drizzle ORM (`lib/db/`) — **abhi koi table use nahi ho rahi** |
| Package manager | pnpm (Node 20+) |

---

## 3. Project Structure (Kahan Kya Hai)

```
Mdnglobalwebsite/
├── artifacts/
│   ├── mdn-school/            ← ⭐ FRONTEND (website jo user dekhta hai)
│   │   ├── index.html
│   │   ├── vite.config.ts     ← Vite settings (port 5173, BASE_PATH support)
│   │   ├── vite-plugin-chat-api.ts ← ⭐ DEV-MODE chatbot middleware (neeche detail)
│   │   ├── public/images/     ← Saari website images
│   │   └── src/
│   │       ├── App.tsx        ← Routes (/ , /about, /academics, ...)
│   │       ├── main.tsx       ← Entry point
│   │       ├── index.css      ← Global styles + Tailwind theme
│   │       ├── components/
│   │       │   ├── Layout.tsx ← Navbar + Footer + <ChatBot/> (har page pe)
│   │       │   ├── ChatBot.tsx← 🤖 Chatbot ka pura UI
│   │       │   └── ui/        ← shadcn/ui components
│   │       ├── pages/         ← Home, About, Academics, Facilities,
│   │       │                     Events, Gallery, Contact, not-found
│   │       ├── hooks/         ← use-mobile, use-toast
│   │       └── lib/utils.ts   ← cn() helper
│   ├── api-server/            ← ⭐ BACKEND (Express API)
│   │   └── src/
│   │       ├── index.ts       ← Server start (PORT env; default 3000)
│   │       ├── app.ts         ← Express setup, cors, json, /api router
│   │       ├── routes/
│   │       │   ├── chat.ts    ← 🤖 PROD chatbot (Groq + Cartesia)
│   │       │   ├── contact.ts ← 📧 Contact form → Resend email
│   │       │   ├── health.ts  ← GET /api/healthz
│   │       │   └── index.ts   ← Route registration
│   │       └── lib/logger.ts
│   └── mockup-sandbox/        ← Replit internal design tool (ignore karo)
├── lib/                       ← Shared packages
│   ├── db/                    ← Drizzle schema (abhi empty)
│   ├── api-spec/              ← OpenAPI blueprint
│   ├── api-zod/               ← Auto-generated Zod schemas
│   └── api-client-react/      ← Auto-generated React Query hooks
├── scripts/post-merge.sh      ← GitHub merge ke baad install + db push
├── attached_assets/           ← User dwara upload ki gayi raw files
├── screenshots/               ← Verification screenshots
├── .replit                    ← Replit config (workflows, ports, env vars)
├── replit.md                  ← Detailed file-structure documentation
├── project.md                 ← Purana change log (Task 1–11)
└── AGENT.md                   ← ⭐ YEH FILE — agents ki guide + change log
```

### Quick Reference — Common Tasks

| Kaam | File |
|---|---|
| Chatbot UI change | `artifacts/mdn-school/src/components/ChatBot.tsx` |
| Chatbot AI rules/knowledge (PROD) | `artifacts/api-server/src/routes/chat.ts` → `SCHOOL_SYSTEM_PROMPT` |
| Chatbot AI rules/knowledge (DEV) | `artifacts/mdn-school/vite-plugin-chat-api.ts` → `SCHOOL_SYSTEM_PROMPT` ⚠️ dono sync rakho! |
| Contact form logic | `artifacts/api-server/src/routes/contact.ts` |
| Home page | `artifacts/mdn-school/src/pages/Home.tsx` |
| Navbar/Footer/menu links | `artifacts/mdn-school/src/components/Layout.tsx` |
| New page add | `src/pages/` mein file + `App.tsx` mein route + `Layout.tsx` navLinks |
| Images | `artifacts/mdn-school/public/images/` |

---

## 4. Chatbot Architecture — ⚠️ IMPORTANT (Do Implementations Hain)

Chatbot ke **do parallel implementations** hain, dono mein same system prompt hai:

1. **Dev mode (local):** `artifacts/mdn-school/vite-plugin-chat-api.ts` — Vite dev server ka custom middleware jo `/api/chat` ko khud handle karta hai. Model: `allam-2-7b`. Keys `.env` (root ya artifact folder) se load karta hai.
2. **Production (Replit):** `artifacts/api-server/src/routes/chat.ts` — Express route. Model: `llama-3.3-70b-versatile`. Keys `process.env` (Replit Secrets) se.

**Frontend** (`ChatBot.tsx`) hamesha `${BASE_URL}api/chat` pe POST karta hai — usse farak nahi padta kaun sa handle karega.

**Flow:** User message → Groq (system prompt = school knowledge base) → text reply → Cartesia TTS (`sonic-3.5`, fixed voice ID `db6b0ed5-d5d3-463d-ae85-518a07d3c2b4`, speed 0.9, calm, language Hindi/English auto-detect) → response mein `{ reply, audioBase64, audioMimeType }` → frontend text + audio blob ek saath show karta hai, voice auto-play (agar Voice On).

**System prompt ke strict rules:**
- Sirf MDN Global School Ke questions ka answer; baaki sab topics politely refuse
- Made-up info nahi (exact fee/seats/dates nahi pata to clearly bolna + school contact dena)
- User ki language mein jawab (Hindi/Hinglish/English)
- Prompt injection attempts ignore karna

⚠️ **Prompt/knowledge update karte waqt DONO files update karni hongi** (chat.ts + vite-plugin-chat-api.ts), warna dev aur prod mein alag answers aayenge.

---

## 5. Design Conventions

- **Brand colors:** Navy blue `#1a3a6b` (primary/dark sections), Amber/gold `#f5a623` (accents/buttons), deep navy `#0a1c46`/`#0f2557` (hover/gradients)
- **Font:** serif headings, sans body (Tailwind defaults via `index.css`)
- **Animations:** Framer Motion `fadeUp/fadeLeft/fadeRight` variants har page pe; scroll-reveal with `useInView`
- **Logo:** `/images/mdn-logo.jfif` (navbar h-16/h-20, footer me bhi)
- **data-testid attributes:** buttons pe lagane ka convention hai (jaise `button-download-school-app`)
- **Responsive:** mobile-first; mobile menu full-screen overlay; chatbot width 350/380px

### Page Sections (Home.tsx order):
Hero slider → Stats counters → Welcome/About → Why Families Choose MDN → **About the MDN School App** (`id="about-school-app"`) → Moments carousel → Reviews marquee → Admission CTA → Happy Learners + quick enquiry form

---

## 6. Environment Variables & Secrets

`.env` file root mein hoti hai (**gitignored hai, repo mein nahi hai**). Replit pe Secrets tab use hota hai.

| Key | Kyu chahiye | Kahan use hoti hai |
|---|---|---|
| `GROQ_API_KEY` | Chatbot AI | `chat.ts`, `vite-plugin-chat-api.ts` |
| `CARTESIA_API_KEY` | Voice replies | `chat.ts`, `vite-plugin-chat-api.ts` |
| `RESEND_API_KEY` | Contact form email | `contact.ts` |
| `TO_EMAIL` | Enquiry kis email pe jaaye | `contact.ts` (= `chetnaravishchetnaravish@gmail.com`, `.replit` mein set) |
| `VITE_MDN_APP_DOWNLOAD_URL` | Google Play app link | `Home.tsx` (= play store link `com.campuspro.mdngs`, `.replit` mein set) |

⚠️ **Local machine pe abhi `.env` missing hai** (delete ho chuki hai). Local dev/test ke liye keys wapas dalni padengi, warna chatbot "not configured" error dega.

---

## 7. Run Kaise Kare

### Locally (Windows)
```powershell
pnpm install

# Terminal 1 — Frontend (http://localhost:5173)
pnpm --filter @workspace/mdn-school run dev

# Terminal 2 — API server (http://localhost:3000/api) — contact form/prod chat ke liye
pnpm --filter @workspace/api-server run dev
```

### Replit pe
Workflows automatically chalte hain. Frontend port 26263, API port 22729 (Replit internal), external port 80 → 5173.

### Typecheck
```bash
pnpm typecheck   # root se — libs + artifacts sab check hota hai
```

---

## 8. Known Gotchas (Dhyan Rakhne Wali Baatein)

1. **Windows compatibility:** Root `package.json` mein `@rollup/rollup-win32-x64-msvc`, `@tailwindcss/oxide`, `lightningcss` pinned hain Windows local dev ke liye — hatana nahi.
2. **Dual system prompt:** Section 4 padho — prompt changes dono jagah sync karo.
3. **Vite `envDir`:** Frontend env vars project ROOT se load hote hain (`vite.config.ts` mein `envDir` set hai).
4. **BASE_URL:** Frontend URLs `${import.meta.env.BASE_URL}` ke through banate hain (deployment sub-path support ke liye) — hardcode `/api/...` avoid karo jab tak existing pattern follow ho raha ho.
5. **Database:** Schema `lib/db/src/schema/index.ts` mein define hota hai, par abhi website database use nahi karti (form email se jaata hai, chat stateless hai).
6. **mockup-sandbox:** Replit ka internal tool hai — isme manual changes mat karo.
7. **Secrets:** `.env` gitignored hai; commit mein keys kabhi nahi jaani chahiye (ek baar `.env` galti se push hua tha, phir delete-commit kiya gaya — dobara nahi!).

---

## 9. Change Log (Kya-Kya Kiya Gaya Hai)

> **Rule: Har naya task yahan neeche add hota jaayega. Format: Task #, Date, Files changed, Kya/Kyu.**

### ✅ Task 1 — Project Setup + GitHub Import Fix (Aug 6, 2026)
- GitHub se Replit import ke baad "app not running" error fix kiya — dono artifacts ke `.replit-artifact/artifact.toml` dev commands mein auto `pnpm install --frozen-lockfile` add kiya.

### ✅ Task 2 — Chatbot School-Only Banaya (Aug 6, 2026)
- `chat.ts` ke system prompt mein strict scope rules — off-topic questions refuse, made-up info nahi, professional tone, user ki language mein jawab.

### ✅ Task 3 — replit.md Documentation (Aug 6, 2026)
- Poori file tree + har file ka explanation `replit.md` mein save kiya.

### ✅ Task 4 — project.md Banaya (Aug 6, 2026)
- Change log file start ki (Task 1–11 entries wahin detailed hain).

### ✅ Task 5 — Head Staff Cards Redesign (Aug 6, 2026)
- About page staff cards: role pills hatakar naam ke neeche bracket format `(Director & Chairman)` etc. — File: `About.tsx`.

### ✅ Task 6 — Cartesia Voice Reply + Mic Input (Aug 7, 2026)
- Har AI reply ka TTS audio (fixed voice ID), text+voice synchronized display, Play/Listen replay button, mic button (browser SpeechRecognition, `hi-IN`), `CARTESIA_API_KEY` secret safe rakha.

### ✅ Task 7 — Short Replies + Voice On/Off Toggle (Aug 10, 2026)
- Concise replies (max_tokens 220, low temp), voice speed 0.9/calm emotion, header mein Voice On/Off button (off = auto-play band, manual Listen still works).

### ✅ Task 8 — Full School Knowledge Prompt Mein (Aug 10, 2026)
- System prompt expand kiya — about/academics/facilities/events/admissions/contact ki poori website info knowledge base bana di. 45-word limit hatayi, `max_tokens: 900`. Off-topic refusal barkarar.

### ✅ Task 9 — Home Page Par Official App Section (Aug 10, 2026)
- Hero mein Download App button + Explore App scroll; app info bullet points mein; link `VITE_MDN_APP_DOWNLOAD_URL` env var se (hardcode nahi).

### ✅ Task 10 — App Dashboard Screenshot Add (Aug 10, 2026)
- User ka uploaded screenshot `public/images/mdn-school-app-dashboard.webp` add kiya; app bullets actual app modules ke hisaab se (Fee Payment, Home Work, Exam Results, etc.).

### ✅ Task 11 — App Section Reposition + Clickable Screenshot (Aug 10, 2026)
- App section "Why Families Choose MDN" ke baad move hua; media area sirf logo + screenshot; screenshot clickable lightbox (close button/outside click/Escape) — File: `Home.tsx`.

### ✅ Task 12 — Recent Git Work (Aug 2026, commit history se)
- `de766d6`: Working chatbot with Groq + Cartesia voice, **Windows compatibility fixes**, home page image replace.
- `b4cc79b`: `.env` accidentally push hui thi, delete ki (⚠️ keys rotate karni chahiye).
- `8dd18f7`, `5e4727d`, `810f777`: Home page refactor + docs updates.
- `ed95786`→`03540f0`: Chat route iterations (Groq integration fixes).
- `ef6469c`→`40a4e58`: School images, card structure changes, api-server init.

### ✅ Task 13 — AGENT.md Banaya (Aug 22, 2026)
- Yeh file create ki taaki har naya agent/session pehle poori project history samajh sake. Aage ke saare changes isi file mein log honge.

### ✅ Task 14 — API Server Windows Local Run Fix + Local Preview Start (Aug 22, 2026)
- **Bug:** `artifacts/api-server/package.json` ka dev script `export NODE_ENV=development && ...` Windows pe fail hota tha (`export` Linux/Mac command hai) — `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL`.
- **Fix:** Dev script ab sirf `pnpm run build && pnpm run start` hai. `NODE_ENV` unset chhoda to bhi logger.ts development mode (pino-pretty) use karta hai, to behavior same rehta hai.
- **Local preview start kiya:** Frontend Vite dev server → http://localhost:5173 (chatbot keys `artifacts/mdn-school/.env` se load hui), API server → http://localhost:3000/api (`/api/healthz` = ok).
- ⚠️ **Known limitation:** Contact form frontend se `/api/contact` (port 5173) pe POST karta hai par Vite mein uska proxy :3000 pe nahi hai — local dev mein form test karne ke liye `vite.config.ts` mein `server.proxy` add karna hoga ya form URL absolute banana hoga.

### ✅ Task 15 — Download App Button Fix (Aug 24, 2026)
- **Bug:** Home page ke saare "Download App" buttons (hero + app section, total 3) locally kaam nahi kar rahe the — `href` sirf `VITE_MDN_APP_DOWNLOAD_URL` env var se aata tha jo local machine pe missing thi (root `.env` exist nahi karti thi), isliye `href={undefined}` → click pe kuch nahi hota tha. (Replit pe `.replit` env se kaam karta tha.)
- **Fix (2-part):**
  1. `Home.tsx:10-11` — fallback constant `DEFAULT_APP_DOWNLOAD_URL` add kiya (`https://play.google.com/store/apps/details?id=com.campuspro.mdngs`). Ab agar env var missing bhi ho to button hamesha Play Store link kholega; env var set ho to wahi override karega.
  2. Root `.env` create kiya with `VITE_MDN_APP_DOWNLOAD_URL=https://play.google.com/store/apps/details?id=com.campuspro.mdngs&pcampaignid=web_share` (gitignored hai, safe).
- **Verify:** Play Store link live hai (HTTP 200), Vite server restart karke page load ok, typecheck mein mere changes se koi error nahi.
- ⚠️ **Pre-existing issue noted:** `Facilities.tsx` (lightbox state typing) mein 6 purane TS errors hain — inhe alag task mein fix karna hoga.

---

*Aage ka har kaam — chhota ho ya bada — is change log mein add karna zaroori hai.*
