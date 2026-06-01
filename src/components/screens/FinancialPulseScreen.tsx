/**
 * FinancialPulseScreen — Monthly financial health dashboard
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, ChartBloomIcon, MoneyLeafIcon, c } from '../icons/FloralIcons';

const MONTHLY_DATA = [
  { month: 'Jan', monthAr: 'يناير', income: 18000, spent: 15200 },
  { month: 'Feb', monthAr: 'فبراير', income: 18000, spent: 14800 },
  { month: 'Mar', monthAr: 'مارس', income: 18000, spent: 16500 },
  { month: 'Apr', monthAr: 'أبريل', income: 18000, spent: 13900 },
  { month: 'May', monthAr: 'مايو', income: 18000, spent: 15600 },
  { month: 'Jun', monthAr: 'يونيو', income: 18000, spent: 12400 },
];

const METRICS = [
  { key: 'burn', label: 'Burn Rate', labelAr: 'معدل الإنفاق', value: '86%', color: '#FF9800' },
  { key: 'runway', label: 'Runway', labelAr: 'المدة المتبقية', value: '1.2 mo', valueAr: '١.٢ شهر', color: c.mint },
  { key: 'savings', label: 'Savings Rate', labelAr: 'معدل الادخار', value: '14%', color: c.success },
  { key: 'avg', label: 'Avg. Monthly', labelAr: 'المتوسط الشهري', value: '14,733', valueAr: '١٤٬٧٣٣', color: c.brown },
];

export default function FinancialPulseScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const maxSpent = Math.max(...MONTHLY_DATA.map(d => d.spent));
  const [newBalance, setNewBalance] = useState('');

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><ChartBloomIcon size={20} /> {isAr ? 'النبض المالي' : 'Financial Pulse'}</span>
      </div>
      <div className="screen-body">
        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
          {METRICS.map((m, i) => (
            <motion.div key={m.key} className="card" style={{ padding: 12, textAlign: 'center' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div style={{ fontSize: 10, color: c.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{isAr ? m.labelAr : m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: m.color, marginTop: 4 }}>{isAr && (m as any).valueAr ? (m as any).valueAr : m.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart */}
        <motion.div className="card" style={{ padding: 16 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="section-title" style={{ marginBottom: 14 }}>{isAr ? 'الإنفاق الشهري' : 'Monthly Spending'}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {MONTHLY_DATA.map((d, i) => {
              const pct = (d.spent / maxSpent) * 100;
              const overBudget = d.spent > d.income * 0.85;
              return (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div
                    style={{
                      width: '100%', borderRadius: '6px 6px 0 0',
                      background: overBudget ? `linear-gradient(to top, #FF9800, #FF980040)` : `linear-gradient(to top, ${c.mint}, ${c.mint}40)`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 100, damping: 15 }}
                  />
                  <span style={{ fontSize: 9, color: c.muted, marginTop: 4 }}>{isAr ? d.monthAr.slice(0, 3) : d.month}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, justifyContent: 'center' }}>
            <span style={{ fontSize: 10, color: c.mint, display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: c.mint, display: 'inline-block' }} /> {isAr ? 'ضمن الميزانية' : 'On Budget'}
            </span>
            <span style={{ fontSize: 10, color: '#FF9800', display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: '#FF9800', display: 'inline-block' }} /> {isAr ? 'تجاوز' : 'Over Budget'}
            </span>
          </div>
        </motion.div>

        {/* Balance Update */}
        <motion.div className="card" style={{ padding: 16, marginTop: 12 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <label style={{ fontSize: 12, color: c.muted, display: 'block', marginBottom: 6 }}>{isAr ? 'تحديث الرصيد' : 'Update Balance'}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" className="input" style={{ flex: 1 }} placeholder="0" value={newBalance} onChange={e => setNewBalance(e.target.value)} />
            <button className="btn btn-primary btn-sm" onClick={() => setNewBalance('')}>
              <MoneyLeafIcon size={14} color="#fff" /> {isAr ? 'تحديث' : 'Update'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
