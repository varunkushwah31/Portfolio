import { ArrowRight } from "lucide-react"

/* Simple Icons SVG — lucide-react Github is deprecated (see lucide #670) */
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full bg-canvas"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Role badge */}
        <div className="label-uppercase text-m-blue-dark mb-6 tracking-[1.5px]">
          JAVA COORDINATOR · DEVUP
        </div>

        {/* Main headline — display-xl */}
        <h1 className="text-ink mb-6 max-w-[900px]">
          VARUN KUSHWAH
        </h1>

        {/* Sub-headline */}
        <p
          className="text-body-strong max-w-[700px] mb-8"
          style={{
            fontSize: "var(--font-size-title-md)",
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          Computer Science Student & Software Developer
        </p>

        {/* Bio — body-md / weight 300 */}
        <p
          className="body-light max-w-[600px] mb-12"
          style={{ lineHeight: 1.6 }}
        >
          I specialize in building robust backend systems with Java and Spring Boot,
          and enjoy exploring new technologies. Currently bridging the gap between
          software development and seamless operational deployment.
        </p>

        {/* CTA Buttons — button-primary spec */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-ink px-8 hover:bg-ink hover:text-canvas transition-colors duration-200"
            style={{ height: "48px" }}
          >
            VIEW PROJECTS
            <ArrowRight size={16} strokeWidth={2} />
          </a>
          <a
            href="https://github.com/varunkushwah31"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-hairline px-8 hover:border-ink transition-colors duration-200"
            style={{ height: "48px" }}
          >
            <GitHubIcon size={16} />
            GITHUB
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
