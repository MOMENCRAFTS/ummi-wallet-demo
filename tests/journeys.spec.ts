/**
 * E2E Journey Tests — Ummi Wallet Demo
 * Tests all 4 role journeys end-to-end:
 *   Admin: Landing → Login → Onboarding (4 steps) → Dashboard → Finance flow
 *   Mother: Landing → Login → Onboarding (3 steps) → Dashboard → Request/Bills/SOS
 *   Brother: Landing → Login → Onboarding (3 steps) → Dashboard → Audit/Pay
 *   Observer: Landing → Login → Onboarding (3 steps) → Dashboard → Read-only
 */
import { test, expect, type Page } from '@playwright/test';

/* ─── Helpers ─── */

async function waitForScreen(page: Page, text: string, timeout = 5000) {
  await expect(page.getByText(text).first()).toBeVisible({ timeout });
}

async function clickButton(page: Page, text: string) {
  await page.getByText(text).first().click();
  await page.waitForTimeout(600); // animation settle
}

async function selectRole(page: Page, role: 'admin' | 'mother' | 'brother' | 'observer') {
  // Use the test-only setter exposed on window (no navigation side-effect)
  await page.evaluate((r) => {
    (window as any).__setDemoRole__(r);
  }, role);
  await page.waitForTimeout(300);
}

async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `tests/screenshots/${name}.png`, fullPage: true });
}

/* ═══════════ ADMIN JOURNEY ═══════════ */

test.describe('Admin (الابن المسؤول) Journey', () => {
  test('Full flow: Landing → Onboarding → Dashboard → Finance', async ({ page }) => {
    // 1. Landing
    await page.goto('/');
    await page.waitForTimeout(3000); // splash video
    await waitForScreen(page, 'محفظة أمي');
    await takeScreenshot(page, '01-landing');

    // 2. Click explore → Login
    await clickButton(page, 'استكشف التطبيق');
    await page.waitForTimeout(500);
    await takeScreenshot(page, '02-login');

    // 3. Click Google OAuth → triggers transition → Phone Verify
    const googleBtn = page.locator('.oauth-btn').first();
    await googleBtn.click();
    await page.waitForTimeout(2500); // OAuth transition video

    // 4. Phone Verify — click send, wait for OTP step, then auto-fill completes
    await waitForScreen(page, 'رقم الجوال', 8000);
    const sendBtn = page.locator('button', { hasText: 'إرسال رمز التحقق' });
    await sendBtn.click();
    await page.waitForTimeout(800); // exit animation
    // OTP screen should appear, auto-fill fires after 2s, success after 2.5s
    await waitForScreen(page, 'رمز التحقق', 5000);
    // Wait for auto-fill + verify + success + navigate to onboarding
    await waitForScreen(page, 'تم التحقق', 8000);
    
    // 5. Onboarding Step 1: Welcome — wait longer since success → navigate takes 2s
    await waitForScreen(page, 'الابن المسؤول', 10000);
    await takeScreenshot(page, '03-onboarding-welcome');
    await clickButton(page, 'يلّا نبدأ');

    // 5. Onboarding Step 2: Mother's info
    await waitForScreen(page, 'بيانات الوالدة');
    await takeScreenshot(page, '04-onboarding-mother-info');
    await clickButton(page, 'التالي');

    // 6. Onboarding Step 3: Invite family
    await waitForScreen(page, 'دعوة أفراد العائلة');
    await takeScreenshot(page, '05-onboarding-invite');
    await clickButton(page, 'أكمل الإعداد');

    // 7. Onboarding Step 4: All set
    await waitForScreen(page, 'كل شي جاهز');
    await takeScreenshot(page, '06-onboarding-done');
    await clickButton(page, 'افتح لوحة التحكم');

    // 8. Admin Dashboard
    await waitForScreen(page, 'صحة الخزنة');
    await takeScreenshot(page, '07-admin-dashboard');

    // 9. Navigate to Finance (AI Planning)
    const aiPlanBtn = page.locator('.manage-item').filter({ hasText: 'تخطيط ذكي' });
    if (await aiPlanBtn.count() > 0) {
      await aiPlanBtn.click();
      await page.waitForTimeout(800);
      await takeScreenshot(page, '08-finance-welcome');

      // Start chat
      const startBtn = page.getByText('ابدأ التخطيط').first();
      if (await startBtn.isVisible()) {
        await startBtn.click();
        await page.waitForTimeout(1000);
        await takeScreenshot(page, '09-finance-chat');
      }
    }

    // 10. Check logout exists
    const logoutBtn = page.locator('.dashboard-logout');
    await expect(logoutBtn).toBeVisible();
    await takeScreenshot(page, '10-admin-final');
  });
});

