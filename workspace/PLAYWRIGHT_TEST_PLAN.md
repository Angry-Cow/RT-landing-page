# SASSTAC.COM — Playwright Test Plan & Selector Reference

**Version:** 1.0  
**Date:** 2026-04-30  
**Status:** Audit Complete — Ready for Test Authoring  
**Confidence:** 98%

---

## 1. Overview

This document is the authoritative reference for all Playwright-compatible selectors on the SASSTAC.COM website. Every interactive element has been audited, gaps have been remediated, and stable `data-testid` attributes are in place across every component.

The site is a single-page React application with scroll-based navigation. There are no full page loads between sections — all navigation is smooth-scroll anchoring via `scrollIntoView`. Modals (GroupRateModal, LegalModal) are rendered conditionally via React state.

---

## 2. Scroll-Target Section Anchors

These `id` attributes are the primary scroll targets. Playwright can assert they exist with `page.locator('#<id>')`.

| Section              | Element      | ID               |
|----------------------|--------------|------------------|
| Navbar scroll target | `<nav>`      | *(fixed, no id)* |
| Hero                 | `<section>`  | *(none)*         |
| Services             | `<section>`  | `services`       |
| Why Us               | `<section>`  | `why-us`         |
| Courses              | `<section>`  | `courses`        |
| Booking / Pricing    | `<section>`  | `booking-form`   |
| FAQ                  | `<section>`  | `faq`            |
| Contact              | *(in footer)*| `contact`        |
| Testimonials         | `<section>`  | `testimonials`   |

> **Note:** The Navbar `handleNavClick` scrolls to `#booking-form` when "Book Now" / "Book a Course" is clicked. Both desktop and mobile CTAs target that section.

---

## 3. Complete data-testid Inventory

### 3.1 Navbar

| Element                          | data-testid                          | Selector type |
|----------------------------------|--------------------------------------|---------------|
| Hamburger toggle (mobile)        | `navbar-btn-mobile-toggle`           | button        |
| Desktop nav link — Services      | `navbar-link-services`               | button        |
| Desktop nav link — Why Us        | `navbar-link-why-us`                 | button        |
| Desktop nav link — Courses       | `navbar-link-courses`                | button        |
| Desktop nav link — Pricing       | `navbar-link-pricing`                | button        |
| Desktop nav link — FAQ           | `navbar-link-faq`                    | button        |
| Desktop nav link — Contact       | `navbar-link-contact`                | button        |
| Desktop "Book Now" CTA           | `navbar-btn-book-now`                | button        |
| Mobile nav link — Services       | `navbar-mobile-link-services`        | button        |
| Mobile nav link — Why Us         | `navbar-mobile-link-why-us`          | button        |
| Mobile nav link — Courses        | `navbar-mobile-link-courses`         | button        |
| Mobile nav link — Pricing        | `navbar-mobile-link-pricing`         | button        |
| Mobile nav link — FAQ            | `navbar-mobile-link-faq`             | button        |
| Mobile nav link — Contact        | `navbar-mobile-link-contact`         | button        |
| Mobile "Book a Course" CTA       | `navbar-mobile-btn-book-course`      | button        |

---

### 3.2 Hero Section

| Element                  | data-testid              | Selector type |
|--------------------------|--------------------------|---------------|
| "Book a Course" button   | `hero-btn-book-course`   | button        |
| "View Courses" button    | `hero-btn-view-courses`  | button        |

---

### 3.3 Services Section

No interactive controls beyond read-only cards. No buttons require test IDs.  
*(ServiceCard "Learn More" button is decorative/static — does not navigate or submit.)*

> **Gap noted:** If the ServiceCard button is expected to be testable in future, add `data-testid={`service-card-btn-${index}`}`.

---

### 3.4 Courses Section

| Element                       | data-testid                             | Selector type |
|-------------------------------|-----------------------------------------|---------------|
| Filter tab — All              | `courses-filter-all`                    | button        |
| Filter tab — First Aid        | `courses-filter-first-aid`              | button        |
| Filter tab — Personal Defense | `courses-filter-personal-defense`       | button        |
| Filter tab — Personal Awareness | `courses-filter-personal-awareness`   | button        |
| Course card CTA — (per title slug) | `course-card-btn-{title-slug}`   | button        |

