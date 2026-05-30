/**
 * BrotherDashboard — True BrotherHome.tsx clone
 * Stats → DailyBarakah → Pending Approval → My Requests → IBAN → Share → Quick Actions
 * Zero emoji — all SVG FloralIcons, compressed spring animations
 * Full Arabic: formal for headers, Shami for friendly text
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { useFamilyState } from '../../familyState';
import {
  CrownFloralIcon, MoneyLeafIcon, HeartLeafIcon, TulipIcon, ArrowLeafIcon,
  CheckLeafIcon, PendingBudIcon, WiltIcon, HandPetalIcon,
  BouquetIcon, SeedlingIcon, SparkleAccent, ChatBubbleLeafIcon, ShieldLeafIcon,
  BalanceLeavesIcon, c,
} from '../icons/FloralIcons';
import SplitResponseSheet from './SplitResponseSheet';
import React from 'react';

const STATS = { totalPaid: 12000, totalApproved: 8, totalPending: 2 };

const PENDING_APPROVAL = [
  { id: '1', amount: 280, category: 'Pharmacy', categoryAr: 'صيدلية', status: 'pending' },
  { id: '2', amount: 150, category: 'Groceries', categoryAr: 'بقالة', status: 'pending' },
];

const MY_REQUESTS = [
  { id: '3', amount: 2000, category: 'Monthly Share', categoryAr: 'الحصة الشهرية', status: 'approved' },
  { id: '4', amount: 280, category: 'Pharmacy', categoryAr: 'صيدلية', status: 'pending' },
  { id: '5', amount: 500, category: 'Emergency', categoryAr: 'طوارئ', status: 'approved' },
];

const MY_SHARE = { amount: 2000, paid: 2000, status: 'settled' };

const COLLECTION_IBAN = {
  iban: 'SA1234 5678 9012 3456 7890',
  bank: 'Al Rajhi Bank',
  bankAr: 'بنك الراجحي',
  holder: 'Ahmed Family Trust',
  holderAr: 'صندوق عائلة أحمد',
};

const BARAKAH = {
  ar: 'ما نقص مال من صدقة — الله يبارك بالعيلة',
  en: '"Wealth does not decrease from charity." — Sahih Muslim',
};

const statusBadgeClass: Record<string, string> = {
  approved: 'badge-approved',
  pending: 'badge-pending',
  overdue: 'badge-overdue',
};

const statusLabelsAr: Record<string, string> = {
  approved: 'تمّت الموافقة',
  pending: 'بانتظار الموافقة',
  overdue: 'متأخّر',
};

export default function BrotherDashboard() {
  const { navigate, lang } = useNavigation();
  const { canBrotherAudit, chatUnread, getProposalsForBrother } = useFamilyState();
  const isAr = lang === 'ar';
  const remaining = MY_SHARE.amount - MY_SHARE.paid;
  const totalChatUnread = Object.values(chatUnread).reduce((a, b) => a + b, 0);

  // This brother's ID in the demo
  const myBrotherId = 'brother1'; // Mohammed
  const pendingSplits = getProposalsForBrother(myBrotherId);
  const [activeSplitProposal, setActiveSplitProposal] = useState<typeof pendingSplits[0] | null>(null);

  // If plan not published, show locked state
  if (!canBrotherAudit) {
    return (
      <div className="screen brother-dashboard-true" dir={isAr ? 'rtl' : 'ltr'}>
        <button className="dashboard-logout" onClick={() => navigate('landing' as any)}>
          <ArrowLeafIcon size={14} /> {isAr ? 'تسجيل الخروج' : 'Logout'}
        </button>
        <div className="pending-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            className="pending-icon"
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldLeafIcon size={48} color={c.mint} />
          </motion.div>
          <h2 className="onboarding-title">{isAr ? 'لم تُنشر الخطة بعد' : 'Plan Not Published Yet'}</h2>
          <p className="onboarding-subtitle">{isAr ? 'بانتظار نشر الخطة المالية من الابن المسؤول' : 'Waiting for the Responsible Son to publish the finance plan'}</p>
          <div className="pending-dots-row">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="pending-bounce-dot" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
          <motion.button
            className="btn btn-ghost admin-quick-btn" style={{ marginTop: 16 }}
            onClick={() => navigate('chat-list')}
          >
            <ChatBubbleLeafIcon size={16} />
            {isAr ? 'المحادثات' : 'Chat'}
            {totalChatUnread > 0 && <span className="admin-chat-badge">{totalChatUnread}</span>}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen brother-dashboard-true" dir={isAr ? 'rtl' : 'ltr'}>
      <button className="dashboard-logout" onClick={() => navigate('landing' as any)}>
        <ArrowLeafIcon size={14} /> {isAr ? 'تسجيل الخروج' : 'Logout'}
      </button>
      <div className="brother-scroll">

        {/* ═══ Stats Row ═══ */}
        <div className="stats-row">
          <motion.div
            className="card stat-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <span className="stat-value-amount">{STATS.totalPaid.toLocaleString()}</span>
            <SparkleAccent size={8} style={{ position: 'relative', top: -4 }} />
            <span className="stat-label">{isAr ? 'إجمالي المدفوعات' : 'Total Paid'}</span>
          </motion.div>
          <motion.div
            className="card stat-card"
            style={{ borderLeftColor: c.peach }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <span className="stat-value">{STATS.totalApproved}</span>
            <span className="stat-label">{isAr ? 'تمت الموافقة' : 'Approved'}</span>
          </motion.div>
          <motion.div
            className="card stat-card"
            style={{ borderLeftColor: c.yellow }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <span className="stat-value">{STATS.totalPending}</span>
            <span className="stat-label">{isAr ? 'قيد الانتظار' : 'Pending'}</span>
          </motion.div>
        </div>

        {/* ═══ Daily Barakah ═══ */}
        <motion.div
          className="card barakah-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="barakah-header">
            <SeedlingIcon size={18} />
            <span className="barakah-label">{isAr ? 'بركة اليوم' : 'Daily Barakah'}</span>
          </div>
          <p className="barakah-text">{isAr ? BARAKAH.ar : BARAKAH.en}</p>
        </motion.div>

        {/* ═══ Split Proposals from Admin ═══ */}
        {pendingSplits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="section-header-row">
              <BalanceLeavesIcon size={22} />
              <h3 className="section-title" style={{ flex: 1, marginBottom: 0 }}>
                {isAr ? 'طلبات تقسيم' : 'Split Requests'}
              </h3>
              <span className="badge badge-new">{pendingSplits.length} {isAr ? 'جديد' : 'new'}</span>
            </div>
            {pendingSplits.map(proposal => {
              const myItem = proposal.items.find(i => i.userId === myBrotherId);
              if (!myItem) return null;
              return (
                <motion.div
                  key={proposal.id}
                  className="card request-card highlight-card"
                  style={{ cursor: 'pointer', borderLeft: `3px solid ${c.mint}` }}
                  onClick={() => setActiveSplitProposal(proposal)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="request-row">
                    <div>
                      <span className="request-amount">
                        {myItem.proposedAmount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span>
                      </span>
                      <span className="request-category">
                        {isAr ? `حصّتك من ${proposal.totalAmount.toLocaleString()}` : `Your share of ${proposal.totalAmount.toLocaleString()}`}
                      </span>
                    </div>
                    <span className="badge badge-pending">
                      <PendingBudIcon size={10} /> {isAr ? 'بانتظارك' : 'Respond'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ═══ Pending Approval (legacy static) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="section-header-row">
            <TulipIcon size={22} />
            <h3 className="section-title" style={{ flex: 1, marginBottom: 0 }}>
              {isAr ? 'بانتظار الموافقة' : 'Pending Approval'}
            </h3>
            <span className="badge badge-new">{isAr ? `${PENDING_APPROVAL.length} جديد` : `${PENDING_APPROVAL.length} new`}</span>
          </div>
          {PENDING_APPROVAL.map(req => (
            <div key={req.id} className="card request-card highlight-card">
              <div className="request-row">
                <div>
                  <span className="request-amount">{req.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span></span>
                  <span className="request-category">{isAr ? req.categoryAr : req.category}</span>
                </div>
                <span className={`badge ${statusBadgeClass[req.status] || 'badge-pending'}`}>{isAr ? statusLabelsAr[req.status] : req.status}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ═══ My Requests ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ marginTop: 16 }}
        >
          <div className="section-header-row">
            <HandPetalIcon size={22} />
            <h3 className="section-title" style={{ flex: 1, marginBottom: 0 }}>
              {isAr ? 'طلباتي' : 'My Requests'}
            </h3>
          </div>
          {MY_REQUESTS.map(req => (
            <div key={req.id} className="card request-card">
              <div className="request-row">
                <div>
                  <span className="request-amount">{req.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span></span>
                  <span className="request-category">{isAr ? req.categoryAr : req.category}</span>
                </div>
                <span className={`badge ${statusBadgeClass[req.status] || 'badge-pending'}`}>{isAr ? statusLabelsAr[req.status] : req.status}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ═══ IBAN Card ═══ */}
        <motion.div
          className="card iban-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ marginTop: 16 }}
        >
          <h3 className="section-title" style={{ marginBottom: 6 }}>{isAr ? 'أين أحوّل؟' : 'Where to Send'}</h3>
          <span className="iban-meta">{isAr ? `${COLLECTION_IBAN.bankAr} • ${COLLECTION_IBAN.holderAr}` : `${COLLECTION_IBAN.bank} • ${COLLECTION_IBAN.holder}`}</span>
          <div className="iban-box">
            <span className="iban-number">{COLLECTION_IBAN.iban}</span>
          </div>
          <button className="btn btn-glass btn-sm" style={{ marginTop: 10 }}>
            {isAr ? 'نسخ رقم الآيبان' : 'Copy IBAN'}
          </button>
        </motion.div>

        {/* ═══ My Share ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ marginTop: 16 }}
        >
          <div className="section-header-row">
            <BouquetIcon size={22} />
            <h3 className="section-title" style={{ flex: 1, marginBottom: 0 }}>
              {isAr ? 'حصتي' : 'My Share'}
            </h3>
          </div>
          <div className="card request-card" style={{ borderLeftWidth: 3, borderLeftColor: remaining <= 0 ? c.success : c.peach, borderLeftStyle: 'solid' }}>
            <div className="request-row">
              <div>
                <span className="request-amount">{MY_SHARE.amount.toLocaleString()} <span className="request-sar">{isAr ? 'ر.س' : 'SAR'}</span></span>
                <span className="request-category">{isAr ? `المدفوع: ${MY_SHARE.paid.toLocaleString()} • ${remaining <= 0 ? 'تمّت التسوية' : 'معلّق'}` : `Paid: ${MY_SHARE.paid.toLocaleString()} • ${MY_SHARE.status}`}</span>
              </div>
              <span className={`badge ${remaining <= 0 ? 'badge-approved' : 'badge-pending'}`} style={remaining <= 0 ? { background: c.success + '20', color: c.success } : {}}>
                {remaining <= 0 ? (isAr ? 'تمت التسوية' : 'Settled') : (isAr ? 'قيد الانتظار' : 'Pending')}
              </span>
            </div>
            {remaining <= 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <CheckLeafIcon size={14} color={c.success} />
                <span style={{ fontSize: 12, color: c.success, fontWeight: 500 }}>
                  {isAr ? 'تم تقديم الإثبات — جزاك الله خيرًا' : 'Proof submitted'}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ═══ Quick Actions ═══ */}
        <motion.div
          className="brother-actions-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={() => navigate('brother-audit' as any)}>
            <TulipIcon size={20} /> {isAr ? 'عرض الخطة' : 'View Plan'}
          </button>
          <button className="btn btn-peach btn-lg" style={{ flex: 1 }} onClick={() => navigate('brother-pay-direct')}>
            <BouquetIcon size={20} /> {isAr ? 'دفع مباشر' : 'Pay Direct'}
          </button>
        </motion.div>
    </div>

      {/* Split Response Sheet */}
      {activeSplitProposal && (
        <SplitResponseSheet
          proposal={activeSplitProposal}
          userId={myBrotherId}
          onClose={() => setActiveSplitProposal(null)}
        />
      )}
    </div>
  );
}
