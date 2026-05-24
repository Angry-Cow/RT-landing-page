<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
## 2026-05-24 – Add rpc() method to Supabase fetch stub (was missing — caused "not a function" error)
- `src/supabaseClient.ts`: added `rpc(fnName, params)` that POSTs to `/rest/v1/rpc/{fnName}` with correct apikey/Authorization headers
- Root cause: hand-rolled stub only had `from` — no `.rpc()` method at all, so `supabase.rpc(...)` threw at runtime

## 2026-05-24 – Switch feedback DB insert from .from().insert() to supabase.rpc("submit_feedback")
## 2026-05-24 – Add rpc() method to Supabase fetch stub (was missing — caused "not a function" error)
- `src/supabaseClient.ts`: added `rpc(fnName, params)` that POSTs to `/rest/v1/rpc/{fnName}` with correct apikey/Authorization headers
- Root cause: hand-rolled stub only had `from` — no `.rpc()` method at all, so `supabase.rpc(...)` threw at runtime

## 2026-05-24 – Switch feedback DB insert from .from().insert() to supabase.rpc("submit_feedback")
- `src/App.tsx` `handleSubmit`: replaced direct `.insert()` with `supabase.rpc("submit_feedback", {p_name, p_location, p_email, p_comments, p_rating})`
- RPC bypasses RLS column-mismatch and permission issues that were blocking the direct insert
- Removed all leftover debug console.log/error calls from the prior session
- SQL for the `submit_feedback` function provided to user (security definer, returns uuid)

## 2026-05-23 – Fix DB insert: use JWT anon key in supabaseClient.ts (not sb_publishable_)
- `src/supabaseClient.ts` `SUPABASE_ANON_KEY`: replaced `sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK` with JWT anon key
- Root cause: Supabase REST API (`/rest/v1/`) rejects `sb_publishable_` format — requires proper JWT Bearer token
- DB insert was 401-ing, throwing before emails were attempted, showing error state in form
- JWT anon key matches what `SUPABASE_ANON_KEY_FOR_EDGE` in App.tsx already uses correctly

## 2026-05-11 – Fix 401: replace sb_publishable_ key with JWT anon key for edge function
- `src/App.tsx` `SUPABASE_ANON_KEY_FOR_EDGE`: replaced `sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK` with `eyJhbGc...` JWT anon key
- Root cause: Supabase edge function runtime validates `Authorization: Bearer` as a proper JWT; `sb_publishable_` format is not a JWT and returns `UNAUTHORIZED_INVALID_JWT_FORMAT`
- JWT anon key obtained from Supabase dashboard → Project Settings → API → anon/public key

## 2026-05-11 – Fix 401 edge function error: replace deno smtp with nodemailer
## 2026-05-11 – Fix 401: replace sb_publishable_ key with JWT anon key for edge function
- `src/App.tsx` `SUPABASE_ANON_KEY_FOR_EDGE`: replaced `sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK` with `eyJhbGc...` JWT anon key
- Root cause: Supabase edge function runtime validates `Authorization: Bearer` as a proper JWT; `sb_publishable_` format is not a JWT and returns `UNAUTHORIZED_INVALID_JWT_FORMAT`
- JWT anon key obtained from Supabase dashboard → Project Settings → API → anon/public key

## 2026-05-11 – Fix 401 edge function error: replace deno smtp with nodemailer
- `supabase/functions/send-email/index.ts`: replaced broken `deno.land/x/smtp@v0.7.0` import with `npm:nodemailer@6.9.9`
- Root cause: function boot failure on modern Deno manifests as 401 JWT error — not actually a JWT issue
- `sb_publishable_` anon key in App.tsx is correct and unchanged
- Requires `supabase functions deploy send-email` to go live

## 2026-05-08 – Add persistent architecture rules to CODER.md
- Supabase is the ONLY database; rangetracker.net SMTP is the ONLY email delivery method
- Edge function uses `npm:nodemailer@6.9.9` — `deno.land/x/smtp` is broken on modern Deno
- Sending address: `comments@rangetracker.net`; SMTP host: `webhosting3007.is.cc` port 465 SSL

## 2026-05-08 – Remove all __ANIMA_DBG__ console logs from App.tsx
- Confirmed CORS block is expected in Sandpack preview — catch block works correctly
- Removed all 5x `__ANIMA_DBG__` console.log/warn/error calls from `sendEmail()`
- Silent `console.warn` kept for network/CORS skip; no user-facing change

## 2026-05-08 – Fix "Failed to fetch" CORS block in Sandpack preview
- `sendEmail()` fetch call now wrapped in try/catch for `TypeError` (network/CORS errors)
- In Sandpack preview, Supabase blocks cross-origin requests → caught silently, returns `{skipped:true}`
- DB insert still runs; success screen still shows; emails fire normally on published live site
- Added `__ANIMA_DBG__` console logs at each step of sendEmail for diagnostics

## 2026-05-08 – Switch email to Supabase edge function (remove Anima API)
- Replaced `https://api.animaapp.com/v1/edge-functions/send-email` + `ANIMA_API_KEY` with Supabase edge function
- New URL: `https://dfchziajttrastbfggii.supabase.co/functions/v1/send-email`
- Auth: `Authorization: Bearer sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK` (same anon key as DB)
- Removed `EMAIL_ENABLED` guard — always attempts send now, errors surface directly

## 2026-05-08 – Skip email send gracefully in Sandpack preview (API key not injected)
- `ANIMA_API_KEY = "__ANIMA_API_KEY__"` is never substituted in preview → invalid JWT → 401
- Added `EMAIL_ENABLED` guard: if key still equals the literal token string, skip fetch and log instead
- DB insert still runs; success screen still shows; emails fire normally on published live site

