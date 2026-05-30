/**
 * FinanceReadjustmentScreen — Budget rebalancing
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, SeedlingIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const INITIAL = [
  { name: 'Mother Personal', nameAr: 'مصروف الوالدة', amount: 1200 },
  { name: 'Groceries', nameAr: 'البقالة', amount: 800 },
  { name: 'Medical', nameAr: 'الأدوية', amount: 500 },
  { name: 'Utilities', nameAr: 'الفواتير', amount: 800 },
  { name: 'Maintenance', nameAr: 'الصيانة', amount: 1200 },
  { name: 'Emergency', nameAr: 'الطوارئ', amount: 2000 },
];

export default function FinanceReadjustmentScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [amounts, setAmounts] = useState(INITIAL.map(p => p.amount));
  const total = amounts.reduce((s, a) => s + a, 0);

  const adjust = (idx: number, delta: number) => {
    setAmounts(prev => prev.map((a, i) => i === idx ? Math.max(0, a + delta) : a));
  };

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><SeedlingIcon size={20} /> {isAr ? 'إعادة الضبط' : 'Readjust'}</span>
      </div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'الإجمالي الجديد' : 'New Total'}</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: c.brown }}>{total.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
        </motion.div>

        {INITIAL.map((p, i) => (
          <motion.div key={p.name} className="card" style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
            <div>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? p.nameAr : p.name}</p>
              {amounts[i] !== p.amount && (
                <p style={{ fontSize: 11, color: amounts[i] > p.amount ? c.emergency : c.success }}>
                  {amounts[i] > p.amount ? '+' : ''}{(amounts[i] - p.amount).toLocaleString()} {isAr ? 'من المبلغ الأصلي' : 'from original'}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <motion.button className="btn btn-glass btn-sm" style={{ width: 28, height: 28, padding: 0 }} whileTap={{ scale: 0.9 }} onClick={() => adjust(i, -100)}>−</motion.button>
              <span style={{ fontWeight: 700, fontSize: 14, color: c.brown, minWidth: 50, textAlign: 'center' }}>{amounts[i].toLocaleString()}</span>
              <motion.button className="btn btn-glass btn-sm" style={{ width: 28, height: 28, padding: 0 }} whileTap={{ scale: 0.9 }} onClick={() => adjust(i, 100)}>+</motion.button>
            </div>
          </motion.div>
        ))}

        <motion.button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('finance-celebration')}>
          <CheckLeafIcon size={16} color="#fff" /> {isAr ? 'تأكيد إعادة الضبط' : 'Confirm Readjustment'}
        </motion.button>
      </div>
    </div>
  );
}
