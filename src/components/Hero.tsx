import { useState, useEffect } from "react"
import { ArrowRight, Code, TerminalWindow, CaretDown, CaretUp, Clock, Sparkle } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import LiveStatusBadge from "./LiveStatusBadge"
import { sound } from "@/lib/sound"

/* Simple Icons SVG */
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const dynamicRoles = [
  "JAVA COORDINATOR @ DEVUP",
  "SPRING BOOT & BACKEND SYSTEMS",
  "REAL-TIME WEBRTC PROTOCOLS",
  "CS UNDERGRADUATE · INDIA",
]

const heroMetrics = [
  { value: "05+", label: "CORE REPOSITORIES", sublabel: "VERIFIED BUILDS" },
  { value: "100%", label: "JAVA & SPRING BOOT", sublabel: "PRIMARY STACK" },
  { value: "DEVUP", label: "JAVA COORDINATOR", sublabel: "CLUB LEADERSHIP" },
  { value: "P2P", label: "REAL-TIME WEBRTC", sublabel: "DATA CHANNEL" },
]

interface HeroProps {
  onOpenResume?: () => void
}

const Hero = ({ onOpenResume }: HeroProps) => {
  const [showSpecDrawer, setShowSpecDrawer] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [istTime, setIstTime] = useState<string>("")

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setIstTime(`${timeStr} IST (UTC+5:30)`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % dynamicRoles.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full bg-canvas flex items-center overflow-hidden border-b border-hairline-strong telemetry-grid"
      style={{
        minHeight: "calc(100vh - 64px)",
        paddingTop: "64px",
        paddingBottom: "80px",
      }}
    >
      {/* Engineered Layout Gridlines */}
      <div className="absolute inset-0 flex pointer-events-none" aria-hidden="true">
        <div className="max-w-[1440px] w-full mx-auto px-6 h-full flex justify-between">
          <div className="w-[1px] h-full bg-hairline-strong opacity-30" />
          <div className="w-[1px] h-full bg-hairline-strong opacity-20 hidden md:block" />
          <div className="w-[1px] h-full bg-hairline-strong opacity-20 hidden lg:block" />
          <div className="w-[1px] h-full bg-hairline-strong opacity-30" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Asymmetric section index marker */}
          <div className="hidden lg:block lg:col-span-2 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="label-uppercase text-muted tracking-[3px] text-xs">
                [ 01 / START ]
              </div>
              <div className="text-[10px] font-mono text-muted flex items-center gap-1.5 pt-2">
                <Clock size={11} className="text-m-blue-light" />
                <span className="truncate">{istTime || "LOCAL ENGINE"}</span>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            className="lg:col-span-10 border-l border-hairline-strong pl-6 md:pl-12 py-2"
          >
            {/* Live telemetry badge & Role indicator */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-wrap items-center gap-3 md:gap-4 mb-6"
            >
              <div className="flex items-center gap-2 bg-surface-card px-3 py-1 border border-hairline-strong">
                <span className="w-2 h-2 bg-m-blue-light rounded-full animate-pulse" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="label-uppercase text-m-blue-light tracking-[1.5px] text-xs font-bold font-mono"
                  >
                    {dynamicRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="text-hairline hidden sm:inline">•</span>
              <LiveStatusBadge statusText="SYS.READY" subText="AVAILABLE FOR ROLES" />
            </motion.div>

            {/* Main headline — display-xl (UPPERCASE 700) */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-ink mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-[0.96]"
            >
              VARUN KUSHWAH
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-body-strong mb-6 text-lg sm:text-xl md:text-2xl font-light uppercase tracking-wide"
              style={{ lineHeight: 1.3 }}
            >
              Computer Science Student & Software Developer
            </motion.p>

            {/* Bio — body-md / weight 300 */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="body-light text-base md:text-lg mb-10 max-w-[640px] text-body leading-relaxed"
            >
              I specialize in building robust backend systems with Java and Spring Boot,
              and enjoy exploring new technologies. Serving as the Java Coordinator for
              <strong className="text-body-strong font-normal"> devup</strong>, I actively mentor peers and bridge the gap between software development and seamless operational deployment.
            </motion.p>

            {/* CTA Buttons — button-primary spec */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#projects"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="btn-text group inline-flex items-center gap-3 text-canvas bg-ink px-8 hover:bg-body-strong transition-all duration-200 cursor-pointer"
                style={{ height: "48px", borderRadius: "0px" }}
              >
                <span className="font-bold flex items-center gap-2.5">
                  VIEW PROJECTS
                  <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              {onOpenResume && (
                <button
                  onClick={() => {
                    sound.openModal()
                    onOpenResume()
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="btn-text inline-flex items-center gap-2 text-ink bg-transparent border border-ink px-7 hover:bg-ink hover:text-canvas transition-all duration-200 cursor-pointer"
                  style={{ height: "48px", borderRadius: "0px" }}
                >
                  CV / RESUME SPEC
                </button>
              )}

              <a
                href="https://github.com/varunkushwah31"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-hairline px-6 hover:border-ink hover:bg-surface-soft transition-all duration-200"
                style={{ height: "48px", borderRadius: "0px" }}
              >
                <GitHubIcon size={16} />
                GITHUB
              </a>

              <button
                onClick={() => {
                  sound.click()
                  setShowSpecDrawer(!showSpecDrawer)
                }}
                onMouseEnter={() => sound.hover()}
                className={`btn-text inline-flex items-center gap-2 border px-5 transition-all duration-200 text-xs cursor-pointer ${
                  showSpecDrawer
                    ? "bg-surface-elevated text-ink border-m-blue-light"
                    : "bg-transparent text-muted hover:text-ink border-hairline-strong hover:border-hairline"
                }`}
                style={{ height: "48px", borderRadius: "0px" }}
              >
                <TerminalWindow size={14} className="text-m-blue-dark" />
                {showSpecDrawer ? "CLOSE TELEMETRY" : "ENGINE SPEC"}
                {showSpecDrawer ? <CaretUp size={14} /> : <CaretDown size={14} />}
              </button>
            </motion.div>

            {/* Interactive Engineering Spec Drawer */}
            <AnimatePresence>
              {showSpecDrawer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-12"
                >
                  <div className="bg-surface-soft border border-hairline p-6 font-mono text-xs text-body-strong space-y-2 relative shadow-2xl">
                    <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                      <div className="flex items-center gap-2 text-m-blue-dark font-bold label-uppercase">
                        <Code size={14} /> SYSTEM_TELEMETRY.CONFIG
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted">
                        <Sparkle size={11} className="text-m-blue-light" />
                        <span>RUNTIME: JAVA 21 & SPRING 3.x</span>
                      </div>
                    </div>
                    <pre className="text-body text-xs overflow-x-auto leading-relaxed">
{`{
  "developer": "Varun Kushwah",
  "leadership": "Java Coordinator @ devup",
  "coreLanguages": ["Java 21", "Python", "TypeScript", "Dart", "SQL"],
  "primaryBackend": "Spring Boot 3.x / Spring Data JPA / REST APIs",
  "frontend": ["React 19", "Tailwind CSS v4", "Vite"],
  "protocols": ["WebRTC (RTCDataChannel)", "WebSockets", "STUN / TURN"],
  "devopsInterests": ["Docker Containerization", "Git Subtree Monorepos", "CI/CD Pipelines"],
  "location": "India",
  "status": "Available for Software Engineering Roles & Internships"
}`}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spec-cell metrics grid adhering to DESIGN.md */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-hairline-strong pt-8"
            >
              {heroMetrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-surface-soft p-4 md:p-5 border border-hairline-strong hover:border-hairline transition-colors duration-200 group"
                  style={{ borderRadius: "0px" }}
                >
                  <div className="text-ink group-hover:text-m-blue-light font-bold text-2xl md:text-3xl tracking-tight mb-1 transition-colors">
                    {m.value}
                  </div>
                  <div className="label-uppercase text-[11px] text-body-strong tracking-wider mb-0.5">
                    {m.label}
                  </div>
                  <div className="text-[10px] font-mono text-muted">
                    {m.sublabel}
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
