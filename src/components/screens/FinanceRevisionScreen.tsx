/**
 * FinanceRevisionScreen — Revision cycle
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, SeedlingIcon, c } from '../icons/FloralIcons';

const REVISIONS = [
  { item: 'Mother Allowance', itemAr: 'مصروف الوالدة', original: 5300, revised: 5000, reason: 'Slight reduction agreed', reasonAr: 'تخفيض بسيط متفق عليه' },
  { item: 'Maintenance', itemAr: 'الصيانة', original: 800, revised: 1200, reason: 'AC repair added', reasonAr: 'أضيفت صيانة المكيّف' },
];

export default function FinanceRevisionScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><SeedlingIcon size={20} /> {isAr ? 'طلبات التعديل' : 'Revisions'}</span>
      </div>
      <div className="screen-body">
        <p style={{ color: c.muted, fontSize: 13, marginBottom: 12 }}>{isAr ? 'التعديلات المطلوبة على الخطة' : 'Requested changes to the plan'}</p>

        {REVISIONS.map((r, i) => {
          const diff = r.revised - r.original;
          return (
            <motion.div key={r.item} className="card" style={{ marginBottom: 10 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? r.itemAr : r.item}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <div>
                  <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'الأصلي' : 'Original'}</p>
                  <p style={{ fontWeight: 600, color: c.muted, fontSize: 14, textDecoration: 'line-through' }}>{r.original.toLocaleString()}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'المعدّل' : 'Revised'}</p>
                  <p style={{ fontWeight: 700, color: c.mint, fontSize: 14 }}>{r.revised.toLocaleString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? 'الفرق' : 'Diff'}</p>
                  <p style={{ fontWeight: 600, color: diff > 0 ? c.emergency : c.success, fontSize: 14 }}>{diff > 0 ? '+' : ''}{diff.toLocaleString()}</p>
                </div>
              </div>
              <p style={{ color: c.muted, fontSize: 12, marginTop: 6, fontStyle: 'italic' }}>{isAr ? r.reasonAr : r.reason}</p>
            </motion.div>
          );
        })}

        <motion.button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 20 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('finance-summary')}>
          {isAr ? 'إرسال التعديل' : 'Submit Revision'}
        </motion.button>
      </div>
    </div>
  );
}
