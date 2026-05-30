/**
 * SplitProposalSheet — Admin proposes a cost split among brothers
 * Bottom sheet overlay with per-brother amount inputs,
 * exempt toggle, "use default" button, and total validation.
 * Zero emoji — all SVG FloralIcons
 * Full Arabic: formal headers, Shami friendly text
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFamilyState, type SplitProposalItem } from '../../familyState';
import { useNavigation } from '../../navigation';
import {
  BalanceLeavesIcon, CheckLeafIcon, PersonFloralIcon,
  CrownFloralIcon, ArrowLeafIcon, SparkleAccent, c,
} from '../icons/FloralIcons';

interface Props {
  requestId: string;
  requestAmount: number;
  requestReason: string;
  requestReasonAr: string;
  onClose: () => void;
}

export default function SplitProposalSheet({ requestId, requestAmount, requestReason, requestReasonAr, onClose }: Props) {
  const { lang } = useNavigation();
  const { familyMembers, proposeSplit } = useFamilyState();
  const isAr = lang === 'ar';

  // Only contributors (not admin himself for exemption purposes, but admin pays too)
  const contributors = familyMembers.filter(m => m.role !== 'observer');

  // Per-member state
  const [amounts, setAmounts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    contributors.forEach(m => {
      initial[m.id] = String(Math.round(requestAmount * m.basePercent / 100));
    });
    return initial;
  });

  const [exemptions, setExemptions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    contributors.forEach(m => { initial[m.id] = false; });
    return initial;
  });

  const [submitted, setSubmitted] = useState(false);

  // Computed totals
  const currentTotal = useMemo(() => {
    return contributors.reduce((sum, m) => {
      if (exemptions[m.id]) return sum;
      return sum + (parseInt(amounts[m.id]) || 0);
    }, 0);
  }, [amounts, exemptions, contributors]);

  const isValid = currentTotal === requestAmount;
  const diff = requestAmount - currentTotal;

  // Apply default split
  const applyDefaultSplit = () => {
    const activeContributors = contributors.filter(m => !exemptions[m.id]);
    const totalPercent = activeContributors.reduce((s, m) => s + m.basePercent, 0);

    const newAmounts = { ...amounts };
    let remaining = requestAmount;

    activeContributors.forEach((m, i) => {
      if (i === activeContributors.length - 1) {
        newAmounts[m.id] = String(remaining);
      } else {
        const share = Math.round(requestAmount * m.basePercent / totalPercent);
        newAmounts[m.id] = String(share);
        remaining -= share;
      }
    });

    // Zero out exempt
    contributors.forEach(m => {
      if (exemptions[m.id]) newAmounts[m.id] = '0';
    });

    setAmounts(newAmounts);
  };

  const toggleExempt = (userId: string) => {
    setExemptions(prev => {
      const next = { ...prev, [userId]: !prev[userId] };
      if (next[userId]) {
        setAmounts(a => ({ ...a, [userId]: '0' }));
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const items: Omit<SplitProposalItem, 'status' | 'respondedAt'>[] = contributors.map(m => ({
      userId: m.id,
      userName: m.name,
      userNameAr: m.nameAr,
      proposedAmount: parseInt(amounts[m.id]) || 0,
      proposedPercent: requestAmount > 0 ? ((parseInt(amounts[m.id]) || 0) / requestAmount) * 100 : 0,
      isExempt: exemptions[m.id],
    }));

    proposeSplit(requestId, items);
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

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
          className="sheet-content split-proposal-sheet"
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
              <CheckLeafIcon size={48} color={c.success} />
              <h3 style={{ marginTop: 16, color: c.brown }}>
                {isAr ? 'تم إرسال التقسيم!' : 'Split Sent!'}
              </h3>
              <p style={{ color: c.muted, fontSize: 13, marginTop: 8 }}>
                {isAr ? 'بيوصل إشعار لكل أخ — الله يبارك' : 'Each brother will be notified'}
              </p>
            </motion.div>
          ) : (
            <>
              {/* ─── HEADER ─── */}
              <div className="sheet-header">
                <div className="sheet-handle" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                  <BalanceLeavesIcon size={22} />
                  <h3 className="sheet-title">{isAr ? 'تقسيم الطلب' : 'Split Request'}</h3>
                </div>
                <div className="sheet-request-info">
                  <span className="sheet-request-amount">{requestAmount.toLocaleString()} <small>{isAr ? 'ر.س' : 'SAR'}</small></span>
                  <span className="sheet-request-reason">{isAr ? requestReasonAr : requestReason}</span>
                </div>
              </div>

              {/* ─── DEFAULT SPLIT BUTTON ─── */}
              <button
                className="btn btn-glass btn-sm btn-full split-default-btn"
                onClick={applyDefaultSplit}
                style={{ marginBottom: 16 }}
              >
                <SparkleAccent size={10} />
                {isAr
                  ? `التقسيم الأساسي (${contributors.filter(m => !exemptions[m.id]).map(m => `${m.basePercent}%`).join('/')})`
                  : `Use default (${contributors.filter(m => !exemptions[m.id]).map(m => `${m.basePercent}%`).join('/')})`
                }
              </button>

              {/* ─── PER-MEMBER CARDS ─── */}
              <div className="split-members-list">
                {contributors.map((member, i) => {
                  const isAdmin = member.role === 'admin';
                  const isExempt = exemptions[member.id];
                  const amt = parseInt(amounts[member.id]) || 0;
                  const pct = requestAmount > 0 ? Math.round((amt / requestAmount) * 100) : 0;

                  return (
                    <motion.div
                      key={member.id}
                      className={`card split-member-card ${isExempt ? 'exempt' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isExempt ? 0.5 : 1, y: 0 }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      <div className="split-member-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {isAdmin ? <CrownFloralIcon size={14} /> : <PersonFloralIcon size={14} />}
                          <span className="split-member-name">
                            {isAr ? member.nameAr : member.name}
                            {isAdmin ? (isAr ? ' (أنت)' : ' (you)') : ''}
                          </span>
                        </div>
                        {!isAdmin && (
                          <button
                            className={`chip chip-sm ${isExempt ? 'chip-exempt-active' : ''}`}
                            onClick={() => toggleExempt(member.id)}
                          >
                            {isAr ? (isExempt ? 'معفي ✓' : 'إعفاء') : (isExempt ? 'Exempt ✓' : 'Exempt')}
                          </button>
                        )}
                      </div>

                      {!isExempt && (
                        <div className="split-amount-row">
                          <input
                            className="input split-amount-input"
                            type="number"
                            value={amounts[member.id]}
                            onChange={e => setAmounts(prev => ({ ...prev, [member.id]: e.target.value }))}
                            min={0}
                          />
                          <span className="split-currency">{isAr ? 'ر.س' : 'SAR'}</span>
                          <span className="split-percent">{pct}%</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* ─── TOTAL VALIDATION ─── */}
              <div className={`split-total-bar ${isValid ? 'valid' : 'invalid'}`}>
                <span>{isAr ? 'الإجمالي' : 'Total'}: {currentTotal.toLocaleString()} / {requestAmount.toLocaleString()}</span>
                {!isValid && (
                  <span className="split-diff">
                    {diff > 0
                      ? (isAr ? `ينقص ${diff.toLocaleString()}` : `${diff.toLocaleString()} short`)
                      : (isAr ? `زيادة ${Math.abs(diff).toLocaleString()}` : `${Math.abs(diff).toLocaleString()} over`)
                    }
                  </span>
                )}
                {isValid && <CheckLeafIcon size={16} color={c.success} />}
              </div>

              {/* ─── SUBMIT ─── */}
              <motion.button
                className={`btn btn-lg btn-full ${isValid ? 'btn-primary glow-mint' : 'btn-disabled'}`}
                onClick={handleSubmit}
                disabled={!isValid}
                whileTap={isValid ? { scale: 0.97 } : {}}
                style={{ marginTop: 12 }}
              >
                <BalanceLeavesIcon size={18} color={isValid ? '#fff' : c.muted} />
                {isAr ? 'إرسال للموافقة' : 'Send for Approval'}
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
