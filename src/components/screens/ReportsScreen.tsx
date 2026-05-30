/**
 * ReportsScreen — Monthly/annual financial reports
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, ChartBloomIcon, c } from '../icons/FloralIcons';

const SUMMARY = [
  { label: 'Total Spent', labelAr: 'إجمالي المصروفات', value: 14200, color: c.peach },
  { label: 'Total Saved', labelAr: 'إجمالي المدخرات', value: 4550, color: c.success },
  { label: 'Contributions', labelAr: 'المساهمات', value: 12000, color: c.mint },
];

const CATEGORIES = [
  { name: 'Groceries', nameAr: 'البقالة', amount: 3200, pct: 23, color: c.mint },
  { name: 'Utilities', nameAr: 'الخدمات', amount: 2800, pct: 20, color: c.blue },
  { name: 'Medical', nameAr: 'الطبية', amount: 2100, pct: 15, color: c.peach },
  { name: 'Maintenance', nameAr: 'الصيانة', amount: 1800, pct: 13, color: c.yellow },
  { name: 'Payroll', nameAr: 'الرواتب', amount: 2500, pct: 18, color: c.gold },
  { name: 'Other', nameAr: 'أخرى', amount: 1800, pct: 11, color: c.muted },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
const MONTHLY_SPEND = [11200, 13500, 12800, 14900, 13200, 14200];
const maxSpend = Math.max(...MONTHLY_SPEND);

export default function ReportsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><ChartBloomIcon size={20} color={c.blue} /> {isAr ? 'التقارير' : 'Reports'}</span>
      </div>
      <div className="screen-body">
        {/* Summary cards */}
        <div style={{ display: 'flex', gap: 8 }}>
          {SUMMARY.map((s, i) => (
            <motion.div
              key={s.label}
              className="card"
              style={{ flex: 1, textAlign: 'center', borderTopWidth: 3, borderTopColor: s.color, borderTopStyle: 'solid' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <p style={{ fontSize: 16, fontWeight: 700, color: c.brown }}>{s.value.toLocaleString()}</p>
              <p style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{isAr ? s.labelAr : s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mini bar chart */}
        <motion.div className="card" style={{ marginTop: 12 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3 className="section-title" style={{ marginBottom: 10 }}>{isAr ? 'المصروفات الشهرية' : 'Monthly Spending'}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
            {MONTHLY_SPEND.map((v, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <motion.div
                  style={{ background: i === MONTHLY_SPEND.length - 1 ? c.mint : c.mint + '40', borderRadius: 4, margin: '0 auto', width: '80%' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxSpend) * 60}px` }}
                  transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 200, damping: 15 }}
                />
                <p style={{ fontSize: 9, color: c.muted, marginTop: 4 }}>{isAr ? MONTHS_AR[i] : MONTHS[i]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category breakdown */}
        <h3 className="section-title" style={{ marginTop: 16 }}>{isAr ? 'التوزيع حسب الفئة' : 'By Category'}</h3>
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="card"
            style={{ marginBottom: 6 }}
            initial={{ opacity: 0, x: isAr ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.04 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? cat.nameAr : cat.name}</span>
              <span style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{cat.amount.toLocaleString()} <span style={{ color: c.muted, fontSize: 11 }}>{cat.pct}%</span></span>
            </div>
            <div style={{ height: 4, background: c.divider, borderRadius: 2 }}>
              <motion.div
                style={{ height: 4, background: cat.color, borderRadius: 2 }}
                initial={{ width: 0 }}
                animate={{ width: `${cat.pct}%` }}
                transition={{ delay: 0.4 + i * 0.04 }}
              />
            </div>
          </motion.div>
        ))}

        <motion.button className="btn btn-glass btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          {isAr ? 'تنزيل PDF' : 'Download PDF'}
        </motion.button>
      </div>
    </div>
  );
}
