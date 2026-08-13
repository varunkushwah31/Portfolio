import { useParams, Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import projects from "@/data/projects"
import MStripe from "@/components/MStripe"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProjectVisual from "@/components/ProjectVisual"

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Navbar />
        <main
          className="w-full bg-canvas flex items-center justify-center"
          style={{ minHeight: "60vh", paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6 text-center">
            <h1 className="text-ink mb-6">PROJECT NOT FOUND</h1>
            <p className="body-light mb-12">
              The project you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-ink px-8 hover:bg-ink hover:text-canvas transition-colors duration-200"
              style={{ height: "48px" }}
            >
              <ArrowLeft size={16} strokeWidth={2} />
              BACK TO HOME
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <>
      <Navbar />
      <main className="bg-canvas text-ink overflow-hidden">
        {/* Hero band */}
        <section
          className="w-full bg-canvas flex items-center relative overflow-hidden"
          style={{
            paddingTop: "96px",
            paddingBottom: "64px",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10">
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/#projects"
                className="label-uppercase text-muted inline-flex items-center gap-2 mb-12 hover:text-ink transition-colors duration-200"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                ALL PROJECTS
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Asymmetric section index marker */}
              <div className="hidden lg:block lg:col-span-2 pt-2">
                <div className="label-uppercase text-muted tracking-[3px] text-xs">
                  [ DETAIL ]
                </div>
              </div>

              {/* Title & Metadata */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-10 border-l border-hairline-strong pl-6 md:pl-12 py-2"
              >
                {/* Category badge & version */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="label-uppercase text-m-blue-light tracking-[1.5px]">
                    {project.category}
                  </span>
                  <span className="text-hairline">|</span>
                  <span className="text-body-strong font-mono text-xs bg-surface-elevated px-2.5 py-1 border border-hairline-strong">
                    {project.version}
                  </span>
                  <span className="text-body-strong font-mono text-xs bg-surface-elevated px-2.5 py-1 border border-hairline-strong">
                    {project.year}
                  </span>
                </div>

                {/* Project title — display-xl */}
                <h1 className="text-ink mb-4 max-w-[900px] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.95]">
                  {project.title}
                </h1>

                {/* Tagline */}
                <p className="label-uppercase text-muted text-xs md:text-sm tracking-[1.5px] mb-8 max-w-[800px]">
                  {project.tagline}
                </p>

                {/* Meta row & Action links */}
                <div className="flex flex-wrap items-end justify-between gap-6 mb-8 pb-8 border-b border-hairline-strong">
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <div className="label-uppercase text-muted mb-2 text-xs">ROLE</div>
                      <p
                        className="text-ink"
                        style={{
                          fontSize: "var(--font-size-title-sm)",
                          fontWeight: 400,
                          lineHeight: 1.4,
                        }}
                      >
                        {project.role}
                      </p>
                    </div>
                    <div>
                      <div className="label-uppercase text-muted mb-2 text-xs">STATUS</div>
                      <p
                        className="text-ink"
                        style={{
                          fontSize: "var(--font-size-title-sm)",
                          fontWeight: 400,
                          lineHeight: 1.4,
                        }}
                      >
                        {project.status}
                      </p>
                    </div>
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-text inline-flex items-center gap-2 text-xs bg-surface-card hover:bg-surface-elevated text-ink border border-hairline px-5 py-3 transition-colors duration-200"
                      style={{ borderRadius: "0px" }}
                    >
                      VIEW SOURCE ON GITHUB
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-muted bg-surface-elevated px-4 py-2 border border-hairline-strong font-mono text-xs"
                      style={{
                        borderRadius: "0px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <MStripe />

        {/* Telemetry Specification Matrix Section */}
        <section className="w-full bg-surface-soft py-12 border-b border-hairline-strong">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="label-uppercase text-muted text-xs mb-6 tracking-[2px]">
              [ TELEMETRY SPECIFICATION MATRIX ]
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-surface-card p-6 border border-hairline flex flex-col justify-between"
                  style={{ borderRadius: "0px" }}
                >
                  <div className="label-uppercase text-muted text-xs mb-3 tracking-[1.5px]">
                    {m.label}
                  </div>
                  <div className="text-ink font-bold font-mono text-lg md:text-xl text-m-blue-light tracking-tight">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MStripe />

        {/* Full-width project visual showcase */}
        <section className="w-full bg-canvas py-12 border-b border-hairline-strong">
          <div className="max-w-[1440px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-[1000px] mx-auto bg-surface-card border border-hairline overflow-hidden shadow-2xl"
              style={{ borderRadius: "0px" }}
            >
              <ProjectVisual slug={project.slug} title={project.title} />
            </motion.div>
          </div>
        </section>

        <MStripe />

        {/* Description band */}
        <section
          className="w-full bg-surface-soft"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left — section label */}
              <div className="lg:col-span-4">
                <div className="label-uppercase text-muted mb-4">
                  OVERVIEW
                </div>
                <h2 className="text-ink" style={{ fontSize: "var(--font-size-display-sm)", fontWeight: 700, lineHeight: 1.15, textTransform: "uppercase" }}>
                  ABOUT THIS PROJECT
                </h2>
              </div>

              {/* Right — description paragraphs */}
              <div className="lg:col-span-8">
                {project.longDescription.map((paragraph, i) => (
                  <p
                    key={i}
                    className="body-light mb-8 last:mb-0 text-base md:text-lg leading-relaxed text-body"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MStripe />

        {/* Highlights band */}
        <section
          className="w-full bg-canvas"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="label-uppercase text-muted mb-4">
              KEY HIGHLIGHTS
            </div>
            <h2
              className="text-ink mb-16"
              style={{
                fontSize: "var(--font-size-display-sm)",
                fontWeight: 700,
                lineHeight: 1.15,
                textTransform: "uppercase",
              }}
            >
              WHAT WAS BUILT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-surface-soft p-6 border border-hairline-strong hover:border-hairline transition-colors duration-200"
                  style={{ borderRadius: "0px" }}
                >
                  <div
                    className="text-m-blue-dark mb-3 font-mono"
                    style={{
                      fontSize: "var(--font-size-display-sm)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p
                    className="body-light text-body text-base"
                    style={{ lineHeight: 1.6 }}
                  >
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <MStripe />

        {/* Navigation band — prev/next project */}
        <section
          className="w-full bg-surface-soft"
          style={{ paddingTop: "64px", paddingBottom: "64px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              {/* Previous */}
              <div className="flex-1">
                {prevProject ? (
                  <Link
                    to={`/project/${prevProject.slug}`}
                    className="group block"
                  >
                    <div className="label-uppercase text-muted mb-3 flex items-center gap-2">
                      <ArrowLeft size={12} strokeWidth={2} />
                      PREVIOUS PROJECT
                    </div>
                    <div
                      className="text-ink group-hover:text-m-blue-light transition-colors duration-200 font-bold uppercase"
                      style={{ fontSize: "var(--font-size-title-lg)" }}
                    >
                      {prevProject.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Next */}
              <div className="flex-1 text-right">
                {nextProject ? (
                  <Link
                    to={`/project/${nextProject.slug}`}
                    className="group block"
                  >
                    <div className="label-uppercase text-muted mb-3 flex items-center justify-end gap-2">
                      NEXT PROJECT
                      <ArrowRight size={12} strokeWidth={2} />
                    </div>
                    <div
                      className="text-ink group-hover:text-m-blue-light transition-colors duration-200 font-bold uppercase"
                      style={{ fontSize: "var(--font-size-title-lg)" }}
                    >
                      {nextProject.title}
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="group block"
                  >
                    <div className="label-uppercase text-muted mb-3 flex items-center justify-end gap-2">
                      BACK TO
                      <ArrowRight size={12} strokeWidth={2} />
                    </div>
                    <div
                      className="text-ink group-hover:text-m-blue-light transition-colors duration-200 font-bold uppercase"
                      style={{ fontSize: "var(--font-size-title-lg)" }}
                    >
                      HOME
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProjectDetail

