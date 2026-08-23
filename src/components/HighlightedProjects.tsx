import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CaretRightIcon } from "@phosphor-icons/react"
import projects from "@/data/projects"
import LaptopMockup from "./LaptopMockup"
import {
  JavaIcon,
  ReactIcon,
  NodeIcon,
  WebRTCIcon,
  TypeScriptIcon,
  GitIcon,
  TailwindIcon,
} from "./TechIcons"


const featuredProjects = projects.filter((p) => p.featured)

const projectBadges: Record<string, Array<{ name: string; icon: React.FC<{ size?: number; className?: string }> }>> = {
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
}

// Vibrant banner gradients for the 2 featured projects
const cardThemes: Record<string, { bg: string }> = {
  "leetcode-tracker": { bg: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)" },
  "mangoshare-clone": { bg: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)" },
}

export default function HighlightedProjects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="py-12"
    >
      {/* Section Header */}
      <p className="text-xs sm:text-sm font-semibold text-emerald-400 mb-1">
        Highlighted projects
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
        What I've been working on
      </h2>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featuredProjects.slice(0, 2).map((project, i) => {
          const theme = cardThemes[project.slug] || { bg: project.accentColor }
          const badges = projectBadges[project.slug] || []

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 20 } }}
            >
              <Link
                to={`/project/${project.slug}`}
                className="group block rounded-2xl border border-[#27272a] bg-[#141414] hover:border-zinc-500 hover:shadow-[0_12px_30px_-10px_rgba(255,255,255,0.06)] transition-all duration-300 overflow-hidden shadow-xl"
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
                <div className="p-5 sm:p-6 bg-[#141414]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-white text-lg group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-zinc-500 text-xs font-mono group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 font-normal">
                    {project.tagline}
                  </p>

                  {/* Tech stack badge row at bottom-left */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {badges.map((b) => {
                      const Icon = b.icon
                      return (
                        <motion.div
                          key={b.name}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className="w-7 h-7 rounded-md bg-[#1f1f23] border border-[#2e2e33] flex items-center justify-center text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors shadow-sm cursor-default"
                          title={b.name}
                        >
                          <Icon size={14} className="w-3.5 h-3.5" />
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Centered See All Projects Button */}
      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#2e2e2e] bg-[#141414] hover:bg-[#1f1f1f] text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-all duration-200 shadow-sm group"
          >
            <span>See all projects</span>
            <CaretRightIcon size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
