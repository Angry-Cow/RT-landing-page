// ─── Supabase Browser-Safe Stub ───────────────────────────────────────────────
// @supabase/supabase-js uses import.meta internally which Sandpack's bundler
// cannot evaluate at dev-preview time. This lightweight stub hits the Supabase
// REST API directly via fetch — identical runtime behaviour, no bundler issues.
//
// Anima injects __ANIMA_SUPABASE_URL__ / __ANIMA_SUPABASE_ANON_KEY__ at
// publish/deploy time. In the Sandpack preview those tokens are NOT replaced,
// so DB writes are silently skipped (emails still go out).

// Anima injects these tokens at publish/deploy time.
// In the Sandpack preview they remain as-is and DB writes are silently skipped.
const SUPABASE_URL = "__ANIMA_SUPABASE_URL__";
const SUPABASE_ANON_KEY = "__ANIMA_SUPABASE_ANON_KEY__";

// True when credentials are real (not an unresolved placeholder)
const DB_CONFIGURED =
  !!SUPABASE_URL &&
  !SUPABASE_URL.startsWith("__ANIMA_") &&
  SUPABASE_URL.startsWith("https://");

if (!DB_CONFIGURED) {
  console.info(
    "[RangeTracker] Supabase credentials not yet injected — DB writes will be skipped in the preview. Emails will still send.",
  );
} else {
  console.info("[RangeTracker] Supabase connected:", SUPABASE_URL);
}

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
      // Preview mode — skip silently, treat as success so the form still works
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

export const supabase = { from };
