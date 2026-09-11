import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  MagnifyingGlassIcon,
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
} from "@phosphor-icons/react"
import projects from "@/data/projects"
import { useTheme } from "@/context/ThemeContext"

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

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
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
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    setQuery("")
    onClose()
  }

  const goTo = (path: string) => {
    handleClose()
    navigate(path)
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
      if (flatList[selectedIndex]) {
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
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
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
              <MagnifyingGlassIcon size={20} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or type a command..."
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
              <div className="flex items-center gap-3.5">
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
