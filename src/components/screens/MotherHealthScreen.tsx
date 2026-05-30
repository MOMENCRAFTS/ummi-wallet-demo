/**
 * MotherHealthScreen — Health tracker
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, MedicalHerbIcon, CheckLeafIcon, PendingBudIcon, c } from '../icons/FloralIcons';

const MEDICATIONS = [
  { name: 'Blood pressure meds', nameAr: 'دواء الضغط', time: 'Morning', timeAr: 'صباحاً', taken: true },
  { name: 'Diabetes pills', nameAr: 'حبوب السكر', time: 'After lunch', timeAr: 'بعد الغداء', taken: true },
  { name: 'Vitamin D', nameAr: 'فيتامين د', time: 'Evening', timeAr: 'مساءً', taken: false },
];

const APPOINTMENTS = [
  { doctor: 'Dr. Khalid — Cardiology', doctorAr: 'د. خالد — القلب', date: 'June 10', dateAr: '١٠ يونيو', time: '10:00 AM' },
  { doctor: 'Dr. Nora — General', doctorAr: 'د. نورة — عام', date: 'June 22', dateAr: '٢٢ يونيو', time: '2:30 PM' },
];

export default function MotherHealthScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><MedicalHerbIcon size={20} /> {isAr ? 'الصحة' : 'Health'}</span></div>
      <div className="screen-body">
        <h3 className="section-title">{isAr ? 'الأدوية اليومية' : 'Daily Medications'}</h3>
        {MEDICATIONS.map((m, i) => (
          <motion.div key={m.name} className="card" style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div><p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? m.nameAr : m.name}</p><p style={{ color: c.muted, fontSize: 11 }}>{isAr ? m.timeAr : m.time}</p></div>
            {m.taken ? <span className="badge badge-approved" style={{ background: c.success + '20', color: c.success }}><CheckLeafIcon size={12} color={c.success} /> {isAr ? 'تم أخذه' : 'Taken'}</span> : <span className="badge badge-pending"><PendingBudIcon size={12} /> {isAr ? 'لم يؤخذ' : 'Pending'}</span>}
          </motion.div>
        ))}

        <h3 className="section-title" style={{ marginTop: 16 }}>{isAr ? 'المواعيد القادمة' : 'Upcoming Appointments'}</h3>
        {APPOINTMENTS.map((a, i) => (
          <motion.div key={a.doctor} className="card" style={{ marginBottom: 6, borderLeftWidth: 3, borderLeftColor: c.blue, borderLeftStyle: 'solid' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}>
            <p style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>{isAr ? a.doctorAr : a.doctor}</p>
            <p style={{ color: c.muted, fontSize: 12 }}>{isAr ? a.dateAr : a.date} · {a.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
