import React, { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useTheme } from "@/context/ThemeContext"
import { SparkleIcon, HandPointingIcon } from "@phosphor-icons/react"

interface HeroScene3DProps {
  className?: string
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isInteracting, setIsInteracting] = useState(false)
  const [pulseCount, setPulseCount] = useState(0)

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animFrameId = useRef<number | null>(null)
  const isVisibleRef = useRef(true)
  const themeRef = useRef(theme)
  themeRef.current = theme

  // Interactive pulse trigger ref
  const triggerPulseRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 7.5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Dynamic Color Palette based on current theme
    const isDark = themeRef.current === "dark"
    const colors = {
      primary: isDark ? 0x10b981 : 0x059669,     // Emerald
      secondary: isDark ? 0x38bdf8 : 0x0284c7,   // Cyan/Sky
      core: isDark ? 0x34d399 : 0x10b981,        // Light Emerald
      wireframe: isDark ? 0x27272a : 0xcbd5e1,   // Dark/Light wireframe
      nodes: isDark ? 0x6ee7b7 : 0x047857,
      ambientParticles: isDark ? 0x10b981 : 0x0284c7,
    }

    // 2. 3D Elements Group
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // Inner Crystalline Icosahedron Core
    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 0)
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: colors.core,
      emissive: isDark ? 0x064e3b : 0x047857,
      emissiveIntensity: 0.4,
      wireframe: false,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
      shininess: 90,
    })
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)
    coreGroup.add(innerMesh)

    // Outer Geodesic Wireframe Lattice
    const outerGeometry = new THREE.IcosahedronGeometry(2.1, 1)
    const outerWireframeMaterial = new THREE.MeshBasicMaterial({
      color: colors.primary,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45,
    })
    const outerWireframe = new THREE.Mesh(outerGeometry, outerWireframeMaterial)
    coreGroup.add(outerWireframe)

    // Vertex Nodes on the Outer Lattice (Luminous dots at each vertex)
    const posAttribute = outerGeometry.getAttribute("position")
    const vertexPoints: THREE.Vector3[] = []
    for (let i = 0; i < posAttribute.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttribute, i)
      // Deduplicate roughly
      if (!vertexPoints.some((p) => p.distanceTo(v) < 0.05)) {
        vertexPoints.push(v)
      }
    }

    const nodeGeometry = new THREE.BufferGeometry().setFromPoints(vertexPoints)
    const nodeMaterial = new THREE.PointsMaterial({
      color: colors.nodes,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    })
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial)
    coreGroup.add(nodePoints)

    // Orbital Satellite Peer Nodes (Representing WebRTC Peers / Distributed Microservices)
    const satelliteGroup = new THREE.Group()
    coreGroup.add(satelliteGroup)

    const satelliteCount = 5
    const satellites: {
      mesh: THREE.Mesh
      angle: number
      speed: number
      radius: number
      yOffset: number
      line: THREE.Line
    }[] = []

    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16)
      const satMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? colors.primary : colors.secondary,
      })
      const satMesh = new THREE.Mesh(satGeo, satMat)

      // Connection Line back to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ])
      const lineMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? colors.primary : colors.secondary,
        transparent: true,
        opacity: isDark ? 0.35 : 0.25,
      })
      const line = new THREE.Line(lineGeo, lineMat)

      satelliteGroup.add(satMesh)
      satelliteGroup.add(line)

      satellites.push({
        mesh: satMesh,
        angle: (i / satelliteCount) * Math.PI * 2,
        speed: (0.4 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
        radius: 2.8 + (i % 3) * 0.4,
        yOffset: (Math.random() - 0.5) * 1.8,
        line,
      })
    }

    // Floating Data Particle Cloud (Field of tiny floating packets)
    const particleCount = 120
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 9
      particlePositions[i + 1] = (Math.random() - 0.5) * 9
      particlePositions[i + 2] = (Math.random() - 0.5) * 7
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: colors.ambientParticles,
      size: 0.045,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    })
    const particleCloud = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleCloud)

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.6 : 0.9)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(colors.primary, isDark ? 2.2 : 1.6, 20)
    pointLight.position.set(4, 4, 5)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(colors.secondary, isDark ? 1.8 : 1.2, 20)
    pointLight2.position.set(-4, -3, 3)
    scene.add(pointLight2)

    // 4. Interactive Pulse Shockwave State
    let pulseScale = 1.0
    let pulseTargetScale = 1.0

    triggerPulseRef.current = () => {
      pulseTargetScale = 1.35
      setPulseCount((c) => c + 1)
      setTimeout(() => {
        pulseTargetScale = 1.0
      }, 350)
    }

    // 5. Mouse Drag & Pointer Tracking
    let targetRotationX = 0.2
    let targetRotationY = 0.3
    let mouseX = 0
    let mouseY = 0
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x
        const deltaY = e.clientY - previousMousePosition.y
        targetRotationY += deltaX * 0.008
        targetRotationX += deltaY * 0.008
        previousMousePosition = { x: e.clientX, y: e.clientY }
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      setIsInteracting(true)
      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
      setIsInteracting(false)
    }

    const onClick = () => {
      if (triggerPulseRef.current) {
        triggerPulseRef.current()
      }
    }

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        setIsInteracting(true)
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x
        const deltaY = e.touches[0].clientY - previousMousePosition.y
        targetRotationY += deltaX * 0.008
        targetRotationX += deltaY * 0.008
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchEnd = () => {
      isDragging = false
      setIsInteracting(false)
    }

    container.addEventListener("mousemove", onPointerMove)
    container.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    container.addEventListener("click", onClick)
    container.addEventListener("touchstart", onTouchStart, { passive: true })
    container.addEventListener("touchmove", onTouchMove, { passive: true })
    container.addEventListener("touchend", onTouchEnd)

    // 6. Viewport Visibility Tracking via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener("resize", handleResize)

    // 8. Animation Loop
    let clock = new THREE.Clock()

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      const elapsedTime = clock.getElapsedTime()

      // Idle Rotation + Inertial Mouse Parallax
      const idleSpeed = prefersReducedMotion ? 0.05 : 0.25
      coreGroup.rotation.y += idleSpeed * 0.015
      coreGroup.rotation.x += idleSpeed * 0.008

      // Interpolate towards target rotation from mouse/drag
      coreGroup.rotation.y += (targetRotationY + mouseX * 0.45 - coreGroup.rotation.y) * 0.05
      coreGroup.rotation.x += (targetRotationX - mouseY * 0.45 - coreGroup.rotation.x) * 0.05

      // Inner core counter-rotation
      innerMesh.rotation.y -= 0.02
      innerMesh.rotation.z += 0.015

      // Pulse interpolation
      pulseScale += (pulseTargetScale - pulseScale) * 0.12
      outerWireframe.scale.set(pulseScale, pulseScale, pulseScale)
      nodePoints.scale.set(pulseScale, pulseScale, pulseScale)

      // Orbiting Satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed * (prefersReducedMotion ? 0.005 : 0.02)
        const x = Math.cos(sat.angle) * sat.radius
        const z = Math.sin(sat.angle) * sat.radius
        const y = Math.sin(sat.angle * 1.5 + sat.yOffset) * 0.9

        sat.mesh.position.set(x, y, z)

        // Update connection line
        const linePositions = sat.line.geometry.attributes.position as THREE.BufferAttribute
        linePositions.setXYZ(0, 0, 0, 0)
        linePositions.setXYZ(1, x, y, z)
        linePositions.needsUpdate = true
      })

      // Particle cloud gentle drift
      particleCloud.rotation.y += 0.001
      particleCloud.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08

      renderer.render(scene, camera)
    }

    animate()

    // 9. Clean up on unmount
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mouseup", onMouseUp)
      container.removeEventListener("mousemove", onPointerMove)
      container.removeEventListener("mousedown", onMouseDown)
      container.removeEventListener("click", onClick)
      container.removeEventListener("touchstart", onTouchStart)
      container.removeEventListener("touchmove", onTouchMove)
      container.removeEventListener("touchend", onTouchEnd)
      observer.disconnect()

      // Dispose Three.js objects
      innerGeometry.dispose()
      innerMaterial.dispose()
      outerGeometry.dispose()
      outerWireframeMaterial.dispose()
      nodeGeometry.dispose()
      nodeMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      satellites.forEach((s) => {
        s.mesh.geometry.dispose()
        ;(s.mesh.material as THREE.Material).dispose()
        s.line.geometry.dispose()
        ;(s.line.material as THREE.Material).dispose()
      })

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [theme]) // Re-run when theme changes to smoothly update palette

  const handlePulse = () => {
    if (triggerPulseRef.current) {
      triggerPulseRef.current()
    }
  }

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] cursor-grab active:cursor-grabbing relative overflow-hidden rounded-2xl ${
          isInteracting ? "ring-1 ring-emerald-500/30" : ""
        }`}
      />

      {/* Floating Interactivity Hints */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-muted pointer-events-none px-1">
        <div className="inline-flex items-center gap-1.5 bg-surface-card/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-hairline/70">
          <HandPointingIcon size={13} className="text-emerald-500" />
          <span className="font-sans text-[10px]">Drag to rotate • Click to pulse</span>
        </div>

        <button
          onClick={handlePulse}
          type="button"
          className="pointer-events-auto inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
          title="Emit WebRTC sync pulse"
        >
          <SparkleIcon size={10} />
          <span>Pulse ({pulseCount})</span>
        </button>
      </div>
    </div>
  )
}

export default HeroScene3D
