import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ArrowSquareOut, Check, Copy } from "@phosphor-icons/react"
import type { Project } from "@/data/projects"
import ProjectVisual from "./ProjectVisual"
import { sound } from "@/lib/sound"

interface ProjectQuickSpecModalProps {
  project: Project | null
  onClose: () => void
}

const ProjectQuickSpecModal = ({ project, onClose }: ProjectQuickSpecModalProps) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (project) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [project, onClose])

  const handleCopyLink = () => {
    if (!project) return
    sound.click()
    const url = `${window.location.origin}/project/${project.slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            className="relative w-full max-w-4xl bg-surface-card border border-hairline my-8 z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            style={{ borderRadius: "0px" }}
          >
            {/* Top M-Stripe Divider */}
            <div className="m-stripe shrink-0" />

            {/* Modal Header */}
            <div className="p-5 md:px-8 bg-surface-soft border-b border-hairline flex items-center justify-between gap-4 shrink-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="label-uppercase text-m-blue-light text-xs tracking-[2px] font-bold">
                  {project.category}
                </span>
                <span className="text-hairline">|</span>
                <span className="label-uppercase text-muted text-xs tracking-[1.5px]">
                  SPECIFICATION HUD
                </span>
                <span className="text-hairline">|</span>
                <span className="text-body-strong font-mono text-xs bg-surface-elevated px-2 py-0.5 border border-hairline-strong">
                  {project.version}
                </span>
                <span className="text-body-strong font-mono text-xs bg-surface-elevated px-2 py-0.5 border border-hairline-strong">
                  {project.year}
                </span>
              </div>

              {/* Close Button — 48x48 circular button per DESIGN.md */}
              <button
                onClick={() => {
                  sound.click()
                  onClose()
                }}
                className="w-10 h-10 md:w-12 md:h-12 bg-surface-card hover:bg-surface-elevated text-ink rounded-full flex items-center justify-center border border-hairline transition-colors duration-200 cursor-pointer shrink-0"
                aria-label="Close Specification Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Title & Tagline */}
              <div>
                <h3
                  className="text-ink text-2xl md:text-4xl font-bold uppercase tracking-tight mb-2"
                  style={{ lineHeight: 1.1 }}
                >
                  {project.title}
                </h3>
                <p className="label-uppercase text-m-blue-dark text-xs md:text-sm tracking-[1.5px]">
                  {project.tagline}
                </p>
              </div>

              {/* Visual Architecture Banner */}
              <div className="relative w-full overflow-hidden bg-surface-elevated border border-hairline-strong">
                <ProjectVisual slug={project.slug} title={project.title} />
                <div className="absolute top-3 right-3 bg-canvas/90 backdrop-blur-sm border border-hairline px-3 py-1 text-[11px] font-bold label-uppercase text-ink z-10">
                  STATUS: {project.status}
                </div>
                <div className="absolute bottom-3 left-3 bg-canvas/90 backdrop-blur-sm border border-hairline px-3 py-1 text-[11px] font-mono text-muted z-10">
                  ROLE: {project.role.toUpperCase()}
                </div>
              </div>

              {/* Technical Spec Matrix */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-3 tracking-[1.5px]">
                  TELEMETRY SPECIFICATION MATRIX
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-soft p-4 border border-hairline-strong flex flex-col justify-between"
                      style={{ borderRadius: "0px" }}
                    >
                      <div className="label-uppercase text-muted text-[11px] mb-2 tracking-[1px]">
                        {m.label}
                      </div>
                      <div className="text-ink font-bold text-sm md:text-base font-mono tracking-tight text-m-blue-light">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Overview */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-3 tracking-[1.5px]">
                  SYSTEM ARCHITECTURE OVERVIEW
                </div>
                <p className="body-light text-body text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Highlights Manifest */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-3 tracking-[1.5px]">
                  ENGINEERING HIGHLIGHTS
                </div>
                <div className="space-y-3">
                  {project.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-soft p-4 border border-hairline-strong flex items-start gap-4"
                      style={{ borderRadius: "0px" }}
                    >
                      <span className="text-m-blue-light font-mono font-bold text-sm shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="body-light text-body-strong text-sm leading-relaxed">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsystems & Tech Stack */}
              <div>
                <div className="label-uppercase text-muted text-xs mb-3 tracking-[1.5px]">
                  DEPLOYED SUBSYSTEMS & TECHNOLOGIES
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-body-strong bg-surface-elevated px-3 py-1.5 border border-hairline text-xs font-mono"
                      style={{ borderRadius: "0px" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 md:px-8 bg-surface-soft border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopyLink}
                  className="btn-text w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs bg-surface-card hover:bg-surface-elevated text-ink border border-hairline px-4 py-3 transition-colors duration-200 cursor-pointer"
                  style={{ borderRadius: "0px" }}
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-success" /> LINK COPIED
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> SHARE SPEC
                    </>
                  )}
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="btn-text w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs bg-surface-card hover:bg-surface-elevated text-ink border border-hairline px-4 py-3 transition-colors duration-200"
                    style={{ borderRadius: "0px" }}
                  >
                    <ArrowSquareOut size={14} /> GITHUB
                  </a>
                )}
              </div>

              <Link
                to={`/project/${project.slug}`}
                onClick={() => {
                  sound.click()
                  onClose()
                }}
                className="btn-text w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs bg-ink text-canvas hover:bg-body-strong px-6 py-3 transition-colors duration-200 group"
                style={{ borderRadius: "0px" }}
              >
                OPEN FULL SPECIFICATION
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectQuickSpecModal
