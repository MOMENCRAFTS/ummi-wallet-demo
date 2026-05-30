/**
 * HybridOnboardingScreen — Stepper + AI Chat Hybrid
 *
 * Steps 1-5: Rigid form inputs (exact data)
 * Steps 6-7: AI conversational chat (brainstorming expenses/assets)
 * Step 8: AI-generated plan summary
 *
 * Zero emoji — botanical SVGs, compressed spring animations
 * Full Arabic: formal headers, Shami for friendly text
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  WalletRoseIcon, CrownFloralIcon, HeartLeafIcon, PersonFloralIcon,
  CheckLeafIcon, SeedlingIcon, MoneyLeafIcon, LeafBillIcon,
  WrenchVineIcon, SunflowerHomeIcon, ChartBloomIcon,
  GlobeFlowerIcon, BankGardenIcon, FloatingPetals, PetalConfetti,
  EyeLeafIcon, ArrowLeafIcon, ShieldLeafIcon, ChatBubbleLeafIcon,
  c,
} from '../icons/FloralIcons';

const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

// ─── Types ───
type WizardStep = 'leader' | 'family' | 'mother' | 'members' | 'staff' | 'expenses-chat' | 'plan' | 'done';

interface BrotherEntry { id: string; name: string; email: string; phone: string; role: 'contributor' | 'observer'; percent: number; }
interface StaffEntry { id: string; role: string; name: string; salary: number; enabled: boolean; }
interface ExpenseEntry { category: string; label: string; labelAr: string; amount: number; }

interface ChatMsg { id: string; role: 'ai' | 'user'; text: string; }

const uid = () => Math.random().toString(36).slice(2, 9);

const STEPS: WizardStep[] = ['leader', 'family', 'mother', 'members', 'staff', 'expenses-chat', 'plan', 'done'];
const STEP_ICONS = [CrownFloralIcon, SeedlingIcon, HeartLeafIcon, PersonFloralIcon, WrenchVineIcon, ChatBubbleLeafIcon, ChartBloomIcon, CheckLeafIcon];
const STEP_LABELS_EN = ['You', 'Family', 'Mom', 'Members', 'Staff', 'Budget AI', 'Plan', 'Done'];
const STEP_LABELS_AR = ['أنت', 'العائلة', 'الوالدة', 'الأعضاء', 'الموظفين', 'الميزانية', 'الخطة', 'تمّ'];

const STAFF_ROLES = [
  { key: 'driver', en: 'Driver', ar: 'سائق', salary: 1800 },
  { key: 'maid', en: 'Maid', ar: 'خادمة', salary: 1500 },
  { key: 'nurse', en: 'Nurse', ar: 'ممرضة', salary: 3000 },
  { key: 'cook', en: 'Cook', ar: 'طبّاخة', salary: 2000 },
  { key: 'gardener', en: 'Gardener', ar: 'بستاني', salary: 1200 },
];

const DEFAULT_EXPENSES: ExpenseEntry[] = [
  { category: 'allowance', label: 'Personal Allowance', labelAr: 'المصروف الشخصي', amount: 1200 },
  { category: 'electricity', label: 'Electricity', labelAr: 'الكهرباء', amount: 800 },
  { category: 'water', label: 'Water', labelAr: 'الماء', amount: 150 },
  { category: 'internet', label: 'Internet', labelAr: 'الإنترنت', amount: 300 },
  { category: 'groceries', label: 'Groceries', labelAr: 'البقالة', amount: 600 },
  { category: 'medical', label: 'Medical', labelAr: 'الأدوية والرعاية', amount: 400 },
  { category: 'maintenance', label: 'Home Maintenance', labelAr: 'صيانة البيت', amount: 500 },
  { category: 'emergency', label: 'Emergency Fund (5%)', labelAr: 'صندوق الطوارئ (٥٪)', amount: 0 },
];

// ─── Scripted AI Chat Messages ───
const AI_SCRIPT_EN: { text: string; afterIndex: number }[] = [
  { text: "Let's figure out your mom's monthly expenses together. I'll suggest typical Saudi household amounts — adjust what doesn't fit.", afterIndex: -1 },
  { text: "Great! For a household in Saudi Arabia, electricity runs 600-1,200 SAR/month (more in summer with AC). Groceries typically 500-800 SAR. Medical costs vary — does your mother have regular medications?", afterIndex: 0 },
  { text: "Here's what I've put together based on your input. You can adjust any amount by tapping it. The emergency fund is auto-calculated at 5% of the total.", afterIndex: 1 },
];
const AI_SCRIPT_AR: { text: string; afterIndex: number }[] = [
  { text: "خلّنا نحسب مصاريف أمك الشهرية سوا. بقترح لك أرقام تقريبية حسب المتوسط بالسعودية — عدّل اللي ما يناسبك.", afterIndex: -1 },
  { text: "ممتاز! بالنسبة للكهرباء بالسعودية تتراوح ٦٠٠-١٬٢٠٠ ريال شهرياً (أكثر بالصيف مع المكيفات). البقالة عادةً ٥٠٠-٨٠٠ ريال. التكاليف الطبية تختلف — هل والدتك تاخذ أدوية بشكل منتظم؟", afterIndex: 0 },
  { text: "هذا اللي جمّعته من كلامك. تقدر تعدّل أي مبلغ بالضغط عليه. صندوق الطوارئ يتحسب تلقائي ٥٪ من الإجمالي.", afterIndex: 1 },
];


// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function HybridOnboardingScreen() {
  const { navigate, lang } = useNavigation();
  const isAr = lang === 'ar';

  const [step, setStep] = useState<WizardStep>('leader');
  const stepIndex = STEPS.indexOf(step);

  // Step 1
  const [leaderName, setLeaderName] = useState(isAr ? '' : '');
  const [leaderLang, setLeaderLang] = useState<'ar' | 'en'>(isAr ? 'ar' : 'en');

  // Step 2
  const [familyName, setFamilyName] = useState('');
  const [currency, setCurrency] = useState('SAR');

  // Step 3
  const [motherName, setMotherName] = useState('');
  const [motherPhone, setMotherPhone] = useState('');
  const [motherEmail, setMotherEmail] = useState('');
  const [motherIban, setMotherIban] = useState('');

  // Step 4
  const [brothers, setBrothers] = useState<BrotherEntry[]>([]);
  const [shareMode, setShareMode] = useState<'equal' | 'custom'>('equal');

  // Step 5
  const [staffList, setStaffList] = useState<StaffEntry[]>(
    STAFF_ROLES.map(r => ({ id: uid(), role: r.key, name: '', salary: r.salary, enabled: false }))
  );

  // Steps 6-7: Chat + Expenses
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatPhase, setChatPhase] = useState(0); // which scripted message we're on
  const [aiTyping, setAiTyping] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(DEFAULT_EXPENSES);
  const [showExpenseEditor, setShowExpenseEditor] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Step 8 computed
  const staffTotal = staffList.filter(s => s.enabled).reduce((sum, s) => sum + s.salary, 0);
  const expenseSubtotal = expenses.filter(e => e.category !== 'emergency').reduce((sum, e) => sum + e.amount, 0);
  const emergencyAmount = Math.round((expenseSubtotal + staffTotal) * 0.05);
  const grandTotal = expenseSubtotal + staffTotal + emergencyAmount;
  const contributorCount = brothers.filter(b => b.role === 'contributor').length + 1;
  const perPerson = contributorCount > 0 ? Math.round(grandTotal / contributorCount) : grandTotal;

  // Update emergency in expenses
  useEffect(() => {
    setExpenses(prev => prev.map(e =>
      e.category === 'emergency' ? { ...e, amount: emergencyAmount } : e
    ));
  }, [emergencyAmount]);

  // ─── Navigation ───
  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };
  const goBack = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  };

  // ─── Chat Logic ───
  const initChat = useCallback(() => {
    if (chatMsgs.length > 0) return;
    const script = isAr ? AI_SCRIPT_AR : AI_SCRIPT_EN;
    setAiTyping(true);
    setTimeout(() => {
      setChatMsgs([{ id: uid(), role: 'ai', text: script[0].text }]);
      setChatPhase(1);
      setAiTyping(false);
    }, 1200);
  }, [chatMsgs.length, isAr]);

  useEffect(() => {
    if (step === 'expenses-chat') initChat();
  }, [step, initChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs, aiTyping]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMsgs(prev => [...prev, { id: uid(), role: 'user', text }]);
    setChatInput('');

    const script = isAr ? AI_SCRIPT_AR : AI_SCRIPT_EN;
    if (chatPhase < script.length) {
      setAiTyping(true);
      setTimeout(() => {
        setChatMsgs(prev => [...prev, { id: uid(), role: 'ai', text: script[chatPhase].text }]);
        setChatPhase(p => p + 1);
        setAiTyping(false);
        if (chatPhase >= 1) setShowExpenseEditor(true);
      }, 1500);
    }
  };

  // ─── Stepper Bar ───
  const StepperBar = () => (
    <div className="hybrid-stepper">
      {STEPS.slice(0, -1).map((s, i) => { // exclude 'done'
        const Icon = STEP_ICONS[i];
        const isActive = stepIndex >= i;
        const isCurrent = stepIndex === i;
        const label = isAr ? STEP_LABELS_AR[i] : STEP_LABELS_EN[i];
        return (
          <div key={s} className="hybrid-step">
            <div className={`hybrid-step-dot ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
              {isActive && i < stepIndex
                ? <CheckLeafIcon size={11} color="#fff" />
                : <span className="hybrid-step-num">{i + 1}</span>
              }
            </div>
            <span className={`hybrid-step-label ${isActive ? 'active' : ''}`}>{label}</span>
            {i < STEPS.length - 2 && <div className={`hybrid-step-line ${isActive ? 'active' : ''}`} />}
          </div>
        );
      })}
    </div>
  );

  // ─── Nav Buttons ───
  const NavButtons = ({ canProceed = true, nextLabel, onNext }: { canProceed?: boolean; nextLabel?: string; onNext?: () => void }) => (
    <div className="hybrid-nav-row">
      {stepIndex > 0 && (
        <motion.button className="btn btn-glass btn-md" onClick={goBack} whileTap={{ scale: 0.95 }}>
          <ArrowLeafIcon size={16} /> {isAr ? 'رجوع' : 'Back'}
        </motion.button>
      )}
      <motion.button
        className="btn btn-primary btn-lg"
        style={{ flex: 1, opacity: canProceed ? 1 : 0.4 }}
        onClick={canProceed ? (onNext || goNext) : undefined}
        whileTap={canProceed ? { scale: 0.97 } : {}}
      >
        <SeedlingIcon size={16} color="#fff" /> {nextLabel || (isAr ? 'التالي' : 'Next')}
      </motion.button>
    </div>
  );

  // ─── Skip Link ───
  const SkipLink = ({ text, textAr }: { text: string; textAr: string }) => (
    <button className="btn btn-ghost" style={{ width: '100%', marginTop: 4, fontSize: 12 }} onClick={goNext}>
      {isAr ? textAr : text}
    </button>
  );

  // ═══ STEP RENDERS ═══
  const renderStep = () => {
    switch (step) {
      case 'leader': return renderLeader();
      case 'family': return renderFamily();
      case 'mother': return renderMother();
      case 'members': return renderMembers();
      case 'staff': return renderStaff();
      case 'expenses-chat': return renderExpensesChat();
      case 'plan': return renderPlan();
      case 'done': return renderDone();
    }
  };

  // ────────── Step 1: Leader ──────────
  const renderLeader = () => (
    <motion.div key="leader" className="hybrid-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={spring}>
      <CrownFloralIcon size={36} color={c.gold} />
      <h2 className="hybrid-title">{isAr ? 'بياناتك' : 'About You'}</h2>
      <p className="hybrid-subtitle">{isAr ? 'اسمك واللغة المفضلة للتطبيق' : 'Your name and preferred language'}</p>
      <div className="hybrid-form">
        <label>{isAr ? 'اسمك' : 'Your name'}</label>
        <input className="hybrid-input" value={leaderName} onChange={e => setLeaderName(e.target.value)} placeholder={isAr ? 'مثال: أحمد' : 'e.g. Ahmed'} autoFocus />
        <label>{isAr ? 'اللغة' : 'Language'}</label>
        <div className="hybrid-toggle-row">
          <button className={`hybrid-toggle ${leaderLang === 'en' ? 'active' : ''}`} onClick={() => setLeaderLang('en')}>English</button>
          <button className={`hybrid-toggle ${leaderLang === 'ar' ? 'active' : ''}`} onClick={() => setLeaderLang('ar')}>عربي</button>
        </div>
      </div>
      <NavButtons canProceed={!!leaderName.trim()} />
    </motion.div>
  );

  // ────────── Step 2: Family ──────────
  const renderFamily = () => (
    <motion.div key="family" className="hybrid-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={spring}>
      <SeedlingIcon size={36} color={c.mint} />
      <h2 className="hybrid-title">{isAr ? 'عائلتك' : 'Your Family'}</h2>
      <p className="hybrid-subtitle">{isAr ? 'اسم العائلة والعملة' : 'Family name and currency'}</p>
      <div className="hybrid-form">
        <label>{isAr ? 'اسم العائلة' : 'Family name'}</label>
        <input className="hybrid-input" value={familyName} onChange={e => setFamilyName(e.target.value)} placeholder={isAr ? 'مثال: عائلة المطيري' : 'e.g. Al-Mutairi Family'} autoFocus />
        <label>{isAr ? 'العملة' : 'Currency'}</label>
        <div className="hybrid-toggle-row">
          {['SAR', 'USD', 'EUR', 'AED'].map(cur => (
            <button key={cur} className={`hybrid-toggle ${currency === cur ? 'active' : ''}`} onClick={() => setCurrency(cur)}>{cur}</button>
          ))}
        </div>
      </div>
      <NavButtons canProceed={!!familyName.trim()} />
    </motion.div>
  );

  // ────────── Step 3: Mother ──────────
  const renderMother = () => (
    <motion.div key="mother" className="hybrid-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={spring}>
      <HeartLeafIcon size={36} color={c.peach} />
      <h2 className="hybrid-title">{isAr ? 'بيانات الوالدة' : "Mother's Details"}</h2>
      <p className="hybrid-subtitle">{isAr ? 'لربط حسابها وتسهيل التحويلات' : 'To link her account and simplify transfers'}</p>
      <div className="hybrid-form">
        <label>{isAr ? 'اسم الوالدة' : "Mother's name"}</label>
        <input className="hybrid-input" value={motherName} onChange={e => setMotherName(e.target.value)} placeholder={isAr ? 'مثال: أم أحمد' : 'e.g. Um Ahmed'} autoFocus />
        <label>{isAr ? 'رقم الجوال' : 'Phone number'}</label>
        <div style={{ display: 'flex', gap: 6 }}>
          <div className="hybrid-prefix">+966</div>
          <input className="hybrid-input" style={{ flex: 1 }} value={motherPhone} onChange={e => setMotherPhone(e.target.value)} placeholder="5XX XXX XXXX" type="tel" />
        </div>
        <label>{isAr ? 'البريد الإلكتروني' : 'Email'} <span className="hybrid-optional">({isAr ? 'اختياري' : 'optional'})</span></label>
        <input className="hybrid-input" value={motherEmail} onChange={e => setMotherEmail(e.target.value)} placeholder="mom@email.com" type="email" />
        <div className="hybrid-iban-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <BankGardenIcon size={16} color={c.mint} />
            <label style={{ margin: 0, color: c.mint, fontSize: 13 }}>{isAr ? 'رقم الآيبان البنكي' : 'Bank IBAN'} <span className="hybrid-optional">({isAr ? 'اختياري' : 'optional'})</span></label>
          </div>
          <input className="hybrid-input" value={motherIban} onChange={e => setMotherIban(e.target.value)} placeholder="SA00 0000 0000 0000 0000 0000" style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.05em' }} />
        </div>
      </div>
      <NavButtons canProceed={!!motherName.trim()} />
    </motion.div>
  );

  // ────────── Step 4: Members ──────────
  const addBrother = () => setBrothers([...brothers, { id: uid(), name: '', email: '', phone: '', role: 'contributor', percent: 0 }]);
  const removeBrother = (id: string) => setBrothers(brothers.filter(b => b.id !== id));
  const updateBrother = (id: string, field: keyof BrotherEntry, value: string | number) =>
    setBrothers(brothers.map(b => b.id === id ? { ...b, [field]: value } : b));

  const renderMembers = () => (
    <motion.div key="members" className="hybrid-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={spring}>
      <PersonFloralIcon size={36} color={c.mint} />
      <h2 className="hybrid-title">{isAr ? 'أعضاء العائلة المشاركون' : 'Family Contributors'}</h2>
      <p className="hybrid-subtitle">{isAr ? 'أضف الإخوة والأخوات الذين سيساهمون أو يتابعون' : 'Add siblings who will contribute or observe'}</p>
      <div className="hybrid-form">
        <div className="hybrid-toggle-row" style={{ marginBottom: 12 }}>
          <button className={`hybrid-toggle ${shareMode === 'equal' ? 'active' : ''}`} onClick={() => setShareMode('equal')}>{isAr ? 'بالتساوي' : 'Equal'}</button>
          <button className={`hybrid-toggle ${shareMode === 'custom' ? 'active' : ''}`} onClick={() => setShareMode('custom')}>{isAr ? 'مخصّص' : 'Custom'}</button>
        </div>
        {brothers.map((bro, i) => (
          <motion.div key={bro.id} className="hybrid-member-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, color: c.brown, fontSize: 13 }}>#{i + 1}</span>
              <button style={{ background: 'none', border: 'none', color: c.emergency, cursor: 'pointer', fontSize: 12 }} onClick={() => removeBrother(bro.id)}>{isAr ? 'إزالة' : 'Remove'}</button>
            </div>
            <div className="hybrid-toggle-row" style={{ marginBottom: 8 }}>
              <button className={`hybrid-toggle small ${bro.role === 'contributor' ? 'active' : ''}`} onClick={() => updateBrother(bro.id, 'role', 'contributor')}>
                <MoneyLeafIcon size={12} /> {isAr ? 'مساهم' : 'Contributor'}
              </button>
              <button className={`hybrid-toggle small ${bro.role === 'observer' ? 'active observer' : ''}`} onClick={() => updateBrother(bro.id, 'role', 'observer')}>
                <EyeLeafIcon size={12} /> {isAr ? 'متابع' : 'Observer'}
              </button>
            </div>
            <input className="hybrid-input" value={bro.name} onChange={e => updateBrother(bro.id, 'name', e.target.value)} placeholder={isAr ? 'الاسم' : 'Name'} />
            <input className="hybrid-input" value={bro.email} onChange={e => updateBrother(bro.id, 'email', e.target.value)} placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} type="email" style={{ marginTop: 4 }} />
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <div className="hybrid-prefix">+966</div>
              <input className="hybrid-input" style={{ flex: 1 }} value={bro.phone} onChange={e => updateBrother(bro.id, 'phone', e.target.value)} placeholder="5XX XXX XXXX" />
            </div>
            {shareMode === 'custom' && bro.role === 'contributor' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <input className="hybrid-input" type="number" style={{ width: 60, textAlign: 'center' }} value={bro.percent || ''} onChange={e => updateBrother(bro.id, 'percent', parseInt(e.target.value) || 0)} placeholder="25" />
                <span style={{ color: c.muted, fontSize: 13 }}>%</span>
              </div>
            )}
          </motion.div>
        ))}
        <motion.button className="btn btn-glass btn-md btn-full" onClick={addBrother} whileTap={{ scale: 0.97 }} style={{ marginTop: 8 }}>
          + {isAr ? 'إضافة عضو' : 'Add Member'}
        </motion.button>
      </div>
      <NavButtons canProceed />
      <SkipLink text="I'll add members later" textAr="أضيفهم لاحقاً" />
    </motion.div>
  );

  // ────────── Step 5: Staff ──────────
  const toggleStaff = (idx: number) => {
    setStaffList(prev => prev.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s));
  };
  const updateStaffSalary = (idx: number, salary: number) => {
    setStaffList(prev => prev.map((s, i) => i === idx ? { ...s, salary } : s));
  };

  const renderStaff = () => (
    <motion.div key="staff" className="hybrid-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={spring}>
      <WrenchVineIcon size={36} color={c.muted} />
      <h2 className="hybrid-title">{isAr ? 'العمالة المنزلية' : 'Household Staff'}</h2>
      <p className="hybrid-subtitle">{isAr ? 'اختر العمالة وحدد الرواتب' : 'Select staff and set their salaries'}</p>
      <div className="hybrid-form">
        {staffList.map((s, i) => {
          const info = STAFF_ROLES.find(r => r.key === s.role)!;
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <button className={`hybrid-chip ${s.enabled ? 'active' : ''}`} onClick={() => toggleStaff(i)}>
                {s.enabled ? <CheckLeafIcon size={14} color="#fff" /> : null}
                {isAr ? info.ar : info.en}
              </button>
              {s.enabled && (
                <motion.div className="hybrid-expand" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ minWidth: 50, fontSize: 12 }}>{isAr ? 'الراتب' : 'Salary'}</label>
                    <input className="hybrid-input" type="number" style={{ width: 90, textAlign: 'center', fontWeight: 700 }} value={s.salary || ''} onChange={e => updateStaffSalary(i, parseInt(e.target.value) || 0)} />
                    <span style={{ color: c.muted, fontSize: 11 }}>{currency}/{isAr ? '/شهر' : 'mo'}</span>
                  </div>
                  <div className="hybrid-presets">
                    {[1500, 2000, 2500, 3000, 4000].map(p => (
                      <button key={p} className={`hybrid-preset ${s.salary === p ? 'active' : ''}`} onClick={() => updateStaffSalary(i, p)}>{p.toLocaleString()}</button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
        {staffTotal > 0 && (
          <div className="hybrid-total-bar">
            <span>{isAr ? 'إجمالي الرواتب' : 'Staff Total'}</span>
            <span style={{ fontWeight: 700, color: c.mint }}>{staffTotal.toLocaleString()} {currency}</span>
          </div>
        )}
      </div>
      <NavButtons canProceed />
      <SkipLink text="No household staff" textAr="ما في موظفين" />
    </motion.div>
  );

  // ────────── Steps 6-7: AI Chat ──────────
  const renderExpensesChat = () => (
    <motion.div key="chat" className="hybrid-chat-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Chat header */}
      <div className="hybrid-chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChatBubbleLeafIcon size={20} color={c.mint} />
          <span style={{ fontWeight: 600, color: c.brown }}>{isAr ? 'مساعد الميزانية' : 'Budget Assistant'}</span>
        </div>
        <span className="hybrid-chat-mode-badge">
          <ShieldLeafIcon size={12} color={c.blue} /> {isAr ? 'وضع الذكاء الاصطناعي' : 'AI Mode'}
        </span>
      </div>

      {/* Chat messages */}
      <div className="hybrid-chat-body">
        {chatMsgs.map(msg => (
          <motion.div
            key={msg.id}
            className={`hybrid-bubble ${msg.role}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={spring}
          >
            {msg.role === 'ai' && <SeedlingIcon size={16} color={c.mint} />}
            <div className="hybrid-bubble-text">{msg.text}</div>
          </motion.div>
        ))}

        {aiTyping && (
          <div className="hybrid-bubble ai">
            <SeedlingIcon size={16} color={c.mint} />
            <div className="hybrid-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* Inline expense editor */}
        {showExpenseEditor && (
          <motion.div className="hybrid-expense-editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 style={{ color: c.brown, margin: '0 0 8px 0', fontSize: 14 }}>
              <LeafBillIcon size={16} /> {isAr ? 'المصروفات الشهرية' : 'Monthly Expenses'}
            </h4>
            {expenses.map((exp, i) => (
              <div key={exp.category} className="hybrid-expense-row">
                <span className="hybrid-expense-label">{isAr ? exp.labelAr : exp.label}</span>
                <div className="hybrid-expense-amount">
                  <input
                    type="number"
                    value={exp.amount}
                    onChange={e => {
                      const val = parseInt(e.target.value) || 0;
                      setExpenses(prev => prev.map((ex, j) => j === i ? { ...ex, amount: val } : ex));
                    }}
                    disabled={exp.category === 'emergency'}
                    className="hybrid-amount-input"
                  />
                  <span className="hybrid-currency">{currency}</span>
                </div>
              </div>
            ))}
            <div className="hybrid-expense-total">
              <span>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span style={{ fontWeight: 800, color: c.mint, fontSize: 16 }}>
                {(expenseSubtotal + emergencyAmount).toLocaleString()} {currency}
              </span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat input */}
      <div className="hybrid-chat-input-row">
        <input
          className="hybrid-chat-input"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          placeholder={isAr ? 'اكتب هنا...' : 'Type here...'}
          onKeyDown={e => e.key === 'Enter' && sendChat()}
        />
        <motion.button className="hybrid-send-btn" onClick={sendChat} whileTap={{ scale: 0.9 }} disabled={!chatInput.trim()}>
          <ArrowLeafIcon size={16} color="#fff" />
        </motion.button>
      </div>

      {/* Nav */}
      <div className="hybrid-nav-row" style={{ padding: '8px 16px' }}>
        <motion.button className="btn btn-glass btn-md" onClick={goBack} whileTap={{ scale: 0.95 }}>
          <ArrowLeafIcon size={16} /> {isAr ? 'رجوع' : 'Back'}
        </motion.button>
        <motion.button
          className="btn btn-primary btn-lg"
          style={{ flex: 1 }}
          onClick={goNext}
          whileTap={{ scale: 0.97 }}
        >
          <ChartBloomIcon size={16} color="#fff" /> {isAr ? 'عرض الخطة' : 'View Plan'}
        </motion.button>
      </div>
    </motion.div>
  );

  // ────────── Step 8: Plan ──────────
  const renderPlan = () => (
    <motion.div key="plan" className="hybrid-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={spring}>
      <ChartBloomIcon size={36} color={c.mint} />
      <h2 className="hybrid-title">{isAr ? 'خطة الدعم الشهرية' : 'Monthly Support Plan'}</h2>

      <div className="hybrid-plan-summary">
        <div className="hybrid-plan-row header">
          <span>{isAr ? 'البند' : 'Item'}</span>
          <span>{isAr ? 'المبلغ' : 'Amount'}</span>
        </div>
        {staffList.filter(s => s.enabled).map(s => {
          const info = STAFF_ROLES.find(r => r.key === s.role)!;
          return (
            <div key={s.id} className="hybrid-plan-row">
              <span>{isAr ? info.ar : info.en}</span>
              <span className="hybrid-plan-amount">{s.salary.toLocaleString()} {currency}</span>
            </div>
          );
        })}
        {expenses.map(exp => (
          <div key={exp.category} className="hybrid-plan-row">
            <span>{isAr ? exp.labelAr : exp.label}</span>
            <span className="hybrid-plan-amount">{exp.amount.toLocaleString()} {currency}</span>
          </div>
        ))}
        <div className="hybrid-plan-row total">
          <span>{isAr ? 'الإجمالي الشهري' : 'Monthly Total'}</span>
          <span className="hybrid-plan-total">{grandTotal.toLocaleString()} {currency}</span>
        </div>
      </div>

      {/* Split preview */}
      <div className="hybrid-split-preview">
        <h4 style={{ margin: '0 0 8px', color: c.brown, fontSize: 13 }}>
          {isAr ? `التقسيم (${shareMode === 'equal' ? 'متساوي' : 'مخصص'})` : `Split (${shareMode})`}
        </h4>
        <div className="hybrid-plan-row">
          <span style={{ fontWeight: 600 }}>{leaderName || (isAr ? 'أنت' : 'You')} ({isAr ? 'المسؤول' : 'Admin'})</span>
          <span className="hybrid-plan-amount">{perPerson.toLocaleString()} {currency}</span>
        </div>
        {brothers.filter(b => b.role === 'contributor').map(b => (
          <div key={b.id} className="hybrid-plan-row">
            <span>{b.name || '—'}</span>
            <span className="hybrid-plan-amount">{perPerson.toLocaleString()} {currency}</span>
          </div>
        ))}
      </div>

      <NavButtons nextLabel={isAr ? 'تأكيد وبدء' : 'Confirm & Start'} onNext={() => setStep('done')} />
    </motion.div>
  );

  // ────────── Done ──────────
  const renderDone = () => (
    <motion.div key="done" className="hybrid-card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.2 }}>
      <PetalConfetti count={20} />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}>
        <CheckLeafIcon size={48} color={c.success} />
      </motion.div>
      <motion.h2 className="hybrid-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        {isAr ? 'كل شيء جاهز!' : "You're All Set!"}
      </motion.h2>
      <motion.p className="hybrid-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
        {isAr ? 'لوحة التحكم جاهزة. استكشف كل شيء على مهلك.' : 'Your dashboard is ready. Explore everything at your own pace.'}
      </motion.p>
      <motion.button
        className="btn btn-primary btn-lg btn-full glow-mint"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={() => navigate('admin-dashboard')}
      >
        <WalletRoseIcon size={18} /> {isAr ? 'فتح لوحة التحكم' : 'Open Dashboard'}
      </motion.button>
    </motion.div>
  );


  // ═══════ MAIN RENDER ═══════
  return (
    <div className="screen hybrid-onboarding" dir={isAr ? 'rtl' : 'ltr'}>
      <FloatingPetals count={4} />

      {/* Header */}
      <div className="hybrid-header">
        <WalletRoseIcon size={32} />
        <div>
          <h3 style={{ margin: 0, color: c.brown, fontSize: 16, fontWeight: 700 }}>{isAr ? 'إنشاء عائلتك' : 'Create Your Family'}</h3>
          <p style={{ margin: 0, color: c.muted, fontSize: 12 }}>{isAr ? 'إعداد محفظة أمي لدائرة عائلتك' : 'Set up Ummi Wallet for your family circle'}</p>
        </div>
      </div>

      {/* Stepper */}
      {step !== 'done' && <StepperBar />}

      {/* Content */}
      <div className="hybrid-content">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
