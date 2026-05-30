/**
 * FinanceAuditObserverScreen — Observer read-only view
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, EyeLeafIcon, c } from '../icons/FloralIcons';

const PLAN_ITEMS = [
  { category: 'Mother Allowance', categoryAr: 'مصروف الوالدة', amount: 5300 },
  { category: 'Utilities', categoryAr: 'الفواتير', amount: 1600 },
  { category: 'Medical', categoryAr: 'الأدوية', amount: 500 },
  { category: 'Maintenance', categoryAr: 'الصيانة', amount: 800 },
  { category: 'Emergency', categoryAr: 'الطوارئ', amount: 2000 },
];

export default function FinanceAuditObserverScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const total = PLAN_ITEMS.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><EyeLeafIcon size={20} /> {isAr ? 'عرض الخطة' : 'View Plan'}</span>
      </div>
      <div className="screen-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '8px 12px', background: c.blue + '12', borderRadius: 8 }}>
          <EyeLeafIcon size={16} color={c.blue} />
          <span style={{ fontSize: 12, color: c.blue, fontWeight: 500 }}>{isAr ? 'وضع المشاهدة فقط' : 'View-only mode'}</span>
        </div>

        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'إجمالي الخطة' : 'Plan Total'}</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: c.brown }}>{total.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
        </motion.div>

        {PLAN_ITEMS.map((p, i) => (
          <motion.div key={p.category} className="card" style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
            <span style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? p.categoryAr : p.category}</span>
            <span style={{ fontWeight: 700, color: c.mint, fontSize: 14 }}>{p.amount.toLocaleString()}</span>
          </motion.div>
        ))}

        <motion.button className="btn btn-glass btn-md btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={goBack}>
          {isAr ? 'رجوع' : 'Go Back'}
        </motion.button>
      </div>
    </div>
  );
}
