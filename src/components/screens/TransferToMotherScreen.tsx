/**
 * TransferToMotherScreen — Direct transfer to mother's account
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, HeartLeafIcon, MoneyLeafIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

export default function TransferToMotherScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!amount || Number(amount) <= 0) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="screen-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
            <CheckLeafIcon size={64} color={c.success} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ color: c.brown, marginTop: 16, fontSize: 18 }}>
            {isAr ? 'تم التحويل بنجاح!' : 'Transfer Successful!'}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: c.muted, fontSize: 14, marginTop: 4 }}>
            {Number(amount).toLocaleString()} {isAr ? 'ر.س للوالدة' : 'SAR to Mother'}
          </motion.p>
          <motion.button className="btn btn-glass btn-md" style={{ marginTop: 24 }} onClick={goBack} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {isAr ? 'رجوع' : 'Go Back'}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><HeartLeafIcon size={20} /> {isAr ? 'تحويل للوالدة' : 'Transfer to Mother'}</span>
      </div>
      <div className="screen-body">
        {/* Mother Info */}
        <motion.div className="card glass" style={{ padding: 16, textAlign: 'center', marginBottom: 20 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: 32 }}>👩</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.brown, marginTop: 6 }}>{isAr ? 'الوالدة' : 'Mother'}</div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>SA•••••••••90 • {isAr ? 'بنك الراجحي' : 'Al Rajhi Bank'}</div>
        </motion.div>

        {/* Amount */}
        <motion.div className="card" style={{ padding: 16, marginBottom: 12 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label style={{ fontSize: 12, color: c.muted, display: 'block', marginBottom: 6 }}>{isAr ? 'المبلغ' : 'Amount'}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MoneyLeafIcon size={20} color={c.mint} />
            <input
              type="number"
              className="input"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ fontSize: 24, fontWeight: 700, flex: 1, textAlign: 'center', border: 'none', background: 'transparent', color: c.brown }}
            />
            <span style={{ fontSize: 14, color: c.muted, fontWeight: 600 }}>{isAr ? 'ر.س' : 'SAR'}</span>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div className="card" style={{ padding: 16, marginBottom: 20 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <label style={{ fontSize: 12, color: c.muted, display: 'block', marginBottom: 6 }}>{isAr ? 'ملاحظة (اختياري)' : 'Note (optional)'}</label>
          <input
            type="text"
            className="input"
            placeholder={isAr ? 'مصاريف الشهر...' : 'Monthly expenses...'}
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{ fontSize: 13 }}
          />
        </motion.div>

        {/* Send Button */}
        <motion.button
          className="btn btn-primary btn-md btn-full glow-mint"
          onClick={handleSend}
          disabled={!amount || Number(amount) <= 0}
          style={{ opacity: (!amount || Number(amount) <= 0) ? 0.5 : 1 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <HeartLeafIcon size={16} color="#fff" /> {isAr ? 'تحويل للوالدة' : 'Send to Mother'}
        </motion.button>
      </div>
    </div>
  );
}
