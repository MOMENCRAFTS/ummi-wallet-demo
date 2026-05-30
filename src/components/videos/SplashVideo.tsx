/**
 * SplashVideo — Full-screen splash_screen.mp4 on initial load
 * Plays inside phone frame, fades in, zooms into last frame, then reveals Landing.
 * Port of the real app's splash from _layout.tsx.
 * Includes safety timeout in case video fails to load/play.
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashVideoProps {
  onComplete: () => void;
}

export default function SplashVideo({ onComplete }: SplashVideoProps) {
  const [phase, setPhase] = useState<'playing' | 'zooming' | 'done'>('playing');
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase('zooming');
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 700);
  }, [onComplete]);

  // Safety timeout — if video doesn't play within 4s, skip splash
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        setPhase('done');
        onComplete();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleVideoEnd = useCallback(() => {
    finish();
  }, [finish]);

  // Also handle errors — skip splash on load failure
  const handleError = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      setPhase('done');
      onComplete();
    }
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="splash-video-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={finish}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          className="splash-video-wrap"
          animate={
            phase === 'zooming'
              ? { scale: 8, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={
            phase === 'zooming'
              ? { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
              : {}
          }
        >
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}videos/splash_screen.mp4`}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleError}
            className="splash-video"
          />
        </motion.div>

        {/* Subtle branding overlay at bottom */}
        <motion.div
          className="splash-branding"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'playing' ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="splash-brand-ar">محفظة أمي</span>
          <span className="splash-brand-en">Ummi Wallet</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
