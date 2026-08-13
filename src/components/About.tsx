import { useState } from "react"
import { motion } from "framer-motion"
import { Award, BookOpen, Layers, Cpu } from "lucide-react"

const milestones = [
  {
    role: "JAVA COORDINATOR",
    org: "DEVUP COLLEGE CLUB",
    period: "ACTIVE ROLE",
    desc: "Organizing Java workshops, mentoring peer developers, and fostering collaborative coding practices.",
    icon: Award,
  },
  {
    role: "CS & SOFTWARE ENGINEERING",
    org: "UNDERGRADUATE",
    period: "2023 – PRESENT",
    desc: "Deep-diving into Object-Oriented Programming, Data Structures, System Monitoring, and DevOps.",
    icon: BookOpen,
  },
  {
    role: "FULL-STACK & P2P ARCHITECTURE",
    org: "INDEPENDENT & TEAM PROJECTS",
    period: "2024 – PRESENT",
    desc: "Building WebRTC peer-to-peer file transfer platforms and Git Subtree full-stack applications.",
    icon: Layers,
  },
]

const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(0)

  return (
    <section
      id="about"
      className="w-full bg-canvas relative overflow-hidden"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-uppercase text-muted mb-4"
        >
          ABOUT
        </motion.div>

        {/* Section heading — display-lg */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-ink mb-16 max-w-[850px]"
        >
          BUILDING WITH PRECISION & PURPOSE
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left — bio text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <p className="body-light text-base md:text-lg mb-6 text-body leading-relaxed">
              I am a Computer Science student and a passionate Java developer based in India.
              I currently serve as the Java Coordinator for my college club, devup —
              organizing workshops, mentoring peers, and fostering a collaborative
              development culture.
            </p>
            <p className="body-light text-base md:text-lg mb-10 text-body leading-relaxed">
              I specialize in building robust backend systems and enjoy exploring
              new technologies. I am constantly expanding my skill set to bridge
              the gap between software development and seamless operational deployment.
            </p>

            {/* Spec Cells Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-soft p-5 border border-hairline-strong hover:border-hairline transition-all duration-300">
                <div className="text-ink font-bold text-2xl mb-1">JAVA</div>
                <div className="label-uppercase text-[11px] text-muted">PRIMARY LANGUAGE</div>
              </div>
              <div className="bg-surface-soft p-5 border border-hairline-strong hover:border-hairline transition-all duration-300">
                <div className="text-ink font-bold text-2xl mb-1">DEVUP</div>
                <div className="label-uppercase text-[11px] text-muted">CLUB COORDINATOR</div>
              </div>
              <div className="bg-surface-soft p-5 border border-hairline-strong hover:border-hairline transition-all duration-300">
                <div className="text-ink font-bold text-2xl mb-1">SPRING</div>
                <div className="label-uppercase text-[11px] text-muted">BOOT FRAMEWORK</div>
              </div>
              <div className="bg-surface-soft p-5 border border-hairline-strong hover:border-hairline transition-all duration-300">
                <div className="text-ink font-bold text-2xl mb-1">DEVOPS</div>
                <div className="label-uppercase text-[11px] text-muted">CURRENTLY LEARNING</div>
              </div>
            </div>
          </motion.div>

          {/* Right — Interactive Leadership & Milestones Card */}
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
                <Cpu size={16} className="text-m-blue-dark" />
                EXPERIENCE & LEADERSHIP TRACK
              </div>
              <span className="text-[11px] label-uppercase text-muted">[ TRACK ]</span>
            </div>

            <div className="space-y-4">
              {milestones.map((item, idx) => {
                const IconComponent = item.icon
                const isActive = activeMilestone === idx

                return (
                  <div
                    key={item.role}
                    onClick={() => setActiveMilestone(idx)}
                    className={`p-5 border cursor-pointer transition-all duration-300 relative ${
                      isActive
                        ? "bg-surface-card border-hairline"
                        : "bg-canvas border-hairline-strong hover:border-hairline-strong/80 opacity-75 hover:opacity-100"
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
                          className={isActive ? "text-m-blue-dark" : "text-muted"}
                        />
                        <h4 className="text-ink font-bold text-base uppercase tracking-tight">
                          {item.role}
                        </h4>
                      </div>
                      <span className="text-[11px] label-uppercase text-muted shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs label-uppercase text-m-blue-dark mb-2">
                      {item.org}
                    </div>

                    <p className="body-light text-xs text-body leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
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

