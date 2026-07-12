const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-canvas"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <div className="label-uppercase text-muted mb-4">
          ABOUT
        </div>

        {/* Section heading — display-lg */}
        <h2 className="text-ink mb-12 max-w-[800px]">
          BUILDING WITH PRECISION
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — bio text */}
          <div>
            <p className="body-light mb-6" style={{ lineHeight: 1.7 }}>
              I am a Computer Science student and a passionate Java developer based in India.
              I currently serve as the Java Coordinator for my college club, devup —
              organizing workshops, mentoring peers, and fostering a collaborative
              development culture.
            </p>
            <p className="body-light" style={{ lineHeight: 1.7 }}>
              I specialize in building robust backend systems and enjoy exploring
              new technologies. I am constantly expanding my skill set to bridge
              the gap between software development and seamless operational deployment.
            </p>
          </div>

          {/* Right — spec cells for key facts */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="bg-surface-soft p-6"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="text-ink mb-2"
                style={{
                  fontSize: "var(--font-size-display-sm)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                JAVA
              </div>
              <div className="label-uppercase text-muted">
                PRIMARY LANGUAGE
              </div>
            </div>

            <div
              className="bg-surface-soft p-6"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="text-ink mb-2"
                style={{
                  fontSize: "var(--font-size-display-sm)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                DEVUP
              </div>
              <div className="label-uppercase text-muted">
                CLUB COORDINATOR
              </div>
            </div>

            <div
              className="bg-surface-soft p-6"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="text-ink mb-2"
                style={{
                  fontSize: "var(--font-size-display-sm)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                SPRING
              </div>
              <div className="label-uppercase text-muted">
                BOOT FRAMEWORK
              </div>
            </div>

            <div
              className="bg-surface-soft p-6"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="text-ink mb-2"
                style={{
                  fontSize: "var(--font-size-display-sm)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                DEVOPS
              </div>
              <div className="label-uppercase text-muted">
                CURRENTLY LEARNING
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
