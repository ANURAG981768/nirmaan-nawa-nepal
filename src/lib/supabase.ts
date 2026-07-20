import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * This deliberately uses the publishable key, not a service-role key.
 * The database is locked down so the publishable key can do exactly two
 * things and nothing else:
 *
 *   - INSERT into complaints and applications (RLS insert policies)
 *   - call track_complaint(), which returns a fixed narrow column list
 *
 * It cannot SELECT either table. So even if this key leaked, no one could
 * read a complaint, and no one could learn who filed one. There is no
 * service-role key in this application at all.
 *
 * The key is still kept out of the browser (no NEXT_PUBLIC_ prefix) so all
 * writes go through the server actions and their validation and honeypot.
 */

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
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
