/**
 * MotherHistoryScreen — Transaction history
 * Monthly grouped list of past payments
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal headers, Shami status
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, NewsScrollIcon, CheckLeafIcon, PendingBudIcon,
  MoneyLeafIcon, MedicalHerbIcon, SunflowerHomeIcon, LeafBillIcon,
  HandPetalIcon, c,
} from '../icons/FloralIcons';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  allowance: MoneyLeafIcon,
  groceries: SunflowerHomeIcon,
  pharmacy: MedicalHerbIcon,
  bills: LeafBillIcon,
  request: HandPetalIcon,
};

const HISTORY = [
  { month: 'June 2026', monthAr: 'يونيو ٢٠٢٦', items: [
    { id: 1, type: 'allowance', label: 'Monthly Allowance', labelAr: 'المصروف الشهري', amount: 1200, date: 'Jun 1', dateAr: '١ يونيو', status: 'approved' as const },
    { id: 2, type: 'pharmacy', label: 'Pharmacy', labelAr: 'صيدلية', amount: 280, date: 'Jun 3', dateAr: '٣ يونيو', status: 'pending' as const },
  ]},
  { month: 'May 2026', monthAr: 'مايو ٢٠٢٦', items: [
    { id: 3, type: 'allowance', label: 'Monthly Allowance', labelAr: 'المصروف الشهري', amount: 1200, date: 'May 1', dateAr: '١ مايو', status: 'approved' as const },
    { id: 4, type: 'groceries', label: 'Groceries', labelAr: 'بقالة', amount: 450, date: 'May 5', dateAr: '٥ مايو', status: 'approved' as const },
    { id: 5, type: 'bills', label: 'Electricity Bill', labelAr: 'فاتورة كهرباء', amount: 265, date: 'May 8', dateAr: '٨ مايو', status: 'approved' as const },
    { id: 6, type: 'request', label: 'Emergency Request', labelAr: 'طلب طوارئ', amount: 500, date: 'May 12', dateAr: '١٢ مايو', status: 'approved' as const },
    { id: 7, type: 'pharmacy', label: 'Pharmacy', labelAr: 'صيدلية', amount: 180, date: 'May 20', dateAr: '٢٠ مايو', status: 'approved' as const },
  ]},
  { month: 'April 2026', monthAr: 'أبريل ٢٠٢٦', items: [
    { id: 8, type: 'allowance', label: 'Monthly Allowance', labelAr: 'المصروف الشهري', amount: 1200, date: 'Apr 1', dateAr: '١ أبريل', status: 'approved' as const },
    { id: 9, type: 'groceries', label: 'Groceries', labelAr: 'بقالة', amount: 380, date: 'Apr 10', dateAr: '١٠ أبريل', status: 'approved' as const },
  ]},
];

const STATUS_BADGE = {
  approved: { cls: 'badge-approved', en: 'Approved', ar: 'تمّت' },
  pending: { cls: 'badge-pending', en: 'Pending', ar: 'معلّقة' },
};

export default function MotherHistoryScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen mother-history-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NewsScrollIcon size={20} /> {isAr ? 'سجل المعاملات' : 'Transaction History'}
        </span>
      </div>

      <div className="screen-body">
        {HISTORY.map((group, gi) => (
          <div key={group.month}>
            <motion.h3
              className="section-heading"
              style={{ marginTop: gi > 0 ? 20 : 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: gi * 0.1 }}
            >
              {isAr ? group.monthAr : group.month}
            </motion.h3>

            {group.items.map((item, i) => {
              const IconComp = ICON_MAP[item.type] || MoneyLeafIcon;
              const badge = STATUS_BADGE[item.status];
              return (
                <motion.div
                  key={item.id}
                  className="card request-card"
                  initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.1 + i * 0.04, type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <div className="request-row">
                    <span className="item-icon-svg" style={{ marginRight: isAr ? 0 : 10, marginLeft: isAr ? 10 : 0 }}>
                      <IconComp size={22} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <span className="request-amount">
                        {item.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span>
                      </span>
                      <span className="request-category">
                        {isAr ? item.labelAr : item.label} • {isAr ? item.dateAr : item.date}
                      </span>
                    </div>
                    <span className={`badge ${badge.cls}`}>
                      {item.status === 'approved'
                        ? <CheckLeafIcon size={12} color={c.success} />
                        : <PendingBudIcon size={12} />
                      }
                      {' '}{isAr ? badge.ar : badge.en}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
