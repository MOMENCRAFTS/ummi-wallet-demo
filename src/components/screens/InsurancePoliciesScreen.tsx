/**
 * InsurancePoliciesScreen — Policy tracker with renewal dates
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, ShieldLeafIcon, DocumentLeafIcon, c } from '../icons/FloralIcons';

const POLICIES = [
  { id: '1', name: 'Home Insurance', nameAr: 'تأمين المنزل', provider: 'Tawuniya', providerAr: 'التعاونية', policyNo: 'HOM-2024-8891', premium: 4800, coverage: 1200000, expiresIn: 23, status: 'active' as const },
  { id: '2', name: 'Car Insurance — Camry', nameAr: 'تأمين سيارة كامري', provider: 'Bupa Arabia', providerAr: 'بوبا العربية', policyNo: 'VEH-2024-3312', premium: 2400, coverage: 95000, expiresIn: 89, status: 'active' as const },
  { id: '3', name: 'Car Insurance — Avalon', nameAr: 'تأمين سيارة أفالون', provider: 'Al Rajhi Takaful', providerAr: 'تكافل الراجحي', policyNo: 'VEH-2024-7740', premium: 3200, coverage: 120000, expiresIn: 8, status: 'expiring' as const },
  { id: '4', name: 'Medical Insurance', nameAr: 'التأمين الطبي', provider: 'Medgulf', providerAr: 'ميدغلف', policyNo: 'MED-2023-1120', premium: 12000, coverage: 500000, expiresIn: -15, status: 'expired' as const },
];

const statusConfig = {
  active: { label: 'Active', labelAr: 'ساري', color: '#4CAF50' },
  expiring: { label: 'Expiring Soon', labelAr: 'قارب الانتهاء', color: '#FF9800' },
  expired: { label: 'Expired', labelAr: 'منتهي', color: '#F44336' },
};

export default function InsurancePoliciesScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const totalPremium = POLICIES.reduce((s, p) => s + p.premium, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><ShieldLeafIcon size={20} /> {isAr ? 'التأمينات' : 'Insurance Policies'}</span>
      </div>
      <div className="screen-body">
        {/* Summary */}
        <motion.div className="card glass" style={{ textAlign: 'center', padding: 16, marginBottom: 16 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: 10, color: c.muted, textTransform: 'uppercase', letterSpacing: 1 }}>{isAr ? 'إجمالي الأقساط السنوية' : 'TOTAL ANNUAL PREMIUMS'}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: c.brown, marginTop: 4 }}>
            {totalPremium.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span>
          </div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>{POLICIES.length} {isAr ? 'وثائق' : 'policies'}</div>
        </motion.div>

        {/* Policy Cards */}
        {POLICIES.map((p, i) => {
          const st = statusConfig[p.status];
          return (
            <motion.div key={p.id} className="card" style={{ marginBottom: 10, padding: 14 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.brown }}>{isAr ? p.nameAr : p.name}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: st.color, background: st.color + '18', padding: '2px 8px', borderRadius: 10 }}>
                  {isAr ? st.labelAr : st.label}
                </span>
              </div>
              <div style={{ fontSize: 11, color: c.muted, marginBottom: 4 }}>{isAr ? p.providerAr : p.provider} • {p.policyNo}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: `1px solid ${c.divider}` }}>
                <div>
                  <div style={{ fontSize: 10, color: c.muted }}>{isAr ? 'القسط' : 'Premium'}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: c.brown }}>{p.premium.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: c.muted }}>{isAr ? 'التغطية' : 'Coverage'}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: c.mint }}>{p.coverage.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: isAr ? 'left' : 'right' }}>
                  <div style={{ fontSize: 10, color: c.muted }}>{isAr ? 'التجديد' : 'Renewal'}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: p.expiresIn <= 0 ? '#F44336' : p.expiresIn <= 14 ? '#FF9800' : c.brown }}>
                    {p.expiresIn <= 0 ? (isAr ? `منتهي منذ ${Math.abs(p.expiresIn)} يوم` : `${Math.abs(p.expiresIn)}d overdue`) : (isAr ? `${p.expiresIn} يوم` : `${p.expiresIn} days`)}
                  </div>
                </div>
              </div>
              <button className="btn btn-glass btn-sm" style={{ marginTop: 10, width: '100%' }}>
                <DocumentLeafIcon size={12} /> {isAr ? 'عرض الوثيقة' : 'View Policy'}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
