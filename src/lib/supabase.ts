import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * The service-role key never reaches the browser — it is read here, inside
 * modules that only ever run in server actions. If the environment is not
 * configured the factory returns null rather than throwing, so the site
 * still builds and renders; the forms then tell people to email instead of
 * failing silently.
 */

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

/**
 * Bikram Sambat year for the current date.
 *
 * Only the year is needed (for reference codes), so the approximation is
 * exact enough: the BS new year falls in the second week of April, so
 * dates before ~14 April belong to AD + 56, and dates after to AD + 57.
 */
export function bsYear(date = new Date()): number {
  const ad = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-indexed
  const day = date.getUTCDate();
  const beforeNewYear = month < 3 || (month === 3 && day < 14);
  return beforeNewYear ? ad + 56 : ad + 57;
}

/** NNN-2083-04F7A1 — short enough to write down, long enough not to guess. */
export function makeReference(): string {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `NNN-${bsYear()}-${hex}`;
}
