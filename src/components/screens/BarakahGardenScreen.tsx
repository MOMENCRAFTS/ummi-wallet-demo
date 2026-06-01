/**
 * BarakahGardenScreen — Islamic garden with daily cards, seeds & growth
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, SeedlingIcon, HeartLeafIcon, TulipIcon, SparkleAccent, c,
} from '../icons/FloralIcons';

const BARAKAH_CARDS = [
  { ar: 'من أحبّ أن يُبسط له في رزقه فليصل رحمه', en: '"Whoever loves that his provision be expanded, let him maintain ties of kinship." — Sahih Bukhari', type: 'hadith' },
  { ar: 'ما نقص مال من صدقة', en: '"Wealth does not decrease from charity." — Sahih Muslim', type: 'hadith' },
  { ar: 'اللهم بارك لأمي في صحتها ورزقها', en: '"O Allah, bless my mother in her health and provision."', type: 'dua' },
  { ar: 'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حُسْنًا', en: '"And We have enjoined upon man goodness to parents." — Al-Ankabut 29:8', type: 'quran' },
  { ar: 'رضا الرب في رضا الوالدين', en: '"The Lord\'s pleasure is in the parents\' pleasure." — Tirmidhi', type: 'hadith' },
  { ar: 'اللهم ارحم والديّ كما ربّياني صغيرا', en: '"My Lord, have mercy upon them as they brought me up when I was small."', type: 'dua' },
  { ar: 'الجنة تحت أقدام الأمهات', en: '"Paradise lies beneath the feet of mothers." — Nasa\'i', type: 'hadith' },
  { ar: 'وَبِالْوَالِدَيْنِ إِحْسَانًا', en: '"And to parents, do good." — Al-Isra 17:23', type: 'quran' },
  { ar: 'خيركم خيركم لأهله', en: '"The best of you is the best to his family." — Tirmidhi', type: 'hadith' },
  { ar: 'اللهم اجعل هذا المال بركة على عائلتنا', en: '"O Allah, make this wealth a blessing for our family."', type: 'dua' },
  { ar: 'إنّ الله يحب إذا عمل أحدكم عملاً أن يتقنه', en: '"Allah loves that when you do work, you perfect it." — Bayhaqi', type: 'hadith' },
  { ar: 'تبسّمك في وجه أخيك صدقة', en: '"Your smile in the face of your brother is charity." — Tirmidhi', type: 'hadith' },
];

const SEEDS = [
  { id: 1, name: 'Birr', nameAr: 'البرّ', stage: 3 },
  { id: 2, name: 'Tawakkul', nameAr: 'التوكل', stage: 2 },
  { id: 3, name: 'Shukr', nameAr: 'الشكر', stage: 3 },
  { id: 4, name: 'Sabr', nameAr: 'الصبر', stage: 1 },
  { id: 5, name: 'Ihsan', nameAr: 'الإحسان', stage: 2 },
  { id: 6, name: 'Silah', nameAr: 'صلة الرحم', stage: 3 },
];

const STAGE_EMOJI = ['🌱', '🌿', '🌸', '🌺'];
const STAGE_LABELS = { en: ['Seed', 'Sprout', 'Bloom', 'Flower'], ar: ['بذرة', 'نبتة', 'إزهار', 'زهرة'] };

const TYPE_BADGES: Record<string, { label: string; labelAr: string; color: string }> = {
  hadith: { label: 'Hadith', labelAr: 'حديث', color: c.mint },
  dua: { label: 'Du\'a', labelAr: 'دعاء', color: c.peach },
  quran: { label: 'Qur\'an', labelAr: 'قرآن', color: c.gold },
};

export default function BarakahGardenScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [seeds, setSeeds] = useState(SEEDS);
  const [cardIndex, setCardIndex] = useState(new Date().getDate() % BARAKAH_CARDS.length);
  const [watered, setWatered] = useState<number | null>(null);

  const card = BARAKAH_CARDS[cardIndex];
  const badge = TYPE_BADGES[card.type];
  const streak = 7; // Mock streak
  const totalBlooms = seeds.filter(s => s.stage >= 3).length;

  const waterSeed = (id: number) => {
    setWatered(id);
    setSeeds(prev => prev.map(s => s.id === id ? { ...s, stage: Math.min(s.stage + 1, 3) } : s));
    setTimeout(() => setWatered(null), 1200);
  };

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><SeedlingIcon size={20} /> {isAr ? 'حديقة البركة' : 'Barakah Garden'}</span>
      </div>
      <div className="screen-body">

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <motion.div className="card" style={{ flex: 1, textAlign: 'center', padding: 12 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: c.mint }}>🔥 {streak}</span>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{isAr ? 'أيام متتالية' : 'Day Streak'}</div>
          </motion.div>
          <motion.div className="card" style={{ flex: 1, textAlign: 'center', padding: 12 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: c.peach }}>🌺 {totalBlooms}</span>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{isAr ? 'أزهار' : 'Blooms'}</div>
          </motion.div>
          <motion.div className="card" style={{ flex: 1, textAlign: 'center', padding: 12 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: c.gold }}>{seeds.length}</span>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{isAr ? 'بذور' : 'Seeds'}</div>
          </motion.div>
        </div>

        {/* Daily Card */}
        <motion.div
          className="card glass barakah-card"
          style={{ position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="barakah-header">
              <HeartLeafIcon size={18} />
              <span className="barakah-label">{isAr ? 'بركة اليوم' : 'TODAY\'S BARAKAH'}</span>
            </div>
            <span className="badge" style={{ background: badge.color + '20', color: badge.color, fontSize: 10, padding: '2px 8px' }}>
              {isAr ? badge.labelAr : badge.label}
            </span>
          </div>
          <p className="barakah-text" style={{ fontSize: 14, lineHeight: 1.8 }}>{isAr ? card.ar : card.en}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button className="btn btn-glass btn-sm" onClick={() => setCardIndex((cardIndex + BARAKAH_CARDS.length - 1) % BARAKAH_CARDS.length)}>
              {isAr ? '→' : '←'}
            </button>
            <button className="btn btn-glass btn-sm" onClick={() => setCardIndex((cardIndex + 1) % BARAKAH_CARDS.length)}>
              {isAr ? '←' : '→'}
            </button>
          </div>
        </motion.div>

        {/* Seed Garden */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="section-title" style={{ marginTop: 20 }}>{isAr ? 'بذور الخير' : 'Seeds of Good'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {seeds.map((seed, i) => (
              <motion.div
                key={seed.id}
                className="card"
                style={{
                  textAlign: 'center', padding: 14, cursor: 'pointer',
                  border: watered === seed.id ? `2px solid ${c.mint}` : undefined,
                  background: watered === seed.id ? c.mint + '10' : undefined,
                }}
                onClick={() => waterSeed(seed.id)}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.04 }}
              >
                <motion.div
                  style={{ fontSize: 32 }}
                  animate={watered === seed.id ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {STAGE_EMOJI[seed.stage]}
                </motion.div>
                <div style={{ fontSize: 11, fontWeight: 600, color: c.brown, marginTop: 4 }}>
                  {isAr ? seed.nameAr : seed.name}
                </div>
                <div style={{ fontSize: 9, color: c.muted, marginTop: 2 }}>
                  {isAr ? STAGE_LABELS.ar[seed.stage] : STAGE_LABELS.en[seed.stage]}
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: c.muted, textAlign: 'center', marginTop: 10 }}>
            {isAr ? 'اضغط على بذرة لسقيها 💧' : 'Tap a seed to water it 💧'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
