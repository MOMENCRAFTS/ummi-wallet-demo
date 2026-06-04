/**
 * Ummi Wallet — Interactive Demo App
 * momencrafts.com/ummi-wallet/
 *
 * Three-column layout: Info Panel | Phone | Role Selector  (desktop)
 * Full-screen native feel + floating role pill             (mobile)
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

/* ─── Shared Role Data ─── */
const ROLES: {
  id: AppRole;
  label: string; labelAr: string;
  persona: string; personaAr: string;
  desc: string; descAr: string;
  Icon: React.ComponentType<{ size?: number }>;
}[] = [
  { id: 'admin',    label: 'Responsible Son',      labelAr: 'الابن المسؤول',   persona: 'Momen',      personaAr: 'مؤمن',        desc: 'Manages budget, approves requests, oversees the family plan', descAr: 'يدير الميزانية، ويعتمد الطلبات، ويشرف على خطة العائلة', Icon: CrownFloralIcon },
  { id: 'mother',   label: 'Mother',               labelAr: 'الوالدة',          persona: 'Um Sousan',  personaAr: 'الأم سوسن',   desc: 'Requests money, pays bills, sends gratitude',                 descAr: 'تطلب مبالغ، وتدفع الفواتير، وترسل الشكر',              Icon: HeartLeafIcon },
  { id: 'brother',  label: 'Contributing Brother', labelAr: 'الأخ المساهم',    persona: 'Mazen',      personaAr: 'مازن',        desc: 'Pays his share, views pending approvals',                     descAr: 'يسدد حصته ويتابع الموافقات المعلّقة',                   Icon: PersonFloralIcon },
  { id: 'observer', label: 'Observing Sister',     labelAr: 'الأخت المتابعة',  persona: 'Noor',       personaAr: 'نور',         desc: 'Views family feed, celebrations, gratitude',                  descAr: 'تتابع أخبار العائلة والمناسبات ورسائل الشكر',           Icon: EyeLeafIcon },
];

/* ─── Tour Steps ─── */
const TOUR_STEPS: { screen: ScreenName; dwell: number }[] = [
  { screen: 'landing',              dwell: 4000 },
  { screen: 'login',                dwell: 3000 },
  { screen: 'phone-verify',         dwell: 3500 },
  { screen: 'onboarding',           dwell: 5000 },
  { screen: 'admin-dashboard',      dwell: 5000 },
  { screen: 'queue',                dwell: 3000 },
  { screen: 'payroll',              dwell: 3000 },
  { screen: 'admin-bills',          dwell: 3000 },
  { screen: 'maintenance',          dwell: 3000 },
  { screen: 'finance-welcome',      dwell: 3000 },
  { screen: 'finance-chat',         dwell: 5000 },
  { screen: 'finance-summary',      dwell: 4000 },
  { screen: 'finance-dispatch',     dwell: 3000 },
  { screen: 'finance-waiting',      dwell: 3500 },
  { screen: 'finance-celebration',  dwell: 4000 },
  { screen: 'mother-dashboard',     dwell: 5000 },
  { screen: 'mother-request',       dwell: 3500 },
  { screen: 'mother-bills',         dwell: 3000 },
  { screen: 'mother-balance',       dwell: 3000 },
  { screen: 'mother-gratitude',     dwell: 3500 },
  { screen: 'mother-sos',           dwell: 4000 },
  { screen: 'mother-health',        dwell: 4500 },
  { screen: 'mother-visit',         dwell: 5000 },
  { screen: 'admin-medical-review', dwell: 4500 },
  { screen: 'brother-dashboard',    dwell: 4000 },
  { screen: 'brother-audit',        dwell: 3000 },
  { screen: 'brother-contribution', dwell: 3500 },
  { screen: 'observer-dashboard',   dwell: 4000 },
  { screen: 'observer-feed',        dwell: 3000 },
  { screen: 'observer-celebrations',dwell: 3500 },
  { screen: 'settings',             dwell: 3000 },
  { screen: 'notifications',        dwell: 3000 },
];

