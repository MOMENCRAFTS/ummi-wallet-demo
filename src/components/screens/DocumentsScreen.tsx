/**
 * DocumentsScreen — Family document vault
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, DocumentLeafIcon, ShieldLeafIcon, c } from '../icons/FloralIcons';

const CATEGORIES = [
  {
    title: 'Identity Documents', titleAr: 'وثائق الهوية',
    docs: [
      { name: 'National ID — Ahmed', nameAr: 'هوية وطنية — أحمد', date: 'Jan 2024', dateAr: 'يناير ٢٠٢٤', size: '1.2 MB' },
      { name: "Mother's ID", nameAr: 'هوية الوالدة', date: 'Jan 2024', dateAr: 'يناير ٢٠٢٤', size: '0.9 MB' },
    ],
  },
  {
    title: 'Insurance', titleAr: 'التأمين',
    docs: [
      { name: 'Home Insurance Policy', nameAr: 'وثيقة تأمين المنزل', date: 'Mar 2024', dateAr: 'مارس ٢٠٢٤', size: '2.4 MB' },
      { name: 'Car Insurance', nameAr: 'تأمين السيارة', date: 'Apr 2024', dateAr: 'أبريل ٢٠٢٤', size: '1.8 MB' },
    ],
  },
  {
    title: 'Medical Records', titleAr: 'السجلات الطبية',
    docs: [
      { name: "Mother's prescriptions", nameAr: 'وصفات الوالدة', date: 'May 2024', dateAr: 'مايو ٢٠٢٤', size: '0.5 MB' },
    ],
  },
  {
    title: 'Contracts', titleAr: 'العقود',
    docs: [
      { name: 'Rent agreement', nameAr: 'عقد الإيجار', date: 'Feb 2024', dateAr: 'فبراير ٢٠٢٤', size: '3.1 MB' },
      { name: 'Driver contract', nameAr: 'عقد السائق', date: 'Feb 2024', dateAr: 'فبراير ٢٠٢٤', size: '1.5 MB' },
    ],
  },
];

export default function DocumentsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><DocumentLeafIcon size={20} /> {isAr ? 'المستندات' : 'Documents'}</span>
      </div>
      <div className="screen-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '8px 12px', background: c.mint + '12', borderRadius: 8 }}>
          <ShieldLeafIcon size={16} color={c.mint} />
          <span style={{ fontSize: 12, color: c.mint, fontWeight: 500 }}>{isAr ? 'جميع المستندات مشفّرة وآمنة' : 'All documents encrypted & secure'}</span>
        </div>

        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1 }}
          >
            <h3 className="section-title" style={{ marginTop: ci > 0 ? 16 : 0 }}>{isAr ? cat.titleAr : cat.title}</h3>
            {cat.docs.map((doc, di) => (
              <motion.div
                key={doc.name}
                className="card"
                style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}
                initial={{ opacity: 0, x: isAr ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ci * 0.1 + di * 0.04 }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: c.blue + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <DocumentLeafIcon size={16} color={c.blue} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? doc.nameAr : doc.name}</p>
                  <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? doc.dateAr : doc.date} · {doc.size}</p>
                </div>
                <motion.button className="btn btn-glass btn-sm" whileTap={{ scale: 0.95 }}>
                  {isAr ? 'عرض' : 'View'}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ))}

        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          <DocumentLeafIcon size={16} color="#fff" /> {isAr ? 'رفع مستند' : 'Upload Document'}
        </motion.button>
      </div>
    </div>
  );
}
