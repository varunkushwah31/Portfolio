import MStripe from "./MStripe"

const footerLinks = {
  navigation: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  projects: [
    { label: "LeetcodeTracker", href: "#projects" },
    { label: "MangoShare Clone", href: "#projects" },
    { label: "System Health Dashboard", href: "#projects" },
    { label: "Disease Prediction", href: "#projects" },
    { label: "Daily Quotes App", href: "#projects" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Email", href: "mailto:your.email@example.com" },
  ],
}

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-canvas">
      {/* M Stripe divider at top of footer */}
      <MStripe />

      <div
        className="max-w-[1440px] mx-auto px-6"
        style={{ paddingTop: "64px", paddingBottom: "64px" }}
      >
        {/* Footer columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div>
            <div className="label-uppercase text-ink mb-6">
              VARUN KUSHWAH
            </div>
            <p
              className="text-body"
              style={{
                fontSize: "var(--font-size-body-sm)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Computer Science Student & Software Developer.
              Java Coordinator at devup.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <div className="label-uppercase text-muted mb-6">
              NAVIGATION
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body hover:text-ink transition-colors duration-200"
                    style={{
                      fontSize: "var(--font-size-body-sm)",
                      fontWeight: 300,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects column */}
          <div>
            <div className="label-uppercase text-muted mb-6">
              PROJECTS
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.projects.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body hover:text-ink transition-colors duration-200"
                    style={{
                      fontSize: "var(--font-size-body-sm)",
                      fontWeight: 300,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <div className="label-uppercase text-muted mb-6">
              SOCIAL
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-body hover:text-ink transition-colors duration-200"
                    style={{
                      fontSize: "var(--font-size-body-sm)",
                      fontWeight: 300,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-hairline pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="caption">
              © {year} Varun Kushwah. All rights reserved.
            </p>
            <p className="caption">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
