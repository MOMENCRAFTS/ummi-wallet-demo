/**
 * ChatRoomScreen — Message view + compose
 * Role-adaptive: Mother gets quick replies, large text
 * Observer: read-only bar
 * Admin/Brother: full compose with reply threading
 * Pre-loaded demo messages in Arabic family conversation style
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation, type AppRole } from '../../navigation';
import {
  SeedlingIcon, HeartLeafIcon, CrownFloralIcon, PersonFloralIcon,
  EyeLeafIcon, CheckLeafIcon, c,
} from '../icons/FloralIcons';

const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

interface ChatMsg {
  id: string;
  senderId: AppRole;
  senderName: string;
  senderNameAr: string;
  text: string;
  textAr: string;
  time: string;
  type: 'text' | 'dua' | 'system';
}

const ROLE_COLORS: Record<AppRole, string> = {
  admin: '#8B6914',
  mother: '#D4726A',
  brother: '#4A7C6F',
  observer: '#7B8794',
};

const ROLE_NAMES: Record<AppRole, { en: string; ar: string }> = {
  admin: { en: 'Ahmed', ar: 'أحمد' },
  mother: { en: 'Um Ahmed', ar: 'أم أحمد' },
  brother: { en: 'Mohammed', ar: 'محمد' },
  observer: { en: 'Sarah', ar: 'سارة' },
};

/* Pre-loaded messages per channel */
const CHANNEL_MESSAGES: Record<string, ChatMsg[]> = {
  family: [
    { id: '1', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: 'Good morning everyone', textAr: 'صباح الخير جميعًا', time: '9:15 AM', type: 'text' },
    { id: '2', senderId: 'mother', senderName: 'Um Ahmed', senderNameAr: 'أم أحمد', text: 'Good morning dear, may God bless you', textAr: 'صباح النور يا حبيبي، الله يبارك فيك', time: '9:18 AM', type: 'text' },
    { id: '3', senderId: 'brother', senderName: 'Mohammed', senderNameAr: 'محمد', text: 'Morning! I transferred my share yesterday', textAr: 'صباح الخير! حوّلت حصتي أمس', time: '9:22 AM', type: 'text' },
    { id: '4', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: 'Thanks Mohammed, the transfer arrived safely', textAr: 'شكرًا يا محمد، وصل التحويل بالسلامة', time: '9:23 AM', type: 'text' },
    { id: '5', senderId: 'mother', senderName: 'Um Ahmed', senderNameAr: 'أم أحمد', text: 'May Allah bless you all and grant you good health', textAr: 'الله يبارك فيكم ويعطيكم العافية', time: '9:25 AM', type: 'dua' },
    { id: '6', senderId: 'observer', senderName: 'Sarah', senderNameAr: 'سارة', text: 'Amen! I reviewed the plan, everything looks great', textAr: 'آمين! راجعت الخطة، وكل شيء مناسب', time: '9:30 AM', type: 'text' },
    { id: '7', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: "Mom, do you need anything from the pharmacy?", textAr: 'أمي، هل تحتاجين شيئًا من الصيدلية؟', time: '10:05 AM', type: 'text' },
    { id: '8', senderId: 'mother', senderName: 'Um Ahmed', senderNameAr: 'أم أحمد', text: 'Yes dear, the blood pressure medicine ran out', textAr: 'نعم يا حبيبي، نفد دواء الضغط', time: '10:08 AM', type: 'text' },
    { id: '9', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: "I'll order it now, God willing it arrives today", textAr: 'سأطلبه الآن، وإن شاء الله يصل اليوم', time: '10:09 AM', type: 'text' },
  ],
  caregivers: [
    { id: 'c1', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: 'The pharmacy bill came in — 340 SAR', textAr: 'وصلت فاتورة الصيدلية — ٣٤٠ ر.س', time: '2:00 PM', type: 'text' },
    { id: 'c2', senderId: 'brother', senderName: 'Mohammed', senderNameAr: 'محمد', text: 'Is it covered from the monthly budget?', textAr: 'هل مغطاة من الميزانية الشهرية؟', time: '2:05 PM', type: 'text' },
    { id: 'c3', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: "Yes, it's within the healthcare allocation", textAr: 'نعم، ضمن مخصص الرعاية الصحية', time: '2:06 PM', type: 'text' },
    { id: 'c4', senderId: 'brother', senderName: 'Mohammed', senderNameAr: 'محمد', text: "Good. Let me know if the maintenance company replies about the AC", textAr: 'ممتاز. أخبرني إذا ردّت شركة الصيانة بخصوص المكيف', time: '2:10 PM', type: 'text' },
  ],
  'dm-ahmed-mohammed': [
    { id: 'd1', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: 'Are you coming to visit Mom on Friday?', textAr: 'هل ستزور أمي يوم الجمعة؟', time: '8:00 PM', type: 'text' },
    { id: 'd2', senderId: 'brother', senderName: 'Mohammed', senderNameAr: 'محمد', text: "God willing, I'll bring the kids too", textAr: 'إن شاء الله، سأحضر الأولاد أيضًا', time: '8:05 PM', type: 'text' },
    { id: 'd3', senderId: 'admin', senderName: 'Ahmed', senderNameAr: 'أحمد', text: "Beautiful, she'll be so happy", textAr: 'جميل، ستفرح بكم كثيرًا', time: '8:06 PM', type: 'text' },
  ],
};

/* Quick replies for Mother */
const MOTHER_QUICK_REPLIES = [
  { text: 'Thank you dear', textAr: 'شكراً يا حبيبي' },
  { text: 'May God bless you', textAr: 'الله يعطيك العافية' },
  { text: 'All is well', textAr: 'كل شيء بخير' },
  { text: 'I need help', textAr: 'أحتاج إلى مساعدة' },
];

