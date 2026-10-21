import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePageTitle } from "@/hooks/usePageTitle"
import {
  ArrowSquareOutIcon,
  SparkleIcon,
  CpuIcon,
  LaptopIcon,
  DesktopIcon,
  KeyboardIcon,
  DeviceMobileIcon,
  TerminalWindowIcon,
  WrenchIcon,
} from "@phosphor-icons/react"
import { sound } from "@/lib/sound"

import {
  JavaIcon,
  SpringIcon,
  ReactIcon,
  FlutterIcon,
  PythonIcon,
  TypeScriptIcon,
  NodeIcon,
  DockerIcon,
  GitIcon,
  WebRTCIcon,
  TailwindIcon,
  PostgresIcon,
  LinuxIcon,
  PostmanIcon,
  ViteIcon,
  WebSocketIcon,
  ThreeJSIcon,
  GSAPIcon,
} from "@/components/TechIcons"
import GsapTiltCard from "@/components/gsap/GsapTiltCard"

// 1. Technologies & Frameworks
interface TechDetail {
  id: string
  name: string
  category: "Backend" | "Frontend" | "Real-Time" | "DevOps" | "Database"
  icon: React.FC<{ size?: number; className?: string }>
  status: "Core Stack" | "Proficient" | "Familiar" | "Exploring"
  description: string
  useCase: string
  link: string
}

const techDetails: TechDetail[] = [
  // Backend
  {
    id: "java",
    name: "Java 21",
    category: "Backend",
    icon: JavaIcon,
    status: "Core Stack",
    description: "Modern Java with virtual threads, pattern matching, records, and robust object-oriented architecture.",
    useCase: "Primary language for DSA, complex backend services, and leading workshops at devup.",
    link: "https://www.oracle.com/java/",
  },
  {
    id: "spring-boot",
    name: "Spring Boot 3.x",
    category: "Backend",
    icon: SpringIcon,
    status: "Core Stack",
    description: "Enterprise backend framework for rapid, production-ready microservices, REST APIs, and dependency injection.",
    useCase: "Building secured APIs, Spring Data JPA repositories, and backend service layers.",
    link: "https://spring.io/projects/spring-boot",
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    icon: NodeIcon,
    status: "Proficient",
    description: "Asynchronous event-driven JavaScript runtime for fast scalable network applications.",
    useCase: "Microservices, backend APIs, and WebRTC signaling servers.",
    link: "https://nodejs.org/",
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    icon: PythonIcon,
    status: "Proficient",
    description: "Versatile programming language with powerful libraries for data structures, automation, and machine learning.",
    useCase: "Machine learning pipelines, predictive model evaluation, and backend scripting.",
    link: "https://www.python.org/",
  },

  // Frontend & Mobile
  {
    id: "react",
    name: "React 19",
    category: "Frontend",
    icon: ReactIcon,
    status: "Core Stack",
    description: "Declarative component-driven UI library for creating fast single-page apps and modern web applications.",
    useCase: "Production user interfaces with client-side state management, and modern hook composition.",
    link: "https://react.dev/",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    icon: TypeScriptIcon,
    status: "Core Stack",
    description: "Strongly typed superset of JavaScript providing compile-time type safety, IDE prediction, and resilient codebases.",
    useCase: "Strict typing for all frontend codebases, API contracts, and shared data schemas.",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: "flutter",
    name: "Flutter / Dart",
    category: "Frontend",
    icon: FlutterIcon,
    status: "Proficient",
    description: "Cross-platform application framework for building natively compiled mobile and desktop applications from a single codebase.",
    useCase: "Cross-platform mobile applications with offline SQLite caching.",
    link: "https://flutter.dev/",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "Frontend",
    icon: TailwindIcon,
    status: "Core Stack",
    description: "Utility-first CSS framework for rapid and maintainable modern UI layout development.",
    useCase: "Clean design systems, dark/light themes, and responsive layout foundations.",
    link: "https://tailwindcss.com/",
  },
  {
    id: "vite",
    name: "Vite",
    category: "Frontend",
    icon: ViteIcon,
    status: "Proficient",
    description: "Next-generation frontend tooling with lightning-fast HMR and optimized Rollup production builds.",
    useCase: "Rapid development environment and modern bundler configuration.",
    link: "https://vite.dev/",
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "Frontend",
    icon: ThreeJSIcon,
    status: "Proficient",
    description: "High-performance JavaScript 3D library for WebGL scenes, interactive particle constellations, and spatial experiences.",
    useCase: "Lightweight canvas particle meshes and ambient background simulations running at 60 FPS.",
    link: "https://threejs.org/",
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "Frontend",
    icon: GSAPIcon,
    status: "Proficient",
    description: "Industry-standard animation library for smooth UI transitions, interactive 3D physics, and kinetic typography.",
    useCase: "Magnetic hover physics, interactive 3D tilt cards, and fluid text scrambles.",
    link: "https://gsap.com/",
  },

  // Real-Time & Systems
  {
    id: "webrtc",
    name: "WebRTC",
    category: "Real-Time",
    icon: WebRTCIcon,
    status: "Core Stack",
    description: "Open-source protocol enabling real-time audio, video, and arbitrary data streaming between browsers without intermediate servers.",
    useCase: "Bypassing internet relay with RTCDataChannels, chunked binary streaming, and local network transfers.",
    link: "https://webrtc.org/",
  },
  {
    id: "websockets",
    name: "WebSockets / STOMP",
    category: "Real-Time",
    icon: WebSocketIcon,
    status: "Proficient",
    description: "Full-duplex bidirectional communication protocol over persistent connections.",
    useCase: "Real-time room negotiation, STUN/TURN signaling, and live status broadcasting.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  },

  // Database & DevOps
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    icon: PostgresIcon,
    status: "Core Stack",
    description: "Powerful, open-source object-relational database system with strong reliability and ACID compliance.",
    useCase: "Relational data modeling, indexed queries, and Spring Data JPA integration.",
    link: "https://www.postgresql.org/",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    icon: DockerIcon,
    status: "Proficient",
    description: "Containerization platform to package applications and their dependencies into portable containers.",
    useCase: "Containerizing backend services, database instances, and consistent developer environments.",
    link: "https://www.docker.com/",
  },
  {
    id: "git",
    name: "Git & Git Subtrees",
    category: "DevOps",
    icon: GitIcon,
    status: "Core Stack",
    description: "Distributed version control system with advanced branching, subtrees, and CI workflows.",
    useCase: "Monorepo management, branch protection rules, and mentoring student developers at devup.",
    link: "https://git-scm.com/",
  },
  {
    id: "linux",
    name: "Linux / POSIX",
    category: "DevOps",
    icon: LinuxIcon,
    status: "Proficient",
    description: "Unix-like operating system kernel, shell scripting, environment configuration, and server administration.",
    useCase: "Development environments, CLI tools, server deployment, and system monitoring.",
    link: "https://www.kernel.org/",
  },
  {
    id: "postman",
    name: "Postman",
    category: "DevOps",
    icon: PostmanIcon,
    status: "Proficient",
    description: "API platform for building, testing, and documenting REST endpoints.",
    useCase: "Comprehensive automated API testing, environment collections, and mock servers.",
    link: "https://www.postman.com/",
  },
]

