# SASSTAC.COM — Playwright Test Plan & Reference Document

> **Version:** 1.0.0 | **Date:** 2026-04-30
> **Status:** ✅ Ready for handoff — all selectors verified against source code
> **Live URL:** `https://steep-dream-1381.dev.animaapp.io`

---

## Table of Contents

1. [Selector Inventory](#1-selector-inventory)
2. [Section IDs (Scroll Targets)](#2-section-ids-scroll-targets)
3. [Test Suite Overview](#3-test-suite-overview)
4. [Test Cases — Detailed](#4-test-cases-detailed)
   - [T01 — Page Load & Section Visibility](#t01--page-load--section-visibility)
   - [T02 — Navbar Desktop Navigation](#t02--navbar-desktop-navigation)
   - [T03 — Navbar Mobile Navigation](#t03--navbar-mobile-navigation)
   - [T04 — Hero CTA Buttons](#t04--hero-cta-buttons)
   - [T05 — Course Filter Tabs](#t05--course-filter-tabs)
   - [T06 — Service Cards](#t06--service-cards)
   - [T07 — Booking Form — Happy Path](#t07--booking-form--happy-path)
   - [T08 — Booking Form — Validation Errors](#t08--booking-form--validation-errors)
   - [T09 — Group Rate Modal — Open / Close](#t09--group-rate-modal--open--close)
   - [T10 — Group Rate Modal — Happy Path](#t10--group-rate-modal--happy-path)
   - [T11 — Group Rate Modal — Validation Errors](#t11--group-rate-modal--validation-errors)
   - [T12 — FAQ Accordion](#t12--faq-accordion)
   - [T13 — Footer Legal Modals](#t13--footer-legal-modals)
   - [T14 — Mobile Floating Book Button](#t14--mobile-floating-book-button)
   - [T15 — CTA Section Button](#t15--cta-section-button)
   - [T16 — Course Investment Contact Now](#t16--course-investment-contact-now)
5. [Open Questions / Assumptions](#5-open-questions--assumptions)
6. [Playwright Setup Notes](#6-playwright-setup-notes)

---

## 1. Selector Inventory

All interactive elements verified directly from source. Every `data-testid` listed here exists in the live DOM.

### Navbar

| Element | data-testid | Component |
|---|---|---|
| Desktop nav link (dynamic per label) | `navbar-link-services` `navbar-link-why-us` `navbar-link-courses` `navbar-link-pricing` `navbar-link-faq` `navbar-link-contact` | `NavbarLinks.tsx` |
| Desktop "Book Now" CTA | `navbar-btn-book-now` | `NavbarLinks.tsx` |
| Mobile hamburger toggle | `navbar-btn-mobile-toggle` | `NavbarMobileButton.tsx` |
| Mobile nav link (dynamic) | `navbar-mobile-link-services` `navbar-mobile-link-why-us` `navbar-mobile-link-courses` `navbar-mobile-link-pricing` `navbar-mobile-link-faq` `navbar-mobile-link-contact` | `Navbar/index.tsx` |
| Mobile "Book a Course" CTA | `navbar-mobile-btn-book-course` | `Navbar/index.tsx` |

### Hero

| Element | data-testid | Notes |
|---|---|---|
| "Book a Course" primary CTA | `hero-btn-book-course` | Scrolls to `#booking-form` |
| "View Courses" secondary CTA | `hero-btn-view-courses` | Scrolls to `#courses` |

### Courses Section

| Element | data-testid | Notes |
|---|---|---|
| Filter tab "All" | `courses-filter-all` | Default active |
| Filter tab "First Aid" | `courses-filter-first-aid` | 4 courses |
| Filter tab "Personal Defense" | `courses-filter-personal-defense` | 2 courses |
| Filter tab "Personal Awareness" | `courses-filter-personal-awareness` | 3 courses |
| Course card CTA — Stop The Bleed | `course-card-btn-stop-the-bleed` | Scrolls to `#booking-form` |
| Course card CTA — First Aid CPR AED | `course-card-btn-first-aid-cpr-aed` | Scrolls to `#booking-form` |
| Course card CTA — BLS | `course-card-btn-bls-basic-life-saving-for-rescuers` | Scrolls to `#booking-form` |
| Course card CTA — ETCC | `course-card-btn-etcc-emergency-tactical-casualty-con` | Scrolls to `#booking-form` |
| Course card CTA — MACE | `course-card-btn-mace-personal-defense-spray` | Scrolls to `#booking-form` |
| Course card CTA — CED | `course-card-btn-conducted-energy-devices` | Scrolls to `#booking-form` |
| Course card CTA — Refuse To Be A Victim | `course-card-btn-refuse-to-be-a-victim` | Scrolls to `#booking-form` |
| Course card CTA — Situational Awareness | `course-card-btn-situational-awareness-level-1` | Scrolls to `#booking-form` |
| Course card CTA — De-escalation | `course-card-btn-de-escalation-that-works` | Scrolls to `#booking-form` |

### Services Section

| Element | data-testid | Notes |
|---|---|---|
| Service card "Learn More" btn (dynamic) | `service-card-btn-{title-slug}` | Scrolls to `#courses` |

### Booking Form (Individual)

| Element | data-testid | Label (`htmlFor`) | Type |
|---|---|---|---|
| Form element | `booking-form-individual` | — | `<form>` |
| Full Name input | `booking-input-full-name` | `booking-full-name` | `text` |
| Email input | `booking-input-email` | `booking-email` | `email` |
| Phone input | `booking-input-phone` | `booking-phone` | `tel` |
| Course select | `booking-select-course` | `booking-course` | `<select>` |
| Preferred Date textarea | `booking-textarea-preferred-date` | `booking-preferred-date` | `<textarea>` |
| Additional Notes textarea | `booking-textarea-notes` | `booking-notes` | `<textarea>` |
| Submit button | `booking-btn-submit` | — | `submit` |
| Reset button | `booking-btn-reset` | — | `button` |
| Success "Book Another Course" | `booking-btn-book-another` | — | `button` (shown post-submit) |

### Group Rate Modal

| Element | data-testid | Label (`htmlFor`) | Type |
|---|---|---|---|
| Modal overlay | `group-rate-modal-overlay` | — | `<div>` |
| Modal panel | `group-rate-modal-panel` | — | `<div>` |
| Close (×) button | `group-rate-btn-close` | — | `button` |
| Form element | `group-rate-form` | — | `<form>` |
| Full Name input | `group-input-full-name` | `group-full-name` | `text` |
| Email input | `group-input-email` | `group-email` | `email` |
| Phone input | `group-input-phone` | `group-phone` | `tel` |
| Course select | `group-select-course` | `group-course` | `<select>` |
| Attendees select | `group-select-attendees` | `group-attendees` | `<select>` |
| Location select | `group-select-location` | `group-location` | `<select>` |
| Preferred Date textarea | `group-textarea-preferred-date` | `group-preferred-date` | `<textarea>` |
| Notes textarea | `group-textarea-notes` | `group-notes` | `<textarea>` |
| Submit button | `group-btn-submit` | — | `submit` |
| Cancel button | `group-btn-cancel` | — | `button` |
| Success "Close" button | `group-btn-success-close` | — | `button` (shown post-submit) |

### FAQ Section

| Element | data-testid | Notes |
|---|---|---|
| FAQ item toggle (index-based) | `faq-btn-item-0` through `faq-btn-item-6` | 7 static FAQs; index shifts if DB overrides |

### Footer

| Element | data-testid | Notes |
|---|---|---|
| Privacy Policy button | `footer-btn-privacy` | Opens LegalModal |
| Terms of Service button | `footer-btn-terms` | Opens LegalModal |
| Accessibility button | `footer-btn-accessibility` | Opens LegalModal |

### Legal Modal (shared)

| Element | data-testid | Notes |
|---|---|---|
| Modal panel | `legal-modal-panel` | Same for all 3 legal modals |
| Header close (×) | `legal-modal-btn-close-header` | Same for all 3 |
| Footer "Close" button | `legal-modal-btn-close-footer` | Same for all 3 |

### CTA Section

| Element | data-testid | Notes |
|---|---|---|
| "Book Your Course Now" button | `cta-btn-book-course` | Scrolls to `#booking-form` |

### Course Investment (Pricing)

| Element | data-testid | Notes |
|---|---|---|
| "Contact Now" per course | `investment-btn-contact-{course-slug}` | Scrolls to form + fires `selectCourse` event |
| "Group Rate" per course | `investment-btn-group-rate-{course-slug}` | Opens GroupRateModal |

### Mobile Floating Button

| Element | data-testid | Notes |
|---|---|---|
| Floating "Book a Course" button | `floating-btn-book-course` | Visible only on mobile (`md:hidden`) |

---

## 2. Section IDs (Scroll Targets)

These `id` attributes are on `<section>` elements and serve as anchor targets:

| Section | `id` | Triggered by |
|---|---|---|
| Services | `services` | Navbar "Services" link |
| Why Us | `why-us` | Navbar "Why Us" link |
| Courses | `courses` | Navbar "Courses" link, Hero "View Courses", ServiceCard buttons |
| FAQ | `faq` | Navbar "FAQ" link |
| Booking Form / Contact | `booking-form` | All CTA buttons, Pricing "Contact Now", floating button |
| Pricing | `pricing` | Navbar "Pricing" link |
| Contact | `contact` | Navbar "Contact" link, FAQ "Reach out directly" link |

---

## 3. Test Suite Overview

| ID | Test Group | # Cases | Priority |
|---|---|---|---|
| T01 | Page Load & Section Visibility | 2 | High |
| T02 | Navbar Desktop Navigation | 3 | High |
| T03 | Navbar Mobile Navigation | 4 | High |
| T04 | Hero CTA Buttons | 2 | High |
| T05 | Course Filter Tabs | 4 | Medium |
| T06 | Service Cards | 1 | Low |
| T07 | Booking Form — Happy Path | 1 | High |
| T08 | Booking Form — Validation Errors | 3 | High |
| T09 | Group Rate Modal — Open/Close | 4 | High |
| T10 | Group Rate Modal — Happy Path | 1 | High |
| T11 | Group Rate Modal — Validation Errors | 2 | Medium |
| T12 | FAQ Accordion | 3 | Medium |
| T13 | Footer Legal Modals | 5 | Medium |
| T14 | Mobile Floating Button | 1 | Medium |
| T15 | CTA Section Button | 1 | Low |
| T16 | Course Investment Contact Now | 2 | Medium |
| **Total** | | **39** | |

---

## 4. Test Cases — Detailed

---

### T01 — Page Load & Section Visibility

**Preconditions:** Browser navigated to base URL.

#### T01-01: Page renders without JS errors
- **Steps:** Navigate to `/`; wait for load state `networkidle`
- **Expected:** No uncaught JS errors; `document.title` contains "SASSTAC" or "Safe and Secure"

#### T01-02: All major sections are visible in the DOM
- **Steps:** Navigate to `/`; check for `#services`, `#courses`, `#faq`, `#booking-form`
- **Expected:** All four section elements exist in the DOM

---

### T02 — Navbar Desktop Navigation

**Preconditions:** Viewport ≥ 1280px (desktop). Page loaded.

#### T02-01: All desktop nav links are visible
- **Steps:** Assert `[data-testid="navbar-link-services"]` through `navbar-link-contact` are visible
- **Expected:** 6 links visible; "Book Now" button visible

#### T02-02: Clicking a desktop nav link scrolls to the target section
- **Steps:** Click `[data-testid="navbar-link-courses"]`; wait 800ms for scroll
- **Expected:** `#courses` section is within the viewport (use `getBoundingClientRect()` or `isInViewport`)

#### T02-03: "Book Now" button scrolls to booking form
- **Steps:** Click `[data-testid="navbar-btn-book-now"]`; wait 800ms
- **Expected:** `#booking-form` section is within the viewport

---

### T03 — Navbar Mobile Navigation

**Preconditions:** Viewport set to 390×844 (iPhone 14 equivalent).

#### T03-01: Mobile hamburger button is visible; desktop links are hidden
- **Steps:** Assert `[data-testid="navbar-btn-mobile-toggle"]` is visible; assert desktop `[data-testid="navbar-link-services"]` is hidden
- **Expected:** Hamburger visible; desktop nav hidden

#### T03-02: Tapping hamburger opens mobile dropdown
- **Steps:** Click `[data-testid="navbar-btn-mobile-toggle"]`; assert `[data-testid="navbar-mobile-link-services"]` is visible
- **Expected:** Mobile dropdown is visible with all 6 links and "Book a Course" button

#### T03-03: Tapping a mobile nav link closes dropdown and scrolls
- **Steps:** Click `[data-testid="navbar-btn-mobile-toggle"]`; click `[data-testid="navbar-mobile-link-faq"]`; wait 800ms
- **Expected:** Dropdown hidden; `#faq` is in viewport

#### T03-04: Mobile "Book a Course" button scrolls to booking form
- **Steps:** Click hamburger; click `[data-testid="navbar-mobile-btn-book-course"]`; wait 800ms
- **Expected:** `#booking-form` is in viewport

---

### T04 — Hero CTA Buttons

**Preconditions:** Desktop viewport.

#### T04-01: "Book a Course" scrolls to booking form
- **Steps:** Click `[data-testid="hero-btn-book-course"]`; wait 800ms
- **Expected:** `#booking-form` is in viewport

#### T04-02: "View Courses" scrolls to courses section
- **Steps:** Click `[data-testid="hero-btn-view-courses"]`; wait 800ms
- **Expected:** `#courses` is in viewport

---

### T05 — Course Filter Tabs

**Preconditions:** Scroll to `#courses` section.

#### T05-01: "All" tab is active by default; all 9 course cards are shown
- **Steps:** Assert `[data-testid="courses-filter-all"]` has active styling (bg-sky-900 class); count course card elements
- **Expected:** 9 course cards rendered

#### T05-02: "First Aid" filter shows only First Aid courses
- **Steps:** Click `[data-testid="courses-filter-first-aid"]`; count visible course cards
- **Expected:** 4 cards visible (Stop The Bleed, First Aid CPR AED, BLS, ETCC)

#### T05-03: "Personal Defense" filter shows only Personal Defense courses
- **Steps:** Click `[data-testid="courses-filter-personal-defense"]`; count visible course cards
- **Expected:** 2 cards visible (MACE, Conducted Energy Devices)

#### T05-04: "Personal Awareness" filter shows only Personal Awareness courses
- **Steps:** Click `[data-testid="courses-filter-personal-awareness"]`; count visible course cards
- **Expected:** 3 cards visible (Refuse To Be A Victim, Situational Awareness Level 1, De-escalation That Works)

---

### T06 — Service Cards

**Preconditions:** Scroll to `#services` section. Services load from DB; at least one card present.

#### T06-01: Service card "Learn More" button is clickable and scrolls to courses
- **Steps:** Locate the first `[data-testid^="service-card-btn-"]`; click it; wait 800ms
- **Expected:** `#courses` is in viewport

---

### T07 — Booking Form — Happy Path

**Preconditions:** Scroll to `#booking-form` section.

#### T07-01: Filling all fields and submitting shows success state
- **Steps:**
  1. Fill `[data-testid="booking-input-full-name"]` with `"Test User"`
  2. Fill `[data-testid="booking-input-email"]` with `"test@example.com"`
  3. Fill `[data-testid="booking-input-phone"]` with `"(609) 555-0100"`
  4. Select `"Stop The Bleed"` in `[data-testid="booking-select-course"]`
  5. Fill `[data-testid="booking-textarea-preferred-date"]` with `"Any Saturday in May"`
  6. Fill `[data-testid="booking-textarea-notes"]` with `"No special requirements"`
  7. Click `[data-testid="booking-btn-submit"]`
  8. Wait for `[data-testid="booking-btn-book-another"]` to appear (up to 10s)
- **Expected:** Success state rendered; "Book Another Course" button visible; form fields no longer visible

---

### T08 — Booking Form — Validation Errors

#### T08-01: Submitting with all fields empty shows required-field errors
- **Steps:** Click `[data-testid="booking-btn-submit"]` without filling any fields
- **Expected:** Error message near `booking-input-full-name` ("Full name is required."); error near `booking-input-email` ("Email is required.")

#### T08-02: Submitting with invalid email shows email format error
- **Steps:** Fill `booking-input-full-name` with `"Test User"`; fill `booking-input-email` with `"notanemail"`; click `booking-btn-submit`
- **Expected:** Error message "Please enter a valid email." appears near the email field

#### T08-03: "Reset" button clears all fields
- **Steps:** Fill `booking-input-full-name`; click `[data-testid="booking-btn-reset"]`
- **Expected:** `booking-input-full-name` value is `""` (empty)

---

### T09 — Group Rate Modal — Open / Close

**Preconditions:** Scroll to `#pricing` section. At least one CourseInvestmentItem rendered.

#### T09-01: Clicking "Group Rate" opens the modal
- **Steps:** Click first `[data-testid^="investment-btn-group-rate-"]`
- **Expected:** `[data-testid="group-rate-modal-panel"]` is visible

#### T09-02: Clicking the × button closes the modal
- **Steps:** Open modal; click `[data-testid="group-rate-btn-close"]`
- **Expected:** `[data-testid="group-rate-modal-panel"]` is not visible

#### T09-03: Clicking the overlay backdrop closes the modal
- **Steps:** Open modal; click `[data-testid="group-rate-modal-overlay"]` at coordinates outside the panel (e.g., top-left corner)
- **Expected:** Modal panel is not visible

#### T09-04: Pressing Escape closes the modal
- **Steps:** Open modal; press keyboard `Escape`
- **Expected:** Modal panel is not visible

---

### T10 — Group Rate Modal — Happy Path

**Preconditions:** Group Rate modal is open.

#### T10-01: Filling all required fields and submitting shows success state
- **Steps:**
  1. Fill `[data-testid="group-input-full-name"]` with `"Jane Corp"`
  2. Fill `[data-testid="group-input-email"]` with `"jane@corp.com"`
  3. Fill `[data-testid="group-input-phone"]` with `"(732) 555-0200"`
  4. Select `"Stop The Bleed"` in `[data-testid="group-select-course"]`
  5. Select `"5-12"` in `[data-testid="group-select-attendees"]`
  6. Select `"Client Location"` in `[data-testid="group-select-location"]`
  7. Fill `[data-testid="group-textarea-preferred-date"]` with `"June weekends"`
  8. Click `[data-testid="group-btn-submit"]`
  9. Wait for `[data-testid="group-btn-success-close"]` (up to 10s)
- **Expected:** Success message visible; "Close" button visible; form no longer visible

---

### T11 — Group Rate Modal — Validation Errors

#### T11-01: Submitting empty form shows validation errors on required fields
- **Steps:** Open modal; click `[data-testid="group-btn-submit"]` without filling anything
- **Expected:** Error "Full name is required." visible; error "Email is required." visible; error for attendees visible; error for location visible

#### T11-02: "Cancel" button closes the modal without submitting
- **Steps:** Open modal; fill `group-input-full-name`; click `[data-testid="group-btn-cancel"]`
- **Expected:** Modal is not visible; no submission occurs

---

### T12 — FAQ Accordion

**Preconditions:** Scroll to `#faq`. 7 FAQ items rendered.

#### T12-01: FAQ items are collapsed by default
- **Steps:** Assert all answer panels have `max-h-0` or are not visible (check `aria-expanded="false"` on all toggle buttons)
- **Expected:** All 7 `[data-testid^="faq-btn-item-"]` have `aria-expanded="false"`

#### T12-02: Clicking a FAQ item expands it
- **Steps:** Click `[data-testid="faq-btn-item-0"]`
- **Expected:** `faq-btn-item-0` has `aria-expanded="true"`; answer text is visible in the DOM

#### T12-03: Clicking an open FAQ item collapses it
- **Steps:** Click `faq-btn-item-0` to open; click it again
- **Expected:** `faq-btn-item-0` has `aria-expanded="false"`; answer text is hidden

---

### T13 — Footer Legal Modals

**Preconditions:** Scroll to footer.

#### T13-01: Privacy Policy button opens modal with correct title
- **Steps:** Click `[data-testid="footer-btn-privacy"]`; assert `[data-testid="legal-modal-panel"]` is visible
- **Expected:** Modal visible; heading text contains "Privacy Policy"

#### T13-02: Terms of Service button opens modal
- **Steps:** Click `[data-testid="footer-btn-terms"]`; assert `legal-modal-panel` visible
- **Expected:** Heading contains "Terms of Service"

#### T13-03: Accessibility button opens modal
- **Steps:** Click `[data-testid="footer-btn-accessibility"]`; assert `legal-modal-panel` visible
- **Expected:** Heading contains "Accessibility"

#### T13-04: Header × button closes modal
- **Steps:** Open Privacy modal; click `[data-testid="legal-modal-btn-close-header"]`
- **Expected:** `legal-modal-panel` is not visible

#### T13-05: Footer "Close" button closes modal
- **Steps:** Open Terms modal; click `[data-testid="legal-modal-btn-close-footer"]`
- **Expected:** `legal-modal-panel` is not visible

---

### T14 — Mobile Floating Book Button

**Preconditions:** Viewport 390×844 (mobile).

#### T14-01: Floating button is visible on mobile and scrolls to booking form
- **Steps:** Assert `[data-testid="floating-btn-book-course"]` is visible; click it; wait 800ms
- **Expected:** `#booking-form` is in viewport

---

### T15 — CTA Section Button

**Preconditions:** Scroll to CTA section.

#### T15-01: "Book Your Course Now" scrolls to booking form
- **Steps:** Click `[data-testid="cta-btn-book-course"]`; wait 800ms
- **Expected:** `#booking-form` is in viewport

---

### T16 — Course Investment Contact Now

**Preconditions:** Scroll to `#pricing` section.

#### T16-01: "Contact Now" scrolls to booking form
- **Steps:** Click first `[data-testid^="investment-btn-contact-"]`; wait 800ms
- **Expected:** `#booking-form` is in viewport

#### T16-02: "Contact Now" pre-selects the correct course in the booking form
- **Steps:** Scroll to pricing; note the title next to the "Contact Now" button for the first item; click it; wait 800ms; read the value of `[data-testid="booking-select-course"]`
- **Expected:** Select value matches the course title from the pricing row

---

## 5. Open Questions / Assumptions

| # | Question | Assumption Used |
|---|---|---|
| 1 | Does the booking form write to a real DB in the test environment? | Assumed yes (Anima SDK). Tests check for success state in UI, not DB row. |
| 2 | Are DB-driven courses (Course entity) populated in staging? | Tests fall back to 9 static courses if DB is empty. Count assertions use ≥1, not exact count where dynamic. |
| 3 | Is `#contact` a separate section or the same as `#booking-form`? | `#booking-form` is the booking section id. `#contact` and `#pricing` should also be confirmed as section ids. |
| 4 | What is the max wait time for form submission (API latency)? | Timeout set to 10000ms in test helpers for mutation calls. |
| 5 | Escape key on legal modal — is it wired? | Yes, confirmed in `LegalModal.tsx` `useEffect`. |
| 6 | Overlay backdrop click on group modal — confirmed click target? | Yes — `onClick` checks `e.target === overlayRef.current`, so click must be on the overlay div itself, not the panel. Tests use `{ position: { x: 10, y: 10 } }` offset. |

---

## 6. Playwright Setup Notes

```bash
# Install Playwright
npm init playwright@latest

# Run tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# Run specific file
npx playwright test tests/sasstac.spec.ts

# Run on specific browser
npx playwright test --project=chromium
```

### Recommended `playwright.config.ts` settings

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'https://steep-dream-1381.dev.animaapp.io',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
});
```

### Helper: `isInViewport`

```ts
async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }, selector);
}
```
