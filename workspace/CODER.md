<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
## 🚨 ARCHITECTURE RULES — DO NOT DEVIATE (2026-05-08)
- **DATABASE**: ALL database work uses **Supabase** (`https://dfchziajttrastbfggii.supabase.co`). No other DB, no localStorage persistence, no mock data for anything meant to be stored.
- **EMAIL**: ALL email delivery goes through the **rangetracker.net SMTP server** (`webhosting3007.is.cc`, port 465, SSL). Credentials are stored as Supabase edge function secrets `SMTP_USER` / `SMTP_PASS`. The sending address is `comments@rangetracker.net`. No third-party email APIs (no SendGrid, no Anima email API, no Resend, etc.).
- **EDGE FUNCTION**: Email is sent via the Supabase edge function `send-email` using `npm:nodemailer@6.9.9` (the old `deno.land/x/smtp` library breaks on modern Deno — do NOT use it).

---

## Range Tracker Landing Page – FIXED (2026-05-06)
- **Crash fix**: `src/main.tsx` had `@animaapp/playground-react-sdk` import — stripped; now uses plain `ReactDOM.createRoot`
- **Entry point**: `index.html` → `src/index.tsx` → `App.tsx` (single file, no routing, no DB)
- **Only deps**: `react`, `react-dom`, `lucide-react`, `gsap` — everything else removed
- **Deleted**: 70+ legacy section files, admin pages, hooks/utils all wiped
- `App.tsx` is 100% self-contained: Navbar, Hero (100vh GSAP), About, Features, WhoUses, Pricing, Testimonial, FAQ, Contact (FeedbackModal via mailto), CtaBanner, Footer
- FeedbackModal: `window.location.href = mailto:info@rangetracker.net` — no backend needed
- No `BrowserRouter`, no routes — pure single-page scroll site

## Range Tracker Landing Page (2026-05-06)
- **App.tsx**: Full standalone landing page — Navbar, Hero (100vh + GSAP), About, Features (8 cards), WhoUses, Pricing (3 plans), Testimonial, FAQ, Contact (FeedbackModal), CtaBanner, Footer
- **index.css**: Added aurora-text gradient animation, target-ring pulse, card-glow hover, modal-overlay blur, custom scrollbar
- **package.json**: Added `gsap ^3.12.5` and `bcryptjs ^2.4.3` dependencies
- FeedbackModal uses `window.location.href = mailto:` as delivery mechanism (no backend needed); shows confirmation screen with user's name
- RangeTrackerLogo is an inline SVG chevron-forward motif matching the app screenshot (white rounded square, three dark chevrons + underline bar)

## Admin Panel (2026-05-03)
- Routes: `/admin` (login), `/admin/dashboard`, `/admin/content/{courses,services,offerings,faqs,bookings}`
- Auth: sessionStorage keys `sasstac_admin_id` + `sasstac_admin_name` (no platform auth)
- Password hashing: `bcryptjs` (rounds=12); initial user seeded by `AdminSetup` component mounted globally in App
- Shared UI kit: `src/pages/admin/components/AdminUI.tsx` — Modal, Field, Toggle, ChipInput, ImagePicker, OrderInput, StatusBadge, FlashBanner, DeleteConfirmModal
- Shell/layout: `src/pages/admin/components/AdminShell.tsx` — sidebar + topbar
- App.tsx is now wrapped in `<BrowserRouter>`; `MainSite` component holds all public sections
- TopBar component is now a no-op (returns null) — admin link removed from public site
</coder>