// 2. Workstation & Hardware Items (matching bonabrian Uses page)
const workstationItems = [
  {
    id: "laptopIcon",
    title: "Development Machine",
    subtitle: "High-Performance Workstation",
    specs: "Acer Nitro 5 · Intel Core i5-12450H 12th Gen · 16GB RAM · RTX 3050 · 512GB NVMe SSD",
    icon: LaptopIcon,
    badge: "Primary Machine",
  },
  {
    id: "display",
    title: "External IPS Monitor",
    subtitle: "Productivity Display",
    specs: "Acer EK220Q · 21.5-inch FHD 100Hz IPS · Anti-Glare Eye Care",
    icon: DesktopIcon,
    badge: "Display",
  },
  {
    id: "keyboard",
    title: "Mechanical Keyboard",
    subtitle: "Tactile Switches",
    specs: "Portronics Hydra 10 · RGB Mechanical Keyboard with Red Switches (Hot-swappable)",
    icon: KeyboardIcon,
    badge: "Peripheral",
  },
  {
    id: "mobile",
    title: "Mobile Test Device",
    subtitle: "Real-Device Testing",
    specs: "Redmi Note 10 Pro · Snapdragon 732G · 6GB RAM · 120Hz Super AMOLED (Testing Lab)",
    icon: DeviceMobileIcon,
    badge: "Testing",
  },
]