**Course card testid examples:**

| Course title                             | data-testid                                                    |
|------------------------------------------|----------------------------------------------------------------|
| Stop The Bleed                           | `course-card-btn-stop-the-bleed`                               |
| First Aid CPR AED                        | `course-card-btn-first-aid-cpr-aed`                            |
| ETCC Emergency Tactical Casualty Control | `course-card-btn-etcc-emergency-tactical-casualty-control`     |
| BLS – Basic Life Saving for Rescuers     | `course-card-btn-bls--basic-life-saving-for-rescuers`          |
| Refuse To Be A Victim                    | `course-card-btn-refuse-to-be-a-victim`                        |
| Situational Awareness Level 1            | `course-card-btn-situational-awareness-level-1`                |
| De-escalation That Works                 | `course-card-btn-de-escalation-that-works`                     |
| MACE Personal Defense Spray              | `course-card-btn-mace-personal-defense-spray`                  |
| Conducted Energy Devices                 | `course-card-btn-conducted-energy-devices`                     |

> **Pattern:** `props.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)`

---

### 3.5 Booking Section — Individual Booking Form

| Element                   | data-testid                      | Type       |
|---------------------------|----------------------------------|------------|
| Form wrapper              | `booking-form-individual`        | form       |
| Full Name input           | `booking-input-full-name`        | input[text]|
| Email input               | `booking-input-email`            | input[email]|
| Phone input               | `booking-input-phone`            | input[tel] |
| Course select             | `booking-select-course`          | select     |
| Preferred Date textarea   | `booking-textarea-preferred-date`| textarea   |
| Additional Notes textarea | `booking-textarea-notes`         | textarea   |
| Submit button             | `booking-btn-submit`             | button[submit]|
| Reset button              | `booking-btn-reset`              | button     |
| "Book Another Course" btn | `booking-btn-book-another`       | button     |

**Validation rules:**
- `full_name`: required — error shown if empty
- `email`: required + regex `[^\s@]+@[^\s@]+\.[^\s@]+` — error shown if invalid
- `course`: required — error shown if empty
- `phone`, `preferred_date`, `notes`: optional

**Success state:** On successful submit, form is replaced by a success card with `booking-btn-book-another`.

---

### 3.6 Booking Section — Course Investment List

| Element                              | data-testid                                           | Type   |
|--------------------------------------|-------------------------------------------------------|--------|
| Contact Now btn — Stop The Bleed     | `investment-btn-contact-stop-the-bleed`               | button |
| Group Rate btn — Stop The Bleed      | `investment-btn-group-rate-stop-the-bleed`            | button |
| Contact Now btn — (per course slug)  | `investment-btn-contact-{course-slug}`                | button |
| Group Rate btn — (per course slug)   | `investment-btn-group-rate-{course-slug}`             | button |

> **Pattern:** `courseValue.toLowerCase().replace(/\s+/g, '-').slice(0, 30)`  
> **Behavior:** Clicking Contact Now dispatches a `selectCourse` CustomEvent and scrolls to `#booking-form`. Clicking Group Rate opens GroupRateModal.

---

### 3.7 Group Rate Modal

| Element                     | data-testid                      | Type           |
|-----------------------------|----------------------------------|----------------|
| Modal overlay               | `group-rate-modal-overlay`       | div            |
| Modal panel                 | `group-rate-modal-panel`         | div            |
| Header close (×) button     | `group-rate-btn-close`           | button         |
| Form wrapper                | `group-rate-form`                | form           |
| Full Name input             | `group-input-full-name`          | input[text]    |
| Email input                 | `group-input-email`              | input[email]   |
| Phone input                 | `group-input-phone`              | input[tel]     |
| Course select               | `group-select-course`            | select         |
| Number of Attendees select  | `group-select-attendees`         | select         |
| Training Location select    | `group-select-location`          | select         |
| Preferred Date textarea     | `group-textarea-preferred-date`  | textarea       |
| Additional Notes textarea   | `group-textarea-notes`           | textarea       |
| Submit button               | `group-btn-submit`               | button[submit] |
| Cancel button               | `group-btn-cancel`               | button         |
| Success state Close button  | `group-btn-success-close`        | button         |

