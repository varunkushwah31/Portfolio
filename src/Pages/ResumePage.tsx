import React from "react"
import { motion } from "framer-motion"
import {
  CheckCircleIcon,
  CodeIcon,
  GlobeIcon,
  GraduationCapIcon,
  DownloadSimpleIcon,
  TrophyIcon,
  BriefcaseIcon,
  FolderIcon,
} from "@phosphor-icons/react"

import {
  JavaIcon,
  SpringIcon,
  ReactIcon,
  PythonIcon,
  TypeScriptIcon,
  DockerIcon,
  GitIcon,
  WebRTCIcon,
  PostgresIcon,
  LinuxIcon,
} from "@/components/TechIcons"

interface ResumeEntry {
  id: string
  role: string
  organization: string
  type: string
  period: string
  location?: string
  icon: React.ReactNode
  iconBg: string
  techIcons?: Array<{ name: string; icon: React.FC<{ size?: number; className?: string }> }>
  bullets: string[]
}

const experiences: ResumeEntry[] = [
  {
    id: "devup-coordinator",
    role: "Java & DSA Coordinator",
    organization: "Devup - College Tech Club",
    type: "Leadership & Mentorship",
    period: "2024 – Present",
    location: "Campus · Hybrid",
    icon: <CheckCircleIcon size={20} weight="fill" className="text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "Git", icon: GitIcon },
      { name: "Linux", icon: LinuxIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
    ],
    bullets: [
      "Spearhead Java-focused learning initiatives for 20+ club members, accelerating peer readiness for technical interviews.",
      "Guide peers in algorithmic problem-solving; improved mentee problem-solving speed by 30%.",
      "Run weekly DSA sessions on trees, graphs, and dynamic programming.",
    ],
  },
]

const projects: ResumeEntry[] = [
  {
    id: "leetcode-tracker",
    role: "LeetcodeTracker",
    organization: "Full-Stack Coding Progress Tracker",
    type: "Personal Project",
    period: "04/2026",
    icon: <CodeIcon size={20} weight="bold" className="text-sky-400" />,
    iconBg: "bg-sky-500/10 border-sky-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "React", icon: ReactIcon },
      { name: "Docker", icon: DockerIcon },
    ],
    bullets: [
      "Built a full-stack coding-progress tracker with real-time metrics across 100+ tracked submissions.",
      "Tech Stack: Java, Spring Boot, React, MongoDB, Docker.",
    ],
  },
  {
    id: "w2w-share",
    role: "W2W Share",
    organization: "Enterprise Offline Encrypted P2P File Sharing",
    type: "Distributed Systems Project",
    period: "2024 – Present",
    icon: <GlobeIcon size={20} weight="bold" className="text-rose-400" />,
    iconBg: "bg-rose-500/10 border-rose-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "WebRTC", icon: WebRTCIcon },
      { name: "React", icon: ReactIcon },
      { name: "Docker", icon: DockerIcon },
    ],
    bullets: [
      "Architected a 100% offline peer-to-peer file transfer platform using WebRTC DataChannels with AES-256-GCM end-to-end encryption.",
      "Optimized for 10GB+ transfers with near-zero memory footprint; added Prometheus/Grafana observability via Docker.",
      "Tech Stack: Java 25, Spring Boot 4.x, WebRTC, WebSocket, React 19, Docker, Prometheus, Grafana.",
    ],
  },
  {
    id: "page-pulse",
    role: "Page Pulse",
    organization: "Full-Stack Web Auditing & SEO Analytics Platform",
    type: "Web Auditing Architecture",
    period: "2025 – Present",
    icon: <GlobeIcon size={20} weight="bold" className="text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "React", icon: ReactIcon },
      { name: "TypeScript", icon: TypeScriptIcon },
      { name: "Docker", icon: DockerIcon },
    ],
    bullets: [
      "Built a full-stack auditing platform delivering real-time SEO, accessibility, performance, and security metrics for any URL.",
      "Designed a dual-database architecture (H2 + MongoDB) with a Jsoup/Playwright scraping engine and WebSocket live progress streaming.",
      "Tech Stack: Java 25, Spring Boot, React 19, TypeScript, MongoDB, Redis, Playwright, Docker.",
    ],
  },
]

