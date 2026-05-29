# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> Observer (الأخت المتابعة) Journey >> Full flow: Login → Onboarding → Dashboard (read-only)
- Location: tests\journeys.spec.ts:212:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.oauth-btn').first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e5]:
    - heading "محفظة أمي" [level=1] [ref=e6]:
      - img [ref=e8]
      - text: محفظة أمي
    - heading "Ummi Wallet" [level=2] [ref=e18]
    - paragraph [ref=e19]:
      - text: رعاية العائلة بوضوح وكرامة
      - text: كل شي واضح، وكل شي بحبّ
    - generic [ref=e20]:
      - generic [ref=e21]:
        - img [ref=e23]
        - generic [ref=e29]:
          - strong [ref=e30]: تخطيط مالي ذكي
          - paragraph [ref=e31]: تقدير ميزانية ذكي بتحليل الذكاء الاصطناعي
      - generic [ref=e32]:
        - img [ref=e34]
        - generic [ref=e40]:
          - strong [ref=e41]: ٤ أدوار، ٢٨ خدمة
          - paragraph [ref=e42]: الابن المسؤول، الوالدة، الأخ المساهم، الأخت المتابعة
      - generic [ref=e43]:
        - img [ref=e45]
        - generic [ref=e49]:
          - strong [ref=e50]: ثنائي اللغة عر/EN
          - paragraph [ref=e51]: العربية أولاً مع دعم إنجليزي كامل
      - generic [ref=e52]:
        - img [ref=e54]
        - generic [ref=e59]:
          - strong [ref=e60]: طوارئ SOS
          - paragraph [ref=e61]: طلبات صندوق طوارئ العائلة الفورية
    - paragraph [ref=e62]:
      - strong [ref=e63]: MomenCrafts
      - text: · الرياض، السعودية
  - generic [ref=e69]:
    - button "خروج" [ref=e70] [cursor=pointer]:
      - img [ref=e71]
      - text: خروج
    - generic [ref=e75]:
      - generic [ref=e76]:
        - img [ref=e77]
        - img [ref=e82]
      - paragraph [ref=e85]: أهلاً يا أختي
      - paragraph [ref=e86]: يمكنك تتابع الخطة وتشارك التقدير
    - generic [ref=e87]:
      - generic [ref=e88]:
        - img [ref=e89]
        - heading "المناسبات القادمة" [level=3] [ref=e97]
      - generic [ref=e98]:
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: عيد ميلاد أمي
            - text: June 15, 2026
          - generic [ref=e103]: 18 يوم
        - generic [ref=e105]:
          - generic [ref=e106]:
            - generic [ref=e107]: عيد الأضحى
            - text: June 7, 2026
          - generic [ref=e108]: 10 يوم
        - generic [ref=e110]:
          - generic [ref=e111]:
            - generic [ref=e112]: ذكرى العائلة
            - text: July 22, 2026
          - generic [ref=e113]: 55 يوم
      - generic [ref=e114]:
        - img [ref=e115]
        - heading "أخبار العائلة" [level=3] [ref=e119]
      - generic [ref=e120]:
        - generic [ref=e121]:
          - img [ref=e123]
          - generic [ref=e126]:
            - generic [ref=e127]: تم إرسال المصروف للوالدة — الحمد لله
            - generic [ref=e128]: قبل ساعتين
        - generic [ref=e129]:
          - img [ref=e131]
          - generic [ref=e134]:
            - generic [ref=e135]: محمد وافق على خطة الدعم — يعطيه العافية
            - generic [ref=e136]: أمس
        - generic [ref=e137]:
          - img [ref=e139]
          - generic [ref=e142]:
            - generic [ref=e143]: طلب صيانة جديد
            - generic [ref=e144]: قبل ٣ أيام
        - generic [ref=e145]:
          - img [ref=e147]
          - generic [ref=e150]:
            - generic [ref=e151]: انسددت فاتورة الكهرباء — ٢٨٠ ر.س
            - generic [ref=e152]: قبل ٥ أيام
      - generic [ref=e153]:
        - img [ref=e154]
        - heading "مشاريع العائلة" [level=3] [ref=e157]
      - generic [ref=e159]:
        - generic [ref=e160]: تجديد المطبخ
        - generic [ref=e161]: جاري
      - generic [ref=e163]:
        - generic [ref=e164]: تنسيق الحديقة
        - generic [ref=e165]: مخطط
      - generic [ref=e166]:
        - button "امتنان" [ref=e167] [cursor=pointer]:
          - img [ref=e168]
          - generic [ref=e172]: امتنان
        - button "مناسبات" [ref=e173] [cursor=pointer]:
          - img [ref=e174]
          - generic [ref=e182]: مناسبات
  - generic [ref=e184]:
    - heading "اختر الدور" [level=3] [ref=e185]
    - paragraph [ref=e186]: شوف التطبيق من زاوية كل فرد
    - generic [ref=e187]:
      - button "الابن المسؤول يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة" [ref=e188] [cursor=pointer]:
        - img [ref=e190]
        - generic [ref=e195]:
          - generic [ref=e196]: الابن المسؤول
          - generic [ref=e197]: يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة
      - button "الوالدة تطلب مبالغ وتدفع الفواتير وترسل الشكر" [ref=e198] [cursor=pointer]:
        - img [ref=e200]
        - generic [ref=e204]:
          - generic [ref=e205]: الوالدة
          - generic [ref=e206]: تطلب مبالغ وتدفع الفواتير وترسل الشكر
      - button "الأخ المساهم يدفع حصّته ويتابع الطلبات المعلّقة" [ref=e207] [cursor=pointer]:
        - img [ref=e209]
        - generic [ref=e215]:
          - generic [ref=e216]: الأخ المساهم
          - generic [ref=e217]: يدفع حصّته ويتابع الطلبات المعلّقة
      - button "الأخت المتابعة تتابع أخبار العائلة والمناسبات" [active] [ref=e218] [cursor=pointer]:
        - img [ref=e220]
        - generic [ref=e225]:
          - generic [ref=e226]: الأخت المتابعة
          - generic [ref=e227]: تتابع أخبار العائلة والمناسبات
    - generic [ref=e229]:
      - button "عربي" [ref=e230] [cursor=pointer]
      - button "English" [ref=e231] [cursor=pointer]
  - button "Demo Controls" [ref=e233] [cursor=pointer]:
    - img [ref=e234]
