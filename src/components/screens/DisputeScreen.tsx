/**
 * DisputeScreen — Family dispute resolution
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, BalanceLeavesIcon, PersonFloralIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const DISPUTES = [
  {
    id: 'd1', status: 'open' as const,
    title: 'AC Repair Cost Split', titleAr: 'تقسيم تكلفة صيانة المكيّف',
    parties: ['Ahmed', 'Khalid'], partiesAr: ['أحمد', 'خالد'],
    amount: 3200, reason: 'Khalid believes his share should be lower since AC is in Ahmed\'s section',
    reasonAr: 'خالد يرى أن حصته يجب أن تكون أقل لأن المكيّف في جناح أحمد',
    date: 'May 28', dateAr: '٢٨ مايو',
  },
  {
    id: 'd2', status: 'resolved' as const,
    title: 'Grocery Budget Overflow', titleAr: 'تجاوز ميزانية البقالة',
    parties: ['Mohammed', 'Ahmed'], partiesAr: ['محمد', 'أحمد'],
    amount: 800, reason: 'Resolved: Added extra 200 SAR to grocery pocket from emergency fund',
    reasonAr: 'تم الحل: أُضيف ٢٠٠ ر.س من صندوق الطوارئ',
    date: 'May 15', dateAr: '١٥ مايو',
  },
];

const statusCfg = {
  open: { label: 'Open', labelAr: 'مفتوح', color: '#FF9800' },
  mediation: { label: 'In Mediation', labelAr: 'وساطة', color: '#2196F3' },
  resolved: { label: 'Resolved', labelAr: 'محلول', color: '#4CAF50' },
};

export default function DisputeScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const filtered = filter === 'all' ? DISPUTES : DISPUTES.filter(d => d.status === filter);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><BalanceLeavesIcon size={20} /> {isAr ? 'حل النزاعات' : 'Dispute Resolution'}</span>
      </div>
      <div className="screen-body">
        {/* Filter chips */}
        <div className="filter-row" style={{ marginBottom: 14 }}>
          {(['all', 'open', 'resolved'] as const).map(f => (
            <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? (isAr ? 'الكل' : 'All') : isAr ? statusCfg[f].labelAr : statusCfg[f].label}
            </button>
          ))}
        </div>

        {filtered.map((d, i) => {
          const st = statusCfg[d.status];
          return (
            <motion.div key={d.id} className="card" style={{ marginBottom: 12, padding: 14, borderLeft: `3px solid ${st.color}` }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.brown }}>{isAr ? d.titleAr : d.title}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: st.color, background: st.color + '18', padding: '2px 8px', borderRadius: 10 }}>
                  {isAr ? st.labelAr : st.label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                {(isAr ? d.partiesAr : d.parties).map(p => (
                  <span key={p} style={{ fontSize: 11, color: c.muted, background: c.peachLight, padding: '2px 8px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <PersonFloralIcon size={10} /> {p}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.6, marginBottom: 8 }}>{isAr ? d.reasonAr : d.reason}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: `1px solid ${c.divider}` }}>
                <span style={{ fontSize: 11, color: c.muted }}>{isAr ? d.dateAr : d.date}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.brown }}>{d.amount.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</span>
              </div>
              {d.status === 'open' && (
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>{isAr ? 'اقتراح حل' : 'Propose Solution'}</button>
                  <button className="btn btn-glass btn-sm" style={{ flex: 1 }}>{isAr ? 'تصعيد' : 'Escalate'}</button>
                </div>
              )}
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: c.muted }}>
            <CheckLeafIcon size={32} color={c.success} />
            <p style={{ marginTop: 8, fontSize: 13 }}>{isAr ? 'لا توجد نزاعات' : 'No disputes'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
