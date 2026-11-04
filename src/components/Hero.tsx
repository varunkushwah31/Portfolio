import { useState, useEffect, lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { CaretRightIcon, SparkleIcon, LightningIcon } from "@phosphor-icons/react"
import TechStack from "./TechStack"
import MagneticButton from "./gsap/MagneticButton"
import TextScramble from "./gsap/TextScramble"
import { sound } from "@/lib/sound"
import {
  JavaIcon,
  SpringIcon,
  WebRTCIcon,
  DockerIcon,
  PostgresIcon,
} from "./TechIcons"

// Dynamic lazy import for Three.js 3D canvas to keep initial landing render fast
const BackgroundCanvas3D = lazy(() => import("./three/BackgroundCanvas3D"))

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const dynamicMessages = [
  { prefix: "I craft", highlight: "scalable" },
  { prefix: "I engineer", highlight: "resilient" },
  { prefix: "I build", highlight: "distributed" },
  { prefix: "I architect", highlight: "real-time" },
  { prefix: "I develop", highlight: "high-performance" },
]

const phraseVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export interface HeroProps {
  activeTechFilter?: string | null
  onSelectTechFilter?: (techId: string | null) => void
}

const heroTechChips = [
  { id: "java", name: "Java", icon: JavaIcon },
  { id: "spring-boot", name: "Spring Boot", icon: SpringIcon },
  { id: "webrtc", name: "WebRTC", icon: WebRTCIcon },
  { id: "postgres", name: "PostgreSQL", icon: PostgresIcon },
  { id: "docker", name: "Docker", icon: DockerIcon },
]

export default function Hero({ activeTechFilter, onSelectTechFilter }: Readonly<HeroProps>) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % dynamicMessages.length)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  const handleChipClick = (chipId: string) => {
    sound.switchTab()
    const next = activeTechFilter === chipId ? null : chipId
    onSelectTechFilter?.(next)

    // Smoothly scroll down to highlighted projects section
    const el = document.getElementById("highlighted-projects")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 sm:pt-20 pb-10 sm:pb-12 relative overflow-visible">
      {/* Three.js Ambient Particle Constellation Background (Lazy Loaded) */}
      <Suspense fallback={null}>
        <BackgroundCanvas3D className="opacity-60 dark:opacity-75" />
      </Suspense>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Profile Avatar & Live Status Badge */}
        <motion.div variants={item} className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative w-fit">
            <img
              src="/profile.jpg"
              alt="Varun Kushwah"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-center shadow-xl shadow-pink-500/10 hover:scale-105 transition-transform duration-300 bg-black"
            />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-canvas" />
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-hairline bg-surface-card/90 backdrop-blur-sm text-xs text-body-strong shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Available for internships &amp; new opportunities</span>
          </div>
        </motion.div>

        {/* Main 2-line Heading with GSAP Text Scramble */}
        <motion.div variants={item} className="mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight leading-[1.15]">
            Hi, I'm{" "}
            <span className="text-ink hover:text-emerald-500 dark:hover:text-emerald-400 inline-block transition-colors duration-300 cursor-pointer">
              <TextScramble text="Varun Kushwah" trigger="both" duration={0.65} />
            </span>
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-body-strong tracking-tight mt-1">
            Software Developer
          </h2>
        </motion.div>

        {/* Bio sentence with dynamic rotating highlighted phrase */}
        <motion.p
          variants={item}
          className="text-body text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
        >
          <motion.span
            layout
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-baseline align-baseline relative"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={messageIndex}
                variants={phraseVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="inline-flex items-baseline gap-1.5 whitespace-nowrap"
              >
                <span>{dynamicMessages[messageIndex].prefix}</span>
                <span className="text-emerald-500 dark:text-emerald-300 font-medium underline decoration-emerald-500/70 decoration-wavy decoration-1 underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-200 transition-colors cursor-default">
                  {dynamicMessages[messageIndex].highlight}
                </span>
              </motion.span>
            </AnimatePresence>
          </motion.span>{" "}
          things with code. <strong>Java Coordinator</strong> at{" "}
          <a
            href="https://devup.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-strong font-semibold hover:text-accent underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-emerald-500 transition-colors inline-flex items-center gap-0.5"
          >
            <span>devup</span>
            <SparkleIcon size={12} className="text-emerald-600 dark:text-emerald-400 inline" />
          </a>
          , building resilient backend systems with <strong>Java &amp; Spring Boot</strong>, and exploring real-time <strong>WebRTC</strong> protocols.
        </motion.p>

        {/* Action Buttons: Discover more + Recruiter TL;DR (30s Pitch) */}
        <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
          <MagneticButton strength={0.35}>
            <Link
              to="/projects"
              onClick={() => sound.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-hairline hover:border-emerald-500/50 dark:hover:border-emerald-400/50 bg-surface-card hover:bg-surface-elevated text-ink hover:text-emerald-500 dark:hover:text-emerald-400 text-xs sm:text-sm font-medium transition-all duration-200 group shadow-xs hover:shadow-sm"
            >
              <span>Discover more</span>
              <CaretRightIcon
                size={13}
                weight="bold"
                className="group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-200"
              />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.35}>
            <button
              onClick={() => {
                sound.click()
                window.dispatchEvent(new CustomEvent("open-recruiter-pitch"))
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer group"
              title="Open 30-Second Candidate Pitch"
            >
              <LightningIcon size={15} weight="fill" className="text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>Recruiter TL;DR (30s Pitch)</span>
            </button>
          </MagneticButton>
        </motion.div>

        {/* Interactive Quick Tech Stack Filter Chips */}
        <motion.div variants={item} className="mt-8 mb-6">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Filter projects by stack:
            </span>
            {activeTechFilter && (
              <button
                type="button"
                onClick={() => {
                  sound.click()
                  onSelectTechFilter?.(null)
                }}
                className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1.5 py-0.5"
                aria-label="Clear active technology filter"
              >
                Clear filter [x]
              </button>
            )}
          </div>
          <div
            role="toolbar"
            aria-label="Filter projects by technology stack"
            className="flex flex-wrap items-center gap-2"
          >
            {heroTechChips.map((chip) => {
              const isSelected = activeTechFilter === chip.id
              const Icon = chip.icon
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Filter projects by ${chip.name}`}
                  onClick={() => handleChipClick(chip.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleChipClick(chip.id)
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer select-none active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas shadow-xs ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-500 text-ink dark:text-emerald-300 font-semibold ring-1 ring-emerald-500/50 shadow-sm"
                      : "border-hairline bg-surface-card hover:bg-surface-elevated text-body-strong hover:border-zinc-500/60 hover:text-ink"
                  }`}
                >
                  <Icon size={14} className="w-3.5 h-3.5 shrink-0" />
                  <span>{chip.name}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Tech Stack Row */}
        <motion.div variants={item}>
          <TechStack />
        </motion.div>
      </motion.div>
    </section>
  )
}
