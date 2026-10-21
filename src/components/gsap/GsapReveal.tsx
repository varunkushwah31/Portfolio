import React, { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

interface GsapRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "fade"
  delay?: number
  duration?: number
  distance?: number
  stagger?: number
  threshold?: string
}

export const GsapReveal: React.FC<GsapRevealProps> = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 30,
  stagger = 0,
  threshold = "top 85%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 })
      return
    }

    let initialX = 0
    let initialY = 0

    if (direction === "up") initialY = distance
    else if (direction === "down") initialY = -distance
    else if (direction === "left") initialX = distance
    else if (direction === "right") initialX = -distance

    const targets = stagger > 0 ? el.children : el

    const tween = gsap.fromTo(
      targets,
      {
        opacity: 0,
        x: initialX,
        y: initialY,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: threshold,
          toggleActions: "play none none none",
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [direction, delay, duration, distance, stagger, threshold])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export default GsapReveal
