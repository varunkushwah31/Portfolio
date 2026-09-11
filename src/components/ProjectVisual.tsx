import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
  DesktopIcon,
  FileArchiveIcon,
  LockKeyIcon,
  CheckCircleIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react"

interface ProjectVisualProps {
  slug: string
  title: string
  className?: string
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ slug, title, className = "" }) => {
  // Real-time simulated telemetry states for dynamic visualizations
  const [cpuVal, setCpuVal] = useState(34.2)
  const [transferMb, setTransferMb] = useState(136.4)
  const [solvedCount, setSolvedCount] = useState(482)
  const [speedVal, setSpeedVal] = useState(28.4)
  const [rttVal, setRttVal] = useState(1.4)

  useEffect(() => {
    const cpuSteps = [34.2, 38.6, 31.8, 42.4, 29.5, 36.1, 40.8, 33.4]
    const speedSteps = [27.8, 29.4, 31.2, 28.6, 32.5, 30.1, 28.4]
    const rttSteps = [1.3, 1.5, 1.2, 1.4, 1.6, 1.3]
    let step = 0
    const timer = setInterval(() => {
      // Simulate live jitter for telemetry dashboards
      step = (step + 1) % cpuSteps.length
      setCpuVal(cpuSteps[step])
      setSpeedVal(speedSteps[step % speedSteps.length])
      setRttVal(rttSteps[step % rttSteps.length])
      setTransferMb((prev) => (prev >= 158 ? 112 : Number((prev + 3.2).toFixed(1))))
      setSolvedCount((prev) => (prev >= 495 ? 482 : prev + 1))
    }, 1200)
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
              <GitBranchIcon size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>main: HEAD</span>
            </div>
          </div>

          {/* Code & Telemetry Canvas */}
          <div className="p-4 sm:p-5 space-y-3.5 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-body bg-surface-soft p-2.5 rounded-lg border border-hairline text-[11px]">
              <TerminalWindowIcon size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
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
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-sans">LeetcodeTracker Core</span>
            <span>REST API · JWT AUTH</span>
          </div>
        </div>
      )

    case "w2wshare":
    case "w2w-share":
    case "mangoshare-clone": {
      const progressPercent = Math.min(100, Math.round((transferMb / 160) * 100))
      const totalChunks = 24
      const completedChunks = Math.floor((transferMb / 160) * totalChunks)

      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "380px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-3 border-b border-hairline flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 ml-1.5">
                <BroadcastIcon size={15} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span className="text-body-strong text-xs font-sans font-semibold tracking-wider">
                  WEBRTC DATA CHANNEL // P2P ZERO-RELAY PIPELINE
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                <LockKeyIcon size={12} weight="bold" />
                AES-256-GCM
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono bg-surface-card px-2.5 py-0.5 rounded-full border border-hairline font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ICE: DIRECT HOST
              </span>
            </div>
          </div>

          {/* Main Visualizer Body */}
          <div className="p-4 sm:p-5 space-y-4 text-xs">
            {/* 1. PEER A <----> PEER B TOPOLOGY HIGHWAY */}
            <div className="bg-surface-soft p-4 rounded-xl border border-hairline relative overflow-hidden">
              {/* Subtle background ambient mesh glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-12 bg-emerald-500/5 blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                {/* Peer A Node */}
                <div className="w-full md:w-48 bg-surface-card p-3 rounded-xl border border-hairline/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <DesktopIcon size={15} weight="bold" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">PEER A</div>
                        <div className="text-[10px] text-muted font-sans uppercase">SENDER</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      HOST
                    </span>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono text-muted pt-1 border-t border-hairline/50">
                    <div className="flex justify-between">
                      <span>IP:</span>
                      <span className="text-body font-semibold">192.168.1.14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIENT:</span>
                      <span className="text-body font-semibold">Chromium 128</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STREAM:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ACTIVE SINK</span>
                    </div>
                  </div>
                </div>

                {/* Data Highway (Conduit + Animated Packets) */}
                <div className="flex-1 w-full px-2 sm:px-4 py-2 flex flex-col items-center justify-center">
                  {/* Highway Labels */}
                  <div className="flex items-center justify-between w-full text-[11px] mb-2 font-sans">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      <ArrowsLeftRightIcon size={13} />
                      <span>RTCDataChannel</span>
                      <span className="text-muted text-[10px] hidden sm:inline">(SCTP reliable)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                        {speedVal.toFixed(1)} MB/s
                      </span>
                      <span className="text-[10px] text-muted font-mono">({rttVal.toFixed(1)}ms RTT)</span>
                    </div>
                  </div>

                  {/* Highway Pipe with Flowing Packets */}
                  <div className="w-full h-3 bg-surface-elevated rounded-full relative overflow-hidden border border-hairline flex items-center">
                    {/* Underlying Flow Beam */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-sky-400/40 to-indigo-500/30" />

                    {/* Animated Traveling Packets */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                        animate={{ left: ["0%", "98%"], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.36,
                        }}
                      />
                    ))}
                  </div>

                  {/* Highway Sub-badges */}
                  <div className="flex items-center justify-between w-full text-[10px] text-muted mt-2 font-sans">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400/90 font-mono">
                      <CheckCircleIcon size={12} weight="fill" />
                      ZERO TURN RELAY · DIRECT P2P
                    </span>
                    <span className="font-mono text-muted hidden sm:inline">64 KB CHUNK SIZE</span>
                  </div>
                </div>

                {/* Peer B Node */}
                <div className="w-full md:w-48 bg-surface-card p-3 rounded-xl border border-hairline/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                        <DesktopIcon size={15} weight="bold" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">PEER B</div>
                        <div className="text-[10px] text-muted font-sans uppercase">RECEIVER</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                      TARGET
                    </span>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono text-muted pt-1 border-t border-hairline/50">
                    <div className="flex justify-between">
                      <span>IP:</span>
                      <span className="text-body font-semibold">192.168.1.42</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIENT:</span>
                      <span className="text-body font-semibold">Firefox 130</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DISK IO:</span>
                      <span className="text-sky-600 dark:text-sky-400 font-semibold">0-COPY FLUSH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. FILE TRANSMISSION & CHUNK STREAMING MATRIX */}
            <div className="bg-surface-soft p-4 rounded-xl border border-hairline space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-xs">
                    <FileArchiveIcon size={18} weight="bold" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-ink font-mono">
                      archive_distribution_v4.tar.gz
                    </div>
                    <div className="text-[10px] text-muted font-sans">
                      160.0 MB · SHA-256 Verified On-the-Fly
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-ink">
                    <span className="text-emerald-600 dark:text-emerald-400">{transferMb.toFixed(1)} MB</span> / 160.0 MB
                  </div>
                  <div className="text-[10px] text-muted font-mono font-medium">
                    {progressPercent}% COMPLETE · ~0.8s REMAINING
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-surface-elevated rounded-full overflow-hidden border border-hairline/60 relative">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-sky-400 to-emerald-400 transition-all duration-300 rounded-full relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>

              {/* SCTP 64KB Chunk Packet Map */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] text-muted mb-2 font-mono">
                  <span className="uppercase tracking-wider">SCTP CHUNK MAP (64 KB PACKETS)</span>
                  <span className="text-body font-semibold">
                    {completedChunks} / {totalChunks} BLOCKS TRANSFERRED
                  </span>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 sm:gap-1.5">
                  {Array.from({ length: totalChunks }).map((_, idx) => {
                    const isDone = idx < completedChunks
                    const isCurrent = idx === completedChunks
                    return (
                      <div
                        key={idx}
                        className={`h-4 rounded-sm transition-all duration-200 ${
                          isDone
                            ? "bg-emerald-500/85 shadow-[0_0_6px_rgba(16,185,129,0.35)]"
                            : isCurrent
                            ? "bg-sky-400 animate-pulse border border-sky-300"
                            : "bg-surface-elevated border border-hairline/60"
                        }`}
                        title={`Chunk #${idx + 1}: ${isDone ? "Delivered" : isCurrent ? "In Flight" : "Queued"}`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 3. DISTRIBUTED SYSTEMS TELEMETRY GAUGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">THROUGHPUT</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm mt-1">
                  {speedVal.toFixed(1)} MB/s
                </span>
                <span className="text-[9px] text-muted mt-0.5">Peak: 34.8 MB/s</span>
              </div>

              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">ROUND-TRIP (RTT)</span>
                <span className="text-ink font-bold font-mono text-sm mt-1">
                  {rttVal.toFixed(1)} ms
                </span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5">0 Relay Hops</span>
              </div>

              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">RAM FOOTPRINT</span>
                <span className="text-ink font-bold font-mono text-sm mt-1">&lt; 50 MB</span>
                <span className="text-[9px] text-muted mt-0.5">StreamSaver Sink</span>
              </div>

              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">PACKET LOSS</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm mt-1">0.00%</span>
                <span className="text-[9px] text-muted mt-0.5">SCTP Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2.5 border-t border-hairline flex flex-wrap justify-between items-center gap-2 text-[11px] text-muted">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircleIcon size={13} weight="fill" />
              <span className="font-semibold font-sans">STUN NAT Traversal: Host Candidate (LAN Direct)</span>
            </div>
            <span className="font-mono">In-Memory ArrayBuffer Bypass · Zero Server Ingress</span>
          </div>
        </div>
      )
    }

    case "system-health-dashboard":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "220px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-2.5 border-b border-hairline flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <PulseIcon size={14} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span className="text-body-strong text-[11px] font-sans font-semibold tracking-wider">
                HARDWARE TELEMETRY // REAL-TIME
              </span>
            </div>
            <span className="text-[10px] text-sky-700 dark:text-sky-400 font-mono bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20 font-medium">
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
                    <CpuIcon size={13} className="text-emerald-600 dark:text-emerald-400" /> CPU
                  </span>
                  <span className="text-ink font-bold font-mono">{cpuVal}%</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${cpuVal}%` }}
                  />
                </div>
                <div className="text-[10px] text-muted font-sans">8 Cores · 3.8 GHz</div>
              </div>

              <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted flex items-center gap-1.5 font-sans">
                    <HardDrivesIcon size={13} className="text-sky-600 dark:text-sky-400" /> Memory
                  </span>
                  <span className="text-ink font-bold font-mono">6.4 / 16 GB</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[40%] rounded-full" />
                </div>
                <div className="text-[10px] text-muted font-sans">DDR4 Dual Channel</div>
              </div>
            </div>

            {/* Network / Disk Stream Bar */}
            <div className="bg-surface-soft p-3 rounded-xl border border-hairline flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <LightningIcon size={14} className="text-amber-600 dark:text-amber-400" />
                <span className="text-muted font-sans">Disk I/O:</span>
                <span className="text-ink font-bold font-mono">48.2 MB/s R · 12.1 MB/s W</span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">100% OK</span>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2 border-t border-hairline flex justify-between text-[11px] text-muted">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-sans">Self-Hosted Daemon</span>
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
              <BrainIcon size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-body-strong text-[11px] font-sans font-semibold tracking-wider">
                ML CLASSIFICATION // PYTHON
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
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
                <div className="text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-semibold">MODEL</div>
                <div className="text-ink font-bold mt-0.5">RANDOM FOREST</div>
              </div>
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
                <div className="text-muted text-[10px] font-sans">OUTPUT</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">DIAGNOSIS</div>
              </div>
            </div>

            {/* Probability Breakdown Distribution */}
            <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted font-sans text-[10px] uppercase tracking-wider">Prediction Confidence</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">0.964 PROB</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-sans">
                  <span className="w-24 text-muted truncate">Primary Diagnosis:</span>
                  <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[96.4%] rounded-full" />
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
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-sans">Scikit-Learn · Pandas</span>
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
              <DeviceMobileIcon size={14} className="text-sky-600 dark:text-sky-400" />
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
                <div className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Quote of the Day
                </div>
                <div className="text-ink font-semibold text-xs sm:text-sm leading-snug">
                  "Engineered for performance, designed for precision."
                </div>
                <div className="text-[10px] text-muted">— Curated Daily Collection</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface-card border border-hairline flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 shadow-xs">
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
            <span className="text-sky-600 dark:text-sky-400 font-semibold font-sans">Dart / Flutter Runtime</span>
            <span>Decoupled Repository Pattern</span>
          </div>
        </div>
      )

    case "site-look":
      return (
        <div
          className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex flex-col justify-between font-mono select-none overflow-hidden relative shadow-sm ${className}`}
          style={{ minHeight: "380px" }}
        >
          {/* Header Bar */}
          <div className="bg-surface-elevated px-4 py-3 border-b border-hairline flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 ml-1.5">
                <PulseIcon size={15} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span className="text-body-strong text-xs font-sans font-semibold tracking-wider">
                  SPRING BOOT 4.1 // JAVA 25 VIRTUAL THREADS ENGINE
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                <CheckCircleIcon size={12} weight="bold" />
                CIRCUIT BREAKER: CLOSED
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono bg-surface-card px-2.5 py-0.5 rounded-full border border-hairline font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LOOM: 1,000+ VTHREADS
              </span>
            </div>
          </div>

          {/* Main Inspection Canvas */}
          <div className="p-4 sm:p-5 space-y-4 text-xs">
            {/* 1. Terminal / Engine Command Dispatcher */}
            <div className="flex items-center justify-between text-body bg-surface-soft p-3 rounded-xl border border-hairline text-[11px]">
              <div className="flex items-center gap-2.5 truncate">
                <TerminalWindowIcon size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-body-strong font-mono truncate">
                  $ java --enable-preview -jar site-look.jar --engine=dual(jsoup+playwright)
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold shrink-0 ml-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                200 OK · 18ms
              </span>
            </div>

            {/* 2. Dual Scraping & Pipeline Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Jsoup L1 Static */}
              <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted font-sans font-medium uppercase text-[10px]">L1 STATIC SCANNER</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">12ms</span>
                </div>
                <div className="text-ink font-bold text-xs">Jsoup DOM Parser</div>
                <p className="text-[10px] text-muted leading-tight font-sans">
                  Raw HTML, OpenGraph tags, semantic headers &amp; schema microdata.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircleIcon size={11} weight="bold" />
                  <span>STREAMING PASS</span>
                </div>
              </div>

              {/* Playwright L2 Headless */}
              <div className="bg-surface-soft p-3 rounded-xl border border-emerald-500/30 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans font-semibold uppercase text-[10px]">L2 DYNAMIC SCANNER</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">310ms</span>
                </div>
                <div className="text-ink font-bold text-xs">Headless Chromium SPA</div>
                <p className="text-[10px] text-muted leading-tight font-sans">
                  Hydrated DOM, client bundle footprint, dynamic layout shifts &amp; console traps.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircleIcon size={11} weight="bold" />
                  <span>PLAYWRIGHT 1.52</span>
                </div>
              </div>

              {/* PDF & Export Pipeline */}
              <div className="bg-surface-soft p-3 rounded-xl border border-hairline space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted font-sans font-medium uppercase text-[10px]">REPORT SYNTHESIS</span>
                  <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">45ms</span>
                </div>
                <div className="text-ink font-bold text-xs">OpenPDF Generator</div>
                <p className="text-[10px] text-muted leading-tight font-sans">
                  Audit summary, WCAG accessibility violations &amp; executive vector charts.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[9px] font-mono text-sky-600 dark:text-sky-400">
                  <CheckCircleIcon size={11} weight="bold" />
                  <span>VECTOR READY</span>
                </div>
              </div>
            </div>

            {/* 3. Live Audited Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">CONCURRENCY</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm mt-1">
                  1,000+ VThreads
                </span>
                <span className="text-[9px] text-muted mt-0.5">Zero Thread Starvation</span>
              </div>

              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">REDIS CACHE</span>
                <span className="text-ink font-bold font-mono text-sm mt-1">CACHE HIT</span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-0.5">TTL: 24h Expire</span>
              </div>

              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">MONGO ATLAS</span>
                <span className="text-ink font-bold font-mono text-sm mt-1">STORED</span>
                <span className="text-[9px] text-muted mt-0.5">Time-Series Audit Log</span>
              </div>

              <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline flex flex-col justify-between">
                <span className="text-[10px] text-muted font-sans font-medium uppercase">RESILIENCE4J</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm mt-1">
                  PROTECTED
                </span>
                <span className="text-[9px] text-muted mt-0.5">Token Bucket Rate Limiter</span>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-surface-elevated px-4 py-2.5 border-t border-hairline flex flex-wrap justify-between items-center gap-2 text-[11px] text-muted">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircleIcon size={13} weight="fill" />
              <span className="font-semibold font-sans">OpenTelemetry &amp; Micrometer Tracing Active</span>
            </div>
            <span className="font-mono">Java 25 (OpenJDK 64-Bit Server VM) · Spring Boot 4.1.0</span>
          </div>
        </div>
      )

    default:
      return (
        <div className={`w-full h-full bg-surface-card border border-hairline rounded-2xl flex items-center justify-center p-8 text-center ${className}`}>
          <div className="space-y-2">
            <StackIcon size={28} className="text-emerald-600 dark:text-emerald-400 mx-auto" />
            <div className="text-ink font-bold text-base">{title}</div>
            <div className="text-muted text-xs font-mono">System Architecture Specification</div>
          </div>
        </div>
      )
  }
}

export default ProjectVisual
