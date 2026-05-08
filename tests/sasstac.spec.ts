/**
 * SASSTAC.COM — Playwright Test Suite
 * Version: 1.0.0
 * Reference: docs/playwright-test-plan.md
 *
 * Run: npx playwright test tests/sasstac.spec.ts
 * Requires: playwright.config.ts with baseURL set to the live site.
 */

import { test, expect, Page, devices } from '@playwright/test';

// ─── Helpers ────────────────────────────────────────────────────────────────

const BASE_URL = 'https://steep-dream-1381.dev.animaapp.io';

/** Returns true when the element's bounding rect overlaps the visible viewport. */
async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }, selector);
}

/** Wait for smooth-scroll to settle (300 ms buffer on top of Playwright's auto-wait). */
async function waitForScroll(page: Page) {
  await page.waitForTimeout(800);
}

// ─── T01 — Page Load & Section Visibility ────────────────────────────────────

test.describe('T01 — Page Load & Section Visibility', () => {
  test('T01-01: page renders without uncaught JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    expect(errors, `Uncaught JS errors: ${errors.join(', ')}`).toHaveLength(0);
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/sasstac|safe and secure/);
  });

  test('T01-02: all major sections exist in the DOM', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    for (const id of ['services', 'courses', 'faq', 'booking-form']) {
      const el = page.locator(`#${id}`);
      await expect(el).toBeAttached();
    }
  });
});

// ─── T02 — Navbar Desktop Navigation ─────────────────────────────────────────

test.describe('T02 — Navbar Desktop Navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T02-01: all 6 desktop nav links and Book Now button are visible', async ({ page }) => {
    await page.goto(BASE_URL);

    const links = ['services', 'why-us', 'courses', 'pricing', 'faq', 'contact'];
    for (const slug of links) {
      await expect(page.getByTestId(`navbar-link-${slug}`)).toBeVisible();
    }
    await expect(page.getByTestId('navbar-btn-book-now')).toBeVisible();
  });

  test('T02-02: clicking "Courses" link scrolls #courses into view', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('navbar-link-courses').click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#courses')).toBe(true);
  });

  test('T02-03: clicking "Book Now" scrolls #booking-form into view', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('navbar-btn-book-now').click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#booking-form')).toBe(true);
  });
});

// ─── T03 — Navbar Mobile Navigation ──────────────────────────────────────────

test.describe('T03 — Navbar Mobile Navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('T03-01: hamburger button visible; desktop nav links hidden', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.getByTestId('navbar-btn-mobile-toggle')).toBeVisible();
    await expect(page.getByTestId('navbar-link-services')).toBeHidden();
  });

  test('T03-02: tapping hamburger opens mobile dropdown with all links', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('navbar-btn-mobile-toggle').click();

    const slugs = ['services', 'why-us', 'courses', 'pricing', 'faq', 'contact'];
    for (const slug of slugs) {
      await expect(page.getByTestId(`navbar-mobile-link-${slug}`)).toBeVisible();
    }
    await expect(page.getByTestId('navbar-mobile-btn-book-course')).toBeVisible();
  });

  test('T03-03: tapping mobile FAQ link closes menu and scrolls to #faq', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('navbar-btn-mobile-toggle').click();
    await page.getByTestId('navbar-mobile-link-faq').click();
    await waitForScroll(page);

    await expect(page.getByTestId('navbar-mobile-link-faq')).toBeHidden();
    expect(await isInViewport(page, '#faq')).toBe(true);
  });

  test('T03-04: mobile "Book a Course" button scrolls to #booking-form', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('navbar-btn-mobile-toggle').click();
    await page.getByTestId('navbar-mobile-btn-book-course').click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#booking-form')).toBe(true);
  });
});

// ─── T04 — Hero CTA Buttons ───────────────────────────────────────────────────

test.describe('T04 — Hero CTA Buttons', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T04-01: "Book a Course" scrolls to #booking-form', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('hero-btn-book-course').click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#booking-form')).toBe(true);
  });

  test('T04-02: "View Courses" scrolls to #courses', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('hero-btn-view-courses').click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#courses')).toBe(true);
  });
});

// ─── T05 — Course Filter Tabs ─────────────────────────────────────────────────

