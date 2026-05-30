/**
 * ServiceScreen — Rich placeholder for manage grid services
 * Shows service name + botanical illustration + "coming soon"
 * Reads params.service to customize the display
 * Zero emoji — all SVG FloralIcons
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, QueueScrollIcon, PayrollLeafIcon, LeafBillIcon,
  WrenchVineIcon, BankGardenIcon, BalanceLeavesIcon, ChartBloomIcon,
  PersonFloralIcon, TulipIcon, CakeBlossomIcon, DocumentLeafIcon,
  LightbulbPetalIcon, FloatingPetals, SparkleAccent, c,
} from '../icons/FloralIcons';

const SERVICE_META: Record<string, {
  label: string; labelAr: string;
  desc: string; descAr: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}> = {
  queue: { label: 'Queue', labelAr: 'المتابعة', desc: 'Track pending tasks and approvals', descAr: 'تتبع المهام والموافقات المعلّقة', Icon: QueueScrollIcon, color: c.mint },
  payroll: { label: 'Payroll', labelAr: 'الرواتب', desc: 'Manage household staff salaries', descAr: 'إدارة رواتب طاقم المنزل', Icon: PayrollLeafIcon, color: c.yellow },
  bills: { label: 'Bills', labelAr: 'الفواتير', desc: 'View and schedule bill payments', descAr: 'عرض وجدولة مدفوعات الفواتير', Icon: LeafBillIcon, color: c.mint },
  maintenance: { label: 'Maintenance', labelAr: 'الصيانة', desc: 'Track home maintenance requests', descAr: 'متابعة طلبات الصيانة المنزلية', Icon: WrenchVineIcon, color: c.muted },
  reservoir: { label: 'Reservoir', labelAr: 'الخزنة', desc: 'Family savings and reserves', descAr: 'مدخرات واحتياطيات العائلة', Icon: BankGardenIcon, color: c.mint },
  settlement: { label: 'Settlement', labelAr: 'التسوية', desc: 'Reconcile contributions and balances', descAr: 'مطابقة المساهمات والأرصدة', Icon: BalanceLeavesIcon, color: c.muted },
  pulse: { label: 'Pulse', labelAr: 'النبض', desc: 'Real-time family activity feed', descAr: 'نشاط العائلة لحظيًا', Icon: ChartBloomIcon, color: c.mint },
  reports: { label: 'Reports', labelAr: 'التقارير', desc: 'Monthly and annual financial reports', descAr: 'تقارير مالية شهرية وسنوية', Icon: ChartBloomIcon, color: c.blue },
  invite: { label: 'Members', labelAr: 'الأعضاء', desc: 'Invite and manage family members', descAr: 'دعوة وإدارة أعضاء العائلة', Icon: PersonFloralIcon, color: c.muted },
  projects: { label: 'Projects', labelAr: 'المشاريع', desc: 'Track family savings projects', descAr: 'متابعة مشاريع الادخار العائلية', Icon: TulipIcon, color: c.peach },
  celebrations: { label: 'Events', labelAr: 'المناسبات', desc: 'Plan family celebrations and events', descAr: 'تخطيط مناسبات العائلة', Icon: CakeBlossomIcon, color: c.peach },
  documents: { label: 'Documents', labelAr: 'المستندات', desc: 'Store and share important documents', descAr: 'حفظ ومشاركة المستندات المهمة', Icon: DocumentLeafIcon, color: c.blue },
  suggestions: { label: 'Ideas', labelAr: 'الأفكار', desc: 'Family suggestions and ideas board', descAr: 'لوحة أفكار واقتراحات العائلة', Icon: LightbulbPetalIcon, color: c.yellow },
};

const DEFAULT = { label: 'Service', labelAr: 'خدمة', desc: 'This feature is coming soon', descAr: 'هذه الخدمة قيد التطوير', Icon: TulipIcon, color: c.muted };

export default function ServiceScreen() {
  const { goBack, params, lang } = useNavigation();
  const isAr = lang === 'ar';
  const key = (params as any)?.service || '';
  const svc = SERVICE_META[key] || DEFAULT;

  return (
    <div className="screen service-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={4} />

      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svc.Icon size={20} color={svc.color} /> {isAr ? svc.labelAr : svc.label}
        </span>
      </div>

      <div className="screen-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svc.Icon size={72} color={svc.color} />
            <SparkleAccent size={10} style={{ position: 'absolute', top: -6, right: -8 }} />
            <SparkleAccent size={8} style={{ position: 'absolute', bottom: 4, left: -6 }} />
          </div>

          <h2 style={{ color: c.brown, marginTop: 20, fontSize: 20, fontWeight: 700 }}>
            {isAr ? svc.labelAr : svc.label}
          </h2>
          <p style={{ color: c.muted, fontSize: 14, marginTop: 6, maxWidth: 240, margin: '6px auto 0' }}>
            {isAr ? svc.descAr : svc.desc}
          </p>

          <motion.div
            className="badge badge-pending"
            style={{ display: 'inline-flex', marginTop: 20, padding: '8px 16px', fontSize: 13 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isAr ? 'قريبًا — قيد التطوير' : 'Coming Soon'}
          </motion.div>

          <button className="btn btn-glass btn-md" onClick={goBack} style={{ marginTop: 24 }}>
            {isAr ? 'رجوع' : 'Go Back'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