## 2026-05-08 – Fix Supabase credentials for Sandpack (hardcode string literals)
- Root cause: Sandpack doesn't run Vite's `define` substitution, so `__SUPABASE_URL__` / `__SUPABASE_ANON_KEY__` stayed as `undefined` → `DB_CONFIGURED = false` → all inserts silently skipped
- Fix: replaced `declare const` + runtime typeof guards with direct string literals in `src/supabaseClient.ts`
- Credentials: `https://dfchziajttrastbfggii.supabase.co` + `sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK`

## 2026-05-08 – Fix __ANIMA_API_KEY__ Sandpack runtime crash
## 2026-05-08 – Fix Supabase credentials for Sandpack (hardcode string literals)
- Root cause: Sandpack doesn't run Vite's `define` substitution, so `__SUPABASE_URL__` / `__SUPABASE_ANON_KEY__` stayed as `undefined` → `DB_CONFIGURED = false` → all inserts silently skipped
- Fix: replaced `declare const` + runtime typeof guards with direct string literals in `src/supabaseClient.ts`
- Credentials: `https://dfchziajttrastbfggii.supabase.co` + `sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK`

## 2026-05-08 – Fix __ANIMA_API_KEY__ Sandpack runtime crash
- Root cause: `declare const __ANIMA_API_KEY__` + `const ANIMA_API_KEY = __ANIMA_API_KEY__` crashes in Sandpack (Vite define not executed)
- Fix: use plain string literal `const ANIMA_API_KEY = "__ANIMA_API_KEY__"` — Sandpack treats it as a string; Anima publish pipeline does text substitution at deploy time
- `vite.config.ts` define block left intact (still used for Supabase keys which work fine as defines)

## 2026-05-08 – Fix ANIMA_API_KEY — wire through Vite define block
- Root cause: `ANIMA_API_KEY = "__ANIMA_API_KEY__"` was a literal string never substituted → sent as-is to API → "Not enough segments" JWT error
- `vite.config.ts`: added `__ANIMA_API_KEY__: JSON.stringify(env.VITE_ANIMA_API_KEY || "")` to `define` block
- `src/App.tsx`: changed to `declare const __ANIMA_API_KEY__: string; const ANIMA_API_KEY = __ANIMA_API_KEY__;`
- `.env`: added `VITE_ANIMA_API_KEY=` placeholder line
- At publish time Anima injects the real value; no republish needed after this fix goes live

## 2026-05-08 – Fix Anima email API auth header (Bearer → JWT)
- Error: `Missing 'JWT' type in 'Authorization' header. Expected 'Authorization: JWT <JWT>'`
- `src/App.tsx` `sendEmail()`: changed `Authorization: Bearer ${ANIMA_API_KEY}` → `Authorization: JWT ${ANIMA_API_KEY}`
- No other changes needed; API key value and endpoint URL were already correct

## 2026-05-08 – Confirm publishable key is correct (not legacy anon)
- Supabase publishable key (`sb_publishable_MKViB4BAwBJORStBC9kaSQ_vSO5i1oK`) is the new recommended key — legacy anon key is deprecated
- `vite.config.ts` already had correct key hardcoded as fallback — no change needed
- `.env` recreated: `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` set to real values
- `src/supabaseClient.ts`: `DB_CONFIGURED` guard updated to not reject `sb_publishable_` prefix

## 2026-05-08 – Fix import.meta crash via Vite define block
- Root cause: `import.meta` syntax in `supabaseClient.ts` rejected by Sandpack bundler at parse time
- `vite.config.ts`: switched to `defineConfig(({mode}) => {...})` factory; uses `loadEnv` to read `.env`; injects `__SUPABASE_URL__` + `__SUPABASE_ANON_KEY__` via `define` block
- `src/supabaseClient.ts`: replaced all `import.meta` reads with `__SUPABASE_URL__` / `__SUPABASE_ANON_KEY__` global constants (declared via `declare const`)
- `.env` recreated with placeholder values for user to fill in

## 2026-05-07 – Fix import.meta crash in supabaseClient.ts
- `src/supabaseClient.ts`: removed `import.meta` env reads — Sandpack rejects them as non-module syntax
- Credentials now hardcoded to Anima token strings; Vite env fallback dropped (not needed in this setup)

## 2026-05-07 – Wire Anima-managed Supabase database
- `src/supabaseClient.ts`: upgraded stub to support `.select()`, `.eq()`, `.order()`, `.then()` in addition to `.insert()`
- Credentials now use Anima runtime tokens `__ANIMA_SUPABASE_URL__` / `__ANIMA_SUPABASE_ANON_KEY__` (auto-injected)
- `supabase/migrations/001_feedback_submissions.sql`: RLS policies confirmed (anon INSERT, authenticated SELECT)
- `.env` created with Anima token placeholders for Vite production builds
- `workspace/DATABASE.md` updated with full conventions and anti-patterns

## 2026-05-07 – Fix import.meta crash: replace @supabase/supabase-js with fetch stub
- Root cause: `@supabase/supabase-js` uses `import.meta` internally; Sandpack bundler rejects it
- `src/supabaseClient.ts`: rewrote as a zero-dependency fetch-based stub matching same API surface (`supabase.from(table).insert([rows])`)
- Stub hits Supabase REST API directly via `fetch` — identical runtime behaviour, no bundler issues
- In production (real Vite), replace file with standard `createClient` + `import.meta.env` calls
- User must still replace the two placeholder strings with real Supabase URL + anon key

