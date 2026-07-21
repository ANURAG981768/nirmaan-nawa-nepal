import "server-only";
import { ORG } from "./org";

/**
 * Email notifications to the organisation via Resend (https://resend.com).
 *
 * Reliable, direct-to-inbox delivery. Setup is one env var:
 *
 *   RESEND_API_KEY  — from resend.com (sign up WITH the org's own Gmail so,
 *                     with no custom domain, Resend still delivers to it)
 *   NOTIFY_FROM     — optional; defaults to Resend's shared sender.
 *
 * If RESEND_API_KEY is not set, these do nothing and return false — the
 * complaint is still saved and readable in the admin inbox. Email is a
 * convenience on top, never the only path.
 */

const ENDPOINT = "https://api.resend.com/emails";

function esc(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const CATEGORY_LABEL: Record<string, string> = {
  service: "Public service / local government",
  governance: "Governance, policy or a rule",
  community: "Community problem",
  programme: "Feedback on our work",
  other: "Other",
};

const INTENT_LABEL: Record<string, string> = {
  inquiry: "Question / enquiry",
  general: "General membership",
  life: "Life membership",
  volunteer: "Volunteer",
  partner: "Partnership",
};

/**
 * Google Apps Script webhook: the script runs as the organisation's own
 * Google account and emails the complaint from that address to itself —
 * Google to Google, so it always lands. Set APPS_SCRIPT_URL (and optionally
 * APPS_SCRIPT_TOKEN to stop anyone else POSTing to it).
 */
async function sendViaScript(
  url: string,
  opts: { subject: string; html: string; replyTo?: string },
): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: process.env.APPS_SCRIPT_TOKEN || "",
        subject: opts.subject,
        html: opts.html,
        replyTo: opts.replyTo || "",
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("apps script failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("apps script error", err);
    return false;
  }
}

async function send(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const script = process.env.APPS_SCRIPT_URL;
  if (script) {
    return sendViaScript(script, opts);
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("No email transport set — use the admin inbox");
    return false;
  }
  const from =
    process.env.NOTIFY_FROM || "Nirman Nawa Nepal <onboarding@resend.dev>";
  try {
    const res = await fetch(ENDPOINT, {
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
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("resend failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("resend error", err);
    return false;
  }
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 14px 6px 0;color:#59617a;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#101f3d">${value}</td></tr>`;
}

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
  attachmentUrls: string[];
}): Promise<boolean> {
  const anonymous = !input.name && !input.email && !input.phone;
  const files = input.attachmentUrls
    .map(
      (u, i) =>
        `<a href="${esc(u)}" style="color:#bd5334">📎 Photo/video ${i + 1}</a>`,
    )
    .join("&nbsp;&nbsp;");

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
    ${files ? `<p style="font-size:14px">${files}</p>` : ""}
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;width:100%">
      ${
        anonymous
          ? row("Reporter", "<i>Filed anonymously</i>")
          : (input.name ? row("Name", esc(input.name)) : "") +
            (input.email
              ? row("Email", `<a href="mailto:${esc(input.email)}" style="color:#bd5334">${esc(input.email)}</a>`)
              : "") +
            (input.phone ? row("Phone", esc(input.phone)) : "")
      }
      ${row("Consent to forward", input.consent ? "Yes" : "No")}
    </table>
    <p style="font-size:12px;color:#8a8f9c;margin-top:22px;border-top:1px solid #e3ded2;padding-top:12px">
      Sent from the Nirman Nawa Nepal website. Full inbox: open the site's admin page.
    </p>
  </div>`;

  return send({
    subject: `New complaint: ${input.subject} [${input.reference}]`,
    html,
    replyTo: input.email || undefined,
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
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#101f3d">
    <div style="border-bottom:3px solid #bd5334;padding-bottom:10px;margin-bottom:18px">
      <div style="font-size:12px;letter-spacing:2px;color:#bd5334;text-transform:uppercase">New message from the website</div>
      <h2 style="margin:6px 0 0;font-size:20px">${esc(INTENT_LABEL[input.intent] || input.intent)}</h2>
    </div>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;width:100%">
      ${row("Name", esc(input.name))}
      ${input.email ? row("Email", `<a href="mailto:${esc(input.email)}" style="color:#bd5334">${esc(input.email)}</a>`) : ""}
      ${input.phone ? row("Phone", esc(input.phone)) : ""}
      ${input.address ? row("Lives in", esc(input.address)) : ""}
      ${input.organisation ? row("Organisation", esc(input.organisation)) : ""}
      ${input.subject ? row("Question", esc(input.subject)) : ""}
    </table>
    ${
      input.interest
        ? `<div style="margin:18px 0;padding:14px;background:#f4f1ea;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6">${esc(input.interest)}</div>`
        : ""
    }
  </div>`;

  return send({
    subject: `New ${INTENT_LABEL[input.intent] || "message"}: ${input.name}`,
    html,
    replyTo: input.email || undefined,
  });
}
