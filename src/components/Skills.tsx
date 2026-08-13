import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillItem {
  value: string
  label: string
  category: "BACKEND" | "FRONTEND & MOBILE" | "SYSTEMS & DEVOPS" | "REALTIME"
  highlight?: boolean
}

const skills: SkillItem[] = [
  { value: "JAVA", label: "CORE LANGUAGE", category: "BACKEND", highlight: true },
  { value: "SPRING", label: "FRAMEWORK", category: "BACKEND", highlight: true },
  { value: "SPRING BOOT", label: "BACKEND", category: "BACKEND", highlight: true },
  { value: "REACT", label: "FRONTEND", category: "FRONTEND & MOBILE" },
  { value: "FLUTTER", label: "MOBILE", category: "FRONTEND & MOBILE" },
  { value: "DEVOPS", label: "LEARNING & CI/CD", category: "SYSTEMS & DEVOPS" },
  { value: "WEBRTC", label: "REAL-TIME P2P", category: "REALTIME" },
  { value: "GIT", label: "SUBTREES & WORKFLOWS", category: "SYSTEMS & DEVOPS" },
]

const interests = [
  { value: "LOCAL AI", label: "IMPLEMENTATIONS" },
  { value: "ML", label: "MACHINE LEARNING" },
  { value: "SYSTEMS", label: "MONITORING" },
]

const categories = ["ALL", "BACKEND", "FRONTEND & MOBILE", "SYSTEMS & DEVOPS", "REALTIME"]

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("ALL")

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === "ALL") return true
    return s.category === activeCategory
  })

  return (
    <section
      id="skills"
      className="w-full bg-surface-soft relative"
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
          CAPABILITIES
        </motion.div>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-12"
        >
          TECHNICAL STACK
        </motion.h2>

        {/* Category Tabs per DESIGN.md */}
        <div className="flex flex-wrap gap-6 border-b border-hairline mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative pb-3 label-uppercase transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-ink font-bold" : "text-body hover:text-ink"
                }`}
                style={{ fontSize: "13px", letterSpacing: "1.5px" }}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Primary skills — spec-cell grid with layout animations */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.value}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={`bg-canvas p-6 border transition-all duration-300 relative group ${
                  skill.highlight
                    ? "border-hairline hover:border-m-blue-dark"
                    : "border-hairline-strong hover:border-hairline"
                }`}
                style={{ borderRadius: "0px" }}
              >
                {skill.highlight && (
                  <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-m-blue-dark rounded-full" />
                )}
                <div
                  className="text-ink mb-3 group-hover:text-m-blue-light transition-colors"
                  style={{
                    fontSize: "var(--font-size-display-sm)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    textTransform: "uppercase" as const,
                  }}
                >
                  {skill.value}
                </div>
                <div className="label-uppercase text-muted flex items-center justify-between">
                  <span>{skill.label}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-hairline mb-16" />

        {/* Interests — secondary grid */}
        <div className="label-uppercase text-muted mb-8">
          OTHER ENGINEERING INTERESTS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {interests.map((interest) => (
            <motion.div
              key={interest.value}
              whileHover={{ y: -2 }}
              className="bg-canvas p-6 border border-hairline-strong hover:border-hairline transition-colors duration-200"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="text-ink mb-3"
                style={{
                  fontSize: "var(--font-size-title-lg)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textTransform: "uppercase" as const,
                }}
              >
                {interest.value}
              </div>
              <div className="label-uppercase text-muted">
                {interest.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

