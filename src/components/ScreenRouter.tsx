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
import MotherRequestScreen from './screens/MotherRequestScreen';
import MotherBillsScreen from './screens/MotherBillsScreen';
import MotherHistoryScreen from './screens/MotherHistoryScreen';
import MotherGratitudeScreen from './screens/MotherGratitudeScreen';
import BrotherDashboard from './screens/BrotherDashboard';
import BrotherAuditScreen from './screens/BrotherAuditScreen';
import BrotherContributionScreen from './screens/BrotherContributionScreen';
import ObserverDashboard from './screens/ObserverDashboard';
import HybridOnboardingScreen from './screens/HybridOnboardingScreen';
import PhoneVerifyScreen from './screens/PhoneVerifyScreen';
import PendingScreen from './screens/PendingScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import ServiceScreen from './screens/ServiceScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import SplashVideo from './videos/SplashVideo';

// Phase 1 — Admin Services
import QueueScreen from './screens/QueueScreen';
import PayrollScreen from './screens/PayrollScreen';
import AdminBillsScreen from './screens/AdminBillsScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';
import ReservoirScreen from './screens/ReservoirScreen';
import SettlementScreen from './screens/SettlementScreen';
import PulseScreen from './screens/PulseScreen';
import ReportsScreen from './screens/ReportsScreen';
import MembersScreen from './screens/MembersScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import CelebrationsScreen from './screens/CelebrationsScreen';
import DocumentsScreen from './screens/DocumentsScreen';

// Phase 2 — Finance Flow
import FinanceCurrencyScreen from './screens/FinanceCurrencyScreen';
import FinanceDispatchScreen from './screens/FinanceDispatchScreen';
import FinanceAuditContributorScreen from './screens/FinanceAuditContributorScreen';
import FinanceAuditObserverScreen from './screens/FinanceAuditObserverScreen';
import FinanceRevisionScreen from './screens/FinanceRevisionScreen';
import FinanceFinalApprovalScreen from './screens/FinanceFinalApprovalScreen';
import FinanceReestimationScreen from './screens/FinanceReestimationScreen';
import FinanceReadjustmentScreen from './screens/FinanceReadjustmentScreen';

// Phase 3 — Mother sub-screens
import MotherBalanceScreen from './screens/MotherBalanceScreen';
import MotherCelebrationsScreen from './screens/MotherCelebrationsScreen';
import MotherFeedScreen from './screens/MotherFeedScreen';
import MotherHealthScreen from './screens/MotherHealthScreen';
import MotherHomeCarScreen from './screens/MotherHomeCarScreen';
import MotherSettingsScreen from './screens/MotherSettingsScreen';
import MotherWishesScreen from './screens/MotherWishesScreen';
// Phase 3 — Brother sub-screens
import BrotherHistoryScreen from './screens/BrotherHistoryScreen';
import BrotherPayDirectScreen from './screens/BrotherPayDirectScreen';
import BrotherProofScreen from './screens/BrotherProofScreen';
import BrotherSettlementScreen from './screens/BrotherSettlementScreen';
import BrotherSuggestionsScreen from './screens/BrotherSuggestionsScreen';
// Phase 3 — Observer sub-screens
import ObserverFeedScreen from './screens/ObserverFeedScreen';
import ObserverCelebrationsScreen from './screens/ObserverCelebrationsScreen';
// Phase 4 — Cross-cutting
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
// Phase 5 — New screens (demo sync)
import BarakahGardenScreen from './screens/BarakahGardenScreen';
import AssetsScreen from './screens/AssetsScreen';
import InsurancePoliciesScreen from './screens/InsurancePoliciesScreen';
import MotherAuditScreen from './screens/MotherAuditScreen';
import DisputeScreen from './screens/DisputeScreen';
import TransferToMotherScreen from './screens/TransferToMotherScreen';
import InviteCaregiverScreen from './screens/InviteCaregiverScreen';
import FinancialPulseScreen from './screens/FinancialPulseScreen';
import LegalScreen from './screens/LegalScreen';
// Phase 6 — Care Calendar (039)
import MotherVisitScreen from './screens/MotherVisitScreen';
import AdminMedicalReviewScreen from './screens/AdminMedicalReviewScreen';

