import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  ArrowSquareOut,
  GraduationCap,
  Code,
  Trophy,
  CalendarBlank,
  MapPin,
} from "@phosphor-icons/react"
import projects from "@/data/projects"

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "College (India)",
    period: "2023 – 2027",
    description:
      "Focusing on Data Structures & Algorithms, Distributed Systems, Database Management Systems, and Cloud/DevOps infrastructure. Actively involved in technical club leadership.",
    highlights: ["DSA & Algorithms", "Distributed Systems", "DBMS", "DevOps Fundamentals"],
  },
]

const achievements = [
  {
    title: "Java Coordinator — devup",
    period: "2024 – Present",
    description:
      "Elected as the Java Coordinator for devup, my college's technical club. Organizing monthly Java workshops, mentoring 100+ students in OOP fundamentals, Spring Boot, and clean Git workflows.",
    icon: Code,
    color: "#f97316",
    link: "https://devup.co.in/",
  },
  {
    title: "5+ Projects Shipped",
    period: "2023 – Present",
    description:
      "Built and shipped 5+ projects spanning full-stack web apps, real-time P2P systems, ML pipelines, and cross-platform mobile apps — always pushing to explore new domains.",
    icon: Trophy,
    color: "#a78bfa",
  },
  {
    title: "WebRTC Implementation",
    period: "2024",
    description:
      "Successfully implemented a browser-to-browser peer-to-peer file sharing application using WebRTC DataChannels from scratch, demonstrating deep protocol-level understanding.",
    icon: ArrowSquareOut,
    color: "#22c55e",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-ink mb-3">Resume</h1>
            <p className="text-body text-lg">A brief overview of my academic journey and achievements.</p>
          </div>
          <a
            href="mailto:varun.kush3@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline text-body-strong text-sm hover:border-accent/60 hover:text-ink transition-all duration-200 self-start sm:self-auto whitespace-nowrap"
          >
            <ArrowSquareOut size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={22} className="text-accent-light" />
            <h2 className="text-2xl font-bold text-ink">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 rounded-xl border border-hairline bg-surface-card hover:border-accent/40 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="font-semibold text-ink text-lg">{edu.degree}</div>
                    <div className="text-accent-light font-medium text-sm mt-0.5">{edu.institution}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted bg-surface-elevated px-3 py-1 rounded-full self-start whitespace-nowrap">
                    <CalendarBlank size={12} />
                    {edu.period}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
                  <MapPin size={12} />
                  India · On-Site
                </div>
                <p className="text-body text-sm leading-relaxed mb-4">{edu.description}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 rounded-full border border-hairline text-muted bg-surface-soft"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Code size={22} className="text-accent-light" />
            <h2 className="text-2xl font-bold text-ink">Projects</h2>
          </div>

          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-5 rounded-xl border border-hairline bg-surface-card hover:border-accent/40 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    {/* Color dot representing project accent */}
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: project.accentColor.replace("1f", "7f").replace("1a", "6a").replace("3a", "8a") || "#7c3aed" }}
                    />
                    <div>
                      <span className="font-semibold text-ink">{project.title}</span>
                      <span className="ml-2 text-xs text-muted">{project.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-6 sm:ml-0">
                    <span className="text-xs px-2 py-0.5 rounded-full border border-hairline text-muted bg-surface-soft">
                      {project.category}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-hairline text-muted bg-surface-soft">
                      {project.role}
                    </span>
                  </div>
                </div>
                <p className="text-body text-sm leading-relaxed mb-3 ml-6">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 ml-6">
                  {project.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded border border-hairline text-muted bg-surface-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <div className="mt-3 ml-6">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
                    >
                      <ArrowSquareOut size={13} />
                      View on GitHub
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
            >
              See all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Trophy size={22} className="text-accent-light" />
            <h2 className="text-2xl font-bold text-ink">Achievements & Leadership</h2>
          </div>

          <div className="space-y-4">
            {achievements.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-xl border border-hairline bg-surface-card hover:border-accent/40 transition-all duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: item.color + "22", border: `1px solid ${item.color}44` }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink">{item.title}</span>
                        {"link" in item && item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-violet-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>Visit ↗</span>
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-muted">{item.period}</span>
                    </div>
                    <p className="text-body text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Last updated */}
        <p className="text-xs text-muted text-center pt-4">
          Last updated at August, 2026
        </p>
      </div>
    </div>
  )
}
