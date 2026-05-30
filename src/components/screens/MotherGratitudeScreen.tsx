/**
 * MotherGratitudeScreen — Gratitude/wishes board
 * Quick-action Shami chips + custom message + floating petals
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: Shami-heavy for warmth
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, HeartLeafIcon, FloatingPetals, BouquetIcon,
  SparkleAccent, CheckLeafIcon, c,
} from '../icons/FloralIcons';

const QUICK_MESSAGES = [
  { en: 'Jazakum Allahu Khairan', ar: 'جزاكم الله خيرًا' },
  { en: 'May Allah bless you', ar: 'الله يبارك فيكم' },
  { en: 'You never fall short', ar: 'ما قصّرتم أبدًا' },
  { en: 'Allah grant you wellness', ar: 'الله يعطيكم العافية' },
  { en: 'From my heart', ar: 'من كل قلبي' },
  { en: 'May Allah reward you', ar: 'الله يجزاكم خير' },
];

export default function MotherGratitudeScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (selected !== null || custom.trim()) setSent(true);
  };

  return (
    <div className="screen mother-gratitude-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={8} />

      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HeartLeafIcon size={20} /> {isAr ? 'شكر وامتنان' : 'Gratitude'}
        </span>
      </div>

      <div className="screen-body">
        {!sent ? (
          <>
            {/* Hero */}
            <motion.div
              style={{ textAlign: 'center', marginBottom: 20 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <BouquetIcon size={56} />
              <SparkleAccent size={10} style={{ position: 'relative', top: -20, left: 20 }} />
              <h2 style={{ color: c.brown, marginTop: 8, fontSize: 18 }}>
                {isAr ? 'كلمة شكر للعائلة' : 'A word of thanks'}
              </h2>
              <p style={{ color: c.muted, fontSize: 13, marginTop: 4 }}>
                {isAr ? 'اختاري رسالة جاهزة أو اكتبي رسالتك' : 'Pick a message or write your own'}
              </p>
            </motion.div>

            {/* Quick chips */}
            <motion.div
              className="chip-row"
              style={{ flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
            >
              {QUICK_MESSAGES.map((msg, i) => (
                <button
                  key={i}
                  className={`chip ${selected === i ? 'active' : ''}`}
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ fontSize: 13 }}
                >
                  <HeartLeafIcon size={14} /> {isAr ? msg.ar : msg.en}
                </button>
              ))}
            </motion.div>

            {/* Custom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 20 }}
            >
              <label className="form-label">{isAr ? 'أو اكتبي رسالتك' : 'Or write your own'}</label>
              <textarea
                className="sos-textarea"
                placeholder={isAr ? 'رسالة من القلب...' : 'A heartfelt message...'}
                rows={3}
                value={custom}
                onChange={e => setCustom(e.target.value)}
              />
            </motion.div>

            {/* Send */}
            <motion.button
              className="btn btn-primary btn-lg btn-full"
              onClick={handleSend}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
              style={{ marginTop: 20 }}
              whileTap={{ scale: 0.98 }}
            >
              <HeartLeafIcon size={20} /> {isAr ? 'إرسال الشكر' : 'Send Gratitude'}
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
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1.5 }}
            >
              <HeartLeafIcon size={56} color={c.peach} />
            </motion.div>
            <h2 style={{ marginTop: 16, color: c.brown }}>
              {isAr ? 'تم إرسال رسالة الشكر!' : 'Your gratitude was sent!'}
            </h2>
            <p style={{ color: c.muted, marginTop: 8, fontSize: 14 }}>
              {isAr ? 'الله يبارك في هذه العائلة الطيبة' : 'May Allah bless this beautiful family'}
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
