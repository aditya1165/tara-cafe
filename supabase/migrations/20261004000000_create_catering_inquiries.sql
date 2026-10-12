create extension if not exists pgcrypto;

create table if not exists public.catering_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  phone text not null check (char_length(phone) between 7 and 40),
  preferred_contact text not null check (preferred_contact in ('email', 'phone', 'text')),
  event_date date not null,
  event_type text not null check (event_type in ('wedding', 'corporate', 'private-supper', 'other')),
  event_location text not null check (char_length(event_location) between 2 and 300),
  guest_count integer not null check (guest_count between 1 and 5000),
  budget_range text check (
    budget_range is null or budget_range in ('under-1000', '1000-2500', '2500-5000', '5000-plus')
  ),
  service_style text check (
    service_style is null or service_style in ('buffet', 'plated', 'family-style', 'drop-off')
  ),
  dietary_needs text check (dietary_needs is null or char_length(dietary_needs) <= 2000),
  event_details text not null check (char_length(event_details) between 10 and 5000),
  contact_consent boolean not null check (contact_consent = true),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'booked', 'declined')),
  internal_notes text
);

alter table public.catering_inquiries enable row level security;

revoke all on table public.catering_inquiries from anon, authenticated;
grant all on table public.catering_inquiries to service_role;

comment on table public.catering_inquiries is
  'Private catering leads submitted through the Tara Cafe inquiry form.';
