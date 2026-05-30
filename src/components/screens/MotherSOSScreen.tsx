/**
 * MotherSOSScreen — Emergency request screen
 * Zero emoji — RoseSOSIcon, MedicalHerbIcon, WrenchVineIcon
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  RoseSOSIcon, MedicalHerbIcon, WrenchVineIcon, ArrowLeafIcon,
} from '../icons/FloralIcons';

// Alert Tulip (inline since not yet exported)
function CarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 14 L6 9 L10 7 L18 7 L20 9 L22 14" stroke="#8A7A68" strokeWidth="1.2" fill="#FFFCF2"/>
      <rect x="3" y="14" rx="2" width="18" height="5" fill="#FFFCF2" stroke="#8A7A68" strokeWidth="1.2"/>
      <circle cx="7" cy="19" r="2" fill="#8A7A68" opacity="0.5"/>
      <circle cx="17" cy="19" r="2" fill="#8A7A68" opacity="0.5"/>
    </svg>
  );
}

export default function MotherSOSScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen sos-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RoseSOSIcon size={20} /> {isAr ? 'طلب طوارئ' : 'Emergency Request'}
        </span>
      </div>

      <div className="screen-body">
        <motion.div
          className="sos-hero"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <RoseSOSIcon size={56} />
        </motion.div>

        <motion.p className="sos-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isAr ? 'حددي نوع الطوارئ' : 'Select emergency type'}
        </motion.p>

        <motion.div className="chip-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button className="chip active"><MedicalHerbIcon size={16} /> {isAr ? 'طبي' : 'Medical'}</button>
          <button className="chip"><WrenchVineIcon size={16} /> {isAr ? 'صيانة' : 'Repair'}</button>
          <button className="chip"><CarIcon size={16} /> {isAr ? 'نقل' : 'Transport'}</button>
          <button className="chip"><RoseSOSIcon size={14} /> {isAr ? 'أخرى' : 'Other'}</button>
        </motion.div>

        <motion.textarea
          className="sos-textarea"
          placeholder={isAr ? 'اشرحي الموقف...' : 'Describe the situation...'}
          rows={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        />

        <motion.button
          className="sos-submit-btn"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RoseSOSIcon size={20} /> {isAr ? 'إرسال طلب الطوارئ' : 'Send Emergency Request'}
        </motion.button>
      </div>
    </div>
  );
}
