/**
 * BrotherSettlementScreen — Personal settlement view
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, BalanceLeavesIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const BREAKDOWN = [
  { item: 'Monthly Share', itemAr: 'الحصة الشهرية', amount: 2000, paid: 2000 },
  { item: 'Emergency Fund', itemAr: 'صندوق الطوارئ', amount: 500, paid: 500 },
  { item: 'Kitchen Project', itemAr: 'مشروع المطبخ', amount: 1000, paid: 800 },
];

export default function BrotherSettlementScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const totalExpected = BREAKDOWN.reduce((s, b) => s + b.amount, 0);
  const totalPaid = BREAKDOWN.reduce((s, b) => s + b.paid, 0);
  const remaining = totalExpected - totalPaid;

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><BalanceLeavesIcon size={20} /> {isAr ? 'تسويتي' : 'My Settlement'}</span></div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div><p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'المطلوب' : 'Expected'}</p><p style={{ fontSize: 20, fontWeight: 700, color: c.brown }}>{totalExpected.toLocaleString()}</p></div>
            <div><p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'المدفوع' : 'Paid'}</p><p style={{ fontSize: 20, fontWeight: 700, color: c.success }}>{totalPaid.toLocaleString()}</p></div>
            <div><p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'المتبقي' : 'Left'}</p><p style={{ fontSize: 20, fontWeight: 700, color: remaining > 0 ? c.emergency : c.success }}>{remaining.toLocaleString()}</p></div>
          </div>
        </motion.div>

        {BREAKDOWN.map((b, i) => {
          const pct = b.amount > 0 ? Math.round((b.paid / b.amount) * 100) : 0;
          return (
            <motion.div key={b.item} className="card" style={{ marginTop: 8 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? b.itemAr : b.item}</span>
                <span style={{ fontSize: 12, color: c.muted }}>{b.paid.toLocaleString()}/{b.amount.toLocaleString()}</span>
              </div>
              <div style={{ height: 4, background: c.divider, borderRadius: 2, marginTop: 6 }}>
                <div style={{ height: 4, background: pct >= 100 ? c.success : c.yellow, borderRadius: 2, width: `${pct}%` }} />
              </div>
              {pct >= 100 && <p style={{ fontSize: 11, color: c.success, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><CheckLeafIcon size={12} color={c.success} /> {isAr ? 'تمت التسوية' : 'Settled'}</p>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
