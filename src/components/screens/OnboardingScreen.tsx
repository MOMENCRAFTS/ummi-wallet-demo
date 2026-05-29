/**
 * OnboardingScreen — Post-login welcome + role context
 * Shows before the dashboard to orient the user
 * Matches the real app's onboarding concept
 * Zero emoji — botanical SVGs, compressed spring animations
 * Full Arabic: formal headers, Shami for friendly text
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation, type AppRole } from '../../navigation';
import {
  WalletRoseIcon, CrownFloralIcon, HeartLeafIcon, PersonFloralIcon,
  EyeLeafIcon, CheckLeafIcon, FloatingPetals, SparkleAccent,
  ChartBloomIcon, MoneyLeafIcon, ShieldLeafIcon, SeedlingIcon, c,
} from '../icons/FloralIcons';

const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

interface RoleInfo {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string; titleAr: string;
  subtitle: string; subtitleAr: string;
  features: { icon: React.ComponentType<{ size?: number; color?: string }>; text: string; textAr: string }[];
  dashboard: string;
}

const ROLE_INFO: Record<AppRole, RoleInfo> = {
  admin: {
    Icon: CrownFloralIcon,
    title: 'Welcome, Responsible Son',
    titleAr: 'أهلاً، الابن المسؤول',
    subtitle: "You're the family's financial guardian. Let's set up Mother's care plan together.",
    subtitleAr: 'أنت حارس ميزانية العائلة. خلّنا نجهّز خطة رعاية أمي سوا.',
    features: [
      { icon: ChartBloomIcon, text: 'AI-powered budget planning', textAr: 'تخطيط ذكي بالذكاء الاصطناعي' },
      { icon: MoneyLeafIcon, text: 'Approve & manage payments', textAr: 'الموافقة وإدارة المدفوعات' },
      { icon: ShieldLeafIcon, text: 'Full oversight & control', textAr: 'إشراف وتحكم كامل' },
    ],
    dashboard: 'admin-dashboard',
  },
  mother: {
    Icon: HeartLeafIcon,
    title: 'Welcome, Mother',
    titleAr: 'أهلاً يا أمي',
    subtitle: 'Your children set this up for you. Request money, pay bills, all in one place.',
    subtitleAr: 'أولادك جهّزوا لك هالتطبيق. اطلبي مصروف، سدّدي فواتير، كل شي بمكان واحد.',
    features: [
      { icon: MoneyLeafIcon, text: 'Request money anytime', textAr: 'اطلبي مبالغ بأي وقت' },
      { icon: SeedlingIcon, text: 'Track your spending', textAr: 'تابعي مصاريفك' },
      { icon: HeartLeafIcon, text: 'Send gratitude to family', textAr: 'ارسلي شكر للعائلة' },
    ],
    dashboard: 'mother-dashboard',
  },
  brother: {
    Icon: PersonFloralIcon,
    title: 'Welcome, Brother',
    titleAr: 'أهلاً يا أخي',
    subtitle: "You're part of the support team. Review the plan and pay your share.",
    subtitleAr: 'أنت من فريق الدعم. راجع الخطة وادفع حصتك.',
    features: [
      { icon: ChartBloomIcon, text: 'Audit the family plan', textAr: 'راجع خطة العائلة' },
      { icon: MoneyLeafIcon, text: 'Pay your contribution', textAr: 'ادفع مساهمتك' },
      { icon: ShieldLeafIcon, text: 'Transparent tracking', textAr: 'تتبع شفاف' },
    ],
    dashboard: 'brother-dashboard',
  },
  observer: {
    Icon: EyeLeafIcon,
    title: 'Welcome, Sister',
    titleAr: 'أهلاً يا أختي',
    subtitle: "Stay connected with the family plan. Follow updates and celebrate together.",
    subtitleAr: 'تابعي أخبار العائلة. شوفي التحديثات واحتفلوا سوا.',
    features: [
      { icon: SeedlingIcon, text: 'Family activity feed', textAr: 'آخر أخبار العائلة' },
      { icon: HeartLeafIcon, text: 'Celebrations & events', textAr: 'المناسبات والاحتفالات' },
      { icon: EyeLeafIcon, text: 'Read-only peace of mind', textAr: 'اطمئنان بدون تعقيد' },
    ],
    dashboard: 'observer-dashboard',
  },
};

export default function OnboardingScreen() {
  const { navigate, role, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [step, setStep] = useState(0);
  const info = ROLE_INFO[role];

  return (
    <div className="screen onboarding-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={5} />

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="welcome"
            className="onboarding-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={spring}
          >
            {/* Logo */}
            <motion.div
              className="onboarding-logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, ...spring }}
            >
              <info.Icon size={48} />
              <SparkleAccent size={16} style={{ position: 'absolute', top: -4, right: -4 }} />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="onboarding-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {isAr ? info.titleAr : info.title}
            </motion.h1>

            <motion.p
              className="onboarding-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isAr ? info.subtitleAr : info.subtitle}
            </motion.p>

            {/* Features */}
            <div className="onboarding-features">
              {info.features.map((f, i) => (
                <motion.div
                  key={i}
                  className="onboarding-feature"
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, ...spring }}
                >
                  <span className="onboarding-feature-icon"><f.icon size={22} color={c.mint} /></span>
                  <span className="onboarding-feature-text">{isAr ? f.textAr : f.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              className="btn btn-primary btn-lg btn-full glow-mint"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => setStep(1)}
            >
              <SeedlingIcon size={18} /> {isAr ? 'يلّا نبدأ' : "Let's Begin"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            className="onboarding-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
          >
            <motion.div
              className="onboarding-ready-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <CheckLeafIcon size={40} color={c.success} />
            </motion.div>

            <motion.h2
              className="onboarding-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isAr ? 'كل شي جاهز!' : "You're All Set!"}
            </motion.h2>

            <motion.p
              className="onboarding-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {isAr
                ? 'لوحة التحكم جاهزة. استكشف كل شي بوقتك.'
                : 'Your dashboard is ready. Explore everything at your own pace.'
              }
            </motion.p>

            <motion.button
              className="btn btn-primary btn-lg btn-full glow-mint"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={() => navigate(info.dashboard as any)}
            >
              <WalletRoseIcon size={18} /> {isAr ? 'افتح لوحة التحكم' : 'Open Dashboard'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
