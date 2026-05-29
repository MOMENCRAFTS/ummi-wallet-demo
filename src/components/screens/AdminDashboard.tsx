/**
 * AdminDashboard — Premium Botanical Command Center
 * Pixel-perfect clone of the true app's AdminDashboard.tsx
 * Reservoir → DailyBarakah → Stats → Pockets → Queue → Feed → Manage Grid
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal (فصحى) for headers/labels, Shami for friendly text
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  WalletRoseIcon, ChartBloomIcon, PayrollLeafIcon, LeafBillIcon,
  BalanceLeavesIcon, BankGardenIcon, ShieldLeafIcon, CakeBlossomIcon,
  HeartLeafIcon, DocumentLeafIcon, SeedlingIcon, ArrowLeafIcon,
  QueueScrollIcon, LightbulbPetalIcon, WrenchVineIcon,
  TulipIcon, PersonFloralIcon, ChatBubbleLeafIcon,
  CrownFloralIcon, SparkleAccent, MoneyLeafIcon,
  MedicalHerbIcon, SunflowerHomeIcon, RoseSOSIcon,
  NewsScrollIcon, PendingBudIcon, WiltIcon,
  CheckLeafIcon, RefreshPetalIcon, LiveDotIcon,
  c,
} from '../icons/FloralIcons';

// ─── Mock data (simulating live Supabase) ───
const RESERVOIR = { balance: 18750, confidence: 'high' as const, bankName: 'بنك الراجحي' };

const STATS = [
  { label: 'Pending', labelAr: 'معلّقة', value: 3, color: c.peach, Icon: PendingBudIcon },
  { label: 'Overdue', labelAr: 'متأخرة', value: 1, color: c.emergency, Icon: WiltIcon },
  { label: 'Payrolls', labelAr: 'الرواتب', value: 4, color: c.yellow, Icon: PayrollLeafIcon },
  { label: 'Maint.', labelAr: 'الصيانة', value: 2, color: c.blue, Icon: WrenchVineIcon },
];

const POCKETS = [
  { name: 'Mother Personal', nameAr: 'مصروف الوالدة', allocated: 1200, current: 950 },
  { name: 'Groceries', nameAr: 'البقالة', allocated: 800, current: 320 },
  { name: 'Medical', nameAr: 'الأدوية', allocated: 500, current: 480 },
  { name: 'Utilities', nameAr: 'الفواتير', allocated: 800, current: 200 },
  { name: 'Emergency', nameAr: 'الطوارئ', allocated: 2000, current: 1800 },
];

const QUEUE = [
  { id: '1', title: 'Electricity bill — May', titleAr: 'فاتورة الكهرباء — مايو', priority: 'urgent', priorityAr: 'عاجل', due: 'Jun 1', dueAr: '١ يونيو', status: 'overdue' },
  { id: '2', title: 'Driver salary', titleAr: 'راتب السائق', priority: 'high', priorityAr: 'مهم', due: 'Jun 5', dueAr: '٥ يونيو', status: 'scheduled' },
  { id: '3', title: 'Pharmacy reimbursement', titleAr: 'استرجاع مصاريف الصيدلية', priority: 'medium', priorityAr: 'متوسط', due: 'Jun 8', dueAr: '٨ يونيو', status: 'to_review' },
  { id: '4', title: 'AC maintenance follow-up', titleAr: 'متابعة صيانة المكيّف', priority: 'low', priorityAr: 'عادي', due: 'Jun 15', dueAr: '١٥ يونيو', status: 'scheduled' },
];

const FEED = [
  { id: '1', message: 'Mother requested 280 SAR for pharmacy', messageAr: 'الوالدة طلبت ٢٨٠ ر.س للصيدلية', time: '2h ago', timeAr: 'قبل ساعتين' },
  { id: '2', message: 'Mohammed approved the support plan', messageAr: 'محمد وافق على خطة الدعم — الله يوفقه', time: '1d ago', timeAr: 'أمس' },
  { id: '3', message: 'Electricity bill auto-paid — 320 SAR', messageAr: 'انسددت فاتورة الكهرباء — ٣٢٠ ر.س', time: '3d ago', timeAr: 'قبل ٣ أيام' },
  { id: '4', message: 'Sarah joined as Observing Sister', messageAr: 'سارة انضمّت كأخت متابعة — أهلاً وسهلاً', time: '5d ago', timeAr: 'قبل ٥ أيام' },
];

// Service categories for the manage grid
const SERVICE_CATEGORIES = [
  {
    title: 'Operations', titleAr: 'العمليات', dotColor: c.mint,
    items: [
      { key: 'queue', label: 'Queue', labelAr: 'المتابعة', Icon: QueueScrollIcon, color: c.mint },
      { key: 'payroll', label: 'Payroll', labelAr: 'الرواتب', Icon: PayrollLeafIcon, color: c.yellow },
      { key: 'bills', label: 'Bills', labelAr: 'الفواتير', Icon: LeafBillIcon, color: c.mint },
      { key: 'maintenance', label: 'Maint.', labelAr: 'الصيانة', Icon: WrenchVineIcon, color: c.muted },
      { key: 'mother-sos', label: 'SOS', labelAr: 'طوارئ', Icon: RoseSOSIcon, color: c.emergency },
    ],
  },
  {
    title: 'Finance', titleAr: 'المالية', dotColor: c.gold,
    items: [
      { key: 'finance-welcome', label: 'AI Plan', labelAr: 'تخطيط ذكي', Icon: ChatBubbleLeafIcon, color: c.gold },
      { key: 'reservoir', label: 'Reservoir', labelAr: 'الخزنة', Icon: BankGardenIcon, color: c.mint },
      { key: 'settlement', label: 'Settle', labelAr: 'التسوية', Icon: BalanceLeavesIcon, color: c.muted },
      { key: 'pulse', label: 'Pulse', labelAr: 'النبض', Icon: ChartBloomIcon, color: c.mint },
      { key: 'reports', label: 'Reports', labelAr: 'التقارير', Icon: ChartBloomIcon, color: c.blue },
    ],
  },
  {
    title: 'Family', titleAr: 'العائلة', dotColor: c.peach,
    items: [
      { key: 'invite', label: 'Members', labelAr: 'الأعضاء', Icon: PersonFloralIcon, color: c.muted },
      { key: 'projects', label: 'Projects', labelAr: 'المشاريع', Icon: TulipIcon, color: c.peach },
      { key: 'celebrations', label: 'Events', labelAr: 'المناسبات', Icon: CakeBlossomIcon, color: c.peach },
      { key: 'documents', label: 'Docs', labelAr: 'المستندات', Icon: DocumentLeafIcon, color: c.blue },
      { key: 'suggestions', label: 'Ideas', labelAr: 'أفكار', Icon: LightbulbPetalIcon, color: c.yellow },
    ],
  },
];

const BARAKAH_QUOTES = [
  { ar: 'من أحبّ أن يُبسط له في رزقه فليصل رحمه', en: '"Whoever loves that his provision be expanded, let him maintain ties of kinship." — Sahih Bukhari' },
  { ar: 'ما نقص مال من صدقة', en: '"Wealth does not decrease from charity." — Sahih Muslim' },
  { ar: 'اللهم بارك لأمي في صحتها ورزقها', en: '"O Allah, bless my mother in her health and provision."' },
];

const confLabelsAr = { high: 'مستقر', medium: 'مقبول', low: 'منخفض' };

export default function AdminDashboard() {
  const { navigate, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [manageOpen, setManageOpen] = useState(false);
  const confColors = { high: c.success, medium: c.yellow, low: c.emergency };
  const confLabels = { high: 'Healthy', medium: 'Fair', low: 'Low' };
  const prioColors: Record<string, string> = { urgent: c.emergency, high: c.yellow, medium: c.mint, low: c.muted };

  // Static daily barakah
  const todayQuote = BARAKAH_QUOTES[new Date().getDate() % BARAKAH_QUOTES.length];

  return (
    <div className="screen admin-dashboard-true" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Logout */}
      <button className="dashboard-logout" onClick={() => navigate('landing' as any)}>
        <ArrowLeafIcon size={14} /> {isAr ? 'خروج' : 'Logout'}
      </button>
      {/* ═══ Reservoir Card ═══ */}
      <motion.div
        className="card glass flourish reservoir-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="reservoir-header">
          <h3 className="reservoir-title">{isAr ? 'صحة الخزنة' : 'Reservoir Health'}</h3>
          <span className="badge badge-approved" style={{ background: confColors[RESERVOIR.confidence] + '20', color: confColors[RESERVOIR.confidence] }}>
            {isAr ? confLabelsAr[RESERVOIR.confidence] : confLabels[RESERVOIR.confidence]}
          </span>
        </div>
        <div className="reservoir-balance">
          <span className="reservoir-amount">{RESERVOIR.balance.toLocaleString()}</span>
          <SparkleAccent size={12} style={{ position: 'relative', top: -8 }} />
          <span className="reservoir-currency">{isAr ? 'ر.س' : 'SAR'}</span>
        </div>
        <span className="reservoir-bank">{isAr ? RESERVOIR.bankName : 'Al Rajhi Bank'}</span>
      </motion.div>

      {/* ═══ Daily Barakah ═══ */}
      <motion.div
        className="card barakah-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="barakah-header">
          <SeedlingIcon size={18} />
          <span className="barakah-label">{isAr ? 'بركة اليوم' : 'DAILY BARAKAH'}</span>
        </div>
        <p className="barakah-text">{isAr ? todayQuote.ar : todayQuote.en}</p>
      </motion.div>

      <div className="admin-scroll">
        {/* ═══ Stats Row ═══ */}
        <div className="stats-row">
          {STATS.map((st, i) => (
            <motion.div
              key={st.label}
              className="card stat-card"
              style={{ borderLeftColor: st.color }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.04, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <st.Icon size={16} />
              <span className="stat-value">{st.value}</span>
              <span className="stat-label">{isAr ? st.labelAr : st.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ═══ Virtual Pockets ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <h3 className="section-title">{isAr ? 'الجيوب الافتراضية' : 'Virtual Pockets'}</h3>
          <div className="pockets-scroll">
            {POCKETS.map((p) => {
              const pct = p.allocated > 0 ? Math.round((p.current / p.allocated) * 100) : 0;
              const chipColor = pct > 50 ? c.mint : pct > 20 ? c.yellow : c.emergency;
              return (
                <div
                  key={p.name}
                  className="pocket-chip"
                  style={{ borderColor: chipColor, background: chipColor + '12' }}
                >
                  <span className="pocket-chip-amount" style={{ color: chipColor }}>{p.current.toLocaleString()}</span>
                  <span className="pocket-chip-name">{isAr ? p.nameAr : p.name}</span>
                  <span className="pocket-chip-pct" style={{ color: chipColor }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ Follow-up Queue ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="section-header-row">
            <QueueScrollIcon size={20} />
            <h3 className="section-title" style={{ marginBottom: 0 }}>{isAr ? 'قائمة المتابعة' : 'Follow-up Queue'}</h3>
          </div>
          <div className="card">
            {QUEUE.map((q, i) => (
              <div key={q.id}>
                {i > 0 && <div className="card-divider" />}
                <div className="queue-item">
                  <span className="queue-dot" style={{ background: prioColors[q.priority] }} />
                  <div className="queue-info">
                    <span className="queue-text">{isAr ? q.titleAr : q.title}</span>
                    <span className="queue-meta">{isAr ? q.dueAr : q.due}</span>
                  </div>
                  <span className={`badge badge-${q.priority === 'urgent' ? 'overdue' : q.priority === 'high' ? 'pending' : 'active'}`}>
                    {isAr ? q.priorityAr : q.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Recent Activity ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ marginTop: 16 }}
        >
          <div className="section-header-row">
            <NewsScrollIcon size={20} />
            <h3 className="section-title" style={{ marginBottom: 0 }}>{isAr ? 'آخر الأخبار' : 'Recent Activity'}</h3>
          </div>
          {FEED.map((f) => (
            <div key={f.id} className="card feed-card">
              <span className="feed-msg">{isAr ? f.messageAr : f.message}</span>
              <span className="feed-time">{isAr ? f.timeAr : f.time}</span>
            </div>
          ))}
        </motion.div>

        {/* ═══ Manage Grid — Collapsible ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44 }}
          style={{ marginTop: 16 }}
        >
          <button className="manage-toggle" onClick={() => setManageOpen(!manageOpen)}>
            <div className="manage-toggle-left">
              <WalletRoseIcon size={20} />
              <span className="manage-toggle-text">{isAr ? 'إدارة الخدمات' : 'Manage'}</span>
            </div>
            <span className="manage-chevron">{manageOpen ? '▲' : '▼'}</span>
          </button>

          <AnimatePresence>
            {manageOpen && (
              <motion.div
                className="services-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="service-category">
                    <div className="service-cat-header">
                      <span className="service-cat-dot" style={{ background: cat.dotColor }} />
                      <span className="service-cat-title">{isAr ? cat.titleAr : cat.title}</span>
                    </div>
                    <div className="service-grid">
                      {cat.items.map((item) => (
                        <motion.button
                          key={item.key}
                          className="service-card"
                          style={{ borderLeftColor: item.color + '60' }}
                          onClick={() => navigate(item.key as any, { service: item.key })}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <item.Icon size={28} />
                          <span className="service-label">{isAr ? item.labelAr : item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ═══ Refresh ═══ */}
        <motion.button
          className="btn btn-glass btn-md btn-full"
          style={{ marginTop: 16, marginBottom: 20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshPetalIcon size={18} /> {isAr ? 'تحديث اللوحة' : 'Refresh Dashboard'}
        </motion.button>

        {/* Live indicator */}
        <div className="live-footer">
          <LiveDotIcon size={14} />
          <span className="live-text">{isAr ? 'بيانات مباشرة' : 'Live data'}</span>
        </div>
      </div>
    </div>
  );
}
