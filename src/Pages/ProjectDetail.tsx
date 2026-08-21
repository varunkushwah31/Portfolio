import { useParams, Link } from "react-router-dom"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import projects from "@/data/projects"
import ProjectVisual from "@/components/ProjectVisual"
import ScrollProgress from "@/components/ScrollProgress"

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="w-full bg-canvas flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink mb-4">Project not found</h1>
          <p className="text-body mb-8">
            The project you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-hairline text-body-strong text-sm hover:border-accent/60 hover:text-ink transition-all duration-200"
          >
            <ArrowLeftIcon size={14} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <div className="bg-transparent text-ink">
      <ScrollProgress />

      {/* Hero band */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{ backgroundColor: project.accentColor, minHeight: "280px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-canvas/80" />
        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeftIcon size={14} />
              All projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                {project.category}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm font-mono">
                {project.version}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                {project.year}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Meta & Actions */}
      <div className="max-w-5xl mx-auto px-6 py-8 border-b border-hairline">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-xs text-muted mb-1 font-medium uppercase tracking-wider">Role</div>
              <div className="text-ink font-semibold">{project.role}</div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1 font-medium uppercase tracking-wider">Status</div>
              <div className="flex items-center gap-2 text-ink font-semibold">
                <span className="w-2 h-2 bg-success rounded-full" />
                {project.status}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline text-body-strong text-sm hover:border-accent/60 hover:text-ink transition-all duration-200"
              >
                <GithubLogoIcon size={15} />
                View on GitHub
                <ArrowSquareOutIcon size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full border border-hairline text-muted bg-surface-card hover:border-accent/40 hover:text-body-strong transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12 border-b border-hairline">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-xl border border-hairline bg-surface-card"
            >
              <div className="text-xs text-muted mb-2 font-medium uppercase tracking-wider">
                {m.label}
              </div>
              <div className="text-accent-light font-bold text-base md:text-lg leading-tight">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Visual */}
      <div className="max-w-5xl mx-auto px-6 py-12 border-b border-hairline">
        <div className="rounded-xl border border-hairline overflow-hidden bg-surface-card shadow-2xl">
          <ProjectVisual slug={project.slug} title={project.title} />
        </div>
      </div>

      {/* Overview / Description */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-sm text-emerald-400 font-semibold mb-2">Overview</p>
            <h2 className="text-2xl font-bold text-ink">About this project</h2>
          </div>
          <div className="lg:col-span-8 space-y-5">
            {project.longDescription.map((paragraph, i) => (
              <p key={`desc-${i}-${paragraph.slice(0, 20)}`} className="text-body leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Flow */}
      {project.architectureFlow && project.architectureFlow.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-16 border-b border-hairline">
          <p className="text-sm text-emerald-400 font-semibold mb-2">System Architecture</p>
          <h2 className="text-2xl font-bold text-ink mb-10">Data Flow & Pipeline</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.architectureFlow.map((node, i) => (
              <motion.div
                key={node.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-xl border border-hairline bg-surface-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-accent-light font-bold text-xs">
                    Phase {node.step}
                  </span>
                  <span className="w-2 h-2 bg-accent rounded-full" />
                </div>
                <h4 className="text-ink font-semibold text-sm mb-2">{node.title}</h4>
                <p className="text-body text-xs leading-relaxed">{node.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Key Highlights */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-hairline">
        <p className="text-sm text-emerald-400 font-semibold mb-2">Key highlights</p>
        <h2 className="text-2xl font-bold text-ink mb-10">What was built</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.highlights.map((highlight, i) => (
            <motion.div
              key={`highlight-${i}-${highlight.slice(0, 20)}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl border border-hairline bg-surface-card hover:border-zinc-500 transition-colors"
            >
              <div className="text-emerald-400 font-mono text-2xl font-bold mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-body text-sm leading-relaxed">{highlight}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engineering Trade-offs */}
      {project.tradeoffs && project.tradeoffs.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-16 border-b border-hairline">
          <p className="text-sm text-emerald-400 font-semibold mb-2">Decision log</p>
          <h2 className="text-2xl font-bold text-ink mb-10">Engineering decisions & trade-offs</h2>

          <div className="space-y-5">
            {project.tradeoffs.map((t) => (
              <motion.div
                key={t.decision}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-hairline bg-surface-card"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <h4 className="text-ink font-semibold">{t.decision}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-hairline text-sm leading-relaxed">
                  <div>
                    <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">
                      Why chosen
                    </div>
                    <p className="text-body-strong">{t.rationale}</p>
                  </div>
                  <div>
                    <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">
                      Alternative considered
                    </div>
                    <p className="text-body">{t.alternative}</p>
                  </div>
                  <div>
                    <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">
                      Trade-off
                    </div>
                    <p className="text-emerald-300">{t.tradeoff}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            {prevProject && (
              <Link
                to={`/project/${prevProject.slug}`}
                className="group block p-4 rounded-xl border border-hairline hover:border-zinc-500 transition-all bg-surface-card"
              >
                <div className="text-xs text-muted mb-2 flex items-center gap-1">
                  <ArrowLeftIcon size={12} />
                  Previous project
                </div>
                <div className="text-ink font-semibold group-hover:text-white transition-colors">
                  {prevProject.title}
                </div>
              </Link>
            )}
          </div>

          <div className="flex-1 text-right">
            {nextProject ? (
              <Link
                to={`/project/${nextProject.slug}`}
                className="group block p-4 rounded-xl border border-hairline hover:border-zinc-500 transition-all bg-surface-card"
              >
                <div className="text-xs text-muted mb-2 flex items-center justify-end gap-1">
                  Next project
                  <ArrowRightIcon size={12} />
                </div>
                <div className="text-ink font-semibold group-hover:text-white transition-colors">
                  {nextProject.title}
                </div>
              </Link>
            ) : (
              <Link
                to="/projects"
                className="group block p-4 rounded-xl border border-hairline hover:border-zinc-500 transition-all bg-surface-card"
              >
                <div className="text-xs text-muted mb-2 flex items-center justify-end gap-1">
                  Back to
                  <ArrowRightIcon size={12} />
                </div>
                <div className="text-ink font-semibold group-hover:text-white transition-colors">
                  All Projects
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
