/**
 * PendingScreen — "Waiting for X" screen with botanical breathing animation
 * Used when one role's action is blocked by another role's action.
 * Shows dynamic message + "switch to {role}" hint for the demo.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation, type AppRole } from '../../navigation';
import { useFamilyState } from '../../familyState';
import {
  FloatingPetals, SeedlingIcon, CheckLeafIcon,
  CrownFloralIcon, HeartLeafIcon, PersonFloralIcon, EyeLeafIcon, c,
} from '../icons/FloralIcons';

const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

interface PendingConfig {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  waitingForRole: AppRole;
  waitingForRoleAr: string;
  waitingForRoleEn: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  checkResolved: () => boolean;
}

const PENDING_CONFIGS: Record<string, PendingConfig> = {
  'mother-request-pending': {
    titleAr: 'بانتظار الموافقة',
    titleEn: 'Awaiting Approval',
    subtitleAr: 'وصل طلبك — أحمد يراجعه',
    subtitleEn: 'Your request was received — Ahmed is reviewing it',
    waitingForRole: 'admin',
    waitingForRoleAr: 'الابن المسؤول',
    waitingForRoleEn: 'Responsible Son',
    Icon: CrownFloralIcon,
    checkResolved: () => false, // checked dynamically
  },
  'split-proposal-pending': {
    titleAr: 'بانتظار موافقة الإخوة',
    titleEn: 'Awaiting Brothers',
    subtitleAr: 'أحمد قسّم الطلب — بانتظار موافقة الإخوة',
    subtitleEn: 'Ahmed split the request — waiting for brothers to accept',
    waitingForRole: 'brother',
    waitingForRoleAr: 'الأخ المساهم',
    waitingForRoleEn: 'Contributing Brother',
    Icon: PersonFloralIcon,
    checkResolved: () => false,
  },
  'brother-locked': {
    titleAr: 'الخطة لم تنشر بعد',
    titleEn: 'Plan Not Published Yet',
    subtitleAr: 'بانتظار الابن المسؤول ينشر الخطة المالية',
    subtitleEn: 'Waiting for the Responsible Son to publish the finance plan',
    waitingForRole: 'admin',
    waitingForRoleAr: 'الابن المسؤول',
    waitingForRoleEn: 'Responsible Son',
    Icon: CrownFloralIcon,
    checkResolved: () => false,
  },
  'observer-locked': {
    titleAr: 'بانتظار نشر الخطة',
    titleEn: 'Waiting for Plan',
    subtitleAr: 'بمجرد نشر الخطة، ستتمكنين من رؤية كل شيء',
    subtitleEn: "Once the plan is published, you'll see everything",
    waitingForRole: 'admin',
    waitingForRoleAr: 'الابن المسؤول',
    waitingForRoleEn: 'Responsible Son',
    Icon: CrownFloralIcon,
    checkResolved: () => false,
  },
};

export default function PendingScreen() {
  const { navigate, goBack, lang, params } = useNavigation();
  const familyState = useFamilyState();
  const isAr = lang === 'ar';
  const pendingType = (params?.pendingType as string) || 'mother-request-pending';
  const config = PENDING_CONFIGS[pendingType] || PENDING_CONFIGS['mother-request-pending'];

  // Check if the pending condition is resolved
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let isResolved = false;
      if (pendingType === 'mother-request-pending') {
        isResolved = !familyState.hasPendingForAdmin;
      } else if (pendingType === 'split-proposal-pending') {
        // Resolved when the related split proposal is accepted
        isResolved = familyState.splitProposals.some(
          p => p.status === 'accepted'
        );
      } else if (pendingType === 'brother-locked') {
        isResolved = familyState.planPublished;
      } else if (pendingType === 'observer-locked') {
        isResolved = familyState.planPublished;
      }

      if (isResolved && !resolved) {
        setResolved(true);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [familyState, pendingType, resolved]);

  // Auto-navigate after resolved
  useEffect(() => {
    if (resolved) {
      const timer = setTimeout(() => goBack(), 2000);
      return () => clearTimeout(timer);
    }
  }, [resolved, goBack]);

  const RoleIcon = config.Icon;

  return (
    <div className="screen pending-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={4} />

      {/* Back button */}
      <button className="back-btn" onClick={goBack} style={{ position: 'absolute', top: 12, left: isAr ? 'auto' : 12, right: isAr ? 12 : 'auto', zIndex: 10 }}>
        {isAr ? '→' : '←'}
      </button>

      {resolved ? (
        /* ─── RESOLVED STATE ─── */
        <motion.div className="pending-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring}>
          <motion.div
            className="pending-icon resolved"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <CheckLeafIcon size={48} color={c.success} />
          </motion.div>
          <h2 className="onboarding-title">{isAr ? 'تمت الموافقة!' : 'Approved!'}</h2>
          <p className="onboarding-subtitle">{isAr ? 'جارٍ العودة...' : 'Going back...'}</p>
        </motion.div>
      ) : (
        /* ─── WAITING STATE ─── */
        <motion.div className="pending-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {/* Breathing animation */}
          <motion.div
            className="pending-icon"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <SeedlingIcon size={48} color={c.mint} />
          </motion.div>

          <h2 className="onboarding-title">{isAr ? config.titleAr : config.titleEn}</h2>
          <p className="onboarding-subtitle">{isAr ? config.subtitleAr : config.subtitleEn}</p>

          {/* Waiting indicator */}
          <div className="pending-dots-row">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="pending-bounce-dot"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Switch hint */}
          <motion.div
            className="pending-switch-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <RoleIcon size={16} color={c.mint} />
            <span>
              {isAr
                ? `انتقل إلى "${config.waitingForRoleAr}" للمتابعة`
                : `Switch to "${config.waitingForRoleEn}" to continue`}
            </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
