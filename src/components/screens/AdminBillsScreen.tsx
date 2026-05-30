/**
 * AdminBillsScreen — Admin-perspective bill management
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, LeafBillIcon, CheckLeafIcon, PendingBudIcon, c } from '../icons/FloralIcons';

const BILLS = [
  { id: '1', name: 'Electricity (SEC)', nameAr: 'الكهرباء (الشركة السعودية للكهرباء)', amount: 320, status: 'overdue', due: 'Jun 1', dueAr: '١ يونيو', category: 'utilities' },
  { id: '2', name: 'Water (NWC)', nameAr: 'المياه (المياه الوطنية)', amount: 85, status: 'scheduled', due: 'Jun 10', dueAr: '١٠ يونيو', category: 'utilities' },
  { id: '3', name: 'Internet (STC)', nameAr: 'الإنترنت (STC)', amount: 350, status: 'scheduled', due: 'Jun 12', dueAr: '١٢ يونيو', category: 'telecom' },
  { id: '4', name: 'Mobile Lines ×3', nameAr: 'خطوط الجوال ×٣', amount: 450, status: 'paid', due: 'May 25', dueAr: '٢٥ مايو', category: 'telecom' },
  { id: '5', name: 'Home Insurance', nameAr: 'تأمين المنزل', amount: 1200, status: 'scheduled', due: 'Jul 1', dueAr: '١ يوليو', category: 'insurance' },
];

export default function AdminBillsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [paid, setPaid] = useState<Set<string>>(new Set(BILLS.filter(b => b.status === 'paid').map(b => b.id)));
  const total = BILLS.reduce((s, b) => s + b.amount, 0);
  const paidTotal = BILLS.filter(b => paid.has(b.id)).reduce((s, b) => s + b.amount, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><LeafBillIcon size={20} /> {isAr ? 'الفواتير' : 'Bills'}</span>
      </div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'إجمالي الفواتير' : 'Total Bills'}</p>
              <p style={{ color: c.brown, fontSize: 20, fontWeight: 700 }}>{total.toLocaleString()} <span style={{ fontSize: 12, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: c.success, fontSize: 16, fontWeight: 700 }}>{paidTotal.toLocaleString()}</p>
              <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'مسدّد' : 'Paid'}</p>
            </div>
          </div>
          <div style={{ height: 4, background: c.divider, borderRadius: 2, marginTop: 10 }}>
            <div style={{ height: 4, background: c.success, borderRadius: 2, width: `${(paidTotal / total) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </motion.div>

        {BILLS.map((b, i) => (
          <motion.div
            key={b.id}
            className="card"
            style={{ marginTop: 8, opacity: paid.has(b.id) ? 0.6 : 1, borderLeftWidth: 3, borderLeftStyle: 'solid', borderLeftColor: b.status === 'overdue' ? c.emergency : paid.has(b.id) ? c.success : c.yellow }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: paid.has(b.id) ? 0.6 : 1, y: 0 }}
            transition={{ delay: 0.06 + i * 0.04 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? b.nameAr : b.name}</p>
                <p style={{ color: c.muted, fontSize: 11 }}>{b.amount.toLocaleString()} {isAr ? 'ر.س' : 'SAR'} · {isAr ? b.dueAr : b.due}</p>
              </div>
              {paid.has(b.id) ? (
                <span className="badge badge-approved"><CheckLeafIcon size={12} color={c.success} /> {isAr ? 'مسدّد' : 'Paid'}</span>
              ) : (
                <motion.button className="btn btn-primary btn-sm" whileTap={{ scale: 0.95 }} onClick={() => setPaid(prev => new Set([...prev, b.id]))}>
                  {isAr ? 'سداد' : 'Pay'}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
