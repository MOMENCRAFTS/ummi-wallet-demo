/**
 * Ummi Wallet — Interactive Demo App
 * momencrafts.com/ummi-wallet/
 *
 * Phone-frame wrapped app simulator with demo controls
 * Bilingual info panel respects navigation language
 * Zero emoji — all SVG FloralIcons
 */
import { NavigationProvider, useNavigation } from './navigation';
import PhoneFrame from './components/PhoneFrame';
import ScreenRouter from './components/ScreenRouter';
import DemoControls from './components/DemoControls';
import {
  WalletRoseIcon, ChartBloomIcon, PersonFloralIcon,
  GlobeFlowerIcon, RoseSOSIcon,
} from './components/icons/FloralIcons';

function InfoPanel() {
  const { lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="demo-info-panel" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="demo-info-content">
        <h1 className="demo-brand">
          <span className="demo-brand-flower"><WalletRoseIcon size={28} /></span>
          محفظة أمي
        </h1>
        <h2 className="demo-brand-en">Ummi Wallet</h2>
        <p className="demo-tagline">
          {isAr ? 'رعاية العائلة بوضوح وكرامة' : 'Family support, made clear.'}<br />
          {isAr ? 'كل شي واضح، وكل شي بحبّ' : 'رعاية العائلة بوضوح وكرامة'}
        </p>

        <div className="demo-features">
          <div className="demo-feature">
            <span><ChartBloomIcon size={24} /></span>
            <div>
              <strong>{isAr ? 'تخطيط مالي ذكي' : 'AI-Guided Finance'}</strong>
              <p>{isAr ? 'تقدير ميزانية ذكي بتحليل الذكاء الاصطناعي' : 'Smart budget estimation with AI analysis'}</p>
            </div>
          </div>
          <div className="demo-feature">
            <span><PersonFloralIcon size={24} /></span>
            <div>
              <strong>{isAr ? '٤ أدوار، ٢٨ خدمة' : '4 Roles, 28 Modules'}</strong>
              <p>{isAr ? 'المسؤول، الوالدة، المساهم، المراقب' : 'Admin, Mother, Contributor, Observer'}</p>
            </div>
          </div>
          <div className="demo-feature">
            <span><GlobeFlowerIcon size={24} /></span>
            <div>
              <strong>{isAr ? 'ثنائي اللغة عر/EN' : 'Bilingual AR/EN'}</strong>
              <p>{isAr ? 'العربية أولاً مع دعم إنجليزي كامل' : 'Arabic-first with full English support'}</p>
            </div>
          </div>
          <div className="demo-feature">
            <span><RoseSOSIcon size={24} /></span>
            <div>
              <strong>{isAr ? 'طوارئ SOS' : 'Emergency SOS'}</strong>
              <p>{isAr ? 'طلبات صندوق طوارئ العائلة الفورية' : 'Instant family emergency fund requests'}</p>
            </div>
          </div>
        </div>

        <p className="demo-credit">
          {isAr
            ? <><strong>MomenCrafts</strong> · الرياض، السعودية</>
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
      <div className="demo-container">
        {/* Left: Info panel (bilingual) */}
        <InfoPanel />

        {/* Center: Phone */}
        <PhoneFrame>
          <ScreenRouter />
        </PhoneFrame>

        {/* Demo Controls (floating) */}
        <DemoControls />
      </div>
    </NavigationProvider>
  );
}