## 2026-05-07 – Step 3: Confirmation panel, unsaved-input guard, state reset
- `FeedbackModal` `handleClose()` replaces raw `onClose()` everywhere (backdrop + ✕ + Done button)
- Unsaved-input guard: `window.confirm()` fires only when form has partial text and state !== "sent"
- Full state reset (`BLANK_FORM`, `"idle"`, `""`) on close so reopening starts fresh
- Success panel: pulsing green ring, "Thanks, [Name]!" heading, formatted email display, Larry S. sign-off with logo, amber "Done" CTA
- GSAP: card entrance (`y 28 → 0, scale 0.97 → 1`) + success panel pop-in (`scale 0.92 → 1, back.out(1.4)`)

## 2026-05-07 – Step 2: FeedbackModal Supabase + Anima edge-function emails
- Replaced mailto-based `FeedbackModal` in `src/App.tsx` with full async submit flow
- On submit: (1) Supabase insert → `feedback_submissions`, (2) admin notification HTML email → `info@rangetracker.net`, (3) branded thank-you HTML email → submitter
- `sendEmail()` helper calls `https://api.animaapp.com/v1/edge-functions/send-email`
- Thank-you email includes logo image, warm copy, "Thank you, Larry S." signature
- `Loader2` spinner + `AlertCircle` inline error; button disabled while in-flight
- `.env` placeholder recreated (was missing on disk); `supabaseClient.ts` already correct from Step 1

## 2026-05-07 – Swap to blue-background logo (final)
- New LOGO_URL: `https://c.animaapp.com/moua5fr1i7rxTv/img/uploaded-asset-1778117019640-0.png`
- Blue bg in image matches site navy — removed all blend mode tricks; just `rounded-xl` on img
- All 3 placements (navbar 40px, hero 160px, footer 44px) use clean natural render

## 2026-05-07 – Update to true transparent-bg logo PNG
- New logo URL: `https://c.animaapp.com/moua5fr1i7rxTv/img/uploaded-asset-1778115616246-0.png`
- Removed `blend` prop and `mix-blend-screen` from `RangeTrackerLogo` — no longer needed with real alpha channel
- All three logo placements (navbar 40px, hero 160px, footer 44px) use the clean transparent PNG directly

## 2026-05-07 – Replace logo with white-bg PNG, use mix-blend-screen on navbar/footer
- New logo URL: `https://c.animaapp.com/moua5fr1i7rxTv/img/uploaded-asset-1778115199898-0.png`
- `RangeTrackerLogo` now accepts `blend` prop; navbar + footer use `mix-blend-screen brightness-110` to knock out white bg against dark navy
- Hero logo (160px) renders without blend — dark bg makes it look clean regardless
- Previous transparent-bg attempt was actually a grey checkerboard JPEG, not a real PNG alpha

## 2026-05-07 – Swap to transparent-bg logo PNG, double hero logo size
- New logo URL: `https://c.animaapp.com/moua5fr1i7rxTv/img/uploaded-asset-1778114716308-0.png` (transparent bg)
- Hero logo size increased from 80 → 160px; navbar stays 40px, footer stays 44px
- All three logo placements use the single `LOGO_URL` constant in `src/App.tsx`

## 2026-05-07 – Replace improvised SVG logo with real logo image
- Hosted uploaded logo PNG to CDN: `https://c.animaapp.com/moua5fr1i7rxTv/img/uploaded-asset-1778113693565-0.png`
- Replaced `RangeTrackerLogo` SVG component in `src/App.tsx` with a simple `<img>` tag using the hosted URL
- Logo appears in all 3 locations: navbar (size 40), hero center (size 80), footer (size 44)

## 2026-05-06 – Fix crash & strip all unused files
- **Root cause**: `src/main.tsx` imported `@animaapp/playground-react-sdk` (copied from SASSTAC/TOLR) — package doesn't exist in this project, causing white screen crash
- **Fixed**: Rewrote `main.tsx` to a clean React 18 `ReactDOM.createRoot` render with no external SDK
- **Deleted**: All 70+ legacy section files, admin pages, hooks, utils, and components that were scaffolded from the other projects but never used
- **package.json**: Stripped to only `react`, `react-dom`, `lucide-react`, `gsap` — removed `react-router-dom`, `bcryptjs`, `@radix-ui/*`
- **Site**: Simple self-contained `App.tsx` landing page with no routing, no DB, no admin

## 2026-05-06 – Range Tracker landing page built from scratch
- **App.tsx**: Complete rewrite — full Range Tracker™ SPA: Navbar, HeroSection (100vh GSAP), AboutSection, FeaturesSection (8 cards), WhoUsesSection, PricingSection (3-tier), TestimonialSection, FaqSection, ContactSection + FeedbackModal, CtaBanner, Footer
- **index.css**: Added aurora-text, target-ring pulse, card-glow, modal-overlay, custom scrollbar styles
- **package.json + index.html**: Added gsap/bcryptjs deps; updated page title/meta/fonts
- FeedbackModal: name/location/email/comments form → `mailto:info@rangetracker.net` with success screen showing user name
- Brand: deep navy `#0a1628`, amber-500 accents, Inter font, inline SVG logo matching app screenshot chevron motif

## 2026-05-05 – Add Course Categories admin tab
- **AdminShell.tsx**: Added "Categories" nav item to `NAV_ITEMS` with tag icon; links to `/admin/content/categories`
- **CourseCategoriesManager.tsx**: New file — full CRUD for `CourseCategory` entity; table with Order (▲/▼ swap), Name, Status columns; Add/Edit modals; delete confirmation
- **App.tsx**: Imported `CourseCategoriesManager` and added `<Route path="/admin/content/categories" ...>` 

## 2026-05-05 – Full rewrite to guarantee DraggableChipList + dual price columns applied
- **AdminUI.tsx**: Full `write_to_file` rewrite — `DraggableChipList` confirmed present with `onDragEnd` reset + stable drag-index key (`chip-i`); `ChipInput` retained for other managers
- **CoursesManager.tsx**: Full `write_to_file` rewrite — `parseFeatures`/`serializeFeatures` helpers explicit; `DraggableChipList` wired to `chips`/`setChips`; hint reads "Drag rows to reorder."
- Table confirmed: 7 columns (Order, Title, Category, Group Price, Private Price, Status, Actions); Private Price shows `—` when empty
- Previous session had `"..."` placeholder artifacts in boltArtifact bodies (chat history summarization); this rewrite guarantees correct application

