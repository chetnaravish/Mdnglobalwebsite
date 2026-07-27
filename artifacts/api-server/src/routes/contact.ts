import { Router, type IRouter } from "express";
import { z } from "zod";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  studentName: z.string().min(1, "Student name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  classApplying: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid form data" });
    return;
  }

  const { name, studentName, phone, email, classApplying, message } = parsed.data;

  let resend: Resend;
  try {
    resend = getResend();
  } catch (err) {
    logger.error({ err }, "Email service not configured");
    res.status(500).json({ success: false, message: "Email service not configured" });
    return;
  }

  const toEmail = process.env.TO_EMAIL || "chetnaravishchetnaravish@gmail.com";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a3a6b;border-bottom:3px solid #f5a623;padding-bottom:10px;">
        New Admission Inquiry – MDN Global School
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;width:180px;">Parent / Guardian</td>
          <td style="padding:10px 14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;">Student Name</td>
          <td style="padding:10px 14px;">${studentName}</td>
        </tr>
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;">Mobile</td>
          <td style="padding:10px 14px;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;">Email</td>
          <td style="padding:10px 14px;">${email || "—"}</td>
        </tr>
        <tr style="background:#f8f9ff;">
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;">Class Applying For</td>
          <td style="padding:10px 14px;">${classApplying || "—"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;vertical-align:top;">Message</td>
          <td style="padding:10px 14px;">${(message || "").replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
      <p style="margin-top:24px;color:#888;font-size:12px;">
        Sent via MDN Global School website contact form.
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "MDN Global School <onboarding@resend.dev>",
      to: [toEmail],
      ...(email ? { replyTo: `${name} <${email}>` } : {}),
      subject: `New Admission Inquiry – ${studentName} (${classApplying || "Class not specified"}) from ${name}`,
      html,
    });

    if (error) {
      logger.error({ error }, "Resend API error");
      res.status(502).json({ success: false, message: "Failed to send email. Please try again." });
      return;
    }

    logger.info({ name, studentName, classApplying }, "Contact form email sent via Resend");
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send email via Resend");
    res.status(502).json({ success: false, message: "Failed to send email. Please try again." });
  }
});

export default router;
