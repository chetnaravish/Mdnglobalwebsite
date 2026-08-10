import { Router, type IRouter } from "express";
import { z } from "zod";
import Groq from "groq-sdk";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SCHOOL_SYSTEM_PROMPT = `You are MDN Global School Kaithal's official assistant.

Answer only questions about the school: admissions, fees, academics, facilities, staff, timings, events, contact, and location.

School facts:
- MDN Global School Kaithal is CBSE-affiliated, at Deod Kheri Road, Kaithal, Haryana 136027.
- Classes: Nursery to Class 12. Senior streams: Science, Commerce, Arts. Medium: English.
- School timings are typically 8:00 AM to 2:30 PM; confirm exact timings with the school.
- Phone: +91 87087 71586. Email: info@mdnglobalschool.com.
- Director & Chairman: Dr. Vinod Kumar. Chairperson: Mrs. Nidhi Kansal. Manager: Mr. Gaurav Garg. Principal: Dr. Sant Ram, also known as Dr. Sant Kaushik.
- Admissions are subject to seat availability. Enquiries can be made through the website or by phone.

Reply rules:
1. Give a short, specific answer: normally 1 to 3 simple sentences and no more than 45 words.
2. Answer the exact question first. Do not add unnecessary background, repeated contact details, greetings, or conclusions.
3. Use the same language as the user: simple Hindi, English, or natural Hinglish.
4. Use plain text only. Do not use markdown, bullets, emojis, or decorative symbols because the reply is also spoken aloud.
5. Never guess. If a detail is unavailable or may have changed, say so briefly and direct the user to call +91 87087 71586.
6. For unrelated questions, politely say you can only help with MDN Global School Kaithal and name two or three school topics they can ask about.`;

const messageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1).max(2000),
    })
  ).min(1).max(20),
});

const CARTESIA_VOICE_ID = "db6b0ed5-d5d3-463d-ae85-518a07d3c2b4";

function getGroq() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");
  return new Groq({ apiKey });
}

async function generateVoice(reply: string): Promise<string> {
  const apiKey = process.env.CARTESIA_API_KEY;
  if (!apiKey) throw new Error("CARTESIA_API_KEY is not set");

  const spokenReply = reply
    .replace(/[*_#`]/g, "")
    .replace(/^\s*[-•]\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  const language = /[\u0900-\u097F]/u.test(spokenReply) ? "hi" : "en";

  const response = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Cartesia-Version": "2026-03-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_id: "sonic-3.5",
      transcript: spokenReply,
      voice: { mode: "id", id: CARTESIA_VOICE_ID },
      language,
      generation_config: {
        speed: 0.9,
        volume: 1,
        emotion: "calm",
      },
      output_format: { container: "mp3", sample_rate: 44100, bit_rate: 128000 },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Cartesia request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  return audio.toString("base64");
}

router.post("/chat", async (req, res) => {
  const parsed = messageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  let groq: Groq;
  try {
    groq = getGroq();
  } catch (err) {
    logger.error({ err }, "Groq not configured");
    res.status(500).json({ success: false, message: "Chat service not configured" });
    return;
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SCHOOL_SYSTEM_PROMPT },
        ...parsed.data.messages,
      ],
      max_tokens: 220,
      temperature: 0.2,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I could not generate a response. Please try again.";
    let audioBase64: string;
    try {
      audioBase64 = await generateVoice(reply);
    } catch (err) {
      logger.error({ err }, "Cartesia voice generation failed");
      res.status(502).json({ success: false, message: "Could not generate the voice reply. Please try again." });
      return;
    }

    logger.info("Chat response generated");
    res.json({ success: true, reply, audioBase64, audioMimeType: "audio/mpeg" });
  } catch (err) {
    logger.error({ err }, "Groq API error");
    res.status(502).json({ success: false, message: "Could not get response. Please try again." });
  }
});

export default router;
