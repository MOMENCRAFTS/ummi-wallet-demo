/**
 * FloralIcons — SVG botanical icon set matching the true app
 * Zero-emoji policy: ALL icons are hand-crafted SVGs
 * Converted from react-native-svg to web <svg> elements
 */

interface IconProps {
  size?: number;
  color?: string;
}

export const c = {
  mint: '#8FCFB3', mintDark: '#6BB89A', mintLight: '#B5E0CC', sage: '#A8C8B0',
  peach: '#F6B89E', peachLight: '#FADAC8', gold: '#D4A94E', goldLight: '#F5E6C8',
  pink: '#F2C6D0', pinkLight: '#F9E4E9', coral: '#E8957A', brown: '#3E3328',
  muted: '#8A7A68', light: '#B5A898', emergency: '#E86F61', emergencyDark: '#D4503F',
  blue: '#A7C7E7', blueDark: '#89B3D9', yellow: '#F7D774', yellowDark: '#F4C94D',
  ivory: '#FFFCF2', divider: '#E8DFD0', success: '#7FC8A9',
};

// ════════════════════════════════════════════
//  APP IDENTITY
// ════════════════════════════════════════════

// Wallet Rose — main app logo
export function WalletRoseIcon({ size = 36, color = c.peach }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="walletGrad" x1="16" y1="30" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.peachLight}/>
          <stop offset="1" stopColor={c.peach}/>
        </linearGradient>
        <linearGradient id="roseTopGrad" x1="32" y1="4" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.peach}/>
          <stop offset="1" stopColor={c.coral}/>
        </linearGradient>
      </defs>
      <rect x="14" y="32" rx="6" ry="6" width="36" height="24" fill="url(#walletGrad)" stroke={c.coral} strokeWidth="1.5"/>
      <rect x="40" y="38" rx="4" ry="4" width="10" height="10" fill={c.ivory} stroke={c.coral} strokeWidth="1"/>
      <circle cx="45" cy="43" r="2" fill={c.coral} opacity="0.5"/>
      <path d="M27 42 Q27 38 31 38 Q35 38 35 42 Q35 46 31 50 Q27 46 27 42Z" fill={c.pink}/>
      <path d="M32 32 L32 18" stroke={c.mintDark} strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 26 Q26 22 24 26 Q26 30 32 26" fill={c.mint}/>
      <path d="M32 22 Q38 18 40 22 Q38 26 32 22" fill={c.mintLight}/>
      <path d="M24 14 Q22 6 32 4 Q42 6 40 14 Q40 20 32 22 Q24 20 24 14Z" fill="url(#roseTopGrad)"/>
      <path d="M28 12 Q28 8 32 6 Q36 8 36 12 Q36 18 32 20 Q28 18 28 12Z" fill={c.peach} opacity="0.6"/>
      <circle cx="37" cy="10" r="2" fill="white" opacity="0.7"/>
    </svg>
  );
}

// Arrow Leaf — back button
export function ArrowLeafIcon({ size = 22, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M15 19 Q8 16 5 12 Q8 8 15 5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M5 12 L18 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 12 Q1 10 3 8 Q4 10 3 12Z" fill={color} opacity="0.6"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  NAVIGATION ICONS
// ════════════════════════════════════════════

// Home — Garden gate
export function HomeGardenIcon({ size = 28, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M5 17 L16 7 L27 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M8 15 L8 26 L24 26 L24 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M13 26 L13 20 L19 20 L19 26" stroke={color} strokeWidth="1.5" fill={c.peachLight}/>
      <path d="M22 10 Q25 7 27 10 Q25 13 22 10" fill={color} opacity="0.5"/>
    </svg>
  );
}

// Hand with petal — request
export function HandPetalIcon({ size = 28, color = c.peach }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M10 20 Q8 14 12 10 Q16 8 18 12 L18 20" stroke={c.brown} strokeWidth="1.5" fill="none"/>
      <path d="M18 12 L18 8 Q20 6 22 8 L22 14" stroke={c.brown} strokeWidth="1.5" fill="none"/>
      <path d="M22 14 L22 10 Q24 8 26 10 L26 16" stroke={c.brown} strokeWidth="1.5" fill="none"/>
      <path d="M10 20 Q10 26 16 28 Q22 26 26 22 L26 16" stroke={c.brown} strokeWidth="1.5" fill="none"/>
      <ellipse cx="16" cy="5" rx="3" ry="2" fill={color} opacity="0.7" transform="rotate(-20 16 5)"/>
    </svg>
  );
}

// Settings — gear with leaf
export function SettingsGearIcon({ size = 28, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="5" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="2" fill={color} opacity="0.3"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="16" cy="7" rx="2" ry="3" fill={color} opacity="0.6" transform={`rotate(${angle} 16 16)`}/>
      ))}
      <path d="M24 6 Q27 4 28 7 Q26 9 24 6Z" fill={c.mint} opacity="0.7"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  STATUS & BADGE ICONS
