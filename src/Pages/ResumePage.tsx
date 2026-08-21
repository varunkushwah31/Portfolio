import React from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Code,
  Globe,
  DeviceMobile,
  GraduationCap,
  DownloadSimple,
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
} from "@/components/TechIcons"

interface ResumeEntry {
  id: string
  role: string
  organization: string
  type: string
  period: string
  location: string
  icon: React.ReactNode
  iconBg: string
  techIcons: Array<{ name: string; icon: React.FC<{ size?: number; className?: string }> }>
  bullets: string[]
}

const resumeEntries: ResumeEntry[] = [
  {
    id: "devup-lead",
    role: "Java Coordinator & Lead Mentor",
    organization: "devup Technical Club",
    type: "Leadership · Mentorship",
    period: "Jan 2024 – Present · 1 yr+",
    location: "Campus · Hybrid",
    icon: <CheckCircle size={18} weight="fill" className="text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "Git", icon: GitIcon },
      { name: "Linux", icon: LinuxIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
    ],
    bullets: [
      "Elected as Java Coordinator to spearhead technical workshops and organize university-wide competitive programming and architecture hackathons.",
      "Mentoring 100+ students in core Java fundamentals, object-oriented design patterns, Spring Boot microservices, and clean Git branching workflows.",
      "Architected modular code repositories and guided student contributors on pull requests, code reviews, and test-driven development.",
      "Authored comprehensive workshop modules and starter boilerplates for enterprise Java development.",
    ],
  },
  {
    id: "mangoshare",
    role: "Backend & Real-Time Engineer",
    organization: "MangoShare P2P Protocol",
    type: "Distributed Systems · Project Lead",
    period: "Dec 2023 – Present · 1 yr 3 mos",
    location: "India · Remote",
    icon: <Globe size={18} weight="bold" className="text-rose-400" />,
    iconBg: "bg-rose-500/10 border-rose-500/30",
    techIcons: [
      { name: "React", icon: ReactIcon },
      { name: "WebRTC", icon: WebRTCIcon },
      { name: "TypeScript", icon: TypeScriptIcon },
      { name: "Node.js", icon: NodeIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
    ],
    bullets: [
      "Designed and implemented a decentralized browser-to-browser P2P file-sharing application using WebRTC DataChannels with zero intermediate server payload routing.",
      "Engineered WebSocket signaling servers for SDP handshake negotiation, STUN/TURN ICE candidate gathering, and real-time room discovery.",
      "Handled binary file chunking, ArrayBuffer serialization, backpressure flow control, and end-to-end checksum verification for fast transfers.",
      "Built responsive modern frontend with React and TypeScript, providing live progress meters, transfer speed gauges, and automatic peer reconnects.",
    ],
  },
  {
    id: "leetcode-tracker",
    role: "Full-Stack Developer",
    organization: "LeetCode Tracker & Monorepo",
    type: "Developer Tooling · Open Source",
    period: "2024 · Full-Stack",
    location: "India · Remote",
    icon: <Code size={18} weight="bold" className="text-sky-400" />,
    iconBg: "bg-sky-500/10 border-sky-500/30",
    techIcons: [
      { name: "TypeScript", icon: TypeScriptIcon },
      { name: "React", icon: ReactIcon },
      { name: "Node.js", icon: NodeIcon },
      { name: "Docker", icon: DockerIcon },
      { name: "Git", icon: GitIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
    ],
    bullets: [
      "Developed full-stack algorithmic progress dashboard with automated problem tracking, tagging, revision schedules, and custom analytical metrics.",
      "Integrated responsive modern UI with Tailwind CSS v4, dark-mode first design tokens, and smooth Framer Motion animations.",
      "Configured Git subtrees and modular architecture for coordinated deployment and clean code reusability across full-stack applications.",
      "Implemented Docker containerization and automated test suites for reproducible local development and build verification.",
    ],
  },
  {
    id: "mobile-ml",
    role: "Mobile App & ML Developer",
    organization: "Daily Quotes App & ML Classifier",
    type: "Mobile Engineering · Machine Learning",
    period: "2023 – 2024 · 1 yr",
    location: "India · Remote",
    icon: <DeviceMobile size={18} weight="bold" className="text-purple-400" />,
    iconBg: "bg-purple-500/10 border-purple-500/30",
    techIcons: [
      { name: "Flutter", icon: FlutterIcon },
      { name: "Python", icon: PythonIcon },
      { name: "Docker", icon: DockerIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
    ],
    bullets: [
      "Engineered cross-platform Daily Quotes mobile application using Flutter & Dart with clean state management, local SQLite caching, and fluid animations.",
      "Built automated ML classification pipelines in Python for agricultural disease diagnosis with high precision and recall benchmarks.",
      "Containerized Python inference scripts with Docker and structured REST endpoints for seamless frontend and mobile consumption.",
    ],
  },
  {
    id: "education",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Engineering College",
    type: "Undergraduate Degree",
    period: "Aug 2023 – Expected May 2027 · 4 yrs",
    location: "India · On-Campus",
    icon: <GraduationCap size={18} weight="bold" className="text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Python", icon: PythonIcon },
      { name: "Git", icon: GitIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
    ],
    bullets: [
      "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Operating Systems, Computer Networks.",
      "Active Java Coordinator at devup technical club, organizing campus-wide student mentoring and developer workshops.",
      "Consistently maintaining strong academic standing while building production-grade software projects.",
    ],
  },
]

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
              Resume
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg font-normal">
              A brief overview of my professional journey and career milestones.
            </p>
          </div>

          {/* Top-Right Download Resume Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <a
              href="mailto:varun.kush3@gmail.com?subject=Resume%20Request%20-%20Varun%20Kushwah"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#3f3f46] hover:border-[#71717a] bg-[#09090b] text-white text-xs sm:text-sm font-medium transition-all duration-150 shadow-[0_2px_0_0_rgba(255,255,255,0.15)] hover:shadow-none whitespace-nowrap self-start sm:self-auto"
            >
              <DownloadSimple size={15} weight="bold" />
              <span>Download resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Experience Stream Container matching Image 2 */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-12 mt-4">
          {resumeEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="flex items-start gap-4 sm:gap-5"
            >
              {/* Left Column: Avatar Icon matching bonabrian */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border ${entry.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}
              >
                {entry.icon}
              </div>

              {/* Right Column: Detailed Experience Entry */}
              <div className="flex-1 min-w-0">
                {/* Role Title */}
                <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                  {entry.role}
                </h3>

                {/* Organization & Type */}
                <div className="text-sm text-zinc-300 font-medium mt-0.5">
                  {entry.organization} <span className="text-zinc-500 font-normal">· {entry.type}</span>
                </div>

                {/* Period & Location */}
                <div className="text-xs text-zinc-500 mt-1 font-normal">
                  {entry.period}
                </div>
                <div className="text-xs text-zinc-500 font-normal">
                  {entry.location}
                </div>

                {/* Mini Tech Stack Icon Row under header */}
                <div className="flex items-center gap-1.5 mt-3 mb-3.5 flex-wrap">
                  {entry.techIcons.map((tech) => {
                    const TechSvg = tech.icon
                    return (
                      <div
                        key={tech.name}
                        className="w-6 h-6 rounded-md bg-[#18181b] border border-[#27272a] flex items-center justify-center text-zinc-300 shadow-sm"
                        title={tech.name}
                      >
                        <TechSvg size={13} className="w-3.5 h-3.5" />
                      </div>
                    )
                  })}
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                  {entry.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="flex items-start gap-2.5">
                      <span className="text-zinc-600 mt-1.5 flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Timestamp matching reference image */}
        <div className="mt-16 pt-8 border-t border-[#1f1f23] text-xs text-zinc-500 font-normal">
          Last updated at <span className="text-zinc-400 font-medium">August, 2026</span>
        </div>
      </div>
    </div>
  )
}
