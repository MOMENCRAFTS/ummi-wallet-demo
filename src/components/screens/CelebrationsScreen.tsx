/**
 * CelebrationsScreen — Family events & celebrations
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, CakeBlossomIcon, HeartLeafIcon, SparkleStarIcon, c } from '../icons/FloralIcons';

const EVENTS = [
  { id: '1', name: "Eid Al-Adha", nameAr: 'عيد الأضحى المبارك', date: 'June 7, 2026', dateAr: '٧ يونيو ٢٠٢٦', days: 10, type: 'religious', budget: 5000 },
  { id: '2', name: "Mother's Birthday", nameAr: 'عيد ميلاد أمي', date: 'June 15, 2026', dateAr: '١٥ يونيو ٢٠٢٦', days: 18, type: 'family', budget: 2000 },
  { id: '3', name: 'Family Anniversary', nameAr: 'ذكرى العائلة', date: 'July 22, 2026', dateAr: '٢٢ يوليو ٢٠٢٦', days: 55, type: 'family', budget: 1500 },
  { id: '4', name: "Khalid's Graduation", nameAr: 'تخرّج خالد', date: 'Aug 10, 2026', dateAr: '١٠ أغسطس ٢٠٢٦', days: 74, type: 'milestone', budget: 3000 },
];

const typeConfig: Record<string, { color: string; Icon: React.ComponentType<{size?: number; color?: string}> }> = {
  religious: { color: c.gold, Icon: SparkleStarIcon },
  family: { color: c.pink, Icon: HeartLeafIcon },
  milestone: { color: c.mint, Icon: CakeBlossomIcon },
};

export default function CelebrationsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><CakeBlossomIcon size={20} /> {isAr ? 'المناسبات' : 'Celebrations'}</span>
      </div>
      <div className="screen-body">
        {EVENTS.map((e, i) => {
          const cfg = typeConfig[e.type] || typeConfig.family;
          return (
            <motion.div
              key={e.id}
              className="card"
              style={{ marginBottom: 10, borderLeftWidth: 3, borderLeftColor: cfg.color, borderLeftStyle: 'solid' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: cfg.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <cfg.Icon size={18} color={cfg.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? e.nameAr : e.name}</p>
                  <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? e.dateAr : e.date}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <motion.span
                    style={{ fontSize: 20, fontWeight: 800, color: e.days <= 14 ? c.emergency : c.brown, display: 'block' }}
                    animate={e.days <= 14 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {e.days}
                  </motion.span>
                  <span style={{ fontSize: 10, color: c.muted }}>{isAr ? 'يوم' : 'days'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 11, color: c.muted }}>{isAr ? 'الميزانية:' : 'Budget:'} {e.budget.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</span>
                <motion.button className="btn btn-glass btn-sm" whileTap={{ scale: 0.95 }}>
                  {isAr ? 'خطّط' : 'Plan'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 12 }} whileTap={{ scale: 0.97 }}>
          <CakeBlossomIcon size={16} color="#fff" /> {isAr ? 'إضافة مناسبة' : 'Add Celebration'}
        </motion.button>
      </div>
    </div>
  );
}
