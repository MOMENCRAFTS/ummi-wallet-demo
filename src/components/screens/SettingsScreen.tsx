/**
 * SettingsScreen — Full settings with all sections matching real app
 * Family members, transfer admin, bank details, language, notifications,
 * barakah prefs, about/legal, delete account, logout
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../navigation';
import { useFamilyState } from '../../familyState';
import {
  ArrowLeafIcon, SettingsGearIcon, PersonFloralIcon, CrownFloralIcon,
  MoneyLeafIcon, GlobeFlowerIcon, BellBlossomIcon, ShieldLeafIcon,
  HeartLeafIcon, SeedlingIcon, DocumentLeafIcon, CheckLeafIcon,
  c,
} from '../icons/FloralIcons';

const MEMBERS = [
  { id: 'admin', name: 'Ahmed', nameAr: 'أحمد', role: 'lead_caregiver', phone: '+966 5XX•••12', authLinked: true },
  { id: 'brother1', name: 'Mohammed', nameAr: 'محمد', role: 'caregiver', phone: '+966 5XX•••34', authLinked: true },
  { id: 'brother2', name: 'Khalid', nameAr: 'خالد', role: 'caregiver', phone: '+966 5XX•••56', authLinked: false },
  { id: 'observer1', name: 'Sarah', nameAr: 'سارة', role: 'observer', phone: '+966 5XX•••78', authLinked: false },
];

const ROLE_CONFIG: Record<string, { label: string; labelAr: string; color: string }> = {
  lead_caregiver: { label: 'Admin', labelAr: 'المسؤول', color: '#D4A017' },
  caregiver: { label: 'Contributor', labelAr: 'مساهم', color: '#4CAF50' },
  mother: { label: 'Mother', labelAr: 'الوالدة', color: '#E91E63' },
  observer: { label: 'Observer', labelAr: 'متابع', color: '#2196F3' },
};

export default function SettingsScreen() {
  const { goBack, lang, navigate, setLang } = useNavigation();
  const isAr = lang === 'ar';
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [transferTarget, setTransferTarget] = useState<string | null>(null);
  const [pendingTransfer, setPendingTransfer] = useState(false);
  const [notifs, setNotifs] = useState({ bills: true, payroll: true, sos: true, feed: true, celebrations: true });
  const [barakahPrefs, setBarakahPrefs] = useState({ daily: true, contextual: true, friday: true });
  const [musicOn, setMusicOn] = useState(true);
  const [ibanEditing, setIbanEditing] = useState(false);
  const [iban, setIban] = useState('SA00 0000 0000 0000 0000 0090');
  const [bankName, setBankName] = useState(isAr ? 'بنك الراجحي' : 'Al Rajhi Bank');

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
        background: on ? c.mint : c.divider, position: 'relative', transition: 'background 0.2s',
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: 9, background: '#fff',
        position: 'absolute', top: 2, left: on ? 20 : 2, transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><SettingsGearIcon size={20} /> {isAr ? 'الإعدادات' : 'Settings'}</span>
      </div>
      <div className="screen-body">

        {/* ═══ Family Members ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <PersonFloralIcon size={16} /> {isAr ? 'أعضاء العائلة' : 'Family Members'}
          </h3>
          {MEMBERS.map((m, i) => {
            const rc = ROLE_CONFIG[m.role] || ROLE_CONFIG.caregiver;
            return (
              <motion.div key={m.id} className="card" style={{ marginBottom: 8, padding: 12 }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.brown }}>{isAr ? m.nameAr : m.name}</span>
                    <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{m.phone}</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: rc.color, background: rc.color + '18', padding: '2px 8px', borderRadius: 10 }}>
                    {isAr ? rc.labelAr : rc.label}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: m.authLinked ? c.success : c.peach, display: 'flex', alignItems: 'center', gap: 3 }}>
                    {m.authLinked ? <><CheckLeafIcon size={10} color={c.success} /> {isAr ? 'مرتبط' : 'Linked'}</> : <>{isAr ? 'بانتظار التسجيل' : 'Pending Login'}</>}
                  </span>
                  {!m.authLinked && (
                    <button className="btn btn-sm" style={{ fontSize: 10, color: c.blue, background: c.blue + '12', border: `1px solid ${c.blue}30`, borderRadius: 12, padding: '2px 8px' }}>
                      📨 {isAr ? 'إرسال دعوة' : 'Re-send invite'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          <button className="btn btn-glass btn-sm btn-full" style={{ marginBottom: 16 }} onClick={() => navigate('invite-caregiver')}>
            + {isAr ? 'دعوة عضو جديد' : 'Invite Member'}
          </button>
        </motion.div>

        {/* ═══ Transfer Admin ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CrownFloralIcon size={16} /> {isAr ? 'نقل صلاحية الأدمن' : 'Transfer Admin Rights'}
          </h3>
          <div className="card" style={{ padding: 14, marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: c.muted, marginBottom: 10, lineHeight: 1.6 }}>
              {isAr ? 'انقل صلاحية الأدمن لعضو آخر. يحتاج العضو الموافقة قبل التفعيل.' : 'Transfer admin role to another member. They must approve before it takes effect.'}
            </p>
            {pendingTransfer ? (
              <div style={{ textAlign: 'center', padding: 8, background: c.gold + '10', borderRadius: 10, border: `1px solid ${c.gold}30` }}>
                <span style={{ fontSize: 12, color: c.gold, fontWeight: 600 }}>⏳ {isAr ? 'بانتظار الموافقة' : 'Awaiting approval'}</span>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {MEMBERS.filter(m => m.role === 'caregiver').map(m => (
                  <button key={m.id} className="btn btn-glass btn-sm" onClick={() => { setTransferTarget(m.id); setPendingTransfer(true); }}>
                    <PersonFloralIcon size={12} /> {isAr ? m.nameAr : m.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ═══ Bank Details ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MoneyLeafIcon size={16} /> {isAr ? 'بيانات البنك' : 'Bank Details'}
          </h3>
          <div className="card" style={{ padding: 14, marginBottom: 16 }}>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: c.muted, display: 'block', marginBottom: 4 }}>IBAN</label>
              <input type="text" className="input" value={iban} onChange={e => setIban(e.target.value)} style={{ fontSize: 12, fontFamily: 'monospace' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: c.muted, display: 'block', marginBottom: 4 }}>{isAr ? 'اسم البنك' : 'Bank Name'}</label>
              <input type="text" className="input" value={bankName} onChange={e => setBankName(e.target.value)} style={{ fontSize: 12 }} />
            </div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>{isAr ? 'حفظ' : 'Save'}</button>
          </div>
        </motion.div>

        {/* ═══ Language ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <GlobeFlowerIcon size={16} /> {isAr ? 'اللغة' : 'Language'}
          </h3>
          <div className="card" style={{ padding: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn btn-sm ${lang === 'ar' ? 'btn-primary' : 'btn-glass'}`} onClick={() => setLang('ar')}>العربية</button>
              <button className={`btn btn-sm ${lang === 'en' ? 'btn-primary' : 'btn-glass'}`} onClick={() => setLang('en')}>English</button>
            </div>
          </div>
        </motion.div>

        {/* ═══ Notifications ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BellBlossomIcon size={16} /> {isAr ? 'الإشعارات' : 'Notifications'}
          </h3>
          <div className="card" style={{ padding: 14, marginBottom: 16 }}>
            {([
              { key: 'bills' as const, label: 'Bills & Payments', labelAr: 'الفواتير والمدفوعات' },
              { key: 'payroll' as const, label: 'Payroll Reminders', labelAr: 'تذكير الرواتب' },
              { key: 'sos' as const, label: 'SOS Alerts', labelAr: 'تنبيهات الطوارئ' },
              { key: 'feed' as const, label: 'Family Feed', labelAr: 'تحديثات العائلة' },
              { key: 'celebrations' as const, label: 'Celebrations', labelAr: 'المناسبات' },
            ]).map(n => (
              <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: 8, borderBottom: `1px solid ${c.divider}10` }}>
                <span style={{ fontSize: 12, color: c.brown }}>{isAr ? n.labelAr : n.label}</span>
                <Toggle on={notifs[n.key]} onToggle={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Background Music ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="card" style={{ padding: 14, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🎵</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: c.brown }}>{isAr ? 'الموسيقى المحيطة' : 'Background Music'}</span>
            </div>
            <Toggle on={musicOn} onToggle={() => setMusicOn(!musicOn)} />
          </div>
        </motion.div>

        {/* ═══ Barakah Preferences ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SeedlingIcon size={16} /> {isAr ? 'تفضيلات البركة' : 'Barakah Preferences'}
          </h3>
          <div className="card" style={{ padding: 14, marginBottom: 16 }}>
            {([
              { key: 'daily' as const, label: 'Daily Barakah Card', labelAr: 'بطاقة البركة اليومية' },
              { key: 'contextual' as const, label: 'Contextual Duas', labelAr: 'أدعية سياقية' },
              { key: 'friday' as const, label: 'Friday Notification', labelAr: 'إشعار يوم الجمعة' },
            ]).map(p => (
              <div key={p.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: 8, borderBottom: `1px solid ${c.divider}10` }}>
                <span style={{ fontSize: 12, color: c.brown }}>{isAr ? p.labelAr : p.label}</span>
                <Toggle on={barakahPrefs[p.key]} onToggle={() => setBarakahPrefs(prev => ({ ...prev, [p.key]: !prev[p.key] }))} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ About / Legal ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="card" style={{ padding: 14, marginBottom: 16 }}>
            <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start', gap: 8, marginBottom: 6 }} onClick={() => navigate('legal')}>
              <DocumentLeafIcon size={14} /> {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start', gap: 8 }} onClick={() => navigate('legal')}>
              <ShieldLeafIcon size={14} /> {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
            </button>
            <div style={{ fontSize: 10, color: c.muted, textAlign: 'center', marginTop: 10 }}>MomenCrafts v1.0 — Ummi Wallet 🌸</div>
          </div>
        </motion.div>

        {/* ═══ Delete Account ═══ */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <div className="card" style={{ padding: 14, marginBottom: 12, border: `1px solid ${c.emergency}20` }}>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: c.emergency, marginBottom: 6 }}>{isAr ? 'حذف الحساب' : 'Delete Account'}</h4>
            <p style={{ fontSize: 11, color: c.muted, marginBottom: 10, lineHeight: 1.6 }}>
              {isAr ? 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك نهائيًا.' : 'This action is irreversible. All your data will be permanently deleted.'}
            </p>
            <button className="btn btn-sm" style={{ color: c.emergency, border: `1px solid ${c.emergency}40`, borderRadius: 8, padding: '6px 12px' }} onClick={() => setShowDeleteModal(true)}>
              {isAr ? 'حذف حسابي' : 'Delete My Account'}
            </button>
          </div>
        </motion.div>

        {/* ═══ Logout ═══ */}
        <motion.button
          className="btn btn-glass btn-md btn-full"
          style={{ marginTop: 8, marginBottom: 20, color: c.emergency, borderColor: c.emergency }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('landing')}
        >
          {isAr ? 'تسجيل الخروج' : 'Logout'}
        </motion.button>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className="card"
              style={{ padding: 20, maxWidth: 320, width: '100%' }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, color: c.emergency, marginBottom: 10 }}>
                {isAr ? '⚠️ تأكيد الحذف' : '⚠️ Confirm Deletion'}
              </h3>
              <p style={{ fontSize: 12, color: c.muted, lineHeight: 1.6, marginBottom: 12 }}>
                {isAr ? 'اكتب "حذف" لتأكيد حذف حسابك نهائيًا' : 'Type "DELETE" to confirm permanent account deletion'}
              </p>
              <input
                type="text"
                className="input"
                placeholder={isAr ? 'حذف' : 'DELETE'}
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                style={{ marginBottom: 12, textAlign: 'center', fontSize: 14, fontWeight: 600 }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-glass btn-sm" style={{ flex: 1 }} onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); }}>
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  className="btn btn-sm"
                  style={{ flex: 1, background: c.emergency, color: '#fff', border: 'none', opacity: (deleteConfirm === 'DELETE' || deleteConfirm === 'حذف') ? 1 : 0.4 }}
                  disabled={deleteConfirm !== 'DELETE' && deleteConfirm !== 'حذف'}
                  onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); navigate('landing'); }}
                >
                  {isAr ? 'حذف نهائي' : 'Delete Forever'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
