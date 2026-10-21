import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  LightningIcon,
  CopyIcon,
  CheckIcon,
  FilePdfIcon,
  FileTextIcon,
  EyeIcon,
  CaretDownIcon,
  CaretUpIcon,
  SparkleIcon,
  CpuIcon,
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
      "Tech Stack: Java 21, Spring Boot 3.3, React 19, TypeScript, Redis 7, MongoDB, Spring Security, Docker, Resilience4j.",
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
      "Built high-concurrency Java 21 Virtual Threads & Spring Boot 3.3 WebSocket signaling broker with 10k connection pooling, ZXing QR-pairing, and UDP subnet discovery.",
      "Engineered 64KB chunk streaming protocol with AES-256-GCM encryption and backpressure control, handling large file transfers reliably with minimal RAM overhead.",
      "Tech Stack: Java 21, Spring Boot 3.3, WebRTC, Virtual Threads, ZXing, WebSockets, Docker.",
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

export const ATS_PLAIN_TEXT_RESUME = `VARUN KUSHWAH
Software Engineer | Backend Developer
Email: varun.kush3@gmail.com | Portfolio: https://varunkushwah.me
GitHub: https://github.com/varunkushwah31 | LinkedIn: https://www.linkedin.com/in/varun-kushwah/
Location: India

================================================================================
EXECUTIVE SUMMARY
================================================================================
Backend Developer and Java Coordinator specializing in distributed systems, real-time protocols, and high-concurrency architectures. Proficient in Java 21, Spring Boot, PostgreSQL, WebRTC, Docker, Redis, and React 19. Solved 500+ algorithmic problems on LeetCode and recognized in Top 105 Nationally in Google Solution Challenge 2025. Seeking Software Engineering Intern / Junior Backend Developer roles.

================================================================================
TECHNICAL SKILLS
================================================================================
* Languages: Java (17/21), Python, TypeScript, SQL, Bash
* Frameworks & Libraries: Spring Boot 3.x, Spring Security, Spring Data JPA, Hibernate, React 19, STOMP WebSockets
* Distributed Systems & Protocols: WebRTC (RTCDataChannels), Redis 7 (Distributed Locking & Pub/Sub), Resilience4j
* Databases & Storage: PostgreSQL, MySQL, MongoDB, Redis
* DevOps & Tools: Docker, Git, GitHub, Linux / Bash, Postman, Maven, Gradle
* Core Competencies: Data Structures & Algorithms, Object-Oriented Software Design (OOP), RESTful API Architecture, Microservices, Virtual Threads Concurrency

================================================================================
EXPERIENCE & LEADERSHIP
================================================================================
Java & DSA Coordinator | Devup - College Tech Club
Aug 2024 - Present | Campus · Hybrid
* Spearheaded Java curriculum and structured hands-on backend modules for 20+ active student members, accelerating peer readiness for software engineering internships.
* Conducted weekly algorithmic problem-solving sessions on trees, graphs, and dynamic programming, mentoring juniors to improve average coding speed and accuracy by 30%.
* Orchestrated code reviews & Git workflows, enforcing clean architecture patterns, OOP principles, and test-driven development practices across collaborative cohort projects.

================================================================================
FEATURED PROJECTS
================================================================================
MentorSync (LeetCode Progress & Classroom LMS)
Tech Stack: Java 21, Spring Boot 3.3, React 19, TypeScript, Redis 7, MongoDB, Spring Security, Docker, Resilience4j
* Architected a scalable two-sided LMS for bootcamps and educators to automate LeetCode & Codeforces progress tracking, classroom assignment distribution, and real-time leaderboards.
* Built automated verification pipeline consuming LeetCode GraphQL/REST APIs and regex parsing to validate submissions, eliminating manual grading overhead for 100+ active submissions.
* Engineered nightly Redis cache warming worker (03:00 UTC) with atomic distributed locks (setIfAbsent) ensuring 0ms peak latency, STOMP WebSockets, and Resilience4j circuit breakers.

W2W Share (Offline Encrypted P2P File Transfer)
Tech Stack: Java 21, Spring Boot 3.3, WebRTC, AES-256-GCM, Virtual Threads, ZXing, WebSockets, Docker
* Engineered an offline peer-to-peer file transfer platform using WebRTC RTCDataChannels over UDP, bypassing central servers with zero internet required.
* Built high-concurrency Java 21 Virtual Threads & Spring Boot 3.3 WebSocket signaling broker with 10k connection pooling, ZXing QR-pairing, and UDP subnet discovery.
* Engineered 64KB chunk streaming protocol with AES-256-GCM encryption and backpressure control, handling large file transfers with minimal RAM overhead.

Stateless Authentication & RBAC Service
Tech Stack: Java, Spring Boot, Spring Security, JWT, OAuth 2.0, PostgreSQL, Docker
* Designed a modular stateless authentication service implementing JWT access/refresh token rotation and OAuth 2.0 social sign-in, eliminating server-side session memory overhead.
* Configured custom Spring Security filter chains with granular Role-Based Access Control (RBAC), securing 15+ REST endpoints with zero unauthorized access vulnerabilities.
* Integrated relational persistence layer with connection pooling, automated validation filters, and comprehensive integration testing via Postman.

================================================================================
EDUCATION
================================================================================
B.Tech, Computer Science & Engineering | KIET Group of Institutions
2024 - 2028 | CGPA: 8.27 / 10.00
* Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Object-Oriented Software Design.

Senior Secondary (CBSE XII) & Secondary (CBSE X) | New St. Stephens Public School
2021 - 2023 | Agra, India
* Class XII (CBSE): 80.0% | Class X (CBSE): 82.0%

================================================================================
ACHIEVEMENTS & HONORS
================================================================================
* 500+ Problems Solved on LeetCode: Strong algorithmic mastery across arrays, trees, graphs, and dynamic programming.
* Top 105 Nationally - Google Solution Challenge 2025: Recognized out of thousands of submissions across India.`

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

