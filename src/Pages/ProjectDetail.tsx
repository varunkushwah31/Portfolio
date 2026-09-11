import { useParams, Link } from "react-router-dom"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  SparkleIcon,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import projects from "@/data/projects"
import ProjectVisual from "@/components/ProjectVisual"
import { usePageTitle } from "@/hooks/usePageTitle"
import { sound } from "@/lib/sound"

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()

  const projectIndex = projects.findIndex(
    (p) =>
      p.slug === slug ||
      (p.slug === "w2wshare" && (slug === "w2w-share" || slug === "mangoshare-clone"))
  )
  const project = projectIndex !== -1 ? projects[projectIndex] : undefined

  usePageTitle(project ? project.title : "Project Not Found")

  if (!project) {
    return (
      <div className="min-h-[72vh] flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-md w-full text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-surface-card text-xs text-muted font-mono mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>404 · Not Found</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Project not found
          </h1>
          <p className="text-sm sm:text-base text-muted font-normal leading-relaxed mb-8">
            The project specification you are looking for does not exist or has been relocated.
          </p>

          <Link
            to="/projects"
            onClick={() => sound.click()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas hover:opacity-90 text-sm font-medium transition-all shadow-xs"
          >
            <ArrowLeftIcon size={16} weight="bold" />
            <span>Return to Projects</span>
          </Link>
        </motion.div>
      </div>
    )
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <div className="min-h-screen bg-transparent">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-6 pt-12 sm:pt-16 pb-24 space-y-12 sm:space-y-16">
        {/* ============================================================
            HERO / HEADER SECTION
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/projects"
              onClick={() => sound.click()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted hover:text-ink transition-colors group"
            >
              <ArrowLeftIcon size={14} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Badges row: Category, Version, Year */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
              <SparkleIcon size={12} weight="fill" />
              <span>{project.category}</span>
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-surface-card border border-hairline text-xs font-mono text-body-strong shadow-xs">
              {project.version}
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-surface-card border border-hairline text-xs font-mono text-muted shadow-xs">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight mb-4">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-body font-normal leading-relaxed mb-6 max-w-2xl">
            {project.tagline}
          </p>

          {/* Metadata & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-hairline">
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-muted block text-[11px] uppercase font-mono mb-0.5">Role</span>
                <span className="font-semibold text-ink">{project.role}</span>
              </div>

              <div>
                <span className="text-muted block text-[11px] uppercase font-mono mb-0.5">Status</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{project.status}</span>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-xs sm:text-sm font-medium transition-all shadow-xs"
                >
                  <ArrowSquareOutIcon size={15} />
                  <span>Source Code</span>
                </motion.a>
              )}

              {project.liveUrl && (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ink text-canvas hover:opacity-90 text-xs sm:text-sm font-medium transition-all shadow-xs"
                >
                  <span>Live Preview</span>
                  <ArrowRightIcon size={14} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium bg-surface-card border border-hairline text-body-strong shadow-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ============================================================
            TELEMETRY SPECIFICATION MATRIX
            ============================================================ */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Specifications
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                Architecture &amp; Key Metrics
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {project.metrics.map((m, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-hairline bg-surface-card p-4 sm:p-5 shadow-xs flex flex-col justify-between"
                >
                  <span className="text-xs text-muted font-medium mb-2">{m.label}</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-emerald-500 dark:text-emerald-400 tracking-tight">
                    {m.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ============================================================
            INTERACTIVE SYSTEM VISUAL SHOWCASE
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Live Preview &amp; Pipeline
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              System Visual Showcase
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <ProjectVisual slug={project.slug} title={project.title} />
          </div>
        </motion.section>

        {/* ============================================================
            OVERVIEW & LONG DESCRIPTION
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
            About the Architecture
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-body leading-relaxed font-normal">
            {project.longDescription.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.section>

        {/* ============================================================
            ARCHITECTURE DATA-FLOW PIPELINE
            ============================================================ */}
        {project.architectureFlow && project.architectureFlow.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Data Flow
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                Pipeline Lifecycle
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.architectureFlow.map((node, i) => (
                <motion.div
                  key={node.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-hairline bg-surface-card p-5 shadow-xs flex flex-col justify-between group hover:border-muted transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-emerald-400 font-bold text-xs">
                        PHASE {node.step}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    </div>
                    <h3 className="text-ink font-semibold text-sm sm:text-base mb-2 group-hover:text-accent transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-body leading-relaxed font-normal">
                      {node.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ============================================================
            KEY HIGHLIGHTS
            ============================================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Deliverables
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              What Was Built &amp; Validated
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-hairline bg-surface-card p-5 sm:p-6 shadow-xs flex items-start gap-4"
              >
                <span className="text-emerald-400 font-mono font-bold text-lg shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm sm:text-base text-body leading-relaxed font-normal">
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================
            ENGINEERING DECISIONS & TRADE-OFFS
            ============================================================ */}
        {project.tradeoffs && project.tradeoffs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                System Design
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                Engineering Decisions &amp; Trade-offs
              </h2>
            </div>

            <div className="space-y-4">
              {project.tradeoffs.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-hairline bg-surface-card p-5 sm:p-7 shadow-xs space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <h3 className="text-ink font-semibold text-base sm:text-lg">
                      {t.decision}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-hairline text-xs sm:text-sm">
                    <div className="bg-surface-soft p-4 rounded-xl border border-hairline">
                      <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-1.5 font-semibold">
                        Why Chosen / Rationale
                      </div>
                      <p className="text-body-strong leading-relaxed font-normal">
                        {t.rationale}
                      </p>
                    </div>

                    <div className="bg-surface-soft p-4 rounded-xl border border-hairline">
                      <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-1.5 font-semibold">
                        Alternative Considered
                      </div>
                      <p className="text-body leading-relaxed font-normal">
                        {t.alternative}
                      </p>
                    </div>

                    <div className="bg-surface-soft p-4 rounded-xl border border-hairline">
                      <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5 font-semibold">
                        Engineering Trade-off
                      </div>
                      <p className="text-body leading-relaxed font-normal">
                        {t.tradeoff}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ============================================================
            PREVIOUS / NEXT PROJECT NAVIGATION
            ============================================================ */}
        <div className="pt-8 border-t border-hairline">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous */}
            <div>
              {prevProject ? (
                <Link
                  to={`/project/${prevProject.slug}`}
                  onClick={() => sound.click()}
                  className="group block p-5 rounded-2xl border border-hairline bg-surface-card hover:bg-surface-elevated hover:border-muted transition-all duration-200 shadow-xs h-full"
                >
                  <div className="text-xs text-muted mb-1 flex items-center gap-1.5 font-medium group-hover:text-ink transition-colors">
                    <ArrowLeftIcon size={13} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
                    <span>Previous Project</span>
                  </div>
                  <div className="text-ink group-hover:text-accent transition-colors font-bold text-base sm:text-lg">
                    {prevProject.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div className="text-right">
              {nextProject ? (
                <Link
                  to={`/project/${nextProject.slug}`}
                  onClick={() => sound.click()}
                  className="group block p-5 rounded-2xl border border-hairline bg-surface-card hover:bg-surface-elevated hover:border-muted transition-all duration-200 shadow-xs h-full"
                >
                  <div className="text-xs text-muted mb-1 flex items-center justify-end gap-1.5 font-medium group-hover:text-ink transition-colors">
                    <span>Next Project</span>
                    <ArrowRightIcon size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-ink group-hover:text-accent transition-colors font-bold text-base sm:text-lg">
                    {nextProject.title}
                  </div>
                </Link>
              ) : (
                <Link
                  to="/projects"
                  onClick={() => sound.click()}
                  className="group block p-5 rounded-2xl border border-hairline bg-surface-card hover:bg-surface-elevated hover:border-muted transition-all duration-200 shadow-xs h-full"
                >
                  <div className="text-xs text-muted mb-1 flex items-center justify-end gap-1.5 font-medium group-hover:text-ink transition-colors">
                    <span>Explore All</span>
                    <ArrowRightIcon size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-ink group-hover:text-accent transition-colors font-bold text-base sm:text-lg">
                    Browse All Projects
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
