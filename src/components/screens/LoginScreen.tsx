/**
 * LoginScreen — Pixel-perfect clone of the true app's Login.tsx
 * Premium botanical auth flow with floating petals, animated logo, OAuth + OTP
 * Now includes: OAuth success transition video + audio SFX
 * Zero emoji — fully custom visual language
 */
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  WalletRoseIcon, GlobeFlowerIcon, FloatingPetals, SparkleAccent,
  VineDivider, AppleLogo, GoogleLogo,
} from '../icons/FloralIcons';
import OAuthTransition from '../videos/OAuthTransition';
import { audioService } from '../../lib/audioService';

export default function LoginScreen() {
  const { navigate, role, lang, setLang } = useNavigation();
  const isAr = lang === 'ar';
  const [showTransition, setShowTransition] = useState(false);

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const handleAuth = useCallback(() => {
    // Unlock audio on user gesture then show transition
    audioService.unlock().then(() => {
      audioService.playOneShot('celebration_bloom', 0.6);
      setShowTransition(true);
    });
  }, []);

  const handleTransitionComplete = useCallback(() => {
    const dashboards: Record<string, string> = {
      admin: 'admin-dashboard',
      mother: 'mother-dashboard',
      brother: 'brother-dashboard',
      observer: 'observer-dashboard',
    };
    setShowTransition(false);
    navigate((dashboards[role] || 'admin-dashboard') as any);
  }, [navigate, role]);

  return (
    <div className="screen login-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={6} />

      {/* OAuth Success Transition Video Overlay */}
      {showTransition && (
        <OAuthTransition onComplete={handleTransitionComplete} />
      )}

      {/* Language toggle — top right */}
      <button className="lang-toggle" onClick={toggleLang}>
        <GlobeFlowerIcon size={14} />
        <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
      </button>

      <motion.div
        className="login-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo Section — rotation twist entrance */}
        <motion.div
          className="login-logo-section"
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="login-logo-box">
            <WalletRoseIcon size={36} />
          </div>
          {/* Sparkles around logo */}
          <SparkleAccent size={12} style={{ position: 'absolute', top: -4, right: 16 }} />
          <SparkleAccent size={9} style={{ position: 'absolute', top: 12, left: 12 }} />
          <SparkleAccent size={10} style={{ position: 'absolute', bottom: 26, right: 6 }} />
        </motion.div>

        {/* Title */}
        <motion.div
          className="login-titles"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="login-title-en">Ummi Wallet</h1>
          <h2 className="login-title-ar">محفظة أمي</h2>
          <div className="login-tagline-divider" />
          <p className="login-tagline">{isAr ? 'رعاية العائلة بوضوح وكرامة' : 'Family support, made clear.'}</p>
        </motion.div>

        {/* OAuth Buttons */}
        <motion.div
          className="login-oauth-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <button className="oauth-btn oauth-apple" onClick={handleAuth}>
            <AppleLogo size={18} />
            <span>{isAr ? 'الدخول بـ Apple' : 'Sign in with Apple'}</span>
          </button>
          <button className="oauth-btn oauth-google" onClick={handleAuth}>
            <GoogleLogo size={18} />
            <span>{isAr ? 'الدخول بـ Google' : 'Sign in with Google'}</span>
          </button>
        </motion.div>

        {/* Or divider */}



        {/* Vine Divider */}
        <VineDivider />

        {/* Branding */}
        <motion.div
          className="branding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="divider" />
          <span className="crafted-by">{isAr ? 'صُنعت بواسطة' : 'crafted by'}</span>
          <span className="brand-name">MomenCrafts</span>
          <div className="legal-row">
            <span className="legal-link">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">{isAr ? 'الشروط والأحكام' : 'Terms of Service'}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
