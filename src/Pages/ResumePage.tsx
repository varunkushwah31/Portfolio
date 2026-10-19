import React from "react"
import { motion } from "framer-motion"
import { usePageTitle } from "@/hooks/usePageTitle"
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
    period: "Aug 2024 – Present",
    location: "Campus · Hybrid",
    icon: <CheckCircleIcon size={20} weight="fill" className="text-emerald-600 dark:text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "Git", icon: GitIcon },
      { name: "Linux", icon: LinuxIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
    ],
    bullets: [
      "Spearheaded Java curriculum and structured hands-on backend modules for 20+ active student members, accelerating peer readiness for software engineering internships.",
      "Conducted weekly algorithmic problem-solving sessions on trees, graphs, and dynamic programming, mentoring juniors to improve average coding speed and accuracy by 30%.",
      "Orchestrated code reviews & Git workflows, enforcing clean architecture patterns, OOP principles, and test-driven development practices across collaborative cohort projects.",
    ],
  },
]

const projects: ResumeEntry[] = [
  {
    id: "mentorsync",
    role: "MentorSync (LeetCode Progress & Classroom LMS)",
    organization: "EdTech Bootcamp LMS & Automated Verification Engine",
    type: "Full-Stack System",
    period: "2024 – Present",
    icon: <CodeIcon size={20} weight="bold" className="text-indigo-600 dark:text-indigo-400" />,
    iconBg: "bg-indigo-500/10 border-indigo-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "React", icon: ReactIcon },
      { name: "Docker", icon: DockerIcon },
    ],
    bullets: [
      "Architected a scalable two-sided LMS for bootcamps and educators to automate LeetCode & Codeforces progress tracking, classroom assignment distribution, and real-time leaderboards.",
      "Built automated verification pipeline consuming LeetCode GraphQL/REST APIs and regex parsing to validate submissions, eliminating manual grading overhead for 100+ active submissions.",
      "Engineered nightly Redis cache warming worker (03:00 UTC) with atomic distributed locks (setIfAbsent) ensuring 0ms peak latency, STOMP WebSockets, and Resilience4j circuit breakers.",
      "Tech Stack: Java 21, Spring Boot 4, React 19, TypeScript, Redis 7+, MongoDB, Spring Security, Docker, Resilience4j.",
    ],
  },
  {
    id: "w2w-share",
    role: "W2W Share (Offline Encrypted P2P File Transfer)",
    organization: "Enterprise Offline Encrypted P2P File Sharing",
    type: "Distributed Systems Project",
    period: "2024 – Present",
    icon: <GlobeIcon size={20} weight="bold" className="text-rose-600 dark:text-rose-400" />,
    iconBg: "bg-rose-500/10 border-rose-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "WebRTC", icon: WebRTCIcon },
      { name: "React", icon: ReactIcon },
      { name: "Docker", icon: DockerIcon },
    ],
    bullets: [
      "Engineered an offline peer-to-peer file transfer platform using WebRTC RTCDataChannels over UDP, bypassing central servers with zero internet required.",
      "Built high-concurrency Java 25 Virtual Threads & Spring Boot 4 WebSocket signaling broker with 10k connection pooling, ZXing QR-pairing, and UDP subnet discovery.",
      "Engineered 64KB chunk streaming protocol with Bouncy Castle AES-256-GCM encryption and backpressure control, handling up to 50GB transfers with <50MB RAM.",
      "Tech Stack: Java 25, Spring Boot 4.1, WebRTC, Bouncy Castle, Virtual Threads, ZXing, WebSockets, Docker, Prometheus.",
    ],
  },
  {
    id: "stateless-auth-service",
    role: "Stateless Authentication & RBAC Service",
    organization: "Microservice Security & Identity Provider",
    type: "Backend Security System",
    period: "2024 – Present",
    icon: <GlobeIcon size={20} weight="bold" className="text-emerald-600 dark:text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/30",
    techIcons: [
      { name: "Java", icon: JavaIcon },
      { name: "Spring Boot", icon: SpringIcon },
      { name: "PostgreSQL", icon: PostgresIcon },
      { name: "Docker", icon: DockerIcon },
    ],
    bullets: [
      "Designed a modular stateless authentication service implementing JWT access/refresh token rotation and OAuth 2.0 social sign-in, eliminating server-side session memory overhead.",
      "Configured custom Spring Security filter chains with granular Role-Based Access Control (RBAC), securing 15+ REST endpoints with zero unauthorized access vulnerabilities.",
      "Integrated relational persistence layer with connection pooling, automated validation filters, and comprehensive integration testing via Postman.",
      "Tech Stack: Java, Spring Boot, Spring Security, JWT, OAuth 2.0, PostgreSQL, Docker.",
    ],
  },
]

const education: ResumeEntry[] = [
  {
    id: "kiet-btech",
    role: "B.Tech, Computer Science & Engineering",
    organization: "KIET Group of Institutions",
    type: "Undergraduate Degree",
    period: "2024 – 2028",
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
      "Specializing in Computer Science & Engineering with core coursework in Data Structures, Algorithms, Operating Systems, Database Management Systems, and Object-Oriented Software Design.",
      "Current Academic Standing: CGPA 8.27 / 10.00.",
    ],
  },
  {
    id: "st-stephens",
    role: "Senior Secondary (CBSE XII) & Secondary (CBSE X)",
    organization: "New St. Stephens Public School",
    type: "High School Education",
    period: "2021 – 2023",
    location: "Agra, India",
    icon: <GraduationCapIcon size={20} weight="bold" className="text-sky-400" />,
    iconBg: "bg-sky-500/10 border-sky-500/30",
    bullets: [
      "Class XII (CBSE): 80.0% | Class X (CBSE): 82.0%.",
      "Strong academic foundation in Mathematics, Computer Science, and Physics.",
    ],
  },
]