const education: ResumeEntry[] = [
  {
    id: "kiet-btech",
    role: "B.Tech, Computer Science",
    organization: "KIET Group of Institutions",
    type: "Undergraduate Degree",
    period: "2024 – Present",
    location: "CGPA: 8.27 / 10.00",
    icon: <GraduationCapIcon size={20} weight="bold" className="text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Python", icon: PythonIcon },
      { name: "Git", icon: GitIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
    ],
    bullets: [
      "Specializing in Computer Science & Engineering with core emphasis on Java, Spring Boot, and Distributed Architectures.",
      "Current Academic Standing: CGPA 8.27 / 10.00.",
    ],
  },
]

const achievements = [
  "500+ DSA problems solved on LeetCode",
  "Top 105 nationally - Google Solution Challenge 2025",
]

const skillsList = [
  "Java",
  "Spring",
  "Spring Boot",
  "Spring Security",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Tailwind CSS",
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Git",
  "Docker",
  "Data Structures",
  "Algorithms",
]

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-[#27272a] pb-8"
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
              Resume
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
              A brief overview of my professional journey and career milestones.
            </p>
          </div>

          {/* Top-Right Download Resume Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="shrink-0">
            <a
              href="/Varun_Kushwah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Varun_Kushwah_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3f3f46] hover:border-[#71717a] bg-[#09090b] hover:bg-[#18181b] text-white text-sm font-medium transition-all duration-150 shadow-[0_2px_0_0_rgba(255,255,255,0.15)] hover:shadow-none whitespace-nowrap"
            >
              <DownloadSimpleIcon size={16} weight="bold" />
              <span>Download resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-14">
        {/* Experience Section */}
        <section>
          <div className="flex items-center gap-2.5 mb-6 text-emerald-400">
            <BriefcaseIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Experience & Leadership
            </h2>
          </div>

          <div className="space-y-8">
            {experiences.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-10 h-10 rounded-full border ${entry.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}
                >
                  {entry.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                      {entry.role}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  <div className="text-sm text-zinc-300 font-medium mt-0.5">
                    {entry.organization} <span className="text-zinc-500 font-normal">· {entry.type}</span>
                  </div>

                  {entry.techIcons && (
                    <div className="flex items-center gap-1.5 mt-2.5 mb-3 flex-wrap">
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
                  )}

                  <ul className="space-y-2 text-sm text-zinc-300 font-normal leading-relaxed mt-2">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 mt-1.5 flex-shrink-0 text-xs">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section>
          <div className="flex items-center gap-2.5 mb-6 text-sky-400">
            <FolderIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="space-y-10">
            {projects.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-10 h-10 rounded-full border ${entry.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}
                >
                  {entry.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                      {entry.role}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  <div className="text-sm text-zinc-300 font-medium mt-0.5">
                    {entry.organization} <span className="text-zinc-500 font-normal">· {entry.type}</span>
                  </div>

                  {entry.techIcons && (
                    <div className="flex items-center gap-1.5 mt-2.5 mb-3 flex-wrap">
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
                  )}

                  <ul className="space-y-2 text-sm text-zinc-300 font-normal leading-relaxed mt-2">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-sky-400 mt-1.5 flex-shrink-0 text-xs">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <div className="flex items-center gap-2.5 mb-6 text-indigo-400">
            <GraduationCapIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Education
            </h2>
          </div>

          <div className="space-y-8">
            {education.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-10 h-10 rounded-full border ${entry.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}
                >
                  {entry.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                      {entry.role}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  <div className="text-sm text-zinc-300 font-medium mt-0.5">
                    {entry.organization} {entry.location && <span className="text-emerald-400 font-mono text-xs ml-2 font-medium">[{entry.location}]</span>}
                  </div>

                  <ul className="space-y-2 text-sm text-zinc-300 font-normal leading-relaxed mt-3">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-indigo-400 mt-1.5 flex-shrink-0 text-xs">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Achievements Section */}
        <section>
          <div className="flex items-center gap-2.5 mb-4 text-amber-400">
            <TrophyIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Key Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#141414] border border-[#27272a] text-sm text-zinc-200 font-medium flex items-center gap-3 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
            Technical Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Timestamp */}
        <div className="pt-8 border-t border-[#1f1f23] text-xs text-zinc-500 font-normal">
          Last updated at <span className="text-zinc-400 font-medium">August, 2026</span>
        </div>
      </div>
    </div>
  )
}

