import { useState } from "react"
import { Mail, ArrowRight, Copy, Check, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* Simple Icons SVGs */
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
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const emailAddress = "varun.kush3@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 4000)
  }

  return (
    <section
      id="contact"
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
          CONNECT
        </motion.div>

        {/* Section heading — display-md */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-6 max-w-[700px]"
        >
          LET'S BUILD SOMETHING TOGETHER
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Left Column — Info & Quick Action Buttons */}
          <div className="lg:col-span-6">
            <p
              className="body-light mb-8 max-w-[550px] text-body text-base md:text-lg"
              style={{ lineHeight: 1.7 }}
            >
              I'm always interested in hearing about new engineering projects and software opportunities.
              Whether you want to collaborate on a backend system or discuss technology, feel free to reach out.
            </p>

            {/* Email Box with One-Click Copy */}
            <div className="bg-canvas border border-hairline p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="label-uppercase text-muted text-[11px] mb-1">DIRECT EMAIL</div>
                <div className="text-ink font-bold text-base md:text-lg select-all font-mono">
                  {emailAddress}
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="btn-text inline-flex items-center gap-2 text-ink bg-surface-card border border-hairline px-4 py-2 hover:bg-surface-elevated transition-colors text-xs shrink-0 cursor-pointer"
                style={{ borderRadius: "0px" }}
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                {copied ? "COPIED!" : "COPY EMAIL"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href={`mailto:${emailAddress}`}
                className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-ink px-8 hover:bg-ink hover:text-canvas transition-colors duration-200"
                style={{ height: "48px", borderRadius: "0px" }}
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
                style={{ height: "48px", borderRadius: "0px" }}
              >
                <LinkedInIcon size={16} />
                LINKEDIN
              </a>
            </div>

            {/* Social icon buttons */}
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
                href={`mailto:${emailAddress}`}
                className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Right Column — Interactive Quick Contact Form */}
          <div className="lg:col-span-6 bg-canvas border border-hairline-strong p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
              <div className="label-uppercase text-ink">QUICK TRANSMISSION</div>
              <span className="text-[11px] label-uppercase text-muted">[ FORM ]</span>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-surface-soft border border-hairline p-8 text-center py-12"
                >
                  <div className="w-12 h-12 bg-surface-card rounded-full flex items-center justify-center mx-auto mb-4 text-success border border-hairline">
                    <Check size={24} />
                  </div>
                  <h4 className="text-ink font-bold text-xl uppercase mb-2">TRANSMISSION RECEIVED</h4>
                  <p className="body-light text-sm text-body">
                    Thank you for reaching out. Your message has been logged successfully.
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block label-uppercase text-muted text-xs mb-2">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-card text-ink border border-hairline-strong px-4 py-3 text-sm focus:border-ink focus:outline-none transition-colors"
                      style={{ borderRadius: "0px", height: "48px" }}
                    />
                  </div>

                  <div>
                    <label className="block label-uppercase text-muted text-xs mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-card text-ink border border-hairline-strong px-4 py-3 text-sm focus:border-ink focus:outline-none transition-colors"
                      style={{ borderRadius: "0px", height: "48px" }}
                    />
                  </div>

                  <div>
                    <label className="block label-uppercase text-muted text-xs mb-2">MESSAGE / PROJECT SPEC</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your project, inquiry, or collaboration idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-surface-card text-ink border border-hairline-strong p-4 text-sm focus:border-ink focus:outline-none transition-colors resize-none"
                      style={{ borderRadius: "0px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-text w-full inline-flex items-center justify-center gap-3 text-ink bg-transparent border border-ink py-4 hover:bg-ink hover:text-canvas transition-colors duration-200 cursor-pointer"
                    style={{ borderRadius: "0px" }}
                  >
                    <Send size={16} />
                    TRANSMIT MESSAGE
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