// 3. Software & Daily Driver Apps (Devicons)
const softwareApps = [
  { name: "IntelliJ IDEA", category: "Java & Spring IDE", icon: "devicons-intellij-idea", color: "#FE2857" },
  { name: "VS Code", category: "Web & TS Editor", icon: "devicons-visual-studio-code", color: "#007ACC" },
  { name: "Postman", category: "API Testing & Mocks", icon: "devicons-postman-icon", color: "#FF6C37" },
  { name: "Docker", category: "Containerization", icon: "devicons-docker-icon", color: "#2496ED" },
  { name: "Warp", category: "Modern Terminal", icon: "devicons-terminal", color: "#29D2BF" },
  { name: "Git", category: "Version Control", icon: "devicons-git-icon", color: "#F05032" },
  { name: "PostgreSQL", category: "Relational DBMS", icon: "devicons-postgresql", color: "#336791" },
  { name: "TablePlus", category: "Database GUI", icon: "devicons-database", color: "#0284C7" },
  { name: "Figma", category: "UI & Prototype", icon: "devicons-figma", color: "#F24E1E" },
  { name: "Obsidian", category: "Knowledge & Notes", icon: "devicons-markdown", color: "#7C3AED" },
  { name: "Raycast", category: "Command Launcher", icon: "devicons-terminal", color: "#FF6363" },
  { name: "Linux / WSL2", category: "POSIX Kernel", icon: "devicons-linux-tux", color: "#FCC624" },
]

const categories = ["All", "Backend", "Frontend", "Real-Time", "Database", "DevOps"] as const

const statusColors: Record<string, string> = {
  "Core Stack": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
  "Proficient": "bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/30",
  "Familiar": "bg-surface-elevated text-body-strong border-hairline",
  "Exploring": "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30",
}

