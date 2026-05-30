/**
 * MaintenanceScreen — Home maintenance tracker
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, WrenchVineIcon, CheckLeafIcon, PendingBudIcon, c } from '../icons/FloralIcons';

const REQUESTS = [
  { id: '1', title: 'AC unit — bedroom', titleAr: 'تكييف غرفة النوم', status: 'in_progress', contractor: 'Al Faisal HVAC', contractorAr: 'الفيصل للتكييف', cost: 450, date: 'May 25', dateAr: '٢٥ مايو' },
  { id: '2', title: 'Plumbing — kitchen sink', titleAr: 'سباكة — حوض المطبخ', status: 'done', contractor: 'Quick Fix', contractorAr: 'كويك فيكس', cost: 120, date: 'May 20', dateAr: '٢٠ مايو' },
  { id: '3', title: 'Electrical — living room', titleAr: 'كهرباء — غرفة المعيشة', status: 'pending', contractor: 'Pending', contractorAr: 'بانتظار الفني', cost: 0, date: 'Jun 2', dateAr: '٢ يونيو' },
  { id: '4', title: 'Paint — exterior walls', titleAr: 'دهان — الجدران الخارجية', status: 'scheduled', contractor: 'Rashed Painting', contractorAr: 'راشد للدهانات', cost: 3500, date: 'Jun 15', dateAr: '١٥ يونيو' },
];

const statusConfig: Record<string, { label: string; labelAr: string; color: string; badge: string }> = {
  done: { label: 'Done', labelAr: 'مكتمل', color: c.success, badge: 'badge-approved' },
  in_progress: { label: 'In Progress', labelAr: 'جاري', color: c.yellow, badge: 'badge-pending' },
  pending: { label: 'Pending', labelAr: 'بانتظار', color: c.peach, badge: 'badge-pending' },
  scheduled: { label: 'Scheduled', labelAr: 'مجدول', color: c.blue, badge: 'badge-active' },
};

export default function MaintenanceScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><WrenchVineIcon size={20} /> {isAr ? 'الصيانة' : 'Maintenance'}</span>
      </div>
      <div className="screen-body">
        {REQUESTS.map((r, i) => {
          const cfg = statusConfig[r.status];
          return (
            <motion.div
              key={r.id}
              className="card"
              style={{ marginBottom: 8, borderLeftWidth: 3, borderLeftColor: cfg.color, borderLeftStyle: 'solid' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? r.titleAr : r.title}</p>
                  <p style={{ color: c.muted, fontSize: 12, marginTop: 2 }}>{isAr ? r.contractorAr : r.contractor}</p>
                  <p style={{ color: c.muted, fontSize: 11, marginTop: 2 }}>
                    {r.cost > 0 ? `${r.cost.toLocaleString()} ${isAr ? 'ر.س' : 'SAR'} · ` : ''}{isAr ? r.dateAr : r.date}
                  </p>
                </div>
                <span className={`badge ${cfg.badge}`} style={r.status === 'done' ? { background: c.success + '20', color: c.success } : {}}>
                  {r.status === 'done' && <CheckLeafIcon size={12} color={c.success} />}
                  {r.status === 'pending' && <PendingBudIcon size={12} />}
                  {' '}{isAr ? cfg.labelAr : cfg.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        <motion.button
          className="btn btn-primary btn-md btn-full"
          style={{ marginTop: 16 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <WrenchVineIcon size={16} color="#fff" /> {isAr ? 'طلب صيانة جديد' : 'New Request'}
        </motion.button>
      </div>
    </div>
  );
}
