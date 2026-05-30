/**
 * MotherCelebrationsScreen — Upcoming family events
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, CakeBlossomIcon, HeartLeafIcon, c } from '../icons/FloralIcons';

const EVENTS = [
  { name: "Eid Al-Adha", nameAr: 'عيد الأضحى', days: 10, dateAr: '٧ يونيو' },
  { name: "Mother's Birthday", nameAr: 'عيد ميلادي', days: 18, dateAr: '١٥ يونيو' },
  { name: 'Family Anniversary', nameAr: 'ذكرى العائلة', days: 55, dateAr: '٢٢ يوليو' },
];

export default function MotherCelebrationsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><CakeBlossomIcon size={20} /> {isAr ? 'المناسبات' : 'Celebrations'}</span></div>
      <div className="screen-body">
        {EVENTS.map((e, i) => (
          <motion.div key={e.name} className="card" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.pink + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HeartLeafIcon size={20} color={c.pink} /></div>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? e.nameAr : e.name}</p><p style={{ color: c.muted, fontSize: 12 }}>{e.dateAr}</p></div>
            <div style={{ textAlign: 'center' }}><span style={{ fontSize: 20, fontWeight: 800, color: e.days <= 14 ? c.emergency : c.brown }}>{e.days}</span><br /><span style={{ fontSize: 10, color: c.muted }}>{isAr ? 'يوم' : 'days'}</span></div>
          </motion.div>
        ))}
        <motion.button className="btn btn-glass btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          <HeartLeafIcon size={16} color={c.pink} /> {isAr ? 'إرسال دعاء' : 'Send Blessing'}
        </motion.button>
      </div>
    </div>
  );
}
