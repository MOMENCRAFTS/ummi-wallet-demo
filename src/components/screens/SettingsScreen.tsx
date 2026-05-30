/**
 * SettingsScreen — Shared settings (role-aware)
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, SettingsGearIcon, ShieldLeafIcon, BellBlossomIcon,
  GlobeFlowerIcon, PersonFloralIcon, MoneyLeafIcon, c,
} from '../icons/FloralIcons';

const SETTINGS = [
  { key: 'profile', label: 'Profile', labelAr: 'الملف الشخصي', Icon: PersonFloralIcon, detail: 'Ahmed', detailAr: 'أحمد' },
  { key: 'bank', label: 'Bank Details', labelAr: 'بيانات البنك', Icon: MoneyLeafIcon, detail: 'SA•••90', detailAr: 'SA•••90' },
  { key: 'notifications', label: 'Notifications', labelAr: 'الإشعارات', Icon: BellBlossomIcon, detail: 'On', detailAr: 'مفعّلة' },
  { key: 'language', label: 'Language', labelAr: 'اللغة', Icon: GlobeFlowerIcon, detail: 'العربية / English', detailAr: 'العربية / English' },
  { key: 'security', label: 'Security', labelAr: 'الأمان', Icon: ShieldLeafIcon, detail: 'Biometric On', detailAr: 'بصمة مفعّلة' },
];

export default function SettingsScreen() {
  const { goBack, lang, navigate } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><SettingsGearIcon size={20} /> {isAr ? 'الإعدادات' : 'Settings'}</span></div>
      <div className="screen-body">
        {SETTINGS.map((s, i) => (
          <motion.div key={s.key} className="card" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <s.Icon size={18} />
              <span style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? s.labelAr : s.label}</span>
            </div>
            <span style={{ color: c.muted, fontSize: 12 }}>{isAr ? s.detailAr : s.detail}</span>
          </motion.div>
        ))}

        <motion.button
          className="btn btn-glass btn-md btn-full"
          style={{ marginTop: 24, color: c.emergency, borderColor: c.emergency }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('landing')}
        >
          {isAr ? 'تسجيل الخروج' : 'Logout'}
        </motion.button>
      </div>
    </div>
  );
}
