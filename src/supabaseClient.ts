// ─── Supabase Browser-Safe Client ────────────────────────────────────────────
// Uses a lightweight fetch-based stub instead of @supabase/supabase-js to
// avoid the import.meta bundler issue in Sandpack.
// Credentials are injected at build time via vite.config.ts `define` block
// so no import.meta syntax ever reaches the Sandpack bundler.

// Credentials are hardcoded here as string literals so Sandpack's bundler
// can read them directly without needing Vite's define substitution.
const SUPABASE_URL = "https://dfchziajttrastbfggii.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmY2h6aWFqdHRyYXN0YmZnZ2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMDExODAsImV4cCI6MjA5Mzc3NzE4MH0.1qKgym2B4Y3bv8Vx1lWE4oZg0nYT_m89i02n3J794cc";

const DB_CONFIGURED =
  !!SUPABASE_URL &&
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("your-project-ref") &&
  !!SUPABASE_ANON_KEY &&
  !SUPABASE_ANON_KEY.includes("your-anon-public-key") &&
  !SUPABASE_ANON_KEY.includes("placeholder");

if (!DB_CONFIGURED) {
  console.warn(
    "[RangeTracker] Supabase credentials not set — update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. DB writes will be skipped.",
  );
} else {
  console.info("[RangeTracker] Supabase connected:", SUPABASE_URL);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface InsertResult {
  data: unknown[] | null;
  error: { message: string } | null;
}

interface QueryBuilder {
  insert: (rows: Record<string, unknown>[]) => Promise<InsertResult>;
  select: (cols?: string) => QueryBuilder;
  eq: (col: string, val: unknown) => QueryBuilder;
  order: (col: string, opts?: { ascending?: boolean }) => QueryBuilder;
  then: (resolve: (result: InsertResult) => void) => Promise<void>;
}

// ─── Fetch-based query builder ────────────────────────────────────────────────
const from = (table: string): QueryBuilder => {
  let _method: "POST" | "GET" = "GET";
  let _body: string | undefined;
  let _params: Record<string, string> = {};

  const _headers: Record<string, string> = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const execute = async (): Promise<InsertResult> => {
    if (!DB_CONFIGURED) {
      console.warn(
        "[RangeTracker] DB write skipped — credentials not configured.",
      );
      return { data: null, error: null };
    }
    try {
      const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
      Object.entries(_params).forEach(([k, v]) => url.searchParams.set(k, v));
      const res = await fetch(url.toString(), {
        method: _method,
        headers: _headers,
        body: _body,
      });
      if (!res.ok) {
        const text = await res.text();
        return {
          data: null,
          error: { message: `HTTP ${res.status}: ${text}` },
        };
      }
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : String(err) },
      };
    }
  };

  const builder: QueryBuilder = {
    insert(rows) {
      _method = "POST";
      _body = JSON.stringify(rows);
      return execute();
    },
    select(cols = "*") {
      _method = "GET";
      _params["select"] = cols;
      return builder;
    },
    eq(col, val) {
      _params[col] = `eq.${val}`;
      return builder;
    },
    order(col, opts = {}) {
      _params["order"] = `${col}.${opts.ascending === false ? "desc" : "asc"}`;
      return builder;
    },
    then(resolve) {
      return execute().then(resolve);
    },
  };

  return builder;
};

// ─── RPC call support ─────────────────────────────────────────────────────────
interface RpcResult {
  data: unknown | null;
  error: { message: string } | null;
}

const rpc = async (
  fnName: string,
  params?: Record<string, unknown>,
): Promise<RpcResult> => {
  if (!DB_CONFIGURED) {
    console.warn(
      "[RangeTracker] DB write skipped — credentials not configured.",
    );
    return { data: null, error: null };
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params ?? {}),
    });
    if (!res.ok) {
      const text = await res.text();
      return { data: null, error: { message: `HTTP ${res.status}: ${text}` } };
    }
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : String(err) },
    };
  }
};

export const supabase = { from, rpc };
