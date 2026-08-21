import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowSquareOut,
  Sparkle,
  Cpu,
  Laptop,
  Desktop,
  Keyboard,
  DeviceMobile,
} from "@phosphor-icons/react"

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
  IntelliJIcon,
  VSCodeIcon,
  WarpIcon,
  ObsidianIcon,
  SpotifyIcon,
  CloudflareIcon,
  FigmaIcon,
  ViteIcon,
  WebSocketIcon,
} from "@/components/TechIcons"

// 1. Workstation & Hardware Items (matching bonabrian Uses page)
const workstationItems = [
  {
    id: "laptop",
    title: "Development Machine",
    subtitle: "High-Performance Workstation",
    specs: "Core i7 CPU · 16GB RAM · 512GB Fast NVMe SSD",
    icon: Laptop,
    badge: "Primary",
  },
  {
    id: "display",
    title: "External IPS Monitor",
    subtitle: "Productivity Display",
    specs: "24\" FHD 100Hz IPS Monitor with Wide Color Gamut",
    icon: Desktop,
    badge: "Display",
  },
  {
    id: "keyboard",
    title: "Mechanical Keyboard",
    subtitle: "Custom Tactile Switches",
    specs: "75% Layout with Sound Dampening & Custom Keycaps",
    icon: Keyboard,
    badge: "Peripheral",
  },
  {
    id: "mobile",
    title: "Mobile Test Bench",
    subtitle: "Real-Device Testing",
    specs: "Android & iOS Testbed for Flutter & WebRTC P2P Verification",
    icon: DeviceMobile,
    badge: "Testing",
  },
]

// 2. Software & Daily Driver Apps (matching bonabrian dashed app grid)
const softwareApps = [
  { name: "IntelliJ IDEA", category: "Java & Spring IDE", icon: IntelliJIcon, bg: "bg-[#000000]" },
  { name: "VS Code", category: "Web & TS Editor", icon: VSCodeIcon, bg: "bg-[#007ACC]/10" },
  { name: "Postman", category: "API Testing & Mocks", icon: PostmanIcon, bg: "bg-[#FF6C37]/10" },
  { name: "Docker", category: "Containerization", icon: DockerIcon, bg: "bg-[#2496ED]/10" },
  { name: "Warp", category: "Modern Terminal", icon: WarpIcon, bg: "bg-[#010409]" },
  { name: "Git", category: "Version Control", icon: GitIcon, bg: "bg-[#F05032]/10" },
  { name: "PostgreSQL", category: "Relational DBMS", icon: PostgresIcon, bg: "bg-[#336791]/10" },
  { name: "Obsidian", category: "Knowledge & Notes", icon: ObsidianIcon, bg: "bg-[#7C3AED]/10" },
  { name: "Figma", category: "UI & Prototype", icon: FigmaIcon, bg: "bg-[#F24E1E]/10" },
  { name: "Spotify", category: "Music & Focus", icon: SpotifyIcon, bg: "bg-[#1DB954]/10" },
  { name: "Cloudflare", category: "DNS & Edge CDN", icon: CloudflareIcon, bg: "bg-[#F38020]/10" },
  { name: "Linux", category: "POSIX & Shell", icon: LinuxIcon, bg: "bg-[#FCC624]/10" },
]

