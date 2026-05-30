/**
 * FinanceSummaryScreen — Plan summary with budget breakdown
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, HeartLeafIcon, PersonFloralIcon,
  SunflowerHomeIcon, LeafBillIcon, NewsScrollIcon,
  DocumentLeafIcon, c,
} from '../icons/FloralIcons';

const ITEMS = [
  { Icon: HeartLeafIcon, label: 'Personal Allowance', labelAr: 'المصروف الشخصي', amount: 1200 },
  { Icon: PersonFloralIcon, label: 'Maid Salary', labelAr: 'راتب الخادمة', amount: 1500 },
  { Icon: SunflowerHomeIcon, label: 'Driver Salary', labelAr: 'راتب السائق', amount: 1800 },
  { Icon: LeafBillIcon, label: 'Utilities', labelAr: 'المرافق', amount: 800 },
];

export default function FinanceSummaryScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const total = ITEMS.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="screen finance-summary" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title">{isAr ? 'ملخص الخطة' : 'Plan Summary'}</span>
      </div>
      <div className="screen-body">
        {/* Hero total */}
        <motion.div
          className="card glass flourish total-hero"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <p className="total-label">{isAr ? 'الإجمالي الشهري' : 'Monthly Total'}</p>
          <h1 className="total-amount">{total.toLocaleString()} <span className="total-currency">{isAr ? 'ر.س' : 'SAR'}</span></h1>
          <div className="budget-bar">
            <div className="budget-segment needs" style={{width: '72%'}}>72%</div>
            <div className="budget-segment wants" style={{width: '18%'}}>18%</div>
            <div className="budget-segment safety" style={{width: '10%'}}>10%</div>
          </div>
          <div className="budget-legend">
            <span><span className="legend-dot" style={{ background: c.mint }} /> {isAr ? 'الاحتياجات' : 'Needs'}</span>
            <span><span className="legend-dot" style={{ background: c.yellow }} /> {isAr ? 'الرغبات' : 'Wants'}</span>
            <span><span className="legend-dot" style={{ background: c.blue }} /> {isAr ? 'الاحتياطي' : 'Safety'}</span>
          </div>
        </motion.div>

        {/* Items */}
        <div className="item-list">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              className="item-row"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <span className="item-icon-svg"><item.Icon size={22} /></span>
              <div className="item-labels">
                <span className="item-label-ar">{item.labelAr}</span>
                <span className="item-label-en">{item.label}</span>
              </div>
              <span className="item-amount">{item.amount.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="action-buttons">
          <button className="btn btn-primary btn-lg glow-mint" onClick={() => navigate('finance-waiting')}>
            <NewsScrollIcon size={18} /> {isAr ? 'إرسال الخطة للعائلة' : 'Dispatch to Family'}
          </button>
          <button className="btn btn-outline" onClick={() => navigate('finance-chat')}>
            <DocumentLeafIcon size={16} /> {isAr ? 'تعديل' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
}