/* ─── Role-from-screen helper ─── */
function getRoleForScreen(s: ScreenName): AppRole | null {
  if (s.startsWith('admin') || s.startsWith('finance') || s.startsWith('queue') ||
      s.startsWith('payroll') || s === 'maintenance' || s.startsWith('reservoir') ||
      s.startsWith('settlement') || s.startsWith('pulse') || s.startsWith('reports') ||
      s.startsWith('members') || s.startsWith('projects') || s.startsWith('celebrations-list') ||
      s.startsWith('documents')) return 'admin';
  if (s.startsWith('mother')) return 'mother';
  if (s.startsWith('brother')) return 'brother';
  if (s.startsWith('observer')) return 'observer';
  return null;
}

/* ─── Track labels (bilingual) ─── */
const TRACK_LABELS_EN: Record<string, string> = {
  pearl_gate: 'Pearl Gate', mothers_embrace: "Mother's Embrace",
  pulse_in_the_hall: 'Pulse in the Hall', blessing_hush: 'Blessing Hush',
  celebration_bloom: 'Celebration Bloom', step_complete: 'Step Complete',
};
const TRACK_LABELS_AR: Record<string, string> = {
  pearl_gate: 'بوابة اللؤلؤ', mothers_embrace: 'حضن الوالدة',
  pulse_in_the_hall: 'نبض المجلس', blessing_hush: 'همس البركة',
  celebration_bloom: 'تفتّح الفرح', step_complete: 'اكتملت الخطوة',
};

/* ─── NudgeState type ─── */
interface NudgeState {
  phase: 'idle' | 'red' | 'suggest';
  wrongRole: AppRole | null;
  correctRole: AppRole | null;
}
const IDLE_NUDGE: NudgeState = { phase: 'idle', wrongRole: null, correctRole: null };

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */

/* ─── useIsMobile ─── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

/* ─── useAutoTour ─── */
function useAutoTour() {
  const { screen, role, navigate } = useNavigation();
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef(autoPlay);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayIndex = useRef(0);

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
      const stepRole = getRoleForScreen(step.screen);
      if (stepRole && stepRole !== role) {
        (window as any).__setDemoRole__?.(stepRole);
      }
      navigate(step.screen);
      autoPlayTimer.current = setTimeout(tick, step.dwell);
    };
    const currentStep = TOUR_STEPS[autoPlayIndex.current];
    autoPlayTimer.current = setTimeout(tick, currentStep?.dwell ?? 4000);
    return () => { if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current); };
  }, [autoPlay, navigate]);

  const startTour = useCallback(() => {
    const idx = TOUR_STEPS.findIndex(s => s.screen === screen);
    autoPlayIndex.current = idx >= 0 ? idx : 0;
    if (!audioService.isEnabled()) {
      audioService.setEnabled(true);
      audioService.unlock();
    }
    setAutoPlay(true);
  }, [screen]);

  const pauseTour = useCallback(() => setAutoPlay(false), []);
  const toggleTour = useCallback(() => {
    if (autoPlay) pauseTour(); else startTour();
  }, [autoPlay, startTour, pauseTour]);

  return { autoPlay, toggleTour };
}

