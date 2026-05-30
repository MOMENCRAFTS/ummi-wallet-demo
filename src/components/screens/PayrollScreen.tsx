/**
 * PayrollScreen — Household staff payroll
 * Zero emoji — all SVG FloralIcons
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, PayrollLeafIcon, CheckLeafIcon, PendingBudIcon, c } from '../icons/FloralIcons';

const STAFF = [
  { name: 'Mansour (Driver)', nameAr: 'منصور (السائق)', salary: 3500, status: 'paid', paidDate: 'May 28', paidDateAr: '٢٨ مايو' },
  { name: 'Fatima (Maid)', nameAr: 'فاطمة (العاملة)', salary: 2800, status: 'paid', paidDate: 'May 28', paidDateAr: '٢٨ مايو' },
  { name: 'Hassan (Gardener)', nameAr: 'حسن (البستاني)', salary: 2000, status: 'due', paidDate: 'Jun 5', paidDateAr: '٥ يونيو' },
  { name: 'Aisha (Cook)', nameAr: 'عائشة (الطاهية)', salary: 3000, status: 'due', paidDate: 'Jun 5', paidDateAr: '٥ يونيو' },
];

export default function PayrollScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const totalMonthly = STAFF.reduce((s, p) => s + p.salary, 0);
  const totalPaid = STAFF.filter(s => s.status === 'paid').reduce((s, p) => s + p.salary, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><PayrollLeafIcon size={20} /> {isAr ? 'الرواتب' : 'Payroll'}</span>
      </div>
      <div className="screen-body">
        {/* Summary card */}
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'إجمالي الرواتب الشهرية' : 'Monthly Total'}</p>
              <p style={{ color: c.brown, fontSize: 22, fontWeight: 700 }}>{totalMonthly.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: c.success, fontSize: 18, fontWeight: 700 }}>{totalPaid.toLocaleString()}</p>
              <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'مدفوع' : 'Paid'}</p>
            </div>
          </div>
        </motion.div>

        {/* Staff list */}
        {STAFF.map((s, i) => (
          <motion.div
            key={s.name}
            className="card"
            style={{ marginTop: 8, borderLeftWidth: 3, borderLeftColor: s.status === 'paid' ? c.success : c.yellow, borderLeftStyle: 'solid' }}
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? s.nameAr : s.name}</p>
                <p style={{ color: c.muted, fontSize: 12 }}>{s.salary.toLocaleString()} {isAr ? 'ر.س' : 'SAR'} · {isAr ? s.paidDateAr : s.paidDate}</p>
              </div>
              <span className={`badge ${s.status === 'paid' ? 'badge-approved' : 'badge-pending'}`}>
                {s.status === 'paid' ? <><CheckLeafIcon size={12} color={c.success} /> {isAr ? 'مدفوع' : 'Paid'}</> : <><PendingBudIcon size={12} /> {isAr ? 'مستحق' : 'Due'}</>}
              </span>
            </div>
            {s.status === 'due' && (
              <motion.button className="btn btn-primary btn-sm" style={{ marginTop: 8, width: '100%' }} whileTap={{ scale: 0.97 }}>
                {isAr ? 'الدفع الآن' : 'Pay Now'}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
