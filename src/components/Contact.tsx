import { EnvelopeSimpleIcon, ArrowRightIcon, CopyIcon, CheckIcon, PaperPlaneTiltIcon, CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { sound } from "@/lib/sound"
import { LeetCodeIcon } from "@/components/TechIcons"
import { useClipboardMachine, useContactFormMachine } from "@/hooks"

/* Simple Icons SVGs */
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="presentation">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="presentation">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const Contact = () => {
  const emailAddress = "varun.kush3@gmail.com"
  const clipboard = useClipboardMachine({ duration: 2500 })
  const formMachine = useContactFormMachine({ resetDelay: 4500 })

  const handleCopyEmail = () => {
    sound.click()
    void clipboard.copy(emailAddress)
  }

  return (
    <section
      id="contact"
      className="w-full bg-surface-soft relative border-b border-hairline-strong"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-360 mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="label-uppercase text-muted text-xs tracking-[3px]">
            [ SECTION // 04 ]
          </span>
          <span className="text-hairline">|</span>
          <span className="label-uppercase text-m-blue-light text-xs tracking-[1.5px] font-bold">
            DIRECT TRANSMISSION & INQUIRIES
          </span>
        </motion.div>

        {/* Section heading — display-md */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-6 max-w-175"
        >
          LET'S BUILD SOMETHING EXTRAORDINARY
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Left Column — Info & Direct Connect */}
          <div className="lg:col-span-6 space-y-8">
            <p className="body-light max-w-140 text-body text-base md:text-lg leading-relaxed">
              I am open to software engineering internships, junior developer roles, and high-impact backend engineering projects. Whether you want to discuss Java/Spring architecture, WebRTC real-time systems, or collaborate on a codebase, let's connect.
            </p>

            {/* Email Box with One-Click Copy */}
            <div className="bg-canvas border border-hairline p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="label-uppercase text-muted text-[11px] mb-1">DIRECT TRANSMISSION CHANNEL</div>
                <div className="text-ink font-bold text-base md:text-lg select-all font-mono">
                  {emailAddress}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.hover()}
                className="btn-text inline-flex items-center gap-2 text-ink bg-surface-card border border-hairline px-4 py-2.5 hover:bg-surface-elevated transition-colors text-xs shrink-0 cursor-pointer"
                style={{ borderRadius: "0px" }}
                {...clipboard.triggerProps}
                data-testid="contact-copy-email-btn"
              >
                {clipboard.isCopied ? <CheckIcon size={14} className="text-success" /> : <CopyIcon size={14} />}
                {clipboard.isCopied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${emailAddress}`}
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="btn-text inline-flex items-center gap-3 text-canvas bg-ink px-8 hover:bg-body-strong transition-colors duration-200"
                style={{ height: "48px", borderRadius: "0px" }}
              >
                <EnvelopeSimpleIcon size={16} />
                SEND EMAIL
                <ArrowRightIcon size={14} />
              </a>

              <a
                href="https://www.linkedin.com/in/varun-kushwah/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="btn-text inline-flex items-center gap-3 text-ink bg-transparent border border-hairline px-8 hover:border-ink hover:bg-surface-soft transition-colors duration-200"
                style={{ height: "48px", borderRadius: "0px" }}
              >
                <LinkedInIcon size={16} />
                LINKEDIN
              </a>
            </div>

            {/* Social circular icon buttons per DESIGN.md */}
            <div className="flex items-center gap-4 pt-2">
              <span className="label-uppercase text-muted text-xs mr-2">CHANNELS:</span>
              <a
                href="https://github.com/varunkushwah31"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated border border-hairline transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <GitHubIcon size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/varun-kushwah/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated border border-hairline transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href="https://leetcode.com/u/Varun_Kushwah/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated hover:text-amber-500 border border-hairline transition-colors duration-200"
                aria-label="LeetCode Profile (500+ Solved)"
                title="LeetCode (500+ Solved)"
              >
                <LeetCodeIcon size={20} />
              </a>
              <a
                href={`mailto:${emailAddress}`}
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-12 h-12 flex items-center justify-center bg-surface-card text-ink rounded-full hover:bg-surface-elevated border border-hairline transition-colors duration-200"
                aria-label="Direct Email"
              >
                <EnvelopeSimpleIcon size={20} />
              </a>
            </div>
          </div>

          {/* Right Column — Quick Contact Form */}
          <div
            className="lg:col-span-6 bg-canvas border border-hairline-strong p-6 md:p-8"
            style={{ borderRadius: "0px" }}
            data-state={formMachine.status}
            data-testid="contact-console"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
              <div className="label-uppercase text-ink font-bold">TRANSMISSION CONSOLE</div>
              <span className="text-[11px] label-uppercase text-muted font-mono">[ DIRECT_INPUT ]</span>
            </div>

            <AnimatePresence mode="wait">
              {formMachine.isSuccess ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-surface-soft border border-hairline p-8 text-center py-12"
                  role="status"
                  aria-live="polite"
                  data-state="success"
                >
                  <div className="w-12 h-12 bg-surface-card rounded-full flex items-center justify-center mx-auto mb-4 text-success border border-hairline">
                    <CheckCircleIcon size={26} />
                  </div>
                  <h4 className="text-ink font-bold text-xl uppercase mb-2">TRANSMISSION CONFIRMED</h4>
                  <p className="body-light text-sm text-body leading-relaxed max-w-sm mx-auto">
                    Your message packet has been transmitted. I will respond to your provided email address shortly.
                  </p>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={formMachine.handleSubmit}
                  className="space-y-5"
                  {...formMachine.formProps}
                >
                  {formMachine.isError && formMachine.errorMessage && (
                    <div
                      className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-mono flex items-center gap-2"
                      role="alert"
                      aria-live="assertive"
                    >
                      <WarningCircleIcon size={16} className="shrink-0" />
                      <span>{formMachine.errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block label-uppercase text-muted text-xs mb-2">
                      NAME / IDENTITY <span className="text-m-blue-light">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formMachine.formData.name}
                      onChange={(e) => formMachine.updateField("name", e.target.value)}
                      className="w-full bg-surface-card text-ink border border-hairline-strong px-4 py-3 text-sm focus:border-ink focus:outline-none transition-colors"
                      style={{ borderRadius: "0px", height: "48px" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block label-uppercase text-muted text-xs mb-2">
                      EMAIL ADDRESS <span className="text-m-blue-light">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={formMachine.formData.email}
                      onChange={(e) => formMachine.updateField("email", e.target.value)}
                      className="w-full bg-surface-card text-ink border border-hairline-strong px-4 py-3 text-sm focus:border-ink focus:outline-none transition-colors"
                      style={{ borderRadius: "0px", height: "48px" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block label-uppercase text-muted text-xs mb-2">
                      MESSAGE / PROJECT SPECIFICATION <span className="text-m-blue-light">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Detail your inquiry, engineering requirement, or collaboration opportunity..."
                      value={formMachine.formData.message}
                      onChange={(e) => formMachine.updateField("message", e.target.value)}
                      className="w-full bg-surface-card text-ink border border-hairline-strong p-4 text-sm focus:border-ink focus:outline-none transition-colors resize-none leading-relaxed"
                      style={{ borderRadius: "0px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formMachine.isTransmitting}
                    onMouseEnter={() => sound.hover()}
                    className="btn-text w-full inline-flex items-center justify-center gap-3 text-ink bg-transparent border border-ink py-4 hover:bg-ink hover:text-canvas transition-colors duration-200 cursor-pointer disabled:opacity-50"
                    style={{ borderRadius: "0px", height: "48px" }}
                  >
                    {formMachine.isTransmitting ? (
                      <span className="font-mono text-xs">TRANSMITTING TELEMETRY...</span>
                    ) : (
                      <>
                        <PaperPlaneTiltIcon size={16} />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
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
