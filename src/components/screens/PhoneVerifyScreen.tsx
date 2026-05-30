/**
 * PhoneVerifyScreen — Post-OAuth phone verification (simulated Twilio)
 * Step 1: Phone entry (+966 Saudi format)
 * Step 2: 6-digit OTP (auto-fills 123456 after 2s)
 * Step 3: Success animation → navigate to onboarding
 * Zero emoji — botanical SVGs, compressed spring animations
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  CheckLeafIcon, WalletRoseIcon, FloatingPetals, SparkleAccent,
  ShieldLeafIcon, SeedlingIcon, c,
} from '../icons/FloralIcons';

const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

/** Convert Western digits (0-9) to Eastern Arabic/Hindi numerals (٠-٩) */
function toIndic(s: string | number): string {
  return String(s).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

/* ─── Saudi flag SVG (no emoji) ─── */
function SaudiFlag({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 33 22" fill="none">
      <rect width="33" height="22" rx="3" fill="#006C35" />
      <text x="16.5" y="12" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="serif">
        لا إله إلا الله
      </text>
      <rect x="7" y="15" width="19" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    </svg>
  );
}

/* ─── Step indicator dots ─── */
function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="onboarding-dots" style={{ top: 14 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`onboarding-dot ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`} />
      ))}
    </div>
  );
}

/* ═══════════ PHONE ENTRY STEP ═══════════ */
function PhoneEntryStep({ isAr, onSubmit }: { isAr: boolean; onSubmit: (phone: string) => void }) {
  const [phone, setPhone] = useState('512345678');
  const [error, setError] = useState('');

  const formatDisplay = (raw: string, arabic: boolean) => {
    const digits = raw.replace(/\D/g, '').slice(0, 9);
    let formatted: string;
    if (digits.length <= 2) formatted = digits;
    else if (digits.length < 5) formatted = `${digits.slice(0, 2)} ${digits.slice(2)}`;
    else formatted = `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return arabic ? toIndic(formatted) : formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert Eastern Arabic digits back to Western for storage
    const westernized = e.target.value.replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660));
    const raw = westernized.replace(/\D/g, '').slice(0, 9);
    setPhone(raw);
    setError('');
  };

  const handleSend = () => {
    if (phone.length < 9 || !phone.startsWith('5')) {
      setError(isAr ? 'رقم الجوال السعودي غير صالح — يجب أن يبدأ بـ 5' : 'Invalid Saudi mobile — must start with 5');
      return;
    }
    onSubmit(phone);
  };

  return (
    <motion.div
      key="phone-entry"
      className="otp-content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={spring}
    >
      <ShieldLeafIcon size={36} color={c.mint} />
      <h2 className="onboarding-title">{isAr ? 'رقم جوالك' : 'Your Phone Number'}</h2>
      <p className="onboarding-subtitle">
        {isAr ? 'أدخل رقمك للانضمام إلى عائلتك' : 'Enter your number to join your family'}
      </p>

      <div className="phone-entry-card">
        <div className="phone-row">
          <input
            className="phone-input"
            type="tel"
            inputMode="numeric"
            dir="ltr"
            value={formatDisplay(phone, isAr)}
            onChange={handleChange}
            placeholder={isAr ? toIndic('5XX XXX XXXX') : '5XX XXX XXXX'}
            autoFocus
          />
          <div className="country-code">
            <span className="code-text">{isAr ? toIndic('+966') : '+966'}</span>
            <SaudiFlag size={20} />
          </div>
        </div>
      </div>

      {error && <p className="otp-error">{error}</p>}

      <p className="otp-hint">
        {isAr ? 'سيتم إرسال رمز التحقق عبر رسالة نصية SMS' : 'A verification code will be sent via SMS'}
      </p>

      <button className="btn btn-primary btn-lg btn-full glow-mint" onClick={handleSend}>
        <SeedlingIcon size={18} />
        {isAr ? 'إرسال رمز التحقق' : 'Send Verification Code'}
      </button>
    </motion.div>
  );
}

/* ═══════════ OTP ENTRY STEP ═══════════ */
function OtpEntryStep({
  isAr, phone, onVerify, onResend,
}: {
  isAr: boolean; phone: string; onVerify: (code: string) => void; onResend: () => void;
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Auto-fill demo OTP after 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      const demoCode = ['1', '2', '3', '4', '5', '6'];
      setOtp(demoCode);
      // Auto-submit
      setTimeout(() => onVerify(demoCode.join('')), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit on 6th digit
    if (index === 5 && value) {
      const code = newOtp.join('');
      if (code.length === 6) onVerify(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const rawDisplay = `+966 ${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5)}`;
  const displayPhone = isAr ? toIndic(rawDisplay) : rawDisplay;

  return (
    <motion.div
      key="otp-entry"
      className="otp-content"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={spring}
    >
      <ShieldLeafIcon size={36} color={c.peach} />
      <h2 className="onboarding-title">{isAr ? 'رمز التحقق' : 'Verification Code'}</h2>
      <p className="onboarding-subtitle">
        {isAr ? `أدخل الرمز المرسل إلى ${displayPhone}` : `Enter the code sent to ${displayPhone}`}
      </p>

      <div className="otp-row">
        {otp.map((digit, i) => (
          <motion.input
            key={i}
            ref={el => { inputRefs.current[i] = el; }}
            className={`otp-box ${digit ? 'filled' : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            autoFocus={i === 0}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.05, ...spring }}
          />
        ))}
      </div>

      {/* Auto-fill hint */}
      <motion.p
        className="otp-autofill-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isAr ? `تعبئة تلقائية للعرض: ${toIndic('123456')}` : 'Demo auto-fill: 123456'}
      </motion.p>

      {error && <p className="otp-error">{error}</p>}

      <button
        className={`otp-resend ${countdown > 0 ? 'disabled' : ''}`}
        onClick={() => { if (countdown <= 0) { onResend(); setCountdown(60); } }}
      >
        {countdown > 0
          ? (isAr ? `إعادة الإرسال بعد ${toIndic(countdown)}ث` : `Resend in ${countdown}s`)
          : (isAr ? 'إعادة إرسال الرمز' : 'Resend Code')}
      </button>
    </motion.div>
  );
}

