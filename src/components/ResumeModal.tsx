import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  XIcon,
  PrinterIcon,
  CopyIcon,
  CheckIcon,
  EnvelopeSimpleIcon,
  MedalIcon,
  BookOpenIcon,
  GitForkIcon,
  CpuIcon,
} from "@phosphor-icons/react"
import { sound } from "@/lib/sound"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.click()
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleDownloadPDF = () => {
    sound.click()
    const link = document.createElement("a")
    link.href = "/Varun_Kushwah_Resume.pdf"
    link.download = "Varun_Kushwah_Resume.pdf"
    link.target = "_blank"
    link.click()
  }

  const rawResumeText = `VARUN KUSHWAH
+91-8218568519 | varun.kush3@gmail.com | linkedin.com/in/varun-kushwah | github.com/varunkushwah31 | varunkushwah.xyz

TECHNICAL SKILLS
- Languages: Java (Java 17/21, OOP, Multithreading, Concurrency, Stream API, Collections), SQL, TypeScript, JavaScript, Python
- Backend & Frameworks: Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, RESTful APIs, WebSockets
- Databases & Caching: PostgreSQL, MySQL, MongoDB, Redis
- DevOps & Tools: Git, GitHub, Docker, Postman, Linux/Bash, Maven, Gradle, CI/CD
- Core Competencies: Data Structures & Algorithms, Object-Oriented Design (OOD), Microservices Basics, Distributed Systems Basics

EDUCATION
- KIET Group of Institutions | Bachelor of Technology in Computer Science & Engineering (CGPA: 8.27 / 10.0) | 2024 – 2028 | Ghaziabad, India
- New St. Stephens Public School | Senior Secondary (CBSE XII: 80%) · Secondary (CBSE X: 82%) | 2021 – 2023 | Agra, India

EXPERIENCE & LEADERSHIP
devup — College Tech Club | Java & DSA Coordinator · Technical Mentor | Aug 2024 – Present
- Spearheaded Java curriculum and structured hands-on backend modules for 20+ active student members, accelerating peer readiness for software engineering internships and technical assessments.
- Conducted weekly algorithmic problem-solving sessions on trees, graphs, and dynamic programming, mentoring juniors to improve average coding speed and accuracy by 30%.
- Orchestrated code reviews & Git workflows, enforcing clean architecture patterns, OOP principles, and test-driven development practices across collaborative cohort projects.

KEY PROJECTS
1. MentorSync — LeetCode & Codeforces LMS
   Tech Stack: Java 21, Spring Boot 4, React 19, TypeScript, Redis 7+, MongoDB, Spring Security, Docker, Resilience4j
   - Architected a scalable two-sided LMS for bootcamps and educators to automate LeetCode & Codeforces progress tracking, classroom assignment distribution, and real-time leaderboards.
   - Built automated verification pipeline consuming LeetCode GraphQL/REST APIs and regex parsing to validate submissions, eliminating manual grading overhead across 100+ active submissions.
   - Engineered nightly Redis cache warming worker (03:00 UTC) with atomic distributed locks (setIfAbsent) ensuring 0ms peak latency, STOMP WebSockets, and Resilience4j circuit breakers.

2. W2W Share — Offline Encrypted P2P File Transfer Platform
   Tech Stack: Java, Spring Boot, WebRTC DataChannels, WebSockets, AES-256-GCM, Docker, Prometheus
   - Engineered an offline peer-to-peer file transfer platform using WebRTC RTCDataChannels over UDP, bypassing central storage servers and eliminating cloud relay bandwidth costs.
   - Implemented high-concurrency Spring Boot WebSocket signaling server to orchestrate SDP offer/answer handshakes, STUN/ICE candidate negotiation, and room connection lifecycles.
   - Engineered 64KB chunk streaming protocol with AES-256-GCM authenticated encryption and client backpressure control, reliably streaming 10GB+ files with a steady <50MB RAM footprint.

3. Stateless Authentication & RBAC Service
   Tech Stack: Java, Spring Boot, Spring Security, JWT, OAuth 2.0, PostgreSQL, Docker
   - Designed a modular stateless authentication service implementing JWT access/refresh token rotation and OAuth 2.0 social sign-in, eliminating server-side session memory overhead.
   - Configured custom Spring Security filter chains with granular Role-Based Access Control (RBAC), securing 15+ REST endpoints with zero unauthorized access vulnerabilities.
   - Integrated relational persistence layer with connection pooling, automated validation filters, and comprehensive integration testing via Postman.

ACHIEVEMENTS & COMPETITIVE PROGRAMMING
- 500+ Problems Solved on LeetCode: Demonstrated strong algorithmic mastery across arrays, strings, trees, dynamic programming, and graph algorithms.
- Top 105 Nationally — Google Solution Challenge 2025: Recognized among the top 105 projects nationwide out of thousands of submissions for real-world engineering impact.`

  const handleCopyText = () => {
    sound.click()
    navigator.clipboard.writeText(rawResumeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-220 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sound.click()
              onClose()
            }}
            className="fixed inset-0 bg-canvas/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-4xl bg-surface-card border border-hairline my-6 z-10 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
            style={{ borderRadius: "0px" }}
          >
            {/* Top M-Stripe */}
            <div className="m-stripe shrink-0" />

            {/* Header Toolbar */}
            <div className="p-4 md:px-8 bg-surface-soft border-b border-hairline flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="label-uppercase text-m-blue-light text-xs tracking-[2px] font-bold">
                  CURRICULUM VITAE {"//"} SPECIFICATION
                </span>
                <span className="text-hairline hidden sm:inline">|</span>
                <span className="text-muted font-mono text-xs hidden sm:inline">
                  VARUN_KUSHWAH_RESUME.SPEC
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  onMouseEnter={() => sound.hover()}
                  className="btn-text px-3 py-2 bg-surface-card hover:bg-surface-elevated text-ink border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ borderRadius: "0px" }}
                  title="Download Resume PDF"
                >
                  <PrinterIcon size={14} />
                  <span className="hidden sm:inline">DOWNLOAD PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyText}
                  onMouseEnter={() => sound.hover()}
                  className="btn-text px-3 py-2 bg-surface-card hover:bg-surface-elevated text-ink border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ borderRadius: "0px" }}
                  title="Copy Plain Text"
                >
                  {copied ? <CheckIcon size={14} className="text-success" /> : <CopyIcon size={14} />}
                  <span className="hidden sm:inline">{copied ? "COPIED" : "COPY TEXT"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.click()
                    onClose()
                  }}
                  className="w-9 h-9 bg-surface-card hover:bg-surface-elevated text-ink rounded-full flex items-center justify-center border border-hairline transition-colors cursor-pointer ml-2"
                  aria-label="Close Resume Modal"
                >
                  <XIcon size={16} />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8 font-sans bg-canvas">
              {/* Header Profile Info */}
              <div className="border-b border-hairline pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-ink mb-2">
                      VARUN KUSHWAH
                    </h1>
                    <p className="label-uppercase text-m-blue-light text-sm tracking-[2px] font-bold">
                      ASPIRING JAVA DEVELOPER · JAVA & DSA COORDINATOR @ DEVUP
                    </p>
                  </div>
                  <div className="font-mono text-xs text-muted space-y-1 md:text-right">
                    <div>+91-8218568519</div>
                    <div>varun.kush3@gmail.com</div>
                    <div>github.com/varunkushwah31</div>
                    <div>linkedin.com/in/varun-kushwah</div>
                  </div>
                </div>
                <p className="body-light text-body text-sm leading-relaxed max-w-3xl">
                  Computer Science undergraduate specializing in backend architecture with Java and Spring Boot.
                  Passionate about building scalable REST microservices, high-throughput WebRTC networking, and secure role-based identity systems.
                </p>
              </div>

              {/* Technical Stack Grid */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <CpuIcon size={14} className="text-m-blue-light" />
                  TECHNICAL SKILLS & COMPETENCIES
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">LANGUAGES</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      Java (Java 17/21, OOP, Multithreading, Concurrency, Streams), SQL, TypeScript, JavaScript, Python
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">BACKEND & FRAMEWORKS</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, RESTful APIs, WebSockets
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">DATABASES & CACHING</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      PostgreSQL, MySQL, MongoDB, Redis
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">DEVOPS & TOOLS</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      Git, GitHub, Docker, Postman, Linux/Bash, Maven, Gradle, CI/CD
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership & Experience */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <MedalIcon size={14} className="text-m-blue-dark" />
                  EXPERIENCE & LEADERSHIP
                </div>
                <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="text-ink font-bold text-base uppercase">
                      JAVA & DSA COORDINATOR — DEVUP COLLEGE TECH CLUB
                    </div>
                    <span className="font-mono text-xs text-muted">AUG 2024 – PRESENT</span>
                  </div>
                  <p className="body-light text-xs md:text-sm text-body leading-relaxed">
                    Spearheaded Java backend workshops for 20+ student members, guided peers in algorithmic problem-solving improving coding speed by 30%, and conducted structured code reviews enforcing clean OOP architecture.
                  </p>
                </div>
              </div>

              {/* Featured Engineering Projects */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <GitForkIcon size={14} className="text-m-red" />
                  KEY PROJECTS
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-ink font-bold text-sm uppercase text-m-blue-light">
                        MENTORSYNC · LEETCODE & CODEFORCES LMS
                      </div>
                      <span className="font-mono text-[11px] text-muted">JAVA 21 · SPRING BOOT 4 · REDIS 7+ · MONGODB</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      High-performance LMS tracking LeetCode & Codeforces telemetry, automated assignment verification, nightly Redis cache warming with distributed locks, and STOMP WebSockets.
                    </p>
                  </div>

                  <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-ink font-bold text-sm uppercase text-m-blue-light">
                        W2W SHARE · OFFLINE ENCRYPTED P2P FILE TRANSFER
                      </div>
                      <span className="font-mono text-[11px] text-muted">JAVA · SPRING BOOT · WEBRTC DATACHANNELS · AES-256-GCM · DOCKER</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      Bypasses central storage servers via direct WebRTC RTCDataChannels, with a Spring Boot WebSocket signaling broker and 64KB AES-256-GCM chunk streaming protocol handling 10GB+ files under 50MB RAM.
                    </p>
                  </div>

                  <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-ink font-bold text-sm uppercase text-m-blue-light">
                        STATELESS AUTHENTICATION & RBAC SERVICE
                      </div>
                      <span className="font-mono text-[11px] text-muted">JAVA · SPRING BOOT · SPRING SECURITY · JWT · POSTGRESQL</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      Modular stateless security microservice implementing JWT token rotation and OAuth 2.0 social login with customized Spring Security filter chains securing 15+ REST endpoints.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <BookOpenIcon size={14} className="text-m-blue-light" />
                  EDUCATION
                </div>
                <div className="space-y-3">
                  <div className="bg-surface-soft p-5 border border-hairline-strong flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-ink font-bold text-sm uppercase">
                        KIET GROUP OF INSTITUTIONS
                      </div>
                      <div className="text-xs text-muted">B.Tech in Computer Science & Engineering (CGPA: 8.27 / 10.0)</div>
                    </div>
                    <div className="font-mono text-xs text-m-blue-light font-bold">
                      2024 – 2028
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-ink font-bold text-sm uppercase">
                        NEW ST. STEPHENS PUBLIC SCHOOL, AGRA
                      </div>
                      <div className="text-xs text-muted">Senior Secondary (CBSE XII: 80%) · Secondary (CBSE X: 82%)</div>
                    </div>
                    <div className="font-mono text-xs text-muted font-bold">
                      2021 – 2023
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:px-8 bg-surface-soft border-t border-hairline flex items-center justify-between gap-4 shrink-0 text-xs font-mono text-muted">
              <span>STATUS: AVAILABLE FOR INTERNSHIPS & SDE ROLES</span>
              <a
                href="mailto:varun.kush3@gmail.com"
                onClick={() => sound.click()}
                className="btn-text bg-ink text-canvas hover:bg-body-strong px-5 py-2.5 inline-flex items-center gap-2 text-xs transition-colors"
                style={{ borderRadius: "0px" }}
              >
                <EnvelopeSimpleIcon size={14} /> CONTACT DIRECTLY
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