// ════════════════════════════════════════════

// Heart Leaf — barakah / comfort
export function HeartLeafIcon({ size = 24, color = c.pink }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 20 Q4 14 4 9 Q4 5 8 4 Q12 3 12 7 Q12 3 16 4 Q20 5 20 9 Q20 14 12 20Z" fill={color}/>
      <path d="M12 8 L12 16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
      <path d="M12 11 L9 9" stroke="white" strokeWidth="0.6" opacity="0.4"/>
      <path d="M12 13 L15 11" stroke="white" strokeWidth="0.6" opacity="0.4"/>
    </svg>
  );
}

// Crown Floral — lead caregiver
export function CrownFloralIcon({ size = 24, color = c.gold }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M3 16 L5 8 L9 12 L12 6 L15 12 L19 8 L21 16 Z" fill={color} opacity="0.8"/>
      <path d="M3 16 L21 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="4" y="16" rx="1" width="16" height="3" fill={color} opacity="0.6"/>
      <circle cx="12" cy="5" r="1.5" fill={c.peach}/>
      <circle cx="12" cy="5" r="0.7" fill={c.yellow}/>
    </svg>
  );
}

// Eye Leaf — observer
export function EyeLeafIcon({ size = 24, color = c.blue }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M2 12 Q6 6 12 6 Q18 6 22 12 Q18 18 12 18 Q6 18 2 12Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="3" fill={color} opacity="0.6"/>
      <circle cx="12" cy="12" r="1.5" fill={color}/>
      <path d="M20 7 Q22 5 23 7 Q21 9 20 7Z" fill={c.mint} opacity="0.7"/>
    </svg>
  );
}

// Wave hand — greeting
export function WaveHandIcon({ size = 24, color = c.peach }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M8 14 Q6 10 8 7 Q10 5 12 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M12 7 L12 5 Q13 3 15 5 L15 9" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M15 9 L15 4 Q16 2 18 4 L18 10" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M8 14 Q8 18 12 20 Q16 18 18 16 L18 10" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M5 8 L3 7" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      <path d="M5 11 L3 11" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

// Check Leaf — success
export function CheckLeafIcon({ size = 18, color = c.success }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 12 Q2 6 8 2 Q14 0 18 4 Q22 8 20 14 Q18 20 12 22 Q6 18 4 12Z" fill={color} opacity="0.2"/>
      <path d="M4 12 Q2 6 8 2 Q14 0 18 4 Q22 8 20 14 Q18 20 12 22 Q6 18 4 12Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M8 12 L11 15 L17 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// Live Dot — pulsing
export function LiveDotIcon({ size = 16, color = c.success }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6" fill={color} opacity="0.15"/>
      <circle cx="8" cy="8" r="4" fill={color} opacity="0.3"/>
      <circle cx="8" cy="8" r="2.5" fill={color}/>
    </svg>
  );
}

// Pending Bud
export function PendingBudIcon({ size = 18, color = c.yellow }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 18 L12 14" stroke={c.mintDark} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12 Q8 6 12 4 Q16 6 16 12 Q16 14 12 15 Q8 14 8 12Z" fill={color} opacity="0.6"/>
      <path d="M10 10 Q10 8 12 6 Q14 8 14 10 Q14 14 12 14 Q10 14 10 10Z" fill={color} opacity="0.4"/>
      <path d="M12 16 Q9 14 8 16 Q9 18 12 16" fill={c.mint} opacity="0.7"/>
      <path d="M12 14 Q15 12 16 14 Q15 16 12 14" fill={c.mintLight} opacity="0.7"/>
    </svg>
  );
}

