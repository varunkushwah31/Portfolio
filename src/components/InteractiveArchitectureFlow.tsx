import React, { useState, useEffect, useRef } from "react"
import { PlayIcon, ArrowsClockwiseIcon, CheckCircleIcon, TerminalWindowIcon } from "@phosphor-icons/react"
import type { ArchitectureNode } from "@/data/projects"
import SpotlightCard from "@/components/gsap/SpotlightCard"
import { sound } from "@/lib/sound"

interface InteractiveArchitectureFlowProps {
  flow: ArchitectureNode[]
  projectTitle: string
}

export const InteractiveArchitectureFlow: React.FC<InteractiveArchitectureFlowProps> = ({
  flow,
  projectTitle,
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [telemetryLog, setTelemetryLog] = useState<string[]>([])
  const simTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stepDetails: Record<number, { latency: string; protocol: string; telemetry: string }> = {
    0: { latency: "1.2ms", protocol: "TLS 1.3 / HTTP/2", telemetry: "Payload validated & JWT signed" },
    1: { latency: "3.4ms", protocol: "Java 21 VThread", telemetry: "Spring security barrier passed · Worker allocated" },
    2: { latency: "0.4ms", protocol: "Redis RESP3", telemetry: "Distributed Lock Acquired · Cache hit (TTL 24h)" },
    3: { latency: "6.8ms", protocol: "SCTP / WebRTC", telemetry: "Zero-copy streaming pipeline flushed · 200 OK" },
  }

  const startSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setActiveStep(0)
    setTelemetryLog([`[${new Date().toLocaleTimeString()}] INITIATING PIPELINE SIMULATION FOR ${projectTitle}...`])
    sound.click()

    const runStep = (step: number) => {
      setActiveStep(step)
      const detail = stepDetails[step] || { latency: "2ms", protocol: "TCP", telemetry: "Processed" }
      setTelemetryLog((prev) => [
        ...prev,
        `[Phase ${flow[step]?.step || step + 1}] ${flow[step]?.title} (${detail.protocol}) -> Latency: ${detail.latency} | ${detail.telemetry}`,
      ])
      sound.switchTab()

      if (step < flow.length - 1) {
        simTimeoutRef.current = setTimeout(() => {
          runStep(step + 1)
        }, 900)
      } else {
        simTimeoutRef.current = setTimeout(() => {
          setIsSimulating(false)
          setTelemetryLog((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] PIPELINE VERIFIED SUCCESSFULLY: 11.8ms End-to-End Latency. Zero Dropped Packets.`,
          ])
          sound.success()
        }, 800)
      }
    }

    simTimeoutRef.current = setTimeout(() => {
      runStep(0)
    }, 400)
  }

  const resetSimulation = () => {
    if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current)
    setIsSimulating(false)
    setActiveStep(null)
    setTelemetryLog([])
    sound.click()
  }

  useEffect(() => {
    return () => {
      if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current)
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Header with Simulate Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
            Interactive Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            Pipeline Lifecycle &amp; Telemetry
          </h2>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={startSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all cursor-pointer shadow-xs ${
              isSimulating
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                : "bg-ink text-canvas hover:opacity-90"
            }`}
          >
            <PlayIcon size={13} weight={isSimulating ? "fill" : "bold"} className={isSimulating ? "animate-pulse" : ""} />
            <span>{isSimulating ? "Simulating Request..." : "Simulate Request"}</span>
          </button>

          {activeStep !== null && (
            <button
              type="button"
              onClick={resetSimulation}
              className="p-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-muted hover:text-ink transition-colors cursor-pointer"
              title="Reset simulation"
            >
              <ArrowsClockwiseIcon size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Step Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {flow.map((node, i) => {
          const isActive = activeStep === i
          const isDone = activeStep !== null && activeStep > i
          const detail = stepDetails[i]

          return (
            <SpotlightCard
              key={node.step}
              onClick={() => {
                setActiveStep(i)
                sound.click()
              }}
              className={`p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isActive
                  ? "ring-2 ring-emerald-500 bg-surface-elevated/90 shadow-md"
                  : isDone
                  ? "border-emerald-500/40 bg-surface-card/90"
                  : "bg-surface-card"
              }`}
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold transition-colors ${
                      isActive
                        ? "text-emerald-500 animate-pulse"
                        : isDone
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted"
                    }`}
                  >
                    PHASE {node.step}
                  </span>
                  {isDone ? (
                    <CheckCircleIcon size={15} weight="fill" className="text-emerald-500" />
                  ) : isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-surface-elevated border border-hairline" />
                  )}
                </div>

                <h3 className="text-ink font-semibold text-sm sm:text-base mb-2">
                  {node.title}
                </h3>
                <p className="text-xs text-body leading-relaxed font-normal">
                  {node.detail}
                </p>
              </div>

              {/* Real-time Telemetry Pill */}
              {detail && (
                <div className="mt-4 pt-3 border-t border-hairline/60 flex items-center justify-between text-[10px] font-mono text-muted">
                  <span className="text-body-strong">{detail.protocol}</span>
                  <span className={isActive ? "text-emerald-500 font-bold" : ""}>
                    {detail.latency}
                  </span>
                </div>
              )}
            </SpotlightCard>
          )
        })}
      </div>

      {/* Telemetry Output Terminal (When simulation has run) */}
      {telemetryLog.length > 0 && (
        <div className="rounded-xl border border-hairline bg-surface-soft p-3.5 sm:p-4 font-mono text-[11px] space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-muted text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <TerminalWindowIcon size={13} />
              <span>LIVE PACKET STREAM DISPATCHER</span>
            </div>
            <span>{isSimulating ? "STATUS: DISPATCHING" : "STATUS: COMPLETE"}</span>
          </div>
          <div className="space-y-1 text-body-strong max-h-36 overflow-y-auto pt-1">
            {telemetryLog.map((log, idx) => (
              <div key={idx} className="leading-snug">
                <span className="text-emerald-500 mr-2">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveArchitectureFlow
