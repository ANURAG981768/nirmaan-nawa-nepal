import "server-only";
import { ORG } from "./org";

/**
 * Email notifications to the organisation — no account, no API key, no app
 * password. Uses FormSubmit (https://formsubmit.co), which relays form
 * submissions to an email address.
 *
 * The only one-time step: the very first submission triggers a "confirm
 * your email" message to the organisation's inbox; clicking it once
 * activates delivery forever. After that every form lands in the inbox.
 *
 * Email never gates a form: if the relay is slow or down, the complaint is
 * already saved to the database and the reporter already has the reference.
 */

const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(ORG.email)}`;

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

async function post(fields: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ _captcha: "false", _template: "table", ...fields }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) {
      console.error("formsubmit failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("formsubmit error", err);
    return false;
  }
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
  const fields: Record<string, string> = {
    _subject: `New complaint: ${input.subject} [${input.reference}]`,
    Reference: input.reference,
    Category: CATEGORY_LABEL[input.category] || input.category,
    Subject: input.subject,
    Location: input.location || "—",
    Description: input.description,
    Reporter: anonymous ? "Filed anonymously" : input.name || "—",
    Email: input.email || "—",
    Phone: input.phone || "—",
    "Consent to forward": input.consent ? "Yes" : "No",
    "Photos / videos": input.attachmentUrls.length
      ? input.attachmentUrls.join("\n")
      : "None attached",
  };
  if (input.email) fields._replyto = input.email;
  return post(fields);
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
  const fields: Record<string, string> = {
    _subject: `New ${INTENT_LABEL[input.intent] || "message"}: ${input.name}`,
    Type: INTENT_LABEL[input.intent] || input.intent,
    Name: input.name,
    Email: input.email || "—",
    Phone: input.phone || "—",
    "Lives in": input.address || "—",
    Organisation: input.organisation || "—",
    Question: input.subject || "—",
    Message: input.interest || "—",
  };
  if (input.email) fields._replyto = input.email;
  return post(fields);
}
