import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  XIcon,
  BriefcaseIcon,
  CpuIcon,
  TrophyIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  CheckIcon,
  CopyIcon,
  LightningIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react"
import { sound } from "@/lib/sound"

interface RecruiterQuickPitchModalProps {
  isOpen?: boolean
  onClose?: () => void
}

const PITCH_TEXT_FOR_CLIPBOARD = `Varun Kushwah — Software Engineer / Backend Developer Candidate
================================================================================
* Role Sought: Software Engineering Intern / Junior Backend Developer (Immediate / 2025/2026)
* Primary Stack: Java 21, Spring Boot, PostgreSQL, WebRTC, Docker, Redis 7, React 19, TypeScript
* Key Technical Highlights:
  - Java Coordinator @ devup: Mentoring 20+ peers in advanced Java, Spring Boot, clean OOP & DSA.
  - W2WShare: 0-relay encrypted P2P file transfer (WebRTC RTCDataChannel, Java 21 Virtual Threads, AES-256-GCM, 50GB transfers with <50MB RAM).
  - MentorSync: Automated LeetCode verification pipeline, Redis distributed cache warming (0ms peak latency), Resilience4j circuit breakers.
  - 500+ LeetCode Solved & Top 105 Nationally (Google Solution Challenge 2025) | CGPA: 8.27/10.00.

* Email: varun.kush3@gmail.com
* Portfolio: https://varunkushwah.me
* LinkedIn: https://www.linkedin.com/in/varun-kushwah/
* GitHub: https://github.com/varunkushwah31
* Resume: https://varunkushwah.me/Varun_Kushwah_Resume.pdf`

export default function RecruiterQuickPitchModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: RecruiterQuickPitchModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [copiedPitch, setCopiedPitch] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const handleClose = useCallback(() => {
    sound.click()
    if (isControlled && controlledOnClose) {
      controlledOnClose()
    } else {
      setInternalIsOpen(false)
    }
  }, [isControlled, controlledOnClose])

  // Listen for global custom event "open-recruiter-pitch"
  useEffect(() => {
    const handleOpenEvent = () => {
      sound.click()
      setInternalIsOpen(true)
    }
    window.addEventListener("open-recruiter-pitch", handleOpenEvent)
    return () => window.removeEventListener("open-recruiter-pitch", handleOpenEvent)
  }, [])

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const copyPitch = async () => {
    try {
      await navigator.clipboard.writeText(PITCH_TEXT_FOR_CLIPBOARD)
      setCopiedPitch(true)
      sound.success()
      setTimeout(() => setCopiedPitch(false), 2400)
    } catch {
      // Fallback
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("varun.kush3@gmail.com")
      setCopiedEmail(true)
      sound.success()
      setTimeout(() => setCopiedEmail(false), 2400)
    } catch {
      // Fallback
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-canvas border border-hairline/80 rounded-2xl shadow-2xl overflow-hidden my-auto z-10"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-hairline/60">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    <LightningIcon size={14} weight="fill" className="animate-pulse" />
                    <span>30-Second Recruiter Pitch</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                    Executive Candidate Summary
                  </h2>
                  <p className="text-muted text-xs sm:text-sm">
                    Designed for fast technical evaluation by engineering managers and technical recruiters.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl text-muted hover:text-ink hover:bg-surface-elevated transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <XIcon size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Modal Body: The 3 Executive Proof Bullets */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[68vh] overflow-y-auto">
              {/* Bullet 1: Target Role */}
              <div className="p-4 rounded-xl bg-surface-card border border-hairline/70 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-500 mt-0.5">
                    <BriefcaseIcon size={18} weight="bold" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs uppercase font-mono text-muted font-bold tracking-wider">
                        1. Target Role &amp; Availability
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Actively Interviewing
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-ink">
                      Software Engineering Intern / Junior Backend Developer
                    </div>
                    <p className="text-xs sm:text-sm text-body leading-relaxed">
                      Available for immediate, Summer, or Fall roles. Focused on backend engineering, distributed systems, high-throughput APIs, and cloud services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bullet 2: Primary Tech Stack */}
              <div className="p-4 rounded-xl bg-surface-card border border-hairline/70 hover:border-indigo-500/30 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-500 mt-0.5">
                    <CpuIcon size={18} weight="bold" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-xs uppercase font-mono text-muted font-bold tracking-wider">
                      2. Primary Stack &amp; Architectural Strengths
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Java 21", "Spring Boot", "PostgreSQL", "WebRTC", "Docker", "Redis 7", "React 19", "TypeScript"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-elevated border border-hairline text-ink font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-body leading-relaxed">
                      Specializes in Virtual Threads concurrency, distributed caching &amp; locks, RESTful &amp; WebSocket protocols, Resilience4j circuit breakers, and clean OOP architecture.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bullet 3: Hard Engineering Proofs & Leadership */}
              <div className="p-4 rounded-xl bg-surface-card border border-hairline/70 hover:border-amber-500/30 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                    <TrophyIcon size={18} weight="bold" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-xs uppercase font-mono text-muted font-bold tracking-wider">
                      3. Key Engineering Proofs &amp; Highlights
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-body leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold">•</span>
                        <span>
                          <strong className="text-ink">Java Coordinator @ devup:</strong> Mentoring 20+ peers in advanced Java, Spring Boot, and DSA. Leading weekly problem-solving sessions and code reviews.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold">•</span>
                        <span>
                          <strong className="text-ink">W2WShare (P2P Transfer):</strong> 0-relay encrypted WebRTC platform handling 50GB transfers with &lt;50MB RAM via Java 21 Virtual Threads &amp; AES-256-GCM.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold">•</span>
                        <span>
                          <strong className="text-ink">500+ LeetCode Solved &amp; Top 105 Nationally:</strong> Recognized in Google Solution Challenge 2025; B.Tech CSE CGPA 8.27/10.00.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer: Quick Actions */}
            <div className="p-4 sm:p-5 bg-surface-elevated/60 border-t border-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={copyPitch}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ink text-canvas hover:opacity-90 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer group"
              >
                {copiedPitch ? (
                  <>
                    <CheckIcon size={16} weight="bold" className="text-emerald-400" />
                    <span>Pitch Copied for Slack/Email!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={16} weight="bold" className="group-hover:scale-110 transition-transform" />
                    <span>Copy 1-Click Pitch for Team</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 justify-end flex-wrap">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-hairline bg-surface-card hover:bg-surface-elevated text-xs font-medium text-ink transition-colors cursor-pointer"
                  title="Copy varun.kush3@gmail.com"
                >
                  {copiedEmail ? (
                    <>
                      <CheckIcon size={14} weight="bold" className="text-emerald-500" />
                      <span>Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <EnvelopeSimpleIcon size={14} weight="bold" />
                      <span>Email</span>
                    </>
                  )}
                </button>

                <a
                  href="/Varun_Kushwah_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Varun_Kushwah_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 transition-colors"
                >
                  <DownloadSimpleIcon size={14} weight="bold" />
                  <span>Resume PDF</span>
                </a>

                <Link
                  to="/resume"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-hairline bg-surface-card hover:bg-surface-elevated text-xs font-medium text-ink transition-colors"
                >
                  <span>Full Resume Page</span>
                  <ArrowSquareOutIcon size={13} weight="bold" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