/* ═══════════ SUCCESS STEP ═══════════ */
function SuccessStep({ isAr, onContinue }: { isAr: boolean; onContinue: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onContinue, 2000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <motion.div
      key="verify-success"
      className="otp-content"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={spring}
    >
      <motion.div
        className="verify-success-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
      >
        <CheckLeafIcon size={48} color={c.success} />
      </motion.div>

      <motion.h2
        className="onboarding-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {isAr ? 'تم التحقق' : 'Verified'}
      </motion.h2>

      <motion.p
        className="onboarding-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {isAr ? 'جارٍ ربط حسابك بعائلتك...' : 'Linking your account to your family...'}
      </motion.p>

      <SparkleAccent size={14} style={{ position: 'absolute', top: '20%', right: '15%' }} />
      <SparkleAccent size={10} style={{ position: 'absolute', top: '35%', left: '10%' }} />
    </motion.div>
  );
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function PhoneVerifyScreen() {
  const { navigate, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState('');

  const stepIndex = step === 'phone' ? 0 : step === 'otp' ? 1 : 2;

  const handlePhoneSubmit = useCallback((p: string) => {
    setPhone(p);
    setStep('otp');
  }, []);

  const handleVerify = useCallback((_code: string) => {
    setStep('success');
  }, []);

  const handleResend = useCallback(() => {
    // Simulated resend
  }, []);

  const handleContinue = useCallback(() => {
    navigate('onboarding');
  }, [navigate]);

  return (
    <div className="screen otp-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={4} />
      <StepDots total={3} current={stepIndex} />
      <AnimatePresence mode="wait">
        {step === 'phone' && (
          <PhoneEntryStep isAr={isAr} onSubmit={handlePhoneSubmit} />
        )}
        {step === 'otp' && (
          <OtpEntryStep
            isAr={isAr}
            phone={phone}
            onVerify={handleVerify}
            onResend={handleResend}
          />
        )}
        {step === 'success' && (
          <SuccessStep isAr={isAr} onContinue={handleContinue} />
        )}
      </AnimatePresence>
    </div>
  );
}
