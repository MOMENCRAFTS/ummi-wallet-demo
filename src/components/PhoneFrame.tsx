/**
 * PhoneFrame — iPhone 15 Pro device mockup wrapper
 * Desktop: full phone frame with Dynamic Island, bezels, home indicator
 * Mobile (<768px): frameless full-screen, content fills the viewport
 */
import { type ReactNode, useState, useEffect } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const isMobile = useIsMobile();

  // Mobile: no frame — content fills entire viewport
  if (isMobile) {
    return (
      <div className="phone-frame-mobile">
        <div className="phone-screen-mobile">
          {children}
        </div>
      </div>
    );
  }

  // Desktop: full iPhone 15 Pro frame
  return (
    <div className="phone-frame-container">
      <div className="phone-frame">
        {/* Dynamic Island */}
        <div className="phone-notch" />

        {/* Screen content */}
        <div className="phone-screen">
          {children}
        </div>

        {/* Home indicator */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}
