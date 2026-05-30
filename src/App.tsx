/**
 * Ummi Wallet — Interactive Demo App
 * momencrafts.com/ummi-wallet/
 *
 * Three-column layout: Info Panel | Phone | Role Selector
 * Zero emoji — all SVG FloralIcons
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { NavigationProvider, useNavigation, type AppRole, type ScreenName } from './navigation';
import { FamilyStateProvider } from './familyState';
import PhoneFrame from './components/PhoneFrame';
import ScreenRouter from './components/ScreenRouter';
import { audioService } from './lib/audioService';
import {
  WalletRoseIcon, ChartBloomIcon, PersonFloralIcon,
  GlobeFlowerIcon, RoseSOSIcon, CrownFloralIcon,
  HeartLeafIcon, EyeLeafIcon, SeedlingIcon,
} from './components/icons/FloralIcons';

/* ─── Role Selector Panel (right side) ─── */
const ROLES: { id: AppRole; label: string; labelAr: string; desc: string; descAr: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'admin', label: 'Responsible Son', labelAr: 'الابن المسؤول', desc: 'Manages budget, approves requests, oversees the family plan', descAr: 'يدير الميزانية، ويعتمد الطلبات، ويشرف على خطة العائلة', Icon: CrownFloralIcon },
  { id: 'mother', label: 'Mother', labelAr: 'الوالدة', desc: 'Requests money, pays bills, sends gratitude', descAr: 'تطلب مبالغ، وتدفع الفواتير، وترسل الشكر', Icon: HeartLeafIcon },
  { id: 'brother', label: 'Contributing Brother', labelAr: 'الأخ المساهم', desc: 'Pays his share, views pending approvals', descAr: 'يسدد حصته ويتابع الموافقات المعلّقة', Icon: PersonFloralIcon },
  { id: 'observer', label: 'Observing Sister', labelAr: 'الأخت المتابعة', desc: 'Views family feed, celebrations, gratitude', descAr: 'تتابع أخبار العائلة والمناسبات ورسائل الشكر', Icon: EyeLeafIcon },
];

