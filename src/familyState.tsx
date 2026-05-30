/**
 * FamilyState — Shared cross-role state machine
 * Tracks what each role has done so other roles can show
 * pending/waiting/locked states appropriately.
 * Persists in-memory only (resets on reload).
 *
 * V2: Added split proposal system for multi-context splits
 */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface MoneyRequest {
  id: string;
  amount: number;
  reason: string;
  reasonAr: string;
  status: 'pending' | 'approved' | 'rejected' | 'split_proposed';
  timestamp: number;
}

export type SplitItemStatus = 'pending' | 'accepted' | 'declined' | 'counter' | 'auto_accepted';

export interface SplitProposalItem {
  userId: string;
  userName: string;
  userNameAr: string;
  proposedAmount: number;
  proposedPercent: number;
  isExempt: boolean;
  status: SplitItemStatus;
  counterAmount?: number;
  counterReason?: string;
  respondedAt?: number;
}

export interface SplitProposal {
  id: string;
  contextType: 'request' | 'project';
  contextId: string;           // links to MoneyRequest.id or project ID
  totalAmount: number;
  reason?: string;
  status: 'proposed' | 'partially_accepted' | 'accepted' | 'counter_review' | 'expired';
  items: SplitProposalItem[];
  createdAt: number;
  acceptedAt?: number;
  // Escalation tracking
  reminder12hSent: boolean;
  reminder24hSent: boolean;
  forceApproveAvailableAt: number;  // 48h after created
  autoAcceptAt: number;             // 72h after created
}

// Default family members for the demo
const DEFAULT_MEMBERS = [
  { id: 'admin', name: 'Ahmed', nameAr: 'أحمد', role: 'admin', basePercent: 40 },
  { id: 'brother1', name: 'Mohammed', nameAr: 'محمد', role: 'brother', basePercent: 35 },
  { id: 'brother2', name: 'Khalid', nameAr: 'خالد', role: 'brother', basePercent: 25 },
];

export interface FamilyStateValue {
  // Admin actions
  planPublished: boolean;
  publishPlan: () => void;

  // Mother requests
  requests: MoneyRequest[];
  submitRequest: (amount: number, reason: string, reasonAr: string) => string;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  getPendingRequests: () => MoneyRequest[];

  // Split proposals (V2)
  splitProposals: SplitProposal[];
  proposeSplit: (requestId: string, items: Omit<SplitProposalItem, 'status' | 'respondedAt'>[]) => string;
  respondToSplit: (proposalId: string, userId: string, status: SplitItemStatus, counterAmount?: number, counterReason?: string) => void;
  adminRedistribute: (proposalId: string, updatedItems: { userId: string; newAmount: number }[]) => void;
  forceApproveProposal: (proposalId: string) => void;
  getProposalsForBrother: (userId: string) => SplitProposal[];
  getProposalForRequest: (requestId: string) => SplitProposal | undefined;
  familyMembers: typeof DEFAULT_MEMBERS;

  // Brother actions
  brotherAuditComplete: boolean;
  completeBrotherAudit: () => void;
  brotherPaid: boolean;
  completeBrotherPayment: () => void;

  // Computed blocking states
  canBrotherAudit: boolean;
  canObserverView: boolean;
  hasPendingForAdmin: boolean;
  hasPendingSplitForAdmin: boolean;

  // Chat unread (simple counter)
  chatUnread: Record<string, number>;
  addChatUnread: (channelId: string) => void;
  clearChatUnread: (channelId: string) => void;
}

const FamilyContext = createContext<FamilyStateValue | null>(null);

export function useFamilyState() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamilyState must be inside FamilyStateProvider');
  return ctx;
}

