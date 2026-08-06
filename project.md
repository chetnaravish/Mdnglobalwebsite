# MDN Global School — Project Change Log

Yahan har woh change record hoga jo website ke andar kiya gaya hai —
text, images, code, settings, kuch bhi. Naya task neeche add hota jaayega.

---

## ✅ Task 1 — Project Setup (GitHub Import Fix)
**Date:** August 6, 2026

### Kya kiya:
- Project GitHub se Replit pe import kiya
- `pnpm install` chala ke saare dependencies install kiye
- Teen workflows register aur start kiye:
  - `artifacts/mdn-school: web` → Website frontend (port 26263)
  - `artifacts/api-server: web` → API server / backend (port 22729)
  - `artifacts/mockup-sandbox: Component Preview Server` → Design canvas (port 8081)
- Website preview mein live aur working verify ki (screenshot liya)

### Bug Fix — GitHub Import ke baad "Your app is not running" error:
**Problem:** Har baar GitHub se import karne ke baad website nahi chalti thi — "Your app is not running" error aata tha kyunki `pnpm install` automatically nahi chalta tha aur workflows fail ho jaate the.

**Fix:** Dono artifact ke dev commands update kiye taaki wo pehle automatically `pnpm install` karein:

**File changed:** `artifacts/mdn-school/.replit-artifact/artifact.toml`
```
Pehle:  run = "pnpm --filter @workspace/mdn-school run dev"
Baad:   run = "pnpm install --frozen-lockfile && pnpm --filter @workspace/mdn-school run dev"
```

**File changed:** `artifacts/api-server/.replit-artifact/artifact.toml`
```
Pehle:  run = "pnpm --filter @workspace/api-server run dev"
Baad:   run = "pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server run dev"
```

**Result:** Ab GitHub se import karne ke baad website automatically chal jaati hai bina kisi error ke.

---

## ✅ Task 2 — Chatbot Ko School-Only Banaya
**Date:** August 6, 2026

### Kya kiya:
Chatbot pehle koi bhi question ka answer de deta tha — general knowledge, history, coding, entertainment, kuch bhi. User ne kaha ki chatbot sirf school se related questions ka answer de.

### File changed: `artifacts/api-server/src/routes/chat.ts`

**System Prompt mein yeh strict rules add kiye:**

1. **Sirf MDN Global School Kaithal se related questions ka answer do** — admissions, fees, academics, facilities, staff, timings, events, contact.

2. **Off-topic questions politely refuse karo** — agar koi general knowledge, doosre school, politics, entertainment, coding, history ya school se bahar ki koi bhi cheez puche to answer nahi dena. Seedha redirect karo: *"Main sirf MDN Global School Kaithal ke baare mein help kar sakta hoon."*

3. **Kabhi bhi made-up information mat do** — agar exact detail pata nahi (jaise exact fee) to school ka number do: +91 87087 71586

4. **School ke baare mein kuch bhi galat ya negative mat bolo** — school ki image hamesha sahi aur professional rakho.

5. **User ki language mein jawab do** — Hindi mein pucha to Hindi mein, English mein pucha to English mein.

**Off-topic questions jo ab refuse honge:**
- "2+2 kya hai?" → School topic pe redirect
- "India ki history batao" → School topic pe redirect
- "Poem likho" → School topic pe redirect
- Koi bhi non-school question → School topic pe redirect

**API server restart kiya** — changes live hue.

---

## ✅ Task 3 — replit.md Mein Poori File Structure Save Ki
**Date:** August 6, 2026

### Kya kiya:
`replit.md` file mein poori project ki file tree aur har file ka explanation save kiya.

### File changed: `replit.md`

**Jo information save ki:**
- `artifacts/mdn-school/src/pages/` — har page file ka description (Home, About, Academics, etc.)
- `artifacts/mdn-school/src/components/ChatBot.tsx` — Chatbot UI ka code
- `artifacts/mdn-school/src/components/Layout.tsx` — Navbar + Footer
- `artifacts/mdn-school/public/images/` — Saari images
- `artifacts/api-server/src/routes/chat.ts` — Chatbot AI + System Prompt
- `artifacts/api-server/src/routes/contact.ts` — Contact form email
- `lib/db/src/schema/index.ts` — Database tables
- Quick Reference table — kya kahan milega ek nazar mein

---

## ✅ Task 4 — project.md File Banai (Yeh File)
**Date:** August 6, 2026

### Kya kiya:
- `project.md` naam ki empty directory thi — use hataya
- Nai `project.md` file banayi jisme abhi tak ke saare changes record kiye
- Aage se har task ke baad is file mein entry add hogi

---

*Aage jo bhi changes honge — text update, image change, new feature, bug fix — sab yahan add hote rahenge.*