// Wilt — overdue
export function WiltIcon({ size = 18, color = c.emergency }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 14 Q10 18 12 22" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M10 11 Q7 7 10 4 Q12 3 12 7 Q11 9 10 11Z" fill="#F5A59B" opacity="0.7"/>
      <path d="M14 10 Q17 6 14 3 Q12 2 12 6 Q13 8 14 10Z" fill="#F5A59B" opacity="0.5"/>
      <path d="M11 13 Q9 10 11 8 Q12 7 13 9 Q12 11 11 13Z" fill={color} opacity="0.6"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  CATEGORY ICONS
// ════════════════════════════════════════════

// Tulip — requests / welcome
export function TulipIcon({ size = 44, color = c.peach }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44">
      <path d="M22 26 L22 38" stroke={c.mintDark} strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 32 Q18 30 16 32 Q18 34 22 32" fill={c.mint}/>
      <path d="M22 30 Q26 28 28 30 Q26 32 22 30" fill={c.mint}/>
      <path d="M14 18 Q14 8 22 6 Q30 8 30 18 Q30 26 22 28 Q14 26 14 18Z" fill={color}/>
      <path d="M18 18 Q18 10 22 8 Q26 10 26 18 Q26 24 22 26 Q18 24 18 18Z" fill={color} opacity="0.5"/>
      <circle cx="26" cy="14" r="2" fill="white" opacity="0.6"/>
    </svg>
  );
}

// SOS Rose
export function RoseSOSIcon({ size = 24, color = c.emergency }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 16 L12 20" stroke={c.mintDark} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 10 Q7 5 12 4 Q17 5 16 10 Q16 14 12 16 Q8 14 8 10Z" fill={color}/>
      <path d="M9.5 9 Q9.5 6 12 5 Q14.5 6 14.5 9 Q14.5 13 12 14.5 Q9.5 13 9.5 9Z" fill={color} opacity="0.7"/>
      <line x1="12" y1="7" x2="12" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="13" r="0.8" fill="white"/>
      <circle cx="12" cy="10" r="8" stroke={color} strokeWidth="0.5" opacity="0.2" fill="none"/>
    </svg>
  );
}

// Globe Flower — language toggle
export function GlobeFlowerIcon({ size = 16, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.5" fill="none"/>
      <ellipse cx="16" cy="16" rx="6" ry="11" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="5" y1="12" x2="27" y2="12" stroke={color} strokeWidth="1"/>
      <line x1="5" y1="20" x2="27" y2="20" stroke={color} strokeWidth="1"/>
      <ellipse cx="16" cy="4" rx="2" ry="1.5" fill={c.peach} opacity="0.6"/>
    </svg>
  );
}

// Seedling
export function SeedlingIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 12 L12 20" stroke={c.mintDark} strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 14 Q8 10 9 6 Q10 4 12 8" fill={c.mint}/>
      <path d="M12 12 Q16 8 17 4 Q15 2 12 7" fill={c.mintLight}/>
    </svg>
  );
}

// Bouquet — celebration / done
export function BouquetIcon({ size = 80, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <path d="M30 46 L26 66 L54 66 L50 46" fill={c.peachLight} stroke={c.peach} strokeWidth="1"/>
      <path d="M28 48 L52 48" stroke={c.peach} strokeWidth="1.5"/>
      <circle cx="34" cy="32" r="9" fill={c.peach}/>
      <circle cx="34" cy="32" r="4" fill={c.yellow}/>
      <circle cx="46" cy="30" r="9" fill={c.emergency} opacity="0.8"/>
      <circle cx="46" cy="30" r="4" fill={c.emergencyDark} opacity="0.6"/>
      <circle cx="40" cy="22" r="9" fill={c.blue} opacity="0.7"/>
      <circle cx="40" cy="22" r="4" fill={c.blueDark} opacity="0.6"/>
      <path d="M28 40 Q24 36 26 32" stroke={c.mint} strokeWidth="2" fill="none"/>
      <path d="M52 38 Q56 34 54 30" stroke={c.mint} strokeWidth="2" fill="none"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  DASHBOARD ICONS
// ════════════════════════════════════════════
// Sunflower Home — home & car assets
export function SunflowerHomeIcon({ size = 24, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 14 L4 20 L11 20 L11 14" fill={c.ivory} stroke={color} strokeWidth="1.2" opacity="0.7"/>
      <path d="M2 14.5 L7.5 9 L13 14.5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M7 20 L7 17 L9 17 L9 20" stroke={color} strokeWidth="0.8" fill={c.peach} opacity="0.5"/>
      <g transform="translate(17, 9)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse key={angle} cx="0" cy="-4" rx="1.5" ry="3" fill={c.yellow} transform={`rotate(${angle})`}/>
        ))}
        <circle cx="0" cy="0" r="2.5" fill={c.muted}/>
        <circle cx="0" cy="0" r="1.5" fill={c.brown} opacity="0.5"/>
      </g>
      <line x1="17" y1="12" x2="17" y2="20" stroke={c.mintDark} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 15 Q20 13 21 15 Q20 17 17 15" fill={c.mint}/>
    </svg>
  );
}

