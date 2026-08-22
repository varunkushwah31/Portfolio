import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  SparkleIcon,
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
  PostmanIcon,
} from "@/components/TechIcons"

const techStack = [
  { name: "Java 21", icon: JavaIcon },
  { name: "Spring Boot", icon: SpringIcon },
  { name: "React 19", icon: ReactIcon },
  { name: "TypeScript", icon: TypeScriptIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Flutter", icon: FlutterIcon },
  { name: "Python", icon: PythonIcon },
  { name: "WebRTC", icon: WebRTCIcon },
  { name: "PostgreSQL", icon: PostgresIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Git", icon: GitIcon },
  { name: "Tailwind CSS", icon: TailwindIcon },
  { name: "Linux", icon: LinuxIcon },
  { name: "Postman", icon: PostmanIcon },
]

const socials = [
  { label: "GitHub", href: "https://github.com/varunkushwah31", icon: GithubLogoIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/varun-kushwah/", icon: LinkedinLogoIcon },
  { label: "Email", href: "mailto:varun.kush3@gmail.com", icon: EnvelopeSimpleIcon },
]

export default function About() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
            About
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg font-normal">
            A short story of me.
          </p>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* 2-Column Section: Portrait Card on Left + Story on Right */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-12 mb-16">
          {/* Left Column: Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="w-full md:w-56 flex-shrink-0 flex flex-col items-center md:items-start"
          >
            {/* Clean Borderless Portrait */}
            <div className="w-48 sm:w-52 md:w-56 h-60 sm:h-68 rounded-2xl overflow-hidden shadow-2xl relative group bg-black">
              <img
                src="/profile.jpg"
                alt="Varun Kushwah"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Profile Info Underneath */}
            <div className="mt-3.5 text-center md:text-left w-full">
              <h2 className="text-base font-bold text-white">Varun Kushwah</h2>
              <p className="text-xs text-zinc-400 mt-0.5 font-normal">Software Developer</p>

              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#121217] text-[11px] text-zinc-300 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for hire</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex-1 space-y-4 text-sm sm:text-[15px] text-zinc-300 leading-relaxed font-normal"
          >
            <p>
              Hi there! Thanks for visiting my digital home on the internet.
            </p>

            <p>
              I'm <strong className="text-white font-semibold">Varun Kushwah</strong>, a Software Developer passionate about building innovative digital solutions that drive real technical and business impact. I specialize in backend architecture and scalable distributed services—the robust processes powering applications behind the scenes—as well as crafting clean, responsive client experiences.
            </p>

            <p>
              I have extensive experience in crafting scalable software systems that align with both technical architecture and product needs, leveraging a wide range of technologies:
            </p>

            {/* Structured Bullet List matching reference image */}
            <ul className="space-y-2 py-1 pl-1 text-sm sm:text-[14px]">
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 mt-0.5">•</span>
                <span>
                  <strong className="text-white font-medium">Languages: </strong>
                  <span className="text-zinc-200 font-medium">Java 21</span>,{" "}
                  <span className="text-zinc-200 font-medium">Python</span>,{" "}
                  <span className="text-zinc-200 font-medium">TypeScript</span>,{" "}
                  <span className="text-zinc-200 font-medium">Dart</span>, SQL
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 mt-0.5">•</span>
                <span>
                  <strong className="text-white font-medium">Frontend &amp; Mobile: </strong>
                  <span className="text-zinc-200 font-medium">React 19</span>,{" "}
                  <span className="text-zinc-200 font-medium">Flutter</span>,{" "}
                  <span className="text-zinc-200 font-medium">Tailwind CSS</span>, Vite
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 mt-0.5">•</span>
                <span>
                  <strong className="text-white font-medium">Backend &amp; Real-Time: </strong>
                  <span className="text-zinc-200 font-medium">Spring Boot 3.x</span>,{" "}
                  <span className="text-zinc-200 font-medium">WebRTC</span>,{" "}
                  <span className="text-zinc-200 font-medium">Node.js</span>, WebSockets
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-500 mt-0.5">•</span>
                <span>
                  <strong className="text-white font-medium">Database &amp; DevOps: </strong>
                  <span className="text-zinc-200 font-medium">PostgreSQL</span>,{" "}
                  <span className="text-zinc-200 font-medium">Docker</span>, Git Subtrees, Linux
                </span>
              </li>
            </ul>

            <p>
              As a Software Developer and <strong className="text-white font-medium">Java Coordinator at </strong>
              <a
                href="https://devup.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:text-emerald-300 underline underline-offset-4 decoration-zinc-600 hover:decoration-emerald-400 transition-colors inline-flex items-center gap-0.5"
              >
                <span>devup</span>
                <SparkleIcon size={12} className="inline text-emerald-400" />
              </a>
              , I take ownership of designing, developing, and maintaining software that meets high technical standards while delivering tangible value. I work closely with peers to mentor 100+ emerging developers in object-oriented architecture, Spring Boot services, and clean Git workflows.
            </p>

            <p>
              I consider myself a curious and inquisitive learner, always eager to expand my skills. In my free time, I enjoy working on personal side projects, as they allow me to explore new technologies and refine my expertise. I actively seek out new learning opportunities to stay ahead of industry trends and advancements.
            </p>

            <p>
              Besides hacking, I also have a strong appreciation for video games, chess, and music. I find that these activities provide an important balance to my professional life, allowing me to relax and recharge after a long day of coding. I believe that maintaining a healthy work-life balance is the key to keeping both my code and my spirits bug-free! 🎮 🎧
            </p>

            <p>
              If you'd like to learn more about my professional background and qualifications, feel free to explore my resume.
            </p>

            {/* My Resume Button matching bonabrian */}
            <div className="pt-3">
              <motion.div whileHover={{ scale: 1.03, x: 2 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3f3f46] hover:border-[#71717a] bg-[#09090b] text-white text-xs sm:text-sm font-medium transition-all duration-150 shadow-[0_2px_0_0_rgba(255,255,255,0.15)] hover:shadow-none"
                >
                  <FileTextIcon size={15} weight="bold" />
                  <span>My Resume</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section matching Image 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tech Stack
            </h2>
            <Link
              to="/tech-stack"
              className="text-xs text-zinc-400 hover:text-white font-medium transition-colors"
            >
              Explore all stack →
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#27272a] bg-[#141414] hover:bg-[#1a1a1a] text-xs sm:text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors duration-150 cursor-default shadow-sm"
                >
                  <Icon size={16} className="w-4 h-4 flex-shrink-0" />
                  <span>{tech.name}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Let's Connect Section matching Image 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed mb-5 font-normal max-w-2xl">
            Questions or collaborations? Reach out to me at{" "}
            <a
              href="mailto:varun.kush3@gmail.com"
              className="text-white hover:text-emerald-300 underline underline-offset-4 decoration-zinc-600 hover:decoration-emerald-400 font-medium transition-colors"
            >
              varun.kush3@gmail.com
            </a>{" "}
            or connect through social media. Let's build something amazing together!
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  title={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg border border-[#27272a] bg-[#141414] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors flex items-center justify-center shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
