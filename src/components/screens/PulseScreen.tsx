/**
 * PulseScreen — Real-time family activity feed
 */
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, ChartBloomIcon, SeedlingIcon, HeartLeafIcon,
  CrownFloralIcon, PersonFloralIcon, EyeLeafIcon, c,
} from '../icons/FloralIcons';

const roleIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  admin: CrownFloralIcon, mother: HeartLeafIcon, brother: PersonFloralIcon, observer: EyeLeafIcon,
};
const roleColors: Record<string, string> = { admin: c.gold, mother: c.pink, brother: c.mint, observer: c.blue };

const ACTIVITIES = [
  { id: '1', role: 'admin', text: 'Ahmed approved pharmacy request', textAr: 'أحمد وافق على طلب الصيدلية', time: '2 min ago', timeAr: 'قبل دقيقتين', group: 'Today', groupAr: 'اليوم' },
  { id: '2', role: 'mother', text: 'Mother requested 280 SAR — Groceries', textAr: 'الوالدة طلبت ٢٨٠ ر.س — بقالة', time: '15 min ago', timeAr: 'قبل ١٥ دقيقة', group: 'Today', groupAr: 'اليوم' },
  { id: '3', role: 'brother', text: 'Mohammed paid his monthly share', textAr: 'محمد دفع حصّته الشهرية', time: '1h ago', timeAr: 'قبل ساعة', group: 'Today', groupAr: 'اليوم' },
  { id: '4', role: 'admin', text: 'Monthly allowance sent — 5,300 SAR', textAr: 'تم إرسال المصروف — ٥٬٣٠٠ ر.س', time: 'Yesterday', timeAr: 'أمس', group: 'Yesterday', groupAr: 'أمس' },
  { id: '5', role: 'mother', text: 'Electricity bill paid — 320 SAR', textAr: 'انسددت فاتورة الكهرباء — ٣٢٠ ر.س', time: 'Yesterday', timeAr: 'أمس', group: 'Yesterday', groupAr: 'أمس' },
  { id: '6', role: 'observer', text: 'Sara viewed the family feed', textAr: 'سارة اطلعت على أخبار العيلة', time: '2 days ago', timeAr: 'قبل يومين', group: 'Earlier', groupAr: 'سابقاً' },
  { id: '7', role: 'admin', text: 'Support plan published for June', textAr: 'تم نشر خطة الدعم لشهر يونيو', time: '3 days ago', timeAr: 'قبل ٣ أيام', group: 'Earlier', groupAr: 'سابقاً' },
];

export default function PulseScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  const groups = [...new Set(ACTIVITIES.map(a => a.group))];

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><ChartBloomIcon size={20} /> {isAr ? 'نبض العائلة' : 'Family Pulse'}</span>
      </div>
      <div className="screen-body">
        {groups.map(group => {
          const items = ACTIVITIES.filter(a => a.group === group);
          return (
            <div key={group}>
              <p style={{ color: c.muted, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', marginTop: 16, marginBottom: 6, letterSpacing: '0.05em' }}>
                {isAr ? items[0].groupAr : group}
              </p>
              {items.map((a, i) => {
                const RoleIcon = roleIcons[a.role] || SeedlingIcon;
                return (
                  <motion.div
                    key={a.id}
                    className="card"
                    style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}
                    initial={{ opacity: 0, x: isAr ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: roleColors[a.role] + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <RoleIcon size={16} color={roleColors[a.role]} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 500, color: c.brown, fontSize: 13 }}>{isAr ? a.textAr : a.text}</p>
                      <p style={{ color: c.muted, fontSize: 11 }}>{isAr ? a.timeAr : a.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