// Medical Herb — health/medical
export function MedicalHerbIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="9" y="5" rx="1.5" width="6" height="14" fill={color} opacity="0.2"/>
      <rect x="5" y="9" rx="1.5" width="14" height="6" fill={color} opacity="0.2"/>
      <rect x="9" y="5" rx="1.5" width="6" height="14" stroke={color} strokeWidth="1.2" fill="none"/>
      <rect x="5" y="9" rx="1.5" width="14" height="6" stroke={color} strokeWidth="1.2" fill="none"/>
      <path d="M18 6 Q20 4 21 6 Q20 8 18 6" fill={color}/>
      <path d="M6 18 Q4 20 3 18 Q4 16 6 18" fill={color}/>
      <circle cx="20" cy="4" r="1" fill={c.yellow} opacity="0.7"/>
    </svg>
  );
}

// Money Leaf — general money
export function MoneyLeafIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="3" y="6" rx="3" width="18" height="12" fill={c.ivory} stroke={color} strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M11 10 Q12 9 13 10 Q13 11.5 12 12 Q11 11 11 10Z" fill={color} opacity="0.6"/>
      <path d="M5 8 Q3 6 4 4" stroke={color} strokeWidth="1" opacity="0.5" fill="none"/>
      <path d="M4 4 Q5.5 3 5.5 5 Q4.5 6 4 4Z" fill={color} opacity="0.4"/>
    </svg>
  );
}

// Leaf Bill — bills/utilities  
export function LeafBillIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M6 18 Q3 12 6 6 Q9 3 13 4 Q17 5 18 10 Q19 14 16 18 Q13 21 9 20Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      <path d="M7 17 Q10 12 13 6" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <rect x="12" y="7" width="8" height="12" rx="1" fill={c.ivory} stroke={c.divider} strokeWidth="1"/>
      <line x1="14" y1="10" x2="18" y2="10" stroke={c.divider} strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="12.5" x2="18" y2="12.5" stroke={c.divider} strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="15" x2="16" y2="15" stroke={c.divider} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

// Chart with bloom — reports/analytics
export function ChartBloomIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="3" y="14" rx="1.5" width="4" height="6" fill={color} opacity="0.4"/>
      <rect x="10" y="9" rx="1.5" width="4" height="11" fill={color} opacity="0.6"/>
      <rect x="17" y="5" rx="1.5" width="4" height="15" fill={color} opacity="0.8"/>
      <path d="M2 20 L22 20" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="19" cy="3.5" r="2" fill={c.peach}/>
      <circle cx="19" cy="3.5" r="0.8" fill={c.yellow}/>
    </svg>
  );
}

// Queue Scroll — follow-up
export function QueueScrollIcon({ size = 20, color = c.brown }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="4" y="2" rx="2" width="16" height="20" fill={c.ivory} stroke={color} strokeWidth="1.5"/>
      <line x1="8" y1="7" x2="17" y2="7" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="11" x2="17" y2="11" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="15" x2="14" y2="15" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 7 L6.2 8.2 L7.5 6" stroke={c.success} strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M5 11 L6.2 12.2 L7.5 10" stroke={c.success} strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M19 2 Q21 0 22 3 Q20 4 19 2" fill={c.mint} opacity="0.6"/>
    </svg>
  );
}

