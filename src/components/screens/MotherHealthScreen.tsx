/**
 * MotherHealthScreen — Premium Health Corner
 * 3-tab: Medications · Appointments · Pharmacy
 * Start Visit Report CTA → mother-visit
 * Zero emoji — SVG FloralIcons only
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, MedicalHerbIcon, CheckLeafIcon, PendingBudIcon,
  ClockPetalIcon, SunflowerHomeIcon, LeafBillIcon, WrenchVineIcon,
  HandPetalIcon, c,
} from '../icons/FloralIcons';

/* ─── Demo data ─── */
const MEDS = [
  {
    id: 'm1', name: 'Metformin', nameAr: 'ميتفورمين',
    dosage: '500mg', frequency: 'Twice daily', frequencyAr: 'مرتين يومياً',
    time: 'Morning & Night', timeAr: 'صباحاً ومساءً',
    remaining: 8, refillAt: 10, form: 'tablet',
    status: 'active',
  },
  {
    id: 'm2', name: 'Amlodipine', nameAr: 'أملوديبين',
    dosage: '5mg', frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    time: 'Morning', timeAr: 'صباحاً',
    remaining: 22, refillAt: 7, form: 'tablet',
    status: 'active',
  },
  {
    id: 'm3', name: 'Vitamin D3', nameAr: 'فيتامين د٣',
    dosage: '2000 IU', frequency: 'Once daily', frequencyAr: 'مرة يومياً',
    time: 'With lunch', timeAr: 'مع الغداء',
    remaining: 45, refillAt: 10, form: 'capsule',
    status: 'active',
  },
];

const APTS = [
  {
    id: 'a1', doctor: 'Dr. Ahmad Al-Ghamdi', doctorAr: 'د. أحمد الغامدي',
    specialty: 'Cardiology', specialtyAr: 'القلب والأوعية الدموية',
    date: 'June 20, 2026', dateAr: '٢٠ يونيو ٢٠٢٦',
    time: '10:00 AM', location: 'King Fahd Hospital', locationAr: 'مستشفى الملك فهد',
    status: 'upcoming',
  },
  {
    id: 'a2', doctor: 'Dr. Sara Al-Otaibi', doctorAr: 'د. سارة العتيبي',
    specialty: 'General', specialtyAr: 'طب عام',
    date: 'May 14, 2026', dateAr: '١٤ مايو ٢٠٢٦',
    time: '9:30 AM', location: 'Al-Nakheel Clinic', locationAr: 'عيادات النخيل',
    status: 'completed',
  },
];

type Tab = 'meds' | 'appointments' | 'pharmacy';

