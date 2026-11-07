import React, { useState } from "react"
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
  CopyIcon,
  CheckIcon,
  FilePdfIcon,
  FileTextIcon,
  EyeIcon,
  SparkleIcon,
  ArrowSquareOutIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
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
  LeetCodeIcon,
} from "@/components/TechIcons"
import ResumePdfViewer from "@/components/ResumePdfViewer"
import { sound } from "@/lib/sound"

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
    role: "Java & DSA Coordinator · Technical Mentor",
    organization: "devup — College Tech Club",
    type: "Leadership & Mentorship",
    period: "Aug 2024 – Present",
    location: "KIET Campus",
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
      "Java Backend Curriculum: Spearheaded structured hands-on Java & Spring Boot backend modules for 20+ active student members, preparing juniors for software engineering internships and technical assessments.",
      "DSA Mentorship: Conducted weekly algorithmic problem-solving sessions on trees, graphs, and dynamic programming, improving juniors' average coding speed and benchmark accuracy by 30%.",
      "Engineering Standards: Orchestrated code reviews and Git workflows, enforcing clean architecture patterns, OOP principles, and test-driven practices across collaborative cohort projects.",
    ],
  },
]

const projects: ResumeEntry[] = [
  {
    id: "mentorsync",
    role: "MentorSync (LeetCode & Codeforces LMS)",
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
      "Dual-Platform Telemetry: Architected a scalable two-sided LMS for bootcamps to automate LeetCode and Codeforces progress tracking, assignment distribution, and real-time leaderboards.",
      "Automated Verification Engine: Built an asynchronous verification engine consuming LeetCode GraphQL and Codeforces REST APIs with problem slug parsing, eliminating manual grading across 100+ active submissions.",
      "Cache Warming & Resilience: Engineered nightly Redis cache-warming worker (03:00 UTC) with atomic distributed locks (setIfAbsent) ensuring 0ms peak latency, STOMP WebSockets, and Resilience4j circuit breakers.",
      "Tech Stack: Java 21, Spring Boot 3.3, React 19, TypeScript, Redis 7, MongoDB, STOMP WebSockets, Resilience4j, Docker.",
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
      "Zero-Relay P2P Protocol: Engineered an offline peer-to-peer file transfer platform on WebRTC RTCDataChannels over UDP that bypasses central servers with zero internet requirement.",
      "High-Concurrency Signaling Broker: Built a Java 25 Virtual Threads and WebSocket signaling broker supporting 10,000 pooled connections, with ZXing QR pairing and UDP subnet auto-discovery.",
      "Encrypted Chunk Streaming: Designed a 64KB chunk streaming protocol with Bouncy Castle AES-256-GCM encryption and backpressure control, handling up to 50GB transfers with <50MB of RAM.",
      "Tech Stack: Java 25, Spring Boot 4.1, WebRTC, Bouncy Castle, Virtual Threads, ZXing, Docker, Prometheus.",
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
  "500+ Problems Solved on LeetCode: Strong algorithmic mastery across arrays, strings, trees, dynamic programming, and graphs.",
  "Top 105 Nationally — Google Solution Challenge 2025: Recognized out of thousands of submissions across India.",
  "2nd Place, Innotech (Department Level).",
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

export const ATS_PLAIN_TEXT_RESUME = `VARUN KUSHWAH
Software Engineer | Backend Developer
Email: varun.kush3@gmail.com | Portfolio: https://varunkushwah.xyz
Phone: +91 82185 68519 | Location: India
LinkedIn: https://linkedin.com/in/varun-kushwah | GitHub: https://github.com/varunkushwah31 | LeetCode: https://leetcode.com/u/Varun_Kushwah/

================================================================================
SUMMARY
================================================================================
Computer Science undergraduate specializing in high-concurrency Java backend systems, distributed architectures, and real-time protocols. Proficient in Java 21/25, Spring Boot 3.3, PostgreSQL, Redis, WebRTC, STOMP WebSockets, and Docker. Java & DSA Coordinator at devup mentoring 20+ peers; solved 500+ problems on LeetCode and recognized in Top 105 Nationally in Google Solution Challenge 2025. Seeking Software Engineering Intern / Junior Backend Developer roles.

================================================================================
TECHNICAL SKILLS
================================================================================
* Languages: Java (17/21/25), SQL, TypeScript, JavaScript, Python
* Backend & Frameworks: Spring Boot 3.x, Spring MVC, Spring Security, Spring Data JPA, Hibernate, RESTful APIs, WebSockets, STOMP
* Distributed Systems & Networking: WebRTC (RTCDataChannel), Virtual Threads (Java 21/25), Redis 7 (Distributed Locking & Caching), Resilience4j
* Databases & Storage: PostgreSQL, MySQL, MongoDB, Redis
* DevOps & Tools: Docker, Git, GitHub, Postman, Linux / Bash, Maven, Gradle, CI/CD, Prometheus, Grafana
* Core Competencies: Data Structures & Algorithms, Object-Oriented Design (OOP), Microservices Architecture, Concurrency & Multithreading, Clean Architecture

================================================================================
EXPERIENCE & LEADERSHIP
================================================================================
devup — College Tech Club | Java & DSA Coordinator · Technical Mentor
Aug 2024 – Present | KIET Campus
* Java Backend Curriculum: Spearheaded structured hands-on Java & Spring Boot backend modules for 20+ active student members, preparing juniors for software engineering internships and technical assessments.
* DSA Mentorship: Conducted weekly algorithmic problem-solving sessions on trees, graphs, and dynamic programming, improving juniors' average coding speed and benchmark accuracy by 30%.
* Engineering Standards: Orchestrated code reviews and Git workflows, enforcing clean architecture patterns, OOP principles, and test-driven practices across collaborative cohort projects.

================================================================================
KEY PROJECTS
================================================================================
MentorSync | LeetCode & Codeforces LMS (Live Demo: https://mentorssync.vercel.app/ | GitHub: https://github.com/varunkushwah31/Leetcode-Tracker-Frontend)
Tech Stack: Java 21, Spring Boot 3.3, React 19, TypeScript, Redis 7, MongoDB, STOMP WebSockets, Resilience4j, Docker
* Dual-Platform Telemetry: Architected a scalable two-sided LMS for bootcamps to automate LeetCode and Codeforces progress tracking, assignment distribution, and real-time leaderboards.
* Automated Verification Engine: Built an asynchronous verification engine consuming LeetCode GraphQL and Codeforces REST APIs with problem slug parsing, eliminating manual grading across 100+ active submissions.
* Cache Warming & Resilience: Engineered nightly Redis cache-warming worker (03:00 UTC) with atomic distributed locks (setIfAbsent) ensuring 0ms peak latency, STOMP WebSockets, and Resilience4j circuit breakers.

W2W Share | Offline Encrypted P2P File Transfer (Live Demo: https://w2wshare.vercel.app/ | GitHub: https://github.com/varunkushwah31/W2WShare)
Tech Stack: Java 25, Spring Boot 4.1, WebRTC, Bouncy Castle, Virtual Threads, ZXing, Docker, Prometheus
* Zero-Relay P2P Protocol: Engineered an offline peer-to-peer file transfer platform on WebRTC RTCDataChannels over UDP that bypasses central servers with zero internet requirement.
* High-Concurrency Signaling Broker: Built a Java 25 Virtual Threads and WebSocket signaling broker supporting 10,000 pooled connections, with ZXing QR pairing and UDP subnet auto-discovery.
* Encrypted Chunk Streaming: Designed a 64KB chunk streaming protocol with Bouncy Castle AES-256-GCM encryption and backpressure control, handling up to 50GB transfers with <50MB of RAM.

================================================================================
EDUCATION
================================================================================
B.Tech in Computer Science & Engineering | KIET Group of Institutions
2024 – 2028 | CGPA: 8.27 / 10.0 | Ghaziabad, India
* Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Object-Oriented Software Design.

Senior Secondary (CBSE Class XII) & Secondary (CBSE Class X) | New St. Stephens Public School
2021 – 2023 | Agra, India
* Class XII (CBSE): 80.0% | Class X (CBSE): 82.0%

================================================================================
ACHIEVEMENTS & HONORS
================================================================================
* 500+ Problems Solved on LeetCode: Demonstrated strong algorithmic mastery across arrays, strings, trees, dynamic programming, and graph algorithms (Profile: https://leetcode.com/u/Varun_Kushwah/).
* Top 105 Nationally — Google Solution Challenge 2025: Recognized out of thousands of submissions across India for engineering real-world social impact software.
* 2nd Place — Innotech (Department Level): Awarded for technical innovation in high-throughput backend architecture.`

const METRICS_REGEX = /(\b\d+[\d,]*\+?%?|\b\d+k\b|<50MB\b|50GB\b|0ms\b|\b20\+\b|\b30%\b|\b100\+\b|\b10,000\b)/gi

function highlightMetrics(text: string) {
  const parts = text.split(METRICS_REGEX)
  return parts.map((part, index) => {
    if (METRICS_REGEX.test(part)) {
      return (
        <strong key={index} className="text-ink font-bold">
          {part}
        </strong>
      )
    }
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}

function renderBulletText(bullet: string) {
  if (bullet.startsWith("Tech Stack:")) {
    return (
      <span>
        <strong className="text-ink font-bold">Tech Stack:</strong>
        {bullet.slice("Tech Stack:".length)}
      </span>
    )
  }
  const colonIndex = bullet.indexOf(":")
  if (colonIndex > 0 && colonIndex < 40) {
    const lead = bullet.slice(0, colonIndex + 1)
    const rest = bullet.slice(colonIndex + 1)
    return (
      <span>
        <strong className="text-ink font-bold">{lead}</strong>
        {highlightMetrics(rest)}
      </span>
    )
  }
  return <span>{highlightMetrics(bullet)}</span>
}

type ViewMode = "interactive" | "pdf" | "ats"

export default function ResumePage() {
  usePageTitle("Resume")
  const [viewMode, setViewMode] = useState<ViewMode>("interactive")
  const [copiedAts, setCopiedAts] = useState(false)

  const handleCopyAts = async () => {
    try {
      await navigator.clipboard.writeText(ATS_PLAIN_TEXT_RESUME)
      sound.success()
      setCopiedAts(true)
      setTimeout(() => setCopiedAts(false), 2400)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-6 border-b border-hairline pb-8"
        >
          {/* Top Row: Title + Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight">
                  Resume
                </h1>
              </div>
              <p className="text-muted text-sm sm:text-base font-normal leading-relaxed">
                Technical background, architectural milestones, and leadership experience.
              </p>
              <div className="flex items-center gap-2.5 sm:gap-3 mt-3 text-xs font-mono text-muted flex-wrap">
                <a
                  href="mailto:varun.kush3@gmail.com"
                  className="hover:text-ink transition-colors inline-flex items-center gap-1.5"
                >
                  <EnvelopeSimpleIcon size={13} />
                  <span>varun.kush3@gmail.com</span>
                </a>
                <span className="text-hairline-strong">•</span>
                <a
                  href="https://github.com/varunkushwah31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors inline-flex items-center gap-1.5"
                >
                  <GithubLogoIcon size={13} />
                  <span>GitHub</span>
                </a>
                <span className="text-hairline-strong">•</span>
                <a
                  href="https://www.linkedin.com/in/varun-kushwah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors inline-flex items-center gap-1.5"
                >
                  <LinkedinLogoIcon size={13} />
                  <span>LinkedIn</span>
                </a>
                <span className="text-hairline-strong">•</span>
                <a
                  href="https://leetcode.com/u/Varun_Kushwah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <LeetCodeIcon size={13} />
                  <span>LeetCode (500+)</span>
                </a>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {/* Direct Download Button */}
              <a
                href="/Varun_Kushwah_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Varun_Kushwah_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ink text-canvas hover:opacity-90 text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <DownloadSimpleIcon size={15} weight="bold" />
                <span>PDF Download</span>
              </a>
            </div>
          </div>

          {/* View Mode Switcher (Interactive vs PDF vs ATS Plain Text) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex p-1 rounded-xl bg-surface-card border border-hairline shadow-xs overflow-x-auto scrollbar-none touch-pan-x max-w-full">
              <button
                onClick={() => {
                  sound.click()
                  setViewMode("interactive")
                }}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  viewMode === "interactive"
                    ? "bg-canvas text-ink shadow-xs border border-hairline/80 font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                <EyeIcon size={14} weight="bold" />
                <span>Interactive Timeline</span>
              </button>

              <button
                onClick={() => {
                  sound.click()
                  setViewMode("pdf")
                }}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  viewMode === "pdf"
                    ? "bg-canvas text-ink shadow-xs border border-hairline/80 font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                <FilePdfIcon size={14} weight="bold" className="text-rose-500" />
                <span>PDF Document</span>
              </button>

              <button
                onClick={() => {
                  sound.click()
                  setViewMode("ats")
                }}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  viewMode === "ats"
                    ? "bg-canvas text-ink shadow-xs border border-hairline/80 font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                <FileTextIcon size={14} weight="bold" className="text-indigo-500" />
                <span>ATS Plain Text</span>
              </button>
            </div>

            {/* Quick Copy ATS Button */}
            <button
              onClick={handleCopyAts}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-xs font-medium text-ink transition-colors cursor-pointer active:scale-95 w-full sm:w-auto shadow-xs"
              title="Copy ATS plaintext directly to clipboard"
            >
              {copiedAts ? (
                <>
                  <CheckIcon size={14} weight="bold" className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ATS Plaintext Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={14} weight="bold" />
                  <span>Copy ATS Plaintext</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main View Area */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 pb-24">
        {/* VIEW 1: PDF Viewer */}
        {viewMode === "pdf" && (
          <motion.div
            key="pdf"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ResumePdfViewer />
          </motion.div>
        )}

        {/* VIEW 2: ATS Plain Text */}
        {viewMode === "ats" && (
          <motion.div
            key="ats"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* ATS Explanatory Banner */}
            <div className="p-4 rounded-xl border border-hairline bg-surface-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-ink text-sm flex items-center gap-2">
                  <SparkleIcon size={16} className="text-indigo-500" />
                  <span>ATS-Optimized Plain Text Resume</span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Single-column, zero layout artifacts, 100% compliant with Workday, Greenhouse, Lever, and Taleo parsers.
                </p>
              </div>

              <button
                onClick={handleCopyAts}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-ink text-canvas text-xs font-semibold transition-all hover:opacity-90 shrink-0 cursor-pointer"
              >
                {copiedAts ? (
                  <>
                    <CheckIcon size={14} weight="bold" className="text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={14} weight="bold" />
                    <span>Copy Full Text</span>
                  </>
                )}
              </button>
            </div>

            {/* ATS Monospace Text Box */}
            <div className="relative rounded-xl border border-hairline bg-surface-card overflow-hidden">
              <div className="px-4 py-2 bg-surface-elevated/80 border-b border-hairline flex items-center justify-between text-xs text-muted font-mono">
                <span>ATS_PARSER_READY.txt</span>
                <span>{ATS_PLAIN_TEXT_RESUME.split("\n").length} lines</span>
              </div>
              <pre className="p-4 sm:p-6 text-xs sm:text-[13px] font-mono text-body-strong leading-relaxed overflow-x-auto whitespace-pre selection:bg-emerald-500/20">
                {ATS_PLAIN_TEXT_RESUME}
              </pre>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: Interactive Timeline (Default) */}
        {viewMode === "interactive" && (
          <motion.div
            key="interactive"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-14"
          >
            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-2.5 mb-6 text-emerald-600 dark:text-emerald-400">
                <BriefcaseIcon size={20} weight="bold" />
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                  Experience &amp; Leadership
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
                        {entry.bullets.map((bullet) => (
                          <li key={bullet.slice(0, 32)} className="flex items-start gap-2.5">
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
                        {entry.bullets.map((bullet) => (
                          <li key={bullet.slice(0, 32)} className="flex items-start gap-2.5">
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
                        {entry.bullets.map((bullet) => (
                          <li key={bullet.slice(0, 32)} className="flex items-start gap-2.5">
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
                {achievements.map((item, idx) => {
                  const isLeetCode = item.includes("LeetCode")
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-card border border-hairline text-sm text-body-strong font-medium flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {isLeetCode ? (
                          <LeetCodeIcon size={18} className="text-[#FFA116] shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        )}
                        <span className="truncate sm:whitespace-normal">{item}</span>
                      </div>
                      {isLeetCode && (
                        <a
                          href="https://leetcode.com/u/Varun_Kushwah/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs font-semibold text-amber-500 hover:text-amber-400 underline underline-offset-2 flex items-center gap-1"
                        >
                          <span>Profile</span>
                          <ArrowSquareOutIcon size={12} weight="bold" />
                        </a>
                      )}
                    </div>
                  )
                })}
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
          </motion.div>
        )}
      </div>
    </div>
  )
}
