/**
 * OnboardingScreen — Post-login multi-step setup flow
 * Admin: Welcome → Add Mother's Info → Invite Family → All Set
 * Others: Welcome → Confirm Identity → All Set
 * Zero emoji — botanical SVGs, compressed spring animations
 * Full Arabic: formal headers, Shami for friendly text
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation, type AppRole } from '../../navigation';
import {
  WalletRoseIcon, CrownFloralIcon, HeartLeafIcon, PersonFloralIcon,
  EyeLeafIcon, CheckLeafIcon, FloatingPetals, SparkleAccent,
  ChartBloomIcon, MoneyLeafIcon, ShieldLeafIcon, SeedlingIcon,
  BankGardenIcon, c,
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

/* ─── Step indicator dots ─── */
function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="onboarding-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`onboarding-dot ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`} />
      ))}
    </div>
  );
}

/* ─── Admin-only: Mother info step ─── */
function MotherInfoStep({ isAr, onNext }: { isAr: boolean; onNext: () => void }) {
  const [name, setName] = useState(isAr ? 'أم أحمد' : 'Um Ahmed');
  const [phone, setPhone] = useState('+966 5x xxx xxxx');
  const [iban, setIban] = useState('SA44 2000 0001 2345 6789 0123');

  return (
    <motion.div
      key="mother-info"
      className="onboarding-content"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={spring}
    >
      <HeartLeafIcon size={36} color={c.peach} />
      <h2 className="onboarding-title">{isAr ? 'بيانات الوالدة' : "Mother's Details"}</h2>
      <p className="onboarding-subtitle">
        {isAr ? 'عشان نربط حسابها ونسهّل الطلبات' : 'To link her account and simplify requests'}
      </p>

      <div className="onboarding-form">
        <div className="onboarding-field">
          <label>{isAr ? 'اسم الوالدة' : "Mother's name"}</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="onboarding-field">
          <label>{isAr ? 'رقم الجوال' : 'Phone number'}</label>
          <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="onboarding-field">
          <label>{isAr ? 'الآيبان البنكي' : 'Bank IBAN'}</label>
          <div className="onboarding-iban-row">
            <BankGardenIcon size={18} color={c.mint} />
            <input className="input" value={iban} onChange={e => setIban(e.target.value)} style={{ fontFamily: 'monospace', fontSize: 12 }} />
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-lg btn-full glow-mint" onClick={onNext}>
        <CheckLeafIcon size={18} /> {isAr ? 'التالي — دعوة العائلة' : 'Next — Invite Family'}
      </button>
    </motion.div>
  );
}

