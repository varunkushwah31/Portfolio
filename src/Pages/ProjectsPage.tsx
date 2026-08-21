import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import projects from "@/data/projects"
import LaptopMockup from "@/components/LaptopMockup"
import MobileMockup from "@/components/MobileMockup"
import {
  JavaIcon,
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
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "Node.js", icon: NodeIcon },
    { name: "React", icon: ReactIcon },
    { name: "Git", icon: GitIcon },
    { name: "Tailwind", icon: TailwindIcon },
  ],
  "mangoshare-clone": [
    { name: "React", icon: ReactIcon },
    { name: "WebRTC", icon: WebRTCIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "Node.js", icon: NodeIcon },
    { name: "Java", icon: JavaIcon },
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

// Matching the distinct background colors from bonabrian reference image
const cardThemes: Record<string, { bg: string; isMobile?: boolean }> = {
  "leetcode-tracker": {
    bg: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
  },
  "mangoshare-clone": {
    bg: "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header matching reference */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
            Projects
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg font-normal">
            A collection of finest projects that I have built. ❤️
          </p>
        </motion.div>
      </div>

      {/* 2-Column Projects Grid matching reference image */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {projects.map((project, i) => {
            const theme = cardThemes[project.slug] || { bg: project.accentColor }
            const badges = projectBadges[project.slug] || []

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 20 } }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="group block rounded-2xl border border-[#27272a] bg-[#141414] hover:border-zinc-500 hover:shadow-[0_15px_35px_-10px_rgba(255,255,255,0.06)] transition-all duration-300 overflow-hidden shadow-xl"
                >
                  {/* Top Colorful Banner with Device Mockup */}
                  <div
                    className="h-56 sm:h-64 flex items-center justify-center p-6 sm:p-8 overflow-hidden relative"
                    style={{ background: theme.bg }}
                  >
                    {theme.isMobile ? (
                      <div className="w-full max-w-[200px] flex items-center justify-center">
                        <MobileMockup imageSrc={project.image} alt={project.title} />
                      </div>
                    ) : (
                      <div className="w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                        <LaptopMockup imageSrc={project.image} alt={project.title} />
                      </div>
                    )}
                  </div>

                  {/* Bottom Card Content */}
                  <div className="p-5 sm:p-6 bg-[#141414]">
                    {/* Project Title */}
                    <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-white transition-colors tracking-tight">
                      {project.slug}
                    </h3>

                    {/* Tagline / Excerpt */}
                    <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed line-clamp-2 mt-1 mb-4">
                      {project.tagline}
                    </p>

                    {/* Mini Tech Stack Badges Row */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {badges.map((b) => {
                        const Icon = b.icon
                        return (
                          <div
                            key={b.name}
                            className="w-7 h-7 rounded-md bg-[#1f1f23] border border-[#2e2e33] flex items-center justify-center text-zinc-300 shadow-sm"
                            title={b.name}
                          >
                            <Icon size={14} className="w-3.5 h-3.5" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
