import React, { useRef, useState, useCallback, useEffect } from "react"
import { gsap } from "@/lib/gsap"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$*+"

interface TextScrambleProps {
  text: string
  className?: string
  trigger?: "hover" | "mount" | "both"
  duration?: number
  as?: React.ElementType
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = "",
  trigger = "both",
  duration = 0.65,
  as: Component = "span",
}) => {
  const [displayText, setDisplayText] = useState(text)
  const isScramblingRef = useRef(false)
  const animRef = useRef<gsap.core.Tween | null>(null)

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setDisplayText(text)
      isScramblingRef.current = false
      return
    }

    const obj = { progress: 0 }
    const length = text.length

    if (animRef.current) animRef.current.kill()

    animRef.current = gsap.to(obj, {
      progress: 1,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        const solvedCount = Math.floor(obj.progress * length)
        let output = ""
        for (let i = 0; i < length; i++) {
          if (text[i] === " ") {
            output += " "
          } else if (i < solvedCount) {
            output += text[i]
          } else {
            const randomChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            output += randomChar
          }
        }
        setDisplayText(output)
      },
      onComplete: () => {
        setDisplayText(text)
        isScramblingRef.current = false
      },
    })
  }, [text, duration])

  useEffect(() => {
    if (trigger === "mount" || trigger === "both") {
      const timer = setTimeout(() => {
        scramble()
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [trigger, scramble])

  const handleMouseEnter = () => {
    if (trigger === "hover" || trigger === "both") {
      scramble()
    }
  }

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`transition-colors select-none font-inherit tracking-tight ${className}`}
    >
      {displayText}
    </Component>
  )
}

export default TextScramble
