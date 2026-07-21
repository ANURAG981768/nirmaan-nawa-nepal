import "server-only";
import { ORG } from "./org";

/**
 * Email notifications.
 *
 * Uses Resend (https://resend.com) over its HTTP API — no SDK, no extra
 * dependency. Configure two env vars:
 *
 *   RESEND_API_KEY   — from the Resend dashboard
 *   NOTIFY_FROM      — optional; defaults to Resend's shared sender.
 *
 * With a free Resend account signed up under the organisation's own Gmail,
 * mail to that same Gmail is delivered without needing a verified domain.
 *
 * If RESEND_API_KEY is not set, these functions do nothing and return
 * false — the complaint is still saved, the form still works. Email is a
 * notification on top, never a gate.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_ATTACH_BYTES = 18 * 1024 * 1024; // keep the whole email under Gmail's 25MB

export type Attachment = { filename: string; content: string };

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function send(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return false;
  }
  const from =
    process.env.NOTIFY_FROM || "Nirman Nawa Nepal <onboarding@resend.dev>";

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [ORG.email],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        ...(opts.attachments?.length
          ? { attachments: opts.attachments }
          : {}),
      }),
      // Never let a slow mail API hang the form submission.
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) {
      console.error("resend send failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("resend send error", err);
    return false;
  }
}

/** Turn uploaded files into base64 attachments, within the size budget. */
export async function filesToAttachments(
  files: File[],
): Promise<{ attachments: Attachment[]; skipped: string[] }> {
  const attachments: Attachment[] = [];
  const skipped: string[] = [];
  let total = 0;

  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (file.size > MAX_ATTACH_BYTES || total + file.size > MAX_ATTACH_BYTES) {
      skipped.push(file.name || "attachment");
      continue;
    }
    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name || "attachment",
      content: buf.toString("base64"),
    });
    total += file.size;
  }
  return { attachments, skipped };
}

const CATEGORY_LABEL: Record<string, string> = {
  service: "Public service / local government",
  governance: "Governance, policy or a rule",
  community: "Community problem",
  programme: "Feedback on our work",
  other: "Other",
};

export async function notifyComplaint(input: {
  reference: string;
  category: string;
  subject: string;
  location: string | null;
  description: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  consent: boolean;
  attachments: Attachment[];
  skipped: string[];
}): Promise<boolean> {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#59617a;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#101f3d">${value}</td></tr>`;

  const anonymous = !input.name && !input.email && !input.phone;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#101f3d">
    <div style="border-bottom:3px solid #bd5334;padding-bottom:10px;margin-bottom:18px">
      <div style="font-size:12px;letter-spacing:2px;color:#bd5334;text-transform:uppercase">New public complaint</div>
      <h2 style="margin:6px 0 0;font-size:20px">${esc(input.subject)}</h2>
    </div>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;width:100%">
      ${row("Reference", `<b>${esc(input.reference)}</b>`)}
      ${row("Category", esc(CATEGORY_LABEL[input.category] || input.category))}
      ${input.location ? row("Location", esc(input.location)) : ""}
    </table>
    <div style="margin:18px 0;padding:14px;background:#f4f1ea;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6">${esc(
      input.description,
    )}</div>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;width:100%">
      ${
        anonymous
          ? row("Reporter", "<i>Filed anonymously — no contact details given</i>")
          : row("Name", esc(input.name || "—")) +
            (input.email
              ? row("Email", `<a href="mailto:${esc(input.email)}">${esc(input.email)}</a>`)
              : "") +
            (input.phone ? row("Phone", esc(input.phone)) : "")
      }
      ${row(
        "Consent to forward",
        input.consent
          ? "Yes — may take this to the responsible office"
          : "Not given",
      )}
    </table>
    ${
      input.attachments.length
        ? `<p style="font-size:13px;color:#59617a;margin-top:16px">📎 ${input.attachments.length} file(s) attached to this email.</p>`
        : ""
    }
    ${
      input.skipped.length
        ? `<p style="font-size:13px;color:#a5462b;margin-top:8px">Note: ${esc(
            input.skipped.join(", "),
          )} was too large to attach (over 18&nbsp;MB). Ask the reporter to send it another way if needed.</p>`
        : ""
    }
    <p style="font-size:12px;color:#8a8f9c;margin-top:22px;border-top:1px solid #e3ded2;padding-top:12px">
      Sent automatically from the Nirman Nawa Nepal website. Reply to this email only if the reporter gave an address above.
    </p>
  </div>`;

  return send({
    subject: `New complaint: ${input.subject} [${input.reference}]`,
    html,
    replyTo: input.email || undefined,
    attachments: input.attachments,
  });
}

export async function notifyApplication(input: {
  intent: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  organisation: string | null;
  interest: string | null;
  subject: string | null;
}): Promise<boolean> {
  const INTENT_LABEL: Record<string, string> = {
    inquiry: "Question / enquiry",
    general: "General membership",
    life: "Life membership",
    volunteer: "Volunteer",
    partner: "Partnership",
  };
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#59617a;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#101f3d">${value}</td></tr>`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#101f3d">
    <div style="border-bottom:3px solid #bd5334;padding-bottom:10px;margin-bottom:18px">
      <div style="font-size:12px;letter-spacing:2px;color:#bd5334;text-transform:uppercase">New message from the website</div>
      <h2 style="margin:6px 0 0;font-size:20px">${esc(
        INTENT_LABEL[input.intent] || input.intent,
      )}</h2>
    </div>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;width:100%">
      ${row("Name", esc(input.name))}
      ${input.email ? row("Email", `<a href="mailto:${esc(input.email)}">${esc(input.email)}</a>`) : ""}
      ${input.phone ? row("Phone", esc(input.phone)) : ""}
      ${input.address ? row("Lives in", esc(input.address)) : ""}
      ${input.organisation ? row("Organisation", esc(input.organisation)) : ""}
      ${input.subject ? row("Question", esc(input.subject)) : ""}
    </table>
    ${
      input.interest
        ? `<div style="margin:18px 0;padding:14px;background:#f4f1ea;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6">${esc(
            input.interest,
          )}</div>`
        : ""
    }
    <p style="font-size:12px;color:#8a8f9c;margin-top:22px;border-top:1px solid #e3ded2;padding-top:12px">
      Sent automatically from the Nirman Nawa Nepal website.
    </p>
  </div>`;

  return send({
    subject: `New ${INTENT_LABEL[input.intent] || "message"}: ${input.name}`,
    html,
    replyTo: input.email || undefined,
  });
}