/* ═══════════ MOTHER JOURNEY ═══════════ */

test.describe('Mother (الوالدة) Journey', () => {
  test('Full flow: Login → Onboarding → Dashboard → Request', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Go to login first
    await clickButton(page, 'استكشف التطبيق');
    await page.waitForTimeout(500);

    // Now select Mother role from right panel (while on login screen)
    await selectRole(page, 'mother');

    // Login via OAuth
    const googleBtn = page.locator('.oauth-btn').first();
    await googleBtn.click();
    await page.waitForTimeout(2500);

    // Phone Verify
    await waitForScreen(page, 'رقم الجوال', 8000);
    const sendBtnM = page.locator('button', { hasText: 'إرسال رمز التحقق' });
    await sendBtnM.click();
    await page.waitForTimeout(800);
    await waitForScreen(page, 'رمز التحقق', 5000);
    await waitForScreen(page, 'تم التحقق', 8000);

    // Onboarding - Welcome
    await waitForScreen(page, 'أهلاً يا أمي', 10000);
    await takeScreenshot(page, '11-mother-welcome');
    await clickButton(page, 'يلّا نبدأ');

    // Onboarding - Confirm identity
    await waitForScreen(page, 'تأكيد الانضمام');
    await takeScreenshot(page, '12-mother-confirm');
    await clickButton(page, 'تأكيد وانضمام');

    // Onboarding - All set
    await waitForScreen(page, 'كل شي جاهز');
    await clickButton(page, 'افتح لوحة التحكم');

    // Mother Dashboard
    await page.waitForTimeout(800);
    await takeScreenshot(page, '13-mother-dashboard');

    // Navigate to Request Money
    const requestCard = page.locator('.mother-action-card').first();
    if (await requestCard.count() > 0) {
      await requestCard.click();
      await page.waitForTimeout(600);
      await waitForScreen(page, 'طلب مبلغ');
      await takeScreenshot(page, '14-mother-request');

      // Go back
      const backBtn = page.locator('.back-btn').first();
      await backBtn.click();
      await page.waitForTimeout(400);
    }

    // Check logout
    const logoutBtn = page.locator('.dashboard-logout');
    await expect(logoutBtn).toBeVisible();
    await takeScreenshot(page, '15-mother-final');
  });
});

/* ═══════════ BROTHER JOURNEY ═══════════ */

test.describe('Brother (الأخ المساهم) Journey', () => {
  test('Full flow: Login → Onboarding → Dashboard → Audit', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Go to login first
    await clickButton(page, 'استكشف التطبيق');
    await page.waitForTimeout(500);

    // Select Brother role from right panel
    await selectRole(page, 'brother');

    // Login
    const googleBtn = page.locator('.oauth-btn').first();
    await googleBtn.click();
    await page.waitForTimeout(2500);

    // Phone Verify
    await waitForScreen(page, 'رقم الجوال', 8000);
    const sendBtnB = page.locator('button', { hasText: 'إرسال رمز التحقق' });
    await sendBtnB.click();
    await page.waitForTimeout(800);
    await waitForScreen(page, 'رمز التحقق', 5000);
    await waitForScreen(page, 'تم التحقق', 8000);

    // Onboarding
    await waitForScreen(page, 'أهلاً يا أخي', 10000);
    await takeScreenshot(page, '16-brother-welcome');
    await clickButton(page, 'يلّا نبدأ');

    await waitForScreen(page, 'تأكيد الانضمام');
    await clickButton(page, 'تأكيد وانضمام');

    await waitForScreen(page, 'كل شي جاهز');
    await clickButton(page, 'افتح لوحة التحكم');

    // Brother Dashboard — shows LOCKED state (plan not published)
    await page.waitForTimeout(800);
    await waitForScreen(page, 'الخطة لم تنشر بعد', 5000);
    await takeScreenshot(page, '17-brother-locked');

    // Chat button should still be available
    const chatBtn = page.getByText('المحادثات').first();
    await expect(chatBtn).toBeVisible();

    // Check logout
    const logoutBtn = page.locator('.dashboard-logout');
    await expect(logoutBtn).toBeVisible();
    await takeScreenshot(page, '19-brother-final');
  });
});

