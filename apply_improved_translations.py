#!/usr/bin/env python3
"""
Apply improved Arabic translations to Ummi Wallet source files.
Each replacement is a (old_string, new_string) tuple applied to specific files.
"""
import os
import re

SRC = os.path.join(os.path.dirname(__file__), 'src')
SCREENS = os.path.join(SRC, 'components', 'screens')

def read_file(path):
    for enc in ('utf-8', 'utf-8-sig', 'utf-16', 'utf-16-le'):
        try:
            with open(path, 'r', encoding=enc) as f:
                return f.read()
        except (UnicodeDecodeError, UnicodeError):
            continue
    return None

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def apply_replacements(filepath, replacements):
    """Apply a list of (old, new) string replacements to a file."""
    content = read_file(filepath)
    if content is None:
        print(f"  SKIP (cannot read): {filepath}")
        return 0
    count = 0
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new, 1)
            count += 1
        else:
            # Try with different quote styles
            pass
    if count > 0:
        write_file(filepath, content)
    return count

# ============================================================
# ALL REPLACEMENTS ORGANIZED BY FILE
# ============================================================

changes = {}

def add(filepath, old, new):
    if filepath not in changes:
        changes[filepath] = []
    changes[filepath].append((old, new))

# --- LandingScreen.tsx (#035, #036, #041) ---
f = os.path.join(SCREENS, 'LandingScreen.tsx')
add(f, "رعاية العائلة بوضوح وكرامة", "دعم العائلة بوضوح وكرامة")  # #035 - first occurrence is AR for EN tagline
add(f, "كل شي واضح، وكل شي بحبّ", "كل شيء واضح، وكل شيء بمحبة")  # #036
add(f, "عر/EN", "عربي/إنجليزي")  # #041

# --- LoginScreen.tsx (#044) ---
f = os.path.join(SCREENS, 'LoginScreen.tsx')
add(f, "رعاية العائلة بوضوح وكرامة", "دعم العائلة بوضوح وكرامة")  # #044

# --- PhoneVerifyScreen.tsx (#050, #052, #058) ---
f = os.path.join(SCREENS, 'PhoneVerifyScreen.tsx')
add(f, "رقم جوال غير صالح — يبدأ بـ 5", "رقم جوال سعودي غير صالح — يجب أن يبدأ بـ 5")  # #050
add(f, "أدخل رقمك لربطك بعائلتك", "أدخل رقمك للانضمام إلى عائلتك")  # #052
add(f, "جاري ربط حسابك بعائلتك", "جارٍ ربط حسابك بعائلتك")  # #058

# --- OnboardingScreen.tsx (#060, #070, #073, #074, #081-#085) ---
f = os.path.join(SCREENS, 'OnboardingScreen.tsx')
add(f, "عشان نربط حسابها ونسهّل الطلبات", "لربط حسابها وتسهيل الطلبات")  # #060
add(f, "أضف إخوانك وأخواتك للخطة — كل واحد بدوره", "أضف إخوتك وأخواتك إلى الخطة — كل واحد بدوره")  # #070
add(f, "أكمل الإعداد", "إكمال الإعداد")  # #073
add(f, "تخطّي — أدعوهم لاحقاً", "تخطَّ — ادعُهم لاحقًا")  # #074
add(f, "تأكيد وانضمام", "تأكيد الانضمام")  # #081
add(f, "كل شي جاهز!", "كل شيء جاهز!")  # #082
add(f, "لوحة التحكم جاهزة. استكشف كل شي بوقتك.", "لوحة التحكم جاهزة. استكشفها بالوتيرة التي تناسبك.")  # #083
add(f, "افتح لوحة التحكم", "فتح لوحة التحكم")  # #084
add(f, "يلّا نبدأ", "لنبدأ")  # #085

