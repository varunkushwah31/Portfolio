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
    if (mediaQuery.matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

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
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        gsap.to(glareEl, {
          opacity: 0.15,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent 70%)`,
          duration: 0.2,
          overwrite: "auto",
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.65,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      })

      if (glare && glareEl) {
        gsap.to(glareEl, {
          opacity: 0,
          duration: 0.4,
          overwrite: "auto",
        })
      }
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      gsap.killTweensOf(card)
      if (glareEl) gsap.killTweensOf(glareEl)
    }
  }, [maxRotation, glare, scaleOnHover])

  return (
    <div
      ref={cardRef}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity z-20"
        />
      )}
    </div>
  )
}

export default GsapTiltCard
