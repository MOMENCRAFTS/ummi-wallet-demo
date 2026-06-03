/**
 * App Navigation — State-based router for the demo
 * Simulates React Navigation stack behavior in web
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type AppRole = 'admin' | 'mother' | 'brother' | 'observer';

export type ScreenName =
  // Auth
  | 'landing' | 'login' | 'oauth' | 'oauth-transition' | 'phone-verify'
  // Onboarding
  | 'onboarding' | 'onboarding-role' | 'onboarding-mother' | 'onboarding-complete'
  // Admin
  | 'admin-dashboard'
  // Admin Services
  | 'queue' | 'payroll' | 'admin-bills' | 'maintenance'
  | 'reservoir-detail' | 'settlement' | 'pulse' | 'reports'
  | 'members' | 'projects-list' | 'celebrations-list' | 'documents'
  // Finance
  | 'finance-welcome' | 'finance-currency' | 'finance-chat'
  | 'finance-summary' | 'finance-dispatch' | 'finance-waiting'
  | 'finance-audit-contributor' | 'finance-audit-observer'
  | 'finance-revision' | 'finance-final-approval'
  | 'finance-celebration' | 'finance-reestimation'
  | 'finance-readjustment'
  // Mother
  | 'mother-dashboard' | 'mother-request' | 'mother-sos'
  | 'mother-bills' | 'mother-history' | 'mother-gratitude'
  | 'mother-balance' | 'mother-celebrations' | 'mother-feed'
  | 'mother-health' | 'mother-homecar' | 'mother-settings' | 'mother-wishes'
  | 'mother-audit'
  // Brother
  | 'brother-dashboard' | 'brother-audit' | 'brother-contribution'
  | 'brother-history' | 'brother-pay-direct' | 'brother-proof'
  | 'brother-settlement' | 'brother-suggestions'
  // Observer
  | 'observer-dashboard' | 'observer-feed' | 'observer-celebrations'
  // Cross-role
  | 'pending' | 'settings' | 'notifications'
  // Chat
  | 'chat-list' | 'chat-room'
  // New screens
  | 'barakah-garden' | 'assets' | 'insurance' | 'disputes'
  | 'transfer-mother' | 'invite-caregiver' | 'financial-pulse' | 'legal'
  // Care Calendar (039)
  | 'mother-visit' | 'admin-medical-review';

interface NavigationState {
  screen: ScreenName;
  role: AppRole;
  lang: 'en' | 'ar';
  history: ScreenName[];
  params: Record<string, any>;
}

interface NavigationContextValue extends NavigationState {
  navigate: (screen: ScreenName, params?: Record<string, any>) => void;
  goBack: () => void;
  setRole: (role: AppRole) => void;
  setLang: (lang: 'en' | 'ar') => void;
  reset: (screen: ScreenName) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be inside NavigationProvider');
  return ctx;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavigationState>({
    screen: 'landing',
    role: 'admin',
    lang: 'ar',
    history: [],
    params: {},
  });

  const navigate = useCallback((screen: ScreenName, params: Record<string, any> = {}) => {
    setState(prev => ({
      ...prev,
      screen,
      params,
      history: [...prev.history, prev.screen],
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      if (prev.history.length === 0) return prev;
      const history = [...prev.history];
      const screen = history.pop()!;
      return { ...prev, screen, history, params: {} };
    });
  }, []);

  const setRole = useCallback((role: AppRole) => {
    const dashboards: Record<AppRole, ScreenName> = {
      admin: 'admin-dashboard',
      mother: 'mother-dashboard',
      brother: 'brother-dashboard',
      observer: 'observer-dashboard',
    };
    setState(prev => ({
      ...prev,
      role,
      screen: dashboards[role],
      history: [],
      params: {},
    }));
  }, []);

  // Expose role-only setter for E2E tests (no navigation side-effect)
  const setRoleOnly = useCallback((role: AppRole) => {
    setState(prev => ({ ...prev, role }));
  }, []);
  if (typeof window !== 'undefined') {
    (window as any).__setDemoRole__ = setRoleOnly;
    (window as any).__ummiNavigate__ = navigate;
  }

  const setLang = useCallback((lang: 'en' | 'ar') => {
    setState(prev => ({ ...prev, lang }));
  }, []);

  const reset = useCallback((screen: ScreenName) => {
    setState(prev => ({ ...prev, screen, history: [], params: {} }));
  }, []);

  return (
    <NavigationContext.Provider value={{
      ...state, navigate, goBack, setRole, setLang, reset,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}
