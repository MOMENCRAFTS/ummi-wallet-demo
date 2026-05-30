/**
 * BrotherPayDirectScreen — Direct payment
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, MoneyLeafIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const POCKETS = ['Mother Personal', 'Groceries', 'Medical', 'Utilities', 'Emergency'];
const POCKETS_AR = ['مصروف الوالدة', 'البقالة', 'الأدوية', 'الفواتير', 'الطوارئ'];

export default function BrotherPayDirectScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [amount, setAmount] = useState('');
  const [pocket, setPocket] = useState(0);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="screen-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <CheckLeafIcon size={48} color={c.success} />
          </motion.div>
          <h2 style={{ color: c.brown, marginTop: 16 }}>{isAr ? 'تم إرسال الدفعة — جزاك الله خيرًا' : 'Payment Sent!'}</h2>
          <motion.button className="btn btn-glass btn-md" style={{ marginTop: 20 }} onClick={goBack}>{isAr ? 'رجوع' : 'Go Back'}</motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><MoneyLeafIcon size={20} /> {isAr ? 'دفع مباشر' : 'Pay Direct'}</span></div>
      <div className="screen-body">
        <p style={{ color: c.muted, fontSize: 13, marginBottom: 12 }}>{isAr ? 'اختر الجيب وأدخل المبلغ' : 'Select pocket and enter amount'}</p>
        <div className="filter-chips">
          {POCKETS.map((p, i) => (
            <button key={p} className={`chip ${pocket === i ? 'chip-active' : ''}`} onClick={() => setPocket(i)}>
              {isAr ? POCKETS_AR[i] : p}
            </button>
          ))}
        </div>
        <input type="number" placeholder={isAr ? 'المبلغ بالريال السعودي' : 'Amount in SAR'} value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${c.divider}`, fontSize: 18, fontWeight: 700, color: c.brown, textAlign: 'center', marginTop: 12, outline: 'none', background: c.ivory }} />
        <motion.button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={() => amount && setSent(true)}>
          {isAr ? 'إرسال الدفعة' : 'Send Payment'}
        </motion.button>
      </div>
    </div>
  );
}
