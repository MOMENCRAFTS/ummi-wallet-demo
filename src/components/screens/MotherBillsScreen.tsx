/**
 * MotherBillsScreen — Upcoming and paid bills
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal headers, Shami status text
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, LeafBillIcon, CheckLeafIcon, PendingBudIcon, c,
} from '../icons/FloralIcons';

const BILLS = [
  { id: 1, name: 'Electricity', nameAr: 'كهرباء', amount: 280, due: 'Jun 5', dueAr: '٥ يونيو', status: 'upcoming' as const, color: c.yellow },
  { id: 2, name: 'Water', nameAr: 'ماء', amount: 95, due: 'Jun 8', dueAr: '٨ يونيو', status: 'upcoming' as const, color: c.blue },
  { id: 3, name: 'Internet', nameAr: 'إنترنت', amount: 250, due: 'Jun 10', dueAr: '١٠ يونيو', status: 'upcoming' as const, color: c.mint },
  { id: 4, name: 'Gas', nameAr: 'غاز', amount: 120, due: 'Jun 15', dueAr: '١٥ يونيو', status: 'upcoming' as const, color: c.peach },
  { id: 5, name: 'Electricity', nameAr: 'كهرباء', amount: 265, due: 'May 5', dueAr: '٥ مايو', status: 'paid' as const, color: c.yellow },
  { id: 6, name: 'Water', nameAr: 'ماء', amount: 90, due: 'May 8', dueAr: '٨ مايو', status: 'paid' as const, color: c.blue },
  { id: 7, name: 'Internet', nameAr: 'إنترنت', amount: 250, due: 'May 10', dueAr: '١٠ مايو', status: 'paid' as const, color: c.mint },
];

const statusBadge = {
  upcoming: { cls: 'badge-pending', en: 'Upcoming', ar: 'قادمة' },
  paid: { cls: 'badge-approved', en: 'Paid', ar: 'مدفوعة' },
  overdue: { cls: 'badge-overdue', en: 'Overdue', ar: 'متأخّرة' },
};

export default function MotherBillsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  const upcoming = BILLS.filter(b => b.status === 'upcoming');
  const paid = BILLS.filter(b => b.status === 'paid');
  const totalUpcoming = upcoming.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="screen mother-bills-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LeafBillIcon size={20} /> {isAr ? 'الفواتير' : 'Bills'}
        </span>
      </div>

      <div className="screen-body">
        {/* Total upcoming */}
        <motion.div
          className="card glass flourish"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ textAlign: 'center', padding: '20px 16px' }}
        >
          <p style={{ fontSize: 13, color: c.muted }}>{isAr ? 'إجمالي الفواتير القادمة' : 'Total Upcoming'}</p>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: c.brown, margin: '4px 0' }}>
            {totalUpcoming.toLocaleString()} <span style={{ fontSize: 14, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span>
          </h2>
          <p style={{ fontSize: 12, color: c.muted }}>
            {isAr ? `${upcoming.length} فواتير هالشهر` : `${upcoming.length} bills this month`}
          </p>
        </motion.div>

        {/* Upcoming */}
        <h3 className="section-heading" style={{ marginTop: 20 }}>
          {isAr ? 'القادمة' : 'Upcoming'}
        </h3>
        {upcoming.map((bill, i) => (
          <motion.div
            key={bill.id}
            className="card request-card"
            initial={{ opacity: 0, x: isAr ? 15 : -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ borderLeftWidth: 3, borderLeftColor: bill.color, borderLeftStyle: 'solid' }}
          >
            <div className="request-row">
              <div>
                <span className="request-amount">
                  {bill.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span>
                </span>
                <span className="request-category">
                  {isAr ? bill.nameAr : bill.name} • {isAr ? bill.dueAr : bill.due}
                </span>
              </div>
              <span className={`badge ${statusBadge[bill.status].cls}`}>
                <PendingBudIcon size={12} /> {isAr ? statusBadge[bill.status].ar : statusBadge[bill.status].en}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Paid */}
        <h3 className="section-heading" style={{ marginTop: 20 }}>
          {isAr ? 'مدفوعة' : 'Paid'}
        </h3>
        {paid.map((bill, i) => (
          <motion.div
            key={bill.id}
            className="card request-card"
            initial={{ opacity: 0, x: isAr ? 15 : -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ opacity: 0.7 }}
          >
            <div className="request-row">
              <div>
                <span className="request-amount">
                  {bill.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span>
                </span>
                <span className="request-category">
                  {isAr ? bill.nameAr : bill.name} • {isAr ? bill.dueAr : bill.due}
                </span>
              </div>
              <span className={`badge ${statusBadge[bill.status].cls}`}>
                <CheckLeafIcon size={12} color={c.success} /> {isAr ? statusBadge[bill.status].ar : statusBadge[bill.status].en}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
