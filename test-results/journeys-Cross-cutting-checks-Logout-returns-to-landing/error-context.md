# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> Cross-cutting checks >> Logout returns to landing
- Location: tests\journeys.spec.ts:305:3

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
  206 |     await takeScreenshot(page, '16-brother-welcome');
  207 |     await clickButton(page, 'يلّا نبدأ');
  208 | 
  209 |     await waitForScreen(page, 'تأكيد الانضمام');
  210 |     await clickButton(page, 'تأكيد وانضمام');
  211 | 
  212 |     await waitForScreen(page, 'كل شي جاهز');
  213 |     await clickButton(page, 'افتح لوحة التحكم');
  214 | 
  215 |     // Brother Dashboard — shows LOCKED state (plan not published)
  216 |     await page.waitForTimeout(800);
  217 |     await waitForScreen(page, 'الخطة لم تنشر بعد', 5000);
  218 |     await takeScreenshot(page, '17-brother-locked');
  219 | 
  220 |     // Chat button should still be available
  221 |     const chatBtn = page.getByText('المحادثات').first();
  222 |     await expect(chatBtn).toBeVisible();
  223 | 
  224 |     // Check logout
  225 |     const logoutBtn = page.locator('.dashboard-logout');
  226 |     await expect(logoutBtn).toBeVisible();
  227 |     await takeScreenshot(page, '19-brother-final');
  228 |   });
  229 | });
  230 | 
  231 | /* ═══════════ OBSERVER JOURNEY ═══════════ */
  232 | 
  233 | test.describe('Observer (الأخت المتابعة) Journey', () => {
  234 |   test('Full flow: Login → Onboarding → Dashboard (read-only)', async ({ page }) => {
  235 |     await page.goto('/');
  236 |     await page.waitForTimeout(3000);
  237 | 
  238 |     // Go to login first
  239 |     await clickButton(page, 'استكشف التطبيق');
  240 |     await page.waitForTimeout(500);
  241 | 
  242 |     // Select Observer role from right panel
  243 |     await selectRole(page, 'observer');
  244 | 
  245 |     // Login
  246 |     const googleBtn = page.locator('.oauth-btn').first();
  247 |     await googleBtn.click();
  248 |     await page.waitForTimeout(2500);
  249 | 
  250 |     // Phone Verify
  251 |     await waitForScreen(page, 'رقم الجوال', 8000);
  252 |     const sendBtnO = page.locator('button', { hasText: 'إرسال رمز التحقق' });
  253 |     await sendBtnO.click();
  254 |     await page.waitForTimeout(800);
  255 |     await waitForScreen(page, 'رمز التحقق', 5000);
  256 |     await waitForScreen(page, 'تم التحقق', 8000);
  257 | 
  258 |     // Onboarding
  259 |     await waitForScreen(page, 'أهلاً يا أختي', 10000);
  260 |     await takeScreenshot(page, '20-observer-welcome');
  261 |     await clickButton(page, 'يلّا نبدأ');
  262 | 
  263 |     await waitForScreen(page, 'تأكيد الانضمام');
  264 |     await clickButton(page, 'تأكيد وانضمام');
  265 | 
  266 |     await waitForScreen(page, 'كل شي جاهز');
  267 |     await clickButton(page, 'افتح لوحة التحكم');
  268 | 
  269 |     // Observer Dashboard — shows LOCKED state (plan not published)
  270 |     await page.waitForTimeout(800);
  271 |     await waitForScreen(page, 'بانتظار نشر الخطة', 5000);
  272 |     await takeScreenshot(page, '21-observer-locked');
  273 | 
  274 |     // Chat button should be available
  275 |     const chatBtn = page.getByText('المحادثات').first();
  276 |     await expect(chatBtn).toBeVisible();
  277 | 
  278 |     // Check logout
  279 |     const logoutBtn = page.locator('.dashboard-logout');
  280 |     await expect(logoutBtn).toBeVisible();
  281 |     await takeScreenshot(page, '22-observer-final');
  282 |   });
  283 | });
  284 | 
  285 | /* ═══════════ CROSS-CUTTING TESTS ═══════════ */
  286 | 
  287 | test.describe('Cross-cutting checks', () => {
  288 |   test('Language toggle works', async ({ page }) => {
  289 |     await page.goto('/');
  290 |     await page.waitForTimeout(3000);
  291 | 
  292 |     // Default should be Arabic
  293 |     await waitForScreen(page, 'محفظة أمي');
  294 | 
  295 |     // Switch to English via right panel
  296 |     const enBtn = page.getByText('English').first();
  297 |     if (await enBtn.isVisible()) {
  298 |       await enBtn.click();
  299 |       await page.waitForTimeout(400);
  300 |       await waitForScreen(page, 'Ummi Wallet');
  301 |       await takeScreenshot(page, '23-english-landing');
  302 |     }
  303 |   });
  304 | 
  305 |   test('Logout returns to landing', async ({ page }) => {
> 306 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8081/
  307 |     await page.waitForTimeout(3000);
  308 | 
  309 |     // Skip directly to dashboard
  310 |     const skipBtn = page.getByText('دخول مباشر').first();
  311 |     await skipBtn.click();
  312 |     await page.waitForTimeout(600);
  313 | 
  314 |     // Find and click logout
  315 |     const logoutBtn = page.locator('.dashboard-logout');
  316 |     if (await logoutBtn.isVisible()) {
  317 |       await logoutBtn.click();
  318 |       await page.waitForTimeout(600);
  319 |       await waitForScreen(page, 'محفظة أمي');
  320 |       await takeScreenshot(page, '24-logout-landing');
  321 |     }
  322 |   });
  323 | 
  324 |   test('Role naming consistency check', async ({ page }) => {
  325 |     await page.goto('/');
  326 |     await page.waitForTimeout(3000);
  327 | 
  328 |     // Verify right panel has correct role names
  329 |     await expect(page.getByText('الابن المسؤول').first()).toBeVisible();
  330 |     await expect(page.getByText('الوالدة').first()).toBeVisible();
  331 |     await expect(page.getByText('الأخ المساهم').first()).toBeVisible();
  332 |     await expect(page.getByText('الأخت المتابعة').first()).toBeVisible();
  333 |     await takeScreenshot(page, '25-role-names');
  334 |   });
  335 | });
  336 | 
```