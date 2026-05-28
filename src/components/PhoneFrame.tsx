/**
 * PhoneFrame — iPhone 15 Pro device mockup wrapper
 * Wraps the entire app in a realistic phone frame for demo presentation
 */
import { type ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
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