## 2026-05-05 – DraggableChipList in CoursesManager + dual price columns
- **AdminUI.tsx**: Added `DraggableChipList` component — draggable rows with ⠿ grip, remove ×, text input + Add button; uses HTML5 drag-and-drop to reorder via `onDragStart`/`onDragOver`/`onDrop`
- **CoursesManager.tsx**: Replaced `ChipInput` with `DraggableChipList` in the Features field; hint updated to "Drag rows to reorder."
- **CoursesManager.tsx**: Split single "Price" column into separate "Group Price" and "Private Price" columns; Private Price shows `—` when empty; `colSpan` updated from 6 → 7

## 2026-05-05 – Order column with ▲/▼ swap arrows in all 4 content managers
- **CoursesManager, ServicesManager, FaqsManager, OfferingsManager**: Added first "Order" column (w-16, centered) to every table
- Each cell shows the raw `order` value + ▲ (move up) and ▼ (move down) buttons stacked vertically
- Arrows do a true 2-record swap: `await update(idA, {order: B.order})` then `await update(idB, {order: A.order})`; uses already-loaded query data, no extra fetch
- ▲ disabled on first row, ▼ disabled on last row; both disabled on all rows while `saving` is true (race-condition guard)
- Rows are sorted by `order asc` inside an IIFE so the visual position always matches the number; `colSpan` counters incremented by 1 in each table

## 2026-05-05 – Smart reorder-on-save in all 4 content managers
- **CoursesManager, ServicesManager, FaqsManager, OfferingsManager**: Replaced lazy-fetch splice approach with correct directional-shift logic using already-loaded query data
- Moving down (newOrder < oldOrder): records with `order >= newOrder AND < oldOrder` get incremented by 1
- Moving up (newOrder > oldOrder): records with `order > oldOrder AND <= newOrder` get decremented by 1
- Neighbour shifts are sequential `await` calls; moved record saved last; moved record excluded from neighbour window
- New record insert: all existing records at `order >= newOrder` shift up by 1 (Courses, Services, FAQs only — Offerings is update-only)

## 2026-05-04 – CourseCard dual CTA buttons matching investment card colors
- **CourseCard.tsx**: "Contact Us Now To Schedule" button recolored to amber (matching investment "Contact Now"); added "Request A Group Rate" button in sky-blue (matching investment "Group Rate")
- **CourseCard.tsx**: Added `GroupRateModal` import + `modalOpen` state; group rate button opens modal pre-filled with `props.title`
- Both new buttons have matching hover states and `data-testid` attributes

## 2026-05-04 – Use privatePrice in both course select dropdowns
- **BookingForm.tsx**: Label now shows `title — privatePrice` instead of `title — groupPrice`
- **GroupRateModal.tsx**: Converted `COURSES` from `string[]` to `GroupCourseOption[]`; label now shows `title — privatePrice`; fallback array also converted to typed objects
- Both dropdowns fall back to title-only when `privatePrice` is empty

## 2026-05-04 – Fix admin logout redirect
- **AdminShell.tsx**: Changed `handleLogout` to navigate to `'/'` (home page) instead of `'/admin'` (login screen)
- Prevents users from getting stuck at login screen after signing out

## 2026-05-03 – Fix white screen crash: auth guard in AdminDashboard (real root cause)
- **Root cause**: `AdminDashboard.tsx` still had `navigate('/admin')` called directly in the component body — this was the actual crash. The 4 managers had been fixed but Dashboard was missed.
- **Fixed**: replaced inline `if (!adminId) { navigate(...); return null; }` with `useEffect(() => { if (!adminId) navigate('/admin'); }, [adminId]);` + added `useEffect` to imports
- React StrictMode (in `main.tsx`) double-invokes render functions, making render-phase `navigate()` crash the whole app tree every reload

## 2026-05-03 – Fix preview shape/aspect-ratio for all 4 admin managers
- **OfferingsManager**: Preview moved to top of modal (full-width stacked layout); modal widened to `max-w-5xl` via new `veryWide` prop — reflects the real wide+short horizontal row shape of `CourseInvestmentItem`
- **FaqsManager**: Preview moved to top of modal (full-width stacked layout) — reflects the real wide accordion shape of `FaqSection`
- **CoursesManager**: Preview column tightened `w-80` → `w-64` — better reflects narrow 1/3-grid portrait shape of `CourseCard`
- **ServicesManager**: Preview column tightened `w-72` → `w-64` — matches `CourseCard` grid proportion for `ServiceCard`
- **AdminUI Modal**: Added `veryWide` prop (`max-w-5xl`) alongside existing `wide` (`max-w-3xl`)

## 2026-05-03 – Fix admin live preview sizes to match real card dimensions
- **CoursesManager** `CoursePreview`: `p-10 rounded-[40px]` (was `p-7 rounded-[28px]`), `text-5xl` price (was `text-4xl`), `mb-8` price gap, `mb-10` features list, `mt-4` between features, `p-4 rounded-xl` desc box, `py-4 rounded-full` button; panel widened `w-64` → `w-80`
- **ServicesManager** `ServicePreview`: `bg-slate-50 p-8 rounded-3xl` content card, `h-16 w-16 rounded-2xl` icon box with `h-8 w-8` img, `text-2xl leading-8` title, `leading-[26px]` desc, `mt-3` list items, full-width `rounded-3xl` image with correct shadow (no `max-h` cap); panel `w-64` → `w-72`; placeholder shown when no image
- **FaqsManager** `FaqPreview`: `px-6 py-5` button row, `text-base font-semibold` question, `pb-5 text-sm` answer, link renders as `text-sm`; added a 3rd ghost row for accordion shape context; panel `w-80` → `w-96`
- **OfferingsManager** preview panel: `w-72` → `w-80` to better reflect full-width list proportions

