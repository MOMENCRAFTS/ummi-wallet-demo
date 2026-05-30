/**
 * BrotherSuggestionsScreen — Family ideas board
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, LightbulbPetalIcon, HeartLeafIcon, c } from '../icons/FloralIcons';

const IDEAS = [
  { id: '1', text: 'Start a family investment fund', textAr: 'بدء صندوق استثمار عائلي', author: 'Mohammed', authorAr: 'محمد', votes: 3 },
  { id: '2', text: 'Monthly family dinner rotation', textAr: 'عشاء عائلي شهري بالدور', author: 'Sara', authorAr: 'سارة', votes: 5 },
  { id: '3', text: 'Summer Umrah trip for mother', textAr: 'رحلة عمرة صيفية للوالدة', author: 'Khalid', authorAr: 'خالد', votes: 7 },
];

export default function BrotherSuggestionsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [voted, setVoted] = useState<Set<string>>(new Set());

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header"><button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button><span className="header-title"><LightbulbPetalIcon size={20} /> {isAr ? 'الاقتراحات' : 'Suggestions'}</span></div>
      <div className="screen-body">
        {IDEAS.map((idea, i) => (
          <motion.div key={idea.id} className="card" style={{ marginBottom: 8 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <p style={{ fontWeight: 600, color: c.brown, fontSize: 14 }}>{isAr ? idea.textAr : idea.text}</p>
            <p style={{ color: c.muted, fontSize: 11, marginTop: 4 }}>{isAr ? idea.authorAr : idea.author}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <motion.button
                className={`btn btn-sm ${voted.has(idea.id) ? 'btn-primary' : 'btn-glass'}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVoted(prev => { const n = new Set(prev); n.has(idea.id) ? n.delete(idea.id) : n.add(idea.id); return n; })}
              >
                <HeartLeafIcon size={14} color={voted.has(idea.id) ? '#fff' : c.pink} /> {voted.has(idea.id) ? (isAr ? 'أعجبك' : 'Liked') : (isAr ? 'إعجاب' : 'Like')}
              </motion.button>
              <span style={{ color: c.muted, fontSize: 12 }}>{idea.votes + (voted.has(idea.id) ? 1 : 0)} {isAr ? 'إعجابات' : 'likes'}</span>
            </div>
          </motion.div>
        ))}
        <motion.button className="btn btn-primary btn-md btn-full" style={{ marginTop: 16 }} whileTap={{ scale: 0.97 }}>
          <LightbulbPetalIcon size={16} color="#fff" /> {isAr ? 'إضافة فكرة' : 'Add Idea'}
        </motion.button>
      </div>
    </div>
  );
}
