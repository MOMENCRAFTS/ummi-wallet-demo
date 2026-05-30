"""Find all remaining OLD strings that still need updating, checking actual file content."""
import os, json

SRC = os.path.join('src', 'components', 'screens')

# Map of: filename -> list of (old_from_user, new_from_user) that we need to verify
REMAINING_CHECKS = {
    'AdminDashboard.tsx': [
        ("صحة الخزنة", "حالة الخزنة"),
        ("انشر الخطة", "نشر الخطة"),
        ("الخطة منشورة", "تم نشر الخطة"),
        ("آخر الأخبار", "النشاط الأخير"),
        ("إدارة الخدمات", "إدارة"),
        ("تحديث اللوحة", "تحديث لوحة التحكم"),
        ("بيانات مباشرة", "بيانات حيّة"),
        ("شخصي الوالدة", "مصروف الوالدة الشخصي"),
    ],
    'FinanceChatScreen.tsx': [
        ("وراتب السائق", "ما راتب السائق"),
        ("إعداد ذكي", "إعداد بالذكاء الاصطناعي"),
        ("تقدير أمي:", "تقدير الوالدة:"),
        ("صحة الميزانية", "سلامة الميزانية"),
        ("مراجعة الترجمة", "مراجعة الترجمات"),
        ("تخطي للملخص", "الانتقال إلى الملخص"),
    ],
    'FinanceWelcomeScreen.tsx': [
        ("إعداد المالية", "إعداد الخطة المالية"),
        ("خلّنا نبني خطة الدعم", "لننشئ خطة الدعم الخاصة بها"),
        ("ما أخبرتنا أمي", "ما شاركته الوالدة معنا"),
        ("خادمة + سائق", "عاملة منزلية + سائق"),
        ("بدء الإعداد بالذكاء الاصطناعي", "بدء الإعداد الموجّه بالذكاء الاصطناعي"),
        ("إعداد يدوي", "الإعداد يدويًا"),
    ],
    'BrotherDashboard.tsx': [
        ("إجمالي المدفوع", "إجمالي المدفوعات"),
        ("وين أحوّل", "أين أحوّل"),
    ],
    'ObserverDashboard.tsx': [
        ("أهلاً يا أختي", "أهلًا بكِ"),
    ],
    'LandingScreen.tsx': [
        ("عر/EN", "عربي/إنجليزي"),
    ],
    'HybridOnboardingScreen.tsx': [
        ("عن الابن المسؤول", "بياناتك"),
        ("اسمك ولغة التطبيق المفضلة", "اسمك واللغة المفضلة للتطبيق"),
        ("عشان نربط حسابها ونسهّل التحويلات", "لربط حسابها وتسهيل التحويلات"),
        ("اختر الموظفين وحدد الرواتب", "اختر طاقم المنزل وحدد رواتبهم"),
        ("إعداد العائلة", "إنشاء عائلتك"),
        ("خطة رعاية الوالدة", "إعداد Ummi Wallet لدائرة عائلتك"),
    ],
    'PhoneVerifyScreen.tsx': [
        ("رقم جوال غير صالح", "رقم جوال سعودي غير صالح"),
        ("أدخل رقمك لربطك بعائلتك", "أدخل رقمك للانضمام إلى عائلتك"),
    ],
    'CelebrationScreen.tsx': [
        ("ر.س/شهرياً", "ر.س/شهريًا"),
        ("الذهاب للوحة التحكم", "الانتقال إلى لوحة التحكم"),
    ],
    'MotherDashboard.tsx': [
        ("رصيدك لهالشهر", "المتاح هذا الشهر"),
        ("أضيفي بيانات البنك", "أضيفي بياناتك البنكية"),
        ("أخبار العيلة", "آخر أخبار العائلة"),
    ],
    'WaitingRoomScreen.tsx': [
        ("تفعيل الخطة", "تفعيل الخطة الآن"),
    ],
}

results = {}
for filename, checks in REMAINING_CHECKS.items():
    filepath = os.path.join(SRC, filename) if filename != 'HybridOnboardingScreen.tsx' else os.path.join(SRC, filename)
    if not os.path.exists(filepath):
        results[filename] = "FILE MISSING"
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    file_results = []
    for old, new in checks:
        if old in content:
            file_results.append(f"  NEEDS UPDATE: '{old}' -> '{new}'")
        elif new in content:
            file_results.append(f"  ALREADY DONE: '{new}'")
        else:
            file_results.append(f"  NEITHER FOUND: '{old}'")
    results[filename] = "\n".join(file_results)

for filename, result in sorted(results.items()):
    print(f"\n--- {filename} ---")
    print(result)
