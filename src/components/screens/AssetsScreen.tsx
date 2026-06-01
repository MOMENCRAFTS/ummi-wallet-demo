/**
 * AssetsScreen — Cars, Properties, Household asset management
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../navigation';
import {
  ArrowLeafIcon, SunflowerHomeIcon, ShieldLeafIcon, WrenchVineIcon, c,
} from '../icons/FloralIcons';

type AssetCategory = 'cars' | 'properties' | 'household';
const TABS: { key: AssetCategory; label: string; labelAr: string }[] = [
  { key: 'cars', label: 'Cars', labelAr: 'السيارات' },
  { key: 'properties', label: 'Properties', labelAr: 'العقارات' },
  { key: 'household', label: 'Household', labelAr: 'المنزل' },
];

const ASSETS: Record<AssetCategory, Array<{ id: string; name: string; nameAr: string; condition: string; conditionAr: string; conditionColor: string; value: number; detail: string; detailAr: string }>> = {
  cars: [
    { id: 'c1', name: '2023 Toyota Camry', nameAr: 'تويوتا كامري ٢٠٢٣', condition: 'Good', conditionAr: 'جيدة', conditionColor: '#4CAF50', value: 95000, detail: 'License: Jun 2025', detailAr: 'الرخصة: يونيو ٢٠٢٥' },
    { id: 'c2', name: '2021 Toyota Avalon', nameAr: 'تويوتا أفالون ٢٠٢١', condition: 'Fair', conditionAr: 'مقبولة', conditionColor: '#FF9800', value: 120000, detail: 'License: Mar 2025', detailAr: 'الرخصة: مارس ٢٠٢٥' },
  ],
  properties: [
    { id: 'p1', name: 'Family Home — Riyadh', nameAr: 'منزل العائلة — الرياض', condition: 'Good', conditionAr: 'جيد', conditionColor: '#4CAF50', value: 1200000, detail: 'Owned since 2010', detailAr: 'ملكية منذ ٢٠١٠' },
  ],
  household: [
    { id: 'h1', name: 'Living Room AC (x3)', nameAr: 'مكيّفات الصالة (٣)', condition: 'Needs Repair', conditionAr: 'تحتاج صيانة', conditionColor: '#F44336', value: 4500, detail: 'Installed 2019', detailAr: 'تركيب ٢٠١٩' },
    { id: 'h2', name: 'Samsung Refrigerator', nameAr: 'ثلاجة سامسونج', condition: 'Good', conditionAr: 'جيدة', conditionColor: '#4CAF50', value: 3200, detail: 'Warranty: Dec 2025', detailAr: 'الضمان: ديسمبر ٢٠٢٥' },
    { id: 'h3', name: 'Water Heater', nameAr: 'سخّان الماء', condition: 'Fair', conditionAr: 'مقبول', conditionColor: '#FF9800', value: 1800, detail: 'Installed 2020', detailAr: 'تركيب ٢٠٢٠' },
  ],
};

export default function AssetsScreen() {
  const { goBack, lang } = useNavigation();
  const isAr = lang === 'ar';
  const [tab, setTab] = useState<AssetCategory>('cars');
  const items = ASSETS[tab];
  const totalValue = Object.values(ASSETS).flat().reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title"><SunflowerHomeIcon size={20} /> {isAr ? 'الممتلكات' : 'Assets'}</span>
      </div>
      <div className="screen-body">
        {/* Total Card */}
        <motion.div className="card glass" style={{ textAlign: 'center', padding: 16, marginBottom: 16 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: 10, color: c.muted, textTransform: 'uppercase', letterSpacing: 1 }}>{isAr ? 'القيمة الإجمالية' : 'TOTAL ESTIMATED VALUE'}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: c.brown, marginTop: 4 }}>
            {totalValue.toLocaleString()} <span style={{ fontSize: 13, color: c.muted }}>{isAr ? 'ر.س' : 'SAR'}</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="filter-row" style={{ marginBottom: 12 }}>
          {TABS.map(t => (
            <button key={t.key} className={`filter-chip ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              {isAr ? t.labelAr : t.label}
            </button>
          ))}
        </div>

        {/* Asset Cards */}
        {items.map((a, i) => (
          <motion.div key={a.id} className="card" style={{ marginBottom: 10, padding: 14 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.brown }}>{isAr ? a.nameAr : a.name}</div>
                <div style={{ fontSize: 11, color: c.muted, marginTop: 3 }}>{isAr ? a.detailAr : a.detail}</div>
              </div>
              <span className="badge" style={{ background: a.conditionColor + '18', color: a.conditionColor, fontSize: 10, padding: '3px 8px', borderRadius: 12, fontWeight: 600 }}>
                {isAr ? a.conditionAr : a.condition}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 8, borderTop: `1px solid ${c.divider}` }}>
              <span style={{ fontSize: 12, color: c.muted }}>{isAr ? 'القيمة التقديرية' : 'Est. Value'}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.mint }}>{a.value.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}</span>
            </div>
          </motion.div>
        ))}

        {/* Add Button */}
        <motion.button className="btn btn-glass btn-md btn-full" style={{ marginTop: 12 }} whileTap={{ scale: 0.97 }}>
          + {isAr ? 'إضافة أصل' : 'Add Asset'}
        </motion.button>
      </div>
    </div>
  );
}
