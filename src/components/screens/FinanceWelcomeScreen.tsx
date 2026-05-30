/**
 * FinanceWelcomeScreen — Finance Setup entry
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, WalletRoseIcon, QueueScrollIcon, MoneyLeafIcon,
  PersonFloralIcon, LeafBillIcon, SunflowerHomeIcon, ChatBubbleLeafIcon,
  DocumentLeafIcon, VineDivider,
} from '../icons/FloralIcons';

export default function FinanceWelcomeScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  return (
    <div className="screen finance-welcome" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title">{isAr ? 'إعداد الخطة المالية' : 'Finance Setup'}</span>
      </div>
      <motion.div className="screen-body"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="botanical-header">
          <WalletRoseIcon size={32} />
        </div>
        <h2 className="screen-title-ar">أمي شاركت احتياجاتها الشهرية</h2>
        <p className="screen-subtitle">{isAr ? 'خلّنا نبني خطة دعمها' : "Let's build her support plan"}</p>
        <div className="card glass flourish">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <QueueScrollIcon size={18} /> {isAr ? 'ما ذكرته الوالدة' : "What Mother told us"}
          </h3>
          <div className="summary-row"><span className="summary-icon"><MoneyLeafIcon size={18} /></span><span>{isAr ? 'الاحتياج الشهري: ~٥,٠٠٠ ر.س' : 'Monthly need: ~5,000 SAR'}</span></div>
          <div className="summary-row"><span className="summary-icon"><PersonFloralIcon size={18} /></span><span>{isAr ? 'عاملة منزلية + سائق' : 'Maid + Driver'}</span></div>
          <div className="summary-row"><span className="summary-icon"><LeafBillIcon size={18} /></span><span>{isAr ? 'كهرباء، ماء، إنترنت' : 'Electric, Water, Internet'}</span></div>
          <div className="summary-row"><span className="summary-icon"><SunflowerHomeIcon size={18} /></span><span>{isAr ? 'سيارة واحدة' : '1 car'}</span></div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary btn-lg glow-mint" onClick={() => navigate('finance-chat')}>
            <ChatBubbleLeafIcon size={20} /> {isAr ? 'بدء الإعداد بمساعدة الذكاء الاصطناعي' : 'Start AI-Guided Setup'}
          </button>
          <button className="btn btn-outline" onClick={() => navigate('finance-chat')}>
            <DocumentLeafIcon size={18} /> {isAr ? 'الإعداد اليدوي' : 'Set Up Manually'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
