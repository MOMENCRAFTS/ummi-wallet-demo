/**
 * InviteCaregiverScreen — Add new family member
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { ArrowLeafIcon, PersonFloralIcon, CheckLeafIcon, c } from '../icons/FloralIcons';

export default function InviteCaregiverScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'caregiver' | 'observer'>('caregiver');
  const [sent, setSent] = useState(false);

  const handleInvite = () => {
    if (!name.trim() || !phone.trim()) return;
    setSent(true);
  };

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><PersonFloralIcon size={20} /> {isAr ? 'دعوة عضو جديد' : 'Invite Member'}</span>
      </div>
      <div className="screen-body">
        {sent ? (
          <motion.div style={{ textAlign: 'center', padding: 40 }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckLeafIcon size={48} color={c.success} />
            <h3 style={{ color: c.brown, marginTop: 12 }}>{isAr ? 'تم إرسال الدعوة!' : 'Invite Sent!'}</h3>
            <p style={{ color: c.muted, fontSize: 13, marginTop: 4 }}>{isAr ? `تم إرسال رسالة SMS لـ ${name}` : `SMS sent to ${name}`}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center' }}>
              <button className="btn btn-glass btn-md" onClick={() => { setSent(false); setName(''); setPhone(''); setEmail(''); }}>{isAr ? 'دعوة آخر' : 'Invite Another'}</button>
              <button className="btn btn-primary btn-md" onClick={goBack}>{isAr ? 'رجوع' : 'Done'}</button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Role Picker */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {(['caregiver', 'observer'] as const).map(r => (
                <motion.button
                  key={r}
                  className={`card ${role === r ? '' : ''}`}
                  style={{
                    flex: 1, textAlign: 'center', padding: 14, cursor: 'pointer',
                    border: role === r ? `2px solid ${c.mint}` : `1px solid ${c.divider}`,
                    background: role === r ? c.mint + '10' : 'transparent',
                  }}
                  onClick={() => setRole(r)}
                  whileTap={{ scale: 0.97 }}
                >
                  <div style={{ fontSize: 24 }}>{r === 'caregiver' ? '👨‍👦' : '👁️'}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: c.brown, marginTop: 4 }}>
                    {r === 'caregiver' ? (isAr ? 'مساهم' : 'Contributor') : (isAr ? 'متابع' : 'Observer')}
                  </div>
                  <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>
                    {r === 'caregiver' ? (isAr ? 'يساهم ماليًا' : 'Contributes financially') : (isAr ? 'يتابع فقط' : 'View-only access')}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Form */}
            <motion.div className="card" style={{ padding: 16 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: c.muted, display: 'block', marginBottom: 4 }}>{isAr ? 'الاسم' : 'Name'} *</label>
                <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder={isAr ? 'اسم العضو' : 'Member name'} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: c.muted, display: 'block', marginBottom: 4 }}>{isAr ? 'رقم الجوال' : 'Phone'} *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, color: c.muted, fontWeight: 600, padding: '6px 8px', background: c.peachLight, borderRadius: 8 }}>+966</span>
                  <input type="tel" className="input" style={{ flex: 1 }} value={phone} onChange={e => setPhone(e.target.value)} placeholder="5XX XXX XXXX" maxLength={12} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: c.muted, display: 'block', marginBottom: 4 }}>{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="brother@email.com" />
              </div>
            </motion.div>

            <motion.button
              className="btn btn-primary btn-md btn-full glow-mint"
              style={{ marginTop: 16, opacity: (!name.trim() || !phone.trim()) ? 0.5 : 1 }}
              onClick={handleInvite}
              disabled={!name.trim() || !phone.trim()}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              📨 {isAr ? 'إرسال دعوة SMS' : 'Send SMS Invite'}
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
