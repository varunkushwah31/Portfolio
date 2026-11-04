import React, { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderColor?: string
  size?: number
  [key: string]: unknown
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.05)",
  size = 400,
  ...props
}: Readonly<SpotlightCardProps>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
    if (mediaQuery.matches || isTouch) return

    let rect: DOMRect | null = null

    const handleMouseEnter = () => {
      rect = container.getBoundingClientRect()
      gsap.to(glow, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      rect ??= container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(glow, {
        x: x - size / 2,
        y: y - size / 2,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const handleMouseLeave = () => {
      rect = null
      gsap.to(glow, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      gsap.killTweensOf(glow)
    }
  }, [size])

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl border border-hairline bg-surface-card overflow-hidden ${className}`}
      {...props}
    >
      {/* GSAP Ambient Cursor Spotlight Follower */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full opacity-0 z-0 will-change-transform"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}

export default SpotlightCard
