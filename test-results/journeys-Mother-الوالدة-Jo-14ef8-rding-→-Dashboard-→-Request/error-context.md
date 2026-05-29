# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journeys.spec.ts >> Mother (الوالدة) Journey >> Full flow: Login → Onboarding → Dashboard → Request
- Location: tests\journeys.spec.ts:103:3

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
    - generic:
      - generic:
        - img
      - generic:
        - img
      - generic:
        - img
      - generic:
        - img
    - button "خروج" [ref=e70] [cursor=pointer]:
      - img [ref=e71]
      - text: خروج
    - generic [ref=e74]:
      - generic [ref=e75]:
        - generic [ref=e76]:
          - img [ref=e77]
          - generic [ref=e80]: بركة اليوم
        - paragraph [ref=e81]: الحمد لله على نعمة العائلة — ربنا يديم هالنعمة
      - generic [ref=e82]:
        - paragraph [ref=e83]: رصيدك لهالشهر
        - generic [ref=e84]:
          - generic [ref=e85]: 4,825
          - img [ref=e86]
          - generic [ref=e88]: ر.س
        - text: باقي 91٪
        - generic [ref=e91]:
          - img [ref=e92]
          - generic [ref=e97]: 2 طلبات بانتظار الموافقة
      - generic [ref=e98]:
        - paragraph [ref=e99]: أضيفي بيانات البنك
        - paragraph [ref=e100]: روحي للإعدادات وضيفي الآيبان عشان يقدرون يحوّلون لك مباشرة
        - button "الإعدادات" [ref=e101] [cursor=pointer]
      - generic [ref=e102]:
        - img [ref=e103]
        - generic [ref=e107]: "آخر تحويل: ٥,٣٠٠ ر.س — قبل ٥ أيام"
      - generic [ref=e108]:
        - button "طلب مبلغ" [ref=e109] [cursor=pointer]:
          - img [ref=e110]
          - generic [ref=e116]: طلب مبلغ
        - button "الفواتير" [ref=e117] [cursor=pointer]:
          - img [ref=e118]
          - generic [ref=e122]: الفواتير
        - button "السجل" [ref=e123] [cursor=pointer]:
          - img [ref=e124]
          - generic [ref=e128]: السجل
        - button "شكر وامتنان" [ref=e129] [cursor=pointer]:
          - img [ref=e130]
          - generic [ref=e134]: شكر وامتنان
      - generic [ref=e135]:
        - heading "أخبار العيلة" [level=3] [ref=e136]
        - generic [ref=e137]:
          - generic [ref=e139]:
            - img [ref=e141]
            - generic [ref=e144]:
              - generic [ref=e145]: وصل المصروف الشهري — الحمد لله
              - generic [ref=e146]: قبل ساعتين
          - generic [ref=e149]:
            - img [ref=e151]
            - generic [ref=e154]:
              - generic [ref=e155]: أحمد وافق على طلب الصيدلية — يعطيه العافية
              - generic [ref=e156]: أمس
          - generic [ref=e159]:
            - img [ref=e161]
            - generic [ref=e164]:
              - generic [ref=e165]: انسددت فاتورة الكهرباء — ٣٢٠ ر.س
              - generic [ref=e166]: قبل ٣ أيام
      - generic [ref=e167]:
        - button [ref=e168] [cursor=pointer]:
          - img [ref=e169]
        - generic [ref=e174]: طوارئ
  - generic [ref=e176]:
    - heading "اختر الدور" [level=3] [ref=e177]
    - paragraph [ref=e178]: شوف التطبيق من زاوية كل فرد
    - generic [ref=e179]:
      - button "الابن المسؤول يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة" [ref=e180] [cursor=pointer]:
        - img [ref=e182]
        - generic [ref=e187]:
          - generic [ref=e188]: الابن المسؤول
          - generic [ref=e189]: يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة
      - button "الوالدة تطلب مبالغ وتدفع الفواتير وترسل الشكر" [active] [ref=e190] [cursor=pointer]:
        - img [ref=e192]
        - generic [ref=e196]:
          - generic [ref=e197]: الوالدة
          - generic [ref=e198]: تطلب مبالغ وتدفع الفواتير وترسل الشكر
      - button "الأخ المساهم يدفع حصّته ويتابع الطلبات المعلّقة" [ref=e200] [cursor=pointer]:
        - img [ref=e202]
        - generic [ref=e208]:
          - generic [ref=e209]: الأخ المساهم
          - generic [ref=e210]: يدفع حصّته ويتابع الطلبات المعلّقة
      - button "الأخت المتابعة تتابع أخبار العائلة والمناسبات" [ref=e211] [cursor=pointer]:
        - img [ref=e213]
        - generic [ref=e218]:
          - generic [ref=e219]: الأخت المتابعة
          - generic [ref=e220]: تتابع أخبار العائلة والمناسبات
    - generic [ref=e221]:
      - button "عربي" [ref=e222] [cursor=pointer]
      - button "English" [ref=e223] [cursor=pointer]
  - button "Demo Controls" [ref=e225] [cursor=pointer]:
    - img [ref=e226]
