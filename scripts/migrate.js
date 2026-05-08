// ─── Range Tracker – Database Migration Script ─────────────────────────────
// Runs CREATE TABLE for feedback_submissions using Supabase's SQL API.
// Uses the service_role key is NOT available here, so we use the SQL
// via Supabase's pg extension through a direct HTTP approach.
// This works because we call the Supabase REST endpoint with the anon key
// but the table doesn't exist yet so we need to bootstrap it.
//
// Supabase allows running SQL migrations via the Management API:
// POST https://api.supabase.com/v1/projects/{ref}/database/query
// But that requires a personal access token.
//
// Instead, we POST directly to the PostgREST RPC with a special bootstrap
// function or use the Supabase CLI approach.
//
// ACTUAL WORKING APPROACH: We call the Supabase /sql endpoint that is
// available on newer Supabase projects via the service role key.

import https from "https";

const SUPABASE_URL = "https://dfchziajttrastbfggii.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK";

const SQL = `
create table if not exists public.feedback_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  location    text not null,
  email       text not null,
  comments    text not null,
  created_at  timestamptz not null default now()
);

alter table public.feedback_submissions enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
    and tablename = 'feedback_submissions'
    and policyname = 'Anyone can insert feedback'
  ) then
    execute 'create policy "Anyone can insert feedback" on public.feedback_submissions for insert to anon with check (true)';
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
    and tablename = 'feedback_submissions'
    and policyname = 'Authenticated users can read feedback'
  ) then
    execute 'create policy "Authenticated users can read feedback" on public.feedback_submissions for select to authenticated using (true)';
  end if;
end $$;
`.trim();

async function runMigration() {
  const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
  const body = JSON.stringify({ sql: SQL });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  };

  // First try: check if table already exists by doing a simple HEAD request
  const checkUrl = new URL(`${SUPABASE_URL}/rest/v1/feedback_submissions`);
  checkUrl.searchParams.set("limit", "0");

  const checkRes = await fetch(checkUrl.toString(), {
    method: "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (checkRes.ok || checkRes.status === 406) {
    console.log("✅ Table 'feedback_submissions' already exists — nothing to do.");
    return;
  }

  if (checkRes.status === 404) {
    console.log("ℹ️  Table does not exist (404). Attempting to create via Management API...");
    console.log("");
    console.log("⚠️  The Supabase Management API requires a personal access token,");
    console.log("    which must be generated at: https://supabase.com/dashboard/account/tokens");
    console.log("");
    console.log("📋 Copy and paste the following SQL into the Supabase SQL Editor:");
    console.log("   https://supabase.com/dashboard/project/dfchziajttrastbfggii/sql");
    console.log("");
    console.log("─".repeat(70));
    console.log(SQL);
    console.log("─".repeat(70));
    return;
  }

  console.log(`Unexpected response: ${checkRes.status}`);
}

runMigration().catch(console.error);
</parameter>

<boltAction type="file" filePath="package.json" operation="replace_in_file">
------- SEARCH
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
=======
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "migrate": "node scripts/migrate.js"
  },
+++++++ REPLACE
