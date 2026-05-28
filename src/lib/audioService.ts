/**
 * Ummi Wallet Demo — Web Audio Service
 * Port of the real app's audioService.ts for HTML5 Audio
 *
 * Handles: preloading, crossfading, volume ducking, page visibility,
 * and user preference persistence via localStorage.
 *
 * Tracks:
 *   pearl_gate       — Splash + Login (warm welcome)
 *   mothers_embrace  — Mother dashboard (intimate, guiding)
 *   pulse_in_the_hall — Home screen (uplifting daily)
 *   blessing_hush    — Finance flow (reverent)
 *   celebration_bloom — Success moments (one-shot flourish)
 *   step_complete    — Step advance (tiny UI sound)
 */

// ─── Track Registry ───
const BASE = import.meta.env.BASE_URL;
const TRACKS = {
  pearl_gate: `${BASE}audio/pearl_gate.mp3`,
  mothers_embrace: `${BASE}audio/mothers_embrace.mp3`,
  pulse_in_the_hall: `${BASE}audio/pulse_in_the_hall.mp3`,
  blessing_hush: `${BASE}audio/blessing_hush.mp3`,
  celebration_bloom: `${BASE}audio/celebration_bloom.mp3`,
  step_complete: `${BASE}audio/step_complete.mp3`,
} as const;

export type TrackName = keyof typeof TRACKS;

// ─── Looping tracks vs one-shots ───
const LOOPING_TRACKS: TrackName[] = [
  'pearl_gate',
  'mothers_embrace',
  'pulse_in_the_hall',
  'blessing_hush',
];

// ─── Constants ───
const STORAGE_KEY = 'ummi_music_enabled';
const DEFAULT_VOLUME = 0.25; // Slightly lower than mobile (0.3) for laptop speakers
const FADE_STEP_MS = 40;

// Asymmetric transitions: slow volume-up, fast volume-down
const FADE_IN_MS = 1500;
const FADE_OUT_MS = 400;
const CROSSFADE_IN_MS = 2000;
const CROSSFADE_OUT_MS = 500;
const DUCK_DOWN_MS = 300;
const DUCK_UP_MS = 1200;

// ─── Service State ───
let players: Partial<Record<TrackName, HTMLAudioElement>> = {};
let currentTrack: TrackName | null = null;
let enabled = true;
let globalVolume = DEFAULT_VOLUME;
let initialized = false;
let unlocked = false; // Browser autoplay gate

// ─── Listeners for UI updates ───
type Listener = () => void;
const listeners: Set<Listener> = new Set();

// ─── Easing: smooth ease-in-out curve ───
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Volume Ramping Utility (with easing) ───
async function rampVolume(
  player: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number
): Promise<void> {
  const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const eased = easeInOutCubic(t);
    const vol = Math.max(0, Math.min(1, from + (to - from) * eased));
    try {
      player.volume = vol;
    } catch {
      break;
    }
    if (i < steps) {
      await new Promise((r) => setTimeout(r, FADE_STEP_MS));
    }
  }
}

