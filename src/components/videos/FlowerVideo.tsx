/**
 * FlowerVideo — Dual-mode video component
 * Port of the real app's FlowerVideo.tsx
 *
 * Two modes:
 *   - "loading" (approval_waiting.mp4): Loops while waiting for approval
 *   - "celebration" (plan_approved.mp4): Plays once on plan activation
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export type FlowerVideoMode = 'loading' | 'celebration';

interface FlowerVideoProps {
  mode: FlowerVideoMode;
  onComplete?: () => void;
  overlayText?: string;
  overlayTextAr?: string;
  visible?: boolean;
}

export default function FlowerVideo({
  mode,
  onComplete,
  overlayText,
  overlayTextAr,
  visible = true,
}: FlowerVideoProps) {
  const [phase, setPhase] = useState<'playing' | 'zooming' | 'done'>('playing');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pulseOpacity, setPulseOpacity] = useState(1);

  const isLoop = mode === 'loading';
  const BASE = import.meta.env.BASE_URL;
  const videoSrc = mode === 'loading'
    ? `${BASE}videos/approval_waiting.mp4`
    : `${BASE}videos/plan_approved.mp4`;

  // Pulse animation for loading overlay text
  useEffect(() => {
    if (mode !== 'loading') return;

    let frame: number;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) % 3000;
      // Oscillate between 0.4 and 1.0
      const progress = elapsed / 3000;
      const val = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(progress * Math.PI * 2));
      setPulseOpacity(val);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mode]);

  const handleVideoEnd = useCallback(() => {
    if (mode === 'celebration' && phase === 'playing') {
      setPhase('zooming');
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 700);
    }
  }, [mode, phase, onComplete]);

  if (!visible || phase === 'done') return null;

  return (
    <motion.div
      className="flower-video-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flower-video-wrap"
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
          src={videoSrc}
          autoPlay
          muted
          playsInline
          loop={isLoop}
          onEnded={handleVideoEnd}
          className="flower-video"
        />
      </motion.div>

      {/* Overlay content (loading mode only) */}
      {mode === 'loading' && (overlayTextAr || overlayText) && (
        <div className="flower-video-overlay">
          {overlayTextAr && (
            <p
              className="flower-overlay-text-ar"
              style={{ opacity: pulseOpacity }}
            >
              {overlayTextAr}
            </p>
          )}
          {overlayText && (
            <p
              className="flower-overlay-text-en"
              style={{ opacity: pulseOpacity }}
            >
              {overlayText}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
