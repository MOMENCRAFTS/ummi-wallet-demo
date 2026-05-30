/**
 * BrotherContributionScreen — Direct payment form
 * IBAN display + amount input + proof upload (simulated) + submit
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal headers, Shami friendly text
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, BouquetIcon, MoneyLeafIcon,
  CheckLeafIcon, DocumentLeafIcon, c,
} from '../icons/FloralIcons';

const IBAN = {
  iban: 'SA1234 5678 9012 3456 7890',
  bank: 'Al Rajhi Bank', bankAr: 'بنك الراجحي',
  holder: 'Ahmed Family Trust', holderAr: 'صندوق عائلة أحمد',
};

export default function BrotherContributionScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [amount, setAmount] = useState('2000');
  const [proof, setProof] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (amount) setSubmitted(true);
  };

  return (
    <div className="screen brother-contribution-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BouquetIcon size={20} /> {isAr ? 'دفع مباشر' : 'Pay Direct'}
        </span>
      </div>

      <div className="screen-body">
        {!submitted ? (
          <>
            {/* IBAN Card */}
            <motion.div
              className="card glass flourish"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ padding: '16px' }}
            >
              <h3 className="section-title" style={{ marginBottom: 6 }}>{isAr ? 'حوّل إلى هذا الحساب' : 'Transfer to'}</h3>
              <span style={{ fontSize: 12, color: c.muted }}>
                {isAr ? `${IBAN.bankAr} • ${IBAN.holderAr}` : `${IBAN.bank} • ${IBAN.holder}`}
              </span>
              <div className="iban-box" style={{ marginTop: 10 }}>
                <span className="iban-number">{IBAN.iban}</span>
              </div>
              <button className="btn btn-glass btn-sm" style={{ marginTop: 10 }}>
                {isAr ? 'نسخ رقم الآيبان' : 'Copy IBAN'}
              </button>
            </motion.div>

            {/* Amount */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 20 }}
            >
              <label className="form-label">{isAr ? 'المبلغ' : 'Amount'}</label>
              <div className="amount-input-row">
                <MoneyLeafIcon size={22} />
                <input
                  className="input amount-input"
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <span className="amount-currency">{isAr ? 'ر.س' : 'SAR'}</span>
              </div>
            </motion.div>

            {/* Proof upload (simulated) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 20 }}
            >
              <label className="form-label">{isAr ? 'إثبات التحويل' : 'Transfer Proof'}</label>
              <button
                className={`btn ${proof ? 'btn-primary' : 'btn-outline'} btn-full`}
                onClick={() => setProof(!proof)}
                style={{ justifyContent: 'center' }}
              >
                {proof
                  ? <><CheckLeafIcon size={18} color="#fff" /> {isAr ? 'تم رفع الإثبات' : 'Proof Uploaded'}</>
                  : <><DocumentLeafIcon size={18} /> {isAr ? 'رفع الإيصال' : 'Upload Receipt'}</>
                }
              </button>
            </motion.div>

            {/* Submit */}
            <motion.button
              className="btn btn-primary btn-lg btn-full glow-mint"
              onClick={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 24 }}
              whileTap={{ scale: 0.98 }}
            >
              <BouquetIcon size={20} /> {isAr ? 'تأكيد الدفع' : 'Confirm Payment'}
            </motion.button>
          </>
        ) : (
          <motion.div
            className="card glass flourish"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ textAlign: 'center', padding: '40px 24px', marginTop: 40 }}
          >
            <CheckLeafIcon size={48} color={c.success} />
            <h2 style={{ marginTop: 16, color: c.brown }}>
              {isAr ? 'تم تسجيل الدفعة!' : 'Payment Recorded!'}
            </h2>
            <p style={{ color: c.muted, marginTop: 8, fontSize: 14 }}>
              {isAr
                ? `${Number(amount).toLocaleString()} ر.س — جزاك الله خير`
                : `${Number(amount).toLocaleString()} SAR — recorded`
              }
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
