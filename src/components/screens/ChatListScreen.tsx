/**
 * ChatListScreen — Role-adaptive channel list
 * Family chat, caregivers-only, direct messages
 * Mother: large text, fewer channels
 * Observer: read-only badge
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { useFamilyState } from '../../familyState';
import {
  SeedlingIcon, HeartLeafIcon, CrownFloralIcon, PersonFloralIcon,
  EyeLeafIcon, ShieldLeafIcon, c,
} from '../icons/FloralIcons';

const spring = { type: 'spring' as const, stiffness: 260, damping: 20 };

interface ChatChannel {
  id: string;
  name: string;
  nameAr: string;
  type: 'family' | 'caregivers' | 'direct';
  icon: React.ComponentType<{ size?: number; color?: string }>;
  lastMessage: string;
  lastMessageAr: string;
  lastSender: string;
  lastSenderAr: string;
  time: string;
  motherVisible: boolean;
}

const CHANNELS: ChatChannel[] = [
  {
    id: 'family',
    name: 'Family Chat',
    nameAr: 'محادثة العائلة',
    type: 'family',
    icon: SeedlingIcon,
    lastMessage: 'May Allah bless our mother',
    lastMessageAr: 'الله يبارك في أمنا',
    lastSender: 'Mohammed',
    lastSenderAr: 'محمد',
    time: '2m',
    motherVisible: true,
  },
  {
    id: 'caregivers',
    name: 'Caregivers Only',
    nameAr: 'مجموعة الرعاية',
    type: 'caregivers',
    icon: ShieldLeafIcon,
    lastMessage: 'The pharmacy bill came in',
    lastMessageAr: 'فاتورة الصيدلية وصلت',
    lastSender: 'Ahmed',
    lastSenderAr: 'أحمد',
    time: '15m',
    motherVisible: false,
  },
  {
    id: 'dm-ahmed-mohammed',
    name: 'Ahmed ↔ Mohammed',
    nameAr: 'أحمد ↔ محمد',
    type: 'direct',
    icon: PersonFloralIcon,
    lastMessage: "I'll transfer tomorrow",
    lastMessageAr: 'سأحوّل غدًا',
    lastSender: 'Mohammed',
    lastSenderAr: 'محمد',
    time: '1h',
    motherVisible: false,
  },
];

export default function ChatListScreen() {
  const { navigate, goBack, role, lang } = useNavigation();
  const { chatUnread, clearChatUnread } = useFamilyState();
  const isAr = lang === 'ar';
  const isMother = role === 'mother';
  const isObserver = role === 'observer';

  // Filter channels based on role
  const visibleChannels = CHANNELS.filter(ch => {
    if (isMother) return ch.motherVisible;
    return true;
  });

  const totalUnread = Object.values(chatUnread).reduce((a, b) => a + b, 0);

  const handleOpenChannel = (channelId: string) => {
    clearChatUnread(channelId);
    navigate('chat-room', { channelId });
  };

  return (
    <div className="screen chat-list-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={goBack}>
          {isAr ? '→' : '←'}
        </button>
        <div className="chat-header-info">
          <h2 className="chat-header-title">{isAr ? 'محادثات العائلة' : 'Family Chat'}</h2>
          {totalUnread > 0 && (
            <span className="chat-header-badge">{totalUnread}</span>
          )}
        </div>
      </div>

      {/* Channel list */}
      <div className="chat-channel-list">
        {visibleChannels.map((ch, i) => {
          const unread = chatUnread[ch.id] || 0;
          const IconComp = ch.icon;

          return (
            <motion.button
              key={ch.id}
              className={`chat-channel-card ${unread > 0 ? 'unread' : ''} ${isMother ? 'mother' : ''}`}
              onClick={() => handleOpenChannel(ch.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ...spring }}
            >
              <div className={`chat-channel-icon ${isMother ? 'mother' : ''}`}>
                <IconComp size={isMother ? 26 : 20} />
              </div>

              <div className="chat-channel-body">
                <div className="chat-channel-name-row">
                  <span className={`chat-channel-name ${isMother ? 'mother' : ''}`}>
                    {isAr ? ch.nameAr : ch.name}
                  </span>
                  {!ch.motherVisible && !isMother && (
                    <ShieldLeafIcon size={12} color={c.gold} />
                  )}
                </div>
                <span className="chat-channel-preview">
                  {isAr ? `${ch.lastSenderAr}: ${ch.lastMessageAr}` : `${ch.lastSender}: ${ch.lastMessage}`}
                </span>
              </div>

              <div className="chat-channel-meta">
                <span className="chat-channel-time">{ch.time}</span>
                {unread > 0 && (
                  <span className={`chat-unread-badge ${isMother ? 'mother' : ''}`}>{unread}</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Observer notice */}
      {isObserver && (
        <div className="chat-observer-notice">
          <EyeLeafIcon size={14} color={c.muted} />
          <span>{isAr ? 'وضع العرض فقط — لا يمكنك إرسال الرسائل' : 'View only — you cannot send messages'}</span>
        </div>
      )}

      {/* Live indicator */}
      <div className="chat-live-row">
        <div className="chat-live-dot" />
        <span>{isAr ? 'مباشر' : 'Live'}</span>
      </div>
    </div>
  );
}
