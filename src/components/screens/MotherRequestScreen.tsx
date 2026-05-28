/**
 * MotherRequestScreen — Money request form
 * Category chips + amount input + notes + submit
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal headers, Shami friendly text
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, HandPetalIcon, MoneyLeafIcon,
  MedicalHerbIcon, SunflowerHomeIcon, LeafBillIcon,
  WrenchVineIcon, CheckLeafIcon, c,
} from '../icons/FloralIcons';

const CATEGORIES = [
  { key: 'groceries', label: 'Groceries', labelAr: 'بقالة', Icon: SunflowerHomeIcon, color: c.mint },
  { key: 'pharmacy', label: 'Pharmacy', labelAr: 'صيدلية', Icon: MedicalHerbIcon, color: c.peach },
  { key: 'medical', label: 'Medical', labelAr: 'طبي', Icon: MedicalHerbIcon, color: c.emergency },
  { key: 'bills', label: 'Bills', labelAr: 'فواتير', Icon: LeafBillIcon, color: c.yellow },
  { key: 'maintenance', label: 'Maintenance', labelAr: 'صيانة', Icon: WrenchVineIcon, color: c.muted },
  { key: 'other', label: 'Other', labelAr: 'أخرى', Icon: HandPetalIcon, color: c.blue },
];

export default function MotherRequestScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [category, setCategory] = useState('groceries');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (amount) setSubmitted(true);
  };

  return (
    <div className="screen mother-request-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HandPetalIcon size={20} /> {isAr ? 'طلب مبلغ' : 'Request Money'}
        </span>
      </div>

      <div className="screen-body">
        {!submitted ? (
          <>
            {/* Amount */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <label className="form-label">{isAr ? 'كم تحتاجين؟' : 'How much do you need?'}</label>
              <div className="amount-input-row">
                <MoneyLeafIcon size={22} />
                <input
                  className="input amount-input"
                  type="number"
                  placeholder={isAr ? '0' : '0'}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <span className="amount-currency">{isAr ? 'ر.س' : 'SAR'}</span>
              </div>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 20 }}
            >
              <label className="form-label">{isAr ? 'نوع الطلب' : 'Category'}</label>
              <div className="chip-row" style={{ flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    className={`chip ${category === cat.key ? 'active' : ''}`}
                    onClick={() => setCategory(cat.key)}
                    style={category === cat.key ? { borderColor: cat.color } : {}}
                  >
                    <cat.Icon size={16} /> {isAr ? cat.labelAr : cat.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 20 }}
            >
              <label className="form-label">{isAr ? 'ملاحظة (اختياري)' : 'Note (optional)'}</label>
              <textarea
                className="sos-textarea"
                placeholder={isAr ? 'اكتبي ملاحظة إذا تبين...' : 'Add a note if needed...'}
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              className="btn btn-primary btn-lg btn-full"
              onClick={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 24 }}
              whileTap={{ scale: 0.98 }}
            >
              <HandPetalIcon size={20} /> {isAr ? 'إرسال الطلب' : 'Submit Request'}
            </motion.button>
          </>
        ) : (
          /* Success state */
          <motion.div
            className="card glass flourish"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ textAlign: 'center', padding: '40px 24px', marginTop: 40 }}
          >
            <CheckLeafIcon size={48} color={c.success} />
            <h2 style={{ marginTop: 16, color: c.brown }}>
              {isAr ? 'تم إرسال الطلب!' : 'Request Sent!'}
            </h2>
            <p style={{ color: c.muted, marginTop: 8, fontSize: 14 }}>
              {isAr
                ? `${Number(amount).toLocaleString()} ر.س — ${CATEGORIES.find(c => c.key === category)?.labelAr || ''}`
                : `${Number(amount).toLocaleString()} SAR — ${CATEGORIES.find(c => c.key === category)?.label || ''}`
              }
            </p>
            <p style={{ color: c.muted, marginTop: 4, fontSize: 13 }}>
              {isAr ? 'بيوصل إشعار للمسؤول — الله يسهّل' : 'The admin will be notified'}
            </p>
            <button className="btn btn-glass btn-md" onClick={goBack} style={{ marginTop: 20 }}>
              {isAr ? 'رجوع' : 'Go Back'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
