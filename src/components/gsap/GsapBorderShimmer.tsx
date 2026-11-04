import React, { useRef, useEffect, useId } from "react"
import { gsap } from "@/lib/gsap"

interface GsapBorderShimmerProps {
  className?: string
  color?: string
  glowColor?: string
  duration?: number
  strokeWidth?: number
  rx?: number
}

/**
 * High-performance GSAP-powered hairline border shimmer.
 * Animates a subtle luminous beam along the card perimeter via SVG strokeDashoffset.
 * Operates purely on the SVG stroke with zero fill, making it physically impossible
 * to leak into the card interior.
 */
export const GsapBorderShimmer: React.FC<GsapBorderShimmerProps> = ({
  className = "",
  color = "#10b981",
  glowColor = "#34d399",
  duration = 6,
  strokeWidth = 1.5,
  rx = 16,
}: Readonly<GsapBorderShimmerProps>) => {
  const gradientId = useId()
  const svgRef = useRef<SVGSVGElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const rect = rectRef.current
    const svg = svgRef.current
    if (!rect || !svg) return

    const parent = svg.parentElement
    if (!parent) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) return

    const updatePerimeter = () => {
      const w = svg.clientWidth || parent.clientWidth || 320
      const h = svg.clientHeight || parent.clientHeight || 450
      if (!w || !h) return

      rect.setAttribute("width", `${Math.max(1, w - strokeWidth)}`)
      rect.setAttribute("height", `${Math.max(1, h - strokeWidth)}`)

      // Perimeter of rounded rectangle
      const perimeter = 2 * (w + h) - 8 * rx + 2 * Math.PI * rx
      // Beam length: approx 20% of perimeter
      const beamLength = Math.max(80, perimeter * 0.2)
      rect.style.strokeDasharray = `${beamLength} ${perimeter - beamLength}`
    }

    updatePerimeter()

    // Smooth continuous GSAP rotation around perimeter
    tweenRef.current = gsap.to(rect, {
      strokeDashoffset: -2000,
      duration: duration * 2,
      ease: "none",
      repeat: -1,
      paused: true,
    })

    const handleMouseEnter = () => {
      updatePerimeter()
      if (rect) {
        gsap.to(rect, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        })
      }
      tweenRef.current?.play()
    }

    const handleMouseLeave = () => {
      if (rect) {
        gsap.to(rect, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            tweenRef.current?.pause()
          },
        })
      }
    }

    parent.addEventListener("mouseenter", handleMouseEnter)
    parent.addEventListener("mouseleave", handleMouseLeave)

    const resizeObserver = new ResizeObserver(() => {
      updatePerimeter()
    })
    resizeObserver.observe(parent)

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter)
      parent.removeEventListener("mouseleave", handleMouseLeave)
      resizeObserver.disconnect()
      tweenRef.current?.kill()
    }
  }, [duration, rx, strokeWidth])

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none absolute inset-0 w-full h-full rounded-[inherit] overflow-visible z-20 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={glowColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect
        ref={rectRef}
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        rx={rx}
        ry={rx}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        className="opacity-0 transition-opacity duration-300"
      />
    </svg>
  )
}

export default GsapBorderShimmer
