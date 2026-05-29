/**
 * WaitingRoomScreen — Family approval waiting room
 * Now includes: FlowerVideo (approval_waiting.mp4) as background
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, WalletRoseIcon, CrownFloralIcon,
  PersonFloralIcon, EyeLeafIcon, HeartLeafIcon,
  CheckLeafIcon, PendingBudIcon, LiveDotIcon,
} from '../icons/FloralIcons';
import FlowerVideo from '../videos/FlowerVideo';

const ROLE_AR: Record<string, string> = { admin: 'الابن المسؤول', contributor: 'الأخ المساهم', observer: 'الأخت المتابعة', 'care-receiver': 'الوالدة' };

const MEMBERS = [
  { name: 'Ahmed', nameAr: 'أحمد', role: 'admin', status: 'dispatched', Icon: CrownFloralIcon },
  { name: 'Mohammed', nameAr: 'محمد', role: 'contributor', status: 'pending', Icon: PersonFloralIcon },
  { name: 'Sarah', nameAr: 'سارة', role: 'observer', status: 'pending', Icon: EyeLeafIcon },
  { name: 'Mother', nameAr: 'الوالدة', role: 'care-receiver', status: 'waiting', Icon: HeartLeafIcon },
];

export default function WaitingRoomScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen waiting-room" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Video background — loops approval_waiting.mp4 */}
      <FlowerVideo
        mode="loading"
        overlayTextAr="في انتظار ردود الأعضاء..."
        overlayText="Waiting for member responses..."
      />

      {/* Content overlay on top of video */}
      <div className="waiting-room-content">
        <div className="screen-header" style={{ background: 'transparent' }}>
          <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
          <span className="header-title">{isAr ? 'غرفة الانتظار' : 'Waiting Room'}</span>
        </div>
        <div className="screen-body">
          {/* Pending visualization */}
          <motion.div
            className="card glass flourish waiting-hero"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="waiting-icon">
              <WalletRoseIcon size={36} />
            </div>
            <h2>{isAr ? 'في انتظار الردود' : 'Waiting for Responses'}</h2>
            <p className="waiting-subtitle">
              {isAr ? 'أُرسلت الخطة لكل الأعضاء' : 'Plan dispatched to all members'}
            </p>
            <div className="progress-ring">
              <span className="progress-text">1/3</span>
            </div>
          </motion.div>

          {/* Members */}
          <h3 className="section-heading">{isAr ? 'الأعضاء' : 'Members'}</h3>
          <div className="members-list">
            {MEMBERS.map((m, i) => (
              <motion.div
                key={m.name}
                className={`member-row ${m.status}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
              >
                <span className="member-icon-svg"><m.Icon size={24} /></span>
                <div className="member-info">
                  <span className="member-name">{isAr ? m.nameAr : m.name}</span>
                  <span className="member-role">{isAr ? ROLE_AR[m.role] || m.role : m.role}</span>
                </div>
                <span className="member-status-icon">
                  {m.status === 'dispatched' ? <CheckLeafIcon size={18} /> :
                   m.status === 'pending' ? <PendingBudIcon size={18} /> :
                   <LiveDotIcon size={16} />}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Force activate */}
          <motion.button
            className="btn btn-primary btn-lg glow-mint"
            onClick={() => navigate('finance-celebration')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ width: '100%', marginTop: 16 }}
          >
            <CheckLeafIcon size={18} /> {isAr ? 'تفعيل الخطة' : 'Force Activate'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
