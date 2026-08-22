import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import projects from "@/data/projects"
import MStripe from "@/components/MStripe"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProjectVisual from "@/components/ProjectVisual"
import CommandPalette from "@/components/CommandPalette"
import ResumeModal from "@/components/ResumeModal"
import { sound } from "@/lib/sound"

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [resumeModalOpen, setResumeModalOpen] = useState(false)
  const project = projects.find((p) => p.slug === slug)
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true)
    window.addEventListener("open-command-palette", handleOpenPalette)
    return () => window.removeEventListener("open-command-palette", handleOpenPalette)
  }, [])

  if (!project) {
    return (
      <>
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
        />
        <main
          className="w-full bg-canvas flex items-center justify-center"
          style={{ minHeight: "60vh", paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6 text-center">
            <h1 className="text-ink mb-6 text-4xl font-bold uppercase">PROJECT NOT FOUND</h1>
            <p className="body-light mb-12 text-muted">
              The project specification you are looking for does not exist or has been relocated.
            </p>
            <Link
              to="/"
              onClick={() => sound.click()}
              className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-ink px-8 hover:bg-ink hover:text-canvas transition-colors duration-200"
              style={{ height: "48px", borderRadius: "0px" }}
            >
              <ArrowLeftIcon size={16} strokeWidth={2} />
              BACK TO HOME
            </Link>
          </div>
        </main>
        <Footer />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenResume={() => setResumeModalOpen(true)}
        />
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      </>
    )
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <>
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
      <main className="bg-canvas text-ink overflow-hidden">
        {/* Hero band */}
        <section
          className="w-full bg-canvas flex items-center relative overflow-hidden"
          style={{
            paddingTop: "64px",
            paddingBottom: "64px",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10">
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/#projects"
                onClick={() => sound.click()}
                className="label-uppercase text-muted inline-flex items-center gap-2 mb-8 hover:text-ink transition-colors duration-200"
              >
                <ArrowLeftIcon size={14} strokeWidth={2} />
                ALL REPOSITORIES & PROJECTS
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Asymmetric section index marker */}
              <div className="hidden lg:block lg:col-span-2 pt-2">
                <div className="label-uppercase text-muted tracking-[3px] text-xs font-mono">
                  [ SPEC // {String(projectIndex + 1).padStart(2, "0")} ]
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
                  <span className="label-uppercase text-m-blue-light tracking-[1.5px] font-bold">
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
                <h1 className="text-ink mb-4 max-w-[900px] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.96]">
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
                      <p className="text-ink font-sans font-bold uppercase text-base">
                        {project.role}
                      </p>
                    </div>
                    <div>
                      <div className="label-uppercase text-muted mb-2 text-xs">STATUS</div>
                      <p className="text-ink font-mono text-base flex items-center gap-2">
                        <span className="w-2 h-2 bg-success rounded-full" />
                        {project.status}
                      </p>
                    </div>
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.click()}
                      className="btn-text inline-flex items-center gap-2 text-xs bg-surface-card hover:bg-surface-elevated text-ink border border-hairline px-5 py-3 transition-colors duration-200"
                      style={{ borderRadius: "0px" }}
                    >
                      <ArrowSquareOutIcon size={14} />
                      VIEW SOURCE ON GITHUB
                      <ArrowRightIcon size={14} />
                    </a>
                  )}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-muted bg-surface-elevated px-3 py-1.5 border border-hairline-strong font-mono text-xs"
                      style={{ borderRadius: "0px" }}
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
                  <div className="text-ink font-bold font-mono text-base md:text-xl text-m-blue-light tracking-tight">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MStripe />

        {/* Project Visual Showcase */}
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
                <div className="label-uppercase text-muted mb-4 text-xs tracking-[2px]">
                  OVERVIEW
                </div>
                <h2 className="text-ink text-2xl md:text-3xl font-bold uppercase">
                  ABOUT THIS ARCHITECTURE
                </h2>
              </div>

              {/* Right — description paragraphs */}
              <div className="lg:col-span-8 space-y-6">
                {project.longDescription.map((paragraph, i) => (
                  <p
                    key={i}
                    className="body-light text-base md:text-lg leading-relaxed text-body"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MStripe />

        {/* Architecture Data-Flow Pipeline Section */}
        {project.architectureFlow && project.architectureFlow.length > 0 && (
          <>
            <section
              className="w-full bg-canvas"
              style={{ paddingTop: "96px", paddingBottom: "96px" }}
            >
              <div className="max-w-[1440px] mx-auto px-6">
                <div className="label-uppercase text-muted mb-4 text-xs tracking-[2px]">
                  SYSTEM ARCHITECTURE
                </div>
                <h2 className="text-ink mb-12 text-2xl md:text-3xl font-bold uppercase">
                  DATA FLOW & PIPELINE LIFECYCLE
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.architectureFlow.map((node, i) => (
                    <motion.div
                      key={node.step}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-surface-card p-6 border border-hairline-strong relative flex flex-col justify-between"
                      style={{ borderRadius: "0px" }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-m-blue-light font-bold text-xs">
                            PHASE // {node.step}
                          </span>
                          <span className="w-2 h-2 bg-m-blue-dark rounded-full" />
                        </div>
                        <h4 className="text-ink font-bold uppercase text-sm mb-3">
                          {node.title}
                        </h4>
                        <p className="body-light text-body text-xs leading-relaxed">
                          {node.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            <MStripe />
          </>
        )}

        {/* Highlights band */}
        <section
          className="w-full bg-surface-soft"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="label-uppercase text-muted mb-4 text-xs tracking-[2px]">
              KEY HIGHLIGHTS
            </div>
            <h2 className="text-ink mb-12 text-2xl md:text-3xl font-bold uppercase">
              WHAT WAS BUILT & VALIDATED
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-canvas p-6 border border-hairline-strong hover:border-hairline transition-colors duration-200"
                  style={{ borderRadius: "0px" }}
                >
                  <div className="text-m-blue-dark mb-3 font-mono text-2xl font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="body-light text-body text-base leading-relaxed">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <MStripe />

        {/* Engineering Decisions & Trade-Offs Section */}
        {project.tradeoffs && project.tradeoffs.length > 0 && (
          <>
            <section
              className="w-full bg-canvas"
              style={{ paddingTop: "96px", paddingBottom: "96px" }}
            >
              <div className="max-w-[1440px] mx-auto px-6">
                <div className="label-uppercase text-muted mb-4 text-xs tracking-[2px]">
                  DECISION LOG
                </div>
                <h2 className="text-ink mb-12 text-2xl md:text-3xl font-bold uppercase">
                  ENGINEERING DECISIONS & TRADE-OFFS
                </h2>

                <div className="space-y-6">
                  {project.tradeoffs.map((t, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-surface-card border border-hairline p-6 md:p-8"
                      style={{ borderRadius: "0px" }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-3 h-3 bg-m-blue-light" style={{ borderRadius: "0px" }} />
                        <h4 className="text-ink font-bold text-base md:text-lg uppercase">
                          {t.decision}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-hairline-strong text-xs leading-relaxed">
                        <div>
                          <div className="label-uppercase text-muted text-[10px] mb-2 tracking-[1px]">
                            WHY CHOSEN / RATIONALE
                          </div>
                          <p className="body-light text-body-strong">
                            {t.rationale}
                          </p>
                        </div>
                        <div>
                          <div className="label-uppercase text-muted text-[10px] mb-2 tracking-[1px]">
                            ALTERNATIVE CONSIDERED
                          </div>
                          <p className="body-light text-body">
                            {t.alternative}
                          </p>
                        </div>
                        <div>
                          <div className="label-uppercase text-muted text-[10px] mb-2 tracking-[1px]">
                            ENGINEERING TRADE-OFF
                          </div>
                          <p className="body-light text-m-blue-light font-mono">
                            {t.tradeoff}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            <MStripe />
          </>
        )}

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
                    onClick={() => sound.click()}
                    className="group block p-4 bg-canvas border border-hairline-strong hover:border-hairline transition-colors"
                  >
                    <div className="label-uppercase text-muted mb-2 flex items-center gap-2 text-xs">
                      <ArrowLeftIcon size={12} strokeWidth={2} />
                      PREVIOUS SPECIFICATION
                    </div>
                    <div className="text-ink group-hover:text-m-blue-light transition-colors duration-200 font-bold uppercase text-lg">
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
                    onClick={() => sound.click()}
                    className="group block p-4 bg-canvas border border-hairline-strong hover:border-hairline transition-colors"
                  >
                    <div className="label-uppercase text-muted mb-2 flex items-center justify-end gap-2 text-xs">
                      NEXT SPECIFICATION
                      <ArrowRightIcon size={12} strokeWidth={2} />
                    </div>
                    <div className="text-ink group-hover:text-m-blue-light transition-colors duration-200 font-bold uppercase text-lg">
                      {nextProject.title}
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/"
                    onClick={() => sound.click()}
                    className="group block p-4 bg-canvas border border-hairline-strong hover:border-hairline transition-colors"
                  >
                    <div className="label-uppercase text-muted mb-2 flex items-center justify-end gap-2 text-xs">
                      RETURN TO
                      <ArrowRightIcon size={12} strokeWidth={2} />
                    </div>
                    <div className="text-ink group-hover:text-m-blue-light transition-colors duration-200 font-bold uppercase text-lg">
                      HOME / REPOSITORIES
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Global Engineering Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  )
}

export default ProjectDetail
