import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import projects from "@/data/projects"

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full bg-canvas"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <div className="label-uppercase text-muted mb-4">
          WORK
        </div>

        {/* Section heading */}
        <h2 className="text-ink mb-16">
          PROJECTS
        </h2>

        {/* Project cards — 3-up grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="bg-surface-card flex flex-col border border-hairline-strong hover:border-hairline transition-colors duration-200 group"
              style={{ borderRadius: "0px" }}
            >
              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category tag */}
                <div className="label-uppercase text-m-blue-dark mb-4">
                  {project.category}
                </div>

                {/* Title — title-lg */}
                <h4
                  className="text-ink mb-4"
                  style={{
                    fontSize: "var(--font-size-title-lg)",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    textTransform: "uppercase" as const,
                    letterSpacing: 0,
                  }}
                >
                  {project.title}
                </h4>

                {/* Description — body-md / 300 */}
                <p
                  className="body-light mb-6 flex-1"
                  style={{
                    fontSize: "var(--font-size-body-md)",
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-muted bg-surface-elevated px-3 py-1"
                      style={{
                        fontSize: "var(--font-size-caption)",
                        fontWeight: 400,
                        letterSpacing: "0.5px",
                        borderRadius: "0px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Text link — VIEW PROJECT → */}
                <div className="mt-auto">
                  <span className="label-uppercase text-ink inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                    VIEW PROJECT
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
