/**
 * MotherRequestScreen — Premium redesign
 * Large hero amount input, 2×3 category card grid,
 * collapsible note field, warm success celebration
 * Zero emoji — SVG FloralIcons only
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { useFamilyState } from '../../familyState';
import {
  ArrowLeafIcon, HandPetalIcon, MoneyLeafIcon,
  MedicalHerbIcon, SunflowerHomeIcon, LeafBillIcon,
  WrenchVineIcon, CheckLeafIcon, HeartLeafIcon, c,
} from '../icons/FloralIcons';

/* ─── Category data ─── */
const CATEGORIES = [
  {
    key: 'groceries',
    label: 'Groceries',       labelAr: 'بقالة',
    hint: 'Food & household', hintAr: 'طعام ومستلزمات',
    Icon: SunflowerHomeIcon,
    bg: 'rgba(143,207,179,0.12)', border: 'rgba(143,207,179,0.4)', accent: '#5ba88e',
  },
  {
    key: 'pharmacy',
    label: 'Pharmacy',        labelAr: 'صيدلية',
    hint: 'Medicine & care',  hintAr: 'دواء ورعاية',
    Icon: MedicalHerbIcon,
    bg: 'rgba(245,167,130,0.12)', border: 'rgba(245,167,130,0.4)', accent: '#d4714a',
  },
  {
    key: 'medical',
    label: 'Medical',         labelAr: 'طبي',
    hint: 'Doctor & clinic',  hintAr: 'طبيب وعيادة',
    Icon: MedicalHerbIcon,
    bg: 'rgba(220,80,80,0.08)', border: 'rgba(220,80,80,0.3)', accent: '#c04040',
  },
  {
    key: 'bills',
    label: 'Bills',           labelAr: 'فواتير',
    hint: 'Utilities & fees', hintAr: 'مرافق ورسوم',
    Icon: LeafBillIcon,
    bg: 'rgba(245,203,100,0.12)', border: 'rgba(245,203,100,0.4)', accent: '#b8900c',
  },
  {
    key: 'maintenance',
    label: 'Maintenance',     labelAr: 'صيانة',
    hint: 'Home & repairs',   hintAr: 'منزل وإصلاح',
    Icon: WrenchVineIcon,
    bg: 'rgba(180,160,130,0.12)', border: 'rgba(180,160,130,0.35)', accent: '#8a7050',
  },
  {
    key: 'other',
    label: 'Other',           labelAr: 'أخرى',
    hint: 'Anything else',    hintAr: 'أي شيء آخر',
    Icon: HandPetalIcon,
    bg: 'rgba(130,160,200,0.12)', border: 'rgba(130,160,200,0.35)', accent: '#4a6ea8',
  },
];

/* ─── Quick amount presets ─── */
const PRESETS = [100, 200, 500, 1000];

