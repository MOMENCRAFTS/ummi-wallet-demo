# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> Brother (الأخ المساهم) Journey >> Full flow: Login → Onboarding → Dashboard → Audit
- Location: tests\journeys.spec.ts:161:3

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
    - generic [ref=e74]:
      - generic [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]: 12,000
          - img [ref=e78]
          - generic [ref=e80]: إجمالي المدفوع
        - generic [ref=e81]:
          - generic [ref=e82]: "8"
          - generic [ref=e83]: تمّت الموافقة
        - generic [ref=e84]:
          - generic [ref=e85]: "2"
          - generic [ref=e86]: معلّقة
      - generic [ref=e87]:
        - generic [ref=e88]:
          - img [ref=e89]
          - generic [ref=e92]: بركة اليوم
        - paragraph [ref=e93]: ما نقص مال من صدقة — الله يبارك بالعيلة
      - generic [ref=e94]:
        - generic [ref=e95]:
          - img [ref=e96]
          - heading "بانتظار الموافقة" [level=3] [ref=e102]
          - generic [ref=e103]: 2 جديد
        - generic [ref=e105]:
          - generic [ref=e106]:
            - generic [ref=e107]: 280 ر.س
            - generic [ref=e108]: صيدلية
          - generic [ref=e109]: بانتظار الموافقة
        - generic [ref=e111]:
          - generic [ref=e112]:
            - generic [ref=e113]: 150 ر.س
            - generic [ref=e114]: بقالة
          - generic [ref=e115]: بانتظار الموافقة
      - generic [ref=e116]:
        - generic [ref=e117]:
          - img [ref=e118]
          - heading "طلباتي" [level=3] [ref=e124]
        - generic [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e128]: 2,000 ر.س
            - generic [ref=e129]: الحصة الشهرية
          - generic [ref=e130]: تمّت الموافقة
        - generic [ref=e132]:
          - generic [ref=e133]:
            - generic [ref=e134]: 280 ر.س
            - generic [ref=e135]: صيدلية
          - generic [ref=e136]: بانتظار الموافقة
        - generic [ref=e138]:
          - generic [ref=e139]:
            - generic [ref=e140]: 500 ر.س
            - generic [ref=e141]: طوارئ
          - generic [ref=e142]: تمّت الموافقة
      - generic [ref=e143]:
        - heading "وين أحوّل؟" [level=3] [ref=e144]
        - generic [ref=e145]: بنك الراجحي • صندوق عائلة أحمد
        - generic [ref=e146]: SA1234 5678 9012 3456 7890
        - button "نسخ الآيبان" [ref=e147] [cursor=pointer]
      - generic [ref=e148]:
        - generic [ref=e149]:
          - img [ref=e150]
          - heading "حصّتي" [level=3] [ref=e160]
        - generic [ref=e161]:
          - generic [ref=e162]:
            - generic [ref=e163]:
              - generic [ref=e164]: 2,000 ر.س
              - generic [ref=e165]: "المدفوع: 2,000 • تمّت التسوية"
            - generic [ref=e166]: تمّت التسوية
          - generic [ref=e167]:
            - img [ref=e168]
            - generic [ref=e172]: تم تقديم الإثبات — جزاك الله خير
      - generic [ref=e173]:
        - button "مراجعة الخطة" [ref=e174] [cursor=pointer]:
          - img [ref=e175]
          - text: مراجعة الخطة
        - button "دفع مباشر" [ref=e181] [cursor=pointer]:
          - img [ref=e182]
          - text: دفع مباشر
  - generic [ref=e193]:
    - heading "اختر الدور" [level=3] [ref=e194]
    - paragraph [ref=e195]: شوف التطبيق من زاوية كل فرد
    - generic [ref=e196]:
      - button "الابن المسؤول يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة" [ref=e197] [cursor=pointer]:
        - img [ref=e199]
        - generic [ref=e204]:
          - generic [ref=e205]: الابن المسؤول
          - generic [ref=e206]: يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة
      - button "الوالدة تطلب مبالغ وتدفع الفواتير وترسل الشكر" [ref=e207] [cursor=pointer]:
        - img [ref=e209]
        - generic [ref=e213]:
          - generic [ref=e214]: الوالدة
          - generic [ref=e215]: تطلب مبالغ وتدفع الفواتير وترسل الشكر
      - button "الأخ المساهم يدفع حصّته ويتابع الطلبات المعلّقة" [active] [ref=e216] [cursor=pointer]:
        - img [ref=e218]
        - generic [ref=e224]:
          - generic [ref=e225]: الأخ المساهم
          - generic [ref=e226]: يدفع حصّته ويتابع الطلبات المعلّقة
      - button "الأخت المتابعة تتابع أخبار العائلة والمناسبات" [ref=e228] [cursor=pointer]:
        - img [ref=e230]
        - generic [ref=e235]:
          - generic [ref=e236]: الأخت المتابعة
          - generic [ref=e237]: تتابع أخبار العائلة والمناسبات
    - generic [ref=e238]:
      - button "عربي" [ref=e239] [cursor=pointer]
      - button "English" [ref=e240] [cursor=pointer]
  - button "Demo Controls" [ref=e242] [cursor=pointer]:
    - img [ref=e243]
