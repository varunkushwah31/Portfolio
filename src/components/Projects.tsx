import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import projects from "@/data/projects"

const projectCategories = ["ALL", "FULL-STACK", "REAL-TIME", "SYSTEMS", "MACHINE LEARNING", "MOBILE"]

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL")

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "ALL") return true
    return project.category.toUpperCase() === selectedCategory
  })

  return (
    <section
      id="projects"
      className="w-full bg-canvas relative"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-uppercase text-muted mb-4"
        >
          WORK
        </motion.div>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-12"
        >
          FEATURED PROJECTS
        </motion.h2>

        {/* Filter Tabs per DESIGN.md */}
        <div className="flex flex-wrap gap-6 border-b border-hairline mb-12">
          {projectCategories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative pb-3 label-uppercase transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-ink font-bold" : "text-body hover:text-ink"
                }`}
                style={{ fontSize: "13px", letterSpacing: "1.5px" }}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="activeProjectCategoryLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Project cards — 3-up grid with layout transition */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="bg-surface-card flex flex-col border border-hairline-strong hover:border-hairline transition-all duration-300 group overflow-hidden h-full"
                  style={{ borderRadius: "0px" }}
                >
                  {/* Image Container — 16:9 ratio, full-bleed */}
                  <div className="relative w-full aspect-video overflow-hidden bg-surface-elevated">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Status pill tag overlay */}
                    <div className="absolute top-3 right-3 bg-canvas/80 backdrop-blur-sm border border-hairline px-2.5 py-1 text-[10px] font-bold label-uppercase text-body-strong">
                      {project.status}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category tag */}
                    <div className="label-uppercase text-m-blue-dark mb-4">
                      {project.category}
                    </div>

                    {/* Title — title-lg */}
                    <h4
                      className="text-ink mb-4 group-hover:text-m-blue-light transition-colors duration-200"
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
                      className="body-light mb-6 flex-1 text-sm text-body"
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
                          className="text-muted bg-surface-elevated px-3 py-1 border border-hairline-strong"
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
                    <div className="mt-auto pt-2">
                      <span className="label-uppercase text-ink inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                        VIEW SPEC & DETAILS
                        <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

