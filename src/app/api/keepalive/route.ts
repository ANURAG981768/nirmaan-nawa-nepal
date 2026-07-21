import { getSupabase } from "@/lib/supabase";

/**
 * A once-a-day ping (Vercel Cron, see vercel.json) that runs a trivial query
 * so the free Supabase project never pauses for inactivity. Uses the
 * security-definer RPC, which executes a real query regardless of RLS.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return Response.json({ ok: false, reason: "no-db" });
  }
  try {
    await supabase.rpc("track_complaint", { ref: "keepalive-ping" });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("keepalive failed", err);
    return Response.json({ ok: false });
  }
}
