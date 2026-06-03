/**
 * MotherVisitScreen — Medical Visit Mode
 * Step 1: Visit type chooser
 * Step 2: Full form — Notes + Tags, Dr Said (AI), Meds Review, Next Appointment
 * AI extraction simulated with 1.5s delay
 * Zero emoji — SVG FloralIcons only
 */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, MedicalHerbIcon, CheckLeafIcon, HeartLeafIcon,
  ClockPetalIcon, HandPetalIcon, SeedlingIcon, WrenchVineIcon,
  PendingBudIcon, c,
} from '../icons/FloralIcons';

/* ─── Demo data ─── */
const MEDS = [
  { id: 'm1', name: 'Metformin', nameAr: 'ميتفورمين', dosage: '500mg', frequency: 'Twice daily' },
  { id: 'm2', name: 'Amlodipine', nameAr: 'أملوديبين', dosage: '5mg', frequency: 'Once daily' },
  { id: 'm3', name: 'Vitamin D3', nameAr: 'فيتامين د٣', dosage: '2000 IU', frequency: 'Once daily' },
];

const VISIT_TAGS = ['routine', 'specialist', 'emergency', 'follow_up', 'lab_results', 'vaccination'];
const VISIT_TAGS_AR: Record<string, string> = {
  routine: 'روتينية', specialist: 'متخصصة', emergency: 'طارئة',
  follow_up: 'متابعة', lab_results: 'نتائج تحاليل', vaccination: 'تطعيم',
};

const MED_ACTIONS = [
  { key: 'no_change', label: 'No Change',  labelAr: 'بدون تغيير', color: c.muted },
  { key: 'changed',   label: 'Changed',    labelAr: 'تغيّر',      color: c.yellow },
  { key: 'stopped',   label: 'Stopped',    labelAr: 'متوقف',      color: c.emergency },
];

type VisitType = 'full' | 'quick' | null;

