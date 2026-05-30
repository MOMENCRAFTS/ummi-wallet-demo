/**
 * SplitResponseSheet — Brother responds to a split proposal
 * Bottom sheet: shows your share, other brothers' shares,
 * and accept/counter/decline actions.
 * Zero emoji — all SVG FloralIcons
 * Full Arabic: formal headers, Shami friendly text
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFamilyState, type SplitProposal } from '../../familyState';
import { useNavigation } from '../../navigation';
import {
  BalanceLeavesIcon, CheckLeafIcon, PersonFloralIcon,
  CrownFloralIcon, ArrowLeafIcon, HandPetalIcon,
  WiltIcon, ChatBubbleLeafIcon, c,
} from '../icons/FloralIcons';

interface Props {
  proposal: SplitProposal;
  userId: string; // which brother is viewing
  onClose: () => void;
}

const statusLabels: Record<string, { en: string; ar: string; color: string }> = {
  pending:       { en: 'Pending',      ar: 'بانتظار',       color: c.yellow },
  accepted:      { en: 'Accepted',     ar: 'وافق',         color: c.success },
  declined:      { en: 'Declined',     ar: 'رفض',          color: c.emergency },
  counter:       { en: 'Countered',    ar: 'عرض بديل',     color: c.peach },
  auto_accepted: { en: 'Auto-accepted', ar: 'قبول تلقائي', color: c.muted },
};

export default function SplitResponseSheet({ proposal, userId, onClose }: Props) {
  const { lang } = useNavigation();
  const { respondToSplit } = useFamilyState();
  const isAr = lang === 'ar';

  const [mode, setMode] = useState<'view' | 'counter'>('view');
  const [counterAmount, setCounterAmount] = useState('');
  const [counterReason, setCounterReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitAction, setSubmitAction] = useState<string>('');

  const myItem = proposal.items.find(i => i.userId === userId);
  const otherItems = proposal.items.filter(i => i.userId !== userId);

  if (!myItem) return null;

  const handleAccept = () => {
    respondToSplit(proposal.id, userId, 'accepted');
    setSubmitAction('accepted');
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  const handleDecline = () => {
    respondToSplit(proposal.id, userId, 'declined');
    setSubmitAction('declined');
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  const handleCounter = () => {
    const amt = parseInt(counterAmount);
    if (!amt || amt <= 0) return;
    respondToSplit(proposal.id, userId, 'counter', amt, counterReason);
    setSubmitAction('counter');
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  // Time remaining until auto-accept
  const msRemaining = proposal.autoAcceptAt - Date.now();
  const hoursRemaining = Math.max(0, Math.floor(msRemaining / (1000 * 60 * 60)));

  return (
    <AnimatePresence>
      <motion.div
        className="sheet-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="sheet-content split-response-sheet"
          dir={isAr ? 'rtl' : 'ltr'}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          {submitted ? (
            /* ─── SUCCESS ─── */
            <motion.div
              style={{ textAlign: 'center', padding: '40px 20px' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {submitAction === 'accepted' && <CheckLeafIcon size={48} color={c.success} />}
              {submitAction === 'declined' && <WiltIcon size={48} color={c.emergency} />}
              {submitAction === 'counter' && <ChatBubbleLeafIcon size={48} color={c.peach} />}
              <h3 style={{ marginTop: 16, color: c.brown }}>
                {submitAction === 'accepted' && (isAr ? 'تم القبول — جزاك الله خير' : 'Accepted!')}
                {submitAction === 'declined' && (isAr ? 'تم الرفض' : 'Declined')}
                {submitAction === 'counter' && (isAr ? 'تم إرسال العرض البديل' : 'Counter sent!')}
              </h3>
            </motion.div>
          ) : (
            <>
              {/* ─── HEADER ─── */}
              <div className="sheet-header">
                <div className="sheet-handle" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                  <HandPetalIcon size={22} />
                  <h3 className="sheet-title">{isAr ? 'طلب تقسيم من المسؤول' : 'Split Proposal'}</h3>
                </div>
                <div className="sheet-request-info">
                  <span className="sheet-request-amount">{proposal.totalAmount.toLocaleString()} <small>{isAr ? 'ر.س' : 'SAR'}</small></span>
                  {hoursRemaining > 0 && (
                    <span className="split-timer">
                      {isAr ? `${hoursRemaining} ساعة متبقية` : `${hoursRemaining}h remaining`}
                    </span>
                  )}
                </div>
              </div>

              {/* ─── YOUR SHARE ─── */}
              <motion.div
                className="card glass flourish split-your-share"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <span className="split-share-label">{isAr ? 'حصّتك' : 'Your share'}</span>
                <div className="split-share-amount">
                  <span className="split-share-value">{myItem.proposedAmount.toLocaleString()}</span>
                  <span className="split-share-currency">{isAr ? 'ر.س' : 'SAR'}</span>
                  <span className="split-share-percent">({Math.round(myItem.proposedPercent)}%)</span>
                </div>
              </motion.div>

              {/* ─── OTHER BROTHERS ─── */}
              <div className="split-others-section">
                <span className="split-others-title">{isAr ? 'الأعضاء الآخرين' : 'Others'}</span>
                {otherItems.map(item => {
                  const st = statusLabels[item.status] || statusLabels.pending;
                  return (
                    <div key={item.userId} className="split-other-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {item.userId === 'admin'
                          ? <CrownFloralIcon size={12} />
                          : <PersonFloralIcon size={12} />
                        }
                        <span className="split-other-name">{isAr ? item.userNameAr : item.userName}</span>
                      </div>
                      {item.isExempt ? (
                        <span className="split-exempt-badge">{isAr ? 'معفي' : 'Exempt'}</span>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="split-other-amount">{item.proposedAmount.toLocaleString()}</span>
                          <span className="badge" style={{ background: st.color + '20', color: st.color, fontSize: 10 }}>
                            {isAr ? st.ar : st.en}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ─── COUNTER MODE ─── */}
              <AnimatePresence>
                {mode === 'counter' && (
                  <motion.div
                    className="split-counter-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="form-label">{isAr ? 'أقدر أدفع' : 'I can pay'}</label>
                    <div className="split-counter-row">
                      <input
                        className="input split-counter-input"
                        type="number"
                        value={counterAmount}
                        onChange={e => setCounterAmount(e.target.value)}
                        placeholder={String(Math.round(myItem.proposedAmount * 0.6))}
                      />
                      <span className="split-currency">{isAr ? 'ر.س' : 'SAR'}</span>
                    </div>
                    <label className="form-label" style={{ marginTop: 8 }}>{isAr ? 'السبب (اختياري)' : 'Reason (optional)'}</label>
                    <textarea
                      className="sos-textarea"
                      rows={2}
                      value={counterReason}
                      onChange={e => setCounterReason(e.target.value)}
                      placeholder={isAr ? 'مثلاً: مسافر هالشهر...' : 'e.g. travelling this month...'}
                    />
                    <motion.button
                      className="btn btn-peach btn-md btn-full"
                      onClick={handleCounter}
                      disabled={!counterAmount || parseInt(counterAmount) <= 0}
                      whileTap={{ scale: 0.97 }}
                      style={{ marginTop: 12 }}
                    >
                      <ChatBubbleLeafIcon size={16} color="#fff" />
                      {isAr ? 'إرسال العرض البديل' : 'Send Counter'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── ACTIONS ─── */}
              {mode === 'view' && (
                <div className="split-actions">
                  <motion.button
                    className="btn btn-primary btn-lg glow-mint"
                    onClick={handleAccept}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 2 }}
                  >
                    <CheckLeafIcon size={16} color="#fff" />
                    {isAr ? 'موافق' : 'Accept'}
                  </motion.button>
                  <motion.button
                    className="btn btn-glass btn-lg"
                    onClick={() => setMode('counter')}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1 }}
                  >
                    <ChatBubbleLeafIcon size={14} />
                    {isAr ? 'بديل' : 'Counter'}
                  </motion.button>
                  <motion.button
                    className="btn btn-ghost btn-lg"
                    onClick={handleDecline}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1 }}
                  >
                    <WiltIcon size={14} color={c.emergency} />
                    {isAr ? 'رفض' : 'Skip'}
                  </motion.button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
