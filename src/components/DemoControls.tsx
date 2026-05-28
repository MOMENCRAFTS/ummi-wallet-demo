/**
 * DemoControls — Floating panel for investors/viewers
 * Role switcher, language toggle, screen selector, music controls
 * Zero emoji — all SVG FloralIcons
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation, type AppRole, type ScreenName } from '../navigation';
import { audioService } from '../lib/audioService';
import {
  CrownFloralIcon, HeartLeafIcon, PersonFloralIcon, EyeLeafIcon,
  SettingsGearIcon, WalletRoseIcon, ChartBloomIcon, ChatBubbleLeafIcon,
  QueueScrollIcon, RoseSOSIcon, SeedlingIcon,
} from './icons/FloralIcons';

const ROLE_OPTIONS: { id: AppRole; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'admin', label: 'Admin (Lead)', Icon: CrownFloralIcon },
  { id: 'mother', label: 'Mother', Icon: HeartLeafIcon },
  { id: 'brother', label: 'Contributor', Icon: PersonFloralIcon },
  { id: 'observer', label: 'Observer', Icon: EyeLeafIcon },
];

const QUICK_SCREENS: { label: string; screen: ScreenName; group: string }[] = [
  { label: 'Landing', screen: 'landing', group: 'Auth' },
  { label: 'Login', screen: 'login', group: 'Auth' },
  { label: 'Admin Hub', screen: 'admin-dashboard', group: 'Admin' },
  { label: 'Finance Welcome', screen: 'finance-welcome', group: 'Finance' },
  { label: 'AI Chat', screen: 'finance-chat', group: 'Finance' },
  { label: 'Summary', screen: 'finance-summary', group: 'Finance' },
  { label: 'Waiting Room', screen: 'finance-waiting', group: 'Finance' },
  { label: 'Celebration', screen: 'finance-celebration', group: 'Finance' },
  { label: 'Mother Home', screen: 'mother-dashboard', group: 'Mother' },
  { label: 'Request Money', screen: 'mother-request', group: 'Mother' },
  { label: 'Bills', screen: 'mother-bills', group: 'Mother' },
  { label: 'History', screen: 'mother-history', group: 'Mother' },
  { label: 'Gratitude', screen: 'mother-gratitude', group: 'Mother' },
  { label: 'SOS', screen: 'mother-sos', group: 'Mother' },
  { label: 'Brother Home', screen: 'brother-dashboard', group: 'Brother' },
  { label: 'Plan Audit', screen: 'brother-audit', group: 'Brother' },
  { label: 'Pay Direct', screen: 'brother-contribution', group: 'Brother' },
  { label: 'Observer Home', screen: 'observer-dashboard', group: 'Observer' },
];

// Track name to display label
const TRACK_LABELS: Record<string, string> = {
  pearl_gate: 'Pearl Gate',
  mothers_embrace: "Mother's Embrace",
  pulse_in_the_hall: 'Pulse in the Hall',
  blessing_hush: 'Blessing Hush',
  celebration_bloom: 'Celebration Bloom',
  step_complete: 'Step Complete',
};

export default function DemoControls() {
  const { role, lang, screen, setRole, setLang, navigate } = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(audioService.isEnabled());
  const [currentTrack, setCurrentTrack] = useState(audioService.getCurrentTrack());
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef(autoPlay);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayIndex = useRef(0);

  // Happy-path auto-play sequence
  const AUTO_SCREENS: ScreenName[] = [
    'landing', 'login', 'admin-dashboard',
    'finance-welcome', 'finance-chat', 'finance-summary',
    'finance-waiting', 'finance-celebration',
    'mother-dashboard', 'mother-request', 'mother-bills', 'mother-gratitude',
    'mother-sos',
    'brother-dashboard', 'brother-audit', 'brother-contribution',
    'observer-dashboard',
  ];

  // Subscribe to audio state changes
  useEffect(() => {
    const unsubscribe = audioService.subscribe(() => {
      setMusicEnabled(audioService.isEnabled());
      setCurrentTrack(audioService.getCurrentTrack());
    });
    return unsubscribe;
  }, []);

  // Keep ref in sync
  useEffect(() => { autoPlayRef.current = autoPlay; }, [autoPlay]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay) {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      return;
    }

    const tick = () => {
      if (!autoPlayRef.current) return;
      autoPlayIndex.current = (autoPlayIndex.current + 1) % AUTO_SCREENS.length;
      navigate(AUTO_SCREENS[autoPlayIndex.current]);
      autoPlayTimer.current = setTimeout(tick, 4000);
    };

    autoPlayTimer.current = setTimeout(tick, 4000);
    return () => { if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current); };
  }, [autoPlay, navigate]);

  // Pause auto-play on manual interaction
  const pauseAutoPlay = useCallback(() => {
    if (autoPlay) {
      setAutoPlay(false);
    }
  }, [autoPlay]);

  const toggleMusic = useCallback(() => {
    const newVal = !musicEnabled;
    audioService.setEnabled(newVal);
    if (newVal) {
      audioService.unlock();
    }
  }, [musicEnabled]);

  return (
    <div className={`demo-controls ${expanded ? 'expanded' : ''}`}>
      {/* Toggle button */}
      <button
        className="demo-controls-toggle"
        onClick={() => setExpanded(!expanded)}
        title="Demo Controls"
      >
        {expanded ? '✕' : <SettingsGearIcon size={18} />}
      </button>

      {expanded && (
        <div className="demo-controls-panel">
          <h3 className="demo-controls-title">Demo Controls</h3>

          {/* Auto-Play */}
          <div className="demo-section">
            <label className="demo-section-label">Auto-Play</label>
            <button
              className={`demo-autoplay-btn ${autoPlay ? 'active' : ''}`}
              onClick={() => {
                if (!autoPlay) {
                  autoPlayIndex.current = AUTO_SCREENS.indexOf(screen as ScreenName);
                  if (autoPlayIndex.current < 0) autoPlayIndex.current = 0;
                }
                setAutoPlay(!autoPlay);
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {autoPlay ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                )}
                {autoPlay ? 'Playing...' : 'Start Tour'}
              </span>
            </button>
          </div>

          {/* Music Controls */}
          <div className="demo-section">
            <label className="demo-section-label">Music</label>
            <div className="demo-music-controls">
              <button
                className={`demo-music-btn ${musicEnabled ? 'active' : ''}`}
                onClick={toggleMusic}
              >
                <span className="demo-music-icon">
                  {musicEnabled ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  )}
                </span>
                <span>{musicEnabled ? 'On' : 'Off'}</span>
              </button>
              {currentTrack && musicEnabled && (
                <div className="demo-now-playing">
                  <span className="demo-now-playing-dot" />
                  <span className="demo-now-playing-label">
                    {TRACK_LABELS[currentTrack] || currentTrack}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Role Switcher */}
          <div className="demo-section">
            <label className="demo-section-label">Role</label>
            <div className="demo-role-grid">
              {ROLE_OPTIONS.map(r => (
                <button
                  key={r.id}
                  className={`demo-role-btn ${role === r.id ? 'active' : ''}`}
                  onClick={() => { pauseAutoPlay(); setRole(r.id); }}
                >
                  <span><r.Icon size={18} /></span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="demo-section">
            <label className="demo-section-label">Language</label>
            <div className="demo-lang-toggle">
              <button
                className={`demo-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                className={`demo-lang-btn ${lang === 'ar' ? 'active' : ''}`}
                onClick={() => setLang('ar')}
              >
                AR عربي
              </button>
            </div>
          </div>

          {/* Screen Selector */}
          <div className="demo-section">
            <label className="demo-section-label">Jump to Screen</label>
            <div className="demo-screen-list">
              {QUICK_SCREENS.map(s => (
                <button
                  key={s.screen}
                  className={`demo-screen-btn ${screen === s.screen ? 'active' : ''}`}
                  onClick={() => { pauseAutoPlay(); navigate(s.screen); }}
                >
                  <span className="demo-screen-group">{s.group}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current */}
          <div className="demo-current">
            <SeedlingIcon size={14} /> {screen} · {role} · {lang.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}
