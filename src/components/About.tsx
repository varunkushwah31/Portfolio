import { useState } from "react"
import { motion } from "framer-motion"
import { MedalIcon, BookOpenIcon, StackIcon, CpuIcon, UsersIcon, GitBranchIcon, ArrowUpRightIcon } from "@phosphor-icons/react"
import { sound } from "@/lib/sound"

const milestones = [
  {
    role: "JAVA COORDINATOR",
    org: "DEVUP COLLEGE CLUB",
    period: "2024 – PRESENT",
    desc: "Organizing technical Java workshops, mentoring 100+ students in Object-Oriented Programming, and structuring collaborative development sprints.",
    icon: MedalIcon,
    metrics: "100+ Mentored · Regular Workshops · OOP Architecture",
  },
  {
    role: "CS & SOFTWARE ENGINEERING",
    org: "UNDERGRADUATE DEGREE",
    period: "2023 – 2027",
    desc: "Focusing on Data Structures & Algorithms, Distributed Systems, Database Management, and Cloud/DevOps infrastructure pipelines.",
    icon: BookOpenIcon,
    metrics: "B.Tech Computer Science · Core Engineering Fundamentals",
  },
  {
    role: "FULL-STACK & P2P SYSTEMS",
    org: "INDEPENDENT & COLLABORATIVE LABS",
    period: "2024 – PRESENT",
    desc: "Architecting WebRTC peer-to-peer data channel engines, Git Subtree monorepo progress trackers, and real-time hardware telemetry dashboards.",
    icon: StackIcon,
    metrics: "5+ Repositories · WebRTC P2P · Git Subtrees",
  },
]

const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(0)

  return (
    <section
      id="about"
      className="w-full bg-canvas relative overflow-hidden border-b border-hairline-strong"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="label-uppercase text-muted text-xs tracking-[3px]">
            [ SECTION // 01 ]
          </span>
          <span className="text-hairline">|</span>
          <span className="label-uppercase text-m-blue-light text-xs tracking-[1.5px] font-bold">
            BACKGROUND & LEADERSHIP
          </span>
        </motion.div>

        {/* Section heading — display-md */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-12 max-w-[800px]"
        >
          ENGINEERED WITH DISCIPLINE, DRIVEN BY BACKEND PRECISION
        </motion.h3>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column — Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="body-light text-body text-base md:text-lg leading-relaxed">
              I am a Computer Science undergraduate focused on building robust, scalable backend systems with{" "}
              <strong className="text-ink font-semibold">Java</strong> and{" "}
              <strong className="text-ink font-semibold">Spring Boot</strong>. I combine deep object-oriented principles with modern asynchronous protocols to create resilient software solutions.
            </p>

            <p className="body-light text-body text-base leading-relaxed">
              As the <strong className="text-ink font-semibold">Java Coordinator at devup</strong>, I spearhead technical workshops, mentor emerging developers in core Java fundamentals and object-oriented architecture, and champion clean Git branching workflows across collaborative student repositories.
            </p>

            <p className="body-light text-body text-base leading-relaxed">
              Beyond enterprise backend architecture, my work spans peer-to-peer data streaming via{" "}
              <strong className="text-ink font-semibold">WebRTC</strong>, monorepo maintenance with{" "}
              <strong className="text-ink font-semibold">Git Subtree</strong>, cross-platform mobile apps with Flutter, and applied machine learning classification pipelines.
            </p>

            {/* Engineering Philosophy Callout Box */}
            <div className="bg-surface-soft border-l-2 border-m-blue-light p-5 my-6">
              <div className="label-uppercase text-m-blue-light text-xs font-bold mb-1">
                ENGINEERING CORE PHILOSOPHY
              </div>
              <p className="body-light text-sm text-body-strong italic leading-relaxed">
                "High performance software is not accidental; it is engineered through strict decoupling, predictable concurrency, and relentless verification."
              </p>
            </div>

            {/* Quick Badges Cluster */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="bg-surface-soft text-body-strong px-3 py-1.5 border border-hairline-strong flex items-center gap-1.5">
                <GitBranchIcon size={13} className="text-m-blue-light" />
                GIT SUBTREES
              </span>
              <span className="bg-surface-soft text-body-strong px-3 py-1.5 border border-hairline-strong">
                JAVA 21 / SPRING 3
              </span>
              <span className="bg-surface-soft text-body-strong px-3 py-1.5 border border-hairline-strong">
                WEBRTC PROTOCOLS
              </span>
              <span className="bg-surface-soft text-body-strong px-3 py-1.5 border border-hairline-strong">
                DOCKER & LINUX
              </span>
            </div>
          </motion.div>

          {/* Right Column — Interactive Leadership & Milestones Tracker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 bg-surface-soft border border-hairline-strong p-6 md:p-8"
            style={{ borderRadius: "0px" }}
          >
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
              <div className="label-uppercase text-ink flex items-center gap-2">
                <CpuIcon size={16} className="text-m-blue-dark" />
                EXPERIENCE & LEADERSHIP TRACK
              </div>
              <span className="text-[11px] label-uppercase text-muted font-mono">[ TRACK_03 ]</span>
            </div>

            <div className="space-y-4">
              {milestones.map((item, idx) => {
                const IconComponent = item.icon
                const isActive = activeMilestone === idx

                return (
                  <button
                    type="button"
                    key={item.role}
                    onClick={() => {
                      sound.switchTab()
                      setActiveMilestone(idx)
                    }}
                    onMouseEnter={() => sound.hover()}
                    className={`w-full text-left p-5 border cursor-pointer transition-all duration-200 relative block ${
                      isActive
                        ? "bg-surface-card border-m-blue-light/70 shadow-lg"
                        : "bg-canvas border-hairline-strong hover:border-hairline opacity-80 hover:opacity-100"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-m-blue-light via-m-blue-dark to-m-red" />
                    )}

                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <IconComponent
                          size={18}
                          className={isActive ? "text-m-blue-light" : "text-muted"}
                        />
                        <h4 className="text-ink font-bold text-base uppercase tracking-tight">
                          {item.role}
                        </h4>
                      </div>
                      <span className="text-[11px] label-uppercase text-muted shrink-0 font-mono">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs label-uppercase text-m-blue-dark mb-2 font-bold flex items-center gap-2">
                      <span>{item.org}</span>
                      {isActive && <ArrowUpRightIcon size={13} />}
                    </div>

                    <p className="body-light text-xs text-body leading-relaxed mb-3">
                      {item.desc}
                    </p>

                    <div className="pt-2 border-t border-hairline-strong flex items-center gap-2 text-[10px] font-mono text-muted">
                      <UsersIcon size={12} className="text-m-blue-light" />
                      <span>{item.metrics}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
