/**
 * LandingScreen — App launch screen
 * Botanical logo, tagline, Get Started CTA
 * Zero emoji — all SVG botanical icons
 * Full Arabic: formal + Shami
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { useFamilyState } from '../../familyState';
import { audioService } from '../../lib/audioService';
import {
  WalletRoseIcon, FloatingPetals, SparkleAccent, VineDivider,
  CrownFloralIcon, HeartLeafIcon, EyeLeafIcon, GlobeFlowerIcon,
  RoseSOSIcon,
} from '../icons/FloralIcons';

const ROLE_DASHBOARDS: Record<string, string> = {
  admin: 'admin-dashboard', mother: 'mother-dashboard',
  brother: 'brother-dashboard', observer: 'observer-dashboard',
};
const ROLE_LABELS: Record<string, { en: string; ar: string }> = {
  admin: { en: 'Responsible Son', ar: 'الابن المسؤول' },
  mother: { en: 'Mother', ar: 'الوالدة' },
  brother: { en: 'Contributing Brother', ar: 'الأخ المساهم' },
  observer: { en: 'Observing Sister', ar: 'الأخت المتابعة' },
};

export default function LandingScreen() {
  const { navigate, role, lang } = useNavigation();
  const { publishPlan } = useFamilyState();
  const isAr = lang === 'ar';

  return (
    <div className="screen landing-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="landing-bg" />
      <FloatingPetals count={6} />

      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="landing-logo"
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <WalletRoseIcon size={48} />
          <SparkleAccent size={12} style={{ position: 'absolute', top: -6, right: -2 }} />
          <SparkleAccent size={9} style={{ position: 'absolute', bottom: 0, left: -4 }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="landing-title-ar">محفظة أمي</h1>
          <h2 className="landing-title-en">Ummi Wallet</h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="landing-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isAr ? 'دعم العائلة بوضوح وكرامة' : 'Family support, made clear.'}<br />
          <span className="landing-tagline-ar">
            {isAr ? 'كل شيء واضح، وكل شيء بمحبة' : 'Everything clear, everything with love.'}
          </span>
        </motion.p>

        {/* Stats */}
        <motion.div
          className="landing-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="landing-stat">
            <span className="landing-stat-num">{isAr ? '٢٨' : '28'}</span>
            <span className="landing-stat-label">{isAr ? 'خدمة' : 'Modules'}</span>
          </div>
          <div className="landing-stat-dot">·</div>
          <div className="landing-stat">
            <span className="landing-stat-num">{isAr ? '٤' : '4'}</span>
            <span className="landing-stat-label">{isAr ? 'أدوار' : 'Roles'}</span>
          </div>
          <div className="landing-stat-dot">·</div>
          <div className="landing-stat">
            <span className="landing-stat-num">{isAr ? 'عربي/English' : 'AR/EN'}</span>
            <span className="landing-stat-label">{isAr ? 'ثنائي اللغة' : 'Bilingual'}</span>
          </div>
        </motion.div>

        <VineDivider />

        {/* CTAs */}
        <motion.div
          className="landing-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <button
            className="btn btn-primary btn-lg btn-full"
            onClick={() => { audioService.unlock(); navigate('login'); }}
          >
            <WalletRoseIcon size={20} /> {isAr ? 'استكشف التطبيق' : 'Explore the App'}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => { audioService.unlock(); publishPlan(); navigate((ROLE_DASHBOARDS[role] || 'admin-dashboard') as any); }}
            style={{ width: '100%', marginTop: 8 }}
          >
            <CrownFloralIcon size={18} /> {isAr ? `دخول مباشر — ${ROLE_LABELS[role]?.ar}` : `Skip to ${ROLE_LABELS[role]?.en}`}
          </button>
        </motion.div>

        {/* Botanical decorators */}
        <div className="landing-vine landing-vine-left" />
        <div className="landing-vine landing-vine-right" />
      </motion.div>
    </div>
  );
}
