import React, { useRef, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "@/context/ThemeContext"

interface BackgroundCanvas3DProps {
  className?: string
}

export const BackgroundCanvas3D: React.FC<BackgroundCanvas3DProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const animFrameId = useRef<number | null>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || 600

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    camera.position.z = 400

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const isDark = theme === "dark"
    const particleColor = isDark ? 0x10b981 : 0x059669
    const lineColor = isDark ? 0x38bdf8 : 0x64748b

    // Lightweight particle nodes count to guarantee 120fps scrolling
    const particleCount = 42
    const maxDistance = 100
    const maxDistanceSq = maxDistance * maxDistance
    const positions = new Float32Array(particleCount * 3)
    const velocities: { x: number; y: number; z: number }[] = []

    const bounds = { x: 380, y: 220, z: 180 }

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2

      velocities.push({
        x: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.3),
        y: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.3),
        z: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.2),
      })
    }

    // Points
    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: 3.2,
      transparent: true,
      opacity: isDark ? 0.5 : 0.4,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    // Dynamic Connections Lines
    const maxConnections = (particleCount * (particleCount - 1)) / 2
    const linePositions = new Float32Array(maxConnections * 6)
    const lineColors = new Float32Array(maxConnections * 6)
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
    linesGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3))

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.16,
      blending: THREE.NormalBlending,
    })
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // Mouse movement influence
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2
      const halfH = window.innerHeight / 2
      mouseX = (e.clientX - halfW) * 0.12
      mouseY = (e.clientY - halfH) * 0.12
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    // Pause heavy updates during scroll for butter-smooth 120fps scrolling
    let isScrolling = false
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    const onScroll = () => {
      isScrolling = true
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        isScrolling = false
      }, 80)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // Viewport Intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisibleRef.current = e.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // Resize
    const onResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || 600
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize)

    const colorHelper = new THREE.Color(lineColor)

    // Animation Loop
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      // Smooth camera tilt towards mouse
      camera.position.x += (mouseX - camera.position.x) * 0.03
      camera.position.y += (-mouseY - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      // Skip line geometry CPU churn during active scroll bursts
      if (isScrolling) {
        renderer.render(scene, camera)
        return
      }

      const posArr = pointsGeometry.attributes.position.array as Float32Array

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        posArr[i3] += velocities[i].x
        posArr[i3 + 1] += velocities[i].y
        posArr[i3 + 2] += velocities[i].z

        // Bounce within bounds
        if (posArr[i3] < -bounds.x || posArr[i3] > bounds.x) velocities[i].x *= -1
        if (posArr[i3 + 1] < -bounds.y || posArr[i3 + 1] > bounds.y) velocities[i].y *= -1
        if (posArr[i3 + 2] < -bounds.z || posArr[i3 + 2] > bounds.z) velocities[i].z *= -1
      }
      pointsGeometry.attributes.position.needsUpdate = true

      // Connect close particles with fast squared distance check
      let vertexCount = 0
      let colorCount = 0
      const linePos = linesGeometry.attributes.position.array as Float32Array
      const lineCol = linesGeometry.attributes.color.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const pi0 = posArr[i * 3]
        const pi1 = posArr[i * 3 + 1]
        const pi2 = posArr[i * 3 + 2]

        for (let j = i + 1; j < particleCount; j++) {
          const dx = pi0 - posArr[j * 3]
          const dy = pi1 - posArr[j * 3 + 1]
          const dz = pi2 - posArr[j * 3 + 2]
          const distSq = dx * dx + dy * dy + dz * dz

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq)
            const alpha = 1.0 - dist / maxDistance

            linePos[vertexCount++] = pi0
            linePos[vertexCount++] = pi1
            linePos[vertexCount++] = pi2

            linePos[vertexCount++] = posArr[j * 3]
            linePos[vertexCount++] = posArr[j * 3 + 1]
            linePos[vertexCount++] = posArr[j * 3 + 2]

            lineCol[colorCount++] = colorHelper.r * alpha
            lineCol[colorCount++] = colorHelper.g * alpha
            lineCol[colorCount++] = colorHelper.b * alpha

            lineCol[colorCount++] = colorHelper.r * alpha
            lineCol[colorCount++] = colorHelper.g * alpha
            lineCol[colorCount++] = colorHelper.b * alpha
          }
        }
      }

      linesGeometry.setDrawRange(0, vertexCount / 3)
      linesGeometry.attributes.position.needsUpdate = true
      linesGeometry.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
      if (scrollTimer) clearTimeout(scrollTimer)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      observer.disconnect()

      pointsGeometry.dispose()
      pointsMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    />
  )
}

export default BackgroundCanvas3D
