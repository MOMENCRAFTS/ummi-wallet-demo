/**
 * MotherBalanceScreen — Monthly balance breakdown
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, MoneyLeafIcon, c } from '../icons/FloralIcons';

const MONTHS = [
  { month: 'June 2026', monthAr: 'يونيو ٢٠٢٦', allocated: 5300, spent: 2850, remaining: 2450 },
  { month: 'May 2026', monthAr: 'مايو ٢٠٢٦', allocated: 5300, spent: 4900, remaining: 400 },
  { month: 'April 2026', monthAr: 'أبريل ٢٠٢٦', allocated: 5000, spent: 5000, remaining: 0 },
];

export default function MotherBalanceScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><MoneyLeafIcon size={20} /> {isAr ? 'تفاصيل الرصيد' : 'Balance Details'}</span>
      </div>
      <div className="screen-body">
        {MONTHS.map((m, i) => {
          const pct = m.allocated > 0 ? Math.round((m.spent / m.allocated) * 100) : 0;
          return (
            <motion.div key={m.month} className="card" style={{ marginBottom: 10 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 14, marginBottom: 8 }}>{isAr ? m.monthAr : m.month}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <div><p style={{ color: c.muted }}>{isAr ? 'المخصّص' : 'Allocated'}</p><p style={{ fontWeight: 700, color: c.brown }}>{m.allocated.toLocaleString()}</p></div>
                <div><p style={{ color: c.muted }}>{isAr ? 'المصروف' : 'Spent'}</p><p style={{ fontWeight: 700, color: c.peach }}>{m.spent.toLocaleString()}</p></div>
                <div><p style={{ color: c.muted }}>{isAr ? 'المتبقي' : 'Remaining'}</p><p style={{ fontWeight: 700, color: m.remaining > 0 ? c.success : c.muted }}>{m.remaining.toLocaleString()}</p></div>
              </div>
              <div style={{ height: 5, background: c.divider, borderRadius: 3, marginTop: 8 }}>
                <div style={{ height: 5, background: pct >= 100 ? c.emergency : c.mint, borderRadius: 3, width: `${Math.min(pct, 100)}%` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