# --- HybridOnboardingScreen.tsx (#088, #089, #099, #107, #115, #117, #119, #122, #134-#138) ---
f = os.path.join(SCREENS, 'HybridOnboardingScreen.tsx')
add(f, "عن الابن المسؤول", "بياناتك")  # #088
add(f, "اسمك ولغة التطبيق المفضلة", "اسمك واللغة المفضلة للتطبيق")  # #089
add(f, "عشان نربط حسابها ونسهّل التحويلات", "لربط حسابها وتسهيل التحويلات")  # #099
add(f, "أضف إخوانك وأخواتك — كل واحد بدوره", "أضف الإخوة والأخوات الذين سيساهمون أو يتابعون")  # #107
add(f, "أضف عضو", "إضافة عضو")  # #115
add(f, "اختر الموظفين وحدد الرواتب", "اختر طاقم المنزل وحدد رواتبهم")  # #117
# #119 - "شهر" → "شهريًا" - need context to avoid false positives
add(f, "'>شهر<", "'>شهريًا<")  # #119 - within JSX
add(f, "ذكاء اصطناعي", "وضع الذكاء الاصطناعي")  # #122
add(f, "كل شي جاهز!", "كل شيء جاهز!")  # #134
add(f, "لوحة التحكم جاهزة. استكشف كل شي بوقتك.", "لوحة التحكم جاهزة. استكشفها بالوتيرة التي تناسبك.")  # #135
add(f, "افتح لوحة التحكم", "فتح لوحة التحكم")  # #136
add(f, "إعداد العائلة", "إنشاء عائلتك")  # #137
add(f, "خطة رعاية الوالدة", "إعداد Ummi Wallet لدائرة عائلتك")  # #138

# --- AdminDashboard.tsx ---
f = os.path.join(SCREENS, 'AdminDashboard.tsx')
add(f, "': 'خروج'", "': 'تسجيل الخروج'")  # #139
add(f, "صحة الخزنة", "حالة الخزنة")  # #140
add(f, "': 'موافقة'", "': 'اعتماد'")  # #144
add(f, "انشر الخطة", "نشر الخطة")  # #145
add(f, "الخطة منشورة", "تم نشر الخطة")  # #146
add(f, "آخر الأخبار", "النشاط الأخير")  # #150
add(f, "إدارة الخدمات", "إدارة")  # #151
add(f, "تحديث اللوحة", "تحديث لوحة التحكم")  # #152
add(f, "بيانات مباشرة", "بيانات حيّة")  # #153
# Data arrays
add(f, "شخصي الوالدة", "مصروف الوالدة الشخصي")  # #158 - was 'Mother Personal' nameAr
add(f, "nameAr: 'الطبية'", "nameAr: 'الرعاية الطبية'")  # #160
add(f, "nameAr: 'الفواتير'", "nameAr: 'الخدمات والفواتير'")  # #161
add(f, "فاتورة الكهرباء - مايو", "فاتورة الكهرباء — مايو")  # #163
add(f, "صرفية أدوية الصيدلية", "تعويض مصاريف الصيدلية")  # #167
# Check if old exists with dash or em dash
add(f, "محمد وافق على خطة الدعم - جزاه الله خير", "وافق محمد على خطة الدعم — جزاه الله خيرًا")  # #173
add(f, "محمد وافق على خطة الدعم — جزاه الله خير", "وافق محمد على خطة الدعم — جزاه الله خيرًا")  # #173 alt
add(f, "سُدّدت فاتورة الكهرباء", "تم سداد فاتورة الكهرباء تلقائيًا")  # #175
add(f, "فاتورة الكهرباء تلقائيًا - ٣٢٠ ر.س", "فاتورة الكهرباء تلقائيًا — ٣٢٠ ر.س")  # #175 fix dash
add(f, "سارة انضمت كأخت متابعة - أهلاً فيها", "انضمّت سارة بصفتها الأخت المتابعة — أهلًا بها")  # #177
add(f, "سارة انضمت كأخت متابعة — أهلاً فيها", "انضمّت سارة بصفتها الأخت المتابعة — أهلًا بها")  # #177 alt
add(f, "labelAr: 'طوارئ'", "labelAr: 'الطوارئ'")  # #184
add(f, "labelAr: 'خطة ذكية'", "labelAr: 'الخطة الذكية'")  # #186
add(f, "labelAr: 'أفكار'", "labelAr: 'الأفكار'")  # #196

# --- AdminBillsScreen.tsx ---
f = os.path.join(SCREENS, 'AdminBillsScreen.tsx')
add(f, "الكهرباء (الشركة السعودية)", "الكهرباء (الشركة السعودية للكهرباء)")  # #197
add(f, "المياه (شركة المياه)", "المياه (شركة المياه الوطنية)")  # #198
add(f, "الإنترنت (اس تي سي)", "الإنترنت (STC)")  # #199
add(f, "خطوط جوال x٣", "٣ خطوط جوال")  # #200
add(f, "': 'سدّد'", "': 'سداد'")  # #205

