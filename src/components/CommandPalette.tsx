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
  const [copied, setCopied] = useState(false)
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
        setCopied(false)
        setCliOutput(null)
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    setQuery("")
    setCliOutput(null)
    onClose()
  }

  const goTo = (path: string) => {
    sound.click()
    handleClose()
    navigate(path)
  }

  const executeCli = (cmd: string) => {
    sound.click()
    const cleanCmd = cmd.trim().toLowerCase()

    if (cleanCmd.includes("clear")) {
      setCliOutput(null)
      setQuery("")
      return
    }

    if (cleanCmd.includes("pitch") || cleanCmd.includes("tldr") || cleanCmd.includes("recruiter")) {
      setCliOutput({
        command: "varun --pitch",
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ varun --pitch // 30-SECOND RECRUITER TL;DR</div>
            <div className="space-y-1.5 pl-2 border-l border-emerald-500/30 text-body-strong">
              <div><strong className="text-ink">Role Sought:</strong> Software Engineering Intern / Junior Backend Developer</div>
              <div><strong className="text-emerald-400">Primary Stack:</strong> Java 21, Spring Boot, PostgreSQL, WebRTC, Docker, Redis, React 19</div>
              <div><strong className="text-amber-400">Highlights:</strong> Java Coordinator @ devup · W2WShare (P2P encrypted file transfer) · 500+ LeetCode · Google Solution Challenge Top 105</div>
            </div>
            <div className="pt-1.5 flex items-center gap-2">
              <button
                onClick={() => {
                  handleClose()
                  window.dispatchEvent(new CustomEvent("open-recruiter-pitch"))
                }}
                className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[11px] font-sans font-semibold cursor-pointer transition-colors"
              >
                Open Full 30s Pitch Modal →
              </button>
            </div>
          </div>
        ),
      })
      sound.success()
      return
    }

    if (cleanCmd.includes("skills")) {
      setCliOutput({
        command: "varun --skills",
        content: (
          <div className="space-y-2 text-xs">
            <div className="text-emerald-500 font-bold">$ varun --skills // SYSTEM CAPABILITIES</div>
            <div className="space-y-1 font-mono text-body-strong pl-2 border-l border-emerald-500/30">
              <div><strong className="text-emerald-400">Core Backend:</strong> Java 21, Spring Boot 3.x, Virtual Threads, REST APIs</div>
              <div><strong className="text-indigo-400">Distributed &amp; Real-Time:</strong> WebRTC DataChannels, Redis 7 (Locks &amp; Pub/Sub), STOMP WebSockets</div>
              <div><strong className="text-sky-400">Frontend:</strong> React 19, TypeScript, Tailwind CSS v4, Three.js, GSAP</div>
              <div><strong className="text-amber-400">DevOps &amp; Database:</strong> PostgreSQL, Docker, Git Subtrees, Linux, Postman</div>
              <div><strong className="text-emerald-400">Leadership:</strong> Java Coordinator @ devup (Mentoring 100+ emerging developers)</div>
            </div>
          </div>
        ),
      })
      sound.success()
      return
    }

    if (cleanCmd.includes("contact")) {
      navigator.clipboard.writeText("varun.kush3@gmail.com")
      setCliOutput({
        command: "varun --contact",
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ varun --contact // REACH OUT DIRECTLY</div>
            <div className="space-y-1.5 pl-2 border-l border-emerald-500/30 text-body-strong">
              <div className="flex items-center gap-2">
                <span className="text-muted">Email:</span>
                <span className="text-ink font-bold">varun.kush3@gmail.com</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded">Copied to clipboard</span>
              </div>
              <div><span className="text-muted">LinkedIn:</span> <a href="https://www.linkedin.com/in/varun-kushwah/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">linkedin.com/in/varun-kushwah</a></div>
              <div><span className="text-muted">GitHub:</span> <a href="https://github.com/varunkushwah31" target="_blank" rel="noreferrer" className="text-emerald-400 underline">github.com/varunkushwah31</a></div>
            </div>
          </div>
        ),
      })
      sound.success()
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
      return
    }

    if (cleanCmd.includes("project")) {
      setCliOutput({
        command: "varun --projects",
        content: (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-500 font-bold">$ varun --projects // FEATURED PRODUCTION SYSTEMS</div>
            <div className="space-y-1.5 pl-2 border-l border-emerald-500/30 text-body-strong">
              <div>1. <strong className="text-ink">MentorSync:</strong> LeetCode/Codeforces LMS with Redis distributed cache warming &amp; WebSockets.</div>
              <div>2. <strong className="text-ink">W2W Share:</strong> Peer-to-peer browser file distribution via WebRTC DataChannels &amp; AES-256-GCM.</div>
              <div>3. <strong className="text-ink">System Health:</strong> OS daemon for live hardware metrics streaming.</div>
            </div>
          </div>
        ),
      })
      sound.success()
      return
    }

    // Default help output
    setCliOutput({
      command: cmd,
      content: (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-emerald-500 font-bold">$ varun --help // AVAILABLE RECRUITER CLI FLAGS</div>
          <div className="space-y-1 pl-2 border-l border-emerald-500/30 text-body-strong">
            <div><span className="text-emerald-400">varun --skills</span> : Inspect backend, systems, and frontend capabilities</div>
            <div><span className="text-emerald-400">varun --contact</span> : Instant email copy &amp; social profiles</div>
            <div><span className="text-emerald-400">varun --download-resume</span> : Directly download verified PDF resume</div>
            <div><span className="text-emerald-400">varun --projects</span> : List production distributed architectures</div>
            <div><span className="text-emerald-400">varun --clear</span> : Reset terminal output window</div>
          </div>
        </div>
      ),
    })
    sound.switchTab()
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
        navigate(`/project/${p.slug}`)
      },
    })),

    // Actions
    {
      id: "action-recruiter-pitch",
      title: "Recruiter TL;DR (30-Second Pitch)",
      subtitle: "Executive candidate summary & role sought",
      category: "Actions",
      icon: <LightningIcon size={16} className="text-emerald-500" />,
      action: () => {
        handleClose()
        window.dispatchEvent(new CustomEvent("open-recruiter-pitch"))
      },
    },
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
      id: "action-email",
      title: "Copy Email",
      subtitle: "varun.kush3@gmail.com",
      category: "Actions",
      icon: <EnvelopeSimpleIcon size={16} />,
      action: () => {
        navigator.clipboard.writeText("varun.kush3@gmail.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },

    // CLI Commands
    {
      id: "cli-cmd-pitch",
      title: "varun --pitch",
      subtitle: "30-second executive summary for recruiters & tech leads",
      category: "CLI Commands",
      icon: <TerminalWindowIcon size={16} className="text-emerald-500" />,
      action: () => executeCli("varun --pitch"),
    },
    {
      id: "cli-cmd-skills",
      title: "varun --skills",
      subtitle: "Backend, systems, and frontend capability tree",
      category: "CLI Commands",
      icon: <TerminalWindowIcon size={16} className="text-emerald-500" />,
      action: () => executeCli("varun --skills"),
    },
    {
      id: "cli-cmd-contact",
      title: "varun --contact",
      subtitle: "Direct email copy & social links",
      category: "CLI Commands",
      icon: <TerminalWindowIcon size={16} className="text-emerald-500" />,
      action: () => executeCli("varun --contact"),
    },
    {
      id: "cli-cmd-resume",
      title: "varun --download-resume",
      subtitle: "Official PDF resume download",
      category: "CLI Commands",
      icon: <TerminalWindowIcon size={16} className="text-emerald-500" />,
      action: () => executeCli("varun --download-resume"),
    },
    {
      id: "cli-cmd-projects",
      title: "varun --projects",
      subtitle: "List distributed production architectures",
      category: "CLI Commands",
      icon: <TerminalWindowIcon size={16} className="text-indigo-400" />,
      action: () => executeCli("varun --projects"),
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
      if (trimmed.startsWith("varun") || trimmed.startsWith("--") || trimmed === "help") {
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
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-24"
          onClick={handleClose}
        >
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xs" />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl border border-hairline bg-surface-card shadow-2xl overflow-hidden z-10 flex flex-col"
            style={{ maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3.5 px-4.5 py-4 border-b border-hairline bg-surface-card">
              <TerminalWindowIcon size={20} className="text-emerald-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or run CLI (e.g. varun --skills)..."
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
                    TERMINAL OUTPUT // {cliOutput.command}
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
            {copied && (
              <div className="px-4.5 py-2 bg-surface-soft border-b border-hairline text-emerald-500 text-xs flex items-center gap-2">
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