const screenMap: Record<string, React.ComponentType> = {
  'landing': LandingScreen,
  'login': LoginScreen,
  'phone-verify': PhoneVerifyScreen,
  'admin-dashboard': AdminDashboard,
  'finance-welcome': FinanceWelcomeScreen,
  'finance-chat': FinanceChatScreen,
  'finance-summary': FinanceSummaryScreen,
  'finance-waiting': WaitingRoomScreen,
  'finance-celebration': CelebrationScreen,
  'mother-dashboard': MotherDashboard,
  'mother-sos': MotherSOSScreen,
  'mother-request': MotherRequestScreen,
  'mother-bills': MotherBillsScreen,
  'mother-history': MotherHistoryScreen,
  'mother-gratitude': MotherGratitudeScreen,
  'brother-dashboard': BrotherDashboard,
  'brother-audit': BrotherAuditScreen,
  'brother-contribution': BrotherContributionScreen,
  'observer-dashboard': ObserverDashboard,
  'onboarding': HybridOnboardingScreen,
  'pending': PendingScreen,
  'chat-list': ChatListScreen,
  'chat-room': ChatRoomScreen,
  // Phase 1 — Admin Services
  'queue': QueueScreen,
  'payroll': PayrollScreen,
  'admin-bills': AdminBillsScreen,
  'maintenance': MaintenanceScreen,
  'reservoir-detail': ReservoirScreen,
  'settlement': SettlementScreen,
  'pulse': PulseScreen,
  'reports': ReportsScreen,
  'members': MembersScreen,
  'projects-list': ProjectsScreen,
  'celebrations-list': CelebrationsScreen,
  'documents': DocumentsScreen,
  // Phase 2 — Finance Flow
  'finance-currency': FinanceCurrencyScreen,
  'finance-dispatch': FinanceDispatchScreen,
  'finance-audit-contributor': FinanceAuditContributorScreen,
  'finance-audit-observer': FinanceAuditObserverScreen,
  'finance-revision': FinanceRevisionScreen,
  'finance-final-approval': FinanceFinalApprovalScreen,
  'finance-reestimation': FinanceReestimationScreen,
  'finance-readjustment': FinanceReadjustmentScreen,
  // Phase 3 — Mother
  'mother-balance': MotherBalanceScreen,
  'mother-celebrations': MotherCelebrationsScreen,
  'mother-feed': MotherFeedScreen,
  'mother-health': MotherHealthScreen,
  'mother-homecar': MotherHomeCarScreen,
  'mother-settings': MotherSettingsScreen,
  'mother-wishes': MotherWishesScreen,
  // Phase 3 — Brother
  'brother-history': BrotherHistoryScreen,
  'brother-pay-direct': BrotherPayDirectScreen,
  'brother-proof': BrotherProofScreen,
  'brother-settlement': BrotherSettlementScreen,
  'brother-suggestions': BrotherSuggestionsScreen,
  // Phase 3 — Observer
  'observer-feed': ObserverFeedScreen,
  'observer-celebrations': ObserverCelebrationsScreen,
  // Phase 4 — Cross-cutting
  'settings': SettingsScreen,
  'notifications': NotificationsScreen,
  // Phase 5 — New screens
  'barakah-garden': BarakahGardenScreen,
  'assets': AssetsScreen,
  'insurance': InsurancePoliciesScreen,
  'mother-audit': MotherAuditScreen,
  'disputes': DisputeScreen,
  'transfer-mother': TransferToMotherScreen,
  'invite-caregiver': InviteCaregiverScreen,
  'financial-pulse': FinancialPulseScreen,
  'legal': LegalScreen,
  // Phase 6 — Care Calendar
  'mother-visit': MotherVisitScreen,
  'admin-medical-review': AdminMedicalReviewScreen,
};

// Map screens to their ambient music tracks
// Covers every screen in the app for smooth soundtrack transitions
function getTrackForScreen(screen: ScreenName): TrackName | null {
  // Auth + Onboarding: warm welcome
  if (['landing', 'login', 'oauth', 'oauth-transition', 'phone-verify',
       'onboarding', 'onboarding-role', 'onboarding-mother', 'onboarding-complete',
       'pending'].includes(screen)) {
    return 'pearl_gate';
  }
  // Finance flow: reverent, focused
  if (screen.startsWith('finance')) return 'blessing_hush';
  // Mother screens: intimate, guiding
  if (screen.startsWith('mother')) return 'mothers_embrace';
  // Admin, Brother, Observer, Services, Settings: uplifting daily
  if (screen.startsWith('admin') || screen.startsWith('brother') ||
      screen.startsWith('observer') || screen === 'settings' ||
      screen === 'notifications' || screen === 'chat-list' || screen === 'chat-room' ||
      screen === 'queue' || screen === 'payroll' || screen === 'admin-bills' ||
      screen === 'maintenance' || screen === 'reservoir-detail' ||
      screen === 'settlement' || screen === 'pulse' || screen === 'reports' ||
      screen === 'members' || screen === 'projects-list' ||
      screen === 'celebrations-list' || screen === 'documents' ||
      screen === 'barakah-garden' || screen === 'assets' || screen === 'insurance' ||
      screen === 'disputes' || screen === 'transfer-mother' || screen === 'invite-caregiver' ||
      screen === 'financial-pulse' || screen === 'legal') {
    return 'pulse_in_the_hall';
  }
  return null;
}

// Screens that should trigger a celebration one-shot on top of the ambient track
const CELEBRATION_SCREENS: ScreenName[] = [
  'finance-celebration', 'mother-gratitude', 'observer-celebrations',
  'onboarding-complete',
];

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
        // First screen after splash — play directly (queued if not yet unlocked)
        audioService.play(newTrack);
        audioInitialized.current = true;
      } else {
        audioService.crossfadeTo(newTrack);
      }
    }

    // Celebration one-shot — delayed 400ms so it fires when screen is visible
    let celebTimer: ReturnType<typeof setTimeout> | null = null;
    if (CELEBRATION_SCREENS.includes(screen)) {
      celebTimer = setTimeout(() => {
        audioService.playOneShot('celebration_bloom', 0.4);
      }, 400);
    }

    prevScreenRef.current = screen;
    return () => { if (celebTimer) clearTimeout(celebTimer); };
  }, [screen, showSplash]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const ScreenComponent = screenMap[screen] || ServiceScreen;

  return (
    <div className="screen-router">
      {showSplash ? (
        <SplashVideo onComplete={handleSplashComplete} />
      ) : (
        <>
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

        </>
      )}
    </div>
  );
}
