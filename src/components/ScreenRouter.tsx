/**
 * ScreenRouter — Renders the current screen based on navigation state
 * Wraps each screen in an animated transition
 * Now includes: splash video on first load + audio crossfades per screen
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation, type ScreenName } from '../navigation';
import { audioService, type TrackName } from '../lib/audioService';

// Screen imports
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import FinanceWelcomeScreen from './screens/FinanceWelcomeScreen';
import FinanceChatScreen from './screens/FinanceChatScreen';
import FinanceSummaryScreen from './screens/FinanceSummaryScreen';
import WaitingRoomScreen from './screens/WaitingRoomScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import MotherDashboard from './screens/MotherDashboard';
import MotherSOSScreen from './screens/MotherSOSScreen';
import BrotherDashboard from './screens/BrotherDashboard';
import ObserverDashboard from './screens/ObserverDashboard';
import PlaceholderScreen from './screens/PlaceholderScreen';
import SplashVideo from './videos/SplashVideo';

const screenMap: Record<string, React.ComponentType> = {
  'landing': LandingScreen,
  'login': LoginScreen,
  'admin-dashboard': AdminDashboard,
  'finance-welcome': FinanceWelcomeScreen,
  'finance-chat': FinanceChatScreen,
  'finance-summary': FinanceSummaryScreen,
  'finance-waiting': WaitingRoomScreen,
  'finance-celebration': CelebrationScreen,
  'mother-dashboard': MotherDashboard,
  'mother-sos': MotherSOSScreen,
  'brother-dashboard': BrotherDashboard,
  'observer-dashboard': ObserverDashboard,
};

// Map screens to their ambient music tracks
function getTrackForScreen(screen: ScreenName): TrackName | null {
  if (screen === 'landing' || screen === 'login') return 'pearl_gate';
  if (screen.startsWith('admin') || screen.startsWith('brother') || screen.startsWith('observer')) return 'pulse_in_the_hall';
  if (screen.startsWith('mother')) return 'mothers_embrace';
  if (screen.startsWith('finance')) return 'blessing_hush';
  return null;
}

const slideVariants = {
  enter: { x: '100%', opacity: 0.8 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-30%', opacity: 0.5 },
};

export default function ScreenRouter() {
  const { screen } = useNavigation();
  const [showSplash, setShowSplash] = useState(true);
  const prevScreenRef = useRef<ScreenName | null>(null);
  const audioInitialized = useRef(false);

  // Initialize audio on mount
  useEffect(() => {
    audioService.preload();
  }, []);

  // Handle audio crossfades on screen change
  useEffect(() => {
    if (showSplash) return; // Don't start music during splash

    const newTrack = getTrackForScreen(screen);
    const prevTrack = prevScreenRef.current ? getTrackForScreen(prevScreenRef.current) : null;

    if (newTrack && newTrack !== prevTrack) {
      if (!audioInitialized.current) {
        // First screen after splash — play directly
        audioService.play(newTrack);
        audioInitialized.current = true;
      } else {
        audioService.crossfadeTo(newTrack);
      }
    }

    prevScreenRef.current = screen;
  }, [screen, showSplash]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const ScreenComponent = screenMap[screen] || PlaceholderScreen;

  return (
    <div className="screen-router">
      {showSplash ? (
        <SplashVideo onComplete={handleSplashComplete} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            className="screen-wrapper"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            <ScreenComponent />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
