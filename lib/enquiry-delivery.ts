import nodemailer from "nodemailer";

/**
 * Where a website enquiry goes once it has been validated: an email to
 * the studio, and a row in a Google Sheet (which opens in Excel via
 * File → Download → .xlsx). Each channel switches itself on when its
 * environment variables are set — see .env.example — so either can be
 * used alone.
 *
 * Server-only: this reads mail and webhook secrets from the environment.
 * Import it from server actions, never from a client component.
 */

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  projectLocation: string;
  projectType: string;
  approximateArea: string;
  estimatedBudget: string;
  expectedStartDate: string;
  message: string;
};

const LABELS: Record<keyof Enquiry, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  projectLocation: "Project location",
  projectType: "Project type",
  approximateArea: "Approximate area",
  estimatedBudget: "Estimated budget",
  expectedStartDate: "Expected start date",
  message: "Message",
};

type Channel = { name: string; send: (enquiry: Enquiry) => Promise<void> };

function env(key: string) {
  return process.env[key]?.trim() ?? "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildEnquiryEmail(enquiry: Enquiry) {
  const rows = (Object.keys(LABELS) as (keyof Enquiry)[]).filter((key) => enquiry[key]);
  const text = rows.map((key) => `${LABELS[key]}: ${enquiry[key]}`).join("\n\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#292e25">
      <h2 style="font-weight:normal;margin:0 0 16px">New enquiry from the website</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows.map((key) => `
          <tr style="border-bottom:1px solid #dcd2c2;vertical-align:top">
            <td style="color:#8c6f4e;white-space:nowrap">${LABELS[key]}</td>
            <td style="white-space:pre-wrap">${escapeHtml(enquiry[key])}</td>
          </tr>`).join("")}
      </table>
      <p style="color:#4c5145;margin-top:20px">Reply to this email to answer ${escapeHtml(enquiry.name)} directly.</p>
    </div>`;
  const subject = `New enquiry — ${enquiry.name}${enquiry.projectType ? ` (${enquiry.projectType})` : ""}`;
  return { subject, text, html };
}

/** Email to the studio, sent through any SMTP account (Gmail by default). */
function emailChannel(): Channel | null {
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const to = env("ENQUIRY_TO_EMAIL");
  if (!user || !pass || !to) return null;

  const port = Number(env("SMTP_PORT") || 465);
  const transport = nodemailer.createTransport({
    host: env("SMTP_HOST") || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return {
    name: "email",
    async send(enquiry) {
      const { subject, text, html } = buildEnquiryEmail(enquiry);
      await transport.sendMail({
        // Gmail only sends as the signed-in account; the visitor goes in
        // Reply-To so answering the email reaches them.
        from: { name: "KMD Interior Website", address: user },
        to,
        replyTo: { name: enquiry.name, address: enquiry.email },
        subject,
        text,
        html,
      });
    },
  };
}

/** A row in a Google Sheet, via the Apps Script in integrations/google-sheet-enquiries.gs. */
function sheetChannel(): Channel | null {
  const url = env("ENQUIRY_SHEET_WEBHOOK_URL");
  const secret = env("ENQUIRY_SHEET_SECRET");
  if (!url || !secret) return null;

  return {
    name: "sheet",
    async send(enquiry) {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, enquiry }),
        signal: AbortSignal.timeout(15000),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !result?.ok) {
        throw new Error(`Sheet webhook failed: ${response.status} ${result?.error ?? "unexpected response"}`);
      }
    },
  };
}

/**
 * Sends the enquiry down every configured channel at once. Delivered if
 * at least one channel succeeded — an enquiry saved to the sheet isn't
 * lost just because the email bounced, and vice versa. Failures are
 * logged for the server logs.
 */
export async function deliverEnquiry(enquiry: Enquiry): Promise<"delivered" | "failed" | "not-configured"> {
  const channels = [emailChannel(), sheetChannel()].filter((channel): channel is Channel => channel !== null);
  if (channels.length === 0) {
    console.error("[enquiry] No delivery channel configured — set the SMTP_* or ENQUIRY_SHEET_* variables (see .env.example).");
    return "not-configured";
  }

  const results = await Promise.allSettled(channels.map((channel) => channel.send(enquiry)));
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`[enquiry] ${channels[index].name} delivery failed:`, result.reason);
    }
  });
  return results.some((result) => result.status === "fulfilled") ? "delivered" : "failed";
}