// News Scroll — feed
export function NewsScrollIcon({ size = 20, color = c.blue }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="3" y="4" rx="2" width="18" height="16" fill={c.ivory} stroke={color} strokeWidth="1.5"/>
      <rect x="5" y="6" rx="1.5" width="8" height="6" fill={color} opacity="0.2" stroke={color} strokeWidth="0.8"/>
      <line x1="14.5" y1="7" x2="19" y2="7" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14.5" y1="10" x2="19" y2="10" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="15" x2="19" y2="15" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="5" y1="18" x2="15" y2="18" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="3.5" r="1.5" fill={c.peach} opacity="0.6"/>
    </svg>
  );
}

// Cake Blossom — celebrations
export function CakeBlossomIcon({ size = 24, color = c.peach }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="4" y="13" rx="2" width="16" height="8" fill={c.peachLight} stroke={color} strokeWidth="1.5"/>
      <rect x="6" y="10" rx="1.5" width="12" height="4.5" fill={color} opacity="0.3" stroke={color} strokeWidth="1"/>
      <rect x="11" y="5" width="2" height="5" fill={c.yellow}/>
      <ellipse cx="12" cy="4.5" rx="1.5" ry="2.5" fill={c.yellow} opacity="0.8"/>
      <circle cx="12" cy="4" r="0.8" fill={c.emergency} opacity="0.7"/>
      <circle cx="8" cy="11.5" r="1.5" fill={color} opacity="0.5"/>
      <circle cx="16" cy="11.5" r="1.5" fill={color} opacity="0.5"/>
    </svg>
  );
}

// Lightbulb Petal — suggestions/ideas
export function LightbulbPetalIcon({ size = 24, color = c.yellow }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M9 16 Q6 13 6 9 Q6 4 12 3 Q18 4 18 9 Q18 13 15 16 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/>
      <rect x="9" y="16" rx="1" width="6" height="2.5" fill={color} opacity="0.5"/>
      <rect x="10" y="18.5" rx="1" width="4" height="2" fill={color} opacity="0.4"/>
      <path d="M12 1 L12 2.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M6 3 L7 4.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M18 3 L17 4.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

// Person Floral — family members
export function PersonFloralIcon({ size = 24, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="4" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
      <path d="M4 21 Q4 15 12 13 Q20 15 20 21" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" fillRule="nonzero"/>
      <circle cx="9" cy="4" r="1.5" fill={c.peach} opacity="0.7"/>
      <circle cx="12" cy="3" r="1.5" fill={c.pink} opacity="0.7"/>
      <circle cx="15" cy="4" r="1.5" fill={c.peach} opacity="0.7"/>
    </svg>
  );
}

// Bank Garden — reservoir
export function BankGardenIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 10 L12 4 L20 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="6" y="10" rx="1" width="12" height="10" fill={c.ivory} stroke={color} strokeWidth="1.5"/>
      <line x1="9" y1="12" x2="9" y2="18" stroke={color} strokeWidth="1.5"/>
      <line x1="12" y1="12" x2="12" y2="18" stroke={color} strokeWidth="1.5"/>
      <line x1="15" y1="12" x2="15" y2="18" stroke={color} strokeWidth="1.5"/>
      <path d="M3 20 Q6 17 9 20 Q12 17 15 20 Q18 17 21 20" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M12 4 Q13.5 2 15 4 Q13.5 5.5 12 4Z" fill={color} opacity="0.7"/>
    </svg>
  );
}

// Payroll Leaf — workers
export function PayrollLeafIcon({ size = 24, color = c.yellow }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="9" cy="7" r="3" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
      <path d="M3 18 Q3 13 9 12 Q15 13 15 18" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <circle cx="18" cy="10" r="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/>
      <path d="M17 9 Q18 8 19 9 L19 10.5 Q18 11.5 17 10.5 Z" fill={color} opacity="0.6"/>
      <path d="M19.5 6 Q21 5 22 7 Q21 8 19.5 6Z" fill={c.mint} opacity="0.7"/>
    </svg>
  );
}

