/**
 * BrotherProofScreen — Upload payment proof
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, DocumentLeafIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

export default function BrotherProofScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><DocumentLeafIcon size={20} /> {isAr ? 'إثبات الدفع' : 'Payment Proof'}</span></div>
      <div className="screen-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        {!uploaded ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ width: 120, height: 120, borderRadius: 16, border: `2px dashed ${c.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <DocumentLeafIcon size={48} color={c.muted} />
            </div>
            <p style={{ color: c.muted, fontSize: 13, marginTop: 12 }}>{isAr ? 'أرفق لقطة شاشة للتحويل أو إيصال الدفع' : 'Attach transfer screenshot or receipt'}</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
              <motion.button className="btn btn-primary btn-md" whileTap={{ scale: 0.97 }} onClick={() => setUploaded(true)}>
                {isAr ? 'الكاميرا' : 'Camera'}
              </motion.button>
              <motion.button className="btn btn-glass btn-md" whileTap={{ scale: 0.97 }} onClick={() => setUploaded(true)}>
                {isAr ? 'المعرض' : 'Gallery'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ textAlign: 'center' }}>
            <CheckLeafIcon size={48} color={c.success} />
            <h2 style={{ color: c.brown, marginTop: 16 }}>{isAr ? 'تم رفع الإثبات — جزاك الله خيرًا' : 'Proof Uploaded!'}</h2>
            <p style={{ color: c.muted, fontSize: 13, marginTop: 6 }}>{isAr ? 'بانتظار مراجعة المسؤول' : 'Awaiting admin review'}</p>
            <motion.button className="btn btn-glass btn-md" style={{ marginTop: 20 }} onClick={goBack}>{isAr ? 'رجوع' : 'Go Back'}</motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
