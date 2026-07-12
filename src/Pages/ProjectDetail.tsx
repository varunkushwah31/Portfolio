import { useParams, Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import projects from "@/data/projects"
import MStripe from "@/components/MStripe"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Navbar />
        <main
          className="w-full bg-canvas"
          style={{ paddingTop: "96px", paddingBottom: "96px" }}
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
      <main>
        {/* Hero band */}
        <section
          className="w-full bg-canvas"
          style={{ paddingTop: "96px", paddingBottom: "64px" }}
        >
          <div className="max-w-[1440px] mx-auto px-6">
            {/* Back link */}
            <Link
              to="/#projects"
              className="label-uppercase text-muted inline-flex items-center gap-2 mb-12 hover:text-ink transition-colors duration-200"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              ALL PROJECTS
            </Link>

            {/* Category badge */}
            <div className="label-uppercase text-m-blue-dark mb-6 tracking-[1.5px]">
              {project.category}
            </div>

            {/* Project title — display-xl */}
            <h1 className="text-ink mb-8 max-w-[900px]">
              {project.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="label-uppercase text-muted mb-2">ROLE</div>
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
                <div className="label-uppercase text-muted mb-2">STATUS</div>
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

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-muted bg-surface-elevated px-4 py-2"
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
                    className="body-light mb-8 last:mb-0"
                    style={{ lineHeight: 1.8 }}
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
                <div
                  key={i}
                  className="bg-surface-soft p-6 border border-hairline-strong"
                  style={{ borderRadius: "0px" }}
                >
                  <div
                    className="text-ink mb-3"
                    style={{
                      fontSize: "var(--font-size-display-sm)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p
                    className="body-light"
                    style={{ lineHeight: 1.6 }}
                  >
                    {highlight}
                  </p>
                </div>
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
                      className="text-ink group-hover:text-body-strong transition-colors duration-200"
                      style={{
                        fontSize: "var(--font-size-title-lg)",
                        fontWeight: 700,
                        textTransform: "uppercase" as const,
                      }}
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
                      className="text-ink group-hover:text-body-strong transition-colors duration-200"
                      style={{
                        fontSize: "var(--font-size-title-lg)",
                        fontWeight: 700,
                        textTransform: "uppercase" as const,
                      }}
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
                      className="text-ink group-hover:text-body-strong transition-colors duration-200"
                      style={{
                        fontSize: "var(--font-size-title-lg)",
                        fontWeight: 700,
                        textTransform: "uppercase" as const,
                      }}
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
