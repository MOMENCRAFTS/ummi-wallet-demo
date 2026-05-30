/**
 * MotherHomeCarScreen — Home & Car maintenance
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, SunflowerHomeIcon, WrenchVineIcon, PendingBudIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

const ITEMS = [
  { type: 'home', title: 'AC not cooling — bedroom', titleAr: 'المكيّف ما يبرّد — غرفة النوم', status: 'in_progress', statusAr: 'جاري' },
  { type: 'home', title: 'Kitchen faucet leaking', titleAr: 'صنبور المطبخ يسرّب', status: 'pending', statusAr: 'بانتظار' },
  { type: 'car', title: 'Oil change due', titleAr: 'موعد تغيير الزيت', status: 'scheduled', statusAr: 'مجدول' },
  { type: 'home', title: 'Garden irrigation fixed', titleAr: 'تم إصلاح ري الحديقة', status: 'done', statusAr: 'مكتمل' },
];

export default function MotherHomeCarScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><SunflowerHomeIcon size={20} /> {isAr ? 'البيت والسيارة' : 'Home & Car'}</span></div>
      <div className="screen-body">
        {ITEMS.map((item, i) => (
          <motion.div key={item.title} className="card" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, opacity: item.status === 'done' ? 0.6 : 1 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: item.status === 'done' ? 0.6 : 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: (item.type === 'car' ? c.yellow : c.mint) + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.type === 'car' ? <WrenchVineIcon size={16} color={c.yellow} /> : <SunflowerHomeIcon size={16} color={c.mint} />}
            </div>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? item.titleAr : item.title}</p></div>
            <span className={`badge ${item.status === 'done' ? 'badge-approved' : 'badge-pending'}`} style={item.status === 'done' ? { background: c.success + '20', color: c.success } : {}}>
              {item.status === 'done' ? <CheckLeafIcon size={12} color={c.success} /> : <PendingBudIcon size={12} />} {isAr ? item.statusAr : item.status}
            </span>
          </motion.div>
        ))}
        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          {isAr ? 'طلب صيانة جديد' : 'New Request'}
        </motion.button>
      </div>
    </div>
  );
}
