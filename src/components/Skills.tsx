const skills = [
  { value: "JAVA", label: "CORE LANGUAGE" },
  { value: "SPRING", label: "FRAMEWORK" },
  { value: "SPRING BOOT", label: "BACKEND" },
  { value: "REACT", label: "FRONTEND" },
  { value: "FLUTTER", label: "MOBILE" },
  { value: "DEVOPS", label: "LEARNING" },
  { value: "WEBRTC", label: "REAL-TIME" },
  { value: "GIT", label: "VERSION CONTROL" },
]

const interests = [
  { value: "LOCAL AI", label: "IMPLEMENTATIONS" },
  { value: "ML", label: "MACHINE LEARNING" },
  { value: "SYSTEMS", label: "MONITORING" },
]

const Skills = () => {
  return (
    <section
      id="skills"
      className="w-full bg-surface-soft"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <div className="label-uppercase text-muted mb-4">
          CAPABILITIES
        </div>

        {/* Section heading */}
        <h2 className="text-ink mb-16">
          TECHNICAL STACK
        </h2>

        {/* Primary skills — spec-cell grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {skills.map((skill) => (
            <div
              key={skill.value}
              className="bg-canvas p-6 border border-hairline-strong hover:border-hairline transition-colors duration-200"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="text-ink mb-3"
                style={{
                  fontSize: "var(--font-size-display-sm)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  textTransform: "uppercase" as const,
                }}
              >
                {skill.value}
              </div>
              <div className="label-uppercase text-muted">
                {skill.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-hairline mb-16" />

        {/* Interests — secondary grid */}
        <div className="label-uppercase text-muted mb-8">
          OTHER INTERESTS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {interests.map((interest) => (
            <div
              key={interest.value}
              className="bg-canvas p-6 border border-hairline-strong"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
