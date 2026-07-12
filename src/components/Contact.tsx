import { Mail, ArrowRight } from "lucide-react"

/* Simple Icons SVGs — lucide-react brand icons are deprecated (see lucide #670) */
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full bg-surface-soft"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <div className="label-uppercase text-muted mb-4">
          CONNECT
        </div>

        {/* Section heading — display-md */}
        <h3 className="text-ink mb-6 max-w-[700px]">
          LET'S BUILD SOMETHING TOGETHER
        </h3>

        {/* Body text */}
        <p
          className="body-light mb-12 max-w-[550px]"
          style={{ lineHeight: 1.7 }}
        >
          I'm always interested in hearing about new projects and opportunities.
          Whether you want to collaborate on a project or just have a conversation
          about technology, feel free to reach out.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="mailto:varun.kush3@gmail.com"
            className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-ink px-8 hover:bg-ink hover:text-canvas transition-colors duration-200"
            style={{ height: "48px" }}
          >
            <Mail size={16} strokeWidth={2} />
            SEND EMAIL
            <ArrowRight size={14} strokeWidth={2} />
          </a>
          <a
            href="https://www.linkedin.com/in/varun-kushwah/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-hairline px-8 hover:border-ink transition-colors duration-200"
            style={{ height: "48px" }}
          >
            <LinkedInIcon size={16} />
            LINKEDIN
          </a>
        </div>

        {/* Social icon buttons — button-icon spec: 48×48, rounded-full */}
        <div className="flex gap-4">
          <a
            href="https://github.com/varunkushwah31"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated transition-colors duration-200"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/varun-kushwah/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href="mailto:varun.kush3@gmail.com"
            className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
