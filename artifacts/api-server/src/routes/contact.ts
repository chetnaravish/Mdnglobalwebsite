import { Router, type IRouter } from "express";
import { z } from "zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  studentName: z.string().min(1, "Student name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  classApplying: z.string().min(1, "Class is required"),
  message: z.string().min(1, "Message is required"),
});

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid form data" });
    return;
  }

  const { name, studentName, phone, email, classApplying, message } = parsed.data;

  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    logger.error("BREVO_API_KEY is not set");
    res.status(500).json({ success: false, message: "Email service not configured" });
    return;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a3a6b; border-bottom: 3px solid #f5a623; padding-bottom: 10px;">
        New Admission Inquiry – MDN Global School
      </h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px; font-weight:bold; color:#1a3a6b; width:180px;">Parent / Guardian</td>
          <td style="padding:10px 14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px; font-weight:bold; color:#1a3a6b;">Student Name</td>
          <td style="padding:10px 14px;">${studentName}</td>
        </tr>
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px; font-weight:bold; color:#1a3a6b;">Mobile</td>
          <td style="padding:10px 14px;">${phone}</td>
        </tr>
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px; font-weight:bold; color:#1a3a6b;">Email</td>
          <td style="padding:10px 14px;">${email || "—"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px; font-weight:bold; color:#1a3a6b;">Class Applying For</td>
          <td style="padding:10px 14px;">${classApplying}</td>
        </tr>
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px; font-weight:bold; color:#1a3a6b; vertical-align:top;">Message</td>
          <td style="padding:10px 14px;">${message.replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
      <p style="margin-top:24px; color:#888; font-size:12px;">
        Sent via MDN Global School website contact form.
      </p>
    </div>
  `;

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "MDN Global School Website", email: "info@mdnglobalschool.com" },
        to: [{ email: "info@mdnglobalschool.com", name: "MDN Global School" }],
        ...(email ? { replyTo: { email, name } } : {}),
        subject: `New Admission Inquiry – ${studentName} (${classApplying}) from ${name}`,
        htmlContent,
      }),
    });

    if (brevoRes.ok) {
      logger.info({ name, classApplying }, "Contact form submission sent via Brevo");
      res.json({ success: true });
    } else {
      const errBody = await brevoRes.json().catch(() => ({}));
      logger.error({ status: brevoRes.status, errBody }, "Brevo API error");
      res.status(502).json({ success: false, message: "Failed to send email. Please try again." });
    }
  } catch (err) {
    logger.error({ err }, "Network error calling Brevo API");
    res.status(500).json({ success: false, message: "Network error. Please try again." });
  }
});

export default router;
