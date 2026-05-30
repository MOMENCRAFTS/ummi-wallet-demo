/**
 * FinanceChatScreen — 3-Phase AI Chat (matches real AIChatScreen.tsx)
 * Phase A: Data Gathering with InputCards
 * Phase B: Budget Analysis (health score, 70/15/15 bar, insights)
 * Phase C: Translation Review (EN → AR)
 * Auto-animated with manual override capability
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal headers, Shami for friendly AI text
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, WalletRoseIcon, ChatBubbleLeafIcon,
  CheckLeafIcon, ChartBloomIcon, MoneyLeafIcon,
  HeartLeafIcon, PersonFloralIcon, LeafBillIcon,
  SeedlingIcon, MedicalHerbIcon, WrenchVineIcon,
  RoseSOSIcon, GlobeFlowerIcon, c,
} from '../icons/FloralIcons';

// ─── Types ───
type ChatPhase = 'gathering' | 'analysis' | 'translations';

interface EstimateItem {
  id: string;
  category: string;
  labelEn: string;
  labelAr: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  amount: number;
  motherEstimate: number;
  confirmed: boolean;
}

interface Insight {
  type: 'warning' | 'tip' | 'seasonal' | 'positive';
  title: string; titleAr: string;
  body: string; bodyAr: string;
}

// ─── Budget Categories (matches real app) ───
const CATEGORIES: Omit<EstimateItem, 'id' | 'confirmed'>[] = [
  { category: 'personal_allowance', labelEn: 'Personal Allowance', labelAr: 'المصروف الشخصي', Icon: HeartLeafIcon, amount: 1200, motherEstimate: 1200 },
  { category: 'payroll_maid', labelEn: 'Maid Salary', labelAr: 'راتب الخادمة', Icon: PersonFloralIcon, amount: 1500, motherEstimate: 1400 },
  { category: 'payroll_driver', labelEn: 'Driver Salary', labelAr: 'راتب السائق', Icon: PersonFloralIcon, amount: 1800, motherEstimate: 1800 },
  { category: 'bill', labelEn: 'Utilities', labelAr: 'المرافق (كهرباء، ماء، نت)', Icon: LeafBillIcon, amount: 800, motherEstimate: 700 },
  { category: 'grocery', labelEn: 'Groceries', labelAr: 'البقالة والمواد الغذائية', Icon: SeedlingIcon, amount: 600, motherEstimate: 500 },
  { category: 'medical', labelEn: 'Medical', labelAr: 'الرعاية الطبية', Icon: MedicalHerbIcon, amount: 400, motherEstimate: 400 },
  { category: 'emergency_buffer', labelEn: 'Emergency Buffer', labelAr: 'صندوق الطوارئ', Icon: RoseSOSIcon, amount: 500, motherEstimate: 0 },
];

// ─── Analysis Data (matches finance-analyze fallback) ───
const ANALYSIS = {
  healthScore: 7.5,
  needs: 72, wants: 18, safety: 10,
  insights: [
    { type: 'warning' as const, title: 'Staff costs = 49%', titleAr: 'تكاليف الموظفين = ٤٩٪', body: 'Household staff takes nearly half the budget. Consider a dedicated Payroll Pocket for clearer tracking.', bodyAr: 'رواتب الموظفين تاخذ تقريباً نص الميزانية. فكّر بعمل جيب خاص للرواتب.' },
    { type: 'tip' as const, title: 'Emergency buffer at 7.5%', titleAr: 'صندوق الطوارئ ٧.٥٪', body: 'Good safety net! Families caring for elderly parents should aim for 7-10%. You\'re right in range.', bodyAr: 'شبكة أمان ممتازة! العائلات اللي ترعى الوالدين تحتاج ٧-١٠٪. أنت بالضبط بالمدى الصحيح.' },
    { type: 'seasonal' as const, title: 'Summer electricity spike', titleAr: 'ارتفاع الكهرباء بالصيف', body: 'AC costs can double June-August in Saudi Arabia. Consider budgeting 1,200 SAR for summer months.', bodyAr: 'تكاليف المكيفات ممكن تتضاعف يونيو-أغسطس. فكّر تخصص ١,٢٠٠ ر.س لأشهر الصيف.' },
    { type: 'positive' as const, title: 'Balanced plan', titleAr: 'خطة متوازنة', body: 'Your 72/18/10 split is close to the ideal 70/15/15 for family care budgets. Well done!', bodyAr: 'توزيعك ٧٢/١٨/١٠ قريب من المثالي ٧٠/١٥/١٥ لميزانيات رعاية العائلة. أحسنت!' },
  ] as Insight[],
};

// ─── Translation Pairs ───
const TRANSLATIONS = CATEGORIES.map(cat => ({
  en: cat.labelEn,
  ar: cat.labelAr,
  accepted: false,
}));

// ─── Spring config ───
const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

// ═══════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════

export default function FinanceChatScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  // State
  const [phase, setPhase] = useState<ChatPhase>('gathering');
  const [items, setItems] = useState<EstimateItem[]>(
    CATEGORIES.map((cat, i) => ({ ...cat, id: `item_${i}`, confirmed: false }))
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [showTyping, setShowTyping] = useState(true);
  const [aiMessage, setAiMessage] = useState('');
  const [translations, setTranslations] = useState(TRANSLATIONS.map(t => ({ ...t })));
  const [autoMode, setAutoMode] = useState(true);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = items.filter(i => i.confirmed).reduce((s, i) => s + i.amount, 0);
  const confirmedCount = items.filter(i => i.confirmed).length;

  // ─── Scroll helper ───
  const scrollBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
  }, []);

  // ─── AI Messages per category ───
  const getAiMessage = (idx: number): string => {
    if (idx === 0) return isAr
      ? 'أهلاً! أنا مساعد أمي الذكي\n\nأمي شاركت احتياجاتها الشهرية. خلّنا نبني خطة مفصّلة.\n\nنبدأ بالمصروف الشخصي:'
      : "Welcome! I'm Ummi's AI assistant\n\nMother shared her monthly needs. Let me help you build a detailed plan.\n\nLet's start with personal allowance:";
    if (idx === 1) return isAr ? 'تمام! نبدأ برواتب العمالة المنزلية — راتب العاملة المنزلية أولًا:' : 'Now household staff — maid salary first:';
    if (idx === 2) return isAr ? 'ممتاز. ما راتب السائق؟' : 'Great! And the driver salary?';
    if (idx === 3) return isAr ? 'الآن الفواتير — كهرباء، ماء، إنترنت. كم المتوسط الشهري؟' : 'Now utilities — electricity, water, internet. Monthly average?';
    if (idx === 4) return isAr ? 'حسنًا، البقالة والمواد الغذائية:' : 'Alright, groceries and food supplies:';
    if (idx === 5) return isAr ? 'الرعاية الصحية — الميزانية الشهرية:' : 'Medical care — monthly budget:';
    if (idx === 6) return isAr ? 'أخيرًا، احتياطي الطوارئ. الوالدة لم تحدد مبلغًا — أقترح ٥٠٠ ر.س كشبكة أمان:' : "Finally, emergency buffer. Mother didn't specify — I suggest 500 SAR as a safety net:";
    return '';
  };

  // ─── Phase A: Auto-advance ───
  useEffect(() => {
    if (phase !== 'gathering' || !autoMode) return;
    if (activeIdx >= items.length) return;

    setShowTyping(true);
    const msg = getAiMessage(activeIdx);

    autoTimer.current = setTimeout(() => {
      setShowTyping(false);
      setAiMessage(msg);
      scrollBottom();

      // Auto-confirm after showing input card
      autoTimer.current = setTimeout(() => {
        confirmItem(activeIdx);
      }, 1800);
    }, activeIdx === 0 ? 1500 : 900);

    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [phase, activeIdx, autoMode]);

  // ─── Phase transition after all items confirmed ───
  useEffect(() => {
    if (phase === 'gathering' && confirmedCount === items.length && confirmedCount > 0) {
      setTimeout(() => {
        setPhase('analysis');
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          scrollBottom();
        }, 1200);
      }, 600);
    }
  }, [confirmedCount, items.length, phase]);

  // ─── Confirm item ───
  const confirmItem = (idx: number) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, confirmed: true } : item));
    if (idx < items.length - 1) {
      setActiveIdx(idx + 1);
    }
    scrollBottom();
  };

  // ─── Adjust amount ───
  const adjustAmount = (idx: number, amount: number) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, amount } : item));
  };

  // ─── Translation handlers ───
  const acceptTranslation = (idx: number) => {
    setTranslations(prev => prev.map((t, i) => i === idx ? { ...t, accepted: true } : t));
  };

  const acceptAllTranslations = () => {
    setTranslations(prev => prev.map(t => ({ ...t, accepted: true })));
  };

  // ─── Phase indicator ───
  const PhaseIndicator = () => (
    <div className="phase-indicator">
      {(['gathering', 'analysis', 'translations'] as ChatPhase[]).map(p => (
        <div key={p} className={`phase-dot ${phase === p ? 'active' : ''} ${
          (p === 'gathering' && phase !== 'gathering') || (p === 'analysis' && phase === 'translations') ? 'done' : ''
        }`}>
          {((p === 'gathering' && phase !== 'gathering') || (p === 'analysis' && phase === 'translations'))
            ? <CheckLeafIcon size={10} color="#fff" />
            : null
          }
        </div>
      ))}
      <span className="phase-label">
        {phase === 'gathering' ? (isAr ? 'جمع البيانات' : 'Data Gathering') :
         phase === 'analysis' ? (isAr ? 'التحليل' : 'Analysis') :
         (isAr ? 'المراجعة' : 'Review')}
      </span>
    </div>
  );

  return (
    <div className="screen finance-chat" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChatBubbleLeafIcon size={20} />
          {phase === 'gathering' ? (isAr ? 'إعداد بالذكاء الاصطناعي' : 'AI Setup') :
           phase === 'analysis' ? (isAr ? 'تحليل الميزانية' : 'Budget Analysis') :
           (isAr ? 'مراجعة الترجمات' : 'Translation Review')}
        </span>
      </div>

      <PhaseIndicator />

      <div className="chat-scroll" ref={scrollRef}>

        {/* ═══ PHASE A: GATHERING ═══ */}
        {phase === 'gathering' && (
          <>
            {/* AI message */}
            {aiMessage && (
              <motion.div
                className="chat-bubble ai"
                initial={{ opacity: 0, y: 15, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={spring}
              >
                <span className="chat-avatar-svg"><WalletRoseIcon size={22} /></span>
                <div className="chat-content">
                  {aiMessage.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Confirmed cards */}
            <AnimatePresence>
              {items.filter(i => i.confirmed).map((item) => (
                <motion.div
                  key={item.id}
                  className="confirmed-card"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={spring}
                >
                  <span className="confirmed-icon"><item.Icon size={20} /></span>
                  <div className="confirmed-text">
                    <span className="confirmed-label">{isAr ? item.labelAr : item.labelEn}</span>
                    <span className="confirmed-sub">{isAr ? item.labelEn : item.labelAr}</span>
                  </div>
                  <span className="confirmed-amount">
                    {item.amount.toLocaleString()} <small>{isAr ? 'ر.س' : 'SAR'}</small>
                  </span>
                  <CheckLeafIcon size={16} color={c.success} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Active input card */}
            {activeIdx < items.length && !items[activeIdx].confirmed && !showTyping && (
              <motion.div
                className="input-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
              >
                <div className="input-card-header">
                  <span className="input-card-icon">
                    {(() => { const I = items[activeIdx].Icon; return <I size={28} />; })()}
                  </span>
                  <div>
                    <span className="input-card-label">{isAr ? items[activeIdx].labelAr : items[activeIdx].labelEn}</span>
                    {items[activeIdx].motherEstimate > 0 && (
                      <span className="input-card-mother">
                        {isAr ? 'تقدير الوالدة:' : "Mother's estimate:"} {items[activeIdx].motherEstimate.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="input-card-amount-row">
                  <input
                    type="number"
                    className="input-card-amount"
                    value={items[activeIdx].amount}
                    onChange={e => adjustAmount(activeIdx, Number(e.target.value) || 0)}
                    onClick={() => { setAutoMode(false); if (autoTimer.current) clearTimeout(autoTimer.current); }}
                  />
                  <span className="input-card-currency">{isAr ? 'ر.س' : 'SAR'}</span>
                </div>
                <button
                  className="btn btn-primary btn-sm input-card-confirm"
                  onClick={() => { setAutoMode(false); confirmItem(activeIdx); }}
                >
                  <CheckLeafIcon size={14} /> {isAr ? 'تأكيد' : 'Confirm'}
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* ═══ PHASE B: ANALYSIS ═══ */}
        {phase === 'analysis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* AI intro */}
            <div className="chat-bubble ai">
              <span className="chat-avatar-svg"><WalletRoseIcon size={22} /></span>
              <div className="chat-content">
                <p>{isAr ? 'جارٍ جارٍ تحليل خطتك...' : 'Analyzing your plan...'}</p>
                <p>{isAr ? 'سأفحص توازن ٧٠/١٥/١٥، وأراجع الأنماط الموسمية، وأقترح تحسينات مناسبة.' : "I'll check the 70/15/15 balance, look for seasonal patterns, and suggest optimizations."}</p>
              </div>
            </div>

            {/* Health Score */}
            <motion.div
              className="analysis-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, ...spring }}
            >
              <div className="health-score-circle">
                <svg viewBox="0 0 80 80" className="health-score-ring">
                  <circle cx="40" cy="40" r="34" fill="none" stroke={c.divider} strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke={c.mint} strokeWidth="6"
                    strokeDasharray={`${(ANALYSIS.healthScore / 10) * 213.6} 213.6`}
                    strokeLinecap="round" transform="rotate(-90 40 40)" />
                </svg>
                <span className="health-score-value">{ANALYSIS.healthScore}</span>
                <span className="health-score-label">{isAr ? 'سلامة الميزانية' : 'Budget Health'}</span>
              </div>

              {/* Assessment bar */}
              <div className="assessment-bar">
                <div className="assessment-segment needs" style={{ flex: ANALYSIS.needs }} />
                <div className="assessment-segment wants" style={{ flex: ANALYSIS.wants }} />
                <div className="assessment-segment safety" style={{ flex: ANALYSIS.safety }} />
              </div>
              <div className="assessment-labels">
                <span><span className="dot needs" /> {isAr ? 'الاحتياجات' : 'Needs'} {ANALYSIS.needs}%</span>
                <span><span className="dot wants" /> {isAr ? 'الرغبات' : 'Wants'} {ANALYSIS.wants}%</span>
                <span><span className="dot safety" /> {isAr ? 'الاحتياط' : 'Safety'} {ANALYSIS.safety}%</span>
              </div>
            </motion.div>

            {/* Insights */}
            {ANALYSIS.insights.map((insight, i) => (
              <motion.div
                key={i}
                className={`insight-card insight-${insight.type}`}
                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, ...spring }}
              >
                <span className="insight-icon">
                  {insight.type === 'warning' ? <RoseSOSIcon size={18} color={c.yellow} /> :
                   insight.type === 'tip' ? <SeedlingIcon size={18} color={c.mint} /> :
                   insight.type === 'seasonal' ? <LeafBillIcon size={18} color={c.blue} /> :
                   <CheckLeafIcon size={18} color={c.success} />}
                </span>
                <div className="insight-body">
                  <strong>{isAr ? insight.titleAr : insight.title}</strong>
                  <p>{isAr ? insight.bodyAr : insight.body}</p>
                </div>
              </motion.div>
            ))}

            {/* Action buttons */}
            <motion.div
              className="analysis-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, ...spring }}
            >
              <button className="btn btn-primary btn-md" onClick={() => setPhase('translations')}>
                <GlobeFlowerIcon size={18} /> {isAr ? 'مراجعة الترجمات' : 'Review Translations'}
              </button>
              <button className="btn btn-glass btn-md" onClick={() => navigate('finance-summary')}>
                {isAr ? 'الانتقال إلى الملخص' : 'Skip to Summary'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ═══ PHASE C: TRANSLATIONS ═══ */}
        {phase === 'translations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* AI intro */}
            <div className="chat-bubble ai">
              <span className="chat-avatar-svg"><WalletRoseIcon size={22} /></span>
              <div className="chat-content">
                <p>{isAr
                  ? 'هذي الترجمات اللي راح تشوفها أمي. راجعها وعدّل اللي تبي:'
                  : "Here are the translations for Mother's view. Review each one — she'll see these in Arabic RTL layout."
                }</p>
              </div>
            </div>

            {/* Translation cards */}
            {translations.map((t, i) => (
              <motion.div
                key={i}
                className={`translation-card ${t.accepted ? 'accepted' : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, ...spring }}
              >
                <div className="translation-pair">
                  <div className="translation-side en">
                    <span className="translation-lang">EN</span>
                    <span className="translation-text">{t.en}</span>
                  </div>
                  <span className="translation-arrow">→</span>
                  <div className="translation-side ar">
                    <span className="translation-lang">AR</span>
                    <span className="translation-text" dir="rtl">{t.ar}</span>
                  </div>
                </div>
                {!t.accepted ? (
                  <button className="btn btn-glass btn-xs" onClick={() => acceptTranslation(i)}>
                    <CheckLeafIcon size={12} /> {isAr ? 'اعتماد' : 'Accept'}
                  </button>
                ) : (
                  <span className="translation-accepted-badge">
                    <CheckLeafIcon size={12} color={c.success} />
                  </span>
                )}
              </motion.div>
            ))}

            {/* Accept all + proceed */}
            <motion.div
              className="translation-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...spring }}
            >
              {translations.some(t => !t.accepted) && (
                <button className="btn btn-outline btn-md" onClick={acceptAllTranslations}>
                  <CheckLeafIcon size={16} /> {isAr ? 'اعتماد الكل' : 'Accept All'}
                </button>
              )}
              <button className="btn btn-primary btn-lg btn-full glow-mint" onClick={() => navigate('finance-summary')}>
                <ChartBloomIcon size={18} /> {isAr ? 'عرض الملخص' : 'View Summary'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Typing indicator */}
        {showTyping && (
          <div className="chat-bubble ai typing">
            <span className="chat-avatar-svg"><WalletRoseIcon size={22} /></span>
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div style={{ height: 100 }} />
      </div>

      {/* ═══ Running Total Footer ═══ */}
      <motion.div
        className="running-total"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, ...spring }}
      >
        <div className="running-total-inner">
          <div className="running-total-info">
            <span className="running-label">{isAr ? 'الإجمالي الحالي' : 'Running Total'}</span>
            <span className="running-count">{confirmedCount}/{items.length} {isAr ? 'بنود' : 'items'}</span>
          </div>
          <span className="running-amount">{total.toLocaleString()} <small>{isAr ? 'ر.س' : 'SAR'}</small></span>
        </div>
      </motion.div>
    </div>
  );
}
