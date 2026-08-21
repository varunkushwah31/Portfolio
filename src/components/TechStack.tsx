import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { CaretRightIcon } from "@phosphor-icons/react"
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
} from "./TechIcons"

const techItems = [
  { name: "Java", icon: JavaIcon },
  { name: "Spring Boot", icon: SpringIcon },
  { name: "React", icon: ReactIcon },
  { name: "Flutter", icon: FlutterIcon },
  { name: "Python", icon: PythonIcon },
  { name: "WebRTC", icon: WebRTCIcon },
  { name: "TypeScript", icon: TypeScriptIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Git", icon: GitIcon },
  { name: "Tailwind CSS", icon: TailwindIcon },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
}

export default function TechStack() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="text-xs text-muted font-medium uppercase tracking-wider"
        >
          Tech stack
        </motion.p>
        <Link
          to="/tech-stack"
          className="text-xs text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1 transition-colors group"
        >
          <span>View all</span>
          <CaretRightIcon size={12} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <motion.div
        className="flex flex-wrap gap-2 sm:gap-2.5"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {techItems.map((tech) => {
          const Icon = tech.icon
          return (
            <motion.div
              key={tech.name}
              variants={itemVariant}
              whileHover={{ scale: 1.08, y: -3, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-[#141414] hover:bg-[#1a1a1a] text-xs sm:text-sm text-body-strong hover:border-zinc-500 hover:text-white transition-colors duration-150 cursor-pointer shadow-sm hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]"
            >
              <Icon size={16} className="w-4 h-4 flex-shrink-0" />
              <span>{tech.name}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}