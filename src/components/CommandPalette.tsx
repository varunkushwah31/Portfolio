import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  FileText,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FolderGit2,
  Terminal,
  Cpu,
  User,
  Code
} from "lucide-react"
import projects from "@/data/projects"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: "NAVIGATION" | "PROJECTS" | "ACTIONS" | "TERMINAL"
  icon: React.ReactNode
  action: () => void
}

const CommandPalette = ({ isOpen, onClose, onOpenResume }: CommandPaletteProps) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = "unset"
      setQuery("")
      setSelectedIndex(0)
      setTerminalOutput(null)
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Trigger open via custom event or prop
          const event = new CustomEvent("open-command-palette")
          window.dispatchEvent(event)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const scrollToSection = (id: string) => {
    onClose()
    if (window.location.pathname !== "/") {
      navigate(`/#${id}`)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Define commands
  const allCommands: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      title: "OVERVIEW // HERO",
      subtitle: "Jump to introduction and status",
      category: "NAVIGATION",
      icon: <User size={15} className="text-m-blue-light" />,
      action: () => scrollToSection("hero"),
    },
    {
      id: "nav-about",
      title: "ABOUT & LEADERSHIP TRACK",
      subtitle: "devup Coordinator & background",
      category: "NAVIGATION",
      icon: <FileText size={15} className="text-m-blue-light" />,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-skills",
      title: "TECHNICAL CAPABILITIES & STACK",
      subtitle: "Java, Spring Boot, React, WebRTC, Systems",
      category: "NAVIGATION",
      icon: <Cpu size={15} className="text-m-blue-dark" />,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-projects",
      title: "ENGINEERING PROJECTS & SPECIFICATIONS",
      subtitle: "Browse all 5 technical repositories",
      category: "NAVIGATION",
      icon: <FolderGit2 size={15} className="text-m-red" />,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-contact",
      title: "DIRECT TRANSMISSION // CONTACT",
      subtitle: "Reach out for engineering collaboration",
      category: "NAVIGATION",
      icon: <Mail size={15} className="text-m-blue-light" />,
      action: () => scrollToSection("contact"),
    },

    // Actions
    {
      id: "action-resume",
      title: "VIEW RESUME // CV SPECIFICATION",
      subtitle: "Open printable engineering resume spec",
      category: "ACTIONS",
      icon: <FileText size={15} className="text-success" />,
      action: () => {
        onClose()
        onOpenResume()
      },
    },
    {
      id: "action-github",
      title: "OPEN GITHUB PROFILE",
      subtitle: "https://github.com/varunkushwah31",
      category: "ACTIONS",
      icon: <Github size={15} className="text-body-strong" />,
      action: () => {
        window.open("https://github.com/varunkushwah31", "_blank")
        onClose()
      },
    },
    {
      id: "action-linkedin",
      title: "OPEN LINKEDIN PROFILE",
      subtitle: "Connect with Varun Kushwah",
      category: "ACTIONS",
      icon: <Linkedin size={15} className="text-m-blue-dark" />,
      action: () => {
        window.open("https://www.linkedin.com/in/varun-kushwah/", "_blank")
        onClose()
      },
    },
    {
      id: "action-email",
      title: "COPY DIRECT EMAIL",
      subtitle: "varun.kush3@gmail.com",
      category: "ACTIONS",
      icon: <Mail size={15} className="text-warning" />,
      action: () => {
        navigator.clipboard.writeText("varun.kush3@gmail.com")
        setTerminalOutput("COPIED: varun.kush3@gmail.com")
      },
    },

    // Projects Direct
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      title: `SPEC: ${p.title}`,
      subtitle: `${p.category} · ${p.version} · ${p.tagline}`,
      category: "PROJECTS" as const,
      icon: <Code size={15} className="text-m-blue-light" />,
      action: () => {
        onClose()
        navigate(`/project/${p.slug}`)
      },
    })),
  ]

  // Filter commands
  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    )
  })

  // Handle Terminal CLI commands when user enters text
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length))
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length))
      return
    }

    if (e.key === "Enter") {
      e.preventDefault()
      const trimmed = query.trim().toLowerCase()

      // Terminal direct commands
      if (trimmed === "help") {
        setTerminalOutput("COMMANDS: whoami, skills, projects, resume, contact, clear, sudo hire")
        return
      }
      if (trimmed === "whoami") {
        setTerminalOutput("Varun Kushwah — Software Developer & Java Coordinator @ devup. Focus: Java/Spring, Full-Stack, Real-time Systems.")
        return
      }
      if (trimmed === "skills") {
        setTerminalOutput("CORE: Java 21, Spring Boot, React, WebRTC, Flutter, Git Subtrees, Systems Monitoring.")
        return
      }
      if (trimmed === "resume") {
        onClose()
        onOpenResume()
        return
      }
      if (trimmed === "clear") {
        setTerminalOutput(null)
        setQuery("")
        return
      }
      if (trimmed === "sudo hire") {
        setTerminalOutput("ACCESS GRANTED: Candidate initialized for immediate engineering impact. Direct email: varun.kush3@gmail.com")
        return
      }

      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action()
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-canvas/90 backdrop-blur-md cursor-pointer"
          />

          {/* HUD Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            className="relative w-full max-w-2xl bg-surface-card border border-hairline z-10 shadow-2xl overflow-hidden mt-8 md:mt-16"
            style={{ borderRadius: "0px" }}
          >
            {/* Top M-Stripe */}
            <div className="m-stripe" />

            {/* Header & Search Bar */}
            <div className="p-4 bg-surface-soft border-b border-hairline flex items-center gap-3">
              <Terminal size={18} className="text-m-blue-light shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                  setTerminalOutput(null)
                }}
                onKeyDown={handleKeyDown}
                placeholder="TYPE A COMMAND OR SEARCH (e.g. 'projects', 'resume', 'skills', 'whoami')..."
                className="w-full bg-transparent text-ink placeholder:text-muted placeholder:font-light text-xs md:text-sm font-mono focus:outline-none uppercase"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("")
                    setTerminalOutput(null)
                  }}
                  className="text-muted hover:text-ink transition-colors p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Terminal Response HUD (if any) */}
            {terminalOutput && (
              <div className="p-4 bg-canvas border-b border-hairline font-mono text-xs text-m-blue-light leading-relaxed flex items-start gap-2">
                <span className="text-muted shrink-0">&gt;</span>
                <span>{terminalOutput}</span>
              </div>
            )}

            {/* Command Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-hairline-strong">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-muted font-mono text-xs">
                  NO COMMANDS OR REPOSITORIES FOUND MATCHING "{query.toUpperCase()}".
                  <div className="mt-2 text-body">Try typing "help", "projects", "resume", or "whoami".</div>
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = selectedIndex === idx
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-surface-elevated text-ink"
                          : "bg-transparent text-body hover:text-ink"
                      }`}
                      style={{ borderRadius: "0px" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 flex items-center justify-center border ${
                            isSelected
                              ? "bg-surface-card border-hairline text-ink"
                              : "bg-surface-soft border-hairline-strong text-muted"
                          }`}
                        >
                          {cmd.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold font-sans uppercase tracking-wider text-ink">
                            {cmd.title}
                          </div>
                          {cmd.subtitle && (
                            <div className="text-[11px] font-mono text-muted truncate max-w-sm sm:max-w-md">
                              {cmd.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-muted bg-surface-soft px-1.5 py-0.5 border border-hairline-strong hidden sm:inline">
                          {cmd.category}
                        </span>
                        {isSelected && <ArrowRight size={14} className="text-m-blue-light" />}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="p-3 bg-surface-soft border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-muted">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-surface-card border border-hairline text-ink">↑</kbd>{" "}
                  <kbd className="px-1.5 py-0.5 bg-surface-card border border-hairline text-ink">↓</kbd> NAVIGATE
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-surface-card border border-hairline text-ink">↵</kbd> EXECUTE
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-surface-card border border-hairline text-ink">ESC</kbd> CLOSE
                </span>
              </div>
              <div className="text-m-blue-light font-bold">
                BMW M TELEMETRY COMMAND HUD
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