export default function MotherHealthScreen() {
  const { goBack, navigate, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [tab, setTab] = useState<Tab>('meds');

  const lowMeds = MEDS.filter(m => m.remaining <= m.refillAt);

  const tabs: { key: Tab; label: string; labelAr: string }[] = [
    { key: 'meds',         label: 'Medications',   labelAr: 'الأدوية' },
    { key: 'appointments', label: 'Appointments',  labelAr: 'المواعيد' },
    { key: 'pharmacy',     label: 'Pharmacy',      labelAr: 'الصيدلية' },
  ];

  return (
    <div className="screen mh-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MedicalHerbIcon size={20} /> {isAr ? 'الصحة والرعاية' : 'Health & Care'}
        </span>
      </div>

      <div className="screen-body mh-body">

        {/* ── Start Visit Report CTA ── */}
        <motion.div
          className="mh-visit-cta"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="mh-visit-cta-text">
            <MedicalHerbIcon size={18} color={c.mint} />
            <span>{isAr ? 'سجّل زيارة طبية جديدة' : 'Record a new medical visit'}</span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('mother-visit' as any)}
          >
            {isAr ? 'ابدأ تقرير الزيارة' : 'Start Visit Report'}
            <span style={{ fontSize: 13, fontWeight: 700 }}>›</span>
          </button>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          className="mh-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.07 }}
        >
          {tabs.map(t => (
            <button
              key={t.key}
              className={`mh-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {isAr ? t.labelAr : t.label}
              {t.key === 'meds' && lowMeds.length > 0 && (
                <span className="mh-tab-badge">{lowMeds.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >

            {/* MEDICATIONS */}
            {tab === 'meds' && (
              <div className="mh-tab-content">
                {MEDS.map((med, i) => {
                  const low = med.remaining <= med.refillAt;
                  return (
                    <motion.div
                      key={med.id}
                      className={`mh-med-card ${low ? 'low' : ''}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, type: 'spring', stiffness: 280, damping: 22 }}
                    >
                      <div className="mh-med-header">
                        <div>
                          <p className="mh-med-name">{isAr ? med.nameAr : med.name}</p>
                          <p className="mh-med-sub">{isAr ? med.name : med.nameAr}</p>
                        </div>
                        <span className={`mh-med-dosage ${low ? 'low' : ''}`}>{med.dosage}</span>
                      </div>
                      <div className="mh-med-details">
                        <span className="mh-med-detail">
                          <ClockPetalIcon size={13} color={c.muted} />
                          {isAr ? med.frequencyAr : med.frequency} · {isAr ? med.timeAr : med.time}
                        </span>
                        <span className={`mh-med-remaining ${low ? 'low' : ''}`}>
                          {low
                            ? (isAr ? `⚠ ${med.remaining} حبة متبقية — يلزم تجديد` : `⚠ ${med.remaining} left — refill needed`)
                            : (isAr ? `${med.remaining} حبة متبقية` : `${med.remaining} remaining`)}
                        </span>
                      </div>
                      {low && (
                        <button className="btn btn-sm mh-refill-btn">
                          {isAr ? 'طلب تجديد الوصفة' : 'Request Refill'}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* APPOINTMENTS */}
            {tab === 'appointments' && (
              <div className="mh-tab-content">
                {APTS.map((apt, i) => {
                  const upcoming = apt.status === 'upcoming';
                  return (
                    <motion.div
                      key={apt.id}
                      className="mh-apt-card"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 280, damping: 22 }}
                    >
                      <div className="mh-apt-header">
                        <div>
                          <p className="mh-apt-doctor">{isAr ? apt.doctorAr : apt.doctor}</p>
                          <p className="mh-apt-specialty">{isAr ? apt.specialtyAr : apt.specialty}</p>
                        </div>
                        <span className={`mh-apt-badge ${upcoming ? 'upcoming' : 'done'}`}>
                          {upcoming
                            ? (isAr ? 'قادم' : 'Upcoming')
                            : (isAr ? 'تم' : 'Completed')}
                        </span>
                      </div>
                      <div className="mh-apt-details">
                        <span className="mh-apt-detail">
                          <ClockPetalIcon size={13} color={c.muted} />
                          {isAr ? apt.dateAr : apt.date} · {apt.time}
                        </span>
                        <span className="mh-apt-detail">
                          <SunflowerHomeIcon size={13} color={c.muted} />
                          {isAr ? apt.locationAr : apt.location}
                        </span>
                      </div>
                      {upcoming && (
                        <div className="mh-apt-actions">
                          <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                            {isAr ? 'إشعار العائلة' : 'Remind Family'}
                          </button>
                          <button className="btn btn-glass btn-sm" style={{ flex: 1 }}>
                            {isAr ? 'إعادة جدولة' : 'Reschedule'}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* PHARMACY */}
            {tab === 'pharmacy' && (
              <div className="mh-tab-content">
                {/* Preferred pharmacy */}
                <motion.div
                  className="mh-pharmacy-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <p className="mh-pharmacy-title">
                    <LeafBillIcon size={15} color={c.mint} />
                    {isAr ? 'الصيدلية المفضلة' : 'Preferred Pharmacy'}
                  </p>
                  <p className="mh-pharmacy-name">
                    {isAr ? 'صيدلية الدواء — فرع ٤٢' : 'Al-Dawa Pharmacy — Branch 42'}
                  </p>
                  <p className="mh-pharmacy-detail">
                    <SunflowerHomeIcon size={12} color={c.muted} />
                    {isAr ? 'طريق الأمير سلطان، جدة' : 'Prince Sultan Road, Jeddah'}
                  </p>
                  <p className="mh-pharmacy-detail">
                    <WrenchVineIcon size={12} color={c.muted} />
                    012-345-6789
                  </p>
                </motion.div>

                {/* Refills needed */}
                <motion.div
                  className="mh-pharmacy-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <p className="mh-pharmacy-title">
                    <PendingBudIcon size={15} color={c.emergency} />
                    {isAr ? 'تحتاج تجديداً' : 'Needs Refill'}
                  </p>
                  {lowMeds.length === 0 ? (
                    <p style={{ fontSize: 13, color: c.success, textAlign: 'center', padding: '8px 0' }}>
                      <CheckLeafIcon size={14} color={c.success} />
                      {' '}{isAr ? 'كل الأدوية بخير' : 'All medications stocked'}
                    </p>
                  ) : lowMeds.map(m => (
                    <div key={m.id} className="mh-refill-row">
                      <span className="mh-refill-name">{isAr ? m.nameAr : m.name} ({m.dosage})</span>
                      <span className="mh-refill-count">
                        {isAr ? `${m.remaining} متبقي` : `${m.remaining} left`}
                      </span>
                    </div>
                  ))}
                  <button className="btn btn-primary btn-md btn-full" style={{ marginTop: 12 }}>
                    <HandPetalIcon size={16} />
                    {isAr ? 'إرسال قائمة للصيدلية' : 'Send List to Pharmacy'}
                  </button>
                </motion.div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
