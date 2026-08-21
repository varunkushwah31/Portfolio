import MStripe from "./MStripe"
import { sound } from "@/lib/sound"

const footerLinks = {
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ],
  projects: [
    { label: "LeetcodeTracker", href: "/project/leetcode-tracker" },
    { label: "MangoShare Clone", href: "/project/mangoshare-clone" },
    { label: "System Health Dashboard", href: "/project/system-health-dashboard" },
    { label: "Disease Prediction", href: "/project/disease-prediction" },
    { label: "Daily Quotes App", href: "/project/daily-quotes-app" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/varunkushwah31" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/varun-kushwah/" },
    { label: "Email Transmission", href: "mailto:varun.kush3@gmail.com" },
  ],
}

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-canvas">
      {/* M Stripe divider at top of footer per DESIGN.md */}
      <MStripe />

      <div
        className="max-w-[1440px] mx-auto px-6"
        style={{ paddingTop: "64px", paddingBottom: "64px" }}
      >
        {/* Footer 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div>
            <div className="label-uppercase text-ink mb-4 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-m-blue-light" />
              VARUN KUSHWAH
            </div>
            <p
              className="text-body text-sm mb-4"
              style={{
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Computer Science Student & Software Developer.
              Java Coordinator at <strong className="text-body-strong font-normal">devup</strong>.
            </p>
            <div className="font-mono text-xs text-muted space-y-1">
              <div>LOCATION: INDIA</div>
              <div>TIMEZONE: UTC+5:30 (IST)</div>
              <div className="text-success flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full" />
                STATUS: AVAILABLE
              </div>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <div className="label-uppercase text-muted mb-4 text-xs tracking-[1.5px]">
              NAVIGATION
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => sound.click()}
                    className="text-body hover:text-ink transition-colors duration-200 text-sm"
                    style={{ fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects column */}
          <div>
            <div className="label-uppercase text-muted mb-4 text-xs tracking-[1.5px]">
              REPOSITORIES & SPECS
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.projects.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => sound.click()}
                    className="text-body hover:text-ink transition-colors duration-200 text-sm"
                    style={{ fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <div className="label-uppercase text-muted mb-4 text-xs tracking-[1.5px]">
              CONNECTIVITY
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => sound.click()}
                    className="text-body hover:text-ink transition-colors duration-200 text-sm"
                    style={{ fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Telemetry & Copyright Divider */}
        <div className="border-t border-hairline pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-muted text-xs font-mono">
            <p className="caption text-muted">
              © {year} VARUN KUSHWAH · ALL RIGHTS RESERVED
            </p>
            <p className="caption text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-m-blue-light" />
              <span>BUILT WITH REACT 19, TYPESCRIPT & TAILWIND CSS v4</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
