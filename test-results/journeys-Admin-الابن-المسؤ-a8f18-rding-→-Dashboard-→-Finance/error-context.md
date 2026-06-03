# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> Admin (الابن المسؤول) Journey >> Full flow: Landing → Onboarding → Dashboard → Finance
- Location: tests\journeys.spec.ts:37:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8081/
Call log:
  - navigating to "http://localhost:8081/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: localhost
      - text: refused to connect.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Reload" [ref=e19] [cursor=pointer]
    - button "Details" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1   | /**
  2   |  * E2E Journey Tests — Ummi Wallet Demo
  3   |  * Tests all 4 role journeys end-to-end:
  4   |  *   Admin: Landing → Login → Onboarding (4 steps) → Dashboard → Finance flow
  5   |  *   Mother: Landing → Login → Onboarding (3 steps) → Dashboard → Request/Bills/SOS
  6   |  *   Brother: Landing → Login → Onboarding (3 steps) → Dashboard → Audit/Pay
  7   |  *   Observer: Landing → Login → Onboarding (3 steps) → Dashboard → Read-only
  8   |  */
  9   | import { test, expect, type Page } from '@playwright/test';
  10  | 
  11  | /* ─── Helpers ─── */
  12  | 
  13  | async function waitForScreen(page: Page, text: string, timeout = 5000) {
  14  |   await expect(page.getByText(text).first()).toBeVisible({ timeout });
  15  | }
  16  | 
  17  | async function clickButton(page: Page, text: string) {
  18  |   await page.getByText(text).first().click();
  19  |   await page.waitForTimeout(600); // animation settle
  20  | }
  21  | 
  22  | async function selectRole(page: Page, role: 'admin' | 'mother' | 'brother' | 'observer') {
  23  |   // Use the test-only setter exposed on window (no navigation side-effect)
  24  |   await page.evaluate((r) => {
  25  |     (window as any).__setDemoRole__(r);
  26  |   }, role);
  27  |   await page.waitForTimeout(300);
  28  | }
  29  | 
  30  | async function takeScreenshot(page: Page, name: string) {
  31  |   await page.screenshot({ path: `tests/screenshots/${name}.png`, fullPage: true });
  32  | }
  33  | 
  34  | /* ═══════════ ADMIN JOURNEY ═══════════ */
  35  | 
  36  | test.describe('Admin (الابن المسؤول) Journey', () => {
  37  |   test('Full flow: Landing → Onboarding → Dashboard → Finance', async ({ page }) => {
  38  |     // 1. Landing
> 39  |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8081/
  40  |     await page.waitForTimeout(3000); // splash video
  41  |     await waitForScreen(page, 'محفظة أمي');
  42  |     await takeScreenshot(page, '01-landing');
  43  | 
  44  |     // 2. Click explore → Login
  45  |     await clickButton(page, 'استكشف التطبيق');
  46  |     await page.waitForTimeout(500);
  47  |     await takeScreenshot(page, '02-login');
  48  | 
  49  |     // 3. Click Google OAuth → triggers transition → Phone Verify
  50  |     const googleBtn = page.locator('.oauth-btn').first();
  51  |     await googleBtn.click();
  52  |     await page.waitForTimeout(2500); // OAuth transition video
  53  | 
  54  |     // 4. Phone Verify — click send, wait for OTP step, then auto-fill completes
  55  |     await waitForScreen(page, 'رقم الجوال', 8000);
  56  |     const sendBtn = page.locator('button', { hasText: 'إرسال رمز التحقق' });
  57  |     await sendBtn.click();
  58  |     await page.waitForTimeout(800); // exit animation
  59  |     // OTP screen should appear, auto-fill fires after 2s, success after 2.5s
  60  |     await waitForScreen(page, 'رمز التحقق', 5000);
  61  |     // Wait for auto-fill + verify + success + navigate to onboarding
  62  |     await waitForScreen(page, 'تم التحقق', 8000);
  63  |     
  64  |     // 5. Onboarding Step 1: Welcome — wait longer since success → navigate takes 2s
  65  |     await waitForScreen(page, 'الابن المسؤول', 10000);
  66  |     await takeScreenshot(page, '03-onboarding-welcome');
  67  |     await clickButton(page, 'يلّا نبدأ');
  68  | 
  69  |     // 5. Onboarding Step 2: Mother's info
  70  |     await waitForScreen(page, 'بيانات الوالدة');
  71  |     await takeScreenshot(page, '04-onboarding-mother-info');
  72  |     await clickButton(page, 'التالي');
  73  | 
  74  |     // 6. Onboarding Step 3: Invite family
  75  |     await waitForScreen(page, 'دعوة أفراد العائلة');
  76  |     await takeScreenshot(page, '05-onboarding-invite');
  77  |     await clickButton(page, 'أكمل الإعداد');
  78  | 
  79  |     // 7. Onboarding Step 4: All set
  80  |     await waitForScreen(page, 'كل شي جاهز');
  81  |     await takeScreenshot(page, '06-onboarding-done');
  82  |     await clickButton(page, 'افتح لوحة التحكم');
  83  | 
  84  |     // 8. Admin Dashboard
  85  |     await waitForScreen(page, 'صحة الخزنة');
  86  |     await takeScreenshot(page, '07-admin-dashboard');
  87  | 
  88  |     // 9. Navigate to Finance (AI Planning)
  89  |     const aiPlanBtn = page.locator('.manage-item').filter({ hasText: 'تخطيط ذكي' });
  90  |     if (await aiPlanBtn.count() > 0) {
  91  |       await aiPlanBtn.click();
  92  |       await page.waitForTimeout(800);
  93  |       await takeScreenshot(page, '08-finance-welcome');
  94  | 
  95  |       // Start chat
  96  |       const startBtn = page.getByText('ابدأ التخطيط').first();
  97  |       if (await startBtn.isVisible()) {
  98  |         await startBtn.click();
  99  |         await page.waitForTimeout(1000);
  100 |         await takeScreenshot(page, '09-finance-chat');
  101 |       }
  102 |     }
  103 | 
  104 |     // 10. Check logout exists
  105 |     const logoutBtn = page.locator('.dashboard-logout');
  106 |     await expect(logoutBtn).toBeVisible();
  107 |     await takeScreenshot(page, '10-admin-final');
  108 |   });
  109 | });
  110 | 
  111 | /* ═══════════ MOTHER JOURNEY ═══════════ */
  112 | 
  113 | test.describe('Mother (الوالدة) Journey', () => {
  114 |   test('Full flow: Login → Onboarding → Dashboard → Request', async ({ page }) => {
  115 |     await page.goto('/');
  116 |     await page.waitForTimeout(3000);
  117 | 
  118 |     // Go to login first
  119 |     await clickButton(page, 'استكشف التطبيق');
  120 |     await page.waitForTimeout(500);
  121 | 
  122 |     // Now select Mother role from right panel (while on login screen)
  123 |     await selectRole(page, 'mother');
  124 | 
  125 |     // Login via OAuth
  126 |     const googleBtn = page.locator('.oauth-btn').first();
  127 |     await googleBtn.click();
  128 |     await page.waitForTimeout(2500);
  129 | 
  130 |     // Phone Verify
  131 |     await waitForScreen(page, 'رقم الجوال', 8000);
  132 |     const sendBtnM = page.locator('button', { hasText: 'إرسال رمز التحقق' });
  133 |     await sendBtnM.click();
  134 |     await page.waitForTimeout(800);
  135 |     await waitForScreen(page, 'رمز التحقق', 5000);
  136 |     await waitForScreen(page, 'تم التحقق', 8000);
  137 | 
  138 |     // Onboarding - Welcome
  139 |     await waitForScreen(page, 'أهلاً يا أمي', 10000);
```