/* ─── useRoleNudge ─── */
function useRoleNudge(autoPlay: boolean) {
  const { screen, role } = useNavigation();
  const [nudge, setNudge] = useState<NudgeState>(IDLE_NUDGE);
  const nudgedScreens = useRef<Set<ScreenName>>(new Set());
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep a ref always in sync — avoids stale closure in the screen-change effect
  const autoPlayRef = useRef(autoPlay);
  useEffect(() => { autoPlayRef.current = autoPlay; }, [autoPlay]);

  // Reset nudgedScreens when role changes manually (fresh start)
  const prevRoleRef = useRef(role);
  useEffect(() => {
    if (prevRoleRef.current !== role) {
      nudgedScreens.current.clear();
      prevRoleRef.current = role;
      setNudge(IDLE_NUDGE);
    }
  }, [role]);

  useEffect(() => {
    // Always read the ref — not the closed-over prop value
    if (autoPlayRef.current) return;

    const correctRole = getRoleForScreen(screen);

    // No mismatch — clear any active nudge
    if (!correctRole || correctRole === role) {
      if (nudge.phase !== 'idle') setNudge(IDLE_NUDGE);
      return;
    }

    // Already nudged this screen this session
    if (nudgedScreens.current.has(screen)) return;
    nudgedScreens.current.add(screen);

    // Clear previous timers
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);

    // Phase 1: red flash + shake
    setNudge({ phase: 'red', wrongRole: role, correctRole });

    // Phase 2: mint glow + badge (after 800ms)
    phaseTimer.current = setTimeout(() => {
      setNudge(n => ({ ...n, phase: 'suggest' }));
    }, 800);

    // Auto-dismiss (after 4s total)
    dismissTimer.current = setTimeout(() => {
      setNudge(IDLE_NUDGE);
    }, 4000);

    return () => {
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [screen]); // only re-run on screen change; autoPlay read via ref

  const dismiss = useCallback(() => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setNudge(IDLE_NUDGE);
  }, []);

  return { nudge, dismiss };
}

/* ═══════════════════════════════════════════════
   DESKTOP COMPONENTS
═══════════════════════════════════════════════ */

