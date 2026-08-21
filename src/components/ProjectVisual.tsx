import React, { useState, useEffect } from "react"
import {
  GitBranch,
  TerminalWindow,
  Pulse,
  Broadcast,
  Cpu,
  HardDrives,
  Brain,
  Stack,
  DeviceMobile,
  Lightning
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
    const timer = setInterval(() => {
      // Simulate live jitter for telemetry dashboards
      setCpuVal(Number((28 + Math.random() * 16).toFixed(1)))
      setTransferMb((prev) => (prev >= 160 ? 120 : Number((prev + 2.4).toFixed(1))))
      setSolvedCount((prev) => (prev >= 495 ? 482 : prev + 1))
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  switch (slug) {
    case "leetcode-tracker":
      return (
        <div
          className={`w-full h-full bg-[#0a0a0a] border-b border-hairline flex flex-col justify-between font-mono select-none overflow-hidden relative group/viz ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Top IDE Header Bar */}
          <div className="bg-[#141414] px-4 py-2.5 border-b border-hairline-strong flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-m-blue-light/80" style={{ borderRadius: "0px" }} />
              <span className="w-2.5 h-2.5 bg-hairline" style={{ borderRadius: "0px" }} />
              <span className="w-2.5 h-2.5 bg-hairline" style={{ borderRadius: "0px" }} />
              <span className="text-muted ml-2 text-[11px] font-sans font-bold uppercase tracking-wider">
                WORKSPACE // GIT-SUBTREE
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted">
              <GitBranch size={12} className="text-m-blue-light" />
              <span>main: HEAD</span>
            </div>
          </div>

          {/* Code & Telemetry Canvas */}
          <div className="p-4 space-y-3 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-[#888888] bg-[#111111] p-2 border border-hairline-strong text-[11px]">
              <TerminalWindow size={12} className="text-m-blue-light shrink-0" />
              <span className="text-body-strong">$ git subtree pull --prefix=client origin main</span>
            </div>

            {/* Simulated Progress Analytics */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted uppercase">SOLVED METRICS</span>
                <span className="text-ink font-bold font-mono">{solvedCount} / 500 [96.4%]</span>
              </div>
              {/* BMW M-Stripe Proportion Bar */}
              <div className="h-1.5 w-full bg-[#222222] flex overflow-hidden">
                <div className="h-full bg-m-blue-light w-[45%]" />
                <div className="h-full bg-m-blue-dark w-[35%]" />
                <div className="h-full bg-m-red w-[16%]" />
              </div>
            </div>

            {/* Architecture Subsystem Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[10px]">
              <div className="bg-[#161616] p-2 border border-hairline-strong text-center">
                <div className="text-muted">FRONTEND</div>
                <div className="text-ink font-bold">REACT 19</div>
              </div>
              <div className="bg-[#161616] p-2 border border-hairline-strong text-center">
                <div className="text-muted">BACKEND</div>
                <div className="text-ink font-bold">EXPRESS</div>
              </div>
              <div className="bg-[#161616] p-2 border border-hairline-strong text-center">
                <div className="text-muted">SYNC</div>
                <div className="text-success font-bold">ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-[#111111] px-4 py-1.5 border-t border-hairline-strong flex justify-between text-[10px] text-muted">
            <span className="text-m-blue-light font-bold">LEETCODETRACKER CORE</span>
            <span>REST API · JWT AUTH</span>
          </div>
        </div>
      )

    case "mangoshare-clone":
      return (
        <div
          className={`w-full h-full bg-[#090a0d] border-b border-hairline flex flex-col justify-between font-mono select-none overflow-hidden relative group/viz ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-[#12141a] px-4 py-2.5 border-b border-hairline-strong flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Broadcast size={13} className="text-m-blue-dark animate-pulse" />
              <span className="text-body-strong text-[11px] font-sans font-bold uppercase tracking-wider">
                WEBRTC DATA CHANNEL // P2P
              </span>
            </div>
            <span className="text-[10px] text-success font-mono bg-success/10 px-2 py-0.5 border border-success/30">
              DIRECT STREAM
            </span>
          </div>

          {/* P2P Topology Diagram */}
          <div className="p-4 space-y-3 text-xs">
            {/* Peer Node Visualizer */}
            <div className="flex items-center justify-between gap-2 py-2 px-3 bg-[#11141d] border border-hairline-strong">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-surface-elevated border border-hairline flex items-center justify-center text-ink font-bold text-[10px]">
                  PEER A
                </div>
                <span className="text-[9px] text-muted mt-1">BROWSER</span>
              </div>

              {/* Data Flow Channel with Animated Line */}
              <div className="flex-1 px-2 flex flex-col items-center">
                <div className="flex items-center justify-between w-full text-[9px] text-m-blue-light mb-1">
                  <span>RTCDataChannel</span>
                  <span className="font-mono">24.8 MB/s</span>
                </div>
                <div className="w-full h-[2px] bg-hairline relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red animate-pulse" />
                </div>
                <span className="text-[9px] text-muted mt-1">ZERO RELAY / STUN DIRECT</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-surface-elevated border border-hairline flex items-center justify-center text-ink font-bold text-[10px]">
                  PEER B
                </div>
                <span className="text-[9px] text-muted mt-1">REMOTE</span>
              </div>
            </div>

            {/* Transfer Metrics Gauge */}
            <div className="space-y-1.5 bg-[#10131a] p-2.5 border border-hairline-strong">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted uppercase">CHUNK TRANSMISSION</span>
                <span className="text-ink font-bold font-mono">{transferMb} MB / 160.0 MB</span>
              </div>
              <div className="w-full h-1.5 bg-[#222222] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-m-blue-light to-m-blue-dark transition-all duration-300"
                  style={{ width: `${Math.min(100, (transferMb / 160) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-[#11141d] px-4 py-1.5 border-t border-hairline-strong flex justify-between text-[10px] text-muted">
            <span className="text-m-blue-light font-bold">ICE NEGOTIATION: COMPLETED</span>
            <span>NAT TRAVERSAL: DIRECT</span>
          </div>
        </div>
      )

    case "system-health-dashboard":
      return (
        <div
          className={`w-full h-full bg-[#0a0a0a] border-b border-hairline flex flex-col justify-between font-mono select-none overflow-hidden relative group/viz ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-[#141414] px-4 py-2.5 border-b border-hairline-strong flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Pulse size={13} className="text-m-red animate-pulse" />
              <span className="text-body-strong text-[11px] font-sans font-bold uppercase tracking-wider">
                HARDWARE TELEMETRY // REAL-TIME
              </span>
            </div>
            <span className="text-[10px] text-m-blue-light font-mono bg-m-blue-light/10 px-2 py-0.5 border border-m-blue-light/30">
              1000ms TICK
            </span>
          </div>

          {/* Real-time Hardware Gauges */}
          <div className="p-4 space-y-3 text-xs">
            {/* CPU & Memory Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#121212] p-3 border border-hairline-strong space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted flex items-center gap-1">
                    <Cpu size={11} className="text-m-blue-dark" /> CPU LOAD
                  </span>
                  <span className="text-ink font-bold font-mono">{cpuVal}%</span>
                </div>
                <div className="flex gap-1 h-2">
                  <div className="flex-1 bg-m-blue-light h-full" />
                  <div className={`flex-1 h-full ${cpuVal > 30 ? "bg-m-blue-dark" : "bg-[#222222]"}`} />
                  <div className={`flex-1 h-full ${cpuVal > 40 ? "bg-m-red" : "bg-[#222222]"}`} />
                  <div className="flex-1 bg-[#222222] h-full" />
                </div>
                <div className="text-[9px] text-muted">8 CORES · 3.8 GHz</div>
              </div>

              <div className="bg-[#121212] p-3 border border-hairline-strong space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted flex items-center gap-1">
                    <HardDrives size={11} className="text-m-red" /> MEMORY
                  </span>
                  <span className="text-ink font-bold font-mono">6.4 / 16 GB</span>
                </div>
                <div className="w-full h-2 bg-[#222222] overflow-hidden">
                  <div className="h-full bg-m-red w-[40%]" />
                </div>
                <div className="text-[9px] text-muted">DDR4 DUAL CHANNEL</div>
              </div>
            </div>

            {/* Network / Disk Stream Bar */}
            <div className="bg-[#121212] p-2.5 border border-hairline-strong flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <Lightning size={12} className="text-warning" />
                <span className="text-muted uppercase">DISK I/O:</span>
                <span className="text-ink font-bold font-mono">48.2 MB/s R · 12.1 MB/s W</span>
              </div>
              <span className="text-success font-bold font-mono">HEALTH: 100%</span>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-[#111111] px-4 py-1.5 border-t border-hairline-strong flex justify-between text-[10px] text-muted">
            <span className="text-m-blue-light font-bold">SELF-HOSTED ENGINE</span>
            <span>OS APIS · ZERO CLOUD</span>
          </div>
        </div>
      )

    case "disease-prediction":
      return (
        <div
          className={`w-full h-full bg-[#0a0a0a] border-b border-hairline flex flex-col justify-between font-mono select-none overflow-hidden relative group/viz ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-[#141414] px-4 py-2.5 border-b border-hairline-strong flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Brain size={13} className="text-m-blue-light" />
              <span className="text-body-strong text-[11px] font-sans font-bold uppercase tracking-wider">
                ML CLASSIFICATION PIPELINE // PYTHON
              </span>
            </div>
            <span className="text-[10px] text-ink font-mono bg-surface-elevated px-2 py-0.5 border border-hairline">
              CROSS-VAL: 96.2%
            </span>
          </div>

          {/* ML Pipeline Flowchart */}
          <div className="p-4 space-y-3 text-xs">
            {/* Pipeline Step Boxes */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-[#121212] p-2 border border-hairline-strong">
                <div className="text-muted">INPUT</div>
                <div className="text-ink font-bold mt-0.5">SYMPTOMS [132]</div>
              </div>
              <div className="bg-[#121212] p-2 border border-m-blue-light/40">
                <div className="text-m-blue-light font-bold">MODEL</div>
                <div className="text-ink font-bold mt-0.5">RANDOM FOREST</div>
              </div>
              <div className="bg-[#121212] p-2 border border-hairline-strong">
                <div className="text-muted">OUTPUT</div>
                <div className="text-success font-bold mt-0.5">DIAGNOSIS</div>
              </div>
            </div>

            {/* Probability Breakdown Distribution */}
            <div className="bg-[#111111] p-3 border border-hairline-strong space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted uppercase">PREDICTION CONFIDENCE FIT</span>
                <span className="text-m-blue-light font-bold font-mono">0.964 PROB</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-20 text-muted truncate">PRIMARY COND:</span>
                  <div className="flex-1 h-1.5 bg-[#222222]">
                    <div className="h-full bg-m-blue-light w-[96%]" />
                  </div>
                  <span className="font-mono text-ink text-[9px]">96.4%</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-20 text-muted truncate">SECONDARY:</span>
                  <div className="flex-1 h-1.5 bg-[#222222]">
                    <div className="h-full bg-hairline w-[3%]" />
                  </div>
                  <span className="font-mono text-muted text-[9px]">3.1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-[#111111] px-4 py-1.5 border-t border-hairline-strong flex justify-between text-[10px] text-muted">
            <span className="text-m-blue-light font-bold">SCIKIT-LEARN · PANDAS</span>
            <span>REST INFERENCE API</span>
          </div>
        </div>
      )

    case "daily-quotes-app":
      return (
        <div
          className={`w-full h-full bg-[#0a0a0a] border-b border-hairline flex flex-col justify-between font-mono select-none overflow-hidden relative group/viz ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-[#141414] px-4 py-2.5 border-b border-hairline-strong flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <DeviceMobile size={13} className="text-m-blue-dark" />
              <span className="text-body-strong text-[11px] font-sans font-bold uppercase tracking-wider">
                FLUTTER CLIENT // CROSS-PLATFORM
              </span>
            </div>
            <span className="text-[10px] text-muted font-mono bg-surface-elevated px-2 py-0.5 border border-hairline">
              IOS / ANDROID
            </span>
          </div>

          {/* Mobile UI Wireframe Specimen */}
          <div className="p-4 space-y-3 text-xs">
            {/* Card Mockup */}
            <div className="bg-[#121212] p-3 border border-hairline-strong flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-[10px] label-uppercase text-m-blue-light tracking-[1px]">
                  QUOTE OF THE DAY
                </div>
                <div className="text-ink font-sans font-bold text-xs leading-snug">
                  "Engineered for performance, designed for precision."
                </div>
                <div className="text-[10px] text-muted font-sans">— CURATED COLLECTION</div>
              </div>
              <div className="w-7 h-7 bg-surface-elevated border border-hairline flex items-center justify-center text-m-blue-light shrink-0">
                <Lightning size={14} />
              </div>
            </div>

            {/* Architecture Split Tags */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#111111] p-2 border border-hairline-strong flex items-center justify-between">
                <span className="text-muted">STATE:</span>
                <span className="text-ink font-bold">DECOUPLED</span>
              </div>
              <div className="bg-[#111111] p-2 border border-hairline-strong flex items-center justify-between">
                <span className="text-muted">CADENCE:</span>
                <span className="text-ink font-bold">24H SYNC</span>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-[#111111] px-4 py-1.5 border-t border-hairline-strong flex justify-between text-[10px] text-muted">
            <span className="text-m-blue-light font-bold">DART RUNTIME</span>
            <span>CLEAN ARCHITECTURE</span>
          </div>
        </div>
      )

    default:
      return (
        <div className={`w-full h-full bg-[#0a0a0a] border-b border-hairline flex items-center justify-center p-8 text-center ${className}`}>
          <div className="space-y-2">
            <Stack size={24} className="text-m-blue-light mx-auto" />
            <div className="text-ink font-bold text-sm uppercase">{title}</div>
            <div className="text-muted text-xs font-mono">ENGINEERING ARCHITECTURE</div>
          </div>
        </div>
      )
  }
}

export default ProjectVisual