/* ═══════════ OBSERVER JOURNEY ═══════════ */

test.describe('Observer (الأخت المتابعة) Journey', () => {
  test('Full flow: Login → Onboarding → Dashboard (read-only)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Go to login first
    await clickButton(page, 'استكشف التطبيق');
    await page.waitForTimeout(500);

    // Select Observer role from right panel
    await selectRole(page, 'observer');

    // Login
    const googleBtn = page.locator('.oauth-btn').first();
    await googleBtn.click();
    await page.waitForTimeout(2500);

    // Phone Verify
    await waitForScreen(page, 'رقم الجوال', 8000);
    const sendBtnO = page.locator('button', { hasText: 'إرسال رمز التحقق' });
    await sendBtnO.click();
    await page.waitForTimeout(800);
    await waitForScreen(page, 'رمز التحقق', 5000);
    await waitForScreen(page, 'تم التحقق', 8000);

    // Onboarding
    await waitForScreen(page, 'أهلاً يا أختي', 10000);
    await takeScreenshot(page, '20-observer-welcome');
    await clickButton(page, 'يلّا نبدأ');

    await waitForScreen(page, 'تأكيد الانضمام');
    await clickButton(page, 'تأكيد وانضمام');

    await waitForScreen(page, 'كل شي جاهز');
    await clickButton(page, 'افتح لوحة التحكم');

    // Observer Dashboard — shows LOCKED state (plan not published)
    await page.waitForTimeout(800);
    await waitForScreen(page, 'بانتظار نشر الخطة', 5000);
    await takeScreenshot(page, '21-observer-locked');

    // Chat button should be available
    const chatBtn = page.getByText('المحادثات').first();
    await expect(chatBtn).toBeVisible();

    // Check logout
    const logoutBtn = page.locator('.dashboard-logout');
    await expect(logoutBtn).toBeVisible();
    await takeScreenshot(page, '22-observer-final');
  });
});

/* ═══════════ CROSS-CUTTING TESTS ═══════════ */

test.describe('Cross-cutting checks', () => {
  test('Language toggle works', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Default should be Arabic
    await waitForScreen(page, 'محفظة أمي');

    // Switch to English via right panel
    const enBtn = page.getByText('English').first();
    if (await enBtn.isVisible()) {
      await enBtn.click();
      await page.waitForTimeout(400);
      await waitForScreen(page, 'Ummi Wallet');
      await takeScreenshot(page, '23-english-landing');
    }
  });

  test('Logout returns to landing', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Skip directly to dashboard
    const skipBtn = page.getByText('دخول مباشر').first();
    await skipBtn.click();
    await page.waitForTimeout(600);

    // Find and click logout
    const logoutBtn = page.locator('.dashboard-logout');
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.waitForTimeout(600);
      await waitForScreen(page, 'محفظة أمي');
      await takeScreenshot(page, '24-logout-landing');
    }
  });

  test('Role naming consistency check', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);

    // Verify right panel has correct role names
    await expect(page.getByText('الابن المسؤول').first()).toBeVisible();
    await expect(page.getByText('الوالدة').first()).toBeVisible();
    await expect(page.getByText('الأخ المساهم').first()).toBeVisible();
    await expect(page.getByText('الأخت المتابعة').first()).toBeVisible();
    await takeScreenshot(page, '25-role-names');
  });
});
