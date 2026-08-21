import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  XIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  ArrowRightIcon,
  GitForkIcon,
  HouseIcon,
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  CpuIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react"
import projects from "@/data/projects"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume?: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: "Navigation" | "Projects" | "Actions"
  icon: React.ReactNode
  action: () => void
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleClose = () => {
    setQuery("")
    setSelectedIndex(0)
    setCopied(false)
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const goTo = (path: string) => {
    handleClose()
    navigate(path)
  }

  const allCommands: CommandItem[] = [
    {
      id: "nav-home",
      title: "Home",
      subtitle: "Go to the home page",
      category: "Navigation",
      icon: <HouseIcon size={16} className="text-violet-400" />,
      action: () => goTo("/"),
    },
    {
      id: "nav-about",
      title: "About",
      subtitle: "About Varun Kushwah & skills",
      category: "Navigation",
      icon: <UserIcon size={16} className="text-violet-400" />,
      action: () => goTo("/about"),
    },
    {
      id: "nav-tech-stack",
      title: "Tech Stack",
      subtitle: "Languages, frameworks & developer tools",
      category: "Navigation",
      icon: <CpuIcon size={16} className="text-violet-400" />,
      action: () => goTo("/tech-stack"),
    },
    {
      id: "nav-projects",
      title: "Projects",
      subtitle: "Browse all projects & repositories",
      category: "Navigation",
      icon: <GitForkIcon size={16} className="text-violet-400" />,
      action: () => goTo("/projects"),
    },
    {
      id: "nav-resume",
      title: "Resume",
      subtitle: "Education, experience & achievements",
      category: "Navigation",
      icon: <BriefcaseIcon size={16} className="text-violet-400" />,
      action: () => {
        if (onOpenResume) {
          handleClose()
          onOpenResume()
        } else {
          goTo("/resume")
        }
      },
    },

    // Actions
    {
      id: "action-devup",
      title: "devup Club Website",
      subtitle: "devup.co.in · Technical club & workshops",
      category: "Actions",
      icon: <ArrowSquareOutIcon size={16} className="text-violet-400" />,
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
      icon: <GithubLogoIcon size={16} className="text-zinc-300" />,
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
      icon: <LinkedinLogoIcon size={16} className="text-blue-400" />,
      action: () => {
        window.open("https://www.linkedin.com/in/varun-kushwah/", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-email",
      title: "Copy Email Address",
      subtitle: "varun.kush3@gmail.com",
      category: "Actions",
      icon: <EnvelopeSimpleIcon size={16} className="text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText("varun.kush3@gmail.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },

    // Projects
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      title: p.title,
      subtitle: `${p.category} · ${p.tagline}`,
      category: "Projects" as const,
      icon: <CodeIcon size={16} className="text-violet-400" />,
      action: () => {
        handleClose()
        navigate(`/project/${p.slug}`)
      },
    })),
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
  const categories: Array<"Navigation" | "Projects" | "Actions"> = ["Navigation", "Projects", "Actions"]
  const grouped = categories.reduce<Record<string, CommandItem[]>>((acc, cat) => {
    const items = filteredCommands.filter((c) => c.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  const flatList = filteredCommands

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (flatList.length > 0 ? (prev + 1) % flatList.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (flatList.length > 0 ? (prev - 1 + flatList.length) % flatList.length : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      flatList[selectedIndex]?.action()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleClose()
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto"
          style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative z-10 rounded-2xl border border-[#2e2e2e] bg-[#141414] shadow-2xl overflow-hidden flex flex-col w-full my-auto"
            style={{
              width: "100%",
              maxWidth: "580px",
              minWidth: "300px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#262626] bg-[#171717] w-full">
              <MagnifyingGlassIcon size={18} className="text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-0 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setSelectedIndex(0)
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors flex-shrink-0"
                  aria-label="Clear query"
                >
                  <XIcon size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex text-[10px] font-mono text-zinc-400 border border-zinc-700 px-1.5 py-0.5 rounded bg-zinc-800 flex-shrink-0">
                ESC
              </kbd>
            </div>

            {/* Copied Feedback Toast */}
            {copied && (
              <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2">
                <span>✓</span> Email copied to clipboard!
              </div>
            )}

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 w-full">
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category} className="mb-2 last:mb-0">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {category}
                  </div>
                  <div className="space-y-0.5">
                    {cmds.map((cmd) => {
                      const globalIdx = flatList.indexOf(cmd)
                      const isSelected = globalIdx === selectedIndex
                      return (
                        <button
                          type="button"
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-100 ${
                            isSelected
                              ? "bg-violet-600/20 text-white border border-violet-500/30"
                              : "text-zinc-300 hover:bg-[#1f1f1f] border border-transparent"
                          }`}
                        >
                          <span className="flex-shrink-0">{cmd.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{cmd.title}</div>
                            {cmd.subtitle && (
                              <div className="text-xs text-zinc-400 truncate">{cmd.subtitle}</div>
                            )}
                          </div>
                          {isSelected && (
                            <ArrowRightIcon size={13} className="text-violet-400 flex-shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {filteredCommands.length === 0 && (
                <div className="py-10 text-center text-zinc-500 text-sm">
                  No matching commands found for <span className="text-zinc-300">"{query}"</span>
                </div>
              )}
            </div>

            {/* Footer Telemetry */}
            <div className="px-4 py-2.5 border-t border-[#262626] bg-[#111111] flex items-center justify-between text-[11px] text-zinc-500 w-full">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="border border-zinc-700 px-1 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-zinc-400">↑</kbd>
                  <kbd className="border border-zinc-700 px-1 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-zinc-400">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border border-zinc-700 px-1 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-zinc-400">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="text-zinc-600">Quick Navigation</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default CommandPalette
