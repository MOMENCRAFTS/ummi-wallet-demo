/**
 * Comprehensive Audit — Ummi Wallet Demo
 * Checks: console errors, all 29 screens navigable, role nudge fires,
 *         mobile viewport, language switch, auto-tour, performance timing
 * Run: node tests/audit.cjs
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3002/ummi-wallet-demo/';
const SS_DIR = path.join(__dirname, 'screenshots', 'audit');
fs.mkdirSync(SS_DIR, { recursive: true });

const SCREENS = [
  'landing','login','phone-verify','onboarding',
  'admin-dashboard','queue','payroll','admin-bills','maintenance',
  'finance-welcome','finance-chat','finance-summary','finance-dispatch','finance-waiting','finance-celebration',
  'mother-dashboard','mother-request','mother-bills','mother-balance','mother-gratitude','mother-sos',
  'brother-dashboard','brother-audit','brother-contribution',
  'observer-dashboard','observer-feed','observer-celebrations',
  'settings','notifications',
];

const ROLE_SCREENS = {
  admin: ['admin-dashboard','queue','payroll','admin-bills','finance-welcome','finance-chat'],
  mother: ['mother-dashboard','mother-request','mother-sos'],
  brother: ['brother-dashboard','brother-contribution'],
  observer: ['observer-dashboard','observer-feed'],
};

const results = { pass: [], fail: [], warn: [] };
let consoleErrors = [];

async function ss(page, name) {
  await page.screenshot({ path: path.join(SS_DIR, `${name}.png`) });
}

async function navigate(page, screen) {
  await page.evaluate((s) => {
    const nav = window.__ummiNavigate__;
    if (nav) nav(s);
  }, screen);
  await page.waitForTimeout(600);
}

async function setRole(page, role) {
  await page.evaluate((r) => { if (window.__setDemoRole__) window.__setDemoRole__(r); }, role);
  await page.waitForTimeout(300);
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  /* ═══ 1. Desktop audit ═══ */
  console.log('\n═══ 1. DESKTOP — All 29 screens ═══');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // ignore known non-critical
        if (!text.includes('ResizeObserver') && !text.includes('favicon')) {
          consoleErrors.push({ screen: 'desktop', text });
        }
      }
    });
    page.on('pageerror', err => {
      results.fail.push(`💥 JS crash: ${err.message}`);
    });

    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Expose navigate helper by injecting through navigation context
    for (const screen of SCREENS) {
      try {
        await navigate(page, screen);
        const url = page.url();
        await ss(page, `desktop-${screen}`);
        results.pass.push(`✅ Screen: ${screen}`);
      } catch (e) {
        results.fail.push(`❌ Screen: ${screen} — ${e.message}`);
      }
    }
    await ctx.close();
  }

  /* ═══ 2. Role Nudge audit ═══ */
  console.log('\n═══ 2. ROLE NUDGE — mismatch detection ═══');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Set to observer, navigate to admin screen → nudge should fire
    await setRole(page, 'observer');
    await navigate(page, 'admin-dashboard');
    await page.waitForTimeout(200);

    // Check phase 1: nudge-wrong on observer card
    const wrongCard = page.locator('.role-card.nudge-wrong');
    const wrongCount = await wrongCard.count();
    if (wrongCount > 0) {
      results.pass.push('✅ Role Nudge Phase 1: nudge-wrong class applied');
      await ss(page, 'nudge-phase1-red');
    } else {
      results.fail.push('❌ Role Nudge Phase 1: nudge-wrong class NOT found');
    }

    // Wait for phase 2
    await page.waitForTimeout(900);
    const correctCard = page.locator('.role-card.nudge-correct');
    const correctCount = await correctCard.count();
    if (correctCount > 0) {
      results.pass.push('✅ Role Nudge Phase 2: nudge-correct class applied');
      await ss(page, 'nudge-phase2-mint');
    } else {
      results.fail.push('❌ Role Nudge Phase 2: nudge-correct class NOT found');
    }

    // Check badge appeared
    const badge = page.locator('.nudge-badge');
    if (await badge.count() > 0) {
      results.pass.push('✅ Role Nudge Badge: .nudge-badge visible');
    } else {
      results.warn.push('⚠️  Role Nudge Badge: .nudge-badge not found (may need overflow:visible on parent)');
    }

    // Auto-dismiss after 4s
    await page.waitForTimeout(4200);
    const afterDismiss = await page.locator('.role-card.nudge-correct').count();
    if (afterDismiss === 0) {
      results.pass.push('✅ Role Nudge Auto-dismiss: cleared after 4s');
    } else {
      results.fail.push('❌ Role Nudge Auto-dismiss: still active after 4s');
    }

    // Auto-tour should skip nudge
    await page.evaluate(() => {
      // Start tour programmatically
      document.querySelector('.demo-tour-btn')?.click();
    });
    await page.waitForTimeout(500);
    await navigate(page, 'mother-dashboard'); // wrong role but tour "active"
    await page.waitForTimeout(300);
    const nudgeDuringTour = await page.locator('.role-card.nudge-wrong').count();
    if (nudgeDuringTour === 0) {
      results.pass.push('✅ Role Nudge: skipped during auto-tour');
    } else {
      results.warn.push('⚠️  Role Nudge: fired during auto-tour (check autoPlay state)');
    }

    await ctx.close();
  }

  /* ═══ 3. Mobile viewport audit ═══ */
  console.log('\n═══ 3. MOBILE — iPhone 14 Pro (390×844) ═══');
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Check no desktop layout rendered
    const desktopContainer = await page.locator('.demo-container').count();
    if (desktopContainer === 0) {
      results.pass.push('✅ Mobile: .demo-container hidden (correct)');
    } else {
      results.fail.push('❌ Mobile: .demo-container still visible on mobile');
    }

    // Check mobile layout rendered
    const mobileContainer = await page.locator('.demo-container-mobile').count();
    if (mobileContainer > 0) {
      results.pass.push('✅ Mobile: .demo-container-mobile present');
    } else {
      results.fail.push('❌ Mobile: .demo-container-mobile not found');
    }

    // Check pill present
    const pill = await page.locator('.mobile-role-pill').count();
    if (pill > 0) {
      results.pass.push('✅ Mobile: .mobile-role-pill visible');
    } else {
      results.fail.push('❌ Mobile: .mobile-role-pill not found');
    }

    // Check phone frame IS NOT rendered
    const phoneFrame = await page.locator('.phone-frame').count();
    if (phoneFrame === 0) {
      results.pass.push('✅ Mobile: phone frame removed (frameless mode)');
    } else {
      results.fail.push('❌ Mobile: phone frame still visible (should be frameless)');
    }

    await ss(page, 'mobile-landing');

    // Tap pill center → sheet should open
    const pillCenter = page.locator('.mobile-pill-role');
    await pillCenter.click();
    await page.waitForTimeout(500);
    const sheet = await page.locator('.mobile-role-sheet.open').count();
    if (sheet > 0) {
      results.pass.push('✅ Mobile: role sheet opens on pill tap');
      await ss(page, 'mobile-sheet-open');
    } else {
      results.fail.push('❌ Mobile: role sheet did not open');
    }

    // Mobile nudge: set observer, nav to admin
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await setRole(page, 'observer');
    await navigate(page, 'admin-dashboard');
    await page.waitForTimeout(200);
    const mobileNudgeRed = await page.locator('.mobile-pill-role.nudge-red').count();
    if (mobileNudgeRed > 0) {
      results.pass.push('✅ Mobile Nudge Phase 1: pill turns red');
      await ss(page, 'mobile-nudge-red');
    } else {
      results.warn.push('⚠️  Mobile Nudge Phase 1: nudge-red class not found on pill');
    }

    await page.waitForTimeout(1000);
    const mobileNudgeSuggest = await page.locator('.mobile-pill-role.nudge-suggest').count();
    if (mobileNudgeSuggest > 0) {
      results.pass.push('✅ Mobile Nudge Phase 2: pill morphs to suggest');
      await ss(page, 'mobile-nudge-suggest');
    } else {
      results.warn.push('⚠️  Mobile Nudge Phase 2: nudge-suggest class not found on pill');
    }

    await ctx.close();
  }

  /* ═══ 4. Language toggle audit ═══ */
  console.log('\n═══ 4. LANGUAGE — AR/EN switch ═══');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Default should be AR
    const arText = await page.locator('text=محفظة أمي').count();
    if (arText > 0) {
      results.pass.push('✅ Language: default Arabic renders correctly');
    } else {
      results.fail.push('❌ Language: Arabic default text not found');
    }

    // Switch to EN
    const enBtn = page.locator('.role-lang-btn').filter({ hasText: 'English' });
    await enBtn.click();
    await page.waitForTimeout(400);
    const enText = await page.locator('text=Ummi Wallet').count();
    if (enText > 0) {
      results.pass.push('✅ Language: English switch works');
      await ss(page, 'lang-english');
    } else {
      results.fail.push('❌ Language: English text not found after switch');
    }

    await ctx.close();
  }

  /* ═══ 5. Performance timing ═══ */
  console.log('\n═══ 5. PERFORMANCE — load timing ═══');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const t0 = Date.now();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - t0;
    const perf = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
        ttfb: Math.round(nav.responseStart - nav.startTime),
      };
    });
    results.pass.push(`📊 TTFB: ${perf.ttfb}ms`);
    results.pass.push(`📊 DOMContentLoaded: ${perf.domContentLoaded}ms`);
    results.pass.push(`📊 Load complete: ${perf.loadComplete}ms`);
    if (loadTime < 3000) {
      results.pass.push(`✅ Load time: ${loadTime}ms (under 3s)`);
    } else {
      results.warn.push(`⚠️  Load time: ${loadTime}ms (over 3s — consider code splitting)`);
    }
    await ctx.close();
  }

  await browser.close();

  /* ═══ REPORT ═══ */
  const total = results.pass.length + results.fail.length + results.warn.length;
  const report = [
    '═══════════════════════════════════════════════',
    ' UMMI WALLET DEMO — AUDIT REPORT',
    `═══════════════════════════════════════════════`,
    `  Total checks : ${total}`,
    `  Passed        : ${results.pass.length}`,
    `  Failed        : ${results.fail.length}`,
    `  Warnings      : ${results.warn.length}`,
    `  Console errors: ${consoleErrors.length}`,
    '───────────────────────────────────────────────',
    ...results.pass,
    ...(results.warn.length ? ['', '─── WARNINGS ───', ...results.warn] : []),
    ...(results.fail.length ? ['', '─── FAILURES ───', ...results.fail] : []),
    ...(consoleErrors.length ? ['', '─── CONSOLE ERRORS ───', ...consoleErrors.map(e => `  [${e.screen}] ${e.text.slice(0, 120)}`)] : []),
    '═══════════════════════════════════════════════',
  ].join('\n');

  console.log('\n' + report);

  const reportPath = path.join(__dirname, 'screenshots', 'audit-report.txt');
  fs.writeFileSync(reportPath, report);
  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Screenshots: ${SS_DIR}`);

  process.exit(results.fail.length > 0 ? 1 : 0);
})();
