/**
 * FinanceDispatchScreen — Dispatch budget to pockets
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, SeedlingIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const POCKETS = [
  { name: 'Mother Personal', nameAr: 'مصروف الوالدة', amount: 1200 },
  { name: 'Groceries', nameAr: 'البقالة', amount: 800 },
  { name: 'Medical', nameAr: 'الأدوية', amount: 500 },
  { name: 'Utilities', nameAr: 'الفواتير', amount: 800 },
  { name: 'Emergency Fund', nameAr: 'صندوق الطوارئ', amount: 2000 },
  { name: 'Savings', nameAr: 'الادخار', amount: 1500 },
];

export default function FinanceDispatchScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const total = POCKETS.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><SeedlingIcon size={20} /> {isAr ? 'توزيع الميزانية' : 'Dispatch Budget'}</span>
      </div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'إجمالي التوزيع' : 'Total Distribution'}</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: c.brown }}>{total.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
        </motion.div>

        {POCKETS.map((p, i) => (
          <motion.div key={p.name} className="card" style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, x: isAr ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <div>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? p.nameAr : p.name}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, color: c.mint, fontSize: 15 }}>{p.amount.toLocaleString()}</span>
              <span style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'ر.س' : 'SAR'}</span>
            </div>
          </motion.div>
        ))}

        <motion.button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('finance-waiting')}>
          <CheckLeafIcon size={16} color="#fff" /> {isAr ? 'تأكيد التوزيع' : 'Confirm Distribution'}
        </motion.button>
      </div>
    </div>
  );
}
