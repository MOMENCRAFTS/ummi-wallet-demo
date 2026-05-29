/**
 * App Navigation — State-based router for the demo
 * Simulates React Navigation stack behavior in web
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type AppRole = 'admin' | 'mother' | 'brother' | 'observer';

export type ScreenName =
  // Auth
  | 'landing' | 'login' | 'oauth' | 'oauth-transition'
  // Onboarding
  | 'onboarding' | 'onboarding-role' | 'onboarding-mother' | 'onboarding-complete'
  // Admin
  | 'admin-dashboard'
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
  // Brother
  | 'brother-dashboard' | 'brother-audit' | 'brother-contribution'
  // Observer
  | 'observer-dashboard';

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