/* ─── Role Selector Panel (right side — desktop only) ─── */
function RolePanel({ nudge, dismiss }: { nudge: NudgeState; dismiss: () => void }) {
  const { role, setRole, lang, setLang } = useNavigation();
  const isAr = lang === 'ar';

  const handleRoleClick = (id: AppRole) => {
    if (nudge.phase !== 'idle') dismiss();
    setRole(id);
  };

  return (
    <div className="role-panel">
      <h3 className="role-panel-title">{isAr ? 'اختر دورك' : 'Choose Role'}</h3>
      <p className="role-panel-subtitle">
        {isAr ? 'استعرض التطبيق من منظور كل فرد في العائلة' : "See the app from each family member's perspective"}
      </p>

      <div className="role-panel-grid">
        {ROLES.map(r => {
          const isWrong   = nudge.phase !== 'idle'     && nudge.wrongRole   === r.id;
          const isCorrect = nudge.phase === 'suggest'  && nudge.correctRole === r.id;
          return (
            <button
              key={r.id}
              className={[
                'role-card',
                role === r.id   ? 'active'        : '',
                isWrong         ? 'nudge-wrong'   : '',
                isCorrect       ? 'nudge-correct' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => handleRoleClick(r.id)}
            >
              <div className="role-card-icon">
                <r.Icon size={24} />
              </div>
              <div className="role-card-text">
                <span className="role-card-persona">{isAr ? r.personaAr : r.persona}</span>
                <span className="role-card-label">{isAr ? r.labelAr : r.label}</span>
                <span className="role-card-desc">{isAr ? r.descAr : r.desc}</span>
              </div>
              {role === r.id && <div className="role-card-active-dot" />}
              {/* Switch nudge badge */}
              {isCorrect && (
                <div className="nudge-badge">
                  {isAr ? 'انتقل لرؤية هذه الشاشة ←' : 'Switch to see this screen →'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Language toggle */}
      <div className="role-panel-lang">
        <button className={`role-lang-btn ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>
          عربي
        </button>
        <button className={`role-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
          English
        </button>
      </div>
    </div>
  );
}

/* ─── Info Panel (left side — desktop only) ─── */
function InfoPanel({ autoPlay, toggleTour }: { autoPlay: boolean; toggleTour: () => void }) {
  const { lang, screen } = useNavigation();
  const isAr = lang === 'ar';
  const [musicEnabled, setMusicEnabled] = useState(audioService.isEnabled());
  const [currentTrack, setCurrentTrack] = useState(audioService.getCurrentTrack());

  useEffect(() => {
    const unsub = audioService.subscribe(() => {
      setMusicEnabled(audioService.isEnabled());
      setCurrentTrack(audioService.getCurrentTrack());
    });
    return unsub;
  }, []);

  const toggleMusic = useCallback(() => {
    const v = !musicEnabled;
    audioService.setEnabled(v);
    if (v) audioService.unlock();
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

        <div className="demo-controls-bar">
          <button className={`demo-tour-btn ${autoPlay ? 'playing' : ''}`} onClick={toggleTour}>
            {autoPlay
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            }
            <span>{autoPlay ? (isAr ? 'إيقاف الجولة مؤقتًا' : 'Pause Tour') : (isAr ? 'الجولة التلقائية' : 'Auto Tour')}</span>
          </button>
          <button className={`demo-music-toggle ${musicEnabled ? 'on' : ''}`} onClick={toggleMusic}>
            {musicEnabled
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
            }
          </button>
        </div>

        {currentTrack && musicEnabled && (
          <div className="demo-now-playing-inline">
            <span className="demo-np-dot" />
            <span className="demo-np-label">{(isAr ? TRACK_LABELS_AR : TRACK_LABELS_EN)[currentTrack] || currentTrack}</span>
          </div>
        )}

        <div className="demo-status-bar">
          <SeedlingIcon size={12} />
          <span>{screen}</span>
          <span className="demo-status-sep">·</span>
          <span>{lang.toUpperCase()}</span>
        </div>

        <p className="demo-credit">
          {isAr ? <><strong>MomenCrafts</strong> · الرياض، السعودية</> : <>Built by <strong>MomenCrafts</strong> · Riyadh, Saudi Arabia</>}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MOBILE COMPONENTS
═══════════════════════════════════════════════ */

/* ─── Mobile Role Bottom Sheet ─── */
function MobileRoleSheet({
  open, onClose, nudge, dismiss,
}: {
  open: boolean;
  onClose: () => void;
  nudge: NudgeState;
  dismiss: () => void;
}) {
  const { role, setRole, lang, setLang } = useNavigation();
  const isAr = lang === 'ar';

  const handleRoleSelect = (id: AppRole) => {
    if (nudge.phase !== 'idle') dismiss();
    setRole(id);
    onClose();
  };

  return (
    <>
      <div className={`mobile-sheet-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`mobile-role-sheet ${open ? 'open' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="mobile-sheet-handle" />
        <h3 className="mobile-sheet-title">{isAr ? 'اختر دورك' : 'Choose Role'}</h3>
        <p className="mobile-sheet-subtitle">
          {isAr ? 'استعرض التطبيق من منظور كل فرد في العائلة' : "See the app from each family member's perspective"}
        </p>

        <div className="mobile-role-grid">
          {ROLES.map(r => {
            const isCorrect = nudge.phase === 'suggest' && nudge.correctRole === r.id;
            return (
              <button
                key={r.id}
                className={[
                  'mobile-role-card',
                  role === r.id ? 'active'        : '',
                  isCorrect     ? 'nudge-correct' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleRoleSelect(r.id)}
              >
                <div className="mobile-role-card-icon"><r.Icon size={28} /></div>
                <span className="mobile-role-card-persona">{isAr ? r.personaAr : r.persona}</span>
                <span className="mobile-role-card-label">{isAr ? r.labelAr : r.label}</span>
                {role === r.id && <div className="mobile-role-card-dot" />}
                {isCorrect && (
                  <div className="nudge-badge nudge-badge-mobile">
                    {isAr ? 'انتقل ←' : 'Switch →'}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mobile-sheet-lang">
          <button className={`mobile-lang-btn ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>عربي</button>
          <button className={`mobile-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
        </div>
      </div>
    </>
  );
}

/* ─── Mobile Role Pill (floating bar at bottom) ─── */
function MobileRolePill({ nudge, dismiss, autoPlay, toggleTour }: { nudge: NudgeState; dismiss: () => void; autoPlay: boolean; toggleTour: () => void }) {
  const { role, setRole, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [sheetOpen, setSheetOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(audioService.isEnabled());

  useEffect(() => {
    const unsub = audioService.subscribe(() => setMusicEnabled(audioService.isEnabled()));
    return unsub;
  }, []);

  const toggleMusic = useCallback(() => {
    const v = !musicEnabled;
    audioService.setEnabled(v);
    if (v) audioService.unlock();
  }, [musicEnabled]);

  const activeRole = ROLES.find(r => r.id === role)!;
  const correctRoleData = nudge.correctRole ? ROLES.find(r => r.id === nudge.correctRole) : null;

  // When user taps the pill center while in suggest phase → switch role immediately
  const handlePillCenterClick = () => {
    if (nudge.phase === 'suggest' && nudge.correctRole) {
      dismiss();
      setRole(nudge.correctRole);
    } else {
      setSheetOpen(true);
    }
  };

  const pillCenterClass = [
    'mobile-pill-role',
    nudge.phase === 'red'     ? 'nudge-red'     : '',
    nudge.phase === 'suggest' ? 'nudge-suggest'  : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <MobileRoleSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        nudge={nudge}
        dismiss={dismiss}
      />

      <div className="mobile-role-pill" dir={isAr ? 'rtl' : 'ltr'}>
        {/* Left: Auto Tour */}
        <button
          className={`mobile-pill-btn mobile-pill-tour ${autoPlay ? 'active' : ''}`}
          onClick={toggleTour}
          title={autoPlay ? 'Pause Tour' : 'Auto Tour'}
        >
          {autoPlay
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          }
        </button>

        {/* Center: Role display (morphs during nudge) */}
        <button className={pillCenterClass} onClick={handlePillCenterClick}>
          {nudge.phase === 'suggest' && correctRoleData ? (
            /* Phase 2: morph to show correct role + bouncing arrow */
            <div className="mobile-pill-suggest">
              <span className="mobile-pill-role-icon" style={{ color: 'var(--mint)' }}>
                <correctRoleData.Icon size={18} />
              </span>
              <span className="mobile-pill-role-label" style={{ color: 'var(--mint)' }}>
                {isAr ? correctRoleData.labelAr : correctRoleData.label}
              </span>
              <span className="nudge-arrow">{isAr ? '←' : '→'}</span>
            </div>
          ) : (
            /* Normal: show active role */
            <>
              <span className="mobile-pill-role-icon"><activeRole.Icon size={18} /></span>
              <span className="mobile-pill-role-label">{isAr ? activeRole.labelAr : activeRole.label}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mobile-pill-chevron">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </>
          )}
        </button>

        {/* Right: Music toggle */}
        <button
          className={`mobile-pill-btn mobile-pill-music ${musicEnabled ? 'active' : ''}`}
          onClick={toggleMusic}
          title={musicEnabled ? 'Mute Music' : 'Play Music'}
        >
          {musicEnabled
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
          }
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   APP INNER (needs nav context for nudge hook)
═══════════════════════════════════════════════ */
function AppInner() {
  const isMobile = useIsMobile();
  // Single source of truth for tour state — passed to both InfoPanel and MobileRolePill
  const { autoPlay, toggleTour } = useAutoTour();
  const { nudge, dismiss } = useRoleNudge(autoPlay);

  return isMobile ? (
    /* ── Mobile: full-screen phone + floating pill ── */
    <div className="demo-container-mobile">
      <PhoneFrame><ScreenRouter /></PhoneFrame>
      <MobileRolePill nudge={nudge} dismiss={dismiss} autoPlay={autoPlay} toggleTour={toggleTour} />
    </div>
  ) : (
    /* ── Desktop: 3-column shell ── */
    <div className="demo-container">
      <InfoPanel autoPlay={autoPlay} toggleTour={toggleTour} />
      <PhoneFrame><ScreenRouter /></PhoneFrame>
      <RolePanel nudge={nudge} dismiss={dismiss} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
export default function App() {
  return (
    <NavigationProvider>
      <FamilyStateProvider>
        <AppInner />
      </FamilyStateProvider>
    </NavigationProvider>
  );
}
