"use server";

import { getSupabase, makeReference } from "./supabase";

/* ------------------------------------------------------------------ *
 * Complaints
 * ------------------------------------------------------------------ */

/**
 * React 19 resets a form after its action runs. Without echoing the
 * submitted values back, a validation error would wipe everything the
 * person typed — including a long complaint description. The forms read
 * `values` back as defaultValue so nothing is lost.
 */
export type SubmittedValues = Record<string, string>;

export type ComplaintState =
  | { status: "idle" }
  | {
      status: "error";
      field?: string;
      message: string;
      values?: SubmittedValues;
    }
  | { status: "done"; reference: string };

const CATEGORIES = [
  "service",
  "governance",
  "community",
  "programme",
  "other",
] as const;

function clean(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function submitComplaint(
  _prev: ComplaintState,
  formData: FormData,
): Promise<ComplaintState> {
  // Honeypot: a real person never fills a field they cannot see.
  if (clean(formData.get("website"), 100)) {
    // Report success to the bot so it does not retry, but write nothing.
    return { status: "done", reference: makeReference() };
  }

  const subject = clean(formData.get("subject"), 200);
  const description = clean(formData.get("description"), 8000);
  const rawCategory = clean(formData.get("category"), 40);
  const category = (CATEGORIES as readonly string[]).includes(rawCategory)
    ? rawCategory
    : "other";

  const location = clean(formData.get("location"), 300);
  const name = clean(formData.get("name"), 200);
  const email = clean(formData.get("email"), 320);
  const phone = clean(formData.get("phone"), 60);
  const consent = formData.get("consent") === "on";

  const values: SubmittedValues = {
    category,
    subject,
    location,
    description,
    name,
    email,
    phone,
    consent: consent ? "on" : "",
  };

  if (!subject) {
    return { status: "error", field: "subject", message: "subject", values };
  }
  if (description.length < 20) {
    return {
      status: "error",
      field: "description",
      message: "description",
      values,
    };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "error", message: "generic", values };
  }

  const reference = makeReference();

  const { error } = await supabase.from("complaints").insert({
    reference,
    category,
    subject,
    location: location || null,
    description,
    name: name || null,
    email: email || null,
    phone: phone || null,
    consent_to_forward: consent,
    status: "received",
    locale: clean(formData.get("locale"), 5) || "en",
  });

  if (error) {
    console.error("complaint insert failed", error.message);
    return { status: "error", message: "generic", values };
  }

  return { status: "done", reference };
}

/* ------------------------------------------------------------------ *
 * Tracking
 * ------------------------------------------------------------------ */

export type TrackedComplaint = {
  reference: string;
  subject: string;
  category: string;
  status: string;
  createdAt: string;
  note: string | null;
};

export type TrackState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "found"; complaint: TrackedComplaint };

export async function trackComplaint(
  _prev: TrackState,
  formData: FormData,
): Promise<TrackState> {
  const reference = clean(formData.get("reference"), 40).toUpperCase();

  if (!reference) {
    return { status: "error", message: "code" };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "error", message: "notFound" };
  }

  // Goes through the security-definer RPC, which returns a fixed narrow
  // column list. The reporter's name, email and phone are not in it and
  // cannot be projected out of it, so a leaked reference code cannot
  // expose who filed the complaint.
  const { data, error } = await supabase
    .rpc("track_complaint", { ref: reference })
    .maybeSingle<{
      reference: string;
      subject: string;
      category: string;
      status: string;
      created_at: string;
      public_note: string | null;
    }>();

  if (error || !data) {
    return { status: "error", message: "notFound" };
  }

  return {
    status: "found",
    complaint: {
      reference: data.reference,
      subject: data.subject,
      category: data.category,
      status: data.status,
      createdAt: data.created_at,
      note: data.public_note ?? null,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Membership / volunteer / partnership applications
 * ------------------------------------------------------------------ */

export type ApplicationState =
  | { status: "idle" }
  | {
      status: "error";
      field?: string;
      message: string;
      values?: SubmittedValues;
    }
  | { status: "done" };

const INTENTS = ["inquiry", "general", "life", "volunteer", "partner"] as const;

/**
 * Only membership asks for the Clause 7 declaration. Someone asking a
 * question is not applying to join, and must not be made to declare their
 * political affiliations to send an email.
 */
const MEMBERSHIP_INTENTS = ["general", "life"] as const;

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  if (clean(formData.get("website"), 100)) {
    return { status: "done" };
  }

  const name = clean(formData.get("name"), 200);
  const email = clean(formData.get("email"), 320);
  const phone = clean(formData.get("phone"), 60);
  const rawIntent = clean(formData.get("intent"), 40);
  const intent = (INTENTS as readonly string[]).includes(rawIntent)
    ? rawIntent
    : "general";

  const address = clean(formData.get("address"), 300);
  const organisation = clean(formData.get("organisation"), 300);
  const interest = clean(formData.get("interest"), 4000);
  const subject = clean(formData.get("subject"), 300);
  const declared = formData.get("declaration") === "on";
  const needsDeclaration = (MEMBERSHIP_INTENTS as readonly string[]).includes(
    intent,
  );

  const values: SubmittedValues = {
    intent,
    name,
    email,
    phone,
    address,
    organisation,
    interest,
    subject,
    declaration: declared ? "on" : "",
  };

  if (!name) {
    return { status: "error", field: "name", message: "name", values };
  }
  if (!email && !phone) {
    return { status: "error", field: "email", message: "contact", values };
  }
  if (needsDeclaration && !declared) {
    return {
      status: "error",
      field: "declaration",
      message: "declaration",
      values,
    };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "error", message: "generic", values };
  }

  const { error } = await supabase.from("applications").insert({
    intent,
    name,
    email: email || null,
    phone: phone || null,
    address: address || null,
    organisation: organisation || null,
    interest: interest || null,
    subject: subject || null,
    declaration_accepted: needsDeclaration && declared,
    status: "new",
    locale: clean(formData.get("locale"), 5) || "en",
  });

  if (error) {
    console.error("application insert failed", error.message);
    return { status: "error", message: "generic", values };
  }

  return { status: "done" };
}
