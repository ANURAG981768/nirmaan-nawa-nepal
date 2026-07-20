-- निर्माण नव नेपाल — complaints and applications
--
-- Both tables are written only by server actions using the service-role
-- key. Row Level Security is on with no public policies, so the anon key
-- (and therefore anything running in a browser) can neither read nor
-- write. Complaint reporters may be anonymous, and their identity must
-- not be reachable from the client under any circumstances.

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------
-- complaints
-- ------------------------------------------------------------------

create table if not exists public.complaints (
  id                  uuid primary key default gen_random_uuid(),
  reference           text not null unique,
  category            text not null default 'other'
                        check (category in ('service','governance','community','programme','other')),
  subject             text not null,
  location            text,
  description         text not null,

  -- All optional: a complaint may be filed with no identity at all.
  name                text,
  email               text,
  phone               text,
  consent_to_forward  boolean not null default false,

  status              text not null default 'received'
                        check (status in ('received','reviewing','forwarded','resolved','closed')),
  -- Shown to anyone holding the reference code. Keep it free of names.
  public_note         text,
  -- Never shown publicly.
  internal_note       text,

  locale              text not null default 'en',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists complaints_reference_idx on public.complaints (reference);
create index if not exists complaints_status_idx on public.complaints (status, created_at desc);

alter table public.complaints enable row level security;
-- No policies by design: only the service role can reach this table.

-- ------------------------------------------------------------------
-- applications (membership, volunteering, partnership)
-- ------------------------------------------------------------------

create table if not exists public.applications (
  id                    uuid primary key default gen_random_uuid(),
  intent                text not null default 'general'
                          check (intent in ('general','life','volunteer','partner')),
  name                  text not null,
  email                 text,
  phone                 text,
  address               text,
  organisation          text,
  interest              text,
  -- Clause 7 declaration, including not belonging to a political party.
  declaration_accepted  boolean not null default false,
  status                text not null default 'new'
                          check (status in ('new','contacted','accepted','declined')),
  decline_reason        text,   -- the constitution requires a reason be given
  internal_note         text,
  locale                text not null default 'en',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists applications_status_idx on public.applications (status, created_at desc);

alter table public.applications enable row level security;

-- ------------------------------------------------------------------
-- keep updated_at honest
-- ------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists complaints_touch on public.complaints;
create trigger complaints_touch
  before update on public.complaints
  for each row execute function public.touch_updated_at();

drop trigger if exists applications_touch on public.applications;
create trigger applications_touch
  before update on public.applications
  for each row execute function public.touch_updated_at();
