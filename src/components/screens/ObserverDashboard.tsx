/**
 * ObserverDashboard — Read-only family view
 * Matching the true app's ObserverHome.tsx
 * Zero emoji — all SVG botanical icons
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { useFamilyState } from '../../familyState';
import {
  CakeBlossomIcon, NewsScrollIcon, SeedlingIcon, HeartLeafIcon,
  EyeLeafIcon, SparkleStarIcon, ArrowLeafIcon, ChatBubbleLeafIcon, ShieldLeafIcon, c,
} from '../icons/FloralIcons';

const CELEBRATIONS = [
  { name: 'Mother\'s Birthday', nameAr: 'عيد ميلاد أمي', date: 'June 15, 2026', days: 18 },
  { name: 'Eid Al-Adha', nameAr: 'عيد الأضحى', date: 'June 7, 2026', days: 10 },
  { name: 'Family Anniversary', nameAr: 'ذكرى العائلة', date: 'July 22, 2026', days: 55 },
];

const FEED = [
  { text: 'Monthly allowance sent to Mother', textAr: 'تم إرسال المصروف للوالدة — الحمد لله', time: '2h ago', timeAr: 'قبل ساعتين' },
  { text: 'Mohammed approved the support plan', textAr: 'محمد وافق على خطة الدعم — يعطيه العافية', time: '1d ago', timeAr: 'أمس' },
  { text: 'New maintenance request submitted', textAr: 'طلب صيانة جديد', time: '3d ago', timeAr: 'قبل ٣ أيام' },
  { text: 'Electricity bill paid — 280 SAR', textAr: 'انسددت فاتورة الكهرباء — ٢٨٠ ر.س', time: '5d ago', timeAr: 'قبل ٥ أيام' },
];

const PROJECTS = [
  { title: 'Kitchen Renovation', titleAr: 'تجديد المطبخ', status: 'In Progress', statusAr: 'جاري' },
  { title: 'Garden Landscaping', titleAr: 'تنسيق الحديقة', status: 'Planned', statusAr: 'مخطط' },
];

export default function ObserverDashboard() {
  const { navigate, lang } = useNavigation();
  const { canObserverView, chatUnread } = useFamilyState();
  const isAr = lang === 'ar';
  const totalChatUnread = Object.values(chatUnread).reduce((a, b) => a + b, 0);

  if (!canObserverView) {
    return (
      <div className="screen observer-dashboard" dir={isAr ? 'rtl' : 'ltr'}>
        <button className="dashboard-logout" onClick={() => navigate('landing' as any)}>
          <ArrowLeafIcon size={14} /> {isAr ? 'تسجيل الخروج' : 'Logout'}
        </button>
        <div className="pending-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            className="pending-icon"
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <EyeLeafIcon size={48} color={c.blue} />
          </motion.div>
          <h2 className="onboarding-title">{isAr ? 'بانتظار نشر الخطة' : 'Waiting for Plan'}</h2>
          <p className="onboarding-subtitle">{isAr ? 'بمجرد نشر الخطة، ستتمكنين من رؤية كل شيء' : "Once the plan is published, you'll see everything"}</p>
          <div className="pending-dots-row">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="pending-bounce-dot" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
          <motion.button
            className="btn btn-ghost admin-quick-btn" style={{ marginTop: 16 }}
            onClick={() => navigate('chat-list')}
          >
            <ChatBubbleLeafIcon size={16} />
            {isAr ? 'المحادثات' : 'Chat'}
            {totalChatUnread > 0 && <span className="admin-chat-badge">{totalChatUnread}</span>}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen observer-dashboard" dir={isAr ? 'rtl' : 'ltr'}>
      <button className="dashboard-logout" onClick={() => navigate('landing' as any)}>
        <ArrowLeafIcon size={14} /> {isAr ? 'تسجيل الخروج' : 'Logout'}
      </button>
      {/* Header */}
      <div className="dashboard-header observer-header">
        <motion.div
          className="observer-welcome-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="observer-icon-row">
            <EyeLeafIcon size={28} />
            <SparkleStarIcon size={14} />
          </div>
          <p className="observer-greeting">{isAr ? 'أهلًا بكِ' : 'Welcome, Sister'}</p>
          <p className="observer-subtitle">{isAr ? 'يمكنكِ متابعة الخطة ومشاركة التقدير' : 'Follow the plan and share gratitude'}</p>
        </motion.div>
      </div>

      <div className="screen-body">
        {/* Celebrations */}
        <div className="section-header">
          <CakeBlossomIcon size={20} />
          <h3 className="section-title">{isAr ? 'المناسبات القادمة' : 'Upcoming Celebrations'}</h3>
        </div>
        <div className="celebrations-list">
          {CELEBRATIONS.map((c, i) => (
            <motion.div
              key={c.name}
              className="card celebration-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
            >
              <div className="celebration-row">
                <div>
                  <span className="celebration-name">{isAr ? c.nameAr : c.name}</span>
                  <span className="celebration-date">{c.date}</span>
                </div>
                <span className="celebration-days badge badge-new">{isAr ? `${c.days} يوم` : `${c.days}d`}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Family Feed */}
        <div className="section-header" style={{ marginTop: 20 }}>
          <NewsScrollIcon size={20} />
          <h3 className="section-title">{isAr ? 'آخر أخبار العائلة' : 'Family Feed'}</h3>
        </div>
        <div className="card">
          {FEED.map((f, i) => (
            <motion.div
              key={i}
              className="feed-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="feed-icon">
                <SeedlingIcon size={18} />
              </div>
              <div>
                <span className="feed-text">{isAr ? f.textAr : f.text}</span>
                <span className="feed-time">{isAr ? f.timeAr : f.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Family Projects */}
        <div className="section-header" style={{ marginTop: 20 }}>
          <SeedlingIcon size={20} />
          <h3 className="section-title">{isAr ? 'مشاريع العائلة' : 'Family Projects'}</h3>
        </div>
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            className="card project-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            style={{ marginBottom: 8 }}
          >
            <div className="project-row">
              <span className="project-title">{isAr ? p.titleAr : p.title}</span>
              <span className={`badge ${p.status === 'In Progress' ? 'badge-pending' : 'badge-new'}`}>
                {isAr ? p.statusAr : p.status}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Quick Actions */}
        <div className="observer-actions">
          <button className="btn btn-glass btn-md" style={{ flex: 1 }} onClick={() => navigate('observer-feed')}>
            <HeartLeafIcon size={18} />
            <span>{isAr ? 'الموجز' : 'Feed'}</span>
          </button>
          <button className="btn btn-glass btn-md" style={{ flex: 1 }} onClick={() => navigate('observer-celebrations')}>
            <CakeBlossomIcon size={18} />
            <span>{isAr ? 'المناسبات' : 'Events'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
