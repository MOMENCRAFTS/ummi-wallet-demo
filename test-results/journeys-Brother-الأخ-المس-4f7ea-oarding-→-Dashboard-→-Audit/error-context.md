# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> Brother (الأخ المساهم) Journey >> Full flow: Login → Onboarding → Dashboard → Audit
- Location: tests\journeys.spec.ts:180:3

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
  140 |     await takeScreenshot(page, '11-mother-welcome');
  141 |     await clickButton(page, 'يلّا نبدأ');
  142 | 
  143 |     // Onboarding - Confirm identity
  144 |     await waitForScreen(page, 'تأكيد الانضمام');
  145 |     await takeScreenshot(page, '12-mother-confirm');
  146 |     await clickButton(page, 'تأكيد وانضمام');
  147 | 
  148 |     // Onboarding - All set
  149 |     await waitForScreen(page, 'كل شي جاهز');
  150 |     await clickButton(page, 'افتح لوحة التحكم');
  151 | 
  152 |     // Mother Dashboard
  153 |     await page.waitForTimeout(800);
  154 |     await takeScreenshot(page, '13-mother-dashboard');
  155 | 
  156 |     // Navigate to Request Money
  157 |     const requestCard = page.locator('.mother-action-card').first();
  158 |     if (await requestCard.count() > 0) {
  159 |       await requestCard.click();
  160 |       await page.waitForTimeout(600);
  161 |       await waitForScreen(page, 'طلب مبلغ');
  162 |       await takeScreenshot(page, '14-mother-request');
  163 | 
  164 |       // Go back
  165 |       const backBtn = page.locator('.back-btn').first();
  166 |       await backBtn.click();
  167 |       await page.waitForTimeout(400);
  168 |     }
  169 | 
  170 |     // Check logout
  171 |     const logoutBtn = page.locator('.dashboard-logout');
  172 |     await expect(logoutBtn).toBeVisible();
  173 |     await takeScreenshot(page, '15-mother-final');
  174 |   });
  175 | });
  176 | 
  177 | /* ═══════════ BROTHER JOURNEY ═══════════ */
  178 | 
  179 | test.describe('Brother (الأخ المساهم) Journey', () => {
  180 |   test('Full flow: Login → Onboarding → Dashboard → Audit', async ({ page }) => {
> 181 |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8081/
  182 |     await page.waitForTimeout(3000);
  183 | 
  184 |     // Go to login first
  185 |     await clickButton(page, 'استكشف التطبيق');
  186 |     await page.waitForTimeout(500);
  187 | 
  188 |     // Select Brother role from right panel
  189 |     await selectRole(page, 'brother');
  190 | 
  191 |     // Login
  192 |     const googleBtn = page.locator('.oauth-btn').first();
  193 |     await googleBtn.click();
  194 |     await page.waitForTimeout(2500);
  195 | 
  196 |     // Phone Verify
  197 |     await waitForScreen(page, 'رقم الجوال', 8000);
  198 |     const sendBtnB = page.locator('button', { hasText: 'إرسال رمز التحقق' });
  199 |     await sendBtnB.click();
  200 |     await page.waitForTimeout(800);
  201 |     await waitForScreen(page, 'رمز التحقق', 5000);
  202 |     await waitForScreen(page, 'تم التحقق', 8000);
  203 | 
  204 |     // Onboarding
  205 |     await waitForScreen(page, 'أهلاً يا أخي', 10000);
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
```