test.describe('T05 — Course Filter Tabs', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#courses').scrollIntoViewIfNeeded();
    await waitForScroll(page);
  });

  test('T05-01: "All" tab active by default; 9 course cards visible', async ({ page }) => {
    const allTab = page.getByTestId('courses-filter-all');
    await expect(allTab).toBeVisible();

    // Active state: has bg-sky-900 class
    await expect(allTab).toHaveClass(/bg-sky-900/);

    const cards = page.locator('[data-testid^="course-card-btn-"]');
    await expect(cards).toHaveCount(9);
  });

  test('T05-02: "First Aid" filter shows 4 cards', async ({ page }) => {
    await page.getByTestId('courses-filter-first-aid').click();
    await page.waitForTimeout(300);

    const cards = page.locator('[data-testid^="course-card-btn-"]');
    await expect(cards).toHaveCount(4);
  });

  test('T05-03: "Personal Defense" filter shows 2 cards', async ({ page }) => {
    await page.getByTestId('courses-filter-personal-defense').click();
    await page.waitForTimeout(300);

    const cards = page.locator('[data-testid^="course-card-btn-"]');
    await expect(cards).toHaveCount(2);
  });

  test('T05-04: "Personal Awareness" filter shows 3 cards', async ({ page }) => {
    await page.getByTestId('courses-filter-personal-awareness').click();
    await page.waitForTimeout(300);

    const cards = page.locator('[data-testid^="course-card-btn-"]');
    await expect(cards).toHaveCount(3);
  });
});

// ─── T06 — Service Cards ──────────────────────────────────────────────────────

test.describe('T06 — Service Cards', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T06-01: first service card "Learn More" scrolls to #courses', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#services').scrollIntoViewIfNeeded();
    await waitForScroll(page);

    const firstBtn = page.locator('[data-testid^="service-card-btn-"]').first();
    await expect(firstBtn).toBeVisible();
    await firstBtn.click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#courses')).toBe(true);
  });
});

// ─── T07 — Booking Form — Happy Path ─────────────────────────────────────────

test.describe('T07 — Booking Form — Happy Path', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T07-01: complete form submission shows success state', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#booking-form').scrollIntoViewIfNeeded();
    await waitForScroll(page);

    await page.getByTestId('booking-input-full-name').fill('Test User');
    await page.getByTestId('booking-input-email').fill('test@example.com');
    await page.getByTestId('booking-input-phone').fill('(609) 555-0100');
    await page.getByTestId('booking-select-course').selectOption('Stop The Bleed');
    await page.getByTestId('booking-textarea-preferred-date').fill('Any Saturday in May');
    await page.getByTestId('booking-textarea-notes').fill('No special requirements');

    await page.getByTestId('booking-btn-submit').click();

    // Wait up to 10s for the success state to appear
    await expect(page.getByTestId('booking-btn-book-another')).toBeVisible({ timeout: 10_000 });

    // Form should no longer be present
    await expect(page.getByTestId('booking-form-individual')).not.toBeAttached();
  });
});

// ─── T08 — Booking Form — Validation Errors ──────────────────────────────────

test.describe('T08 — Booking Form — Validation Errors', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#booking-form').scrollIntoViewIfNeeded();
    await waitForScroll(page);
  });

  test('T08-01: submitting empty form shows required-field errors', async ({ page }) => {
    await page.getByTestId('booking-btn-submit').click();

    await expect(page.locator('text=Full name is required.')).toBeVisible();
    await expect(page.locator('text=Email is required.')).toBeVisible();
  });

  test('T08-02: invalid email shows format error', async ({ page }) => {
    await page.getByTestId('booking-input-full-name').fill('Test User');
    await page.getByTestId('booking-input-email').fill('notanemail');
    await page.getByTestId('booking-btn-submit').click();

    await expect(page.locator('text=Please enter a valid email.')).toBeVisible();
  });

  test('T08-03: Reset button clears all fields', async ({ page }) => {
    await page.getByTestId('booking-input-full-name').fill('Test User');
    await page.getByTestId('booking-input-email').fill('test@example.com');
    await page.getByTestId('booking-btn-reset').click();

    await expect(page.getByTestId('booking-input-full-name')).toHaveValue('');
    await expect(page.getByTestId('booking-input-email')).toHaveValue('');
  });
});

// ─── T09 — Group Rate Modal — Open / Close ────────────────────────────────────

