/**
 * SettlementScreen — Contribution reconciliation
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, BalanceLeavesIcon, CheckLeafIcon, PendingBudIcon, c } from '../icons/FloralIcons';

const BROTHERS = [
  { name: 'Ahmed (Admin)', nameAr: 'أحمد (المسؤول)', expected: 5000, paid: 5000, status: 'settled' },
  { name: 'Mohammed', nameAr: 'محمد', expected: 3000, paid: 3000, status: 'settled' },
  { name: 'Khalid', nameAr: 'خالد', expected: 2000, paid: 1500, status: 'partial' },
  { name: 'Omar', nameAr: 'عمر', expected: 2000, paid: 0, status: 'pending' },
];

export default function SettlementScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const totalExpected = BROTHERS.reduce((s, b) => s + b.expected, 0);
  const totalPaid = BROTHERS.reduce((s, b) => s + b.paid, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><BalanceLeavesIcon size={20} /> {isAr ? 'التسوية' : 'Settlement'}</span>
      </div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div><p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'المطلوب' : 'Expected'}</p><p style={{ fontSize: 20, fontWeight: 700, color: c.brown }}>{totalExpected.toLocaleString()}</p></div>
            <div style={{ textAlign: 'center' }}><p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'المحصّل' : 'Collected'}</p><p style={{ fontSize: 20, fontWeight: 700, color: c.success }}>{totalPaid.toLocaleString()}</p></div>
            <div style={{ textAlign: 'right' }}><p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'المتبقي' : 'Remaining'}</p><p style={{ fontSize: 20, fontWeight: 700, color: c.emergency }}>{(totalExpected - totalPaid).toLocaleString()}</p></div>
          </div>
          <div style={{ height: 6, background: c.divider, borderRadius: 3, marginTop: 12 }}>
            <div style={{ height: 6, background: c.success, borderRadius: 3, width: `${(totalPaid / totalExpected) * 100}%` }} />
          </div>
        </motion.div>

        {BROTHERS.map((b, i) => {
          const pct = b.expected > 0 ? Math.round((b.paid / b.expected) * 100) : 0;
          const remaining = b.expected - b.paid;
          return (
            <motion.div key={b.name} className="card" style={{ marginTop: 8 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? b.nameAr : b.name}</p>
                  <p style={{ color: c.muted, fontSize: 12 }}>{b.paid.toLocaleString()} / {b.expected.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</p>
                </div>
                <span className={`badge ${b.status === 'settled' ? 'badge-approved' : 'badge-pending'}`} style={b.status === 'settled' ? { background: c.success + '20', color: c.success } : {}}>
                  {b.status === 'settled' ? <><CheckLeafIcon size={12} color={c.success} /> {isAr ? 'تمت التسوية' : 'Settled'}</> : <><PendingBudIcon size={12} /> {isAr ? `متبقي ${remaining.toLocaleString()}` : `${remaining.toLocaleString()} left`}</>}
                </span>
              </div>
              <div style={{ height: 4, background: c.divider, borderRadius: 2, marginTop: 8 }}>
                <div style={{ height: 4, background: pct >= 100 ? c.success : c.yellow, borderRadius: 2, width: `${pct}%` }} />
              </div>
              {b.status === 'pending' && (
                <motion.button className="btn btn-glass btn-sm" style={{ marginTop: 8 }} whileTap={{ scale: 0.95 }}>
                  {isAr ? 'إرسال تذكير' : 'Remind'}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
