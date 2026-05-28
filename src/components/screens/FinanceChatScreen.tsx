/**
 * FinanceChatScreen — AI Chat simulation with typewriter effect
 * Zero emoji — WalletRoseIcon as chat avatar
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, WalletRoseIcon, ChatBubbleLeafIcon,
  CheckLeafIcon, ChartBloomIcon, MoneyLeafIcon,
} from '../icons/FloralIcons';

interface ChatMsg {
  id: number;
  role: 'ai' | 'admin';
  text: string;
  type?: 'text' | 'chips' | 'input';
}

const CHAT_SCRIPT: ChatMsg[] = [
  { id: 1, role: 'ai', text: "أهلاً! أنا مساعد أمي الذكي\n\nMother shared her monthly needs. Let me help you build a detailed plan." },
  { id: 2, role: 'ai', text: "She mentioned she needs about 5,000 SAR/month. Let's start with her personal allowance:", type: 'input' },
  { id: 3, role: 'admin', text: '1,200 SAR — Personal allowance' },
  { id: 4, role: 'ai', text: "Personal allowance: 1,200 SAR — recorded.\n\nNow, she has a maid. What's the monthly salary?" },
  { id: 5, role: 'admin', text: '1,500 SAR — Maid salary' },
  { id: 6, role: 'ai', text: 'Great! And the driver salary?' },
  { id: 7, role: 'admin', text: '1,800 SAR — Driver salary' },
  { id: 8, role: 'ai', text: "Running total: 4,500 SAR\n\nLet me check the bills — electricity, water, internet. What's the average monthly?" },
  { id: 9, role: 'admin', text: '800 SAR — Utilities total' },
  { id: 10, role: 'ai', text: "Analysis complete!\n\nBudget Health: 7.5/10\nNeeds: 72% | Wants: 18% | Safety: 10%\n\nGood balance. Ready to review?" },
];

export default function FinanceChatScreen() {
  const { navigate, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [visibleMsgs, setVisibleMsgs] = useState<ChatMsg[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const total = [0, 0, 0, 1200, 1200, 2700, 2700, 4500, 4500, 5300, 5300];

  useEffect(() => {
    if (msgIndex >= CHAT_SCRIPT.length) return;

    const msg = CHAT_SCRIPT[msgIndex];
    const delay = msg.role === 'ai' ? 1200 : 600;

    setShowTyping(msg.role === 'ai');
    const timer = setTimeout(() => {
      setShowTyping(false);
      setVisibleMsgs(prev => [...prev, msg]);
      setMsgIndex(prev => prev + 1);
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, delay);

    return () => clearTimeout(timer);
  }, [msgIndex]);

  return (
    <div className="screen finance-chat" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ChatBubbleLeafIcon size={20} /> {isAr ? 'إعداد ذكي' : 'AI Setup'}
        </span>
      </div>

      <div className="chat-scroll" ref={scrollRef}>
        <AnimatePresence>
          {visibleMsgs.map(msg => (
            <motion.div
              key={msg.id}
              className={`chat-bubble ${msg.role}`}
              initial={{ opacity: 0, y: 15, x: msg.role === 'admin' ? 20 : -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {msg.role === 'ai' && (
                <span className="chat-avatar-svg"><WalletRoseIcon size={22} /></span>
              )}
              <div className="chat-content">
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {showTyping && (
          <div className="chat-bubble ai typing">
            <span className="chat-avatar-svg"><WalletRoseIcon size={22} /></span>
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {/* Running total */}
      <motion.div
        className="running-total"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="running-total-inner">
          <span className="running-label">Running Total</span>
          <span className="running-amount">{(total[visibleMsgs.length] || 0).toLocaleString()} SAR</span>
        </div>
        {msgIndex >= CHAT_SCRIPT.length && (
          <button className="btn btn-primary btn-sm" onClick={() => navigate('finance-summary')}>
            <ChartBloomIcon size={16} /> View Summary
          </button>
        )}
      </motion.div>
    </div>
  );
}
