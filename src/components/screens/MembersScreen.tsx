/**
 * MembersScreen — Family members management
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, PersonFloralIcon, CrownFloralIcon, HeartLeafIcon, EyeLeafIcon, c } from '../icons/FloralIcons';

const MEMBERS = [
  { name: 'Ahmed', nameAr: 'أحمد', role: 'admin', roleLabel: 'Responsible Son', roleLabelAr: 'الابن المسؤول', phone: '+966 51 234 5678', joined: 'Jan 2024', joinedAr: 'يناير ٢٠٢٤', Icon: CrownFloralIcon, color: c.gold },
  { name: 'Umm Ahmed', nameAr: 'أم أحمد', role: 'mother', roleLabel: 'Mother', roleLabelAr: 'الوالدة', phone: '+966 50 111 2222', joined: 'Jan 2024', joinedAr: 'يناير ٢٠٢٤', Icon: HeartLeafIcon, color: c.pink },
  { name: 'Mohammed', nameAr: 'محمد', role: 'brother', roleLabel: 'Contributing Brother', roleLabelAr: 'الأخ المساهم', phone: '+966 55 333 4444', joined: 'Feb 2024', joinedAr: 'فبراير ٢٠٢٤', Icon: PersonFloralIcon, color: c.mint },
  { name: 'Sara', nameAr: 'سارة', role: 'observer', roleLabel: 'Observing Sister', roleLabelAr: 'الأخت المتابعة', phone: '+966 54 555 6666', joined: 'Mar 2024', joinedAr: 'مارس ٢٠٢٤', Icon: EyeLeafIcon, color: c.blue },
];

export default function MembersScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><PersonFloralIcon size={20} /> {isAr ? 'أعضاء العائلة' : 'Family Members'}</span>
      </div>
      <div className="screen-body">
        {MEMBERS.map((m, i) => (
          <motion.div
            key={m.name}
            className="card"
            style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <m.Icon size={22} color={m.color} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? m.nameAr : m.name}</p>
              <p style={{ color: m.color, fontSize: 12, fontWeight: 500 }}>{isAr ? m.roleLabelAr : m.roleLabel}</p>
              <p style={{ color: c.muted, fontSize: 11 }}>{m.phone} · {isAr ? m.joinedAr : m.joined}</p>
            </div>
          </motion.div>
        ))}

        <motion.button
          className="btn btn-primary btn-md btn-full"
          style={{ marginTop: 16 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <PersonFloralIcon size={16} color="#fff" /> {isAr ? 'دعوة عضو جديد' : 'Invite Member'}
        </motion.button>
      </div>
    </div>
  );
}