// Wrench Vine — maintenance
export function WrenchVineIcon({ size = 24, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M6 18 L16 8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 8 Q18 5 21 5 Q22 8 19 10 Q17 10 16 8Z" fill={color} opacity="0.6" stroke={color} strokeWidth="1"/>
      <path d="M6 18 Q4 20 5 22 Q7 23 9 21 Q9 19 6 18Z" fill={color} opacity="0.6" stroke={color} strokeWidth="1"/>
      <path d="M9 15 Q7 13 10 12 Q12 14 9 15Z" fill={c.mint}/>
      <path d="M12 12 Q10 10 13 9 Q15 11 12 12Z" fill={c.mintLight}/>
    </svg>
  );
}

// Document Leaf — documents
export function DocumentLeafIcon({ size = 24, color = c.blue }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M6 3 L15 3 L18 6 L18 21 L6 21 Z" fill={c.ivory} stroke={color} strokeWidth="1.5"/>
      <path d="M15 3 L15 6 L18 6" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="8.5" y1="10" x2="15.5" y2="10" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8.5" y1="13" x2="15.5" y2="13" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8.5" y1="16" x2="13" y2="16" stroke={c.divider} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 18 Q19 16 20 19 Q18 20 16 18" fill={c.mint} opacity="0.7"/>
    </svg>
  );
}

// Balance Leaves — settlement
export function BalanceLeavesIcon({ size = 24, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="8" x2="18" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 7 Q3 4 5 2 Q7 1 8 4 Q6 6 5 7Z" fill={c.mint}/>
      <path d="M19 7 Q21 4 19 2 Q17 1 16 4 Q18 6 19 7Z" fill={c.mint}/>
      <line x1="8" y1="19" x2="16" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// Refresh Petal — spinning
export function RefreshPetalIcon({ size = 20, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M20 12 Q20 6 14 4 Q8 4 5 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M4 12 Q4 18 10 20 Q16 20 19 16" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M5 8 L3 5 L7 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M19 16 L21 19 L17 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// Clock Petal — time
export function ClockPetalIcon({ size = 20, color = c.muted }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M12 7 L12 12 L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="12" cy="3.5" rx="1.5" ry="1" fill={c.peach} opacity="0.5"/>
    </svg>
  );
}

// Bell Blossom — notifications
export function BellBlossomIcon({ size = 24, color = c.yellow }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M9 18 Q9 21 12 21 Q15 21 15 18" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M6 16 Q6 10 9 7 Q10 5.5 12 5.5 Q14 5.5 15 7 Q18 10 18 16 L6 16Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
      <line x1="12" y1="5.5" x2="12" y2="3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="2.5" r="1.5" fill={c.peach}/>
      <circle cx="12" cy="2.5" r="0.6" fill={c.yellow}/>
    </svg>
  );
}

// Shield Leaf — security
export function ShieldLeafIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 3 L20 6 L20 13 Q20 19 12 22 Q4 19 4 13 L4 6 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M12 8 Q9 11 10 14 Q12 13 12 8" fill={color} opacity="0.5"/>
      <path d="M12 8 Q15 11 14 14 Q12 13 12 8" fill={c.mintDark} opacity="0.5"/>
      <line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  CHAT ICONS
// ════════════════════════════════════════════

// Chat Bubble Leaf
export function ChatBubbleLeafIcon({ size = 24, color = c.mint }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 6 Q4 3 7 3 L17 3 Q20 3 20 6 L20 14 Q20 17 17 17 L10 17 L6 21 L7 17 Q4 17 4 14 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M19 4 Q21 2 22 5 Q21 6 19 4Z" fill={color} opacity="0.7"/>
      <line x1="7.5" y1="8" x2="16.5" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7.5" y1="12" x2="14" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Mic Floral
export function MicFloralIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="12" rx="3" fill={color} opacity="0.9"/>
      <path d="M5 12 Q5 18 12 18 Q19 18 19 12" fill="none" stroke={color} strokeWidth="1.5"/>
      <line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  DECORATIVE
// ════════════════════════════════════════════

// Sparkle Accent (decorative)
export function SparkleAccent({ size = 12, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={style}>
      <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5Z" fill={c.gold} opacity="0.5"/>
    </svg>
  );
}

// Sparkle Star
export function SparkleStarIcon({ size = 16, color = c.gold }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <path d="M8 1 L9.5 6 L15 8 L9.5 10 L8 15 L6.5 10 L1 8 L6.5 6 Z" fill={color} opacity="0.8"/>
      <path d="M8 4 L8.8 6.8 L12 8 L8.8 9.2 L8 12 L7.2 9.2 L4 8 L7.2 6.8 Z" fill={color}/>
    </svg>
  );
}

// Vine Divider
export function VineDivider() {
  return (
    <svg width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="xMidYMid meet" style={{ marginTop: 6 }}>
      <path d="M0 6 Q30 2 60 6 Q90 10 120 6 Q150 2 180 6 L200 6" stroke={c.sage} strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M40 4 Q38 2 40 0 Q42 2 40 4Z" fill={c.sage} opacity="0.3"/>
      <path d="M100 8 Q98 10 100 12 Q102 10 100 8Z" fill={c.sage} opacity="0.3"/>
      <path d="M160 4 Q158 2 160 0 Q162 2 160 4Z" fill={c.sage} opacity="0.3"/>
    </svg>
  );
}

// Corner Flourish
export function CornerFlourish({ position }: { position: 'topRight' | 'bottomLeft' }) {
  const isBottom = position === 'bottomLeft';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"
      style={{
        position: 'absolute', zIndex: 1,
        ...(isBottom ? { bottom: 4, left: 4, transform: 'rotate(180deg)' } : { top: 4, right: 4 }),
      }}>
      <path d="M20 2 Q16 2 12 6 Q8 10 4 18" stroke={c.sage} strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M18 4 Q15 6 14 10 Q14 8 16 6 Z" fill={c.sage} opacity="0.25"/>
      <path d="M22 2 Q20 6 16 8" stroke={c.sage} strokeWidth="0.6" fill="none" opacity="0.3"/>
    </svg>
  );
}

// Floating Petals (background decoration)
export function FloatingPetals({ count = 6 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    left: `${10 + (i * 16)}%`,
    delay: `${i * 1.2}s`,
    duration: `${6 + (i % 4)}s`,
    size: 8 + (i % 3) * 4,
  }));

  return (
    <div className="floating-petals">
      {petals.map((p, i) => (
        <div key={i} className="petal" style={{
          left: p.left,
          animationDelay: p.delay,
          animationDuration: p.duration,
        }}>
          <svg width={p.size} height={p.size} viewBox="0 0 12 12">
            <path d="M6 0 Q9 3 9 6 Q9 9 6 12 Q3 9 3 6 Q3 3 6 0Z"
              fill={i % 2 === 0 ? c.pink : c.sage} opacity="0.3"/>
          </svg>
        </div>
      ))}
    </div>
  );
}