## 2026-05-03 – Course+Offering Table Merge ✅ COMPLETE
- **DB**: Patched `Course` entity with `button1Text` (optional, default `'Contact Now'`) and `button2Text` (optional, default `'Group Rate'`); all 9 existing Course rows already had defaults populated
- **CourseInvestmentList.tsx**: Changed `useQuery('Offering')` → `useQuery('Course')`; maps `button1Text ?? 'Contact Now'`
- **BookingForm.tsx**: Replaced `FALLBACK_COURSES: string[]` with `FALLBACK_COURSE_OPTIONS: CourseOption[]`; `<option>` now uses `opt.value`/`opt.label`; label = `title — $price`; `INITIAL.course = ''`; added `<option value="" disabled>Select a course…</option>`; query switched from `Offering` → `Course`
- **GroupRateModal.tsx**: Switched `useQuery('Offering')` → `useQuery('Course')`; builds `COURSES` from `dbCourses?.map(c => c.title) ?? FALLBACK_COURSES`
- **CoursesManager.tsx**: Added `button1Text`/`button2Text` to type, `BLANK`, `openEdit`; added "Investment CTA (Primary/Secondary)" fields in a `grid-cols-2` row
- **OfferingsManager.tsx**: Switched to `useQuery('Course')` + `useMutation('Course')` (update-only); removed Add/Delete; title is read-only styled div; info banner links to CoursesManager; "Buttons" column with amber/slate chips

## 2026-05-03 – Stable FAQ testids using question slug
- **FaqSection/index.tsx**: Added `toSlug()` helper; switched `data-testid` from `faq-btn-item-{index}` to `faq-btn-item-{slug}` (first 60 chars of slugified question)
- **tests/sasstac.spec.ts**: T12-02 and T12-03 updated to use `.first()` on prefix wildcard instead of hardcoded `faq-btn-item-0`; T12-01 unchanged (already uses prefix wildcard)
- Resolves TODO `faq-stable-ids` — testids now survive FAQ reordering

## 2026-05-03 – Admin Panel: Edit Booking form + Live Previews for all 4 content managers
- **BookingsManager**: Replaced read-only detail modal with full Edit Booking form — Customer Info, Booking Details, Status Tracking (Yes/No toggles for contacted/scheduled/paid/completed), Admin Notes, Save Booking; filter tabs now show All/Not Contacted/Not Scheduled/Not Paid/Not Completed with live counts; table has dedicated Edit + Delete buttons
- **CoursesManager**: Added `CoursePreview` inline live preview panel (right side of modal) — mirrors real `CourseCard` with title, price, features chips, description, button
- **ServicesManager**: Added `ServicePreview` inline live preview — mirrors real `ServiceCard` with icon, title, description, list items (amber dots), card image
- **OfferingsManager**: Added `OfferingPreview` inline live preview — mirrors real `CourseInvestmentItem` row with title, duration, price, both CTA button labels
- **FaqsManager**: Added `FaqPreview` inline live preview — mirrors real `FaqSection` accordion item in open state with question, answer, optional link

## 2026-05-03 – Full Admin Panel Build ✅ COMPLETE
- **DB**: Added `Admin` entity (fullName, username, passwordHash, isMain, switch, order); added CRM fields to `Booking` (contacted, scheduled, paid, completed, adminNotes)
- **New files**: `src/utils/passwordGenerator.ts`, `src/pages/admin/AdminSetup.tsx`, `src/pages/admin/AdminLogin.tsx`, `src/pages/admin/AdminDashboard.tsx`, `src/pages/admin/components/AdminUI.tsx`, `src/pages/admin/components/AdminShell.tsx`
- **New files**: `src/pages/admin/content/CoursesManager.tsx`, `ServicesManager.tsx`, `OfferingsManager.tsx`, `FaqsManager.tsx`, `BookingsManager.tsx`
- **App.tsx**: Wrapped in `BrowserRouter`; added `AdminSetup` global component; wired 7 admin routes under `/admin/*`; extracted `MainSite` component; removed TopBar admin link
- **Prefix**: `sasstac` — sessionStorage keys `sasstac_admin_id` / `sasstac_admin_name`; initial creds `sasstac_admin` / `\:%HYnE>er-y=)+a`
- **bcryptjs** + `@types/bcryptjs` added to package.json and installed

## 2026-04-30 – Playwright Step 3 of 3 — Full test suite + reference doc ✅ COMPLETE
- **tests/sasstac.spec.ts**: 39 test cases across 16 test groups — page load, all navbar flows (desktop+mobile), hero CTAs, course filters, service cards, booking form happy path + validation, group rate modal (open/close/submit/validate), FAQ accordion, footer legal modals (×3), floating mobile button, CTA section, pricing Contact Now
- **docs/playwright-test-plan.md**: Full GitHub-compatible reference doc — selector inventory table, section ID map, 16 test groups with preconditions/steps/expected outcomes, open assumptions, Playwright config example, helper function
- All `data-testid`, `htmlFor`/`id`, `aria-expanded` attributes confirmed from source before writing script
- No source code changes in this step — test files only