/* ─── Admin-only: Invite family step ─── */
function InviteFamilyStep({ isAr, onNext }: { isAr: boolean; onNext: () => void }) {
  const members = [
    { name: isAr ? 'محمد' : 'Mohammed', role: isAr ? 'الأخ المساهم' : 'Contributing Brother', Icon: PersonFloralIcon, added: true },
    { name: isAr ? 'سارة' : 'Sarah', role: isAr ? 'الأخت المتابعة' : 'Observing Sister', Icon: EyeLeafIcon, added: true },
    { name: isAr ? 'خالد' : 'Khaled', role: isAr ? 'الأخ المساهم' : 'Contributing Brother', Icon: PersonFloralIcon, added: false },
  ];

  return (
    <motion.div
      key="invite-family"
      className="onboarding-content"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={spring}
    >
      <PersonFloralIcon size={36} color={c.mint} />
      <h2 className="onboarding-title">{isAr ? 'دعوة أفراد العائلة' : 'Invite Family Members'}</h2>
      <p className="onboarding-subtitle">
        {isAr ? 'أضف إخوانك وأخواتك للخطة — كل واحد بدوره' : 'Add siblings to the plan — each with their role'}
      </p>

      <div className="onboarding-members">
        {members.map((m, i) => (
          <motion.div
            key={i}
            className={`onboarding-member ${m.added ? 'added' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, ...spring }}
          >
            <span className="onboarding-member-icon"><m.Icon size={20} /></span>
            <div className="onboarding-member-info">
              <span className="onboarding-member-name">{m.name}</span>
              <span className="onboarding-member-role">{m.role}</span>
            </div>
            {m.added ? (
              <span className="badge badge-approved" style={{ background: c.success + '20', color: c.success, fontSize: 11 }}>
                <CheckLeafIcon size={10} color={c.success} /> {isAr ? 'تمت الدعوة' : 'Invited'}
              </span>
            ) : (
              <button className="btn btn-glass btn-sm" style={{ fontSize: 11 }}>
                {isAr ? 'دعوة' : 'Invite'}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <button className="btn btn-primary btn-lg btn-full glow-mint" onClick={onNext} style={{ marginTop: 8 }}>
        <SeedlingIcon size={18} /> {isAr ? 'أكمل الإعداد' : 'Complete Setup'}
      </button>
      <button className="btn btn-ghost" onClick={onNext} style={{ width: '100%', marginTop: 4, fontSize: 12 }}>
        {isAr ? 'تخطّي — أدعوهم لاحقاً' : 'Skip — invite later'}
      </button>
    </motion.div>
  );
}

/* ─── Non-admin: Confirm identity step ─── */
function ConfirmIdentityStep({ isAr, role, onNext }: { isAr: boolean; role: AppRole; onNext: () => void }) {
  const info = ROLE_INFO[role];
  const familyName = isAr ? 'عائلة أحمد' : 'Ahmed Family';

  return (
    <motion.div
      key="confirm-identity"
      className="onboarding-content"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={spring}
    >
      <info.Icon size={36} color={c.mint} />
      <h2 className="onboarding-title">{isAr ? 'تأكيد الانضمام' : 'Confirm Your Role'}</h2>
      <p className="onboarding-subtitle">
        {isAr
          ? `تمت دعوتك للانضمام إلى خطة ${familyName}`
          : `You've been invited to join the ${familyName} plan`}
      </p>

      <div className="onboarding-confirm-card">
        <div className="onboarding-confirm-row">
          <span className="onboarding-confirm-label">{isAr ? 'الدور' : 'Role'}</span>
          <span className="onboarding-confirm-value">{isAr ? info.titleAr.replace('أهلاً، ', '').replace('أهلاً يا ', '') : info.title.replace('Welcome, ', '')}</span>
        </div>
        <div className="onboarding-confirm-row">
          <span className="onboarding-confirm-label">{isAr ? 'العائلة' : 'Family'}</span>
          <span className="onboarding-confirm-value">{familyName}</span>
        </div>
        <div className="onboarding-confirm-row">
          <span className="onboarding-confirm-label">{isAr ? 'المسؤول' : 'Admin'}</span>
          <span className="onboarding-confirm-value">{isAr ? 'أحمد (الابن المسؤول)' : 'Ahmed (Responsible Son)'}</span>
        </div>
      </div>

      <button className="btn btn-primary btn-lg btn-full glow-mint" onClick={onNext}>
        <CheckLeafIcon size={18} /> {isAr ? 'تأكيد وانضمام' : 'Confirm & Join'}
      </button>
    </motion.div>
  );
}

/* ─── Final: All set ─── */
function AllSetStep({ isAr, info, onFinish }: { isAr: boolean; info: RoleInfo; onFinish: () => void }) {
  return (
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

      <motion.h2 className="onboarding-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {isAr ? 'كل شي جاهز!' : "You're All Set!"}
      </motion.h2>

      <motion.p className="onboarding-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
        {isAr ? 'لوحة التحكم جاهزة. استكشف كل شي بوقتك.' : 'Your dashboard is ready. Explore everything at your own pace.'}
      </motion.p>

      <motion.button
        className="btn btn-primary btn-lg btn-full glow-mint"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onFinish}
      >
        <WalletRoseIcon size={18} /> {isAr ? 'افتح لوحة التحكم' : 'Open Dashboard'}
      </motion.button>
    </motion.div>
  );
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function OnboardingScreen() {
  const { navigate, role, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [step, setStep] = useState(0);
  const info = ROLE_INFO[role];

  // Admin has 4 steps, others have 3
  const isAdmin = role === 'admin';
  const totalSteps = isAdmin ? 4 : 3;

  const renderStep = () => {
    if (isAdmin) {
      switch (step) {
        case 0: return <WelcomeStep isAr={isAr} info={info} onNext={() => setStep(1)} />;
        case 1: return <MotherInfoStep isAr={isAr} onNext={() => setStep(2)} />;
        case 2: return <InviteFamilyStep isAr={isAr} onNext={() => setStep(3)} />;
        case 3: return <AllSetStep isAr={isAr} info={info} onFinish={() => navigate(info.dashboard as any)} />;
      }
    } else {
      switch (step) {
        case 0: return <WelcomeStep isAr={isAr} info={info} onNext={() => setStep(1)} />;
        case 1: return <ConfirmIdentityStep isAr={isAr} role={role} onNext={() => setStep(2)} />;
        case 2: return <AllSetStep isAr={isAr} info={info} onFinish={() => navigate(info.dashboard as any)} />;
      }
    }
  };

  return (
    <div className="screen onboarding-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={5} />
      <StepDots total={totalSteps} current={step} />
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}

/* ─── Welcome step (shared) ─── */
function WelcomeStep({ isAr, info, onNext }: { isAr: boolean; info: RoleInfo; onNext: () => void }) {
  return (
    <motion.div
      key="welcome"
      className="onboarding-content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={spring}
    >
      <motion.div className="onboarding-logo" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, ...spring }}>
        <info.Icon size={48} />
        <SparkleAccent size={16} style={{ position: 'absolute', top: -4, right: -4 }} />
      </motion.div>

      <motion.h1 className="onboarding-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        {isAr ? info.titleAr : info.title}
      </motion.h1>

      <motion.p className="onboarding-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        {isAr ? info.subtitleAr : info.subtitle}
      </motion.p>

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

      <motion.button
        className="btn btn-primary btn-lg btn-full glow-mint"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onNext}
      >
        <SeedlingIcon size={18} /> {isAr ? 'يلّا نبدأ' : "Let's Begin"}
      </motion.button>
    </motion.div>
  );
}
