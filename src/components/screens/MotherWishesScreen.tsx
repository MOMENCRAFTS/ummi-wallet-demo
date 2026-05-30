/**
 * MotherWishesScreen — Wish list
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, HeartLeafIcon, TulipIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const WISHES_DATA = [
  { id: '1', item: 'New prayer rug', itemAr: 'سجادة صلاة جديدة', est: 200, status: 'requested' },
  { id: '2', item: 'Quran stand (wooden)', itemAr: 'حامل مصحف خشبي', est: 150, status: 'pending' },
  { id: '3', item: 'Kitchen mixer', itemAr: 'خلّاط مطبخ', est: 450, status: 'approved' },
  { id: '4', item: 'Abaya — new season', itemAr: 'عباية — الموسم الجديد', est: 350, status: 'pending' },
];

const statusConfig: Record<string, { label: string; labelAr: string; badge: string }> = {
  requested: { label: 'Requested', labelAr: 'مطلوب', badge: 'badge-pending' },
  pending: { label: 'Pending', labelAr: 'بانتظار', badge: 'badge-pending' },
  approved: { label: 'Approved', labelAr: 'تمّت الموافقة', badge: 'badge-approved' },
};

export default function MotherWishesScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [wishes] = useState(WISHES_DATA);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><HeartLeafIcon size={20} /> {isAr ? 'الأمنيات' : 'Wishes'}</span></div>
      <div className="screen-body">
        {wishes.map((w, i) => {
          const cfg = statusConfig[w.status];
          return (
            <motion.div key={w.id} className="card" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div>
                <p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? w.itemAr : w.item}</p>
                <p style={{ color: c.muted, fontSize: 11 }}>~{w.est} {isAr ? 'ر.س' : 'SAR'}</p>
              </div>
              <span className={`badge ${cfg.badge}`} style={w.status === 'approved' ? { background: c.success + '20', color: c.success } : {}}>
                {w.status === 'approved' && <CheckLeafIcon size={12} color={c.success} />} {isAr ? cfg.labelAr : cfg.label}
              </span>
            </motion.div>
          );
        })}
        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          <TulipIcon size={16} color="#fff" /> {isAr ? 'إضافة أمنية' : 'Add Wish'}
        </motion.button>
      </div>
    </div>
  );
}
