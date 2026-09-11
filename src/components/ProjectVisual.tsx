import React, { useState, useEffect } from "react"
import {
  GitBranchIcon,
  TerminalWindowIcon,
  PulseIcon,
  BroadcastIcon,
  CpuIcon,
  HardDrivesIcon,
  BrainIcon,
  StackIcon,
  DeviceMobileIcon,
  LightningIcon,
} from "@phosphor-icons/react"

interface ProjectVisualProps {
  slug: string
  title: string
  className?: string
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ slug, title, className = "" }) => {
  // Real-time simulated telemetry states for dynamic visualizations
  const [cpuVal, setCpuVal] = useState(34.2)
  const [transferMb, setTransferMb] = useState(142.6)
  const [solvedCount, setSolvedCount] = useState(482)

  useEffect(() => {
    const cpuSteps = [34.2, 38.6, 31.8, 42.4, 29.5, 36.1, 40.8, 33.4]
    let step = 0
    const timer = setInterval(() => {
      // Simulate live jitter for telemetry dashboards
      step = (step + 1) % cpuSteps.length
      setCpuVal(cpuSteps[step])
      setTransferMb((prev) => (prev >= 160 ? 120 : Number((prev + 2.4).toFixed(1))))
      setSolvedCount((prev) => (prev >= 495 ? 482 : prev + 1))
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  switch (slug) {
    case "leetcode-tracker":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Top IDE Header Bar */}
          <div className="bg-surface-elevated px-4 py-2.5 border-b border-hairline flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-muted ml-2 text-[11px] font-sans font-semibold tracking-wider">
                WORKSPACE // GIT-SUBTREE
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <GitBranchIcon size={13} className="text-emerald-400" />
              <span>main: HEAD</span>
            </div>
          </div>

          {/* Code & Telemetry Canvas */}
          <div className="p-4 sm:p-5 space-y-3.5 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-body bg-surface-soft p-2.5 rounded-lg border border-hairline text-[11px]">
              <TerminalWindowIcon size={14} className="text-emerald-400 shrink-0" />
              <span className="text-body-strong font-mono">$ git subtree pull --prefix=client origin main</span>
            </div>

            {/* Simulated Progress Analytics */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted font-sans font-medium uppercase tracking-wider">Solved Problems Progress</span>
                <span className="text-ink font-bold font-mono">{solvedCount} / 500 [96.4%]</span>
              </div>
              {/* Progress Proportion Bar */}
              <div className="h-2 w-full bg-surface-elevated rounded-full flex overflow-hidden">
                <div className="h-full bg-emerald-500 w-[55%]" title="Easy" />
                <div className="h-full bg-sky-500 w-[30%]" title="Medium" />
                <div className="h-full bg-amber-500 w-[15%]" title="Hard" />
              </div>
            </div>

            {/* Architecture Subsystem Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="bg-surface-soft p-2.5 rounded-lg border border-hairline text-center">
                <div className="text-muted text-[10px]">FRONTEND</div>
                <div className="text-ink font-bold mt-0.5">REACT 19</div>
              </div>
              <div className="bg-surface-soft p-2.5 rounded-lg border border-hairline text-center">
                <div className="text-muted text-[10px]">BACKEND</div>
                <div className="text-ink font-bold mt-0.5">EXPRESS</div>
              </div>
              <div className="bg-surface-soft p-2.5 rounded-lg border border-hairline text-center">
                <div className="text-muted text-[10px]">SYNC</div>
                <div className="text-emerald-400 font-bold mt-0.5">ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-emerald-400 font-semibold font-sans">LeetcodeTracker Core</span>
            <span>REST API · JWT AUTH</span>
          </div>
        </div>
      )

    case "w2wshare":
    case "w2w-share":
    case "mangoshare-clone":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-2.5 border-b border-hairline flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BroadcastIcon size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-body-strong text-[11px] font-sans font-semibold tracking-wider">
                WEBRTC DATA CHANNEL // W2W SHARE
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              AES-256-GCM DIRECT
            </span>
          </div>

          {/* P2P Topology Diagram */}
          <div className="p-4 sm:p-5 space-y-3.5 text-xs">
            {/* Peer Node Visualizer */}
            <div className="flex items-center justify-between gap-2 py-3 px-4 bg-surface-soft rounded-xl border border-hairline">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl bg-surface-card border border-hairline flex items-center justify-center text-ink font-bold text-xs shadow-xs">
                  PEER A
                </div>
                <span className="text-[10px] text-muted mt-1 font-sans">SENDER</span>
              </div>

              {/* Data Flow Channel with Animated Line */}
              <div className="flex-1 px-3 flex flex-col items-center">
                <div className="flex items-center justify-between w-full text-[10px] text-emerald-400 mb-1.5 font-sans">
                  <span>RTCDataChannel</span>
                  <span className="font-mono font-medium">24.8 MB/s</span>
                </div>
                <div className="w-full h-1 bg-surface-elevated rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-muted mt-1.5 font-sans">OFFLINE P2P · ZERO RELAY</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl bg-surface-card border border-hairline flex items-center justify-center text-ink font-bold text-xs shadow-xs">
                  PEER B
                </div>
                <span className="text-[10px] text-muted mt-1 font-sans">RECEIVER</span>
              </div>
            </div>

            {/* Transfer Metrics Gauge */}
            <div className="space-y-1.5 bg-surface-soft p-3 rounded-xl border border-hairline">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted font-sans uppercase tracking-wider text-[10px]">Encrypted Stream Progress</span>
                <span className="text-ink font-bold font-mono">{transferMb} MB / 160.0 MB</span>
              </div>
              <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, (transferMb / 160) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-emerald-400 font-semibold font-sans">ICE: Connected</span>
            <span>Zero Memory Footprint Streaming</span>
          </div>
        </div>
      )

    case "system-health-dashboard":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-2.5 border-b border-hairline flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <PulseIcon size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-body-strong text-[11px] font-sans font-semibold tracking-wider">
                HARDWARE TELEMETRY // REAL-TIME
              </span>
            </div>
            <span className="text-[10px] text-sky-400 font-mono bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20 font-medium">
              1000ms TICK
            </span>
          </div>

          {/* Real-time Hardware Gauges */}
          <div className="p-4 sm:p-5 space-y-3.5 text-xs">
            {/* CPU & Memory Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted flex items-center gap-1.5 font-sans">
                    <CpuIcon size={13} className="text-emerald-400" /> CPU
                  </span>
                  <span className="text-ink font-bold font-mono">{cpuVal}%</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${cpuVal}%` }}
                  />
                </div>
                <div className="text-[10px] text-muted font-sans">8 Cores · 3.8 GHz</div>
              </div>

              <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted flex items-center gap-1.5 font-sans">
                    <HardDrivesIcon size={13} className="text-sky-400" /> Memory
                  </span>
                  <span className="text-ink font-bold font-mono">6.4 / 16 GB</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 w-[40%] rounded-full" />
                </div>
                <div className="text-[10px] text-muted font-sans">DDR4 Dual Channel</div>
              </div>
            </div>

            {/* Network / Disk Stream Bar */}
            <div className="bg-surface-soft p-3 rounded-xl border border-hairline flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <LightningIcon size={14} className="text-amber-400" />
                <span className="text-muted font-sans">Disk I/O:</span>
                <span className="text-ink font-bold font-mono">48.2 MB/s R · 12.1 MB/s W</span>
              </div>
              <span className="text-emerald-400 font-bold font-mono">100% OK</span>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-emerald-400 font-semibold font-sans">Self-Hosted Daemon</span>
            <span>OS APIs · Zero Cloud Overhead</span>
          </div>
        </div>
      )

    case "disease-prediction":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-2.5 border-b border-hairline flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BrainIcon size={14} className="text-emerald-400" />
              <span className="text-body-strong text-[11px] font-sans font-semibold tracking-wider">
                ML CLASSIFICATION // PYTHON
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              CROSS-VAL: 96.2%
            </span>
          </div>

          {/* ML Pipeline Flowchart */}
          <div className="p-4 sm:p-5 space-y-3.5 text-xs">
            {/* Pipeline Step Boxes */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
                <div className="text-muted text-[10px] font-sans">INPUT</div>
                <div className="text-ink font-bold mt-0.5">SYMPTOMS [132]</div>
              </div>
              <div className="bg-surface-soft p-2.5 rounded-xl border border-emerald-500/30">
                <div className="text-emerald-400 text-[10px] font-sans font-semibold">MODEL</div>
                <div className="text-ink font-bold mt-0.5">RANDOM FOREST</div>
              </div>
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
                <div className="text-muted text-[10px] font-sans">OUTPUT</div>
                <div className="text-emerald-400 font-bold mt-0.5">DIAGNOSIS</div>
              </div>
            </div>

            {/* Probability Breakdown Distribution */}
            <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted font-sans text-[10px] uppercase tracking-wider">Prediction Confidence</span>
                <span className="text-emerald-400 font-bold font-mono">0.964 PROB</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-sans">
                  <span className="w-24 text-muted truncate">Primary Diagnosis:</span>
                  <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[96.4%] rounded-full" />
                  </div>
                  <span className="font-mono text-ink text-[10px] font-semibold">96.4%</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-sans">
                  <span className="w-24 text-muted truncate">Alternative:</span>
                  <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="h-full bg-hairline w-[3.6%] rounded-full" />
                  </div>
                  <span className="font-mono text-muted text-[10px]">3.6%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-emerald-400 font-semibold font-sans">Scikit-Learn · Pandas</span>
            <span>REST Inference Serving</span>
          </div>
        </div>
      )

    case "daily-quotes-app":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-2.5 border-b border-hairline flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <DeviceMobileIcon size={14} className="text-sky-400" />
              <span className="text-body-strong text-[11px] font-sans font-semibold tracking-wider">
                FLUTTER CLIENT // MOBILE UI
              </span>
            </div>
            <span className="text-[10px] text-muted font-mono bg-surface-soft px-2.5 py-0.5 rounded-full border border-hairline">
              iOS / Android
            </span>
          </div>

          {/* Mobile UI Wireframe Specimen */}
          <div className="p-4 sm:p-5 space-y-3.5 text-xs">
            {/* Card Mockup */}
            <div className="bg-surface-soft p-3.5 rounded-xl border border-hairline flex items-start justify-between gap-3">
              <div className="space-y-1 font-sans">
                <div className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider">
                  Quote of the Day
                </div>
                <div className="text-ink font-semibold text-xs sm:text-sm leading-snug">
                  "Engineered for performance, designed for precision."
                </div>
                <div className="text-[10px] text-muted">— Curated Daily Collection</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-sky-400 shrink-0 shadow-xs">
                <LightningIcon size={15} />
              </div>
            </div>

            {/* Architecture Split Tags */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex items-center justify-between">
                <span className="text-muted font-sans">STATE:</span>
                <span className="text-ink font-bold font-mono">CLEAN</span>
              </div>
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex items-center justify-between">
                <span className="text-muted font-sans">CADENCE:</span>
                <span className="text-ink font-bold font-mono">24H SYNC</span>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-sky-400 font-semibold font-sans">Dart / Flutter Runtime</span>
            <span>Decoupled Repository Pattern</span>
          </div>
        </div>
      )

    default:
      return (
        <div className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex items-center justify-center p-8 text-center ${className}`}>
          <div className="space-y-2">
            <StackIcon size={28} className="text-emerald-400 mx-auto" />
            <div className="text-ink font-bold text-base">{title}</div>
            <div className="text-muted text-xs font-mono">System Architecture Specification</div>
          </div>
        </div>
      )
  }
}

export default ProjectVisual