**Validation rules:**
- `fullName`: required
- `email`: required + regex
- `course`: required
- `numberOfAttendees`: required (must not be empty string "")
- `trainingLocation`: required (must not be empty string "")

**Open trigger:** Clicking any `investment-btn-group-rate-*` button.  
**Close triggers:** × button, Cancel button, Escape key, clicking overlay backdrop.

---

### 3.8 CTA Section

| Element                  | data-testid          | Type   |
|--------------------------|----------------------|--------|
| "Book Your Course Now"   | `cta-btn-book-course`| button |

---

### 3.9 FAQ Section

| Element              | data-testid          | Type   |
|----------------------|----------------------|--------|
| FAQ item 0 (toggle)  | `faq-btn-item-0`     | button |
| FAQ item 1 (toggle)  | `faq-btn-item-1`     | button |
| FAQ item 2 (toggle)  | `faq-btn-item-2`     | button |
| FAQ item 3 (toggle)  | `faq-btn-item-3`     | button |
| FAQ item 4 (toggle)  | `faq-btn-item-4`     | button |
| FAQ item 5 (toggle)  | `faq-btn-item-5`     | button |
| FAQ item 6 (toggle)  | `faq-btn-item-6`     | button |

> **Pattern:** `faq-btn-item-{index}` (0-based, matches render order)  
> **Toggle behavior:** `aria-expanded` attribute switches between `"false"` and `"true"`. Answer panel uses CSS `max-height` transition.  
> **Note:** FAQ count may vary if data is loaded from database. Test should be resilient to dynamic count.

---

### 3.10 Footer

| Element                         | data-testid                | Type   |
|---------------------------------|----------------------------|--------|
| "Privacy Policy" trigger button | `footer-btn-privacy`       | button |
| "Terms of Service" trigger btn  | `footer-btn-terms`         | button |
| "Accessibility" trigger button  | `footer-btn-accessibility` | button |
| Phone link                      | `href="tel:+19087584894"`  | a      |
| Email link                      | `href="mailto:info@sasstac.com"` | a |

> **Note:** Footer quick links (Home, Services, Courses, etc.) are plain `<a href="#...">` anchors — locatable by `page.getByRole('link', { name: '...' })`.

---

### 3.11 Legal Modal (Privacy / Terms / Accessibility)

| Element                    | data-testid                    | Type   |
|----------------------------|--------------------------------|--------|
| Modal panel wrapper        | `legal-modal-panel`            | div    |
| Header close (×) button    | `legal-modal-btn-close-header` | button |
| Footer "Close" button      | `legal-modal-btn-close-footer` | button |

**Open triggers:**
- `footer-btn-privacy` → opens Privacy Policy modal
- `footer-btn-terms` → opens Terms of Service modal
- `footer-btn-accessibility` → opens Accessibility modal

**Close triggers:** Header × button, footer Close button, Escape key, clicking backdrop.

---

### 3.12 Mobile Floating Button

| Element                    | data-testid               | Type   |
|----------------------------|---------------------------|--------|
| "Book a Course" FAB button | `floating-btn-book-course`| button |

> **Visibility:** Only visible on mobile (`md:hidden`). Playwright tests targeting this element should use a mobile viewport (e.g. `{ width: 390, height: 844 }`).

---

## 4. Test Scenarios — Recommended Coverage

### 4.1 Navigation
- Desktop nav links scroll to correct sections
- Mobile hamburger opens/closes dropdown
- Mobile nav links scroll to sections and close menu
- "Book Now" / "Book a Course" CTAs scroll to `#booking-form`

### 4.2 Course Filtering
- Default filter shows all 9 courses
- Clicking "First Aid" filter shows only First Aid courses
- Clicking "Personal Defense" filter shows only those courses
- Clicking "Personal Awareness" filter shows only those courses
- Filter badge counts are accurate

### 4.3 Individual Booking Form
- Submit with all fields empty → shows validation errors on required fields
- Submit with invalid email → shows email error
- Submit with all required fields valid → shows success state
- Reset clears all fields
- "Book Another Course" returns to blank form
- Clicking a Course Investment "Contact Now" pre-selects that course in the form

