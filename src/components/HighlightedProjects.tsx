import { Link } from "react-router-dom"
import { CaretRightIcon } from "@phosphor-icons/react"
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
  "mentorsync": [
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
  "mangoshare-clone": [
    { name: "Java", icon: JavaIcon },
    { name: "Spring Boot", icon: SpringIcon },
    { name: "WebRTC", icon: WebRTCIcon },
    { name: "React", icon: ReactIcon },
    { name: "Docker", icon: DockerIcon },
  ],
}

// Vibrant banner gradients for the 2 featured projects
const cardThemes: Record<string, { bg: string }> = {
  "leetcode-tracker": { bg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)" },
  "mentorsync": { bg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)" },
  "w2wshare": { bg: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)" },
  "mangoshare-clone": { bg: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)" },
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
              <SpotlightCard className="h-full rounded-2xl" size={450}>
                <Link
                  to={`/project/${project.slug}`}
                  onClick={() => sound.click()}
                  className="group block rounded-2xl overflow-hidden shadow-sm h-full"
                >
                  {/* Top Colorful Display Banner with Laptop Mockup */}
                  <div
                    className="h-56 sm:h-64 flex items-center justify-center p-6 sm:p-8 overflow-hidden relative"
                    style={{ background: theme.bg }}
                  >
                    <div className="w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                      <LaptopMockup imageSrc={project.image} alt={project.title} />
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="p-5 sm:p-6 bg-surface-card">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-ink text-lg group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-muted text-xs font-mono group-hover:translate-x-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all">
                        →
                      </span>
                    </div>

                    <p className="text-sm text-body leading-relaxed line-clamp-2 mb-4 font-normal">
                      {project.tagline}
                    </p>

                    {/* Tech stack badge row at bottom-left */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {badges.map((b) => {
                        const Icon = b.icon
                        return (
                          <div
                            key={b.name}
                            className="w-7 h-7 rounded-md bg-surface-elevated border border-hairline flex items-center justify-center text-body-strong hover:border-muted hover:text-ink transition-colors shadow-xs cursor-default"
                            title={b.name}
                          >
                            <Icon size={14} className="w-3.5 h-3.5" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Link>
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
