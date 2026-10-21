// Lightweight Web Audio API synthesizer for subtle engineered UI sound effects
// Zero external sound assets needed — 100% synthesized in real-time.

class SoundFX {
  private ctx: AudioContext | null = null
  private enabled = false
  private listeners: ((enabled: boolean) => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio-sound-enabled")
      this.enabled = stored === "true"
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public subscribe(fn: (enabled: boolean) => void): () => void {
    this.listeners.push(fn)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-sound-enabled", String(this.enabled))
    }
    this.listeners.forEach((fn) => fn(this.enabled))
    if (this.enabled) {
      this.init()
      this.playMechanicalClick(1400, 0.03, 0.08)
    }
    return this.enabled
  }

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx?.state === "suspended") {
      this.ctx.resume().catch(() => {})
    }
  }

  // Synthesize tactile lubricated mechanical switch click
  private playMechanicalClick(freq = 1200, duration = 0.025, volume = 0.05) {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(120, now + duration)

      gain.gain.setValueAtTime(volume, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + duration)
    } catch {
      // Ignore audio synthesis errors
    }
  }

  public hover() {
    if (!this.enabled) return
    this.playMechanicalClick(1800, 0.015, 0.02)
  }

  public click() {
    this.playMechanicalClick(1100, 0.028, 0.06)
  }

  public switchTab() {
    this.playMechanicalClick(950, 0.03, 0.05)
  }

  public openModal() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.06)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.06)
    } catch (_err) { void _err }
  }

  public success() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    try {
      const now = this.ctx.currentTime
      const playTone = (freq: number, start: number, dur: number) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, start)
        gain.gain.setValueAtTime(0.04, start)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(start)
        osc.stop(start + dur)
      }
      playTone(523.25, now, 0.06)
      playTone(659.25, now + 0.06, 0.08)
    } catch (_err) { void _err }
  }
}

export const sound = new SoundFX()