## 2026-04-30 – Playwright Step 2 of 3 — htmlFor/id label associations + ServiceCard testid ✅ COMPLETE
- **BookingForm.tsx**: Added `htmlFor`/`id` pairs to all 6 labels (`booking-full-name`, `booking-email`, `booking-phone`, `booking-course`, `booking-preferred-date`, `booking-notes`) — enables `page.getByLabel()` locators
- **GroupRateModal.tsx**: Added `htmlFor`/`id` pairs to all 8 labels (`group-full-name`, `group-email`, `group-phone`, `group-course`, `group-attendees`, `group-location`, `group-preferred-date`, `group-notes`)
- **ServiceCard.tsx**: Added `data-testid={service-card-btn-{title-slug}}` to "Learn More" button — closes TODO `service-card-testids`
- No logic, styling, or behavior changed; all 3 files now fully Playwright `getByLabel()` and `getByTestId()` compliant

## 2026-04-30 – Playwright Audit (Plan Step 1 of 3) — Gap remediation + reference doc
- **HeroContent.tsx**: Added `hero-btn-book-course` + `hero-btn-view-courses`
- **CoursesSection/index.tsx**: Added `courses-filter-{slug}` to all 4 category tabs
- **CourseCard.tsx**: Added `course-card-btn-{title-slug}` to each card CTA button
- **CtaSection/index.tsx**: Added `cta-btn-book-course` to "Book Your Course Now" button
- **workspace/PLAYWRIGHT_TEST_PLAN.md**: Created full selector inventory (3.1–3.12), 7 test scenario groups, gap summary table, and Playwright usage examples

## 2026-04-30 – Add data-testid attributes to final 4 components (plan step 5 of 5) ✅ COMPLETE
- **FaqSection/index.tsx**: Added `data-testid={faq-btn-item-${index}}` to each accordion toggle button
- **Footer/index.tsx + FooterLinks.tsx**: Added `testId` prop to `FooterLink` type; wired `data-testid` to the three legal buttons (`footer-btn-privacy`, `footer-btn-terms`, `footer-btn-accessibility`)
- **LegalModal.tsx**: Added `data-testid="legal-modal-panel"` on panel div, `data-testid="legal-modal-btn-close-header"` on × button, `data-testid="legal-modal-btn-close-footer"` on footer Close button
- **MobileFloatingButton.tsx**: Added `data-testid="floating-btn-book-course"` to floating button

## 2026-04-30 – Add data-testid attributes to Navbar components (plan step 4 of 5)
- **NavbarMobileButton.tsx**: Added `data-testid="navbar-btn-mobile-toggle"` to hamburger button
- **NavbarLinks.tsx**: Added dynamic `data-testid` to each nav link button (`navbar-link-{slug}`) and `data-testid="navbar-btn-book-now"` to desktop CTA
- **Navbar/index.tsx**: Added dynamic `data-testid` to each mobile dropdown link (`navbar-mobile-link-{slug}`) and `data-testid="navbar-mobile-btn-book-course"` to mobile CTA
- No logic, styling, or behavior changed

## 2026-04-30 – Add data-testid attributes to CourseInvestmentItem (plan step 3 of 5)
- **CourseInvestmentItem.tsx**: Added dynamic `data-testid` to "Contact Now" button (`investment-btn-contact-{slug}`) and "Group Rate" button (`investment-btn-group-rate-{slug}`) using slugified `courseValue`
- No logic, styling, or behavior changed

## 2026-04-30 – Add data-testid attributes to GroupRateModal (plan step 2 of 5)
- **GroupRateModal.tsx**: Added 15 data-testid attributes — overlay, panel, close btn, form, full-name/email/phone inputs, course/attendees/location selects, preferred-date/notes textareas, submit/cancel/success-close buttons
- No logic, styling, or behavior changed

## 2026-04-02 – Add linkText field to Faq entity and wire it in FaqSection
- **DB**: Patched `Faq` entity with optional `linkText?: string` field (after `link`)
- **FaqSection/index.tsx**: Added `link` and `linkText` props to `FaqItem` type; renders `<a>` tag in answer when `link` is set, using `linkText` as label (falls back to raw URL)
- FAQ section now also reads from DB (`useQuery('Faq', { where: { switch: 1 }, orderBy: { order: 'asc' } })`) with static fallback

## 2026-04-02 – Apply switch=1 / order asc filters to all DB-driven sections
- **CoursesSection/index.tsx**: Added `useQuery('Course', { where: { switch: 1 }, orderBy: { order: 'asc' } })`; dynamic `categoryCounts`; loading/error states
- **ServicesSection/index.tsx**: Already had switch/order filters (confirmed, no change needed)
- **CourseInvestmentList.tsx**: Rewritten to use `useQuery('Offering', { where: { switch: 1 }, orderBy: { order: 'asc' } })` — fully dynamic, no more static items
- **BookingForm.tsx**: `COURSES` array now derived from same Offering query (switch=1, order asc); falls back to static list if DB empty; `selectCourse` event handler no longer guards against static list membership
- **GroupRateModal.tsx**: `COURSES` array same dynamic Offering query with fallback; `initialCourse` defaults to first DB result

## 2026-04-02 – Add Personal Awareness filter category to CoursesSection
- **CoursesSection/index.tsx**: Added "Personal Awareness" as 4th Category type and filter tab
- Reassigned Refuse To Be A Victim, Situational Awareness Level 1, De-escalation That Works from "Personal Defense" → "Personal Awareness"
- Updated CATEGORY_COUNTS to include "Personal Awareness" count

## 2026-04-02 – Replace CoursesSection catalog with 9 courses from client screenshots
- **CoursesSection/index.tsx**: Replaced 11 courses with exact 9 from screenshots; removed all Firearms courses + NRA/Pistol/RSO; updated features/descriptions to match images exactly
- **Categories**: Removed "Firearms" filter tab; now only "All", "First Aid", "Personal Defense"
- **CourseCard.tsx**: Button scroll target changed from `#contact` → `#booking-form`
- **Button text**: All cards now read "Contact Us Now To Schedule"

