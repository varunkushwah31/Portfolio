import { useState, useRef, useEffect, useCallback } from "react"
import { sound } from "@/lib/sound"

export type FormTransmissionStatus = "idle" | "transmitting" | "success" | "error"

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface UseContactFormMachineOptions {
  resetDelay?: number
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export interface UseContactFormMachineReturn {
  status: FormTransmissionStatus
  formData: ContactFormData
  errorMessage: string | null
  isTransmitting: boolean
  isSuccess: boolean
  isError: boolean
  updateField: (field: keyof ContactFormData, value: string) => void
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>
  reset: () => void
  formProps: {
    "data-state": FormTransmissionStatus
    "aria-busy": boolean
  }
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  message: "",
}

/**
 * Finite State Machine for Contact Transmission Console.
 * Transitions deterministically:
 * 'idle' -> 'transmitting' -> 'success' (auto-resets after delay) | 'error' -> 'idle'.
 * Eliminates uncoordinated booleans and protects against memory leaks on unmount.
 */
export function useContactFormMachine(
  options: UseContactFormMachineOptions = {}
): UseContactFormMachineReturn {
  const { resetDelay = 4500, onSuccess, onError } = options

  const [status, setStatus] = useState<FormTransmissionStatus>("idle")
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const transmissionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (transmissionTimerRef.current !== null) {
      clearTimeout(transmissionTimerRef.current)
      transmissionTimerRef.current = null
    }
    if (resetTimerRef.current !== null) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [clearTimers])

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setStatus("idle")
    setErrorMessage(null)
    setFormData(INITIAL_FORM_DATA)
  }, [clearTimers])

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Basic client-side validation guard
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setStatus("error")
        setErrorMessage("Please complete all required fields before transmission.")
        return
      }

      clearTimers()
      sound.click()
      setStatus("transmitting")
      setErrorMessage(null)

      try {
        // High-reliability transmission simulation
        transmissionTimerRef.current = setTimeout(() => {
          sound.success()
          setStatus("success")
          onSuccess?.()

          resetTimerRef.current = setTimeout(() => {
            setStatus("idle")
            setFormData(INITIAL_FORM_DATA)
            resetTimerRef.current = null
          }, resetDelay)
        }, 800)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Transmission error")
        setStatus("error")
        setErrorMessage("Transmission link interrupted. Please try direct email.")
        onError?.(error)
      }
    },
    [formData, clearTimers, resetDelay, onSuccess, onError]
  )

  return {
    status,
    formData,
    errorMessage,
    isTransmitting: status === "transmitting",
    isSuccess: status === "success",
    isError: status === "error",
    updateField,
    handleSubmit,
    reset,
    formProps: {
      "data-state": status,
      "aria-busy": status === "transmitting",
    },
  }
}
