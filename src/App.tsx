/**
 * Ummi Wallet — Interactive Demo App
 * momencrafts.com/ummi-wallet/
 *
 * Three-column layout: Info Panel | Phone | Role Selector
 * Zero emoji — all SVG FloralIcons
 */
import { NavigationProvider, useNavigation, type AppRole } from './navigation';
import PhoneFrame from './components/PhoneFrame';
import ScreenRouter from './components/ScreenRouter';
import DemoControls from './components/DemoControls';
import {
  WalletRoseIcon, ChartBloomIcon, PersonFloralIcon,
  GlobeFlowerIcon, RoseSOSIcon, CrownFloralIcon,
  HeartLeafIcon, EyeLeafIcon,
} from './components/icons/FloralIcons';

/* ─── Role Selector Panel (right side) ─── */
const ROLES: { id: AppRole; label: string; labelAr: string; desc: string; descAr: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'admin', label: 'Responsible Son', labelAr: 'الابن المسؤول', desc: 'Manages budget, approves requests, oversees the family plan', descAr: 'يدير الميزانية ويوافق على الطلبات ويشرف على خطة العائلة', Icon: CrownFloralIcon },
  { id: 'mother', label: 'Mother', labelAr: 'الوالدة', desc: 'Requests money, pays bills, sends gratitude', descAr: 'تطلب مبالغ وتدفع الفواتير وترسل الشكر', Icon: HeartLeafIcon },
  { id: 'brother', label: 'Contributing Brother', labelAr: 'الأخ المساهم', desc: 'Pays his share, views pending approvals', descAr: 'يدفع حصّته ويتابع الطلبات المعلّقة', Icon: PersonFloralIcon },
  { id: 'observer', label: 'Observing Sister', labelAr: 'الأخت المتابعة', desc: 'Views family feed, celebrations, gratitude', descAr: 'تتابع أخبار العائلة والمناسبات', Icon: EyeLeafIcon },
];

function RolePanel() {
  const { role, setRole, lang, setLang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="role-panel">
      <h3 className="role-panel-title">{isAr ? 'اختر الدور' : 'Choose Role'}</h3>
      <p className="role-panel-subtitle">{isAr ? 'شوف التطبيق من زاوية كل فرد' : 'See the app from each family member\'s perspective'}</p>

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

/* ─── Info Panel (left side) ─── */
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
              <p>{isAr ? 'الابن المسؤول، الوالدة، الأخ المساهم، الأخت المتابعة' : 'Responsible Son, Mother, Contributing Brother, Observing Sister'}</p>
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
        {/* Left: Info panel */}
        <InfoPanel />

        {/* Center: Phone */}
        <PhoneFrame>
          <ScreenRouter />
        </PhoneFrame>

        {/* Right: Role selector */}
        <RolePanel />

        {/* Floating advanced controls */}
        <DemoControls />
      </div>
    </NavigationProvider>
  );
}
