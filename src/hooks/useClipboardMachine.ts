import { useState, useRef, useEffect, useCallback } from "react"
import { sound } from "@/lib/sound"

export type ClipboardState = "idle" | "copying" | "copied" | "error"

export interface UseClipboardMachineOptions {
  /** Duration in milliseconds before resetting back to 'idle'. Default is 2200ms. */
  duration?: number
  /** Whether to play synthesized audio feedback upon successful copy. Default is true. */
  playSuccessSound?: boolean
  /** Callback fired when copy succeeds. */
  onSuccess?: () => void
  /** Callback fired when copy fails. */
  onError?: (error: unknown) => void
}

export interface UseClipboardMachineReturn {
  state: ClipboardState
  isCopied: boolean
  isCopying: boolean
  isError: boolean
  copy: (text: string) => Promise<boolean>
  reset: () => void
  /** Accessible semantic DOM tokens for agents and screen readers */
  triggerProps: {
    "data-clipboard-state": ClipboardState
    "aria-live": "polite"
  }
}

/**
 * Finite State Machine for ephemeral clipboard operations.
 * Coordinates transitions between: 'idle' -> 'copying' -> 'copied' | 'error' -> 'idle'.
 * Guarantees zero timer leaks, deterministic resets, and accessible AX tokens.
 */
export function useClipboardMachine(options: UseClipboardMachineOptions = {}): UseClipboardMachineReturn {
  const {
    duration = 2200,
    playSuccessSound = true,
    onSuccess,
    onError,
  } = options

  const [state, setState] = useState<ClipboardState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Guarantee cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    setState("idle")
  }, [clearTimer])

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      clearTimer()
      setState("copying")

      try {
        if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for non-secure or legacy browser contexts
          const textarea = document.createElement("textarea")
          textarea.value = text
          textarea.style.position = "fixed"
          textarea.style.opacity = "0"
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand("copy")
          document.body.removeChild(textarea)
        }

        setState("copied")
        if (playSuccessSound) {
          sound.success()
        }
        onSuccess?.()

        timeoutRef.current = setTimeout(() => {
          setState("idle")
          timeoutRef.current = null
        }, duration)

        return true
      } catch (err) {
        setState("error")
        onError?.(err)

        timeoutRef.current = setTimeout(() => {
          setState("idle")
          timeoutRef.current = null
        }, duration)

        return false
      }
    },
    [clearTimer, duration, playSuccessSound, onSuccess, onError]
  )

  return {
    state,
    isCopied: state === "copied",
    isCopying: state === "copying",
    isError: state === "error",
    copy,
    reset,
    triggerProps: {
      "data-clipboard-state": state,
      "aria-live": "polite",
    },
  }
}