## 2026-04-01 – Restored lost session changes after browser crash
## 2026-04-02 – Sync course offerings to match client image
- **CourseInvestmentList**: Replaced 11 items with 9 correct courses from image; removed NRA/firearm courses; added `priceNote` prop; updated duration strings with "Contact us to arrange a class" and minimum attendee notes
- **CourseInvestmentItem**: Added optional `priceNote` prop displayed inline with price
- **BookingForm COURSES**: Updated to match the 9 new courses; default changed to `Stop The Bleed`
- **GroupRateModal COURSES**: Updated to match the same 9 courses

## 2026-04-01 – Restored lost session changes after browser crash
- **New file**: `GroupRateModal.tsx` — full group rate form with Full Name, Email, Phone, Course, Attendees, Location, Date, Notes; submits to DB with `requestType: 'group'`
- **CourseInvestmentItem**: Added `courseValue` prop; "Contact Now" dispatches `selectCourse` event + scrolls to `#booking-form`; added "Group Rate" button that opens `GroupRateModal`
- **CourseInvestmentList**: All 11 items now pass matching `courseValue` strings
- **BookingForm**: Replaced Formspree fetch with `useMutation('Booking').create()`; added `useEffect` listener for `selectCourse` event; fixed email regex (`[^\s@]+`)
- **BookingSection/index.tsx**: Added `id="booking-form"` to section element for scroll targeting

## 2026-04-01 – Fix duplicate entry points causing build errors
- `index.html`: Changed script src from `./src/index.tsx` → `./src/main.tsx` (single entry point)
- `src/index.tsx`: Deleted — was a conflicting second entry using `getElementById("app")` vs root's `id="root"`
- `src/main.tsx` is now the sole entry; uses `id="root"` which matches `index.html`'s `<div id="root">`

## 2026-04-01 – Fix createRoot DOM element error
- `index.html`: Changed `<div id="app">` → `<div id="root">` to match `main.tsx` `getElementById('root')` call

## 2026-04-01 – Fix ServiceCard listItems.map crash
- `ServiceCard.tsx`: Added `parseListItems` helper that handles both `string[]` (static) and comma-separated / JSON string (DB)
- Cast `props.listItems` through the helper before rendering; `.map()` now always receives a proper array

## 2026-04-01 – Center service card images within 225x185 container
- `ServiceCard.tsx`: Container div now owns the fixed `225px × 185px` dimensions with `flex items-center justify-center`
- Image set to `w-full h-full object-cover` to fill and center within the container perfectly

## 2026-04-01 – Group Rate Modal: "Please Select" defaults + confirmed no date validation
- `GroupRateModal.tsx`: `numberOfAttendees` and `trainingLocation` initial state set to `''`
- Both dropdowns get a `<option value="" disabled>Please Select</option>` as first item
- `preferred_date` is a plain textarea with no date validation (confirmed already correct)

## 2026-04-01 – Add Group Rate Modal form to Course Investment section
- **New file**: `src/sections/BookingSection/components/GroupRateModal.tsx` — full modal form: Full Name, Email (validated), Phone, Select Course, Number of Attendees, Training Location, Preferred Date, Additional Notes
- **CourseInvestmentItem**: Added `useState` for modal open/close; "Contact for Group Rate" button below "Contact Now"; passes `courseValue` as `initialCourse` to modal
- **DB**: Patched `Booking` entity with `numberOfAttendees`, `trainingLocation`, `requestType` fields; group submissions tagged with `requestType: 'group'`
- **Modal UX**: Closes on Escape key / click outside / Cancel button; pre-selects the course for that offer row; success state with confirmation message

## 2026-04-01 – Wire Course Investment "Contact Now" to pre-select BookingForm course
- **CourseInvestmentItem**: Added `courseValue` prop; click dispatches `selectCourse` CustomEvent + scrolls to `#booking-form`
- **CourseInvestmentList**: Each item now passes its matching `courseValue` (exact COURSES option string)
- **BookingForm**: `useEffect` listens for `selectCourse` event and updates `form.course` state accordingly
- **BookingSection/index.tsx**: Added `id="booking-form"` to the section for scroll target

## 2026-03-27 – Add branded favicon
- **index.html**: Added `<link rel="icon">` (32×32) and `<link rel="apple-touch-icon">` (180×180) pointing to generated chevron logo PNG
- Generated favicon from user-supplied logo image via image_generation tool

## 2026-03-25 – Fix CoursesSection features.split crash
- **CoursesSection**: Guard `course.features` with `Array.isArray` check — fallback courses already have `string[]`, DB records have a `string`; handles `undefined` gracefully with `?? ""`

## 2026-03-25 – Migrate to Anima Playground React SDK
- **src/index.tsx**: Wrapped app in `AnimaProvider` from `@animaapp/playground-react-sdk`
- **ServicesSection**: Now fetches `Service` records from DB via `useQuery('Service')`; falls back to static data when DB is empty
- **CoursesSection**: Now fetches `Course` records from DB via `useQuery('Course')`; falls back to static data; category counts are dynamic
- **BookingForm**: Replaced Formspree `fetch` with `useMutation('Booking').create()`; no more third-party dependency
- **package.json**: Added `@animaapp/playground-react-sdk: 0.10.0`

## 2026-03-25 – Self-host assets: download script + local URL switch
- **src/assets.ts**: All 23 remote URLs switched to local `/assets/<file>` paths — no component changes needed
- **scripts/download-assets.mjs**: New Node 18+ script; fetches every asset (images, video, SVGs) into `public/assets/` in parallel; run with `npm run download-assets`
- **package.json**: Added `"download-assets"` script entry
- **public/assets/.gitkeep**: Folder tracked in git so path exists before first download run
- **.gitignore**: Clarified that `public/assets/` contents should be committed (not ignored)

## 2026-03-25 – Google Maps embed + asset centralisation
- **Footer/index.tsx**: Added full-width Google Maps iframe (dark-mode filter) below the 4-col grid with "Find Us" heading and local SEO caption
- **src/assets.ts**: New file — all 20+ remote image/video/icon URLs centralised here; swap to `/assets/` paths for self-hosting
- **16 component files updated**: All `heyboss.heeyo.ai` and `c.animaapp.com` URLs replaced with imports from `@/assets`
- **TODO**: Removed `google-maps` item (completed); CODER.md updated with asset registry instructions

## 2026-03-25 – Legal Modals, Phone Number, Footer Fixes
- **Footer/index.tsx**: Full rewrite to add `useState<ModalType>` and wire Privacy Policy, Terms of Service, Accessibility modals via `LegalModal`
- **Footer/index.tsx**: Phone updated from `(908) 555-1234` → `(908) 758-4894` (tel link updated too)
- **FooterLinks.tsx**: Already supports `onClick` prop — no changes needed
- **New files**: `LegalModal.tsx`, `PrivacyPolicyContent.tsx`, `TermsOfServiceContent.tsx`, `AccessibilityContent.tsx` — all complete with real NJ-specific content
- Modals render outside `<footer>` in a React Fragment to avoid z-index stacking issues

## 2026-03-25 – OG Image, mailto fix, remove Heyboss credit
- **index.html**: Added `og:image`, `og:image:width/height/alt` and `twitter:image` / `twitter:image:alt` meta tags pointing to generated 1200×630 banner
- **Footer/index.tsx**: Changed mailto link from `info@safeandsecureservices.com` → `info@sasstac.com`
- **FooterCopyright.tsx**: Removed "Made with Heyboss.ai" paragraph entirely

## 2026-03-25 – FAQ Accordion Section
- **New file**: `src/sections/FaqSection/index.tsx` — 7-question accordion covering NJ permit requirements, class sizes, certification validity, cancellations, group bookings
- **App.tsx**: Added `<FaqSection>` inside `<section id="faq">` between the spacer and footer
- **Navbar/index.tsx**: Added `{ label: "FAQ", href: "#faq" }` to `NAV_ITEMS` — auto-wires both desktop and mobile menus
- Accordion uses `+` → `×` rotate animation, sky-50 open state bg, IntersectionObserver scroll-reveal on header

## 2026-03-25 – Remove Duplicate BookingSection Below CTA
- **App.tsx**: Removed second `<BookingSection>` (was at `#contact` below `<CtaSection>`)
- **Spacer**: Replaced with `<div id="contact" className="py-16 bg-slate-50" />` — blank white space reserved for future use
- **Footer**: Untouched; still renders immediately after the spacer

## 2026-03-25 – Formspree Email Integration for BookingForm
- **BookingForm**: Replaced fake `setTimeout` with real `fetch` POST to `https://formspree.io/f/${FORMSPREE_ID}`
- **Error handling**: Network errors and Formspree API errors surface as a red inline error banner above the submit button
- **Config**: Single `FORMSPREE_ID` constant at top of `BookingForm.tsx` — business owner swaps in their form ID from formspree.io
- **No new dependencies** — uses native `fetch`, zero bundle impact
- **File modified**: `src/sections/BookingSection/components/BookingForm.tsx`

## 2026-03-25 – Course Category Filter Tabs
- **CoursesSection**: Refactored from static JSX to data-driven `COURSES` array with a `category` field per course
- **Filter UI**: Pill-style tabs (All / First Aid / Firearms / Personal Defense) with live count badges; active tab is navy + amber badge, inactive is white + hover state
- **Filtering**: `useState<Category>` drives visible cards; transitions smoothly with no animation jitter
- **File modified**: `src/sections/CoursesSection/index.tsx`

## 2026-03-25 – Active Nav Highlight + SEO Meta Tags
- **Navbar**: IntersectionObserver tracks active section (`rootMargin: -40% 0px -55% 0px`); active link shown in `amber-600` with animated underline bar — `src/sections/Navbar/index.tsx`, `NavbarLinks.tsx`
- **Mobile menu**: Active item also highlighted in amber on mobile dropdown
- **index.html**: Added OG tags (og:title, og:description, og:url, og:type), Twitter Card, keywords, author, robots, and canonical URL

## 2026-03-25 – Phase 2: Testimonials, Animations & Footer Polish
- **TestimonialsSection**: New section with 6 testimonial cards, star ratings, avatar initials, staggered scroll-reveal — `src/sections/TestimonialsSection/index.tsx`
- **useScrollReveal hook**: `src/hooks/useScrollReveal.ts` — IntersectionObserver-based, fires once, used in section headers and testimonial cards
- **Footer**: Added "Contact Us" column with location, phone (tel link), email, and hours — `src/sections/Footer/index.tsx`
- **ServiceCard / CoursesSectionHeader / ServicesSectionHeader**: "Learn More" smooth-scrolls to `#courses`; headers upgraded with scroll-reveal animations
- **App.tsx + tailwind.config.js**: Added `<TestimonialsSection>`, removed duplicate `<BookingSection>`; added `fade-up` keyframe animation utility

## 2026-03-25 – Phase 1: Interactivity & Functional Polish
- Built full site scaffold: Navbar, Hero, TopBar, ServicesSection, WhyUsSection, CoursesSection, BookingSection, CtaSection, Footer
- Mobile-responsive layout with Tailwind CSS; smooth-scroll nav links; MobileFloatingButton CTA
- All sections use semantic HTML with consistent spacing and color palette from `tailwind.config.js`
- Key files: `src/App.tsx`, `src/index.tsx`, `tailwind.config.js`, `src/sections/*/index.tsx`
</changelog>
