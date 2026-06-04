/**
 * CelebrationScreen — Plan activated celebration
 * Now includes: FlowerVideo (plan_approved.mp4) + celebration audio
 * Zero emoji — BouquetIcon + PetalConfetti as fallback decorations
 */
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { BouquetIcon, PetalConfetti, HomeGardenIcon } from '../icons/FloralIcons';
import FlowerVideo from '../videos/FlowerVideo';

export default function CelebrationScreen() {
  const { navigate, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [videoComplete, setVideoComplete] = useState(false);

  const handleVideoComplete = useCallback(() => {
    setVideoComplete(true);
  }, []);

  return (
    <div className="screen celebration-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Celebration video — plays plan_approved.mp4 once */}
      {!videoComplete && (
        <FlowerVideo
          mode="celebration"
          onComplete={handleVideoComplete}
        />
      )}

      {/* Content shows after video completes (or immediately as overlay) */}
      <div className={`celebration-content-wrap ${videoComplete ? 'visible' : ''}`}>
        <PetalConfetti count={24} />

        <motion.div
          className="celebration-content"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: videoComplete ? 1 : 0, scale: videoComplete ? 1 : 0.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        >
          <motion.div
            className="celebration-icon"
            animate={videoComplete ? { rotate: [0, -8, 8, -8, 0], scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            <BouquetIcon size={80} />
          </motion.div>

          <motion.h1
            className="celebration-title-ar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: videoComplete ? 1 : 0, y: videoComplete ? 0 : 20 }}
            transition={{ delay: 0.8 }}
          >
            تم تفعيل الخطة!
          </motion.h1>

          <motion.h2
            className="celebration-title-en"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoComplete ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            Plan Activated!
          </motion.h2>

          <motion.div
            className="card glass celebration-summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: videoComplete ? 1 : 0, y: videoComplete ? 0 : 30 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <p className="celebration-amount">{isAr ? '٥,٣٠٠' : '5,300'} <span>{isAr ? 'ر.س/شهريًا' : 'SAR/month'}</span></p>
            <p className="celebration-detail">{isAr ? '٤ بنود • للوالدة' : '4 items • For أمي'}</p>
          </motion.div>

          <motion.button
            className="btn btn-primary btn-lg glow-mint"
            onClick={() => navigate('admin-dashboard')}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoComplete ? 1 : 0 }}
            transition={{ delay: 1.5 }}
          >
            <HomeGardenIcon size={20} /> {isAr ? 'الانتقال إلى لوحة التحكم' : 'Go to Dashboard'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