// Petal Confetti (celebration)
export function PetalConfetti({ count = 20 }: { count?: number }) {
  const confetti = Array.from({ length: count }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    color: [c.pink, c.sage, c.gold, c.coral, c.mint][i % 5],
  }));

  return (
    <div className="petal-confetti">
      {confetti.map((p, i) => (
        <div key={i} className="confetti-petal" style={{
          left: p.left, animationDelay: p.delay,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M5 0 Q8 2 8 5 Q8 8 5 10 Q2 8 2 5 Q2 2 5 0Z" fill={p.color} opacity="0.6"/>
          </svg>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════
//  ALERT ICONS
// ════════════════════════════════════════════

// Alert Tulip — warning/alert variant
export function AlertTulipIcon({ size = 24, color = c.emergency }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 18 L12 14" stroke={c.mintDark} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 10 Q8 4 12 2 Q16 4 16 10 Q16 14 12 16 Q8 14 8 10Z" fill={color}/>
      <path d="M10 9 Q10 5 12 4 Q14 5 14 9 Q14 13 12 14 Q10 13 10 9Z" fill={color} opacity="0.6"/>
      <line x1="12" y1="6" x2="12" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="0.8" fill="white"/>
      <path d="M12 16 Q9 14 8 16 Q9 18 12 16" fill={c.mint} opacity="0.7"/>
      <path d="M12 14 Q15 12 16 14 Q15 16 12 14" fill={c.mintLight} opacity="0.7"/>
    </svg>
  );
}

// ════════════════════════════════════════════
//  OAUTH LOGOS
// ════════════════════════════════════════════

// Apple Logo
export function AppleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.81-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

// Google Logo
export function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
