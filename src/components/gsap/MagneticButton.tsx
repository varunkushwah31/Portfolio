import React, { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  innerStrength?: number
  as?: React.ElementType
  [key: string]: unknown
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 0.35,
  innerStrength = 0.15,
  as: Component = "div",
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    const inner = innerRef.current
    if (!el) return

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
    if (mediaQuery.matches || isTouch) return

    let cachedRect: DOMRect | null = null

    const handleMouseEnter = () => {
      cachedRect = el.getBoundingClientRect()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) cachedRect = el.getBoundingClientRect()
      const centerX = cachedRect.left + cachedRect.width / 2
      const centerY = cachedRect.top + cachedRect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      })

      if (inner) {
        gsap.to(inner, {
          x: deltaX * innerStrength,
          y: deltaY * innerStrength,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        })
      }
    }

    const handleMouseLeave = () => {
      cachedRect = null
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto",
      })

      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1.2, 0.4)",
          overwrite: "auto",
        })
      }
    }

    el.addEventListener("mouseenter", handleMouseEnter)
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter)
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
      gsap.killTweensOf([el, inner])
    }
  }, [strength, innerStrength])

  return (
    <Component
      ref={containerRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      {...props}
    >
      <div ref={innerRef} className="w-full h-full">
        {children}
      </div>
    </Component>
  )
}

export default MagneticButton
