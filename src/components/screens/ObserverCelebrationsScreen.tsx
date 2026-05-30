/**
 * ObserverCelebrationsScreen — Read-only celebrations
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, CakeBlossomIcon, EyeLeafIcon, HeartLeafIcon, c } from '../icons/FloralIcons';

const EVENTS = [
  { name: "Eid Al-Adha", nameAr: 'عيد الأضحى', days: 10, dateAr: '٧ يونيو' },
  { name: "Mother's Birthday", nameAr: 'عيد ميلاد أمي', days: 18, dateAr: '١٥ يونيو' },
  { name: 'Family Anniversary', nameAr: 'ذكرى العائلة', days: 55, dateAr: '٢٢ يوليو' },
];

export default function ObserverCelebrationsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><CakeBlossomIcon size={20} /> {isAr ? 'المناسبات' : 'Celebrations'}</span></div>
      <div className="screen-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '6px 12px', background: c.blue + '12', borderRadius: 8 }}>
          <EyeLeafIcon size={14} color={c.blue} />
          <span style={{ fontSize: 11, color: c.blue, fontWeight: 500 }}>{isAr ? 'وضع المشاهدة فقط' : 'View-only mode'}</span>
        </div>
        {EVENTS.map((e, i) => (
          <motion.div key={e.name} className="card" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.pink + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HeartLeafIcon size={18} color={c.pink} /></div>
            <div style={{ flex: 1 }}><p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? e.nameAr : e.name}</p><p style={{ color: c.muted, fontSize: 12 }}>{e.dateAr}</p></div>
            <div style={{ textAlign: 'center' }}><span style={{ fontSize: 18, fontWeight: 800, color: e.days <= 14 ? c.emergency : c.brown }}>{e.days}</span><br /><span style={{ fontSize: 10, color: c.muted }}>{isAr ? 'يوم' : 'days'}</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
