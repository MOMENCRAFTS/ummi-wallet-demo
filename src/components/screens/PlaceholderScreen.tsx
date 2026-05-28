/**
 * PlaceholderScreen — Generic placeholder for unbuilt modules
 * Zero emoji — uses SeedlingIcon
 */
import { useNavigation } from '../../navigation';
import { SeedlingIcon, ArrowLeafIcon } from '../icons/FloralIcons';

export default function PlaceholderScreen() {
  const { screen, goBack, lang } = useNavigation();
  const isAr = lang === 'ar';

  return (
    <div className="screen placeholder-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="screen-header">
        <button className="back-btn" onClick={goBack}><ArrowLeafIcon size={20} /></button>
        <span className="header-title">{screen}</span>
      </div>
      <div className="screen-body placeholder-body">
        <span className="placeholder-icon-svg"><SeedlingIcon size={48} /></span>
        <h2>{isAr ? 'قريباً' : 'Coming Soon'}</h2>
        <p>{isAr ? 'هذا الموديول قيد التطوير' : 'This module is under development'}</p>
      </div>
    </div>
  );
}
