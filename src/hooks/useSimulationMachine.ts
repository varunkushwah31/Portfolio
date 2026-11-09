import { useState, useRef, useEffect, useCallback } from "react"
import { sound } from "@/lib/sound"
import type { ArchitectureNode } from "@/data/projects"

export type SimulationState = "idle" | "simulating" | "completed"

export interface StepTelemetry {
  latency: string
  protocol: string
  telemetry: string
}

export interface UseSimulationMachineOptions {
  flow: ArchitectureNode[]
  projectTitle: string
  stepDetails?: Record<number, StepTelemetry>
  stepIntervalMs?: number
}

export interface UseSimulationMachineReturn {
  status: SimulationState
  activeStep: number | null
  telemetryLog: string[]
  isSimulating: boolean
  isCompleted: boolean
  startSimulation: () => void
  resetSimulation: () => void
  selectStep: (index: number) => void
  containerProps: {
    "data-simulation-state": SimulationState
    "data-active-step": number
  }
}

const DEFAULT_STEP_DETAILS: Record<number, StepTelemetry> = {
  0: { latency: "1.2ms", protocol: "TLS 1.3 / HTTP/2", telemetry: "Payload validated & JWT signed" },
  1: { latency: "3.4ms", protocol: "Java 21 VThread", telemetry: "Spring security barrier passed · Worker allocated" },
  2: { latency: "0.4ms", protocol: "Redis RESP3", telemetry: "Distributed Lock Acquired · Cache hit (TTL 24h)" },
  3: { latency: "6.8ms", protocol: "SCTP / WebRTC", telemetry: "Zero-copy streaming pipeline flushed · 200 OK" },
}

/**
 * Finite State Machine for Interactive Architecture Pipeline Simulation.
 * Coordinates transitions: 'idle' -> 'simulating' (through step indices) -> 'completed' -> 'idle'.
 * Ensures zero timer race conditions when visitors click nodes manually during auto-run.
 */
export function useSimulationMachine(options: UseSimulationMachineOptions): UseSimulationMachineReturn {
  const {
    flow,
    projectTitle,
    stepDetails = DEFAULT_STEP_DETAILS,
    stepIntervalMs = 900,
  } = options

  const [status, setStatus] = useState<SimulationState>("idle")
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [telemetryLog, setTelemetryLog] = useState<string[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  const resetSimulation = useCallback(() => {
    clearTimer()
    setStatus("idle")
    setActiveStep(null)
    setTelemetryLog([])
    sound.click()
  }, [clearTimer])

  const selectStep = useCallback(
    (index: number) => {
      // Cleanly interrupt ongoing automated runner if active
      clearTimer()
      setStatus("idle")
      setActiveStep(index)
      sound.click()
    },
    [clearTimer]
  )

  const startSimulation = useCallback(() => {
    if (status === "simulating") return
    clearTimer()
    setStatus("simulating")
    setActiveStep(0)
    setTelemetryLog([
      `[${new Date().toLocaleTimeString()}] INITIATING PIPELINE SIMULATION FOR ${projectTitle}...`,
    ])
    sound.click()

    const executeStep = (step: number) => {
      setActiveStep(step)
      const detail = stepDetails[step] || { latency: "2.0ms", protocol: "TCP", telemetry: "Processed" }
      const phaseNum = flow[step]?.step || step + 1
      const phaseTitle = flow[step]?.title || `Phase ${phaseNum}`

      setTelemetryLog((prev) => [
        ...prev,
        `[Phase ${phaseNum}] ${phaseTitle} (${detail.protocol}) -> Latency: ${detail.latency} | ${detail.telemetry}`,
      ])
      sound.switchTab()

      if (step < flow.length - 1) {
        timeoutRef.current = setTimeout(() => {
          executeStep(step + 1)
        }, stepIntervalMs)
      } else {
        timeoutRef.current = setTimeout(() => {
          setStatus("completed")
          setTelemetryLog((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] PIPELINE VERIFIED SUCCESSFULLY: 11.8ms End-to-End Latency. Zero Dropped Packets.`,
          ])
          sound.success()
          timeoutRef.current = null
        }, 800)
      }
    }

    timeoutRef.current = setTimeout(() => {
      executeStep(0)
    }, 400)
  }, [status, clearTimer, projectTitle, stepDetails, flow, stepIntervalMs])

  return {
    status,
    activeStep,
    telemetryLog,
    isSimulating: status === "simulating",
    isCompleted: status === "completed",
    startSimulation,
    resetSimulation,
    selectStep,
    containerProps: {
      "data-simulation-state": status,
      "data-active-step": activeStep !== null ? activeStep : -1,
    },
  }
}
