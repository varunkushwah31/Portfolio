import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Printer,
  Copy,
  Check,
  Mail,
  Award,
  BookOpen,
  FolderGit2,
  Cpu
} from "lucide-react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
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

  const handlePrint = () => {
    window.print()
  }

  const rawResumeText = `VARUN KUSHWAH
Software Developer · Java Coordinator @ devup
Email: varun.kush3@gmail.com | GitHub: github.com/varunkushwah31 | LinkedIn: linkedin.com/in/varun-kushwah
Location: India

SUMMARY
Computer Science student and software developer specializing in building robust backend systems with Java and Spring Boot. Passionate about real-time protocols (WebRTC), distributed systems architecture, and clean decoupled code.

TECHNICAL SKILLS
- Languages: Java 21, Python, TypeScript, JavaScript, Dart, SQL
- Frameworks & Libs: Spring Boot, Spring Data JPA, React, Node.js, Express, Flutter, Tailwind CSS
- Protocols & Systems: WebRTC (RTCDataChannel), WebSockets, REST APIs, OS-level APIs
- Tools & DevOps: Git, Git Subtree Monorepos, Docker, CI/CD, Postman, Linux

LEADERSHIP & EXPERIENCE
Java Coordinator — devup College Club (2024 – Present)
- Lead Java programming workshops and mentored 100+ peer developers in object-oriented programming.
- Structured code review sessions and established Git workflows for collaborative projects.

FEATURED PROJECTS
1. LeetcodeTracker (Full-Stack / Git Subtree Monorepo)
- Full-stack progress tracker with Git Subtree repository architecture and JWT authentication.
2. MangoShare Clone (Real-Time P2P / WebRTC)
- Direct browser-to-browser file transfer engine utilizing WebRTC DataChannels with zero server relay.
3. System Health Dashboard (Systems / Telemetry)
- Real-time local hardware performance monitor using OS APIs with continuous live chart streams.
4. Disease Prediction (Machine Learning)
- End-to-end multi-algorithm classification pipeline mapping symptoms to high-confidence diagnoses (96.4% cross-val).
5. Daily Quotes App (Mobile / Flutter)
- Cross-platform application built with clean decoupled architecture and daily curated content refresh.

EDUCATION
B.Tech / Undergraduate in Computer Science & Engineering (2023 – 2027)`

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawResumeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                <span className="label-uppercase text-m-blue-light text-xs tracking-[2px]">
                  CURRICULUM VITAE // SPECIFICATION
                </span>
                <span className="text-hairline hidden sm:inline">|</span>
                <span className="text-muted font-mono text-xs hidden sm:inline">
                  VARUN_KUSHWAH_RESUME.SPEC
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="btn-text px-3 py-2 bg-surface-card hover:bg-surface-elevated text-ink border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ borderRadius: "0px" }}
                  title="Print / Save PDF"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline">PRINT / PDF</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="btn-text px-3 py-2 bg-surface-card hover:bg-surface-elevated text-ink border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  style={{ borderRadius: "0px" }}
                  title="Copy Plain Text"
                >
                  {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  <span className="hidden sm:inline">{copied ? "COPIED" : "COPY TEXT"}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-9 h-9 bg-surface-card hover:bg-surface-elevated text-ink rounded-full flex items-center justify-center border border-hairline transition-colors cursor-pointer ml-2"
                  aria-label="Close Resume Modal"
                >
                  <X size={16} />
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
                    <p className="label-uppercase text-m-blue-light text-sm tracking-[2px]">
                      SOFTWARE DEVELOPER · JAVA COORDINATOR @ DEVUP
                    </p>
                  </div>
                  <div className="font-mono text-xs text-muted space-y-1 md:text-right">
                    <div>varun.kush3@gmail.com</div>
                    <div>github.com/varunkushwah31</div>
                    <div>linkedin.com/in/varun-kushwah</div>
                  </div>
                </div>
                <p className="body-light text-body text-sm leading-relaxed max-w-3xl">
                  Computer Science undergraduate specializing in backend architecture with Java and Spring Boot.
                  Experienced in peer-to-peer real-time systems (WebRTC), Git Subtree workflows, and full-stack integration.
                </p>
              </div>

              {/* Technical Stack Grid */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <Cpu size={14} className="text-m-blue-light" />
                  TECHNICAL SKILLS & COMPETENCIES
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">LANGUAGES</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      Java 21, Python, TypeScript, JavaScript, Dart, SQL
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">FRAMEWORKS & LIBS</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      Spring Boot, Spring Data JPA, React, Node.js, Express, Flutter, Tailwind CSS
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">PROTOCOLS & ARCHITECTURE</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      WebRTC (RTCDataChannel), WebSockets, REST APIs, Git Subtree Monorepos
                    </div>
                  </div>
                  <div className="bg-surface-soft p-4 border border-hairline-strong">
                    <div className="label-uppercase text-ink text-xs mb-2">SYSTEMS & DEVOPS</div>
                    <div className="font-mono text-xs text-body leading-relaxed">
                      OS Telemetry APIs, Docker, Git Workflows, Linux Environment, Postman
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership & Experience */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <Award size={14} className="text-m-blue-dark" />
                  LEADERSHIP & EXPERIENCE
                </div>
                <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="text-ink font-bold text-base uppercase">
                      JAVA COORDINATOR — DEVUP COLLEGE CLUB
                    </div>
                    <span className="font-mono text-xs text-muted">2024 – PRESENT</span>
                  </div>
                  <p className="body-light text-xs md:text-sm text-body leading-relaxed">
                    Organizing Java workshops, mentoring over 100+ students in OOP fundamentals, clean code practices, and coordinating collaborative repository development.
                  </p>
                </div>
              </div>

              {/* Featured Engineering Projects */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <FolderGit2 size={14} className="text-m-red" />
                  FEATURED ENGINEERING PROJECTS
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-ink font-bold text-sm uppercase text-m-blue-light">
                        LEETCODETRACKER · FULL-STACK ENGINE
                      </div>
                      <span className="font-mono text-[11px] text-muted">REACT · EXPRESS · GIT SUBTREES</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      Unified monorepo architecture using Git Subtree workflows; persistent session management, streak analytics computation, and full-stack integration.
                    </p>
                  </div>

                  <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-ink font-bold text-sm uppercase text-m-blue-light">
                        MANGOSHARE CLONE · REAL-TIME P2P PROTOCOL
                      </div>
                      <span className="font-mono text-[11px] text-muted">REACT · WEBRTC · DATACHANNELS</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      Direct browser-to-browser file transfer platform with WebRTC ICE candidate signaling, achieving zero server relay bottleneck.
                    </p>
                  </div>

                  <div className="bg-surface-soft p-5 border border-hairline-strong space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-ink font-bold text-sm uppercase text-m-blue-light">
                        SYSTEM HEALTH DASHBOARD · TELEMETRY MONITOR
                      </div>
                      <span className="font-mono text-[11px] text-muted">REACT · OS APIS · WEBSOCKETS</span>
                    </div>
                    <p className="body-light text-xs text-body leading-relaxed">
                      Self-hosted lightweight monitoring agent collecting OS CPU, memory, disk, and network streams with live chart updates at 1000ms tick cadence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-4 tracking-[2px] flex items-center gap-2">
                  <BookOpen size={14} className="text-m-blue-light" />
                  EDUCATION
                </div>
                <div className="bg-surface-soft p-5 border border-hairline-strong flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-ink font-bold text-sm uppercase">
                      B.TECH IN COMPUTER SCIENCE & ENGINEERING
                    </div>
                    <div className="text-xs text-muted">Undergraduate Degree Program</div>
                  </div>
                  <div className="font-mono text-xs text-m-blue-light">
                    2023 – 2027 [IN PROGRESS]
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:px-8 bg-surface-soft border-t border-hairline flex items-center justify-between gap-4 shrink-0 text-xs font-mono text-muted">
              <span>STATUS: AVAILABLE FOR INTERNSHIPS & SDE ROLES</span>
              <a
                href="mailto:varun.kush3@gmail.com"
                className="btn-text bg-ink text-canvas hover:bg-body-strong px-5 py-2.5 inline-flex items-center gap-2 text-xs transition-colors"
                style={{ borderRadius: "0px" }}
              >
                <Mail size={14} /> CONTACT DIRECTLY
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