export default function TechStackPage() {
  usePageTitle("Tech Stack & Uses")
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All")

  const filteredTech =
    selectedCategory === "All"
      ? techDetails
      : techDetails.filter((t) => t.category === selectedCategory)

  const scrollToSection = (id: string) => {
    sound.click()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header matching bonabrian style */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <SparkleIcon size={13} weight="fill" />
            <span>Developer Tooling &amp; Setup</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-3">
            Tech Stack &amp; Uses
          </h1>
          <p className="text-body text-sm sm:text-base max-w-2xl font-normal leading-relaxed mb-6">
            A comprehensive catalog of the programming languages, distributed frameworks, daily software, and hardware gear I use to architect resilient systems.
          </p>

          {/* Quick-Jump Section Anchor Pills (Great for Mobile & Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x -mx-1 px-1">
            <button
              onClick={() => scrollToSection("technologies")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-xs font-medium transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
            >
              <CpuIcon size={14} className="text-emerald-500" />
              <span>Core Stack (18)</span>
            </button>
            <button
              onClick={() => scrollToSection("workstation")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-xs font-medium transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
            >
              <LaptopIcon size={14} className="text-sky-500" />
              <span>Workstation</span>
            </button>
            <button
              onClick={() => scrollToSection("software")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-xs font-medium transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
            >
              <TerminalWindowIcon size={14} className="text-amber-500" />
              <span>Daily Software</span>
            </button>
            <button
              onClick={() => scrollToSection("exploring")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-xs font-medium transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
            >
              <WrenchIcon size={14} className="text-purple-500" />
              <span>Exploring</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 pb-24 space-y-16">
        {/* ============================================================
            SECTION 1: PROGRAMMING LANGUAGES & FRAMEWORKS (TOP PRIORITY)
            ============================================================ */}
        <motion.section
          id="technologies"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <SparkleIcon size={14} weight="fill" />
                <span>Technologies &amp; Frameworks</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                Tech Stack Overview
              </h2>
            </div>

            {/* Category Filter Pills (Optimized for Mobile Touch Scrolling) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x -mx-1 px-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      sound.click()
                      setSelectedCategory(cat)
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer active:scale-95 shrink-0 min-h-[34px] flex items-center ${
                      isActive
                        ? "bg-ink text-canvas border border-ink shadow-xs font-semibold"
                        : "bg-surface-card text-muted hover:text-ink border border-hairline hover:border-muted"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cards Grid: 1 col on mobile, 2 cols on md+ */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredTech.map((tech) => {
                const Icon = tech.icon
                return (
                  <motion.div
                    key={tech.id}
                    id={tech.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="scroll-mt-24 h-full"
                  >
                    <GsapTiltCard
                      maxRotation={4}
                      scaleOnHover={1.015}
                      className="h-full rounded-2xl border border-hairline bg-surface-card hover:border-emerald-500/40 dark:hover:border-emerald-400/40 p-4 sm:p-6 transition-colors duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md"
                    >
                      <div>
                        {/* Top Row: Icon + Name + Status */}
                        <div className="flex items-start justify-between gap-2.5 mb-3 flex-wrap">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-hairline flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                              <Icon size={22} className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-ink text-base group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors truncate">
                                {tech.name}
                              </h3>
                              <span className="text-xs text-muted font-normal">{tech.category}</span>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1 rounded-full border font-medium shrink-0 ${
                              statusColors[tech.status] || "bg-surface-elevated text-body-strong border-hairline"
                            }`}
                          >
                            {tech.status}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-body leading-relaxed mb-3 font-normal">
                          {tech.description}
                        </p>

                        {/* Application Context */}
                        <div className="text-xs text-muted bg-surface-soft border border-hairline rounded-lg p-2.5 sm:p-3 mb-4 leading-relaxed font-normal">
                          <strong className="text-strong font-semibold text-ink">Application: </strong>
                          {tech.useCase}
                        </div>
                      </div>

                      {/* External Documentation Link */}
                      <div className="pt-2 border-t border-hairline flex justify-end">
                        <a
                          href={tech.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-1 px-1"
                        >
                          <span>Official Documentation</span>
                          <ArrowSquareOutIcon size={13} />
                        </a>
                      </div>
                    </GsapTiltCard>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* ============================================================
            SECTION 2: WORKSTATION & HARDWARE (Uses)
            ============================================================ */}
        <motion.section
          id="workstation"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <LaptopIcon size={14} weight="bold" />
              <span>Hardware &amp; Everyday Gear</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Workstation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workstationItems.map((item) => {
              const ItemIcon = item.icon
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                  className="rounded-2xl border border-hairline bg-surface-card hover:border-zinc-400 dark:hover:border-zinc-600 p-4 sm:p-5 transition-all duration-200 shadow-xs flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-hairline flex items-center justify-center text-body-strong group-hover:text-ink group-hover:scale-105 transition-transform shrink-0 shadow-xs">
                    <ItemIcon size={24} weight="duotone" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-ink text-sm sm:text-base group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors truncate">
                        {item.title}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-hairline bg-surface-elevated text-muted font-mono shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-body mt-1 line-clamp-2 font-normal leading-relaxed">
                      {item.specs}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 3: SOFTWARE & DAILY DRIVER APPS
            ============================================================ */}
        <motion.section
          id="software"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <TerminalWindowIcon size={14} weight="bold" />
              <span>Development Tools &amp; Utilities</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Software &amp; Daily Drivers
            </h2>
          </div>

          <div className="rounded-2xl border border-dashed border-hairline bg-surface-soft/60 p-5 sm:p-8 shadow-inner">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
              {softwareApps.map((app) => (
                <motion.div
                  key={app.name}
                  whileHover={{ scale: 1.1, y: -4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 text-center cursor-pointer group select-none min-h-[70px]"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-card border border-hairline group-hover:border-zinc-400 dark:group-hover:border-zinc-600 flex items-center justify-center p-2.5 sm:p-3 transition-all duration-200 shadow-xs">
                    <i
                      className={`devicons ${app.icon} text-[24px] sm:text-[28px] transition-transform duration-200 group-hover:scale-110`}
                      style={{ color: app.color }}
                      aria-label={app.name}
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-body-strong group-hover:text-ink transition-colors tracking-tight line-clamp-1">
                    {app.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 4: CURRENTLY EXPLORING CALLOUT
            ============================================================ */}
        <motion.div
          id="exploring"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl border border-hairline bg-surface-card p-5 sm:p-8 shadow-xs hover:shadow-sm transition-all scroll-mt-24"
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm mb-2">
            <CpuIcon size={18} weight="fill" />
            <span>Currently Exploring &amp; Deepening</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2 tracking-tight">
            Distributed Systems &amp; Cloud Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-body leading-relaxed mb-4 max-w-2xl font-normal">
            Actively expanding into distributed consensus architectures, Apache Kafka event streaming, Kubernetes orchestration, and enterprise CI/CD automation pipelines.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Kafka Event Streaming",
              "Kubernetes",
              "Microservices Architecture",
              "CI/CD Pipelines",
              "System Design",
            ].map((item) => (
              <span
                key={item}
                className="text-xs px-3 py-1 rounded-full border border-hairline bg-surface-elevated text-body-strong font-medium shadow-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
