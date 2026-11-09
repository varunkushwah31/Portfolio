import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  HouseIcon,
  UserIcon,
  CpuIcon,
  GitForkIcon,
  BriefcaseIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  XIcon,
  CodeIcon,
  ArrowSquareOutIcon,
  DownloadSimpleIcon,
  SunIcon,
  MoonIcon,
  CheckIcon,
  TerminalWindowIcon,
  LightningIcon,
} from "@phosphor-icons/react"
import projects from "@/data/projects"
import { useTheme } from "@/context/ThemeContext"
import { sound } from "@/lib/sound"
import { LeetCodeIcon } from "@/components/TechIcons"
import { useClipboardMachine } from "@/hooks"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume?: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: "Navigation" | "Projects" | "Actions" | "CLI Commands"
  icon: React.ReactNode
  action: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const clipboard = useClipboardMachine({ duration: 2000 })
  const [cliOutput, setCliOutput] = useState<{ command: string; content: React.ReactNode } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery("")
        setSelectedIndex(0)
        clipboard.reset()
        setCliOutput(null)
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen, clipboard])

  const handleClose = () => {
    setQuery("")
    setCliOutput(null)
    onClose()
  }

  const goTo = (path: string) => {
    sound.click()
    handleClose()
    void navigate(path)
  }

  const executeCli = (cmd: string) => {
    sound.click()
    const cleanCmd = cmd.trim().toLowerCase()

    if (cleanCmd === "clear" || cleanCmd === "cls" || cleanCmd === "varun --clear") {
      setCliOutput(null)
      setQuery("")
            return
    }

    if (
      cleanCmd === "help" ||
      cleanCmd === "varun --help" ||
      cleanCmd === "?" ||
      cleanCmd === "commands" ||
      cleanCmd === "man"
    ) {
      setCliOutput({
        command: "help",
        content: (
          <div className="space-y-2.5 text-xs font-mono">
            <div className="text-emerald-500 font-bold flex items-center justify-between">
              <span>$ help — VARUN INTERACTIVE DEVELOPER CLI v2.4</span>
              <span className="text-[10px] text-muted font-sans bg-surface-card px-2 py-0.5 rounded border border-hairline">
                6 commands registered
              </span>
            </div>
            <div className="text-body-muted text-[11px] font-sans">
              Type any command below or click a quick-action card to run:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-hairline/60">
              <button
                type="button"
                onClick={() => executeCli("help")}
                className="p-2.5 rounded-lg bg-surface-card border border-hairline text-left hover:border-emerald-500/40 transition-colors cursor-pointer group"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>help</span>
                  <span className="text-[10px] text-muted font-sans">Manual</span>
                </div>
                <div className="text-body-muted text-[11px] font-sans mt-0.5">List all available interactive terminal commands</div>
              </button>
              <button
                type="button"
                onClick={() => executeCli("skills")}
                className="p-2.5 rounded-lg bg-surface-card border border-hairline text-left hover:border-emerald-500/40 transition-colors cursor-pointer group"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>skills</span>
                  <span className="text-[10px] text-muted font-sans">Capability Tree</span>
                </div>
                <div className="text-body-muted text-[11px] font-sans mt-0.5">Output core languages, databases &amp; frameworks</div>
              </button>
              <button
                type="button"
                onClick={() => executeCli("curl contact")}
                className="p-2.5 rounded-lg bg-surface-card border border-hairline text-left hover:border-emerald-500/40 transition-colors cursor-pointer group"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>curl contact</span>
                  <span className="text-[10px] text-muted font-sans">HTTP GET</span>
                </div>
                <div className="text-body-muted text-[11px] font-sans mt-0.5">Copy email address and show LinkedIn / GitHub</div>
              </button>
              <button
                type="button"
                onClick={() => executeCli("sudo hire")}
                className="p-2.5 rounded-lg bg-surface-card border border-hairline text-left hover:border-emerald-500/40 transition-colors cursor-pointer group"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>sudo hire</span>
                  <span className="text-[10px] text-muted font-sans">Root Execution</span>
                </div>
                <div className="text-body-muted text-[11px] font-sans mt-0.5">Prompt root credentials &amp; open verified resume</div>
              </button>
              <button
                type="button"
                onClick={() => executeCli("theme toggle")}
                className="p-2.5 rounded-lg bg-surface-card border border-hairline text-left hover:border-emerald-500/40 transition-colors cursor-pointer group"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>theme toggle</span>
                  <span className="text-[10px] text-muted font-sans">Display Sync</span>
                </div>
                <div className="text-body-muted text-[11px] font-sans mt-0.5">Switch dark / light themes via terminal</div>
              </button>
              <button
                type="button"
                onClick={() => executeCli("skills")}
                className="p-2.5 rounded-lg bg-surface-card border border-hairline text-left hover:border-emerald-500/40 transition-colors cursor-pointer group"
              >
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>skills</span>
                  <span className="text-[10px] text-muted font-sans">Full Stack</span>
                </div>
                <div className="text-body-muted text-[11px] font-sans mt-0.5">Explore categorized technical skills</div>
              </button>
            </div>
            <div className="text-[10px] text-muted pt-1 flex items-center justify-between font-mono">
              <span>Type 'clear' to reset this terminal window</span>
              <span className="text-emerald-400">STATUS 0 [OK]</span>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (
      cleanCmd === "skills" ||
      cleanCmd === "varun --skills" ||
      cleanCmd === "stack" ||
      cleanCmd.includes("skills")
    ) {
      setCliOutput({
        command: "skills",
        content: (
          <div className="space-y-2.5 text-xs font-mono">
            <div className="text-emerald-500 font-bold flex items-center justify-between">
              <span>$ skills — VARUN KUSHWAH TECH STACK COMPILATION</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                LTS &amp; Modern
              </span>
            </div>
            <div className="space-y-2 pl-2 border-l border-emerald-500/30 text-body-strong">
              <div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">Languages &amp; Runtimes</div>
                <div className="text-ink">Java 21 (Virtual Threads / LTS), TypeScript 5, Python 3.11, JavaScript (ESNext), SQL</div>
              </div>
              <div>
                <div className="text-sky-600 dark:text-sky-400 font-semibold text-[11px] uppercase tracking-wider">Frameworks &amp; Backend Systems</div>
                <div className="text-ink">Spring Boot 3.x (Security, Data JPA, Cloud), Node.js, Express, Resilience4j, STOMP WebSockets</div>
              </div>
              <div>
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] uppercase tracking-wider">Databases &amp; Caching</div>
                <div className="text-ink">PostgreSQL, Redis 7 (Distributed Locking, Pub/Sub, Cache Warming), MySQL, MongoDB Atlas</div>
              </div>
              <div>
                <div className="text-amber-600 dark:text-amber-400 font-semibold text-[11px] uppercase tracking-wider">Distributed &amp; Real-Time Networking</div>
                <div className="text-ink">WebRTC (RTCDataChannel P2P), STOMP WebSockets, AES-256-GCM chunk streaming</div>
              </div>
              <div>
                <div className="text-teal-600 dark:text-teal-400 font-semibold text-[11px] uppercase tracking-wider">Frontend &amp; Creative</div>
                <div className="text-ink">React 19, Tailwind CSS v4, Three.js (WebGL), GSAP, Vite</div>
              </div>
              <div>
                <div className="text-purple-600 dark:text-purple-400 font-semibold text-[11px] uppercase tracking-wider">Cloud, DevOps &amp; Tooling</div>
                <div className="text-ink">Docker, Docker Compose, Git &amp; GitHub, Linux/Bash, Postman, Maven, Gradle</div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 font-sans">
              <button
                type="button"
                onClick={() => goTo("/tech-stack")}
                className="px-2.5 py-1 rounded bg-surface-elevated border border-hairline text-ink hover:text-emerald-400 text-xs font-medium transition-colors cursor-pointer"
              >
                Open Full Tech Stack &amp; Uses Page →
              </button>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (
      cleanCmd === "curl contact" ||
      cleanCmd === "curl" ||
      cleanCmd === "contact" ||
      cleanCmd.includes("curl") ||
      cleanCmd.includes("contact") ||
      cleanCmd === "varun --contact"
    ) {
      void clipboard.copy("varun.kush3@gmail.com")
      setCliOutput({
        command: "curl contact",
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold flex items-center justify-between">
              <span>$ curl -s https://varunkushwah.dev/api/contact</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                HTTP/2 200 OK
              </span>
            </div>
            <div className="bg-surface-card p-3 rounded-lg border border-hairline space-y-2 text-ink">
              <div className="text-muted text-[11px]">
                Email copied to your clipboard automatically:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-emerald-400 font-bold">email:</span>
                <span className="text-ink font-semibold">varun.kush3@gmail.com</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-sans font-medium">
                  Copied to clipboard
                </span>
              </div>
              <div className="space-y-1.5 pt-1 border-t border-hairline/60">
                <div>
                  <span className="text-sky-400 font-bold">linkedin:</span>{" "}
                  <a
                    href="https://www.linkedin.com/in/varun-kushwah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-strong hover:text-emerald-400 underline transition-colors"
                  >
                    https://www.linkedin.com/in/varun-kushwah/
                  </a>
                </div>
                <div>
                  <span className="text-indigo-400 font-bold">github:</span>{" "}
                  <a
                    href="https://github.com/varunkushwah31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-strong hover:text-emerald-400 underline transition-colors"
                  >
                    https://github.com/varunkushwah31
                  </a>
                </div>
                <div>
                  <span className="text-amber-400 font-bold">leetcode:</span>{" "}
                  <a
                    href="https://leetcode.com/u/Varun_Kushwah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-strong hover:text-amber-400 underline transition-colors"
                  >
                    https://leetcode.com/u/Varun_Kushwah/
                  </a>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold">availability:</span>{" "}
                  <span className="text-emerald-400">Available for Software Developer Internships &amp; Roles</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-sans">
              <a
                href="mailto:varun.kush3@gmail.com"
                className="px-2.5 py-1 rounded bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors"
              >
                Compose Direct Email
              </a>
              <a
                href="https://www.linkedin.com/in/varun-kushwah/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-surface-elevated border border-hairline text-ink hover:text-emerald-400 text-xs transition-colors"
              >
                Open LinkedIn Profile
              </a>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (
      cleanCmd === "sudo hire" ||
      cleanCmd === "sudo" ||
      cleanCmd === "hire" ||
      cleanCmd.includes("hire") ||
      cleanCmd === "varun --hire"
    ) {
      window.open("/Varun_Kushwah_Resume.pdf", "_blank", "noopener,noreferrer")
      setCliOutput({
        command: "sudo hire",
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold flex items-center justify-between">
              <span>$ sudo hire --candidate=varun-kushwah</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                ROOT PRIVILEGES GRANTED
              </span>
            </div>
            <div className="bg-surface-card p-3 rounded-lg border border-hairline space-y-1.5 text-body-strong">
              <div className="text-muted text-[11px]">
                [sudo] password for recruiter: **********
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Authentication successful. Elevating session to root engineering recruiter.
              </div>
              <div className="text-ink pl-2 border-l border-emerald-500/40 space-y-1 mt-1">
                <div>&gt; Candidate: <strong className="text-ink">Varun Kushwah</strong></div>
                <div>&gt; Primary focus: <span className="text-emerald-600 dark:text-emerald-400">Java 21 · Spring Boot · WebRTC · Distributed Systems</span></div>
                <div>&gt; Credentials: <span className="text-sky-600 dark:text-sky-400">500+ LeetCode · Google Solution Challenge Top 105 · CGPA 8.27</span></div>
                <div>&gt; Status: <span className="text-amber-600 dark:text-amber-400">Available for Summer / Immediate 2025/2026 Developer Roles</span></div>
              </div>
              <div className="pt-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                [SUCCESS] Dispatched ATS-optimized document: <span className="underline">Varun_Kushwah_Resume.pdf</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-sans">
              <a
                href="/Varun_Kushwah_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors"
              >
                Download Resume PDF
              </a>
              <button
                type="button"
                onClick={() => goTo("/resume")}
                className="px-2.5 py-1 rounded bg-surface-elevated border border-hairline text-ink hover:text-emerald-400 text-xs transition-colors cursor-pointer"
              >
                Open Interactive Timeline
              </button>
              <a
                href="mailto:varun.kush3@gmail.com?subject=Interview%20Invitation%20%E2%80%94%20Varun%20Kushwah"
                className="px-2.5 py-1 rounded bg-surface-elevated border border-hairline text-ink hover:text-emerald-400 text-xs transition-colors"
              >
                Schedule Interview
              </a>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (
      cleanCmd === "theme toggle" ||
      cleanCmd === "theme" ||
      cleanCmd.startsWith("theme") ||
      cleanCmd === "dark" ||
      cleanCmd === "light"
    ) {
      sound.switchTab()
      let nextTheme: "dark" | "light"
      if (cleanCmd.includes("light")) {
        if (theme !== "light") toggleTheme()
        nextTheme = "light"
      } else if (cleanCmd.includes("dark")) {
        if (theme !== "dark") toggleTheme()
        nextTheme = "dark"
      } else {
        toggleTheme()
        nextTheme = theme === "dark" ? "light" : "dark"
      }

      setCliOutput({
        command: `theme toggle (${nextTheme} mode)`,
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold flex items-center justify-between">
              <span>$ theme toggle</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                PALETTE SYNCHRONIZED
              </span>
            </div>
            <div className="bg-surface-card p-3 rounded-lg border border-hairline space-y-1.5 text-body-strong">
              <div>
                Active display palette switched to:{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">{nextTheme} MODE</span>
              </div>
              <div className="text-muted text-[11px]">
                CSS design tokens, backdrop filters, and high-contrast surfaces synchronized in real time.
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 font-sans">
              <button
                type="button"
                onClick={() => executeCli("theme toggle")}
                className="px-2.5 py-1 rounded bg-surface-elevated border border-hairline text-ink hover:text-emerald-400 text-xs transition-colors cursor-pointer"
              >
                Toggle Theme Again
              </button>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (cleanCmd.includes("pitch") || cleanCmd.includes("tldr") || cleanCmd.includes("recruiter")) {
      setCliOutput({
        command: cleanCmd,
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ candidate overview</div>
            <div className="space-y-1.5 pl-2 border-l border-emerald-500/30 text-body-strong">
              <div><strong className="text-ink">Role Sought:</strong> Software Engineering Intern / Junior Backend Developer</div>
              <div><strong className="text-emerald-400">Primary Stack:</strong> Java 21, Spring Boot, PostgreSQL, WebRTC, Docker, Redis</div>
              <div><strong className="text-amber-400">Highlights:</strong> Java Coordinator @ devup · W2WShare · 500+ LeetCode · Top 105 Nationally</div>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (cleanCmd.includes("resume")) {
      window.open("/Varun_Kushwah_Resume.pdf", "_blank", "noopener,noreferrer")
      setCliOutput({
        command: "varun --download-resume",
        content: (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ varun --download-resume</div>
            <div className="text-body-strong pl-2 border-l border-emerald-500/30">
              [200 OK] Opened Varun_Kushwah_Resume.pdf in a new tab. Check your downloads for the ATS-verified PDF document.
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (cleanCmd.includes("project")) {
      setCliOutput({
        command: "projects",
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ projects — FEATURED PRODUCTION SYSTEMS</div>
            <div className="space-y-1.5 pl-2 border-l border-emerald-500/30 text-body-strong">
              <div>1. <strong className="text-ink">MentorSync:</strong> LeetCode/Codeforces LMS with Redis distributed cache warming &amp; WebSockets.</div>
              <div>2. <strong className="text-ink">W2W Share:</strong> Peer-to-peer browser file distribution via WebRTC DataChannels &amp; AES-256-GCM.</div>
            </div>
            <div className="pt-1.5 flex items-center gap-2 font-sans">
              <button
                type="button"
                onClick={() => goTo("/projects")}
                className="px-2.5 py-1 rounded bg-surface-elevated border border-hairline text-ink hover:text-emerald-400 text-xs transition-colors cursor-pointer"
              >
                View All Projects →
              </button>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    if (cleanCmd === "whoami") {
      setCliOutput({
        command: "whoami",
        content: (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ whoami</div>
            <div className="bg-surface-card p-3 rounded-lg border border-hairline space-y-1 text-body-strong">
              <div>User: <strong className="text-emerald-400">guest@varunkushwah.dev</strong></div>
              <div>Role: <span className="text-ink">Engineering Recruiter / Technical Visitor</span></div>
              <div>Permissions: <span className="text-sky-400">Interactive CLI Exec (read-only + elevated sudo)</span></div>
              <div className="text-[11px] text-muted pt-1">Type <span className="text-emerald-400">'help'</span> to inspect all terminal commands.</div>
            </div>
          </div>
        ),
      })
      sound.success()
      setQuery("")
            return
    }

    // Default fallback output
    setCliOutput({
      command: cmd,
      content: (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-red-400 font-bold">$ {cmd} — COMMAND NOT FOUND</div>
          <div className="space-y-1 pl-2 border-l border-red-500/30 text-body-strong">
            <div>shell: command not found: <code className="text-ink">{cmd}</code></div>
            <div className="text-muted text-[11px] pt-1">
              Available commands: <span className="text-emerald-400">help</span>, <span className="text-emerald-400">skills</span>, <span className="text-emerald-400">curl contact</span>, <span className="text-emerald-400">sudo hire</span>, <span className="text-emerald-400">theme toggle</span>, <span className="text-emerald-400">clear</span>
            </div>
          </div>
        </div>
      ),
    })
    sound.switchTab()
    setQuery("")
      }

  const allCommands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Home",
      subtitle: "varunkushwah.dev/",
      category: "Navigation",
      icon: <HouseIcon size={16} />,
      action: () => goTo("/"),
    },
    {
      id: "nav-about",
      title: "About",
      subtitle: "About Varun & background",
      category: "Navigation",
      icon: <UserIcon size={16} />,
      action: () => goTo("/about"),
    },
    {
      id: "nav-tech-stack",
      title: "Tech Stack & Uses",
      subtitle: "Languages, tools & setup",
      category: "Navigation",
      icon: <CpuIcon size={16} />,
      action: () => goTo("/tech-stack"),
    },
    {
      id: "nav-projects",
      title: "Projects",
      subtitle: "Browse all projects",
      category: "Navigation",
      icon: <GitForkIcon size={16} />,
      action: () => goTo("/projects"),
    },
    {
      id: "nav-resume",
      title: "Resume",
      subtitle: "Experience & education",
      category: "Navigation",
      icon: <BriefcaseIcon size={16} />,
      action: () => {
        if (onOpenResume) {
          handleClose()
          onOpenResume()
        } else {
          goTo("/resume")
        }
      },
    },

    // Projects
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      title: p.title,
      subtitle: p.tagline,
      category: "Projects" as const,
      icon: <CodeIcon size={16} />,
      action: () => {
        handleClose()
        void navigate(`/project/${p.slug}`)
      },
    })),

    // Actions
    {
      id: "action-toggle-theme",
      title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      icon: theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />,
      action: () => {
        toggleTheme()
        handleClose()
      },
    },
    {
      id: "action-resume-pdf",
      title: "Download Resume",
      subtitle: "PDF document",
      category: "Actions",
      icon: <DownloadSimpleIcon size={16} />,
      action: () => {
        window.open("/Varun_Kushwah_Resume.pdf", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-devup",
      title: "devup Club Website",
      subtitle: "devup.co.in",
      category: "Actions",
      icon: <ArrowSquareOutIcon size={16} />,
      action: () => {
        window.open("https://devup.co.in/", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-github",
      title: "GitHub Profile",
      subtitle: "github.com/varunkushwah31",
      category: "Actions",
      icon: <GithubLogoIcon size={16} />,
      action: () => {
        window.open("https://github.com/varunkushwah31", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-linkedin",
      title: "LinkedIn Profile",
      subtitle: "linkedin.com/in/varun-kushwah",
      category: "Actions",
      icon: <LinkedinLogoIcon size={16} />,
      action: () => {
        window.open("https://www.linkedin.com/in/varun-kushwah/", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-leetcode",
      title: "LeetCode Profile",
      subtitle: "leetcode.com/u/Varun_Kushwah (500+ Solved)",
      category: "Actions",
      icon: <LeetCodeIcon size={16} className="text-[#FFA116]" />,
      action: () => {
        window.open("https://leetcode.com/u/Varun_Kushwah/", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-email",
      title: "Copy Email",
      subtitle: "varun.kush3@gmail.com",
      category: "Actions",
      icon: <EnvelopeSimpleIcon size={16} />,
      action: () => {
        void clipboard.copy("varun.kush3@gmail.com")
      },
    },

    // CLI Commands
    {
      id: "cli-cmd-help",
      title: "help",
      subtitle: "List all available interactive terminal commands",
      category: "CLI Commands",
      icon: <TerminalWindowIcon size={16} className="text-emerald-500" />,
      action: () => executeCli("help"),
    },
    {
      id: "cli-cmd-skills",
      title: "skills",
      subtitle: "Output core languages, databases, and frameworks",
      category: "CLI Commands",
      icon: <CpuIcon size={16} className="text-emerald-500" />,
      action: () => executeCli("skills"),
    },
    {
      id: "cli-cmd-contact",
      title: "curl contact",
      subtitle: "Copy email address and show LinkedIn & GitHub",
      category: "CLI Commands",
      icon: <EnvelopeSimpleIcon size={16} className="text-sky-400" />,
      action: () => executeCli("curl contact"),
    },
    {
      id: "cli-cmd-hire",
      title: "sudo hire",
      subtitle: "Triggers a confetti-free terminal prompt opening resume",
      category: "CLI Commands",
      icon: <LightningIcon size={16} className="text-amber-400" />,
      action: () => executeCli("sudo hire"),
    },
    {
      id: "cli-cmd-theme",
      title: "theme toggle",
      subtitle: "Switch dark/light themes via terminal",
      category: "CLI Commands",
      icon: theme === "dark" ? <SunIcon size={16} className="text-amber-300" /> : <MoonIcon size={16} className="text-indigo-400" />,
      action: () => executeCli("theme toggle"),
    },
  ]

  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle?.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    )
  })

  // Group by category
  const categories: Array<"CLI Commands" | "Navigation" | "Projects" | "Actions"> = [
    "CLI Commands",
    "Navigation",
    "Projects",
    "Actions",
  ]
  const grouped = categories.reduce<Record<string, CommandItem[]>>((acc, cat) => {
    const items = filteredCommands.filter((c) => c.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  const flatList = filteredCommands

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      })
    }
  }, [selectedIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (flatList.length > 0 ? (prev + 1) % flatList.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (flatList.length > 0 ? (prev - 1 + flatList.length) % flatList.length : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = query.trim().toLowerCase()
      const isDirectCliCmd =
        trimmed.startsWith("help") ||
        trimmed.startsWith("skills") ||
        trimmed.startsWith("curl") ||
        trimmed.startsWith("contact") ||
        trimmed.startsWith("sudo") ||
        trimmed.startsWith("hire") ||
        trimmed.startsWith("theme") ||
        trimmed.startsWith("varun") ||
        trimmed.startsWith("--") ||
        trimmed === "clear" ||
        trimmed === "cls" ||
        trimmed === "whoami" ||
        trimmed === "projects" ||
        trimmed === "pitch" ||
        trimmed === "tldr"

      if (isDirectCliCmd) {
        executeCli(trimmed)
      } else if (flatList[selectedIndex]) {
        flatList[selectedIndex].action()
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleClose()
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-50 flex items-end sm:items-start justify-center p-0 sm:p-4 pt-0 sm:pt-24"
          onClick={handleClose}
        >
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs" />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-t-3xl sm:rounded-2xl border border-hairline bg-surface-card shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88dvh] sm:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
            data-palette-mode={cliOutput ? "terminal" : "search"}
            data-active-index={selectedIndex}
            data-testid="command-palette-dialog"
          >
            {/* Mobile Drag Handle Indicator */}
            <div className="w-12 h-1.5 bg-muted/30 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />
            {/* Search Input Box */}
            <div className="flex items-center gap-3.5 px-4.5 py-4 border-b border-hairline bg-surface-card">
              <TerminalWindowIcon size={20} className="text-emerald-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command (help, skills, curl contact, sudo hire, theme toggle)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-base text-ink placeholder:text-muted outline-none font-normal"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setSelectedIndex(0)
                  }}
                  className="p-1 text-muted hover:text-ink transition-colors shrink-0 cursor-pointer text-xs"
                  aria-label="Clear query"
                >
                  <XIcon size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex text-[10px] font-mono text-muted border border-hairline px-2 py-0.5 rounded-md bg-surface-soft shrink-0">
                ESC
              </kbd>
            </div>

            {/* Interactive Terminal Output View if command was run */}
            {cliOutput && (
              <div className="bg-surface-soft border-b border-hairline p-4 relative font-mono text-xs max-h-56 overflow-y-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline/60 text-[10px] text-muted">
                  <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    TERMINAL OUTPUT — {cliOutput.command}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCliOutput(null)}
                    className="hover:text-ink cursor-pointer text-[10px] font-mono underline"
                  >
                    Clear Output [x]
                  </button>
                </div>
                {cliOutput.content}
              </div>
            )}

            {/* Copied Feedback */}
            {clipboard.isCopied && (
              <div
                className="px-4.5 py-2 bg-surface-soft border-b border-hairline text-emerald-500 text-xs flex items-center gap-2"
                role="status"
                aria-live="polite"
                data-clipboard-state="copied"
              >
                <CheckIcon size={14} weight="bold" />
                <span>Email copied to clipboard (varun.kush3@gmail.com)</span>
              </div>
            )}

            {/* Command List */}
            <div className="max-h-105 overflow-y-auto p-2.5 space-y-3">
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category}>
                  <div className="px-3 pt-3 pb-1.5 text-[11px] font-semibold text-muted/80 uppercase tracking-wider first:pt-1">
                    {category}
                  </div>

                  <div className="space-y-1">
                    {cmds.map((cmd) => {
                      const globalIdx = flatList.indexOf(cmd)
                      const isSelected = globalIdx === selectedIndex
                      return (
                        <button
                          type="button"
                          key={cmd.id}
                          ref={(el) => {
                            itemRefs.current[globalIdx] = el
                          }}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`w-full flex items-center justify-between gap-4 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer group ${
                            isSelected
                              ? "bg-surface-elevated text-ink"
                              : "text-body hover:bg-surface-elevated/70 hover:text-ink"
                          }`}
                        >
                          {/* Left: Icon + Title */}
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`shrink-0 transition-colors ${isSelected ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                              {cmd.icon}
                            </span>
                            <span className="text-sm font-medium truncate text-ink">
                              {cmd.title}
                            </span>
                          </div>

                          {/* Right: Subtitle & Selection cue */}
                          <div className="flex items-center gap-3 shrink-0 ml-auto">
                            {cmd.subtitle && (
                              <span className="text-xs text-muted truncate max-w-70 hidden sm:inline font-normal">
                                {cmd.subtitle}
                              </span>
                            )}
                            {isSelected ? (
                              <span className="text-[10px] text-muted font-mono bg-surface-card border border-hairline px-1.5 py-0.5 rounded shadow-2xs">
                                ↵
                              </span>
                            ) : (
                              <span className="w-5" />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {filteredCommands.length === 0 && (
                <div className="py-12 text-center text-sm text-muted">
                  No commands found for "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4.5 py-2.5 border-t border-hairline bg-surface-card text-[11px] text-muted flex items-center justify-between font-mono">
              <div className="hidden sm:flex items-center gap-3.5">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface-soft text-[10px]">↑↓</kbd>
                  <span className="font-sans text-xs text-muted">navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface-soft text-[10px]">↵</kbd>
                  <span className="font-sans text-xs text-muted">select</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface-soft text-[10px]">esc</kbd>
                  <span className="font-sans text-xs text-muted">close</span>
                </span>
              </div>
              <span className="sm:hidden font-sans text-xs text-muted">
                Tap command to run
              </span>
              <span className="font-mono text-[11px] text-muted/70 hidden sm:inline">
                {filteredCommands.length} {filteredCommands.length === 1 ? "result" : "results"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default CommandPalette
