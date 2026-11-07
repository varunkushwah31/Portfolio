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
  PhoneIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react"
import { LeetCodeIcon } from "@/components/TechIcons"
import { sound } from "@/lib/sound"
import { ATS_PLAIN_TEXT_RESUME } from "@/Pages/ResumePage"

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

  const rawResumeText = ATS_PLAIN_TEXT_RESUME

  const handleCopyText = () => {
    sound.click()
    void navigator.clipboard.writeText(rawResumeText)
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
                  <div className="font-mono text-xs text-muted space-y-1.5 md:text-right">
                    <div className="inline-flex items-center gap-1.5 md:justify-end text-muted">
                      <PhoneIcon size={13} />
                      <span>+91-8218568519</span>
                    </div>
                    <div>
                      <a href="mailto:varun.kush3@gmail.com" className="text-[#EA4335] hover:opacity-80 font-medium transition-opacity inline-flex items-center gap-1.5 md:justify-end">
                        <EnvelopeSimpleIcon size={13} weight="bold" />
                        <span>varun.kush3@gmail.com</span>
                      </a>
                    </div>
                    <div>
                      <a href="https://github.com/varunkushwah31" target="_blank" rel="noopener noreferrer" className="text-[#24292f] dark:text-[#f0f6fc] hover:opacity-80 font-medium transition-opacity inline-flex items-center gap-1.5 md:justify-end">
                        <GithubLogoIcon size={13} weight="bold" />
                        <span>github.com/varunkushwah31</span>
                      </a>
                    </div>
                    <div>
                      <a href="https://linkedin.com/in/varun-kushwah" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:opacity-80 font-medium transition-opacity inline-flex items-center gap-1.5 md:justify-end">
                        <LinkedinLogoIcon size={13} weight="bold" />
                        <span>linkedin.com/in/varun-kushwah</span>
                      </a>
                    </div>
                    <div>
                      <a href="https://leetcode.com/u/Varun_Kushwah/" target="_blank" rel="noopener noreferrer" className="text-[#FFA116] hover:opacity-80 font-medium transition-opacity inline-flex items-center gap-1.5 md:justify-end">
                        <LeetCodeIcon size={13} />
                        <span>leetcode.com/u/Varun_Kushwah</span>
                      </a>
                    </div>
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
                      <span className="font-mono text-[11px] text-muted">JAVA 21 · SPRING BOOT 3.3 · REDIS 7 · MONGODB</span>
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
                      <span className="font-mono text-[11px] text-muted">JAVA 21 · SPRING BOOT 3.3 · WEBRTC · DOCKER</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      Zero-internet P2P file sharing via WebRTC RTCDataChannels, Java 21 Spring Boot signaling broker, ZXing QR-pairing, and encrypted chunk streaming over local networks.
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

              {/* Achievements & Competitive Programming */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <MedalIcon size={14} className="text-amber-500" />
                  ACHIEVEMENTS &amp; HONORS
                </div>
                <div className="space-y-3">
                  <div className="bg-surface-soft p-4 border border-hairline-strong flex items-center justify-between gap-3">
                    <div className="text-xs text-body leading-relaxed">
                      <strong className="text-ink font-bold">500+ Problems Solved on LeetCode:</strong> Strong algorithmic mastery across arrays, strings, trees, dynamic programming, and graph algorithms.
                    </div>
                    <a
                      href="https://leetcode.com/u/Varun_Kushwah/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-semibold text-amber-500 hover:text-amber-400 font-mono"
                    >
                      [Profile]
                    </a>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong text-xs text-body leading-relaxed">
                    <strong className="text-ink font-bold">Top 105 Nationally — Google Solution Challenge 2025:</strong> Recognized out of thousands of submissions across India for engineering real-world social impact software.
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong text-xs text-body leading-relaxed">
                    <strong className="text-ink font-bold">2nd Place — Innotech (Department Level):</strong> Awarded for technical innovation in high-throughput backend architecture.
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