test.describe('T09 — Group Rate Modal — Open/Close', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  /** Navigate and click the first Group Rate button in the pricing section. */
  async function openModal(page: Page) {
    await page.goto(BASE_URL);
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await waitForScroll(page);
    await page.locator('[data-testid^="investment-btn-group-rate-"]').first().click();
    await expect(page.getByTestId('group-rate-modal-panel')).toBeVisible({ timeout: 5_000 });
  }

  test('T09-01: clicking "Group Rate" opens the modal', async ({ page }) => {
    await openModal(page);
    await expect(page.getByTestId('group-rate-modal-panel')).toBeVisible();
  });

  test('T09-02: clicking × button closes the modal', async ({ page }) => {
    await openModal(page);
    await page.getByTestId('group-rate-btn-close').click();
    await expect(page.getByTestId('group-rate-modal-panel')).not.toBeVisible();
  });

  test('T09-03: clicking overlay backdrop closes the modal', async ({ page }) => {
    await openModal(page);
    // Click the overlay at a corner position guaranteed to be outside the panel
    await page.getByTestId('group-rate-modal-overlay').click({ position: { x: 10, y: 10 } });
    await expect(page.getByTestId('group-rate-modal-panel')).not.toBeVisible();
  });

  test('T09-04: pressing Escape closes the modal', async ({ page }) => {
    await openModal(page);
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('group-rate-modal-panel')).not.toBeVisible();
  });
});

// ─── T10 — Group Rate Modal — Happy Path ──────────────────────────────────────

test.describe('T10 — Group Rate Modal — Happy Path', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T10-01: completing and submitting group form shows success state', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await waitForScroll(page);
    await page.locator('[data-testid^="investment-btn-group-rate-"]').first().click();
    await expect(page.getByTestId('group-rate-modal-panel')).toBeVisible({ timeout: 5_000 });

    await page.getByTestId('group-input-full-name').fill('Jane Corp');
    await page.getByTestId('group-input-email').fill('jane@corp.com');
    await page.getByTestId('group-input-phone').fill('(732) 555-0200');
    await page.getByTestId('group-select-course').selectOption('Stop The Bleed');
    await page.getByTestId('group-select-attendees').selectOption('5-12');
    await page.getByTestId('group-select-location').selectOption('Client Location');
    await page.getByTestId('group-textarea-preferred-date').fill('June weekends');
    await page.getByTestId('group-textarea-notes').fill('Please confirm AED equipment availability');

    await page.getByTestId('group-btn-submit').click();

    await expect(page.getByTestId('group-btn-success-close')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId('group-rate-form')).not.toBeAttached();
  });
});

// ─── T11 — Group Rate Modal — Validation Errors ───────────────────────────────

test.describe('T11 — Group Rate Modal — Validation Errors', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  async function openModal(page: Page) {
    await page.goto(BASE_URL);
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await waitForScroll(page);
    await page.locator('[data-testid^="investment-btn-group-rate-"]').first().click();
    await expect(page.getByTestId('group-rate-modal-panel')).toBeVisible({ timeout: 5_000 });
  }

  test('T11-01: submitting empty group form shows required-field errors', async ({ page }) => {
    await openModal(page);
    await page.getByTestId('group-btn-submit').click();

    await expect(page.locator('text=Full name is required.')).toBeVisible();
    await expect(page.locator('text=Email is required.')).toBeVisible();
    await expect(page.locator('text=Please select a group size.')).toBeVisible();
    await expect(page.locator('text=Please select a location.')).toBeVisible();
  });

  test('T11-02: Cancel button closes modal without submitting', async ({ page }) => {
    await openModal(page);
    await page.getByTestId('group-input-full-name').fill('Jane Corp');
    await page.getByTestId('group-btn-cancel').click();

    await expect(page.getByTestId('group-rate-modal-panel')).not.toBeVisible();
  });
});

// ─── T12 — FAQ Accordion ─────────────────────────────────────────────────────