```

# Test source

```ts
  74  |     await waitForScreen(page, 'صحة الخزنة');
  75  |     await takeScreenshot(page, '07-admin-dashboard');
  76  | 
  77  |     // 9. Navigate to Finance (AI Planning)
  78  |     const aiPlanBtn = page.locator('.manage-item').filter({ hasText: 'تخطيط ذكي' });
  79  |     if (await aiPlanBtn.count() > 0) {
  80  |       await aiPlanBtn.click();
  81  |       await page.waitForTimeout(800);
  82  |       await takeScreenshot(page, '08-finance-welcome');
  83  | 
  84  |       // Start chat
  85  |       const startBtn = page.getByText('ابدأ التخطيط').first();
  86  |       if (await startBtn.isVisible()) {
  87  |         await startBtn.click();
  88  |         await page.waitForTimeout(1000);
  89  |         await takeScreenshot(page, '09-finance-chat');
  90  |       }
  91  |     }
  92  | 
  93  |     // 10. Check logout exists
  94  |     const logoutBtn = page.locator('.dashboard-logout');
  95  |     await expect(logoutBtn).toBeVisible();
  96  |     await takeScreenshot(page, '10-admin-final');
  97  |   });
  98  | });
  99  | 
  100 | /* ═══════════ MOTHER JOURNEY ═══════════ */
  101 | 
  102 | test.describe('Mother (الوالدة) Journey', () => {
  103 |   test('Full flow: Login → Onboarding → Dashboard → Request', async ({ page }) => {
  104 |     await page.goto('/');
  105 |     await page.waitForTimeout(3000);
  106 | 
  107 |     // Go to login first
  108 |     await clickButton(page, 'استكشف التطبيق');
  109 |     await page.waitForTimeout(500);
  110 | 
  111 |     // Now select Mother role from right panel (while on login screen)
  112 |     await selectRole(page, 'الوالدة');
  113 | 
  114 |     // Login via OAuth
  115 |     const googleBtn = page.locator('.oauth-btn').first();
  116 |     await googleBtn.click();
  117 |     await page.waitForTimeout(2500);
  118 | 
  119 |     // Onboarding - Welcome
  120 |     await waitForScreen(page, 'أهلاً يا أمي', 8000);
  121 |     await takeScreenshot(page, '11-mother-welcome');
  122 |     await clickButton(page, 'يلّا نبدأ');
  123 | 
  124 |     // Onboarding - Confirm identity
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
> 174 |     await googleBtn.click();
      |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  225 |     await googleBtn.click();
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
```