/**
 * MotherAuditScreen — Mother reviews & annotates expenses
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, HeartLeafIcon, CheckLeafIcon, LeafBillIcon, PayrollLeafIcon, TulipIcon, LightbulbPetalIcon, c } from '../icons/FloralIcons';

type AuditTab = 'bills' | 'payrolls' | 'projects';

const BILLS = [
  { id: 'b1', name: 'Electricity — May', nameAr: 'الكهرباء — مايو', amount: 320, status: 'paid', statusAr: 'مدفوعة' },
  { id: 'b2', name: 'Water — May', nameAr: 'المياه — مايو', amount: 85, status: 'paid', statusAr: 'مدفوعة' },
  { id: 'b3', name: 'Internet — May', nameAr: 'الإنترنت — مايو', amount: 299, status: 'pending', statusAr: 'معلّقة' },
];
const PAYROLLS = [
  { id: 'p1', name: 'Driver — Rajan', nameAr: 'السائق — راجان', amount: 2500, status: 'paid', statusAr: 'مدفوع' },
  { id: 'p2', name: 'Housekeeper — Maria', nameAr: 'الخادمة — ماريا', amount: 1800, status: 'paid', statusAr: 'مدفوع' },
];
const PROJECTS = [
  { id: 'pr1', name: 'Kitchen Renovation', nameAr: 'تجديد المطبخ', amount: 15000, status: 'in_progress', statusAr: 'جاري' },
];

export default function MotherAuditScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [tab, setTab] = useState<AuditTab>('bills');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [wishTitle, setWishTitle] = useState('');

  const items = tab === 'bills' ? BILLS : tab === 'payrolls' ? PAYROLLS : PROJECTS;
  const tabConfig = [
    { key: 'bills' as AuditTab, label: 'Bills', labelAr: 'الفواتير', Icon: LeafBillIcon },
    { key: 'payrolls' as AuditTab, label: 'Payroll', labelAr: 'الرواتب', Icon: PayrollLeafIcon },
    { key: 'projects' as AuditTab, label: 'Projects', labelAr: 'المشاريع', Icon: TulipIcon },
  ];

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><HeartLeafIcon size={20} /> {isAr ? 'مراجعة المصاريف' : 'Expense Review'}</span>
      </div>
      <div className="screen-body">
        {/* Tabs */}
        <div className="filter-row" style={{ marginBottom: 14 }}>
          {tabConfig.map(t => (
            <button key={t.key} className={`filter-chip ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              <t.Icon size={14} /> {isAr ? t.labelAr : t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        {items.map((item, i) => (
          <motion.div key={item.id} className="card" style={{ marginBottom: 10, padding: 14 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.brown }}>{isAr ? item.nameAr : item.name}</div>
                <div style={{ fontSize: 12, color: c.mint, fontWeight: 600, marginTop: 2 }}>{item.amount.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className="btn btn-sm"
                  style={{ background: approved.has(item.id) ? c.success + '20' : 'transparent', border: `1px solid ${c.success}40`, borderRadius: 8, padding: '4px 8px' }}
                  onClick={() => setApproved(prev => { const s = new Set(prev); s.has(item.id) ? s.delete(item.id) : s.add(item.id); return s; })}
                >
                  <CheckLeafIcon size={14} color={approved.has(item.id) ? c.success : c.muted} />
                </button>
                <button
                  className="btn btn-sm"
                  style={{ background: flagged.has(item.id) ? c.emergency + '20' : 'transparent', border: `1px solid ${c.emergency}40`, borderRadius: 8, padding: '4px 8px' }}
                  onClick={() => setFlagged(prev => { const s = new Set(prev); s.has(item.id) ? s.delete(item.id) : s.add(item.id); return s; })}
                >
                  ⚑
                </button>
              </div>
            </div>
            {/* Note input */}
            <input
              type="text"
              className="input"
              placeholder={isAr ? 'أضيفي ملاحظة...' : 'Add a note...'}
              value={notes[item.id] || ''}
              onChange={e => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
              style={{ marginTop: 8, fontSize: 12 }}
            />
          </motion.div>
        ))}

        {/* Wishes Section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="section-title" style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <LightbulbPetalIcon size={18} /> {isAr ? 'أتمنّى...' : 'I wish...'}
          </h3>
          <div className="card" style={{ padding: 14 }}>
            <input
              type="text"
              className="input"
              placeholder={isAr ? 'ما الذي تتمنّينه يا أمي؟' : 'What do you wish for, Mom?'}
              value={wishTitle}
              onChange={e => setWishTitle(e.target.value)}
              style={{ fontSize: 13 }}
            />
            <button className="btn btn-primary btn-sm btn-full" style={{ marginTop: 10 }} onClick={() => { if (wishTitle.trim()) { setWishTitle(''); } }}>
              {isAr ? 'أرسلي الأمنية 🌸' : 'Send Wish 🌸'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
