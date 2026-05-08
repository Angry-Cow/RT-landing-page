<instructions>
This file tracks your database decisions, conventions, and preferences.
It does NOT store the current schema — entity definitions are injected per-request automatically.
Instead, use this file to remember:
  1. Data storage preferences (e.g., "store image references as storage paths, not full URLs")
  2. Schema conventions (e.g., "always use soft deletes", "snake_case column names", "every table gets createdAt/updatedAt")
  3. Anti-patterns to avoid (e.g., "don't store computed values", "no direct user-to-user foreign keys")
  4. Data flow decisions (e.g., "auth state comes from session, not DB lookup per request")
  5. Indexing and query patterns worth remembering

When the user makes a database-related decision, proactively capture the *why* here so you don't forget it.
Keep entries sorted in DESC order (newest first) so recent decisions stay in prompt context if the file is truncated.
</instructions>

<database>
# Database Decisions & Conventions

## 2026-05-07 – Anima-managed Supabase (feedback_submissions)
- Provider: Anima injects `__ANIMA_SUPABASE_URL__` and `__ANIMA_SUPABASE_ANON_KEY__` at runtime
- `src/supabaseClient.ts` is a fetch-based stub (NOT the official SDK) because `@supabase/supabase-js` uses `import.meta` which crashes Sandpack's bundler
- Table: `public.feedback_submissions` — id (uuid), name, location, email, comments, created_at
- RLS: anon INSERT allowed (public form); authenticated SELECT allowed (admin)
- Migration: `supabase/migrations/001_feedback_submissions.sql`
- Stub API surface: `supabase.from(table).insert([rows])` — matches official SDK call signature
- Convention: snake_case column names, uuid PKs, timestamptz for dates
- Anti-pattern: do NOT use the official supabase-js SDK in this Sandpack project — bundler will crash
</database>
