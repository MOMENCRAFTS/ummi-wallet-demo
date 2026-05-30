/**
 * MotherFeedScreen — Family activity feed
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, NewsScrollIcon, SeedlingIcon, c } from '../icons/FloralIcons';

const FEED = [
  { text: 'Monthly allowance received — 5,300 SAR', textAr: 'وصل المصروف الشهري — ٥٬٣٠٠ ر.س — الحمد لله', time: '2h ago', timeAr: 'قبل ساعتين' },
  { text: 'Ahmed approved pharmacy request', textAr: 'أحمد وافق على طلب الصيدلية — يعطيه العافية', time: '1d ago', timeAr: 'أمس' },
  { text: 'Electricity bill paid — 320 SAR', textAr: 'انسددت فاتورة الكهرباء — ٣٢٠ ر.س', time: '3d ago', timeAr: 'قبل ٣ أيام' },
  { text: 'Mohammed paid his monthly share', textAr: 'محمد دفع حصّته — جزاه الله خير', time: '4d ago', timeAr: 'قبل ٤ أيام' },
  { text: 'Support plan published for June', textAr: 'تم نشر خطة الدعم لشهر يونيو', time: '5d ago', timeAr: 'قبل ٥ أيام' },
];

export default function MotherFeedScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><NewsScrollIcon size={20} /> {isAr ? 'آخر أخبار العائلة' : 'Family Feed'}</span></div>
      <div className="screen-body">
        {FEED.map((f, i) => (
          <motion.div key={i} className="card" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }} initial={{ opacity: 0, x: isAr ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
            <SeedlingIcon size={18} color={c.mint} />
            <div style={{ flex: 1 }}><p style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? f.textAr : f.text}</p><p style={{ color: c.muted, fontSize: 11 }}>{isAr ? f.timeAr : f.time}</p></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
