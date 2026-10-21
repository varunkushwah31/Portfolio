import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { usePageTitle } from "@/hooks/usePageTitle"
import projects from "@/data/projects"
import LaptopMockup from "@/components/LaptopMockup"
import MobileMockup from "@/components/MobileMockup"
import { sound } from "@/lib/sound"
import {
  GithubLogoIcon,
  ArrowSquareOutIcon,
  CaretRightIcon,
} from "@phosphor-icons/react"
import {
  JavaIcon,
  SpringIcon,
  ReactIcon,
  FlutterIcon,
  PythonIcon,
  TypeScriptIcon,
  NodeIcon,
  DockerIcon,
  GitIcon,
  WebRTCIcon,
  TailwindIcon,
  PostgresIcon,
  LinuxIcon,
} from "@/components/TechIcons"

const projectBadges: Record<
  string,
  Array<{ name: string; icon: React.FC<{ size?: number; className?: string }> }>
> = {
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
  "site-look": [
    { name: "Java", icon: JavaIcon },
    { name: "Spring Boot", icon: SpringIcon },
    { name: "React", icon: ReactIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "Tailwind", icon: TailwindIcon },
  ],
  "system-health-dashboard": [
    { name: "React", icon: ReactIcon },
    { name: "Node.js", icon: NodeIcon },
    { name: "Tailwind", icon: TailwindIcon },
    { name: "Linux", icon: LinuxIcon },
  ],
  "disease-prediction": [
    { name: "Python", icon: PythonIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "PostgreSQL", icon: PostgresIcon },
    { name: "Linux", icon: LinuxIcon },
  ],
  "daily-quotes-app": [
    { name: "Flutter", icon: FlutterIcon },
    { name: "Python", icon: PythonIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "Git", icon: GitIcon },
  ],
}

// Matching the distinct background colors from bonabrian style
const cardThemes: Record<string, { bg: string; isMobile?: boolean }> = {
  "leetcode-tracker": {
    bg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)",
  },
  "w2wshare": {
    bg: "linear-gradient(135deg, #164e63 0%, #083344 100%)",
  },
  "site-look": {
    bg: "linear-gradient(135deg, #0d9488 0%, #115e59 100%)",
  },
  "system-health-dashboard": {
    bg: "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)",
  },
  "disease-prediction": {
    bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
  },
  "daily-quotes-app": {
    bg: "linear-gradient(135deg, #0369a1 0%, #1e40af 100%)",
    isMobile: true,
  },
}

type FilterCategory = "All" | "Full-Stack" | "Real-Time & Systems" | "Mobile & ML"

export default function ProjectsPage() {
  usePageTitle("Projects")
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All")

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects
    if (activeFilter === "Full-Stack") {
      return projects.filter((p) => p.category === "Full-Stack")
    }
    if (activeFilter === "Real-Time & Systems") {
      return projects.filter((p) => p.category === "Real-Time" || p.category === "Systems")
    }
    if (activeFilter === "Mobile & ML") {
      return projects.filter((p) => p.category === "Mobile" || p.category === "Machine Learning")
    }
    return projects
  }, [activeFilter])

  const categories: FilterCategory[] = ["All", "Full-Stack", "Real-Time & Systems", "Mobile & ML"]

  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-2">
              Projects
            </h1>
            <p className="text-muted text-sm sm:text-base font-normal">
              A curated collection of real-world applications and production systems I have built.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {categories.map((cat) => {
              const active = activeFilter === cat
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.click()
                    setActiveFilter(cat)
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-ink text-canvas shadow-xs"
                      : "bg-surface-card border border-hairline text-muted hover:text-ink hover:bg-surface-elevated"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const theme = cardThemes[project.slug] || { bg: project.accentColor }
              const badges = projectBadges[project.slug] || []

              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-hairline bg-surface-card hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-300 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  {/* Top Colorful Display Banner with Device Mockup */}
                  <Link
                    to={`/project/${project.slug}`}
                    onClick={() => sound.click()}
                    className="h-56 sm:h-64 flex items-center justify-center p-4 sm:p-8 overflow-hidden relative cursor-pointer"
                    style={{ background: theme.bg }}
                  >
                    {theme.isMobile ? (
                      <div className="w-full max-w-50 flex items-center justify-center">
                        <MobileMockup imageSrc={project.image} alt={project.title} />
                      </div>
                    ) : (
                      <div className="w-full max-w-70 sm:max-w-80 transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]">
                        <LaptopMockup imageSrc={project.image} alt={project.title} />
                      </div>
                    )}
                  </Link>

                  {/* Bottom Card Content */}
                  <div className="p-4 sm:p-6 bg-surface-card flex flex-col justify-between flex-grow">
                    <div>
                      {/* Title & Category Badge */}
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

                      {/* Tagline / Excerpt */}
                      <p className="text-xs sm:text-sm text-body leading-relaxed line-clamp-2 mb-4 font-normal">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Footer Row: Tech Stack Badges & Direct Action Links */}
                    <div className="pt-3 border-t border-hairline/60 flex items-center justify-between gap-2 flex-wrap">
                      {/* Mini Tech Stack Badges */}
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

                      {/* Action Links: GitHub, Live Demo, Details */}
                      <div className="flex items-center gap-1.5">
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
                            title="Open Live Application"
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
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
