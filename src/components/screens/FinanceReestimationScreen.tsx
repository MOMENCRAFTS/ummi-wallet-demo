/**
 * FinanceReestimationScreen — Variance analysis
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, ChartBloomIcon, c } from '../icons/FloralIcons';

const VARIANCES = [
  { category: 'Groceries', categoryAr: 'البقالة', planned: 800, actual: 1050, variance: 250 },
  { category: 'Medical', categoryAr: 'الأدوية', planned: 500, actual: 380, variance: -120 },
  { category: 'Utilities', categoryAr: 'الخدمات', planned: 800, actual: 850, variance: 50 },
  { category: 'Maintenance', categoryAr: 'الصيانة', planned: 800, actual: 1400, variance: 600 },
];

export default function FinanceReestimationScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const totalVariance = VARIANCES.reduce((s, v) => s + v.variance, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><ChartBloomIcon size={20} /> {isAr ? 'إعادة التقدير' : 'Re-estimation'}</span>
      </div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ borderLeftWidth: 3, borderLeftColor: totalVariance > 0 ? c.emergency : c.success, borderLeftStyle: 'solid' }}>
          <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'إجمالي الفرق' : 'Total Variance'}</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: totalVariance > 0 ? c.emergency : c.success }}>
            {totalVariance > 0 ? '+' : ''}{totalVariance.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span>
          </p>
        </motion.div>

        {VARIANCES.map((v, i) => (
          <motion.div key={v.category} className="card" style={{ marginTop: 8 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? v.categoryAr : v.category}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <div><p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'المخطط' : 'Planned'}</p><p style={{ fontWeight: 600, fontSize: 13 }}>{v.planned.toLocaleString()}</p></div>
              <div><p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'الفعلي' : 'Actual'}</p><p style={{ fontWeight: 600, fontSize: 13 }}>{v.actual.toLocaleString()}</p></div>
              <div><p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'الفرق' : 'Diff'}</p><p style={{ fontWeight: 700, fontSize: 13, color: v.variance > 0 ? c.emergency : c.success }}>{v.variance > 0 ? '+' : ''}{v.variance.toLocaleString()}</p></div>
            </div>
          </motion.div>
        ))}

        <motion.button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('finance-readjustment')}>
          {isAr ? 'إعادة ضبط الميزانية' : 'Readjust Budget'}
        </motion.button>
      </div>
    </div>
  );
}