export default function MotherRequestScreen() {
  const { goBack, navigate, lang } = useNavigation();
  const { submitRequest } = useFamilyState();
  const isAr = lang === 'ar';

  const [category, setCategory] = useState('groceries');
  const [amount, setAmount]     = useState('');
  const [note, setNote]         = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeCat = CATEGORIES.find(c => c.key === category)!;
  const amountNum = Number(amount) || 0;
  const canSubmit = amountNum > 0;

  const handlePreset = (v: number) => setAmount(String(v));

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitRequest(amountNum, activeCat.label, activeCat.labelAr);
    setSubmitted(true);
    setTimeout(() => navigate('pending', { pendingType: 'mother-request-pending' }), 2000);
  };

  /* ─── Success state ─── */
  if (submitted) {
    return (
      <div className="screen mother-request-screen" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="screen-header">
          <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
          <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <HandPetalIcon size={20} /> {isAr ? 'طلب مبلغ' : 'Request Money'}
          </span>
        </div>
        <div className="screen-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            className="mr-success-card"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 280, damping: 14 }}
              className="mr-success-icon"
            >
              <CheckLeafIcon size={40} color={c.success} />
            </motion.div>
            <motion.h2
              className="mr-success-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {isAr ? 'تم إرسال الطلب!' : 'Request Sent!'}
            </motion.h2>
            <motion.p
              className="mr-success-amount"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {amountNum.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}
            </motion.p>
            <motion.p
              className="mr-success-cat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isAr ? activeCat.labelAr : activeCat.label}
            </motion.p>
            <motion.p
              className="mr-success-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isAr ? 'سيتم إشعار الابن المسؤول — الله يسهّل' : 'The responsible son will be notified'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Main form ─── */
  return (
    <div className="screen mother-request-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HandPetalIcon size={20} /> {isAr ? 'طلب مبلغ' : 'Request Money'}
        </span>
      </div>

      <div className="screen-body mr-body">

        {/* ── Hero Amount Card ── */}
        <motion.div
          className="mr-amount-card"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <p className="mr-amount-label">{isAr ? 'كم تحتاجين؟' : 'How much do you need?'}</p>

          <div className="mr-amount-row">
            <MoneyLeafIcon size={22} color={c.mint} />
            <input
              className="mr-amount-input"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              dir="ltr"
            />
            <span className="mr-amount-currency">{isAr ? 'ر.س' : 'SAR'}</span>
          </div>

          {/* Quick presets */}
          <div className="mr-presets">
            {PRESETS.map(v => (
              <button
                key={v}
                className={`mr-preset-btn ${amountNum === v ? 'active' : ''}`}
                onClick={() => handlePreset(v)}
              >
                {v.toLocaleString()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Category Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07, type: 'spring', stiffness: 260, damping: 22 }}
        >
          <p className="mr-section-label">{isAr ? 'الفئة' : 'Category'}</p>
          <div className="mr-cat-grid">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.key}
                className={`mr-cat-card ${category === cat.key ? 'active' : ''}`}
                style={category === cat.key
                  ? { background: cat.bg, borderColor: cat.border }
                  : {}
                }
                onClick={() => setCategory(cat.key)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 + i * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-cat-icon" style={category === cat.key ? { color: cat.accent } : {}}>
                  <cat.Icon size={20} />
                </span>
                <span className="mr-cat-name" style={category === cat.key ? { color: cat.accent } : {}}>
                  {isAr ? cat.labelAr : cat.label}
                </span>
                <span className="mr-cat-hint">
                  {isAr ? cat.hintAr : cat.hint}
                </span>
                {category === cat.key && (
                  <motion.div
                    className="mr-cat-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ color: cat.accent }}
                  >
                    <CheckLeafIcon size={12} color={cat.accent} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Collapsible Note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
        >
          <button
            className="mr-note-toggle"
            onClick={() => setNoteOpen(o => !o)}
          >
            <HeartLeafIcon size={16} />
            <span>{isAr ? 'إضافة ملاحظة' : 'Add a note'}</span>
            <motion.span
              className="mr-note-chevron"
              animate={{ rotate: noteOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {noteOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <textarea
                  className="mr-note-textarea"
                  placeholder={isAr ? 'اكتبي ملاحظة للابن المسؤول...' : 'Write a note for the responsible son...'}
                  rows={3}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  dir={isAr ? 'rtl' : 'ltr'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Submit ── */}
        <motion.button
          className={`mr-submit-btn ${canSubmit ? 'ready' : ''}`}
          onClick={handleSubmit}
          disabled={!canSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, type: 'spring', stiffness: 260, damping: 20 }}
          whileTap={canSubmit ? { scale: 0.97 } : {}}
        >
          <HandPetalIcon size={20} />
          <span>
            {canSubmit
              ? isAr
                ? `إرسال الطلب — ${amountNum.toLocaleString()} ر.س`
                : `Submit Request — ${amountNum.toLocaleString()} SAR`
              : isAr ? 'أدخلي المبلغ أولاً' : 'Enter an amount first'
            }
          </span>
        </motion.button>

      </div>
    </div>
  );
}
