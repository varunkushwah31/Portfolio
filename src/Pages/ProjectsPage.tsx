import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, ArrowSquareOut, GithubLogo } from "@phosphor-icons/react"
import projects from "@/data/projects"

const categoryColors: Record<string, string> = {
  "Full-Stack": "#3b82f6",
  "Real-Time": "#22c55e",
  "Systems": "#f97316",
  "Machine Learning": "#a78bfa",
  "Mobile": "#06b6d4",
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-ink mb-3">Projects</h1>
          <p className="text-body text-lg">
            A collection of the finest projects that I have built. ❤️
          </p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <Link
                to={`/project/${project.slug}`}
                className="group block rounded-xl border border-hairline bg-surface-card hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                {/* Image / Color Banner */}
                <div
                  className="relative h-48 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: project.accentColor }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-36 max-w-[85%] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div
                    className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium text-white"
                    style={{
                      backgroundColor: (categoryColors[project.category] ?? "#7c3aed") + "99",
                      border: `1px solid ${categoryColors[project.category] ?? "#7c3aed"}66`,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {project.category}
                  </div>
                  {/* Overlay arrow */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-ink text-base group-hover:text-accent-light transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted flex-shrink-0 mt-0.5">{project.year}</span>
                  </div>
                  <p className="text-body text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.tagline}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded border border-hairline text-muted bg-surface-soft"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded border border-hairline text-muted bg-surface-soft">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Links row */}
                  <div className="flex items-center gap-3 pt-3 border-t border-hairline">
                    <span className="text-xs text-accent-light font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View details <ArrowRight size={12} />
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ml-auto text-muted hover:text-ink transition-colors"
                        title="GitHub"
                      >
                        <GithubLogo size={15} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted hover:text-ink transition-colors"
                        title="Live Demo"
                      >
                        <ArrowSquareOut size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
