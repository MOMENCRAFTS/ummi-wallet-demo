/**
 * Ummi Wallet Demo — Haptics Service
 * Web fallback using navigator.vibrate (Vibration API).
 * Mirrors the real app's Capacitor Haptics patterns.
 *
 * Pattern design:
 *   light   — single short 8ms tap (button press)
 *   medium  — single 22ms pulse (action confirm)
 *   success — two-tap: 18ms · pause 60ms · 40ms (task done)
 *   error   — three stutter: 30ms · 40ms · 30ms · 40ms · 30ms (failure)
 *   warning — single medium buzz: 50ms
 *
 * Falls back silently if Vibration API is not available (desktop, iOS Safari).
 */

const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

function vibe(pattern: number | number[]): void {
  if (!supported) return;
  try {
    navigator.vibrate(pattern);
  } catch {/* ignore */}
}

export const hapticsService = {
  /** Very light tap — link press, chip select */
  light(): void {
    vibe(8);
  },

  /** Medium press — button confirm, toggle */
  medium(): void {
    vibe(22);
  },

  /** Success pattern — task done, payment sent, approval */
  success(): void {
    vibe([18, 60, 40]);
  },

  /** Error pattern — invalid input, rejection */
  error(): void {
    vibe([30, 40, 30, 40, 30]);
  },

  /** Warning — alert, SOS trigger */
  warning(): void {
    vibe(50);
  },

  /** Stop any ongoing vibration */
  cancel(): void {
    vibe(0);
  },
};
