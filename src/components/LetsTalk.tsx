import { useState } from "react"
import { motion } from "framer-motion"
import { RocketLaunchIcon, CaretRightIcon, EnvelopeSimpleIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react"

export default function LetsTalk() {
  const [copied, setCopied] = useState(false)
  const email = "varun.kush3@gmail.com"

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="py-12"
    >
      <motion.div
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 20 } }}
        className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6 sm:p-8 relative overflow-hidden group shadow-xl hover:border-zinc-500 hover:shadow-[0_15px_35px_-10px_rgba(255,255,255,0.06)] transition-all duration-300"
      >
        {/* Subtle breathing ambient background glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none animate-[pulse-slow_5s_ease-in-out_infinite]" />

        {/* Header row with launching rocket */}
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-full bg-[#27272a] flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-inner group-hover:bg-[#323238] transition-colors">
            <RocketLaunchIcon
              size={22}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-6"
            />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg sm:text-xl tracking-tight group-hover:text-zinc-100 transition-colors">
              Let's work together
            </h3>
            <span className="text-xs text-emerald-400 font-medium">Available for new opportunities</span>
          </div>
        </div>

        {/* Body paragraph */}
        <p className="text-[#9ca3af] text-sm sm:text-[15px] leading-relaxed mt-4 mb-6 max-w-2xl font-normal relative z-10">
          I'm open for software developer roles, internships, and high-impact engineering collaborations. Feel free to reach out directly, and let's discuss how we can build something amazing together!
        </p>

        {/* CTA Buttons with Spring Hover */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <motion.div
            whileHover={{ scale: 1.04, x: 2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <a
              href={`mailto:${email}?subject=Project%20Inquiry%20%2F%20Collaboration%20-%20Varun%20Kushwah&body=Hi%20Varun%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding...`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3f3f46] hover:border-[#71717a] bg-[#09090b] hover:bg-[#121215] text-white text-sm font-medium transition-all duration-150 shadow-[0_2px_0_0_rgba(255,255,255,0.15)] hover:shadow-none"
            >
              <EnvelopeSimpleIcon size={16} weight="bold" />
              <span>Get in touch</span>
              <CaretRightIcon size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#27272a] hover:border-zinc-500 bg-[#141414] text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <CheckIcon size={15} weight="bold" className="text-emerald-400" />
                <span className="text-emerald-400">Copied {email}</span>
              </>
            ) : (
              <>
                <CopyIcon size={15} />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  )
}
