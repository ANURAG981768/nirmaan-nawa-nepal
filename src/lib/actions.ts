"use server";

import { getSupabase, makeReference } from "./supabase";

/* ------------------------------------------------------------------ *
 * Complaints
 * ------------------------------------------------------------------ */

export type ComplaintState =
  | { status: "idle" }
  | { status: "error"; field?: string; message: string }
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

  if (!subject) {
    return { status: "error", field: "subject", message: "subject" };
  }
  if (description.length < 20) {
    return { status: "error", field: "description", message: "description" };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "error", message: "generic" };
  }

  const reference = makeReference();

  const { error } = await supabase.from("complaints").insert({
    reference,
    category,
    subject,
    location: clean(formData.get("location"), 300) || null,
    description,
    name: clean(formData.get("name"), 200) || null,
    email: clean(formData.get("email"), 320) || null,
    phone: clean(formData.get("phone"), 60) || null,
    consent_to_forward: formData.get("consent") === "on",
    status: "received",
    locale: clean(formData.get("locale"), 5) || "en",
  });

  if (error) {
    console.error("complaint insert failed", error.message);
    return { status: "error", message: "generic" };
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

  // Deliberately narrow: tracking never returns the reporter's identity,
  // so a leaked code cannot expose who filed the complaint.
  const { data, error } = await supabase
    .from("complaints")
    .select("reference, subject, category, status, created_at, public_note")
    .eq("reference", reference)
    .maybeSingle();

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
  | { status: "error"; field?: string; message: string }
  | { status: "done" };

const INTENTS = ["general", "life", "volunteer", "partner"] as const;

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

  if (!name) {
    return { status: "error", field: "name", message: "name" };
  }
  if (!email && !phone) {
    return { status: "error", field: "email", message: "contact" };
  }
  if (formData.get("declaration") !== "on") {
    return { status: "error", field: "declaration", message: "declaration" };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "error", message: "generic" };
  }

  const { error } = await supabase.from("applications").insert({
    intent,
    name,
    email: email || null,
    phone: phone || null,
    address: clean(formData.get("address"), 300) || null,
    organisation: clean(formData.get("organisation"), 300) || null,
    interest: clean(formData.get("interest"), 4000) || null,
    declaration_accepted: true,
    status: "new",
    locale: clean(formData.get("locale"), 5) || "en",
  });

  if (error) {
    console.error("application insert failed", error.message);
    return { status: "error", message: "generic" };
  }

  return { status: "done" };
}
