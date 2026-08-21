// Lightweight Web Audio API synthesizer for subtle engineered UI sound effects
// Zero external sound assets needed — 100% synthesized in real-time.

class SoundFX {
  private ctx: AudioContext | null = null
  private enabled = false

  constructor() {
    // Check localStorage preference (default: muted for accessibility & low noise)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bmw-m-audio-enabled")
      this.enabled = stored === "true"
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== "undefined") {
      localStorage.setItem("bmw-m-audio-enabled", String(this.enabled))
    }
    if (this.enabled) {
      this.init()
      this.playBeep(880, 0.04, "sine", 0.05)
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

  private playBeep(freq: number, duration: number, type: OscillatorType = "sine", gainVal = 0.03) {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // Ignore audio synthesis errors silently
    }
  }

  public hover() {
    this.playBeep(1200, 0.02, "sine", 0.015)
  }

  public click() {
    this.playBeep(600, 0.04, "triangle", 0.04)
  }

  public switchTab() {
    this.playBeep(900, 0.03, "sine", 0.025)
  }

  public openModal() {
    this.playBeep(440, 0.06, "sine", 0.03)
  }

  public success() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    this.playBeep(523.25, 0.05, "sine", 0.03)
    setTimeout(() => this.playBeep(659.25, 0.08, "sine", 0.03), 60)
  }
}

export const sound = new SoundFX()
