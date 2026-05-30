/**
 * FinanceCurrencyScreen — Currency selection
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, MoneyLeafIcon, CheckLeafIcon, c } from '../icons/FloralIcons';
import { useState } from 'react';

const CURRENCIES = [
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', nameAr: 'ريال سعودي', flag: '🇸🇦' },
  { code: 'USD', symbol: '$', name: 'US Dollar', nameAr: 'دولار أمريكي', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', nameAr: 'يورو', flag: '🇪🇺' },
];

export default function FinanceCurrencyScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [selected, setSelected] = useState('SAR');

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><MoneyLeafIcon size={20} /> {isAr ? 'العملة' : 'Currency'}</span>
      </div>
      <div className="screen-body">
        <p style={{ color: c.muted, fontSize: 13, marginBottom: 16 }}>{isAr ? 'اختر العملة الأساسية لخطة الدعم' : 'Select the base currency for your support plan'}</p>
        {CURRENCIES.map((cur, i) => (
          <motion.button
            key={cur.code}
            className="card"
            style={{ marginBottom: 8, width: '100%', textAlign: 'start', display: 'flex', alignItems: 'center', gap: 12, border: selected === cur.code ? `2px solid ${c.mint}` : undefined, cursor: 'pointer' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelected(cur.code)}
          >
            <span style={{ fontSize: 24 }}>{cur.flag}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{cur.code} — {cur.symbol}</p>
              <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? cur.nameAr : cur.name}</p>
            </div>
            {selected === cur.code && <CheckLeafIcon size={18} color={c.success} />}
          </motion.button>
        ))}
        <motion.button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('finance-chat')}>
          {isAr ? 'متابعة' : 'Continue'}
        </motion.button>
      </div>
    </div>
  );
}
