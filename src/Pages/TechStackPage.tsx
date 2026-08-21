import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowSquareOutIcon, SparkleIcon, CpuIcon } from "@phosphor-icons/react"
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
} from "@/components/TechIcons"

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
    useCase: "Primary language for DSA, complex backend logic, and leading workshops at devup.",
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
    useCase: "Machine learning pipelines, predictive model evaluation, and scripting.",
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
  "Core Stack": "bg-violet-500/10 text-violet-300 border-violet-500/20",
  "Proficient": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "Familiar": "bg-blue-500/10 text-blue-300 border-blue-500/20",
  "Exploring": "bg-amber-500/10 text-amber-300 border-amber-500/20",
}

export default function TechStackPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All")

  const filteredTech = selectedCategory === "All"
    ? techDetails
    : techDetails.filter((t) => t.category === selectedCategory)

  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-violet-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
            <SparkleIcon size={16} weight="fill" />
            <span>Architecture & Tools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Tech Stack
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            A comprehensive list of programming languages, frameworks, protocols, and developer tools I leverage to build robust, scalable applications.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 mt-4 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-sm"
                    : "bg-[#141414] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Tech Stack Cards */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
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
                  className="rounded-2xl border border-[#27272a] bg-[#141414] hover:border-violet-500/40 p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Top Row: Icon + Name + Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1c1c20] border border-[#2e2e34] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Icon size={22} className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-violet-300 transition-colors">
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

                    {/* How Varun uses it */}
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
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-violet-300 transition-colors"
                    >
                      <span>Official Documentation</span>
                      <ArrowSquareOutIcon size={13} />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Currently Exploring Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 via-[#141414] to-[#141414] p-6 sm:p-8"
        >
          <div className="flex items-center gap-2.5 text-violet-400 font-semibold text-sm mb-2">
            <CpuIcon size={18} />
            <span>Currently Exploring &amp; Deepening</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Distributed Systems &amp; Cloud Infrastructure
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4 max-w-2xl font-normal">
            Actively expanding into distributed consensus architectures, Apache Kafka event streaming, Kubernetes orchestration, and enterprise CI/CD automation pipelines.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Kafka Event Streaming", "Kubernetes", "Microservices Architecture", "CI/CD Pipelines", "System Design"].map(
              (item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-medium"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