```

# Test source

```ts
  125 |     await waitForScreen(page, 'تأكيد الانضمام');
  126 |     await takeScreenshot(page, '12-mother-confirm');
  127 |     await clickButton(page, 'تأكيد وانضمام');
  128 | 
  129 |     // Onboarding - All set
  130 |     await waitForScreen(page, 'كل شي جاهز');
  131 |     await clickButton(page, 'افتح لوحة التحكم');
  132 | 
  133 |     // Mother Dashboard
  134 |     await page.waitForTimeout(800);
  135 |     await takeScreenshot(page, '13-mother-dashboard');
  136 | 
  137 |     // Navigate to Request Money
  138 |     const requestCard = page.locator('.mother-action-card').first();
  139 |     if (await requestCard.count() > 0) {
  140 |       await requestCard.click();
  141 |       await page.waitForTimeout(600);
  142 |       await waitForScreen(page, 'طلب مبلغ');
  143 |       await takeScreenshot(page, '14-mother-request');
  144 | 
  145 |       // Go back
  146 |       const backBtn = page.locator('.back-btn').first();
  147 |       await backBtn.click();
  148 |       await page.waitForTimeout(400);
  149 |     }
  150 | 
  151 |     // Check logout
  152 |     const logoutBtn = page.locator('.dashboard-logout');
  153 |     await expect(logoutBtn).toBeVisible();
  154 |     await takeScreenshot(page, '15-mother-final');
  155 |   });
  156 | });
  157 | 
  158 | /* ═══════════ BROTHER JOURNEY ═══════════ */
  159 | 
  160 | test.describe('Brother (الأخ المساهم) Journey', () => {
  161 |   test('Full flow: Login → Onboarding → Dashboard → Audit', async ({ page }) => {
  162 |     await page.goto('/');
  163 |     await page.waitForTimeout(3000);
  164 | 
  165 |     // Go to login first
  166 |     await clickButton(page, 'استكشف التطبيق');
  167 |     await page.waitForTimeout(500);
  168 | 
  169 |     // Select Brother role from right panel
  170 |     await selectRole(page, 'الأخ المساهم');
  171 | 
  172 |     // Login
  173 |     const googleBtn = page.locator('.oauth-btn').first();
  174 |     await googleBtn.click();
  175 |     await page.waitForTimeout(2500);
  176 | 
  177 |     // Onboarding
  178 |     await waitForScreen(page, 'أهلاً يا أخي', 8000);
  179 |     await takeScreenshot(page, '16-brother-welcome');
  180 |     await clickButton(page, 'يلّا نبدأ');
  181 | 
  182 |     await waitForScreen(page, 'تأكيد الانضمام');
  183 |     await clickButton(page, 'تأكيد وانضمام');
  184 | 
  185 |     await waitForScreen(page, 'كل شي جاهز');
  186 |     await clickButton(page, 'افتح لوحة التحكم');
  187 | 
  188 |     // Brother Dashboard
  189 |     await page.waitForTimeout(800);
  190 |     await takeScreenshot(page, '17-brother-dashboard');
  191 | 
  192 |     // Audit button
  193 |     const auditBtn = page.getByText('مراجعة الخطة').first();
  194 |     if (await auditBtn.isVisible()) {
  195 |       await auditBtn.click();
  196 |       await page.waitForTimeout(600);
  197 |       await takeScreenshot(page, '18-brother-audit');
  198 |       await page.locator('.back-btn').first().click();
  199 |       await page.waitForTimeout(400);
  200 |     }
  201 | 
  202 |     // Check logout
  203 |     const logoutBtn = page.locator('.dashboard-logout');
  204 |     await expect(logoutBtn).toBeVisible();
  205 |     await takeScreenshot(page, '19-brother-final');
  206 |   });
  207 | });
  208 | 
  209 | /* ═══════════ OBSERVER JOURNEY ═══════════ */
  210 | 
  211 | test.describe('Observer (الأخت المتابعة) Journey', () => {
  212 |   test('Full flow: Login → Onboarding → Dashboard (read-only)', async ({ page }) => {
  213 |     await page.goto('/');
  214 |     await page.waitForTimeout(3000);
  215 | 
  216 |     // Go to login first
  217 |     await clickButton(page, 'استكشف التطبيق');
  218 |     await page.waitForTimeout(500);
  219 | 
  220 |     // Select Observer role from right panel
  221 |     await selectRole(page, 'الأخت المتابعة');
  222 | 
  223 |     // Login
  224 |     const googleBtn = page.locator('.oauth-btn').first();
> 225 |     await googleBtn.click();
      |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  226 |     await page.waitForTimeout(2500);
  227 | 
  228 |     // Onboarding
  229 |     await waitForScreen(page, 'أهلاً يا أختي', 8000);
  230 |     await takeScreenshot(page, '20-observer-welcome');
  231 |     await clickButton(page, 'يلّا نبدأ');
  232 | 
  233 |     await waitForScreen(page, 'تأكيد الانضمام');
  234 |     await clickButton(page, 'تأكيد وانضمام');
  235 | 
  236 |     await waitForScreen(page, 'كل شي جاهز');
  237 |     await clickButton(page, 'افتح لوحة التحكم');
  238 | 
  239 |     // Observer Dashboard
  240 |     await waitForScreen(page, 'أهلاً يا أختي', 5000);
  241 |     await takeScreenshot(page, '21-observer-dashboard');
  242 | 
  243 |     // Verify read-only (no action buttons with navigate)
  244 |     const actionButtons = page.locator('.btn-primary:visible');
  245 |     const count = await actionButtons.count();
  246 |     // Observer should have minimal/no action buttons
  247 |     await takeScreenshot(page, '22-observer-final');
  248 |   });
  249 | });
  250 | 
  251 | /* ═══════════ CROSS-CUTTING TESTS ═══════════ */
  252 | 
  253 | test.describe('Cross-cutting checks', () => {
  254 |   test('Language toggle works', async ({ page }) => {
  255 |     await page.goto('/');
  256 |     await page.waitForTimeout(3000);
  257 | 
  258 |     // Default should be Arabic
  259 |     await waitForScreen(page, 'محفظة أمي');
  260 | 
  261 |     // Switch to English via right panel
  262 |     const enBtn = page.getByText('English').first();
  263 |     if (await enBtn.isVisible()) {
  264 |       await enBtn.click();
  265 |       await page.waitForTimeout(400);
  266 |       await waitForScreen(page, 'Ummi Wallet');
  267 |       await takeScreenshot(page, '23-english-landing');
  268 |     }
  269 |   });
  270 | 
  271 |   test('Logout returns to landing', async ({ page }) => {
  272 |     await page.goto('/');
  273 |     await page.waitForTimeout(3000);
  274 | 
  275 |     // Skip directly to dashboard
  276 |     const skipBtn = page.getByText('دخول مباشر').first();
  277 |     await skipBtn.click();
  278 |     await page.waitForTimeout(600);
  279 | 
  280 |     // Find and click logout
  281 |     const logoutBtn = page.locator('.dashboard-logout');
  282 |     if (await logoutBtn.isVisible()) {
  283 |       await logoutBtn.click();
  284 |       await page.waitForTimeout(600);
  285 |       await waitForScreen(page, 'محفظة أمي');
  286 |       await takeScreenshot(page, '24-logout-landing');
  287 |     }
  288 |   });
  289 | 
  290 |   test('Role naming consistency check', async ({ page }) => {
  291 |     await page.goto('/');
  292 |     await page.waitForTimeout(3000);
  293 | 
  294 |     // Verify right panel has correct role names
  295 |     await expect(page.getByText('الابن المسؤول').first()).toBeVisible();
  296 |     await expect(page.getByText('الوالدة').first()).toBeVisible();
  297 |     await expect(page.getByText('الأخ المساهم').first()).toBeVisible();
  298 |     await expect(page.getByText('الأخت المتابعة').first()).toBeVisible();
  299 |     await takeScreenshot(page, '25-role-names');
  300 |   });
  301 | });
  302 | 
```