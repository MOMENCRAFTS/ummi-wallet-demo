/**
 * ReservoirScreen — Family savings detail
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, BankGardenIcon, SeedlingIcon, c } from '../icons/FloralIcons';

const TRANSACTIONS = [
  { id: '1', desc: 'Monthly contribution — Ahmed', descAr: 'مساهمة شهرية — أحمد', amount: 5000, type: 'in', date: 'May 28', dateAr: '٢٨ مايو' },
  { id: '2', desc: 'Monthly contribution — Mohammed', descAr: 'مساهمة شهرية — محمد', amount: 3000, type: 'in', date: 'May 28', dateAr: '٢٨ مايو' },
  { id: '3', desc: 'Mother allowance', descAr: 'مصروف الوالدة', amount: -5300, type: 'out', date: 'May 27', dateAr: '٢٧ مايو' },
  { id: '4', desc: 'Electricity bill', descAr: 'فاتورة الكهرباء', amount: -320, type: 'out', date: 'May 25', dateAr: '٢٥ مايو' },
  { id: '5', desc: 'Emergency fund top-up', descAr: 'إيداع في صندوق الطوارئ', amount: 1000, type: 'in', date: 'May 20', dateAr: '٢٠ مايو' },
];

const BALANCE = 18750;
const ALLOCATED = 12500;
const AVAILABLE = BALANCE - ALLOCATED;

export default function ReservoirScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><BankGardenIcon size={20} /> {isAr ? 'الخزنة' : 'Reservoir'}</span>
      </div>
      <div className="screen-body">
        {/* Balance card */}
        <motion.div className="card glass reservoir-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'رصيد الخزنة' : 'Total Balance'}</p>
          <p style={{ color: c.brown, fontSize: 28, fontWeight: 800 }}>{BALANCE.toLocaleString()} <span style={{ fontSize: 14, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span></p>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <div>
              <p style={{ color: c.yellow, fontSize: 14, fontWeight: 600 }}>{ALLOCATED.toLocaleString()}</p>
              <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'المخصّص' : 'Allocated'}</p>
            </div>
            <div>
              <p style={{ color: c.success, fontSize: 14, fontWeight: 600 }}>{AVAILABLE.toLocaleString()}</p>
              <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'المتاح' : 'Available'}</p>
            </div>
          </div>
          {/* Bar */}
          <div style={{ height: 6, background: c.divider, borderRadius: 3, marginTop: 12 }}>
            <div style={{ height: 6, background: `linear-gradient(90deg, ${c.mint}, ${c.yellow})`, borderRadius: 3, width: `${(ALLOCATED / BALANCE) * 100}%` }} />
          </div>
        </motion.div>

        {/* Transactions */}
        <h3 className="section-title" style={{ marginTop: 16 }}>{isAr ? 'آخر العمليات' : 'Recent Transactions'}</h3>
        {TRANSACTIONS.map((t, i) => (
          <motion.div
            key={t.id}
            className="card"
            style={{ marginBottom: 6 }}
            initial={{ opacity: 0, x: isAr ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SeedlingIcon size={16} color={t.type === 'in' ? c.success : c.peach} />
                <div>
                  <p style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? t.descAr : t.desc}</p>
                  <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? t.dateAr : t.date}</p>
                </div>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: t.type === 'in' ? c.success : c.emergency }}>
                {t.type === 'in' ? '+' : ''}{t.amount.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}

        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          {isAr ? 'إضافة رصيد' : 'Top Up'}
        </motion.button>
      </div>
    </div>
  );
}
