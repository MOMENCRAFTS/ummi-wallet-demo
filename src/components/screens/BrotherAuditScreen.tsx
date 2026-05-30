/**
 * BrotherAuditScreen — Read-only plan view for contributor
 * Shows the same budget items as FinanceSummary but without edit controls
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal headers, Shami-style share status
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, HeartLeafIcon, PersonFloralIcon,
  SunflowerHomeIcon, LeafBillIcon, ChartBloomIcon,
  CheckLeafIcon, BouquetIcon, c,
} from '../icons/FloralIcons';

const ITEMS = [
  { Icon: HeartLeafIcon, label: 'Personal Allowance', labelAr: 'المصروف الشخصي', amount: 1200 },
  { Icon: PersonFloralIcon, label: 'Maid Salary', labelAr: 'راتب الخادمة', amount: 1500 },
  { Icon: SunflowerHomeIcon, label: 'Driver Salary', labelAr: 'راتب السائق', amount: 1800 },
  { Icon: LeafBillIcon, label: 'Utilities', labelAr: 'المرافق', amount: 800 },
];

const MY_SHARE = { amount: 2000, paid: 2000 };
const BROTHERS = 3;

export default function BrotherAuditScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const total = ITEMS.reduce((s, i) => s + i.amount, 0);
  const remaining = MY_SHARE.amount - MY_SHARE.paid;

  return (
    <div className="screen brother-audit-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChartBloomIcon size={20} /> {isAr ? 'مراجعة الخطة' : 'Plan Audit'}
        </span>
      </div>

      <div className="screen-body">
        {/* Total */}
        <motion.div
          className="card glass flourish total-hero"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <p className="total-label">{isAr ? 'إجمالي الخطة الشهرية' : 'Total Monthly Plan'}</p>
          <h1 className="total-amount">{total.toLocaleString()} <span className="total-currency">{isAr ? 'ر.س' : 'SAR'}</span></h1>
          <p style={{ fontSize: 12, color: c.muted, marginTop: 4 }}>
            {isAr ? `مقسّم على ${BROTHERS} إخوان` : `Split among ${BROTHERS} brothers`}
          </p>
        </motion.div>

        {/* Items */}
        <h3 className="section-heading" style={{ marginTop: 16 }}>{isAr ? 'بنود الميزانية' : 'Budget Items'}</h3>
        <div className="item-list">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              className="item-row"
              initial={{ opacity: 0, x: isAr ? 15 : -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
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

        {/* My Share */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ marginTop: 16, borderLeft: `3px solid ${remaining <= 0 ? c.success : c.peach}` }}
        >
          <div className="request-row">
            <div>
              <span className="request-amount">{MY_SHARE.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span></span>
              <span className="request-category">{isAr ? 'حصتي الشهرية' : 'My monthly share'}</span>
            </div>
            <span className={`badge ${remaining <= 0 ? 'badge-approved' : 'badge-pending'}`} style={remaining <= 0 ? { background: c.success + '20', color: c.success } : {}}>
              {remaining <= 0
                ? <><CheckLeafIcon size={12} color={c.success} /> {isAr ? 'تمت التسوية' : 'Settled'}</>
                : <>{isAr ? 'قيد الانتظار' : 'Pending'}</>
              }
            </span>
          </div>
          {remaining <= 0 && (
            <p style={{ fontSize: 12, color: c.success, marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <BouquetIcon size={14} /> {isAr ? 'تم تقديم الإثبات — جزاك الله خيرًا' : 'Proof submitted — JazakAllahu Khairan'}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
