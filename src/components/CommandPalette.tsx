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
  CaretRightIcon,
  XIcon,
  CodeIcon,
  ArrowSquareOutIcon,
  DownloadSimpleIcon,
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

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setCopied(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
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
    {
      id: "nav-home",
      title: "Home",
      subtitle: "Go to the home page",
      category: "Navigation",
      icon: <HouseIcon size={18} className="text-zinc-300" />,
      action: () => goTo("/"),
    },
    {
      id: "nav-about",
      title: "About",
      subtitle: "About Varun Kushwah & skills",
      category: "Navigation",
      icon: <UserIcon size={18} className="text-zinc-300" />,
      action: () => goTo("/about"),
    },
    {
      id: "nav-tech-stack",
      title: "Tech Stack & Uses",
      subtitle: "Languages, frameworks, software & workstation tools",
      category: "Navigation",
      icon: <CpuIcon size={18} className="text-zinc-300" />,
      action: () => goTo("/tech-stack"),
    },
    {
      id: "nav-projects",
      title: "Projects",
      subtitle: "Browse all projects & repositories",
      category: "Navigation",
      icon: <GitForkIcon size={18} className="text-zinc-300" />,
      action: () => goTo("/projects"),
    },
    {
      id: "nav-resume",
      title: "Resume",
      subtitle: "Education, experience & achievements",
      category: "Navigation",
      icon: <BriefcaseIcon size={18} className="text-zinc-300" />,
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
      id: "action-resume-pdf",
      title: "Download Resume (PDF)",
      subtitle: "Varun_Kushwah_Resume.pdf · Direct PDF download",
      category: "Actions",
      icon: <DownloadSimpleIcon size={18} className="text-emerald-400" />,
      action: () => {
        window.open("/Varun_Kushwah_Resume.pdf", "_blank", "noopener,noreferrer")
        handleClose()
      },
    },
    {
      id: "action-devup",
      title: "devup Club Website",
      subtitle: "devup.co.in · Technical club & workshops",
      category: "Actions",
      icon: <ArrowSquareOutIcon size={18} className="text-emerald-400" />,
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
      icon: <GithubLogoIcon size={18} className="text-zinc-300" />,
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
      icon: <LinkedinLogoIcon size={18} className="text-blue-400" />,
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
      icon: <EnvelopeSimpleIcon size={18} className="text-emerald-400" />,
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
      icon: <CodeIcon size={18} className="text-zinc-300" />,
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
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
        >
          {/* Backdrop with dark blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl my-auto rounded-2xl border border-[#27272a] bg-[#0a0a0a] shadow-2xl overflow-hidden z-10 flex flex-col"
            style={{
              maxHeight: "88vh",
              boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3.5 px-5 py-4 border-b border-[#27272a] bg-[#0e0e10] w-full">
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
                className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-white placeholder:text-zinc-500 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setSelectedIndex(0)
                  }}
                  className="p-1 text-zinc-400 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Clear query"
                >
                  <XIcon size={15} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex text-[11px] font-mono text-zinc-400 border border-[#27272a] px-2 py-0.5 rounded-md bg-[#18181b] flex-shrink-0">
                ESC
              </kbd>
            </div>

            {/* Copied Feedback Toast */}
            {copied && (
              <div className="px-5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-2">
                <span>✓</span> Email copied to clipboard!
              </div>
            )}

            {/* Command List */}
            <div className="max-h-[420px] sm:max-h-[480px] overflow-y-auto p-3 sm:p-3.5 w-full space-y-3 bg-[#0a0a0a]">
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category} className="mb-2 last:mb-0">
                  <div className="px-3.5 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {category}
                  </div>
                  <div className="space-y-1 mt-1">
                    {cmds.map((cmd) => {
                      const globalIdx = flatList.indexOf(cmd)
                      const isSelected = globalIdx === selectedIndex
                      return (
                        <button
                          type="button"
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[#18181b] text-white border border-[#3f3f46]"
                              : "text-zinc-300 hover:bg-[#141414] hover:text-white border border-transparent"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? "bg-[#27272a] border border-[#3f3f46] text-white" : "bg-[#141414] border border-[#27272a] text-zinc-400"
                          }`}>
                            {cmd.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium tracking-tight truncate text-white">
                              {cmd.title}
                            </div>
                            {cmd.subtitle && (
                              <div className="text-xs text-zinc-400 truncate mt-0.5 font-normal">
                                {cmd.subtitle}
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <CaretRightIcon size={14} weight="bold" className="text-zinc-400 flex-shrink-0 ml-1" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {filteredCommands.length === 0 && (
                <div className="py-12 text-center text-zinc-500 text-sm">
                  No matching commands found for <span className="text-zinc-300 font-medium">"{query}"</span>
                </div>
              )}
            </div>

            {/* Footer Telemetry */}
            <div className="px-5 py-3 border-t border-[#27272a] bg-[#0a0a0a] flex items-center justify-between text-xs text-zinc-500 w-full">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="border border-[#27272a] px-1.5 py-0.5 rounded bg-[#18181b] font-mono text-[11px] text-zinc-400">↑</kbd>
                  <kbd className="border border-[#27272a] px-1.5 py-0.5 rounded bg-[#18181b] font-mono text-[11px] text-zinc-400">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="border border-[#27272a] px-1.5 py-0.5 rounded bg-[#18181b] font-mono text-[11px] text-zinc-400">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="text-zinc-500 font-medium">Quick Navigation</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default CommandPalette