# --- FinanceWelcomeScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceWelcomeScreen.tsx')
add(f, "إعداد المالية", "إعداد الخطة المالية")  # #206
add(f, "خلّنا نبني خطة الدعم", "لننشئ خطة الدعم الخاصة بها")  # #207
add(f, "ما أخبرتنا أمي", "ما شاركته الوالدة معنا")  # #208
add(f, "احتياج شهري: ~5,000 ر.س", "احتياج شهري: حوالي ٥٬٠٠٠ ر.س")  # #209
add(f, "خادمة + سائق", "عاملة منزلية + سائق")  # #210
add(f, "بدء الإعداد بالذكاء الاصطناعي", "بدء الإعداد الموجّه بالذكاء الاصطناعي")  # #213
add(f, "إعداد يدوي", "الإعداد يدويًا")  # #214

# --- FinanceChatScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceChatScreen.tsx')
add(f, "تمام! الآن رواتب الموظفين — الخادمة أولاً:", "حسنًا، لنبدأ برواتب طاقم المنزل — راتب العاملة المنزلية أولًا:")  # #215
add(f, "ممتاز. وراتب السائق؟", "ممتاز. ما راتب السائق؟")  # #216
add(f, "الحين الفواتير — كهرباء، ماء، إنترنت. كم المعدّل الشهري؟", "الآن الفواتير — الكهرباء والمياه والإنترنت. ما متوسطها الشهري؟")  # #217
add(f, "طيب، البقالة والمواد الغذائية:", "حسنًا، البقالة والمواد الغذائية:")  # #218
add(f, "الله يشفيها — الرعاية الطبية الشهرية:", "الرعاية الطبية — الميزانية الشهرية:")  # #219
add(f, "أخيراً، صندوق الطوارئ. أمي ما حددت مبلغ — أقترح ٥٠٠ ر.س كشبكة أمان:", "أخيرًا، هامش الطوارئ. لم تحدد الوالدة مبلغًا — أقترح ٥٠٠ ر.س كاحتياطي أمان:")  # #220
add(f, "إعداد ذكي", "إعداد بالذكاء الاصطناعي")  # #224
add(f, "تقدير أمي:", "تقدير الوالدة:")  # #227
add(f, "تحليل خطتك...", "جارٍ تحليل خطتك...")  # #229
add(f, "راح أفحص توازن ٧٠/١٥/١٥ وأشوف أنماط موسمية واقتراحات.", "سأتحقق من توازن ٧٠/١٥/١٥، وأراجع الأنماط الموسمية، وأقترح تحسينات.")  # #230
add(f, "صحة الميزانية", "سلامة الميزانية")  # #231
add(f, "': 'أمان'", "': 'احتياطي الأمان'")  # #234
add(f, "مراجعة الترجمة", "مراجعة الترجمات")  # #235
add(f, "تخطي للملخص", "الانتقال إلى الملخص")  # #236
add(f, "': 'الإجمالي'", "': 'الإجمالي الحالي'")  # #240

# --- FinanceSummaryScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceSummaryScreen.tsx')
add(f, "': 'احتياط'", "': 'احتياطي'")  # #249
add(f, "إرسال للعائلة", "إرسال إلى العائلة")  # #250

# --- FinanceFinalApprovalScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceFinalApprovalScreen.tsx')
add(f, "': 'موافق'", "': 'تمت الموافقة'")  # #257
add(f, "': 'اطلع'", "': 'تم الاطلاع'")  # #258

# --- FinanceAuditContributorScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceAuditContributorScreen.tsx')
add(f, "': 'موافقة'", "': 'اعتماد'")  # #263

# --- FinanceReadjustmentScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceReadjustmentScreen.tsx')
add(f, "إعادة التوزيع", "إعادة الضبط")  # #275

# --- FinanceRevisionScreen.tsx ---
f = os.path.join(SCREENS, 'FinanceRevisionScreen.tsx')
add(f, "': 'المراجعات'", "': 'طلبات التعديل'")  # #279
add(f, "إرسال المراجعة", "إرسال التعديل")  # #284

# --- CelebrationScreen.tsx ---
f = os.path.join(SCREENS, 'CelebrationScreen.tsx')
add(f, "ر.س/شهرياً", "ر.س/شهريًا")  # #286
add(f, "الذهاب للوحة التحكم", "الانتقال إلى لوحة التحكم")  # #288

# --- MotherDashboard.tsx ---
f = os.path.join(SCREENS, 'MotherDashboard.tsx')
add(f, "': 'خروج'", "': 'تسجيل الخروج'")  # #289
add(f, "رصيدك لهالشهر", "المتاح هذا الشهر")  # #291
add(f, "أضيفي بيانات البنك", "أضيفي بياناتك البنكية")  # #292
add(f, "روحي للإعدادات وضيفي الآيبان عشان يقدرون يحوّلون لك مباشرة", "انتقلي إلى الإعدادات وأضيفي الآيبان ليتمكن أفراد عائلتك من التحويل لك مباشرة.")  # #293
add(f, "أخبار العيلة", "آخر أخبار العائلة")  # #301

# --- MotherRequestScreen.tsx ---
f = os.path.join(SCREENS, 'MotherRequestScreen.tsx')
add(f, "اكتبي ملاحظة إذا لزم الأمر...", "اكتبي ملاحظة عند الحاجة...")  # #313 (actual source may differ)
add(f, "اكتبي ملاحظة إذا تبين...", "اكتبي ملاحظة عند الحاجة...")  # #313 alt from old code
add(f, "سيصل إشعار إلى الابن المسؤول — الله يسهّل", "سيتم إشعار الابن المسؤول — الله يسهّل")  # #316 - actual source might differ
add(f, "بيوصل إشعار للابن المسؤول — الله يسهّل", "سيتم إشعار الابن المسؤول — الله يسهّل")  # #316 alt

# --- MotherGratitudeScreen.tsx ---
f = os.path.join(SCREENS, 'MotherGratitudeScreen.tsx')
add(f, "جزاكم الله خيراً", "جزاكم الله خيرًا")  # #318
add(f, "ما قصّرتوا أبداً", "ما قصّرتم أبدًا")  # #320
add(f, "تم إرسال كلمة الشكر!", "تم إرسال رسالة الشكر!")  # #330

# --- MotherBillsScreen.tsx ---
f = os.path.join(SCREENS, 'MotherBillsScreen.tsx')
add(f, "إجمالي القادم", "إجمالي المستحقات القادمة")  # #334
add(f, "فواتير قادمة", "المستحقات القادمة")  # #335

# --- MotherHistoryScreen.tsx ---
f = os.path.join(SCREENS, 'MotherHistoryScreen.tsx')
add(f, "en: 'Approved', ar: 'تمّت'", "en: 'Approved', ar: 'تمت الموافقة'")  # #350
add(f, "en: 'Pending', ar: 'معلّقة'", "en: 'Pending', ar: 'معلّق'")  # #351

# --- MotherSOSScreen.tsx ---
f = os.path.join(SCREENS, 'MotherSOSScreen.tsx')
add(f, "حدد نوع الطوارئ", "حددي نوع الطوارئ")  # #353

# --- MotherSettingsScreen.tsx ---
f = os.path.join(SCREENS, 'MotherSettingsScreen.tsx')
# #365: "العربية" → "الإنجليزية" - this is the language display when in AR mode
add(f, "': 'العربية'", "': 'الإنجليزية'")  # #365

# --- MotherCelebrationsScreen.tsx ---
f = os.path.join(SCREENS, 'MotherCelebrationsScreen.tsx')
add(f, "': 'يوم'", "': 'أيام'")  # #374
add(f, "إرسال دعوة", "إرسال تهنئة")  # #375

# --- MotherFeedScreen.tsx ---
f = os.path.join(SCREENS, 'MotherFeedScreen.tsx')
add(f, "أخبار العيلة", "آخر أخبار العائلة")  # #376

# --- BrotherDashboard.tsx ---
f = os.path.join(SCREENS, 'BrotherDashboard.tsx')
add(f, "': 'خروج'", "': 'تسجيل الخروج'")  # #381 - first occurrence only
add(f, "بانتظار الابن المسؤول ينشر الخطة المالية", "في انتظار أن ينشر الابن المسؤول الخطة المالية")  # #383
add(f, "إجمالي المدفوع", "إجمالي المدفوعات")  # #385
add(f, "': 'معلّقة'", "': 'معلّق'")  # #387
add(f, "وين أحوّل؟", "أين أحوّل؟")  # #391
add(f, "': 'مراجعة الخطة'", "': 'عرض الخطة'")  # #397

# --- BrotherAuditScreen.tsx ---
f = os.path.join(SCREENS, 'BrotherAuditScreen.tsx')
add(f, "جزاك الله خير — تم تقديم الإثبات", "تم تقديم الإثبات — جزاك الله خيرًا")  # #405

# --- BrotherContributionScreen.tsx ---
f = os.path.join(SCREENS, 'BrotherContributionScreen.tsx')
add(f, "حوّل على هالحساب", "حوّل إلى هذا الحساب")  # #407

