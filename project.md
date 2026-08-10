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

---

## ✅ Task 5 — Head Staff Cards Mein Posts Naam Ke Neeche Dikhayi
**Date:** August 6, 2026

### Kya kiya:
- About page ke **Head Staff** section mein photo ke upar dikhne wale role pills hata diye.
- Ab har staff member ke card mein naam ke turant neeche unki post bracket mein dikh rahi hai:
  - Dr. Vinod Kumar — `(Director & Chairman)`
  - Mrs. Nidhi Kansal — `(Chairperson)`
  - Mr. Gaurav Garg — `(Manager)`
  - Dr. Sant Ram — `(Principal)`
- Post ke neeche staff member ka short description pehle ki tarah dikh raha hai.

### File changed:
- `artifacts/mdn-school/src/pages/About.tsx`

### Documentation:
- Is change ko `project.md` ke is task log mein save kiya gaya hai.

---

## ✅ Task 6 — Chatbot Mein Cartesia Voice Reply Aur Mic Input
**Date:** August 7, 2026

### Kya kiya:
- Chatbot ke har AI reply ke liye Cartesia Text-to-Speech add kiya.
- Har reply mein hamesha fixed voice ID `db6b0ed5-d5d3-463d-ae85-518a07d3c2b4` use hoti hai; koi random voice select nahi hoti.
- Groq se text reply milne ke baad Cartesia audio generate hota hai. Frontend text tabhi message mein dikhata aur voice play karta hai jab dono ready hon, isliye text pehle aur voice baad mein अलग-अलग नहीं आती.
- Reply generate होने तक chatbot में existing typing/loading dots दिखाई देते हैं.
- Assistant messages में **Play voice** button भी जोड़ा गया है, ताकि reply को दोबारा सुना जा सके.
- Message input के side में mic button जोड़ा गया है. Browser speech recognition बोलकर input box में text भरता है, जिसे user send कर सकता है.
- Hindi/Hinglish के लिए speech recognition language `hi-IN` रखी गई है.

### Backend changes:
- `artifacts/api-server/src/routes/chat.ts` में Cartesia `/tts/bytes` API call जोड़ा गया.
- Server response अब `reply`, `audioBase64`, और `audioMimeType` साथ भेजता है.
- Cartesia API key browser/client में expose नहीं की गई.

### Secure environment:
- `CARTESIA_API_KEY` को Replit Secrets में secure तरीके से save किया गया है.
- Security के कारण API key को `.env`, source code, या `project.md` में actual value के रूप में नहीं लिखा गया.
- Backend runtime `process.env.CARTESIA_API_KEY` से वही secret पढ़ता है.

### Frontend changes:
- `artifacts/mdn-school/src/components/ChatBot.tsx`
- Mic start/stop state, browser STT, synchronized text+voice response, audio replay, और error handling जोड़ी गई.

---

## ✅ Task 7 — Short Replies Aur Voice On/Off Control
**Date:** August 10, 2026

### Kya kiya:
- Chatbot ka system prompt concise kiya gaya hai.
- Ab chatbot normally 1–3 simple sentences aur maximum 45 words mein exact question ka short, specific answer dega.
- Unnecessary greeting, repeated details, markdown, bullets, emojis aur decorative symbols हटाए गए हैं, ताकि text और voice दोनों easy to understand रहें.
- Off-topic questions को short polite redirect मिलेगा.
- Groq generation को `max_tokens: 220` और lower temperature पर सेट किया गया, जिससे replies अधिक focused रहें.
- Cartesia voice के लिए reply text साफ़ किया जाता है और language Hindi/English के हिसाब से चुनी जाती है.
- Voice speed `0.9`, volume `1`, और calm emotion सेट किया गया है, जिससे बोलना धीमा, साफ़ और समझने में आसान रहे.

### Voice control:
- Chatbot header में Voice On/Off button जोड़ा गया.
- Voice On होने पर generated voice reply आते ही auto-play होगी.
- Voice Off करने पर current audio तुरंत रुकती है और नई voice auto-play नहीं होती.
- Voice फिर भी backend पर generate होती है और message के नीचे **Play voice** button से manually सुनी जा सकती है.
- Text और generated audio अभी भी दोनों ready होने के बाद एक साथ message में आते हैं.

### Files changed:
- `artifacts/api-server/src/routes/chat.ts`
- `artifacts/mdn-school/src/components/ChatBot.tsx`
