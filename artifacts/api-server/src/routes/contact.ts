import { Router, type IRouter } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";
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

function createTransporter() {
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_KEY;

  if (!user || !pass) {
    throw new Error("BREVO_SMTP_USER or BREVO_SMTP_KEY is not set");
  }

  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid form data" });
    return;
  }

  const { name, studentName, phone, email, classApplying, message } = parsed.data;

  let transporter: nodemailer.Transporter;
  try {
    transporter = createTransporter();
  } catch (err) {
    logger.error({ err }, "Email service not configured");
    res.status(500).json({ success: false, message: "Email service not configured" });
    return;
  }

  const senderEmail = process.env.BREVO_SMTP_USER!;

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
          <td style="padding:10px 14px;">${classApplying}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:bold;color:#1a3a6b;vertical-align:top;">Message</td>
          <td style="padding:10px 14px;">${message.replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
      <p style="margin-top:24px;color:#888;font-size:12px;">
        Sent via MDN Global School website contact form.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"MDN Global School Website" <${senderEmail}>`,
      to: senderEmail,
      ...(email ? { replyTo: `"${name}" <${email}>` } : {}),
      subject: `New Admission Inquiry – ${studentName} (${classApplying}) from ${name}`,
      html,
    });

    logger.info({ name, studentName, classApplying }, "Contact form email sent");
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send email via SMTP");
    res.status(502).json({ success: false, message: "Failed to send email. Please try again." });
  }
});

export default router;
