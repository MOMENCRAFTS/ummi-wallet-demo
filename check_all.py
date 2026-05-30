"""Comprehensive check: find ALL remaining user-requested changes that are NOT yet applied."""
import os

SRC = os.path.join('src', 'components', 'screens')

ALL_CHANGES = [
    # (filename, old, new, change_id)
    ('AdminDashboard.tsx', 'آخر الأخبار', 'النشاط الأخير', '#150'),
    ('AdminDashboard.tsx', 'شخصي الوالدة', 'مصروف الوالدة الشخصي', '#158'),
    ('AdminDashboard.tsx', 'صرفية أدوية الصيدلية', 'تعويض مصاريف الصيدلية', '#167'),
    ('AdminDashboard.tsx', 'سارة انضمت', 'انضمّت سارة', '#177'),
    ('AdminBillsScreen.tsx', 'الكهرباء (الشركة السعودية)', 'الكهرباء (الشركة السعودية للكهرباء)', '#197'),
    ('FinanceChatScreen.tsx', 'وراتب السائق', 'ما راتب السائق', '#216'),
    ('FinanceChatScreen.tsx', 'تخطي للملخص', 'الانتقال إلى الملخص', '#236'),
    ('FinanceWelcomeScreen.tsx', 'خلّنا نبني', 'لننشئ', '#207'),
    ('FinanceWelcomeScreen.tsx', 'ما أخبرتنا أمي', 'ما شاركته الوالدة', '#208'),
    ('FinanceWelcomeScreen.tsx', 'بدء الإعداد بالذكاء', 'بدء الإعداد الموجّه', '#213'),
    ('FinanceWelcomeScreen.tsx', 'إعداد يدوي', 'الإعداد يدوي', '#214'),
    ('HybridOnboardingScreen.tsx', 'اختر الموظفين', 'اختر طاقم المنزل', '#117'),
    ('HybridOnboardingScreen.tsx', 'خطة رعاية الوالدة', 'إعداد Ummi Wallet', '#138'),
    ('LandingScreen.tsx', 'عر/EN', 'عربي/إنجليزي', '#041'),
    ('MotherDashboard.tsx', 'رصيدك لهالشهر', 'المتاح هذا الشهر', '#291'),
    ('MotherDashboard.tsx', 'خروج', 'تسجيل الخروج', '#289'),
    ('ObserverDashboard.tsx', 'أهلاً يا أختي', 'أهلًا بكِ', '#446'),
    ('ObserverDashboard.tsx', 'لما الابن المسؤول', 'بمجرد نشر الخطة', '#444'),
    ('PhoneVerifyScreen.tsx', 'رقم جوال غير صالح', 'رقم جوال سعودي', '#050'),
    ('WaitingRoomScreen.tsx', 'تفعيل الخطة', 'تفعيل الخطة الآن', '#615'),
    ('BrotherDashboard.tsx', 'إجمالي المدفوع', 'إجمالي المدفوعات', '#385'),
    ('BrotherDashboard.tsx', 'خروج', 'تسجيل الخروج', '#381'),
    ('MotherSOSScreen.tsx', 'حدد نوع الطوارئ', 'حددي نوع الطوارئ', '#353'),
    ('MotherSettingsScreen.tsx', 'العربية', 'الإنجليزية', '#365'),
    ('MotherCelebrationsScreen.tsx', 'إرسال دعوة', 'إرسال تهنئة', '#375'),
    ('MotherFeedScreen.tsx', 'أخبار العيلة', 'آخر أخبار العائلة', '#376'),
    ('BrotherAuditScreen.tsx', 'جزاك الله خير', 'جزاك الله خيرًا', '#405'),
    ('BrotherContributionScreen.tsx', 'حوّل على هالحساب', 'حوّل إلى هذا الحساب', '#407'),
    ('BrotherProofScreen.tsx', 'ارفق صورة', 'أرفق صورة', '#423'),
    ('BrotherSettlementScreen.tsx', 'تسويتي', 'تسوية مساهمتي', '#432'),
    ('BrotherSettlementScreen.tsx', 'مسوّى', 'تمت التسوية', '#436'),
    ('BrotherSuggestionsScreen.tsx', 'أعجبني', 'تم الإعجاب', '#438'),
    ('ObserverCelebrationsScreen.tsx', 'يوم', 'أيام', '#455'),
    ('ObserverFeedScreen.tsx', 'متابعة الأحداث', 'آخر أخبار العائلة', '#456'),
    ('FinanceSummaryScreen.tsx', 'احتياط', 'احتياطي', '#249'),
    ('FinanceSummaryScreen.tsx', 'إرسال للعائلة', 'إرسال إلى العائلة', '#250'),
    ('FinanceFinalApprovalScreen.tsx', 'موافق', 'تمت الموافقة', '#257'),
    ('FinanceFinalApprovalScreen.tsx', 'اطلع', 'تم الاطلاع', '#258'),
    ('FinanceAuditContributorScreen.tsx', 'موافقة', 'اعتماد', '#263'),
    ('FinanceReadjustmentScreen.tsx', 'إعادة التوزيع', 'إعادة الضبط', '#275'),
    ('FinanceRevisionScreen.tsx', 'المراجعات', 'طلبات التعديل', '#279'),
    ('FinanceRevisionScreen.tsx', 'إرسال المراجعة', 'إرسال التعديل', '#284'),
    ('MotherBillsScreen.tsx', 'إجمالي القادم', 'إجمالي المستحقات القادمة', '#334'),
    ('MotherBillsScreen.tsx', 'فواتير قادمة', 'المستحقات القادمة', '#335'),
    ('QueueScreen.tsx', 'ما في شي معلّق', 'لا توجد مهام معلّقة', '#513'),
    ('PlaceholderScreen.tsx', 'هذا الموديول', 'هذه الوحدة', '#567'),
    ('ProjectsScreen.tsx', 'مساهمين', 'مساهمًا', '#554'),
]

for filename, old_substr, new_substr, change_id in ALL_CHANGES:
    filepath = os.path.join(SRC, filename)
    if not os.path.exists(filepath):
        print(f"MISSING FILE: {filename} ({change_id})")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_substr in content and new_substr not in content:
        print(f"NEEDS: {filename} {change_id}: '{old_substr}' -> '{new_substr}'")
    elif new_substr in content:
        pass  # already done, silent
    else:
        print(f"NOT_FOUND: {filename} {change_id}: '{old_substr}'")
