/**
 * BrotherHistoryScreen — Payment history
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, NewsScrollIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const HISTORY = [
  { date: 'May 28', dateAr: '٢٨ مايو', desc: 'Monthly share', descAr: 'الحصة الشهرية', amount: 2000, proof: true },
  { date: 'May 15', dateAr: '١٥ مايو', desc: 'Emergency contribution', descAr: 'مساهمة طوارئ', amount: 500, proof: true },
  { date: 'Apr 28', dateAr: '٢٨ أبريل', desc: 'Monthly share', descAr: 'الحصة الشهرية', amount: 2000, proof: true },
  { date: 'Apr 10', dateAr: '١٠ أبريل', desc: 'Kitchen project', descAr: 'مشروع المطبخ', amount: 1000, proof: false },
  { date: 'Mar 28', dateAr: '٢٨ مارس', desc: 'Monthly share', descAr: 'الحصة الشهرية', amount: 2000, proof: true },
];

export default function BrotherHistoryScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const total = HISTORY.reduce((s, h) => s + h.amount, 0);
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><NewsScrollIcon size={20} /> {isAr ? 'سجل المدفوعات' : 'Payment History'}</span></div>
      <div className="screen-body">
        <motion.div className="card glass" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'إجمالي المدفوع' : 'Total Paid'}</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: c.brown }}>{total.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
        </motion.div>
        {HISTORY.map((h, i) => (
          <motion.div key={i} className="card" style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, x: isAr ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
            <div>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? h.descAr : h.desc}</p>
              <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? h.dateAr : h.date}{h.proof ? ` · ${isAr ? 'إثبات مرفق' : 'Proof attached'}` : ''}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 700, color: c.success, fontSize: 14 }}>{h.amount.toLocaleString()}</span>
              {h.proof && <CheckLeafIcon size={14} color={c.success} />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