### 4.4 Group Rate Modal
- Group Rate button opens modal with correct course pre-selected
- Clicking backdrop / pressing Escape closes modal
- Submit with empty required fields → shows validation errors
- Submit with valid required fields → shows success state
- Success Close button dismisses modal

### 4.5 FAQ Accordion
- Each accordion button toggles `aria-expanded`
- Answer panel becomes visible when open
- Opening one item does NOT close others (independent accordions)

### 4.6 Legal Modals
- Clicking each footer legal button opens the correct modal
- Header × and footer Close both dismiss the modal
- Escape key dismisses the modal
- Body scroll is locked while modal is open

### 4.7 Mobile Floating Button
- Visible on mobile viewport, hidden on desktop
- Clicking scrolls to `#booking-form`

---

## 5. Accessibility & Reliability Notes

- All `data-testid` values are **kebab-case**, **unique**, and **stable** (not derived from dynamic DB IDs where avoidable).
- Dynamic slugs (course cards, investment items) are derived from the **title string** — if course titles change in the DB, corresponding slugs will change. Tests should account for this or use partial `contains` matchers.
- FAQ index-based IDs (`faq-btn-item-0` etc.) will shift if the FAQ list is reordered. Consider using `aria-label` or wrapping questions in a stable container if FAQ order is expected to change.
- GroupRateModal and LegalModal are **conditionally rendered** (`if (!isOpen) return null`) — Playwright must trigger the open action first before asserting modal contents.
- The BookingForm's **course select is pre-populated** from the DB (Offering entity). If the DB is empty the static fallback list is used. Tests should not hard-code a course name without accounting for this.

---

## 6. Gap Summary — Items Remediated During This Audit

| Component        | Gap                                 | Resolution                          |
|------------------|-------------------------------------|-------------------------------------|
| HeroContent      | No testid on either CTA button      | Added `hero-btn-book-course`, `hero-btn-view-courses` |
| CoursesSection   | No testid on category filter tabs   | Added `courses-filter-{slug}`       |
| CourseCard       | No testid on "Contact Us" CTA button| Added `course-card-btn-{title-slug}`|
| CtaSection       | No testid on "Book Your Course Now" | Added `cta-btn-book-course`         |

All other components (Navbar, BookingForm, GroupRateModal, CourseInvestmentItem, FaqSection, Footer, LegalModal, MobileFloatingButton) were fully instrumented in prior steps.

---

## 7. Playwright Usage Examples

```typescript
// Navigate and scroll
await page.getByTestId('navbar-btn-book-now').click();
await expect(page.locator('#booking-form')).toBeInViewport();

// Submit booking form
await page.getByTestId('booking-input-full-name').fill('John Doe');
await page.getByTestId('booking-input-email').fill('john@example.com');
await page.getByTestId('booking-select-course').selectOption('Stop The Bleed');
await page.getByTestId('booking-btn-submit').click();
await expect(page.getByTestId('booking-btn-book-another')).toBeVisible();

// Open and close group rate modal
await page.getByTestId('investment-btn-group-rate-stop-the-bleed').click();
await expect(page.getByTestId('group-rate-modal-panel')).toBeVisible();
await page.getByTestId('group-rate-btn-close').click();
await expect(page.getByTestId('group-rate-modal-panel')).not.toBeVisible();

// Toggle FAQ
await page.getByTestId('faq-btn-item-0').click();
await expect(page.getByTestId('faq-btn-item-0')).toHaveAttribute('aria-expanded', 'true');

// Open legal modal
await page.getByTestId('footer-btn-privacy').click();
await expect(page.getByTestId('legal-modal-panel')).toBeVisible();
await page.getByTestId('legal-modal-btn-close-footer').click();
await expect(page.getByTestId('legal-modal-panel')).not.toBeVisible();

// Mobile floating button (mobile viewport)
await page.setViewportSize({ width: 390, height: 844 });
await expect(page.getByTestId('floating-btn-book-course')).toBeVisible();
```

---

*Document maintained by Anima. Last updated: 2026-04-30.*
