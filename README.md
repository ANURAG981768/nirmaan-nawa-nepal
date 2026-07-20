# निर्माण नव नेपाल · Nirmaan Nawa Nepal

Website for Nirmaan Nawa Nepal (Build New Nepal), a registered non-profit
civic organisation in Kageshwari Manohara–6, Kathmandu.

Bilingual (English / नेपाली), with a public complaints channel that accepts
anonymous reports and issues a trackable reference code.

## Stack

- Next.js (App Router) + TypeScript
- Supabase (Postgres) for complaints and membership applications
- No CSS framework beyond Tailwind's reset — the design system is hand-written
  in `src/app/globals.css`

## Design

The layout system is built on the **शिरोरेखा**, the horizontal headline
stroke that Devanagari letters hang beneath. Every section hangs from a
full-bleed rule with short ticks descending from it. Latin type sits on a
baseline; Devanagari hangs from a headline — the page is built the Devanagari
way, because the organisation is.

- **Display:** Tiro Devanagari Hindi — a Devanagari-first serif with a Latin
  companion, so the Nepali is not bolted onto a Latin design. One weight, by
  design: hierarchy comes from size and the rules, not from weight.
- **Body:** Mukta (Ek Type), built for Devanagari and Latin together.
- **Records:** IBM Plex Mono — registration numbers, clause citations,
  complaint reference codes. Things that are records should read as records.
- **Colour:** the deep indigo of the Nepal map in the logo is dominant; the
  terracotta of the figures is a restrained accent only.

Font CSS variables are named `--font-tiro` / `--font-mukta` / `--font-plex`
and applied to `<html>`, **not** `<body>`. Both details matter: Tailwind v4
already defines `--font-sans`/`--font-mono` on `:root` and would shadow them,
and a `var()` inside a `:root` declaration cannot see a variable defined on
`<body>`.

## Content rules

`src/lib/org.ts` holds only facts taken from official documents — the
registration certificate, the PAN certificate, and the विधान २०८२. Nothing
goes in that file that cannot be pointed at in one of those documents.

Where the organisation has no real material yet (Working Committee names,
published papers), the site says so plainly. It does not invent achievements,
statistics, or people. For an organisation whose purpose is scrutinising
other people's claims, that is not optional.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

### Database

Run `supabase/migrations/0001_init.sql` against the Supabase project (SQL
Editor, or `supabase db push`).

Both tables have Row Level Security enabled **with no policies**, so the anon
key cannot read or write them. All access goes through server actions using
the service-role key. Complaint reporters may be anonymous, and their
identity must never be reachable from a browser. The tracking lookup returns
only subject, category, status and date — never the reporter's name, email or
phone — so a leaked reference code cannot expose who filed it.

### Environment variables

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel + local | Canonical URLs, sitemap, OG tags |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + local | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel + local | **Server only.** Bypasses RLS. Never prefix with `NEXT_PUBLIC_` |

If Supabase is not configured the site still builds and renders; the forms
report a clear error instead of failing silently.

## Routes

`/` redirects to `/en`, or to `/ne` when the browser asks for Nepali first.

| Path | Page |
| --- | --- |
| `/[locale]` | Home |
| `/[locale]/about` | About, governance, finances, registration table |
| `/[locale]/programs` | Programmes |
| `/[locale]/publications` | Publications |
| `/[locale]/complaints` | File a complaint + track one by reference code |
| `/[locale]/join` | Membership tiers, eligibility, application form |
| `/[locale]/contact` | Contact and verification details |

## Still to do

- Working Committee names and photographs (`about.teamPending` in
  `src/lib/content.ts`)
- First publications
- An admin view for reading complaints and applications — currently they are
  read in the Supabase table editor
- Confirm the real domain and set `NEXT_PUBLIC_SITE_URL`