# --- BrotherProofScreen.tsx ---
f = os.path.join(SCREENS, 'BrotherProofScreen.tsx')
add(f, "ارفق صورة الحوالة أو إيصال الدفع", "أرفق صورة الحوالة أو إيصال الدفع")  # #423

# --- BrotherSettlementScreen.tsx ---
f = os.path.join(SCREENS, 'BrotherSettlementScreen.tsx')
add(f, "': 'تسويتي'", "': 'تسوية مساهمتي'")  # #432
add(f, "': 'مسوّى'", "': 'تمت التسوية'")  # #436

# --- BrotherSuggestionsScreen.tsx ---
f = os.path.join(SCREENS, 'BrotherSuggestionsScreen.tsx')
add(f, "': 'أعجبني'", "': 'تم الإعجاب'")  # #438
add(f, "': 'إعجاب'", "': 'أعجبني'")  # #439
# #440: "likes" labelAr 'إعجاب' → 'إعجابات' — needs careful context
add(f, "': 'إعجاب'\n", "': 'إعجابات'\n")  # #440 - second occurrence

# --- ObserverDashboard.tsx ---
f = os.path.join(SCREENS, 'ObserverDashboard.tsx')
add(f, "': 'خروج'", "': 'تسجيل الخروج'")  # #442
add(f, "لما الابن المسؤول ينشر الخطة، بتقدرين تشوفين كل شي", "بمجرد نشر الخطة، ستتمكنين من رؤية كل شيء")  # #444
add(f, "أهلاً يا أختي", "أهلًا بكِ")  # #446
add(f, "يمكنك تتابع الخطة وتشارك التقدير", "يمكنكِ متابعة الخطة ومشاركة التقدير")  # #447
add(f, "': 'المتابعة'", "': 'آخر الأخبار'")  # #451
add(f, "': 'مناسبات'", "': 'المناسبات'")  # #452

# --- ObserverCelebrationsScreen.tsx ---
f = os.path.join(SCREENS, 'ObserverCelebrationsScreen.tsx')
add(f, "': 'يوم'", "': 'أيام'")  # #455

# --- ObserverFeedScreen.tsx ---
f = os.path.join(SCREENS, 'ObserverFeedScreen.tsx')
add(f, "متابعة الأحداث", "آخر أخبار العائلة")  # #456

# --- ChatListScreen.tsx (#463) ---
f = os.path.join(SCREENS, 'ChatListScreen.tsx')
add(f, "بحوّل لك بكرة", "سأحوّل غدًا")  # #463

# --- ChatRoomScreen.tsx ---
f = os.path.join(SCREENS, 'ChatRoomScreen.tsx')
add(f, "صباح الخير يا أهلي", "صباح الخير جميعًا")  # #467
add(f, "صباح الخير! أنا حوّلت حصتي أمس", "صباح الخير! حوّلت حصتي أمس")  # #469
add(f, "شكراً محمد، التحويل وصل بالسلامة", "شكرًا يا محمد، وصل التحويل بالسلامة")  # #470
add(f, "آمين! أنا راجعت الخطة، كل شي تمام", "آمين! راجعت الخطة، وكل شيء مناسب")  # #472
add(f, "أمي، تحتاجين شي من الصيدلية؟", "أمي، هل تحتاجين شيئًا من الصيدلية؟")  # #473
add(f, "إي يا حبيبي، خلص دواء الضغط", "نعم يا حبيبي، نفد دواء الضغط")  # #474
add(f, "بطلبه الحين إن شاء الله يوصل اليوم", "سأطلبه الآن، وإن شاء الله يصل اليوم")  # #475
add(f, "فاتورة الصيدلية وصلت — ٣٤٠ ريال", "وصلت فاتورة الصيدلية — ٣٤٠ ر.س")  # #476
add(f, "إي، ضمن بند الرعاية الصحية", "نعم، ضمن مخصص الرعاية الصحية")  # #478
add(f, "تمام. خبرني لو ردّت شركة الصيانة عن المكيف", "ممتاز. أخبرني إذا ردّت شركة الصيانة بخصوص المكيف")  # #479
add(f, "بتجي تزور أمي يوم الجمعة؟", "هل ستزور أمي يوم الجمعة؟")  # #480
add(f, "إن شاء الله، بجيب الأولاد معي", "إن شاء الله، سأحضر الأولاد أيضًا")  # #481
add(f, "حلو، بتفرح فيكم كثير", "جميل، ستفرح بكم كثيرًا")  # #482
add(f, "كل شي تمام", "كل شيء بخير")  # #485
add(f, "أحتاج مساعدة", "أحتاج إلى مساعدة")  # #486