export default function MotherVisitScreen() {
  const { goBack, navigate, lang } = useNavigation();
  const isAr = lang === 'ar';

  const [visitType, setVisitType] = useState<VisitType>(null);
  const [notes, setNotes]         = useState('');
  const [tags, setTags]           = useState<string[]>([]);
  const [drSaid, setDrSaid]       = useState('');
  const [aiState, setAiState]     = useState<'idle' | 'loading' | 'done'>('idle');
  const [medActions, setMedActions] = useState<Record<string, string>>({});
  const [nextDoctor, setNextDoctor] = useState('');
  const [nextDate, setNextDate]   = useState('');
  const [nextTime, setNextTime]   = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleTag = (tag: string) =>
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleAIExtract = () => {
    if (drSaid.trim().length < 10) return;
    setAiState('loading');
    aiTimerRef.current = setTimeout(() => setAiState('done'), 1800);
  };

  const handleSaveDraft = () => {
    const now = new Date();
    setLastSaved(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
  };

  const handleSubmit = () => {
    navigate('admin-medical-review' as any, { fromVisit: true });
  };

  const hasNotes    = notes.trim().length > 0 || tags.length > 0;
  const hasDrSaid   = drSaid.trim().length > 0;
  const hasMedRev   = Object.keys(medActions).length > 0;
  const hasNextApt  = nextDate.trim().length > 0;
  const isQuick     = visitType === 'quick';

  /* ─── Step 1: Visit type chooser ─── */
  if (!visitType) {
    return (
      <div className="screen mv-screen" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="screen-header">
          <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
          <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MedicalHerbIcon size={20} /> {isAr ? 'وضع الزيارة الطبية' : 'Medical Visit Mode'}
          </span>
        </div>
        <div className="screen-body mv-body">
          <motion.p
            className="mv-subtitle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isAr ? 'اختاري نوع التقرير' : 'Choose your report type'}
          </motion.p>

          {/* Full Visit */}
          <motion.button
            className="mv-type-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 260, damping: 22 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisitType('full')}
          >
            <span className="mv-type-icon-wrap mint">
              <MedicalHerbIcon size={28} color={c.mint} />
            </span>
            <div className="mv-type-text">
              <p className="mv-type-title">{isAr ? 'تقرير كامل' : 'Full Visit Report'}</p>
              <p className="mv-type-desc">
                {isAr
                  ? 'ملاحظات · ما قال الدكتور · مراجعة الأدوية · الموعد القادم'
                  : 'Notes · Dr Said · Medication review · Next appointment'}
              </p>
            </div>
          </motion.button>

          {/* Quick Visit */}
          <motion.button
            className="mv-type-card quick"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 22 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisitType('quick')}
          >
            <span className="mv-type-icon-wrap yellow">
              <CheckLeafIcon size={28} color={c.yellow} />
            </span>
            <div className="mv-type-text">
              <p className="mv-type-title">{isAr ? 'زيارة سريعة' : 'Quick Visit'}</p>
              <p className="mv-type-desc">
                {isAr
                  ? 'كل شيء بخير — ملاحظات سريعة والموعد القادم فقط'
                  : 'Everything\'s fine — quick notes + next appointment only'}
              </p>
            </div>
          </motion.button>

          {/* Disclaimer */}
          <motion.div
            className="mv-disclaimer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HeartLeafIcon size={14} color={c.muted} />
            <p>{isAr ? 'هذا التقرير لأغراض التوثيق العائلي فقط. في الطوارئ اتصلي بـ 911.' : 'This report is for family documentation only. In emergencies call 911.'}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Step 2: Main visit form ─── */
  const sections = isQuick
    ? ['notes', 'next']
    : ['notes', 'dr-said', 'meds', 'next'];

  const sectionDone: Record<string, boolean> = {
    notes:    hasNotes,
    'dr-said': hasDrSaid,
    meds:     hasMedRev,
    next:     hasNextApt,
  };

  return (
    <div className="screen mv-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={() => setVisitType(null)}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MedicalHerbIcon size={20} />
          {isQuick ? (isAr ? 'زيارة سريعة' : 'Quick Visit') : (isAr ? 'تقرير الزيارة' : 'Visit Report')}
        </span>
      </div>

      <div className="screen-body mv-body" style={{ paddingBottom: 100 }}>

        {/* Progress dots */}
        <div className="mv-progress-row">
          {sections.map(s => (
            <div key={s} className={`mv-dot ${sectionDone[s] ? 'done' : ''}`} />
          ))}
        </div>

        {lastSaved && (
          <p className="mv-saved-text">
            <CheckLeafIcon size={12} color={c.success} />
            {isAr ? `محفوظ ${lastSaved}` : `Draft saved ${lastSaved}`}
          </p>
        )}

        {/* ── Section 1: Visit Notes ── */}
        <div className="mv-section">
          <div className="mv-section-header">
            <span className={`mv-section-dot ${hasNotes ? 'done' : ''}`} />
            <span className="mv-section-title">{isAr ? 'ملاحظات الزيارة' : 'Visit Notes'}</span>
            <span className="mv-section-required">{isAr ? 'مطلوب' : 'Required'}</span>
          </div>
          <textarea
            className="mv-textarea"
            placeholder={isAr ? 'ماذا حدث في الزيارة...' : 'What happened at the visit...'}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            dir={isAr ? 'rtl' : 'ltr'}
          />
          <p className="mv-tag-label">{isAr ? 'نوع الزيارة:' : 'Visit type:'}</p>
          <div className="mv-tags-row">
            {VISIT_TAGS.map(tag => (
              <button
                key={tag}
                className={`mv-tag ${tags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {isAr ? VISIT_TAGS_AR[tag] : tag.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section 2: Dr Said (Full only) ── */}
        {!isQuick && (
          <div className="mv-section">
            <div className="mv-section-header">
              <span className={`mv-section-dot ${hasDrSaid ? 'done' : ''}`} />
              <span className="mv-section-title">{isAr ? 'ما قال الدكتور' : 'Dr Said'}</span>
            </div>
            <textarea
              className="mv-textarea"
              placeholder={isAr
                ? 'اكتب ما قاله الدكتور... (تغييرات الأدوية، التشخيص، التعليمات)'
                : 'Type what the doctor said... (medication changes, diagnosis, instructions)'}
              value={drSaid}
              onChange={e => setDrSaid(e.target.value)}
              rows={4}
              dir={isAr ? 'rtl' : 'ltr'}
            />

            {drSaid.trim().length > 15 && aiState === 'idle' && (
              <motion.button
                className="mv-ai-btn"
                onClick={handleAIExtract}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.96 }}
              >
                <SeedlingIcon size={15} color={c.mint} />
                {isAr ? 'استخرج بالذكاء الاصطناعي' : 'Extract with AI'}
              </motion.button>
            )}

            {aiState === 'loading' && (
              <motion.div
                className="mv-ai-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mv-ai-dots">
                  {[0,1,2].map(i => (
                    <motion.div
                      key={i}
                      className="mv-ai-dot-pulse"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span>{isAr ? 'جاري التحليل...' : 'Analysing...'}</span>
              </motion.div>
            )}

            {aiState === 'done' && (
              <motion.div
                className="mv-ai-result"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <div className="mv-ai-result-header">
                  <SeedlingIcon size={14} color={c.mint} />
                  <span>{isAr ? 'نتيجة الذكاء الاصطناعي — تحقق قبل الإرسال' : 'AI Result — verify before submitting'}</span>
                  <span className="mv-ai-confidence high">{isAr ? 'عالي' : 'High'}</span>
                </div>
                <div className="mv-ai-item">
                  <CheckLeafIcon size={13} color={c.mint} />
                  <span>
                    {isAr
                      ? 'دواء جديد: فيتامين د٣ ٢٠٠٠ وحدة — مرة يومياً مع الغداء'
                      : 'New medication: Vitamin D3 2000 IU — once daily with lunch'}
                  </span>
                </div>
                <div className="mv-ai-item">
                  <ClockPetalIcon size={13} color={c.yellow} />
                  <span>
                    {isAr
                      ? 'الموعد القادم: د. أحمد الغامدي — ١٥ يوليو ٢٠٢٦'
                      : 'Next appointment: Dr. Ahmad Al-Ghamdi — July 15, 2026'}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ── Section 3: Medication Review (Full only) ── */}
        {!isQuick && (
          <div className="mv-section">
            <div className="mv-section-header">
              <span className={`mv-section-dot ${hasMedRev ? 'done' : ''}`} />
              <span className="mv-section-title">{isAr ? 'مراجعة الأدوية' : 'Medication Review'}</span>
            </div>
            <p className="mv-section-hint">
              {isAr ? 'لكل دواء: هل تغيّر شيء؟' : 'For each medication: did anything change?'}
            </p>
            {MEDS.map((med, i) => (
              <motion.div
                key={med.id}
                className="mv-med-review"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="mv-med-review-name">
                  <p className="mv-med-review-title">{isAr ? med.nameAr : med.name}</p>
                  <p className="mv-med-review-sub">{med.dosage} · {med.frequency}</p>
                </div>
                <div className="mv-med-review-actions">
                  {MED_ACTIONS.map(action => (
                    <button
                      key={action.key}
                      className={`mv-med-action ${medActions[med.id] === action.key ? 'active' : ''}`}
                      style={medActions[med.id] === action.key ? { borderColor: action.color, color: action.color } : {}}
                      onClick={() => setMedActions(prev => ({
                        ...prev,
                        [med.id]: prev[med.id] === action.key ? '' : action.key,
                      }))}
                    >
                      {isAr ? action.labelAr : action.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Section 4: Next Appointment ── */}
        <div className="mv-section">
          <div className="mv-section-header">
            <span className={`mv-section-dot ${hasNextApt ? 'done' : ''}`} />
            <span className="mv-section-title">{isAr ? 'الموعد القادم' : 'Next Appointment'}</span>
          </div>
          <input
            className="mv-input"
            placeholder={isAr ? 'اسم الدكتور أو التخصص' : 'Doctor name or specialty'}
            value={nextDoctor}
            onChange={e => setNextDoctor(e.target.value)}
            dir={isAr ? 'rtl' : 'ltr'}
          />
          <input
            className="mv-input"
            placeholder={isAr ? 'التاريخ (مثال: ٢٠٢٦-٠٩-١٥)' : 'Date (e.g. 2026-09-15)'}
            value={nextDate}
            onChange={e => setNextDate(e.target.value)}
            dir={isAr ? 'rtl' : 'ltr'}
          />
          <input
            className="mv-input"
            placeholder={isAr ? 'الوقت (مثال: 10:00 AM)' : 'Time (e.g. 10:00 AM)'}
            value={nextTime}
            onChange={e => setNextTime(e.target.value)}
            dir={isAr ? 'rtl' : 'ltr'}
          />
        </div>

      </div>

      {/* ── Sticky footer ── */}
      <div className="mv-footer">
        <button className="mv-save-btn" onClick={handleSaveDraft}>
          {isAr ? 'حفظ مسودة' : 'Save Draft'}
        </button>
        <button className="btn btn-primary btn-md mv-submit-btn" onClick={handleSubmit}>
          <HandPetalIcon size={16} />
          {isAr ? 'إرسال للمراجعة' : 'Submit for Review'}
        </button>
      </div>
    </div>
  );
}