const achievements = [
  "500+ Problems Solved on LeetCode: Strong algorithmic mastery across arrays, trees, graphs, and dynamic programming.",
  "Top 105 Nationally — Google Solution Challenge 2025: Recognized out of thousands of submissions across India.",
]

const skillsList = [
  "Java 17/21",
  "Spring Boot",
  "Spring Security",
  "Spring Data JPA",
  "Hibernate",
  "RESTful APIs",
  "WebSockets",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Git & GitHub",
  "Linux / Bash",
  "Postman",
  "Maven / Gradle",
  "Data Structures & Algorithms",
  "OOP & System Design Basics",
]

function renderBulletText(bullet: string) {
  if (bullet.startsWith("Tech Stack:")) {
    return (
      <span>
        <strong className="text-strong font-semibold">Tech Stack:</strong>
        {bullet.slice("Tech Stack:".length)}
      </span>
    )
  }
  return <span>{bullet}</span>
}

export default function ResumePage() {
  usePageTitle("Resume")
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-hairline pb-8"
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight mb-2">
              Resume
            </h1>
            <p className="text-muted text-base sm:text-lg font-normal leading-relaxed">
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-sm font-medium transition-all duration-150 shadow-xs hover:shadow-sm whitespace-nowrap"
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
          <div className="flex items-center gap-2.5 mb-6 text-emerald-600 dark:text-emerald-400">
            <BriefcaseIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Experience & Leadership
            </h2>
          </div>

          <div className="space-y-8">
            {experiences.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-10 h-10 rounded-full border ${entry.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
                >
                  {entry.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                      {entry.role}
                    </h3>
                    <span className="text-xs font-mono text-muted shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  <div className="text-sm text-body-strong font-medium mt-0.5">
                    {entry.organization} <span className="text-muted font-normal">· {entry.type}</span>
                  </div>

                  {entry.techIcons && (
                    <div className="flex items-center gap-1.5 mt-2.5 mb-3 flex-wrap">
                      {entry.techIcons.map((tech) => {
                        const TechSvg = tech.icon
                        return (
                          <div
                            key={tech.name}
                            className="w-6 h-6 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center text-body-strong shadow-xs"
                            title={tech.name}
                          >
                            <TechSvg size={13} className="w-3.5 h-3.5" />
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <ul className="space-y-2 text-sm text-body font-normal leading-relaxed mt-2">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-1.5 shrink-0 text-xs">•</span>
                        {renderBulletText(bullet)}
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
          <div className="flex items-center gap-2.5 mb-6 text-sky-600 dark:text-sky-400">
            <FolderIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="space-y-10">
            {projects.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-10 h-10 rounded-full border ${entry.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
                >
                  {entry.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                      {entry.role}
                    </h3>
                    <span className="text-xs font-mono text-muted shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  <div className="text-sm text-body-strong font-medium mt-0.5">
                    {entry.organization} <span className="text-muted font-normal">· {entry.type}</span>
                  </div>

                  {entry.techIcons && (
                    <div className="flex items-center gap-1.5 mt-2.5 mb-3 flex-wrap">
                      {entry.techIcons.map((tech) => {
                        const TechSvg = tech.icon
                        return (
                          <div
                            key={tech.name}
                            className="w-6 h-6 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center text-body-strong shadow-xs"
                            title={tech.name}
                          >
                            <TechSvg size={13} className="w-3.5 h-3.5" />
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <ul className="space-y-2 text-sm text-body font-normal leading-relaxed mt-2">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-sky-600 dark:text-sky-400 mt-1.5 shrink-0 text-xs">•</span>
                        {renderBulletText(bullet)}
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
          <div className="flex items-center gap-2.5 mb-6 text-indigo-600 dark:text-indigo-400">
            <GraduationCapIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Education
            </h2>
          </div>

          <div className="space-y-8">
            {education.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-10 h-10 rounded-full border ${entry.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
                >
                  {entry.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                      {entry.role}
                    </h3>
                    <span className="text-xs font-mono text-muted shrink-0">
                      {entry.period}
                    </span>
                  </div>

                  <div className="text-sm text-body-strong font-medium mt-0.5">
                    {entry.organization} {entry.location && <span className="text-emerald-500 dark:text-emerald-400 font-mono text-xs ml-2 font-medium">[{entry.location}]</span>}
                  </div>

                  <ul className="space-y-2 text-sm text-body font-normal leading-relaxed mt-3">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1.5 shrink-0 text-xs">•</span>
                        {renderBulletText(bullet)}
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
          <div className="flex items-center gap-2.5 mb-4 text-amber-600 dark:text-amber-400">
            <TrophyIcon size={20} weight="bold" />
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Key Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-card border border-hairline text-sm text-body-strong font-medium flex items-center gap-3 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
            Technical Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-surface-card border border-hairline text-body-strong hover:text-ink hover:bg-surface-elevated transition-colors shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Timestamp */}
        <div className="pt-8 border-t border-hairline text-xs text-muted font-normal">
          Last updated at <span className="text-body-strong font-medium">August, 2026</span>
        </div>
      </div>
    </div>
  )
}