function RolePanel() {
  const { role, setRole, lang, setLang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="role-panel">
      <h3 className="role-panel-title">{isAr ? 'اختر دورك' : 'Choose Role'}</h3>
      <p className="role-panel-subtitle">{isAr ? 'استعرض التطبيق من منظور كل فرد في العائلة' : 'See the app from each family member\'s perspective'}</p>

      <div className="role-panel-grid">
        {ROLES.map(r => (
          <button
            key={r.id}
            className={`role-card ${role === r.id ? 'active' : ''}`}
            onClick={() => setRole(r.id)}
          >
            <div className="role-card-icon">
              <r.Icon size={24} />
            </div>
            <div className="role-card-text">
              <span className="role-card-label">{isAr ? r.labelAr : r.label}</span>
              <span className="role-card-desc">{isAr ? r.descAr : r.desc}</span>
            </div>
            {role === r.id && <div className="role-card-active-dot" />}
          </button>
        ))}
      </div>

      {/* Language toggle */}
      <div className="role-panel-lang">
        <button
          className={`role-lang-btn ${lang === 'ar' ? 'active' : ''}`}
          onClick={() => setLang('ar')}
        >
          عربي
        </button>
        <button
          className={`role-lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          English
        </button>
      </div>
    </div>
  );
}

/* ─── Track name labels (bilingual) ─── */
const TRACK_LABELS_EN: Record<string, string> = {
  pearl_gate: 'Pearl Gate',
  mothers_embrace: "Mother's Embrace",
  pulse_in_the_hall: 'Pulse in the Hall',
  blessing_hush: 'Blessing Hush',
  celebration_bloom: 'Celebration Bloom',
  step_complete: 'Step Complete',
};
const TRACK_LABELS_AR: Record<string, string> = {
  pearl_gate: 'بوابة اللؤلؤ',
  mothers_embrace: 'حضن الوالدة',
  pulse_in_the_hall: 'نبض المجلس',
  blessing_hush: 'همس البركة',
  celebration_bloom: 'تفتّح الفرح',
  step_complete: 'اكتملت الخطوة',
};

/* ─── Info Panel (left side) — now includes auto-play + music ─── */
function InfoPanel() {
  const { lang, screen, role, navigate } = useNavigation();
  const isAr = lang === 'ar';

  // Music
  const [musicEnabled, setMusicEnabled] = useState(audioService.isEnabled());
  const [currentTrack, setCurrentTrack] = useState(audioService.getCurrentTrack());

  // Auto-play
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef(autoPlay);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayIndex = useRef(0);

  // ─── Infer role from screen name for tour sync ───
  const getRoleForScreen = (s: ScreenName): AppRole | null => {
    if (s.startsWith('admin') || s.startsWith('finance') || s.startsWith('queue') ||
        s.startsWith('payroll') || s === 'maintenance' || s.startsWith('reservoir') ||
        s.startsWith('settlement') || s.startsWith('pulse') || s.startsWith('reports') ||
        s.startsWith('members') || s.startsWith('projects') || s.startsWith('celebrations-list') ||
        s.startsWith('documents')) return 'admin';
    if (s.startsWith('mother')) return 'mother';
    if (s.startsWith('brother')) return 'brother';
    if (s.startsWith('observer')) return 'observer';
    return null;
  };

  // ─── Tour Sequence: screen + how long to stay (ms) ───
  // Logical user journey through all roles
  const TOUR_STEPS: { screen: ScreenName; dwell: number }[] = [
    // ── Act 1: Auth (pearl_gate) ──
    { screen: 'landing',          dwell: 4000 },  // First impression
    { screen: 'login',            dwell: 3000 },  // Quick — just buttons
    { screen: 'phone-verify',     dwell: 3500 },  // OTP animation
    // ── Act 2: Onboarding (pearl_gate continues) ──
    { screen: 'onboarding',       dwell: 5000 },  // Hybrid wizard — linger
    // ── Act 3: Admin (pulse_in_the_hall) ──
    { screen: 'admin-dashboard',  dwell: 5000 },  // Hero dashboard — linger
    { screen: 'queue',            dwell: 3000 },  // Service screen
    { screen: 'payroll',          dwell: 3000 },
    { screen: 'admin-bills',      dwell: 3000 },
    { screen: 'maintenance',      dwell: 3000 },
    // ── Act 4: Finance Flow (blessing_hush) ──
    { screen: 'finance-welcome',  dwell: 3000 },  // Intro
    { screen: 'finance-chat',     dwell: 5000 },  // AI chat — linger
    { screen: 'finance-summary',  dwell: 4000 },  // Review
    { screen: 'finance-dispatch', dwell: 3000 },  // Sending
    { screen: 'finance-waiting',  dwell: 3500 },  // Anticipation
    { screen: 'finance-celebration', dwell: 4000 }, // Triumph moment
    // ── Act 5: Mother (mothers_embrace) ──
    { screen: 'mother-dashboard', dwell: 5000 },  // New perspective
    { screen: 'mother-request',   dwell: 3500 },
    { screen: 'mother-bills',     dwell: 3000 },
    { screen: 'mother-balance',   dwell: 3000 },
    { screen: 'mother-gratitude', dwell: 3500 },  // Emotional
    { screen: 'mother-sos',       dwell: 4000 },  // Dramatic
    // ── Act 6: Brother (pulse_in_the_hall) ──
    { screen: 'brother-dashboard', dwell: 4000 },
    { screen: 'brother-audit',     dwell: 3000 },
    { screen: 'brother-contribution', dwell: 3500 },
    // ── Act 7: Observer (pulse_in_the_hall) ──
    { screen: 'observer-dashboard', dwell: 4000 },
    { screen: 'observer-feed',      dwell: 3000 },
    { screen: 'observer-celebrations', dwell: 3500 },
    // ── Epilogue: Settings ──
    { screen: 'settings',          dwell: 3000 },
    { screen: 'notifications',     dwell: 3000 },
  ];

  useEffect(() => {
    const unsubscribe = audioService.subscribe(() => {
      setMusicEnabled(audioService.isEnabled());
      setCurrentTrack(audioService.getCurrentTrack());
    });
    return unsubscribe;
  }, []);

  useEffect(() => { autoPlayRef.current = autoPlay; }, [autoPlay]);

  useEffect(() => {
    if (!autoPlay) {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      return;
    }
    const tick = () => {
      if (!autoPlayRef.current) return;
      autoPlayIndex.current = (autoPlayIndex.current + 1) % TOUR_STEPS.length;
      const step = TOUR_STEPS[autoPlayIndex.current];
      // Sync role when crossing role boundaries
      const stepRole = getRoleForScreen(step.screen);
      if (stepRole && stepRole !== role) {
        (window as any).__setDemoRole__?.(stepRole);
      }
      navigate(step.screen);
      autoPlayTimer.current = setTimeout(tick, step.dwell);
    };
    // Start first tick using current screen's dwell
    const currentStep = TOUR_STEPS[autoPlayIndex.current];
    autoPlayTimer.current = setTimeout(tick, currentStep?.dwell ?? 4000);
    return () => { if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current); };
  }, [autoPlay, navigate]);

  const toggleMusic = useCallback(() => {
    const newVal = !musicEnabled;
    audioService.setEnabled(newVal);
    if (newVal) audioService.unlock();
  }, [musicEnabled]);

  return (
    <div className="demo-info-panel" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="demo-info-content">
        <h1 className="demo-brand">
          <span className="demo-brand-flower"><WalletRoseIcon size={28} /></span>
          محفظة أمي
        </h1>
        <h2 className="demo-brand-en">Ummi Wallet</h2>
        <p className="demo-tagline">
          {isAr ? 'دعم العائلة بوضوح وكرامة' : 'Family support, made clear.'}<br />
          {isAr ? 'كل شيء واضح، وكل شيء بمحبة' : 'Everything clear, everything with love.'}
        </p>

        <div className="demo-features">
          <div className="demo-feature">
            <span><ChartBloomIcon size={24} /></span>
            <div>
              <strong>{isAr ? 'إدارة مالية موجّهة بالذكاء الاصطناعي' : 'AI-Guided Finance'}</strong>
              <p>{isAr ? 'تقدير ذكي للميزانية مدعوم بتحليل الذكاء الاصطناعي' : 'Smart budget estimation with AI analysis'}</p>
            </div>
          </div>
          <div className="demo-feature">
            <span><PersonFloralIcon size={24} /></span>
            <div>
              <strong>{isAr ? '٤ أدوار، ٢٨ خدمة' : '4 Roles, 28 Modules'}</strong>
              <p>{isAr ? 'الابن المسؤول، الوالدة، الأخ المساهم، الأخت المتابعة' : 'Responsible Son, Mother, Contributing Brother, Observing Sister'}</p>
            </div>
          </div>
          <div className="demo-feature">
            <span><GlobeFlowerIcon size={24} /></span>
            <div>
              <strong>{isAr ? 'ثنائي اللغة عربي/إنجليزي' : 'Bilingual AR/EN'}</strong>
              <p>{isAr ? 'العربية أولًا مع دعم كامل للإنجليزية' : 'Arabic-first with full English support'}</p>
            </div>
          </div>
          <div className="demo-feature">
            <span><RoseSOSIcon size={24} /></span>
            <div>
              <strong>{isAr ? 'طوارئ SOS' : 'Emergency SOS'}</strong>
              <p>{isAr ? 'طلبات طوارئ عائلية فورية' : 'Instant family emergency fund requests'}</p>
            </div>
          </div>
        </div>

        {/* ═══ CONTROLS BAR — Tour + Music + Status ═══ */}
        <div className="demo-controls-bar">
          {/* Auto-play tour */}
          <button
            className={`demo-tour-btn ${autoPlay ? 'playing' : ''}`}
            onClick={() => {
              if (!autoPlay) {
                const idx = TOUR_STEPS.findIndex(s => s.screen === screen);
                autoPlayIndex.current = idx >= 0 ? idx : 0;
                // Also auto-enable music if not already
                if (!musicEnabled) {
                  audioService.setEnabled(true);
                  audioService.unlock();
                }
              }
              setAutoPlay(!autoPlay);
            }}
          >
            {autoPlay ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
            <span>{autoPlay ? (isAr ? 'إيقاف الجولة مؤقتًا' : 'Pause Tour') : (isAr ? 'الجولة التلقائية' : 'Auto Tour')}</span>
          </button>

          {/* Music toggle */}
          <button
            className={`demo-music-toggle ${musicEnabled ? 'on' : ''}`}
            onClick={toggleMusic}
          >
            {musicEnabled ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>

        {/* Now playing */}
        {currentTrack && musicEnabled && (
          <div className="demo-now-playing-inline">
            <span className="demo-np-dot" />
            <span className="demo-np-label">{(isAr ? TRACK_LABELS_AR : TRACK_LABELS_EN)[currentTrack] || currentTrack}</span>
          </div>
        )}

        {/* Status bar */}
        <div className="demo-status-bar">
          <SeedlingIcon size={12} />
          <span>{screen}</span>
          <span className="demo-status-sep">·</span>
          <span>{role}</span>
          <span className="demo-status-sep">·</span>
          <span>{lang.toUpperCase()}</span>
        </div>

        <p className="demo-credit">
          {isAr
            ? <>من تطوير <strong>MomenCrafts</strong> · الرياض، السعودية</>
            : <>Built by <strong>MomenCrafts</strong> · Riyadh, Saudi Arabia</>
          }
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
    <FamilyStateProvider>
      <div className="demo-container">
        {/* Left: Info panel + controls */}
        <InfoPanel />

        {/* Center: Phone */}
        <PhoneFrame>
          <ScreenRouter />
        </PhoneFrame>

        {/* Right: Role selector */}
        <RolePanel />
      </div>
    </FamilyStateProvider>
    </NavigationProvider>
  );
}