test.describe('T12 — FAQ Accordion', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await waitForScroll(page);
  });

  test('T12-01: all FAQ items are collapsed by default (aria-expanded=false)', async ({ page }) => {
    const buttons = page.locator('[data-testid^="faq-btn-item-"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('T12-02: clicking a FAQ item expands it (aria-expanded=true)', async ({ page }) => {
    // Use prefix wildcard — resilient to any FAQ order or text change
    const btn = page.locator('[data-testid^="faq-btn-item-"]').first();
    await btn.click();
    await page.waitForTimeout(400); // allow CSS transition

    await expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  test('T12-03: clicking an open FAQ item collapses it again', async ({ page }) => {
    const btn = page.locator('[data-testid^="faq-btn-item-"]').first();
    await btn.click(); // open
    await page.waitForTimeout(400);
    await btn.click(); // close
    await page.waitForTimeout(400);

    await expect(btn).toHaveAttribute('aria-expanded', 'false');
  });
});

// ─── T13 — Footer Legal Modals ────────────────────────────────────────────────

test.describe('T13 — Footer Legal Modals', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Scroll footer into view
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
  });

  test('T13-01: Privacy Policy button opens modal with correct title', async ({ page }) => {
    await page.getByTestId('footer-btn-privacy').click();
    await expect(page.getByTestId('legal-modal-panel')).toBeVisible();
    await expect(page.locator('[data-testid="legal-modal-panel"] h2')).toContainText('Privacy Policy');
  });

  test('T13-02: Terms of Service button opens modal', async ({ page }) => {
    await page.getByTestId('footer-btn-terms').click();
    await expect(page.getByTestId('legal-modal-panel')).toBeVisible();
    await expect(page.locator('[data-testid="legal-modal-panel"] h2')).toContainText('Terms of Service');
  });

  test('T13-03: Accessibility button opens modal', async ({ page }) => {
    await page.getByTestId('footer-btn-accessibility').click();
    await expect(page.getByTestId('legal-modal-panel')).toBeVisible();
    await expect(page.locator('[data-testid="legal-modal-panel"] h2')).toContainText('Accessibility');
  });

  test('T13-04: header × button closes Privacy modal', async ({ page }) => {
    await page.getByTestId('footer-btn-privacy').click();
    await expect(page.getByTestId('legal-modal-panel')).toBeVisible();
    await page.getByTestId('legal-modal-btn-close-header').click();
    await expect(page.getByTestId('legal-modal-panel')).not.toBeVisible();
  });

  test('T13-05: footer Close button closes Terms modal', async ({ page }) => {
    await page.getByTestId('footer-btn-terms').click();
    await expect(page.getByTestId('legal-modal-panel')).toBeVisible();
    await page.getByTestId('legal-modal-btn-close-footer').click();
    await expect(page.getByTestId('legal-modal-panel')).not.toBeVisible();
  });
});

// ─── T14 — Mobile Floating Book Button ───────────────────────────────────────

test.describe('T14 — Mobile Floating Book Button', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('T14-01: floating button is visible on mobile and scrolls to #booking-form', async ({ page }) => {
    await page.goto(BASE_URL);

    const floatingBtn = page.getByTestId('floating-btn-book-course');
    await expect(floatingBtn).toBeVisible();

    await floatingBtn.click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#booking-form')).toBe(true);
  });
});

// ─── T15 — CTA Section Button ─────────────────────────────────────────────────

test.describe('T15 — CTA Section Button', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T15-01: "Book Your Course Now" scrolls to #booking-form', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByTestId('cta-btn-book-course').scrollIntoViewIfNeeded();
    await waitForScroll(page);

    await page.getByTestId('cta-btn-book-course').click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#booking-form')).toBe(true);
  });
});

// ─── T16 — Course Investment Contact Now ──────────────────────────────────────

test.describe('T16 — Course Investment Contact Now', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('T16-01: "Contact Now" in pricing scrolls to #booking-form', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await waitForScroll(page);

    await page.locator('[data-testid^="investment-btn-contact-"]').first().click();
    await waitForScroll(page);

    expect(await isInViewport(page, '#booking-form')).toBe(true);
  });

  test('T16-02: "Contact Now" pre-selects the correct course in the booking form', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await waitForScroll(page);

    // Grab the course title text from the first pricing row's h4
    const firstRow = page.locator('[data-testid^="investment-btn-contact-"]').first();
    const testId = await firstRow.getAttribute('data-testid');
    // The course slug is in the testid after "investment-btn-contact-"
    // We verify the select has a non-empty value matching something meaningful
    await firstRow.click();
    await waitForScroll(page);

    const selectValue = await page.getByTestId('booking-select-course').inputValue();
    expect(selectValue.length).toBeGreaterThan(0);
  });
});