export default function ChatRoomScreen() {
  const { goBack, role, lang, params } = useNavigation();
  const isAr = lang === 'ar';
  const isMother = role === 'mother';
  const isObserver = role === 'observer';
  const channelId = (params?.channelId as string) || 'family';

  const [messages, setMessages] = useState<ChatMsg[]>(CHANNEL_MESSAGES[channelId] || []);
  const [inputText, setInputText] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || isObserver) return;
    const newMsg: ChatMsg = {
      id: `user-${Date.now()}`,
      senderId: role,
      senderName: ROLE_NAMES[role].en,
      senderNameAr: ROLE_NAMES[role].ar,
      text: inputText,
      textAr: inputText,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: 'text',
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate a reply after 2s
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const responders: AppRole[] = ['admin', 'mother', 'brother', 'observer'].filter(r => r !== role) as AppRole[];
      const responder = responders[Math.floor(Math.random() * responders.length)];
      const replies = isAr
        ? ['إن شاء الله', 'تمام', 'الله يبارك فيك', 'الحمد لله', 'ما شاء الله']
        : ['In sha Allah', 'OK', 'God bless you', 'Alhamdulillah', 'Ma sha Allah'];
      const reply: ChatMsg = {
        id: `reply-${Date.now()}`,
        senderId: responder,
        senderName: ROLE_NAMES[responder].en,
        senderNameAr: ROLE_NAMES[responder].ar,
        text: replies[Math.floor(Math.random() * replies.length)],
        textAr: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        type: 'text',
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleQuickReply = (text: string) => {
    setInputText('');
    const newMsg: ChatMsg = {
      id: `qr-${Date.now()}`,
      senderId: role,
      senderName: ROLE_NAMES[role].en,
      senderNameAr: ROLE_NAMES[role].ar,
      text, textAr: text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: 'text',
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const channelNames: Record<string, { en: string; ar: string }> = {
    family: { en: 'Family Chat', ar: 'محادثة العائلة' },
    caregivers: { en: 'Caregivers Only', ar: 'مجموعة الرعاية' },
    'dm-ahmed-mohammed': { en: 'Ahmed ↔ Mohammed', ar: 'أحمد ↔ محمد' },
  };
  const title = isAr ? channelNames[channelId]?.ar : channelNames[channelId]?.en;

  return (
    <div className="screen chat-room-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={goBack}>{isAr ? '→' : '←'}</button>
        <div className="chat-header-info">
          <h2 className="chat-header-title">{title}</h2>
          <span className="chat-header-members">{messages.length} {isAr ? 'رسائل' : 'messages'}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === role;
          const isSystem = msg.type === 'system';
          const isDua = msg.type === 'dua';
          const color = ROLE_COLORS[msg.senderId];
          const initial = (isAr ? msg.senderNameAr : msg.senderName).charAt(0);

          if (isSystem) {
            return (
              <div key={msg.id} className="chat-system-msg">
                <span>{isAr ? msg.textAr : msg.text}</span>
              </div>
            );
          }

          if (isDua) {
            return (
              <motion.div
                key={msg.id}
                className={`chat-dua-bubble ${isMe ? 'me' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <SeedlingIcon size={18} color={c.gold} />
                <span className="chat-dua-text">{isAr ? msg.textAr : msg.text}</span>
                <span className="chat-msg-time">{msg.time}</span>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              className={`chat-msg-row ${isMe ? 'me' : 'other'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {!isMe && (
                <div className="chat-avatar" style={{ background: color + '20', borderColor: color + '40' }}>
                  <span style={{ color }}>{initial}</span>
                </div>
              )}
              <div className={`chat-bubble ${isMe ? 'me' : 'other'} ${isMother ? 'mother' : ''}`}>
                {!isMe && (
                  <span className="chat-sender" style={{ color }}>{isAr ? msg.senderNameAr : msg.senderName}</span>
                )}
                <span className={`chat-text ${isMother ? 'mother' : ''}`}>{isAr ? msg.textAr : msg.text}</span>
                <span className="chat-msg-time">{msg.time}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {showTyping && (
          <motion.div className="chat-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="chat-typing-dots">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="chat-typing-dot"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            <span>{isAr ? 'يكتب...' : 'typing...'}</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Mother quick replies */}
      {isMother && !isObserver && (
        <div className="chat-quick-replies">
          {MOTHER_QUICK_REPLIES.map((qr, i) => (
            <button
              key={i}
              className="chat-quick-reply-btn"
              onClick={() => handleQuickReply(isAr ? qr.textAr : qr.text)}
            >
              {isAr ? qr.textAr : qr.text}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      {!isObserver ? (
        <div className={`chat-input-bar ${isMother ? 'mother' : ''}`}>
          <input
            className={`chat-input ${isMother ? 'mother' : ''}`}
            type="text"
            placeholder={isAr ? 'اكتب رسالة...' : 'Type a message...'}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            dir={isAr ? 'rtl' : 'ltr'}
          />
          <button
            className={`chat-send-btn ${!inputText.trim() ? 'disabled' : ''}`}
            onClick={handleSend}
            disabled={!inputText.trim()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ transform: isAr ? 'scaleX(-1)' : undefined }}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      ) : (
        <div className="chat-observer-bar">
          <EyeLeafIcon size={14} color={c.muted} />
          <span>{isAr ? 'وضع العرض فقط — لا يمكنك إرسال الرسائل' : 'View only — you cannot send messages'}</span>
        </div>
      )}
    </div>
  );
}
