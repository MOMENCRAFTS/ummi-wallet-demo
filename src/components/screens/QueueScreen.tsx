/**
 * QueueScreen — Follow-up queue with filter chips
 * Zero emoji — all SVG FloralIcons
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, QueueScrollIcon, PendingBudIcon, WiltIcon,
  CheckLeafIcon, SparkleAccent, c,
} from '../icons/FloralIcons';

const QUEUE = [
  { id: '1', title: 'Electricity bill', titleAr: 'فاتورة الكهرباء', priority: 'urgent', priorityAr: 'عاجل', due: 'Jun 1', dueAr: '١ يونيو', status: 'overdue', amount: 320 },
  { id: '2', title: 'Driver salary', titleAr: 'راتب السائق', priority: 'high', priorityAr: 'مهم', due: 'Jun 5', dueAr: '٥ يونيو', status: 'scheduled', amount: 2500 },
  { id: '3', title: 'Pharmacy reimbursement', titleAr: 'مصاريف الصيدلية', priority: 'medium', priorityAr: 'متوسط', due: 'Jun 8', dueAr: '٨ يونيو', status: 'to_review', amount: 280 },
  { id: '4', title: 'AC maintenance', titleAr: 'صيانة المكيّف', priority: 'low', priorityAr: 'عادي', due: 'Jun 15', dueAr: '١٥ يونيو', status: 'scheduled', amount: 450 },
  { id: '5', title: 'Internet bill', titleAr: 'فاتورة الإنترنت', priority: 'medium', priorityAr: 'متوسط', due: 'Jun 10', dueAr: '١٠ يونيو', status: 'to_review', amount: 350 },
  { id: '6', title: 'Garden landscaping', titleAr: 'تنسيق الحديقة', priority: 'low', priorityAr: 'عادي', due: 'Jun 20', dueAr: '٢٠ يونيو', status: 'scheduled', amount: 1200 },
];

const FILTERS = [
  { key: 'all', label: 'All', labelAr: 'الكل' },
  { key: 'overdue', label: 'Overdue', labelAr: 'متأخّر' },
  { key: 'to_review', label: 'Review', labelAr: 'مراجعة' },
  { key: 'scheduled', label: 'Scheduled', labelAr: 'مجدول' },
];

const prioColors: Record<string, string> = { urgent: c.emergency, high: c.yellow, medium: c.mint, low: c.muted };
const statusIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  overdue: WiltIcon, to_review: PendingBudIcon, scheduled: CheckLeafIcon,
};

export default function QueueScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [filter, setFilter] = useState('all');
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const filtered = QUEUE.filter(q => !completed.has(q.id) && (filter === 'all' || q.status === filter));

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><QueueScrollIcon size={20} /> {isAr ? 'قائمة المتابعة' : 'Follow-up Queue'}</span>
      </div>
      <div className="screen-body">
        {/* Filter chips */}
        <div className="filter-chips">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`chip ${filter === f.key ? 'chip-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {isAr ? f.labelAr : f.label}
              {f.key !== 'all' && <span className="chip-count">{QUEUE.filter(q => !completed.has(q.id) && q.status === f.key).length}</span>}
            </button>
          ))}
        </div>

        {/* Queue list */}
        {filtered.map((q, i) => {
          const StatusIcon = statusIcons[q.status] || PendingBudIcon;
          return (
            <motion.div
              key={q.id}
              className="card"
              style={{ marginBottom: 8, borderLeftWidth: 3, borderLeftColor: prioColors[q.priority], borderLeftStyle: 'solid' }}
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="queue-item">
                <StatusIcon size={16} color={prioColors[q.priority]} />
                <div className="queue-info" style={{ flex: 1 }}>
                  <span className="queue-text">{isAr ? q.titleAr : q.title}</span>
                  <span className="queue-meta">{isAr ? q.dueAr : q.due} · {q.amount.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</span>
                </div>
                <motion.button
                  className="btn btn-glass btn-sm"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCompleted(prev => new Set([...prev, q.id]))}
                >
                  {isAr ? 'تم' : 'Done'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <CheckLeafIcon size={36} color={c.success} />
            <p style={{ color: c.muted, marginTop: 12 }}>{isAr ? 'لا يوجد شيء معلّق — الحمد لله' : 'All clear!'}</p>
          </div>
        )}

        {completed.size > 0 && (
          <p style={{ textAlign: 'center', color: c.success, fontSize: 12, marginTop: 8 }}>
            <CheckLeafIcon size={12} color={c.success} /> {completed.size} {isAr ? 'مكتمل' : 'completed'}
          </p>
        )}
      </div>
    </div>
  );
}
