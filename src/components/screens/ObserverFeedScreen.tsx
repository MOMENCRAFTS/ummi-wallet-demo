/**
 * ObserverFeedScreen — Read-only family feed
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, EyeLeafIcon, SeedlingIcon, c } from '../icons/FloralIcons';

const FEED = [
  { text: 'Monthly allowance sent to Mother', textAr: 'تم إرسال المصروف للوالدة', time: '2h ago', timeAr: 'قبل ساعتين' },
  { text: 'Mohammed approved the support plan', textAr: 'محمد وافق على خطة الدعم', time: '1d ago', timeAr: 'أمس' },
  { text: 'New maintenance request submitted', textAr: 'طلب صيانة جديد', time: '3d ago', timeAr: 'قبل ٣ أيام' },
  { text: 'Electricity bill paid — 280 SAR', textAr: 'انسددت فاتورة الكهرباء — ٢٨٠ ر.س', time: '5d ago', timeAr: 'قبل ٥ أيام' },
  { text: 'Emergency fund top-up — 1,000 SAR', textAr: 'تعبئة صندوق الطوارئ — ١٬٠٠٠ ر.س', time: '1w ago', timeAr: 'قبل أسبوع' },
];

export default function ObserverFeedScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><EyeLeafIcon size={20} /> {isAr ? 'آخر أخبار العائلة' : 'Family Feed'}</span></div>
      <div className="screen-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '6px 12px', background: c.blue + '12', borderRadius: 8 }}>
          <EyeLeafIcon size={14} color={c.blue} />
          <span style={{ fontSize: 11, color: c.blue, fontWeight: 500 }}>{isAr ? 'وضع المشاهدة فقط' : 'View-only mode'}</span>
        </div>
        {FEED.map((f, i) => (
          <motion.div key={i} className="card" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }} initial={{ opacity: 0, x: isAr ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
            <SeedlingIcon size={16} color={c.mint} />
            <div style={{ flex: 1 }}><p style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? f.textAr : f.text}</p><p style={{ color: c.muted, fontSize: 11 }}>{isAr ? f.timeAr : f.time}</p></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
