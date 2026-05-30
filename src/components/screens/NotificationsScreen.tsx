/**
 * NotificationsScreen — Notification center
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, BellBlossomIcon, CheckLeafIcon, HeartLeafIcon, SeedlingIcon, c } from '../icons/FloralIcons';

const NOTIFS_DATA = [
  { id: '1', text: 'Mother requested 280 SAR for groceries', textAr: 'الوالدة طلبت ٢٨٠ ر.س — بقالة', time: '2 min ago', timeAr: 'قبل دقيقتين', read: false, type: 'request' },
  { id: '2', text: 'Mohammed approved the plan', textAr: 'محمد وافق على الخطة', time: '1h ago', timeAr: 'قبل ساعة', read: false, type: 'approval' },
  { id: '3', text: 'Electricity bill due tomorrow', textAr: 'فاتورة الكهرباء مستحقة غدًا', time: '3h ago', timeAr: 'قبل ٣ ساعات', read: true, type: 'reminder' },
  { id: '4', text: 'Monthly allowance sent — 5,300 SAR', textAr: 'تم إرسال المصروف الشهري — ٥٬٣٠٠ ر.س', time: 'Yesterday', timeAr: 'أمس', read: true, type: 'transfer' },
  { id: '5', text: 'Khalid uploaded payment proof', textAr: 'خالد رفع إثبات الدفع', time: '2d ago', timeAr: 'قبل يومين', read: true, type: 'proof' },
];

const typeIcons: Record<string, React.ComponentType<{size?: number; color?: string}>> = {
  request: HeartLeafIcon, approval: CheckLeafIcon, reminder: BellBlossomIcon, transfer: SeedlingIcon, proof: CheckLeafIcon,
};

export default function NotificationsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = NOTIFS_DATA.filter(n => !dismissed.has(n.id));

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><BellBlossomIcon size={20} /> {isAr ? 'الإشعارات' : 'Notifications'}</span></div>
      <div className="screen-body">
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <BellBlossomIcon size={36} color={c.muted} />
            <p style={{ color: c.muted, marginTop: 12 }}>{isAr ? 'لا توجد إشعارات جديدة' : 'No notifications'}</p>
          </div>
        )}
        {visible.map((n, i) => {
          const Icon = typeIcons[n.type] || SeedlingIcon;
          return (
            <motion.div
              key={n.id}
              className="card"
              style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10, opacity: n.read ? 0.7 : 1, borderLeftWidth: n.read ? 0 : 3, borderLeftColor: c.mint, borderLeftStyle: 'solid' }}
              initial={{ opacity: 0, x: isAr ? -16 : 16 }}
              animate={{ opacity: n.read ? 0.7 : 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Icon size={16} color={n.read ? c.muted : c.mint} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: n.read ? 400 : 600, color: c.brown, fontSize: 13 }}>{isAr ? n.textAr : n.text}</p>
                <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? n.timeAr : n.time}</p>
              </div>
              <motion.button className="btn btn-glass btn-sm" style={{ fontSize: 10, padding: '2px 6px' }} whileTap={{ scale: 0.9 }} onClick={() => setDismissed(prev => new Set([...prev, n.id]))}>
                ✕
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
