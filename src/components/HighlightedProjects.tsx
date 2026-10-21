import { Link } from "react-router-dom"
import { CaretRightIcon, GithubLogoIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import projects from "@/data/projects"
import LaptopMockup from "./LaptopMockup"
import GsapTiltCard from "./gsap/GsapTiltCard"
import SpotlightCard from "./gsap/SpotlightCard"
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
} from "./TechIcons"

const featuredProjects = projects.filter((p) => p.featured)

const projectBadges: Record<string, Array<{ name: string; icon: React.FC<{ size?: number; className?: string }> }>> = {
  "leetcode-tracker": [
    { name: "Java", icon: JavaIcon },
    { name: "Spring Boot", icon: SpringIcon },
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

export default function HighlightedProjects() {
  return (
    <GsapReveal direction="up" distance={25} duration={0.65} className="py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            Highlighted projects
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight">
            What I've been working on
          </h2>
        </div>
      </div>

      {/* 2-Column Grid with GSAP 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredProjects.slice(0, 2).map((project) => {
          const theme = cardThemes[project.slug] || { bg: project.accentColor }
          const badges = projectBadges[project.slug] || []

          return (
            <GsapTiltCard
              key={project.slug}
              maxRotation={5}
              scaleOnHover={1.02}
              className="rounded-2xl h-full"
            >
              <SpotlightCard className="h-full rounded-2xl flex flex-col justify-between" size={450}>
                {/* Top Colorful Display Banner with Laptop Mockup */}
                <Link
                  to={`/project/${project.slug}`}
                  onClick={() => sound.click()}
                  className="group block h-56 sm:h-64 flex items-center justify-center p-6 sm:p-8 overflow-hidden relative cursor-pointer"
                  style={{ background: theme.bg }}
                >
                  <div className="w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                    <LaptopMockup imageSrc={project.image} alt={project.title} />
                  </div>
                </Link>

                {/* Bottom Content Area */}
                <div className="p-5 sm:p-6 bg-surface-card flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <Link
                        to={`/project/${project.slug}`}
                        onClick={() => sound.click()}
                        className="font-bold text-ink text-lg hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors tracking-tight"
                      >
                        {project.title}
                      </Link>

                      <span className="text-xs font-mono text-muted">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-sm text-body leading-relaxed line-clamp-2 mb-4 font-normal">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Footer Row: Tech Badges & Direct Links */}
                  <div className="pt-2 border-t border-hairline/60 flex items-center justify-between gap-2 flex-wrap">
                    {/* Tech stack badge row */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {badges.map((b) => {
                        const Icon = b.icon
                        return (
                          <div
                            key={b.name}
                            className="w-7 h-7 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center text-body-strong shadow-xs"
                            title={b.name}
                          >
                            <Icon size={14} className="w-3.5 h-3.5" />
                          </div>
                        )
                      })}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-md bg-surface-elevated hover:bg-surface-soft border border-hairline flex items-center justify-center text-muted hover:text-ink transition-colors shadow-xs"
                          title="View Source on GitHub"
                        >
                          <GithubLogoIcon size={15} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-md bg-surface-elevated hover:bg-surface-soft border border-hairline flex items-center justify-center text-muted hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors shadow-xs"
                          title="Visit Live Application"
                        >
                          <ArrowSquareOutIcon size={15} />
                        </a>
                      )}

                      <Link
                        to={`/project/${project.slug}`}
                        onClick={() => sound.click()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
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
  )
}