// 3. Technologies & Frameworks
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
    description: "Declarative component-based UI library for creating high-performance modern web applications.",
    useCase: "Interactive client dashboards, state management, and real-time P2P interfaces.",
    link: "https://react.dev/",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    icon: TypeScriptIcon,
    status: "Core Stack",
    description: "Strongly typed superset of JavaScript that enhances code quality, autocompletion, and refactoring safety.",
    useCase: "Full-stack type safety across React frontends and Node backend services.",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: "flutter",
    name: "Flutter / Dart",
    category: "Frontend",
    icon: FlutterIcon,
    status: "Proficient",
    description: "Google's multi-platform framework for building natively compiled mobile and desktop apps from a single codebase.",
    useCase: "Cross-platform mobile applications including Daily Quotes App.",
    link: "https://flutter.dev/",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "Frontend",
    icon: TailwindIcon,
    status: "Core Stack",
    description: "Utility-first CSS framework for rapid and modern design system implementations.",
    useCase: "Crafting minimalist dark aesthetics, responsive layouts, and UI components.",
    link: "https://tailwindcss.com/",
  },
  {
    id: "vite",
    name: "Vite",
    category: "Frontend",
    icon: ViteIcon,
    status: "Proficient",
    description: "Next-generation frontend tooling with lightning-fast Hot Module Replacement (HMR).",
    useCase: "Bundling and local developer tooling for React projects.",
    link: "https://vite.dev/",
  },

  // Real-Time & Protocols
  {
    id: "webrtc",
    name: "WebRTC",
    category: "Real-Time",
    icon: WebRTCIcon,
    status: "Core Stack",
    description: "Open protocol enabling real-time audio, video, and arbitrary peer-to-peer data transmission directly between browsers.",
    useCase: "Engineered MangoShare Clone zero-server file sharing with RTCDataChannels.",
    link: "https://webrtc.org/",
  },
  {
    id: "websockets",
    name: "WebSockets",
    category: "Real-Time",
    icon: WebSocketIcon,
    status: "Proficient",
    description: "Full-duplex bidirectional communication protocol over a single TCP connection.",
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

const categories = ["All", "Backend", "Frontend", "Real-Time", "Database", "DevOps"] as const

const statusColors: Record<string, string> = {
  "Core Stack": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "Proficient": "bg-sky-500/10 text-sky-300 border-sky-500/20",
  "Familiar": "bg-zinc-800/80 text-zinc-300 border-zinc-700",
  "Exploring": "bg-amber-500/10 text-amber-300 border-amber-500/20",
}

export default function TechStackPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All")

  const filteredTech =
    selectedCategory === "All"
      ? techDetails
      : techDetails.filter((t) => t.category === selectedCategory)

  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header matching bonabrian Uses page */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
            Uses
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg font-normal">
            A list of the tools, apps, technologies, and hardware I use on a regular basis.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">
        {/* ============================================================
            SECTION 1: WORKSTATION & HARDWARE (Matching Image)
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">
            Workstation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workstationItems.map((item) => {
              const ItemIcon = item.icon
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                  className="rounded-2xl border border-[#27272a] bg-[#141414] hover:border-zinc-500 p-5 transition-all duration-200 shadow-md flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1c1c20] border border-[#2e2e34] flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-transform flex-shrink-0">
                    <ItemIcon size={24} weight="duotone" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-zinc-200 transition-colors truncate">
                        {item.title}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800/60 text-zinc-400 font-mono">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 font-normal leading-relaxed">
                      {item.specs}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 2: SOFTWARE & DAILY DRIVERS (Dashed App Grid from Image)
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 tracking-tight">
            Software
          </h2>

          <div className="rounded-2xl border border-dashed border-[#2e2e34] bg-[#101014]/60 p-6 sm:p-8 shadow-inner">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 sm:gap-7">
              {softwareApps.map((app) => {
                const AppSvg = app.icon
                return (
                  <motion.div
                    key={app.name}
                    whileHover={{ scale: 1.12, y: -4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2.5 text-center cursor-pointer group select-none"
                  >
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#18181c] border border-[#2b2b32] group-hover:border-zinc-500 group-hover:shadow-[0_8px_20px_rgba(255,255,255,0.08)] flex items-center justify-center p-3 transition-all duration-200 shadow-md">
                      <AppSvg size={28} className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight">
                      {app.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 3: PROGRAMMING LANGUAGES & FRAMEWORKS
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkle size={14} weight="fill" />
                <span>Technologies &amp; Frameworks</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Tech Stack Overview
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-white/10 text-white border border-white/30 shadow-sm"
                        : "bg-[#141414] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-600"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredTech.map((tech) => {
                const Icon = tech.icon
                return (
                  <motion.div
                    key={tech.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-[#27272a] bg-[#141414] hover:border-zinc-500 p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Top Row: Icon + Name + Status */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1c1c20] border border-[#2e2e34] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Icon size={22} className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-white transition-colors">
                              {tech.name}
                            </h3>
                            <span className="text-xs text-zinc-500">{tech.category}</span>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${
                            statusColors[tech.status] || "bg-zinc-800 text-zinc-300 border-zinc-700"
                          }`}
                        >
                          {tech.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-zinc-400 leading-relaxed mb-3 font-normal">
                        {tech.description}
                      </p>

                      {/* Application Context */}
                      <div className="text-xs text-zinc-500 bg-[#19191d] border border-[#26262a] rounded-lg p-3 mb-4">
                        <strong className="text-zinc-300 font-medium">Application: </strong>
                        {tech.useCase}
                      </div>
                    </div>

                    {/* External Documentation Link */}
                    <div className="pt-2 border-t border-[#1f1f23] flex justify-end">
                      <a
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        <span>Official Documentation</span>
                        <ArrowSquareOut size={13} />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* ============================================================
            SECTION 4: CURRENTLY EXPLORING CALLOUT
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl border border-zinc-700/60 bg-gradient-to-br from-[#1c1c22] via-[#141414] to-[#141414] p-6 sm:p-8 shadow-lg"
        >
          <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm mb-2">
            <Cpu size={18} />
            <span>Currently Exploring &amp; Deepening</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Distributed Systems &amp; Cloud Infrastructure
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4 max-w-2xl font-normal">
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
                className="text-xs px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/80 text-zinc-300 font-medium"
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
