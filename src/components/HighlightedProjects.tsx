import React from "react"
import { Link } from "react-router-dom"
import { CaretRightIcon, GithubLogoIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import projects from "@/data/projects"
import LaptopMockup from "./LaptopMockup"
import GsapTiltCard from "./gsap/GsapTiltCard"
import SpotlightCard from "./gsap/SpotlightCard"
import GsapBorderShimmer from "./gsap/GsapBorderShimmer"
import MagneticButton from "./gsap/MagneticButton"
import GsapReveal from "./gsap/GsapReveal"
import { sound } from "@/lib/sound"
import {
  JavaIcon,
  SpringIcon,
  ReactIcon,
  WebRTCIcon,
  TypeScriptIcon,
  TailwindIcon,
  DockerIcon,
  PostgresIcon,
} from "./TechIcons"

const featuredProjects = projects.filter((p) => p.featured)

const projectBadges: Record<string, Array<{ name: string; icon: React.FC<{ size?: number; className?: string }> }>> = {
  "leetcode-tracker": [
    { name: "Java", icon: JavaIcon },
    { name: "Spring Boot", icon: SpringIcon },
    { name: "PostgreSQL", icon: PostgresIcon },
    { name: "React", icon: ReactIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "Tailwind", icon: TailwindIcon },
  ],
  "w2wshare": [
    { name: "Java", icon: JavaIcon },
    { name: "Spring Boot", icon: SpringIcon },
    { name: "WebRTC", icon: WebRTCIcon },
    { name: "React", icon: ReactIcon },
    { name: "Docker", icon: DockerIcon },
  ],
}

// Vibrant banner gradients matching bonabrian style
const cardThemes: Record<string, { bg: string }> = {
  "leetcode-tracker": { bg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)" },
  "w2wshare": { bg: "linear-gradient(135deg, #164e63 0%, #083344 100%)" },
}

const filterDisplayNames: Record<string, string> = {
  java: "Java",
  "spring-boot": "Spring Boot",
  webrtc: "WebRTC",
  docker: "Docker",
  postgres: "PostgreSQL",
}

const matchesFilter = (project: (typeof featuredProjects)[number], filter: string | null | undefined): boolean => {
  if (!filter) return true
  const lowerFilter = filter.toLowerCase()
  return project.tech.some((t) => {
    const lowerTech = t.toLowerCase()
    if (lowerFilter === "java") return lowerTech.includes("java") && !lowerTech.includes("javascript")
    if (lowerFilter === "spring" || lowerFilter === "spring-boot") return lowerTech.includes("spring")
    if (lowerFilter === "webrtc") return lowerTech.includes("webrtc")
    if (lowerFilter === "docker") return lowerTech.includes("docker")
    if (lowerFilter === "postgres" || lowerFilter === "postgresql") return lowerTech.includes("postgres")
    return lowerTech.includes(lowerFilter)
  })
}

const badgeMatchesFilter = (badgeName: string, filter: string | null | undefined): boolean => {
  if (!filter) return false
  const lowerFilter = filter.toLowerCase()
  const lowerBadge = badgeName.toLowerCase()
  if (lowerFilter === "java") return lowerBadge.includes("java")
  if (lowerFilter === "spring" || lowerFilter === "spring-boot") return lowerBadge.includes("spring")
  if (lowerFilter === "webrtc") return lowerBadge.includes("webrtc")
  if (lowerFilter === "docker") return lowerBadge.includes("docker")
  if (lowerFilter === "postgres" || lowerFilter === "postgresql") return lowerBadge.includes("postgres")
  return lowerBadge.includes(lowerFilter)
}

export interface HighlightedProjectsProps {
  activeTechFilter?: string | null
  onClearFilter?: () => void
}

export default function HighlightedProjects({
  activeTechFilter,
  onClearFilter,
}: Readonly<HighlightedProjectsProps>) {
  return (
    <div id="highlighted-projects" className="scroll-mt-24">
      <GsapReveal direction="up" distance={25} duration={0.65} className="py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              Highlighted projects
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight">
              What I've been working on
            </h2>
          </div>

          {activeTechFilter && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-body-strong shadow-xs w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Stack:{" "}
                <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {filterDisplayNames[activeTechFilter] || activeTechFilter}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.click()
                  onClearFilter?.()
                }}
                className="ml-1 text-[11px] font-mono text-muted hover:text-ink underline cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1"
                aria-label="Clear technology filter"
              >
                Reset [x]
              </button>
            </div>
          )}
        </div>

        {/* 2-Column Grid with GSAP 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.slice(0, 2).map((project) => {
            const theme = cardThemes[project.slug] || { bg: project.accentColor }
            const badges = projectBadges[project.slug] || []
            const isMatch = matchesFilter(project, activeTechFilter)
            const isDimmed = Boolean(activeTechFilter) && !isMatch

            return (
              <GsapTiltCard
                key={project.slug}
                maxRotation={5}
                scaleOnHover={1.02}
                className={`group rounded-2xl h-full transition-all duration-300 ${
                  isDimmed ? "opacity-35 grayscale-50 scale-[0.98]" : "opacity-100"
                }`}
              >
                <SpotlightCard
                  spotlightColor="rgba(16, 185, 129, 0.04)"
                  className={`h-full rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                    activeTechFilter && isMatch
                      ? "ring-1.5 ring-emerald-500/70 border-emerald-500/80 shadow-md shadow-emerald-500/5"
                      : ""
                  }`}
                  size={420}
                >
                  {/* Subtle GSAP Hairline Border Shimmer on Hover */}
                  <GsapBorderShimmer strokeWidth={1.5} rx={16} />

                  {/* Top Colorful Display Banner with Laptop Mockup */}
                  <Link
                    to={`/project/${project.slug}`}
                    onClick={() => sound.click()}
                    className="group flex items-center justify-center h-56 sm:h-64 p-4 sm:p-8 overflow-hidden relative cursor-pointer"
                    style={{ background: theme.bg }}
                  >
                    <div className="w-full max-w-65 sm:max-w-[320px] mx-auto flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                      <LaptopMockup className="w-full" imageSrc={project.image} alt={project.title} />
                    </div>
                  </Link>

                  {/* Bottom Content Area */}
                  <div className="p-4 sm:p-6 bg-surface-card flex flex-col justify-between grow">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <Link
                          to={`/project/${project.slug}`}
                          onClick={() => sound.click()}
                          className="font-bold text-ink text-base sm:text-lg hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors tracking-tight"
                        >
                          {project.title}
                        </Link>

                        <span className="text-[11px] font-mono text-muted uppercase">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-body leading-relaxed line-clamp-2 mb-4 font-normal">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Footer Row: Tech Badges & Direct Links */}
                    <div className="pt-2.5 border-t border-hairline/60 flex items-center justify-between gap-2 flex-wrap">
                      {/* Tech stack badge row */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {badges.map((b) => {
                          const Icon = b.icon
                          const isBadgeHighlight = badgeMatchesFilter(b.name, activeTechFilter)
                          return (
                            <div
                              key={b.name}
                              className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all duration-200 shadow-xs ${
                                isBadgeHighlight
                                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/50 scale-110 shadow-sm"
                                  : "bg-surface-elevated border-hairline text-body-strong"
                              }`}
                              title={b.name}
                            >
                              <Icon size={14} className="w-3.5 h-3.5" />
                            </div>
                          )
                        })}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-surface-soft border border-hairline flex items-center justify-center text-muted hover:text-ink transition-colors shadow-xs active:scale-95"
                            title="View Source on GitHub"
                          >
                            <GithubLogoIcon size={16} />
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-surface-soft border border-hairline flex items-center justify-center text-muted hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors shadow-xs active:scale-95"
                            title="Visit Live Application"
                          >
                            <ArrowSquareOutIcon size={16} />
                          </a>
                        )}

                        <Link
                          to={`/project/${project.slug}`}
                          onClick={() => sound.click()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors active:scale-95"
                        >
                          <span>Details</span>
                          <CaretRightIcon size={11} weight="bold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </GsapTiltCard>
            )
          })}
        </div>

        {/* Centered See All Projects Button with GSAP Magnetic Attraction */}
        <div className="flex justify-center">
          <MagneticButton strength={0.35}>
            <Link
              to="/projects"
              onClick={() => sound.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-xs sm:text-sm font-medium text-body-strong hover:text-ink transition-all duration-200 shadow-xs group"
            >
              <span>See all projects</span>
              <CaretRightIcon size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </MagneticButton>
        </div>
      </GsapReveal>
    </div>
  )
}
