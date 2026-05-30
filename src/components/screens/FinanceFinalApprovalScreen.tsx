/**
 * FinanceFinalApprovalScreen — Final sign-off
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, CheckLeafIcon, CrownFloralIcon, PersonFloralIcon, EyeLeafIcon, c } from '../icons/FloralIcons';

const APPROVALS = [
  { name: 'Ahmed (Admin)', nameAr: 'أحمد (المسؤول)', status: 'approved', Icon: CrownFloralIcon, color: c.gold },
  { name: 'Mohammed', nameAr: 'محمد', status: 'approved', Icon: PersonFloralIcon, color: c.mint },
  { name: 'Khalid', nameAr: 'خالد', status: 'approved', Icon: PersonFloralIcon, color: c.mint },
  { name: 'Sara (Observer)', nameAr: 'سارة (مراقبة)', status: 'viewed', Icon: EyeLeafIcon, color: c.blue },
];

export default function FinanceFinalApprovalScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><CheckLeafIcon size={20} color={c.success} /> {isAr ? 'الموافقة النهائية' : 'Final Approval'}</span>
      </div>
      <div className="screen-body">
        <p style={{ color: c.muted, fontSize: 13, marginBottom: 16 }}>{isAr ? 'حالة الموافقة من جميع الأعضاء' : 'Approval status from all members'}</p>

        {APPROVALS.map((a, i) => (
          <motion.div key={a.name} className="card" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: a.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a.Icon size={18} color={a.color} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? a.nameAr : a.name}</p>
            </div>
            <span className="badge badge-approved" style={{ background: c.success + '20', color: c.success }}>
              <CheckLeafIcon size={12} color={c.success} /> {a.status === 'approved' ? (isAr ? 'تمت الموافقة' : 'Approved') : (isAr ? 'تم الاطلاع' : 'Viewed')}
            </span>
          </motion.div>
        ))}

        <motion.button className="btn btn-primary btn-lg btn-full glow-mint" style={{ marginTop: 24 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('finance-celebration')}>
          {isAr ? 'اعتماد الخطة نهائيًا' : 'Finalize Plan'}
        </motion.button>
      </div>
    </div>
  );
}
