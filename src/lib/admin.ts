"use server";

import { getSupabase } from "./supabase";

export type AdminComplaint = {
  reference: string;
  category: string;
  subject: string;
  location: string | null;
  description: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  consent_to_forward: boolean;
  attachment_urls: string[];
  status: string;
  public_note: string | null;
  created_at: string;
};

export type AdminApplication = {
  intent: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  organisation: string | null;
  interest: string | null;
  subject: string | null;
  status: string;
  created_at: string;
};

export type AdminData =
  | { ok: false }
  | {
      ok: true;
      complaints: AdminComplaint[];
      applications: AdminApplication[];
    };

export async function loadAdmin(password: string): Promise<AdminData> {
  const supabase = getSupabase();
  if (!supabase || !password) return { ok: false };
  const { data, error } = await supabase.rpc("admin_dashboard", {
    pw: password,
  });
  if (error || !data || data.ok !== true) return { ok: false };
  return {
    ok: true,
    complaints: (data.complaints ?? []) as AdminComplaint[],
    applications: (data.applications ?? []) as AdminApplication[],
  };
}

export async function setComplaintStatus(
  password: string,
  reference: string,
  status: string,
  note: string,
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase || !password) return false;
  const { data, error } = await supabase.rpc("admin_set_status", {
    pw: password,
    ref: reference,
    new_status: status,
    note,
  });
  if (error) return false;
  return data === true;
}