```

# Test source

```ts
  16  | 
  17  | async function clickButton(page: Page, text: string) {
  18  |   await page.getByText(text).first().click();
  19  |   await page.waitForTimeout(600); // animation settle
  20  | }
  21  | 
  22  | async function selectRole(page: Page, roleLabel: string) {
  23  |   // Click the role card in the right panel (works from any screen)
  24  |   const roleCard = page.locator('.role-card').filter({ hasText: roleLabel });
  25  |   await roleCard.click();
  26  |   await page.waitForTimeout(600);
  27  | }
  28  | 
  29  | async function takeScreenshot(page: Page, name: string) {
  30  |   await page.screenshot({ path: `tests/screenshots/${name}.png`, fullPage: true });
  31  | }
  32  | 
  33  | /* ═══════════ ADMIN JOURNEY ═══════════ */
  34  | 
  35  | test.describe('Admin (الابن المسؤول) Journey', () => {
  36  |   test('Full flow: Landing → Onboarding → Dashboard → Finance', async ({ page }) => {
  37  |     // 1. Landing
  38  |     await page.goto('/');
  39  |     await page.waitForTimeout(3000); // splash video
  40  |     await waitForScreen(page, 'محفظة أمي');
  41  |     await takeScreenshot(page, '01-landing');
  42  | 
  43  |     // 2. Click explore → Login
  44  |     await clickButton(page, 'استكشف التطبيق');
  45  |     await page.waitForTimeout(500);
  46  |     await takeScreenshot(page, '02-login');
  47  | 
  48  |     // 3. Click Google OAuth → triggers transition → Onboarding
  49  |     const googleBtn = page.locator('.oauth-btn').first();
  50  |     await googleBtn.click();
  51  |     await page.waitForTimeout(2500); // OAuth transition video
  52  |     
  53  |     // 4. Onboarding Step 1: Welcome
  54  |     await waitForScreen(page, 'الابن المسؤول', 8000);
  55  |     await takeScreenshot(page, '03-onboarding-welcome');
  56  |     await clickButton(page, 'يلّا نبدأ');
  57  | 
  58  |     // 5. Onboarding Step 2: Mother's info
  59  |     await waitForScreen(page, 'بيانات الوالدة');
  60  |     await takeScreenshot(page, '04-onboarding-mother-info');
  61  |     await clickButton(page, 'التالي');
  62  | 
  63  |     // 6. Onboarding Step 3: Invite family
  64  |     await waitForScreen(page, 'دعوة أفراد العائلة');
  65  |     await takeScreenshot(page, '05-onboarding-invite');
  66  |     await clickButton(page, 'أكمل الإعداد');
  67  | 
  68  |     // 7. Onboarding Step 4: All set
  69  |     await waitForScreen(page, 'كل شي جاهز');
  70  |     await takeScreenshot(page, '06-onboarding-done');
  71  |     await clickButton(page, 'افتح لوحة التحكم');
  72  | 
  73  |     // 8. Admin Dashboard
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
> 116 |     await googleBtn.click();
      |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
```