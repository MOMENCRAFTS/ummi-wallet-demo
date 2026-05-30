/**
 * MotherSettingsScreen — Settings with IBAN, language, profile
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, SettingsGearIcon, ShieldLeafIcon, BellBlossomIcon, GlobeFlowerIcon, c } from '../icons/FloralIcons';

export default function MotherSettingsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><SettingsGearIcon size={20} /> {isAr ? 'الإعدادات' : 'Settings'}</span></div>
      <div className="screen-body">
        {/* IBAN */}
        <motion.div className="card" style={{ marginBottom: 8 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ fontWeight: 600, color: c.brown, fontSize: 14, marginBottom: 6 }}>{isAr ? 'البيانات البنكية' : 'Bank Details'}</p>
          <div style={{ background: c.ivory, padding: '8px 12px', borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: c.brown, letterSpacing: '0.05em' }}>
            SA •••• •••• •••• •••• ••90
          </div>
          <motion.button className="btn btn-glass btn-sm" style={{ marginTop: 8 }} whileTap={{ scale: 0.95 }}>{isAr ? 'تعديل رقم الآيبان' : 'Edit IBAN'}</motion.button>
        </motion.div>

        {/* Notifications */}
        <motion.div className="card" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><BellBlossomIcon size={18} /><span style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? 'الإشعارات' : 'Notifications'}</span></div>
          <div style={{ width: 40, height: 22, borderRadius: 11, background: c.success, position: 'relative', cursor: 'pointer' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, right: 2, transition: 'right 0.2s' }} />
          </div>
        </motion.div>

        {/* Language */}
        <motion.div className="card" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><GlobeFlowerIcon size={18} /><span style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? 'اللغة' : 'Language'}</span></div>
          <span style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'الإنجليزية' : 'English'}</span>
        </motion.div>

        {/* Security */}
        <motion.div className="card" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ShieldLeafIcon size={18} /><span style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? 'الأمان' : 'Security'}</span></div>
          <span style={{ color: c.muted, fontSize: 12 }}>{isAr ? 'تسجيل الدخول بالبصمة مفعّل' : 'Biometric On'}</span>
        </motion.div>
      </div>
    </div>
  );
}
