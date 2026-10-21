import React, { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

interface GsapTiltCardProps {
  children: React.ReactNode
  className?: string
  maxRotation?: number
  glare?: boolean
  scaleOnHover?: number
  [key: string]: unknown
}

export const GsapTiltCard: React.FC<GsapTiltCardProps> = ({
  children,
  className = "",
  maxRotation = 8,
  glare = true,
  scaleOnHover = 1.02,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glareEl = glareRef.current
    if (!card) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
    if (mediaQuery.matches || isTouch) return

    let cachedRect: DOMRect | null = null

    const handleMouseEnter = () => {
      cachedRect = card.getBoundingClientRect()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) cachedRect = card.getBoundingClientRect()
      const x = e.clientX - cachedRect.left
      const y = e.clientY - cachedRect.top
      const centerX = cachedRect.width / 2
      const centerY = cachedRect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxRotation
      const rotateY = ((x - centerX) / centerX) * maxRotation

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: scaleOnHover,
        transformPerspective: 1000,
        transformOrigin: "center center",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      })

      if (glare && glareEl) {
        const glareX = (x / cachedRect.width) * 100
        const glareY = (y / cachedRect.height) * 100
        gsap.to(glareEl, {
          opacity: 0.15,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent 70%)`,
          duration: 0.2,
          overwrite: "auto",
        })
      }
    }

    const handleMouseLeave = () => {
      cachedRect = null
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.45)",
        overwrite: "auto",
      })

      if (glare && glareEl) {
        gsap.to(glareEl, {
          opacity: 0,
          duration: 0.35,
          overwrite: "auto",
        })
      }
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      gsap.killTweensOf([card, glareEl])
    }
  }, [maxRotation, glare, scaleOnHover])

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {/* Dynamic Specular Glare Reflection Layer */}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{ mixBlendMode: "overlay" }}
        />
      )}
      {children}
    </div>
  )
}

export default GsapTiltCard
