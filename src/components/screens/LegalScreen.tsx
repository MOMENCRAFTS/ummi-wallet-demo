/**
 * LegalScreen — Privacy Policy & Terms of Service
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, ShieldLeafIcon, DocumentLeafIcon, c } from '../icons/FloralIcons';

type Tab = 'privacy' | 'terms';

const CONTENT = {
  privacy: {
    title: 'Privacy Policy', titleAr: 'سياسة الخصوصية',
    sections: [
      { heading: 'Data Collection', headingAr: 'جمع البيانات', body: 'Ummi Wallet collects only the information necessary to manage your family\'s financial circle: names, phone numbers, email addresses, and financial transaction data. We do not sell or share your personal data with third parties.', bodyAr: 'يجمع تطبيق محفظة أمي فقط المعلومات الضرورية لإدارة الدائرة المالية لعائلتك: الأسماء وأرقام الهواتف والبريد الإلكتروني وبيانات المعاملات المالية. لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة.' },
      { heading: 'Data Storage', headingAr: 'تخزين البيانات', body: 'All data is stored securely on Supabase infrastructure with Row-Level Security (RLS) ensuring each family can only access their own data. Data is encrypted at rest and in transit.', bodyAr: 'يتم تخزين جميع البيانات بشكل آمن على بنية Supabase التحتية مع أمان على مستوى الصف (RLS) لضمان وصول كل عائلة إلى بياناتها فقط. البيانات مشفرة في التخزين والنقل.' },
      { heading: 'Your Rights', headingAr: 'حقوقك', body: 'You may request deletion of your account and all associated data at any time through the Settings screen. Upon deletion, all personal data will be permanently removed within 30 days.', bodyAr: 'يمكنك طلب حذف حسابك وجميع البيانات المرتبطة به في أي وقت من خلال شاشة الإعدادات. عند الحذف، ستتم إزالة جميع البيانات الشخصية نهائيًا خلال ٣٠ يومًا.' },
    ],
  },
  terms: {
    title: 'Terms of Service', titleAr: 'الشروط والأحكام',
    sections: [
      { heading: 'Service Description', headingAr: 'وصف الخدمة', body: 'Ummi Wallet is a family financial coordination tool. It does not provide banking services, financial advice, or process actual monetary transactions. All financial tracking is record-keeping only.', bodyAr: 'محفظة أمي هي أداة تنسيق مالي عائلي. لا تقدم خدمات مصرفية أو استشارات مالية أو معالجة معاملات نقدية فعلية. جميع التتبع المالي هو لأغراض السجلات فقط.' },
      { heading: 'User Responsibilities', headingAr: 'مسؤوليات المستخدم', body: 'Users are responsible for the accuracy of data entered. The lead caregiver (admin) is responsible for managing family membership and access rights.', bodyAr: 'المستخدمون مسؤولون عن دقة البيانات المدخلة. المسؤول الرئيسي (الأدمن) مسؤول عن إدارة عضوية العائلة وصلاحيات الوصول.' },
      { heading: 'Limitation of Liability', headingAr: 'حدود المسؤولية', body: 'MomenCrafts is not liable for financial decisions made based on information displayed in the app. Users should independently verify all financial information.', bodyAr: 'MomenCrafts غير مسؤولة عن القرارات المالية المتخذة بناءً على المعلومات المعروضة في التطبيق. يجب على المستخدمين التحقق بشكل مستقل من جميع المعلومات المالية.' },
    ],
  },
};

export default function LegalScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [tab, setTab] = useState<Tab>('privacy');
  const content = CONTENT[tab];

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><ShieldLeafIcon size={20} /> {isAr ? 'القانونية' : 'Legal'}</span>
      </div>
      <div className="screen-body">
        {/* Tabs */}
        <div className="filter-row" style={{ marginBottom: 16 }}>
          {(['privacy', 'terms'] as const).map(t => (
            <button key={t} className={`filter-chip ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'privacy' ? (isAr ? 'الخصوصية' : 'Privacy') : (isAr ? 'الشروط' : 'Terms')}
            </button>
          ))}
        </div>

        <motion.h2 key={tab} style={{ fontSize: 16, fontWeight: 700, color: c.brown, marginBottom: 16 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {isAr ? content.titleAr : content.title}
        </motion.h2>

        {content.sections.map((s, i) => (
          <motion.div key={i} className="card" style={{ padding: 14, marginBottom: 10 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: c.brown, marginBottom: 6 }}>{isAr ? s.headingAr : s.heading}</h4>
            <p style={{ fontSize: 12, color: c.muted, lineHeight: 1.8, margin: 0 }}>{isAr ? s.bodyAr : s.body}</p>
          </motion.div>
        ))}

        <p style={{ fontSize: 10, color: c.muted, textAlign: 'center', marginTop: 20 }}>
          MomenCrafts © 2024–2026. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </p>
      </div>
    </div>
  );
}