# --- ServiceScreen.tsx ---
f = os.path.join(SCREENS, 'ServiceScreen.tsx')
add(f, "تابع المهام والموافقات المعلّقة", "تتبع المهام والموافقات المعلّقة")  # #494
add(f, "إدارة رواتب الموظفين", "إدارة رواتب طاقم المنزل")  # #495
add(f, "عرض وجدولة دفع الفواتير", "عرض وجدولة مدفوعات الفواتير")  # #496
add(f, "تتبّع طلبات الصيانة المنزلية", "متابعة طلبات الصيانة المنزلية")  # #497
add(f, "تسوية المساهمات والأرصدة", "مطابقة المساهمات والأرصدة")  # #499
add(f, "متابعة نشاط العائلة لحظياً", "نشاط العائلة لحظيًا")  # #500
add(f, "تخطيط المناسبات والأحداث العائلية", "تخطيط مناسبات العائلة")  # #504
add(f, "labelAr: 'أفكار', desc", "labelAr: 'الأفكار', desc")  # #506 
add(f, "لوحة أفكار واقتراحات العائلة", "لوحة أفكار واقتراحات العائلة")  # #506 desc (unchanged)
add(f, "هذي الخدمة تحت التطوير", "هذه الخدمة قيد التطوير")  # #508
add(f, "قريباً — تحت التطوير", "قريبًا — قيد التطوير")  # #509

# --- QueueScreen.tsx ---
f = os.path.join(SCREENS, 'QueueScreen.tsx')
add(f, "ما في شي معلّق — الحمد لله", "لا توجد مهام معلّقة — الحمد لله")  # #513

# --- ReservoirScreen.tsx ---
f = os.path.join(SCREENS, 'ReservoirScreen.tsx')
add(f, "آخر الحركات", "آخر العمليات")  # #527
add(f, "تعبئة الخزنة", "إيداع في الخزنة")  # #528
add(f, "تعبئة صندوق الطوارئ", "إيداع في صندوق الطوارئ")  # #533

# --- ProjectsScreen.tsx ---
f = os.path.join(SCREENS, 'ProjectsScreen.tsx')
add(f, "': 'مساهمين'", "': 'مساهمًا'")  # #554

# --- PlaceholderScreen.tsx ---
f = os.path.join(SCREENS, 'PlaceholderScreen.tsx')
add(f, "هذا الموديول قيد التطوير", "هذه الوحدة قيد التطوير")  # #567

# --- NotificationsScreen.tsx ---
f = os.path.join(SCREENS, 'NotificationsScreen.tsx')
add(f, "فاتورة الكهرباء غداً", "فاتورة الكهرباء مستحقة غدًا")  # #584
add(f, "تم إرسال المصروف — ٥٬٣٠٠ ر.س", "تم إرسال المصروف الشهري — ٥٬٣٠٠ ر.س")  # #586

# --- PendingScreen.tsx ---
f = os.path.join(SCREENS, 'PendingScreen.tsx')
add(f, "طلبك وصل — أحمد بيراجعه", "وصل طلبك — أحمد يراجعه")  # #605
# #607: observer-locked subtitle
add(f, "subtitleAr: 'لما الابن المسؤول ينشر الخطة، بتقدرين تشوفين كل شي'", "subtitleAr: 'بمجرد نشر الخطة، ستتمكنين من رؤية كل شيء'")  # #607

# --- WaitingRoomScreen.tsx ---
f = os.path.join(SCREENS, 'WaitingRoomScreen.tsx')
add(f, "': 'تفعيل الخطة'", "': 'تفعيل الخطة الآن'")  # #615

# ============================================================
# APPLY ALL CHANGES
# ============================================================
total_applied = 0
total_files = 0

for filepath, replacements in sorted(changes.items()):
    basename = os.path.basename(filepath)
    if not os.path.exists(filepath):
        print(f"MISSING: {basename}")
        continue
    count = apply_replacements(filepath, replacements)
    if count > 0:
        total_files += 1
        total_applied += count
        print(f"  {basename}: {count}/{len(replacements)} applied")
    else:
        print(f"  {basename}: 0/{len(replacements)} applied (strings may have already changed)")

print(f"\n{'='*50}")
print(f"TOTAL: {total_applied} replacements across {total_files} files")
print(f"(App.tsx and DemoControls.tsx were already edited directly)")
