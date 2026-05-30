/**
 * OAuthTransition — Cinematic flower bloom video after login
 * Port of the real app's OAuthTransition.tsx
 * Plays oauth_success.mp4 full-screen, zooms into last frame on end.
 * Safety: 6s timeout auto-completes if video fails.
 * Click anywhere to skip.
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OAuthTransitionProps {
  onComplete: () => void;
}

export default function OAuthTransition({ onComplete }: OAuthTransitionProps) {
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

  // Safety timeout — skip after 6s if video doesn't play/end
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completedRef.current) {
        console.warn('[OAuthTransition] Safety timeout — skipping');
        completedRef.current = true;
        setPhase('done');
        onComplete();
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="oauth-transition-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={finish}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          className="oauth-transition-wrap"
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
            src={`${import.meta.env.BASE_URL}videos/oauth_success.mp4`}
            autoPlay
            muted
            playsInline
            onEnded={finish}
            className="oauth-transition-video"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