export function FamilyStateProvider({ children }: { children: ReactNode }) {
  const [planPublished, setPlanPublished] = useState(false);
  const [requests, setRequests] = useState<MoneyRequest[]>([]);
  const [splitProposals, setSplitProposals] = useState<SplitProposal[]>([]);
  const [brotherAuditComplete, setBrotherAuditComplete] = useState(false);
  const [brotherPaid, setBrotherPaid] = useState(false);
  const [chatUnread, setChatUnread] = useState<Record<string, number>>({
    'family': 3,
    'caregivers': 1,
  });

  const publishPlan = useCallback(() => setPlanPublished(true), []);

  // ─── Money Requests ───

  const submitRequest = useCallback((amount: number, reason: string, reasonAr: string) => {
    const id = `req-${Date.now()}`;
    setRequests(prev => [...prev, {
      id, amount, reason, reasonAr, status: 'pending', timestamp: Date.now(),
    }]);
    return id;
  }, []);

  const approveRequest = useCallback((id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  }, []);

  const rejectRequest = useCallback((id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  }, []);

  const getPendingRequests = useCallback(() => {
    return requests.filter(r => r.status === 'pending');
  }, [requests]);

  // ─── Split Proposals (V2) ───

  const proposeSplit = useCallback((requestId: string, items: Omit<SplitProposalItem, 'status' | 'respondedAt'>[]) => {
    const id = `split-${Date.now()}`;
    const now = Date.now();
    const totalAmount = items.reduce((sum, i) => sum + (i.isExempt ? 0 : i.proposedAmount), 0);

    const proposal: SplitProposal = {
      id,
      contextType: 'request',
      contextId: requestId,
      totalAmount,
      status: 'proposed',
      items: items.map(i => ({
        ...i,
        status: i.isExempt ? 'accepted' as const : 'pending' as const,
      })),
      createdAt: now,
      reminder12hSent: false,
      reminder24hSent: false,
      forceApproveAvailableAt: now + 48 * 60 * 60 * 1000,
      autoAcceptAt: now + 72 * 60 * 60 * 1000,
    };

    setSplitProposals(prev => [...prev, proposal]);

    // Mark the request as having a split proposed
    setRequests(prev => prev.map(r =>
      r.id === requestId ? { ...r, status: 'split_proposed' } : r
    ));

    return id;
  }, []);

  const respondToSplit = useCallback((proposalId: string, userId: string, status: SplitItemStatus, counterAmount?: number, counterReason?: string) => {
    setSplitProposals(prev => prev.map(p => {
      if (p.id !== proposalId) return p;

      const updatedItems = p.items.map(item => {
        if (item.userId !== userId) return item;
        return {
          ...item,
          status,
          counterAmount: status === 'counter' ? counterAmount : undefined,
          counterReason: status === 'counter' ? counterReason : undefined,
          respondedAt: Date.now(),
        };
      });

      // Compute proposal-level status
      const nonExempt = updatedItems.filter(i => !i.isExempt);
      const allAccepted = nonExempt.every(i => i.status === 'accepted' || i.status === 'auto_accepted');
      const hasCounter = nonExempt.some(i => i.status === 'counter');
      const hasPending = nonExempt.some(i => i.status === 'pending');

      let newStatus = p.status;
      if (allAccepted) {
        newStatus = 'accepted';
        // Also approve the underlying request
        setRequests(prev2 => prev2.map(r =>
          r.id === p.contextId ? { ...r, status: 'approved' } : r
        ));
      } else if (hasCounter) {
        newStatus = 'counter_review';
      } else if (!hasPending) {
        newStatus = 'accepted'; // all decided (accepted + exempt)
      } else {
        newStatus = 'partially_accepted';
      }

      return {
        ...p,
        items: updatedItems,
        status: newStatus,
        acceptedAt: newStatus === 'accepted' ? Date.now() : undefined,
      };
    }));
  }, []);

  const adminRedistribute = useCallback((proposalId: string, updatedItems: { userId: string; newAmount: number }[]) => {
    setSplitProposals(prev => prev.map(p => {
      if (p.id !== proposalId) return p;

      const items = p.items.map(item => {
        const update = updatedItems.find(u => u.userId === item.userId);
        if (!update) return item;
        return {
          ...item,
          proposedAmount: update.newAmount,
          proposedPercent: p.totalAmount > 0 ? (update.newAmount / p.totalAmount) * 100 : 0,
          status: 'pending' as const,  // Reset to pending after redistribution
          counterAmount: undefined,
          counterReason: undefined,
          respondedAt: undefined,
        };
      });

      return { ...p, items, status: 'proposed' as const };
    }));
  }, []);

  const forceApproveProposal = useCallback((proposalId: string) => {
    setSplitProposals(prev => prev.map(p => {
      if (p.id !== proposalId) return p;

      const items = p.items.map(item => ({
        ...item,
        status: item.status === 'pending' ? 'auto_accepted' as const : item.status,
        respondedAt: item.respondedAt || Date.now(),
      }));

      // Approve the underlying request
      setRequests(prev2 => prev2.map(r =>
        r.id === p.contextId ? { ...r, status: 'approved' } : r
      ));

      return { ...p, items, status: 'accepted' as const, acceptedAt: Date.now() };
    }));
  }, []);

  const getProposalsForBrother = useCallback((userId: string) => {
    return splitProposals.filter(p =>
      p.status !== 'accepted' && p.status !== 'expired' &&
      p.items.some(i => i.userId === userId && i.status === 'pending')
    );
  }, [splitProposals]);

  const getProposalForRequest = useCallback((requestId: string) => {
    return splitProposals.find(p => p.contextId === requestId);
  }, [splitProposals]);

  // ─── Auto-accept timer (simulated) ───

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSplitProposals(prev => {
        let changed = false;
        const updated = prev.map(p => {
          if (p.status === 'accepted' || p.status === 'expired') return p;

          // Auto-accept after 72h
          if (now >= p.autoAcceptAt) {
            changed = true;
            const items = p.items.map(item => ({
              ...item,
              status: item.status === 'pending' ? 'auto_accepted' as const : item.status,
              respondedAt: item.respondedAt || now,
            }));

            setRequests(prev2 => prev2.map(r =>
              r.id === p.contextId ? { ...r, status: 'approved' } : r
            ));

            return { ...p, items, status: 'accepted' as const, acceptedAt: now };
          }

          return p;
        });
        return changed ? updated : prev;
      });
    }, 5000); // Check every 5s in demo

    return () => clearInterval(interval);
  }, []);

  const completeBrotherAudit = useCallback(() => setBrotherAuditComplete(true), []);
  const completeBrotherPayment = useCallback(() => setBrotherPaid(true), []);

  const addChatUnread = useCallback((channelId: string) => {
    setChatUnread(prev => ({ ...prev, [channelId]: (prev[channelId] || 0) + 1 }));
  }, []);

  const clearChatUnread = useCallback((channelId: string) => {
    setChatUnread(prev => ({ ...prev, [channelId]: 0 }));
  }, []);

  const hasPendingSplitForAdmin = splitProposals.some(
    p => p.status === 'counter_review'
  );

  const value: FamilyStateValue = {
    planPublished,
    publishPlan,
    requests,
    submitRequest,
    approveRequest,
    rejectRequest,
    getPendingRequests,
    // Split proposals
    splitProposals,
    proposeSplit,
    respondToSplit,
    adminRedistribute,
    forceApproveProposal,
    getProposalsForBrother,
    getProposalForRequest,
    familyMembers: DEFAULT_MEMBERS,
    // Brother
    brotherAuditComplete,
    completeBrotherAudit,
    brotherPaid,
    completeBrotherPayment,
    // Computed
    canBrotherAudit: planPublished,
    canObserverView: planPublished,
    hasPendingForAdmin: requests.some(r => r.status === 'pending'),
    hasPendingSplitForAdmin,
    chatUnread,
    addChatUnread,
    clearChatUnread,
  };

  // Expose for E2E tests
  if (typeof window !== 'undefined') {
    (window as any).__familyState__ = value;
  }

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
}
