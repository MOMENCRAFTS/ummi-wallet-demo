import os

SRC = os.path.join('src', 'components', 'screens')

def check_file(filename, strings):
    filepath = os.path.join(SRC, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n--- {filename} ---")
    for s in strings:
        status = "FOUND" if s in content else "MISS"
        print(f"  {status}: {repr(s)}")

check_file('AdminDashboard.tsx', [
    "خروج", "صحة الخزنة", "موافقة", "انشر الخطة",
    "الخطة منشورة", "آخر الأخبار", "إدارة الخدمات",
    "تحديث اللوحة", "بيانات مباشرة",
    "شخصي الوالدة", "الطبية", "الفواتير",
    "طوارئ", "خطة ذكية", "أفكار",
    "فاتورة الكهرباء - مايو", "فاتورة الكهرباء — مايو",
    "الصيدلية", "متأخّر",
])

check_file('FinanceChatScreen.tsx', [
    "تمام!", "الخادمة", "وراتب السائق",
    "إعداد ذكي", "تقدير أمي:", "تحليل خطتك",
    "أمان", "الإجمالي",
])

check_file('BrotherDashboard.tsx', [
    "خروج", "الابن المسؤول ينشر", "إجمالي المدفوع",
    "وين أحوّل", "مراجعة الخطة",
])

check_file('LandingScreen.tsx', [
    "رعاية العائلة بوضوح وكرامة",
    "دعم العائلة بوضوح وكرامة",
    "كل شي واضح",
    "عر/EN",
])

check_file('ObserverDashboard.tsx', [
    "خروج", "لما الابن المسؤول",
    "أهلاً يا أختي", "المتابعة", "مناسبات",
])
