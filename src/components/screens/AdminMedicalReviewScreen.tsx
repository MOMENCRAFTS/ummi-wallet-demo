/**
 * AdminMedicalReviewScreen — Medical Visit Review
 * Admin reviews each visit item individually (approve / reject / edit)
 * Rich item cards with confidence badges and AI source tags
 * Zero emoji — SVG FloralIcons only
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, MedicalHerbIcon, CheckLeafIcon, PendingBudIcon,
  ClockPetalIcon, SeedlingIcon, HeartLeafIcon, WrenchVineIcon,
  HandPetalIcon, CrownFloralIcon, c,
} from '../icons/FloralIcons';
import { hapticsService } from '../../lib/hapticsService';

/* ─── Demo visit items ─── */
interface VisitItem {
  id: string;
  type: 'medication_new' | 'medication_changed' | 'medication_stopped' | 'appointment_next';
  title: string; titleAr: string;
  detail: string; detailAr: string;
  source: 'manual' | 'ai_voice';
  confidence?: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

const VISIT_ITEMS: VisitItem[] = [
  {
    id: 'vi1',
    type: 'medication_new',
    title: 'New: Vitamin D3 2000 IU — once daily',
    titleAr: 'جديد: فيتامين د٣ ٢٠٠٠ وحدة — مرة يومياً',
    detail: 'Take with lunch. Source: Dr. Ahmad Al-Ghamdi',
    detailAr: 'مع الغداء. المصدر: د. أحمد الغامدي',
    source: 'ai_voice', confidence: 'high',
    status: 'pending',
  },
  {
    id: 'vi2',
    type: 'medication_changed',
    title: 'Changed: Metformin 500mg → 1000mg',
    titleAr: 'تغيّر: ميتفورمين ٥٠٠ مجم → ١٠٠٠ مجم',
    detail: 'Dosage increased. Same frequency.',
    detailAr: 'الجرعة زادت. نفس التكرار.',
    source: 'manual',
    status: 'pending',
  },
  {
    id: 'vi3',
    type: 'appointment_next',
    title: 'Next: Dr. Ahmad Al-Ghamdi — July 15, 2026',
    titleAr: 'قادم: د. أحمد الغامدي — ١٥ يوليو ٢٠٢٦',
    detail: '10:00 AM · King Fahd Hospital',
    detailAr: '١٠:٠٠ ص · مستشفى الملك فهد',
    source: 'ai_voice', confidence: 'high',
    status: 'pending',
  },
];

const TYPE_CONFIG: Record<string, { color: string; label: string; labelAr: string }> = {
  medication_new:     { color: c.mint,      label: 'New Medication',  labelAr: 'دواء جديد' },
  medication_changed: { color: c.yellow,    label: 'Changed',         labelAr: 'تغيّر' },
  medication_stopped: { color: c.emergency, label: 'Stopped',         labelAr: 'متوقف' },
  appointment_next:   { color: c.blue,      label: 'Appointment',     labelAr: 'موعد' },
};

const CONFIDENCE_COLOR: Record<string, string> = {
  high: c.success, medium: c.yellow, low: c.emergency,
};

export default function AdminMedicalReviewScreen() {
  const { goBack, navigate, lang, params } = useNavigation();
  const isAr = lang === 'ar';
  const [items, setItems] = useState<VisitItem[]>(VISIT_ITEMS);
  const [allDone, setAllDone] = useState(false);
  const [rejectNote, setRejectNote] = useState<Record<string, string>>({});

  const pendingCount  = items.filter(i => i.status === 'pending').length;
  const approvedCount = items.filter(i => i.status === 'approved').length;
  const rejectedCount = items.filter(i => i.status === 'rejected').length;

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    if (status === 'approved') hapticsService.success();
    else hapticsService.error();
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    const remaining = items.filter(i => i.status === 'pending' && i.id !== id).length;
    if (remaining === 0) setAllDone(true);
  };

  const handleApproveAll = () => {
    hapticsService.success();
    setItems(prev => prev.map(i => ({ ...i, status: 'approved' })));
    setAllDone(true);
  };