// ─── Page Visibility Handler ───
function handleVisibility() {
  if (document.hidden) {
    audioService.pause();
  } else {
    audioService.resume();
  }
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

// ─── Public API ───
export const audioService = {
  /**
   * Preload all audio tracks.
   * Call once at app init.
   */
  async preload(): Promise<void> {
    if (initialized) return;

    try {
      // Load user preference
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        enabled = stored === 'true';
      }

      // Create all audio elements
      const entries = Object.entries(TRACKS) as [TrackName, string][];
      for (const [name, src] of entries) {
        try {
          const audio = new Audio();
          audio.src = src;
          audio.preload = 'auto';
          audio.volume = 0;
          audio.loop = LOOPING_TRACKS.includes(name);
          players[name] = audio;
        } catch (err) {
          console.warn(`[Audio] Failed to load ${name}:`, err);
        }
      }

      // Listen for page visibility changes
      document.addEventListener('visibilitychange', handleVisibility);

      initialized = true;
    } catch (err) {
      console.warn('[Audio] Preload failed:', err);
    }
  },

  /**
   * Unlock audio playback — must be called from a user gesture handler.
   * Browsers require at least one user-initiated play() before allowing programmatic playback.
   */
  async unlock(): Promise<void> {
    if (unlocked) return;

    // Play and immediately pause each track to unlock them
    const promises = Object.values(players).map(async (player) => {
      if (!player) return;
      try {
        player.volume = 0;
        await player.play();
        player.pause();
        player.currentTime = 0;
      } catch {
        // Some browsers may still block — that's ok
      }
    });

    await Promise.all(promises);
    unlocked = true;
  },

  /**
   * Play a track immediately at the given volume.
   */
  async play(
    track: TrackName,
    volume: number = globalVolume
  ): Promise<void> {
    if (!enabled || !players[track]) return;

    try {
      const player = players[track]!;
      player.currentTime = 0;
      player.volume = 0;
      await player.play().catch(() => {});
      currentTrack = track;
      notifyListeners();
      // Slow fade-in for organic feel
      rampVolume(player, 0, volume, FADE_IN_MS).catch(() => {});
    } catch (err) {
      console.warn(`[Audio] Play ${track} failed:`, err);
    }
  },

  /**
   * Crossfade from the current track to a new one.
   */
  async crossfadeTo(track: TrackName): Promise<void> {
    if (!enabled) return;
    if (track === currentTrack) return;

    const oldTrack = currentTrack;
    const oldPlayer = oldTrack ? players[oldTrack] : null;
    const newPlayer = players[track];

    if (!newPlayer) return;

    try {
      // Start new track at volume 0
      newPlayer.currentTime = 0;
      newPlayer.volume = 0;
      await newPlayer.play().catch(() => {});
      currentTrack = track;
      notifyListeners();

      // Asymmetric crossfade: fast out for old, slow in for new
      const fadePromises: Promise<void>[] = [];

      if (oldPlayer) {
        fadePromises.push(
          rampVolume(oldPlayer, globalVolume, 0, CROSSFADE_OUT_MS).then(() => {
            try { oldPlayer.pause(); } catch {}
          })
        );
      }

      fadePromises.push(rampVolume(newPlayer, 0, globalVolume, CROSSFADE_IN_MS));

      await Promise.all(fadePromises);
    } catch (err) {
      console.warn(`[Audio] Crossfade to ${track} failed:`, err);
    }
  },

  /**
   * Fade out the current track and stop.
   */
  async fadeOut(durationMs: number = FADE_OUT_MS): Promise<void> {
    if (!currentTrack || !players[currentTrack]) return;

    try {
      const player = players[currentTrack]!;
      await rampVolume(player, globalVolume, 0, durationMs);
      player.pause();
      currentTrack = null;
      notifyListeners();
    } catch (err) {
      console.warn('[Audio] FadeOut failed:', err);
    }
  },

  /**
   * Play a one-shot sound effect (celebration, step complete).
   * Does NOT interrupt the current background track.
   */
  async playOneShot(track: TrackName, volume: number = 0.5): Promise<void> {
    if (!enabled || !players[track]) return;

    try {
      const player = players[track]!;
      player.currentTime = 0;
      player.volume = volume;
      await player.play().catch(() => {});
    } catch (err) {
      console.warn(`[Audio] OneShot ${track} failed:`, err);
    }
  },

  /**
   * Duck the current music volume.
   */
  async duckTo(volume: number, durationMs: number = DUCK_DOWN_MS): Promise<void> {
    if (!currentTrack || !players[currentTrack]) return;
    try {
      await rampVolume(players[currentTrack]!, globalVolume, volume, durationMs);
    } catch {}
  },

  /**
   * Restore volume after ducking.
   */
  async unduck(durationMs: number = DUCK_UP_MS): Promise<void> {
    if (!currentTrack || !players[currentTrack]) return;
    try {
      await rampVolume(players[currentTrack]!, 0, globalVolume, durationMs);
    } catch {}
  },

  /**
   * Pause all playback (page hidden).
   */
  async pause(): Promise<void> {
    if (!currentTrack || !players[currentTrack]) return;
    try {
      players[currentTrack]!.pause();
    } catch {}
  },

  /**
   * Resume playback (page visible).
   */
  async resume(): Promise<void> {
    if (!enabled || !currentTrack || !players[currentTrack]) return;
    try {
      await players[currentTrack]!.play().catch(() => {});
    } catch {}
  },

  /**
   * Enable or disable music globally.
   */
  async setEnabled(value: boolean): Promise<void> {
    enabled = value;
    localStorage.setItem(STORAGE_KEY, String(value));

    if (!value) {
      await audioService.fadeOut(300);
    }
    notifyListeners();
  },

  /**
   * Check if music is enabled.
   */
  isEnabled(): boolean {
    return enabled;
  },

  /**
   * Check if audio has been unlocked by user gesture.
   */
  isUnlocked(): boolean {
    return unlocked;
  },

  /**
   * Get the currently playing track name.
   */
  getCurrentTrack(): TrackName | null {
    return currentTrack;
  },

  /**
   * Subscribe to state changes (for React components).
   */
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  /**
   * Clean up (not normally needed for web).
   */
  cleanup(): void {
    document.removeEventListener('visibilitychange', handleVisibility);
    Object.values(players).forEach((p) => {
      try { p?.pause(); } catch {}
    });
    players = {};
    initialized = false;
  },
};
