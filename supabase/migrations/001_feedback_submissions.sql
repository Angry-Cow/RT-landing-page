-- Range Tracker™ – feedback_submissions table
-- Stores every contact form submission from the landing page.

create table if not exists public.feedback_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  location    text not null,
  email       text not null,
  comments    text not null,
  created_at  timestamptz not null default now()
);

-- Allow anonymous inserts (public landing page form)
alter table public.feedback_submissions enable row level security;

create policy "Anyone can insert feedback"
  on public.feedback_submissions
  for insert
  to anon
  with check (true);

-- Only authenticated users (admin) can read submissions
create policy "Authenticated users can read feedback"
  on public.feedback_submissions
  for select
  to authenticated
  using (true);