  /* ─── Success state ─── */
  if (allDone && items.every(i => i.status !== 'pending')) {
    return (
      <div className="screen amr-screen" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="screen-header">
          <button className="back-btn" onClick={() => navigate('admin-dashboard')}><ArrowLeafIcon size={20} /></button>
          <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CrownFloralIcon size={20} /> {isAr ? 'مراجعة الزيارة' : 'Medical Review'}
          </span>
        </div>
        <div className="screen-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            className="amr-done-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <motion.div
              className="amr-done-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 280, damping: 14 }}
            >
              <CheckLeafIcon size={36} color={c.success} />
            </motion.div>
            <h2 className="amr-done-title">{isAr ? 'تمت المراجعة!' : 'Review Complete!'}</h2>
            <p className="amr-done-sub">
              {isAr
                ? `${approvedCount} بند تمت الموافقة عليه · ${rejectedCount} مرفوض`
                : `${approvedCount} approved · ${rejectedCount} rejected`}
            </p>
            <p className="amr-done-note">
              {isAr
                ? 'سيتم إشعار الوالدة وتحديث سجلها الصحي'
                : 'Mother will be notified and health records updated'}
            </p>
            <button
              className="btn btn-primary btn-md"
              style={{ marginTop: 20, width: '100%' }}
              onClick={() => navigate('admin-dashboard')}
            >
              {isAr ? 'العودة للرئيسية' : 'Back to Dashboard'}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen amr-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CrownFloralIcon size={20} /> {isAr ? 'مراجعة الزيارة الطبية' : 'Medical Visit Review'}
        </span>
      </div>

      <div className="screen-body amr-body">

        {/* ── Visit summary header ── */}
        <motion.div
          className="amr-visit-header"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="amr-visit-meta">
            <MedicalHerbIcon size={18} color={c.mint} />
            <div>
              <p className="amr-visit-caregiver">
                {isAr ? 'أحمد محمد — الابن المسؤول' : 'Ahmed Mohammed — Responsible Son'}
              </p>
              <p className="amr-visit-date">
                {isAr ? 'زيارة كاملة · اليوم' : 'Full Visit · Today'}
              </p>
            </div>
          </div>
          <div className="amr-visit-counts">
            <span className="amr-count pending">{pendingCount} {isAr ? 'بانتظار' : 'pending'}</span>
          </div>
        </motion.div>

        {/* ── Approve all shortcut ── */}
        {pendingCount > 1 && (
          <motion.button
            className="amr-approve-all"
            onClick={handleApproveAll}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <CheckLeafIcon size={16} color={c.success} />
            {isAr ? 'موافقة على الكل' : 'Approve All'}
          </motion.button>
        )}

        {/* ── Item cards ── */}
        <div className="amr-items">
          {items.map((item, i) => {
            const cfg = TYPE_CONFIG[item.type];
            const isDone = item.status !== 'pending';

            return (
              <motion.div
                key={item.id}
                className={`amr-item-card ${item.status}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 + i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                layout
              >
                {/* Type badge + confidence */}
                <div className="amr-item-top">
                  <span className="amr-type-badge" style={{ background: cfg.color + '18', color: cfg.color, borderColor: cfg.color + '40' }}>
                    {isAr ? cfg.labelAr : cfg.label}
                  </span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {item.source === 'ai_voice' && (
                      <span className="amr-ai-badge">
                        <SeedlingIcon size={11} color={c.mint} />
                        {isAr ? 'ذكاء اصطناعي' : 'AI'}
                      </span>
                    )}
                    {item.confidence && (
                      <span
                        className="amr-confidence"
                        style={{ color: CONFIDENCE_COLOR[item.confidence] }}
                      >
                        {isAr
                          ? item.confidence === 'high' ? 'عالي' : item.confidence === 'medium' ? 'متوسط' : 'منخفض'
                          : item.confidence}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <p className="amr-item-title">{isAr ? item.titleAr : item.title}</p>
                <p className="amr-item-detail">{isAr ? item.detailAr : item.detail}</p>

                {/* Status / Actions */}
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.div
                      key="done"
                      className={`amr-item-done ${item.status}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.status === 'approved'
                        ? <><CheckLeafIcon size={14} color={c.success} /> {isAr ? 'موافق عليه' : 'Approved'}</>
                        : <><WrenchVineIcon size={14} color={c.emergency} /> {isAr ? 'مرفوض' : 'Rejected'}</>
                      }
                    </motion.div>
                  ) : (
                    <motion.div
                      key="actions"
                      className="amr-item-actions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <button
                        className="amr-approve-btn"
                        onClick={() => updateStatus(item.id, 'approved')}
                      >
                        <CheckLeafIcon size={14} color={c.success} />
                        {isAr ? 'موافق' : 'Approve'}
                      </button>
                      <button
                        className="amr-reject-btn"
                        onClick={() => updateStatus(item.id, 'rejected')}
                      >
                        <WrenchVineIcon size={14} color={c.emergency} />
                        {isAr ? 'رفض' : 'Reject'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Notification note */}
        <motion.div
          className="amr-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <HeartLeafIcon size={14} color={c.muted} />
          <p>{isAr ? 'ستتلقى الوالدة إشعاراً بعد اعتماد القرار' : 'Mother will receive a notification after decisions are saved'}</p>
        </motion.div>

      </div>
    </div>
  );
}