type ViewMode = "interactive" | "pdf" | "ats"

export default function ResumePage() {
  usePageTitle("Resume")
  const [viewMode, setViewMode] = useState<ViewMode>("interactive")
  const [isPitchExpanded, setIsPitchExpanded] = useState(false)
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

  const triggerQuickPitchModal = () => {
    sound.click()
    window.dispatchEvent(new CustomEvent("open-recruiter-pitch"))
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  Updated 2026
                </span>
              </div>
              <p className="text-muted text-sm sm:text-base font-normal leading-relaxed">
                Technical background, architectural milestones, and leadership experience.
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {/* 30-Second Recruiter Pitch Trigger */}
              <button
                onClick={triggerQuickPitchModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer group"
                title="Open 30-Second Candidate Pitch"
              >
                <LightningIcon size={16} weight="fill" className="group-hover:scale-110 transition-transform text-emerald-500" />
                <span>Recruiter TL;DR (30s)</span>
              </button>

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

          {/* Recruiter Quick Pitch Accordion Card (In-Page 30s Rule) */}
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-4 sm:p-5 transition-all">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-semibold text-ink text-xs sm:text-sm">
                  Recruiter 30-Second Executive Summary
                </span>
                <span className="hidden sm:inline text-xs text-muted font-normal">
                  — Fast Technical Evaluation
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    sound.click()
                    setIsPitchExpanded((prev) => !prev)
                  }}
                  className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  <span>{isPitchExpanded ? "Hide Summary" : "Expand Summary"}</span>
                  {isPitchExpanded ? <CaretUpIcon size={13} weight="bold" /> : <CaretDownIcon size={13} weight="bold" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isPitchExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-3 border-t border-emerald-500/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* Role */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold flex items-center gap-1.5">
                        <BriefcaseIcon size={13} className="text-emerald-500" />
                        <span>Role Sought</span>
                      </div>
                      <div className="font-bold text-ink">
                        SWE Intern / Junior Backend Dev
                      </div>
                      <p className="text-muted text-xs leading-relaxed">
                        Available immediately / 2025/2026 batches. Distributed backend focus.
                      </p>
                    </div>

                    {/* Primary Stack */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold flex items-center gap-1.5">
                        <CpuIcon size={13} className="text-indigo-500" />
                        <span>Primary Stack</span>
                      </div>
                      <div className="font-semibold text-ink font-mono text-xs">
                        Java 21 · Spring Boot · PostgreSQL · WebRTC · Docker · Redis
                      </div>
                      <p className="text-muted text-xs leading-relaxed">
                        Concurrency &amp; Virtual Threads, STOMP WebSockets, Resilience4j.
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold flex items-center gap-1.5">
                        <TrophyIcon size={13} className="text-amber-500" />
                        <span>Key Highlights</span>
                      </div>
                      <div className="font-semibold text-ink text-xs">
                        Java Coordinator @ devup
                      </div>
                      <p className="text-muted text-xs leading-relaxed">
                        Built 0-relay encrypted P2P transfer (W2WShare) · 500+ LeetCode · Top 105 Nationally.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
          </motion.div>
        )}
      </div>
    </div>
  )
}
