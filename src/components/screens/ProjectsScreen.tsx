/**
 * ProjectsScreen — Family savings projects
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, TulipIcon, SeedlingIcon, c } from '../icons/FloralIcons';

const PROJECTS = [
  { id: '1', name: 'Kitchen Renovation', nameAr: 'تجديد المطبخ', target: 25000, current: 18500, status: 'active', statusAr: 'جاري', contributors: 3 },
  { id: '2', name: 'Hajj Savings', nameAr: 'ادخار الحج', target: 40000, current: 32000, status: 'active', statusAr: 'جاري', contributors: 4 },
  { id: '3', name: 'Education Fund', nameAr: 'صندوق التعليم', target: 50000, current: 12000, status: 'active', statusAr: 'جاري', contributors: 2 },
  { id: '4', name: 'AC Replacement', nameAr: 'تبديل المكيّفات', target: 8000, current: 8000, status: 'completed', statusAr: 'مكتمل', contributors: 3 },
];

export default function ProjectsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><TulipIcon size={20} /> {isAr ? 'المشاريع' : 'Projects'}</span>
      </div>
      <div className="screen-body">
        {PROJECTS.map((p, i) => {
          const pct = Math.round((p.current / p.target) * 100);
          const done = pct >= 100;
          return (
            <motion.div
              key={p.id}
              className="card"
              style={{ marginBottom: 10, opacity: done ? 0.7 : 1 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: done ? 0.7 : 1, y: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? p.nameAr : p.name}</p>
                  <p style={{ color: c.muted, fontSize: 12 }}>{p.contributors} {isAr ? 'مساهمًا' : 'contributors'}</p>
                </div>
                <span className={`badge ${done ? 'badge-approved' : 'badge-pending'}`} style={done ? { background: c.success + '20', color: c.success } : {}}>
                  {isAr ? p.statusAr : p.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 12, color: c.muted }}>{p.current.toLocaleString()} / {p.target.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: done ? c.success : c.brown }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: c.divider, borderRadius: 3, marginTop: 4 }}>
                <motion.div
                  style={{ height: 6, background: done ? c.success : `linear-gradient(90deg, ${c.mint}, ${c.yellow})`, borderRadius: 3 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                />
              </div>
              {!done && (
                <motion.button className="btn btn-glass btn-sm" style={{ marginTop: 8 }} whileTap={{ scale: 0.95 }}>
                  <SeedlingIcon size={14} /> {isAr ? 'المساهمة' : 'Contribute'}
                </motion.button>
              )}
            </motion.div>
          );
        })}

        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 12 }} whileTap={{ scale: 0.97 }}>
          <TulipIcon size={16} color="#fff" /> {isAr ? 'مشروع جديد' : 'New Project'}
        </motion.button>
      </div>
    </div>
  );
}
