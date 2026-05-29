/**
 * MotherDashboard — True app MotherHome.tsx clone
 * DailyBarakah → Balance → IBAN Banner → Action Cards → Family Feed → SOS
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal for headers, Shami for friendly text
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  WalletRoseIcon, FloatingPetals, MoneyLeafIcon, MedicalHerbIcon,
  SeedlingIcon, RoseSOSIcon, HeartLeafIcon, TulipIcon, ArrowLeafIcon,
  SparkleAccent, PendingBudIcon, LeafBillIcon, NewsScrollIcon, c,
} from '../icons/FloralIcons';

const BALANCE = 4825;
const ALLOCATED = 5300;
const PENDING = 2;

const FEED = [
  { id: '1', text: 'Monthly allowance received', textAr: 'وصل المصروف الشهري — الحمد لله', time: '2h ago', timeAr: 'قبل ساعتين' },
  { id: '2', text: 'Ahmed approved your pharmacy request', textAr: 'أحمد وافق على طلب الصيدلية — يعطيه العافية', time: '1d ago', timeAr: 'أمس' },
  { id: '3', text: 'Electricity bill paid — 320 SAR', textAr: 'انسددت فاتورة الكهرباء — ٣٢٠ ر.س', time: '3d ago', timeAr: 'قبل ٣ أيام' },
];

const BARAKAH = {
  ar: 'الحمد لله على نعمة العائلة — ربنا يديم هالنعمة',
  en: '"Alhamdulillah for the blessing of family."',
};

export default function MotherDashboard() {
  const { navigate, lang } = useNavigation();
  const isAr = lang === 'ar';
  const pct = ALLOCATED > 0 ? Math.round((BALANCE / ALLOCATED) * 100) : 0;

  return (
    <div className="screen mother-dashboard-true" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={4} />
      <button className="dashboard-logout" onClick={() => navigate('landing' as any)}>
        <ArrowLeafIcon size={14} /> {isAr ? 'خروج' : 'Logout'}
      </button>

      <div className="mother-scroll">
        {/* ═══ Daily Barakah ═══ */}
        <motion.div
          className="card barakah-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="barakah-header">
            <SeedlingIcon size={18} />
            <span className="barakah-label">{isAr ? 'بركة اليوم' : 'Daily Barakah'}</span>
          </div>
          <p className="barakah-text">{isAr ? BARAKAH.ar : BARAKAH.en}</p>
        </motion.div>

        {/* ═══ Available Balance Card ═══ */}
        <motion.div
          className="card glass flourish mother-balance-hero"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <p className="mother-balance-label-text">{isAr ? 'رصيدك لهالشهر' : 'Available This Month'}</p>
          <div className="mother-balance-row">
            <span className="mother-balance-amount">{BALANCE.toLocaleString()}</span>
            <SparkleAccent size={12} style={{ position: 'relative', top: -8 }} />
            <span className="mother-balance-sar">{isAr ? 'ر.س' : 'SAR'}</span>
          </div>
          {/* Progress bar */}
          <div className="mother-progress-bar">
            <div className="mother-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="mother-progress-label">{isAr ? `باقي ${pct}٪` : `${pct}% remaining`}</span>
          {/* Pending count */}
          {PENDING > 0 && (
            <div className="mother-pending-row">
              <PendingBudIcon size={16} />
              <span className="mother-pending-text">
                {isAr ? `${PENDING} طلبات بانتظار الموافقة` : `${PENDING} pending requests`}
              </span>
            </div>
          )}
        </motion.div>

        {/* ═══ IBAN Banner ═══ */}
        <motion.div
          className="card iban-banner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <p className="iban-title">{isAr ? 'أضيفي بيانات البنك' : 'Add Your Bank Details'}</p>
          <p className="iban-hint">{isAr ? 'روحي للإعدادات وضيفي الآيبان عشان يقدرون يحوّلون لك مباشرة' : 'Go to Settings to add your IBAN so your family can transfer directly.'}</p>
          <button className="btn btn-glass btn-sm" style={{ marginTop: 8 }}>
            {isAr ? 'الإعدادات' : 'Settings'}
          </button>
        </motion.div>

        {/* ═══ Last Transfer ═══ */}
        <motion.div
          className="last-transfer-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <HeartLeafIcon size={16} color={c.success} />
          <span className="last-transfer-text">
            {isAr ? 'آخر تحويل: ٥,٣٠٠ ر.س — قبل ٥ أيام' : 'Last received: 5,300 SAR — 5d ago'}
          </span>
        </motion.div>

        {/* ═══ Action Cards Grid ═══ */}
        <motion.div
          className="mother-actions-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button className="mother-action-card" style={{ background: c.mintLight + '30', borderColor: c.mint }} onClick={() => navigate('mother-request')}>
            <TulipIcon size={44} />
            <span className="mother-action-label">{isAr ? 'طلب مبلغ' : 'Request Money'}</span>
          </button>
          <button className="mother-action-card" style={{ background: c.blue + '15', borderColor: c.blue }} onClick={() => navigate('mother-bills' as any)}>
            <LeafBillIcon size={44} />
            <span className="mother-action-label">{isAr ? 'الفواتير' : 'Bills'}</span>
          </button>
          <button className="mother-action-card" style={{ background: c.peach + '15', borderColor: c.peach }} onClick={() => navigate('mother-history' as any)}>
            <NewsScrollIcon size={44} />
            <span className="mother-action-label">{isAr ? 'السجل' : 'History'}</span>
          </button>
          <button className="mother-action-card" style={{ background: c.yellow + '15', borderColor: c.yellow }} onClick={() => navigate('mother-gratitude' as any)}>
            <HeartLeafIcon size={44} />
            <span className="mother-action-label">{isAr ? 'شكر وامتنان' : 'Gratitude'}</span>
          </button>
        </motion.div>

        {/* ═══ Family Feed ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <h3 className="section-title">{isAr ? 'أخبار العيلة' : 'Family Feed'}</h3>
          <div className="card mother-feed-card">
            {FEED.map((f, i) => (
              <div key={f.id}>
                {i > 0 && <div className="card-divider" />}
                <div className="mother-feed-item">
                  <div className="mother-feed-icon"><SeedlingIcon size={22} /></div>
                  <div className="mother-feed-content">
                    <span className="mother-feed-text">{isAr ? f.textAr : f.text}</span>
                    <span className="mother-feed-time">{isAr ? f.timeAr : f.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ SOS Section ═══ */}
        <motion.div
          className="mother-sos-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <button className="mother-sos-btn" onClick={() => navigate('mother-sos')}>
            <RoseSOSIcon size={36} />
          </button>
          <span className="mother-sos-label">{isAr ? 'طوارئ' : 'Emergency'}</span>
        </motion.div>
      </div>
    </div>
  );
}
