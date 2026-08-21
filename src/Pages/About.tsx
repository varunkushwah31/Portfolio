import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  FileText,
  Users,
  GraduationCap,
  Trophy,
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
} from "@/components/TechIcons"

const techStack = [
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
  { name: "PostgreSQL", icon: PostgresIcon },
]

const socials = [
  { label: "GitHub", href: "https://github.com/varunkushwah31", icon: GithubLogo },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/varun-kushwah/", icon: LinkedinLogo },
  { label: "Email", href: "mailto:varun.kush3@gmail.com", icon: EnvelopeSimple },
]


export default function About() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-ink mb-3">About</h1>
          <p className="text-body text-lg">A short story of me.</p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Two-column: photo + bio */}
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          {/* Photo / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-shrink-0 flex flex-col items-center gap-3"
          >
            {/* Placeholder avatar */}
            <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-violet-700 to-violet-900 flex items-center justify-center border border-hairline shadow-2xl">
              <span className="text-5xl font-bold text-white select-none">VK</span>
            </div>
            <div className="text-center">
              <div className="font-semibold text-ink">Varun Kushwah</div>
              <div className="text-sm text-body">Software Developer</div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-success/40 text-success bg-success/10">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Open for opportunities
              </div>
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 space-y-4"
          >
            <p className="text-body leading-relaxed">
              Hi there! Thanks for visiting my digital home on the internet.
            </p>
            <p className="text-body leading-relaxed">
              I'm{" "}
              <span className="text-ink font-semibold">Varun Kushwah</span>, a Computer Science student
              passionate about building robust backend systems that drive real impact. I specialize in{" "}
              <span className="text-accent-light font-medium">Java & Spring Boot</span> for backend development
              and enjoy exploring real-time protocols and DevOps practices.
            </p>
            <p className="text-body leading-relaxed">
              I currently serve as the{" "}
              <span className="text-ink font-semibold">Java Coordinator at </span>
              <a
                href="https://devup.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-300 font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                devup
              </a>
              , my college's technical club, where I organize workshops, mentor peers in OOP fundamentals, and champion clean Git workflows across collaborative projects.
            </p>

            <p className="text-body leading-relaxed">
              My technical interests span a wide range of areas:
            </p>

            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-accent-light mt-1">•</span>
                <span>
                  <span className="text-body-strong font-medium">Backend:</span> Java 21, Spring Boot 3.x, Spring Data JPA, REST APIs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-light mt-1">•</span>
                <span>
                  <span className="text-body-strong font-medium">Frontend & Mobile:</span> React, TypeScript, Flutter / Dart
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-light mt-1">•</span>
                <span>
                  <span className="text-body-strong font-medium">Real-Time:</span> WebRTC, WebSockets, Peer-to-Peer protocols
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-light mt-1">•</span>
                <span>
                  <span className="text-body-strong font-medium">Currently learning:</span> Docker, CI/CD pipelines, DevOps
                </span>
              </li>
            </ul>

            <p className="text-body leading-relaxed">
              I consider myself a curious and passionate learner, always eager to expand my skills and
              explore new technologies. I actively seek out new challenges to stay ahead of industry trends.
            </p>

            <div className="pt-2">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline text-body-strong text-sm hover:border-accent/60 hover:text-ink transition-all duration-200"
              >
                <FileText size={16} />
                My Resume
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-ink mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => {
              const Icon = tech.icon
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-surface-card text-sm text-body-strong hover:border-accent/60 hover:text-ink transition-all duration-200"
                >
                  <Icon size={16} className="w-4 h-4 flex-shrink-0" />
                  <span>{tech.name}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-ink mb-6">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-hairline bg-surface-card hover:border-violet-500/40 transition-colors">
              <Users size={22} className="text-accent-light mb-3" />
              <div className="font-semibold text-ink mb-1 flex items-center justify-between">
                <span>Java Coordinator @ devup</span>
                <a
                  href="https://devup.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-violet-400 hover:underline"
                >
                  Visit ↗
                </a>
              </div>
              <div className="text-sm text-body">
                Organizing technical workshops and mentoring 100+ students in Java & OOP.
              </div>
              <div className="text-xs text-muted mt-2">2024 – Present</div>
            </div>
            <div className="p-5 rounded-xl border border-hairline bg-surface-card">
              <GraduationCap size={22} className="text-accent-light mb-3" />
              <div className="font-semibold text-ink mb-1">B.Tech Computer Science</div>
              <div className="text-sm text-body">
                Focusing on DSA, Distributed Systems, DBMS, and Cloud/DevOps infrastructure.
              </div>
              <div className="text-xs text-muted mt-2">2023 – 2027</div>
            </div>
            <div className="p-5 rounded-xl border border-hairline bg-surface-card">
              <Trophy size={22} className="text-accent-light mb-3" />
              <div className="font-semibold text-ink mb-1">5+ Projects Built</div>
              <div className="text-sm text-body">
                Full-stack, real-time P2P, ML, and mobile apps — always exploring new domains.
              </div>
              <div className="text-xs text-muted mt-2">2023 – Present</div>
            </div>
          </div>
        </motion.div>

        {/* Let's Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-ink mb-3">
            Let's Connect{" "}
            <span className="text-accent-light">👋</span>
          </h2>
          <p className="text-body mb-6">
            Questions or collaborations? Reach out to me at{" "}
            <a href="mailto:varun.kush3@gmail.com" className="text-accent-light hover:underline">
              varun.kush3@gmail.com
            </a>{" "}
            or connect through social media. Let's build something amazing together!
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  title={s.label}
                  className="p-2.5 rounded-lg border border-hairline text-body hover:text-ink hover:border-accent/50 transition-all duration-200 flex items-center justify-center"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
