import { motion } from "framer-motion"
import { RocketLaunchIcon, CaretRightIcon } from "@phosphor-icons/react"

export default function LetsTalk() {
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
        className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6 sm:p-8 relative overflow-hidden group shadow-xl hover:border-violet-500/50 hover:shadow-[0_15px_35px_-10px_rgba(124,58,237,0.2)] transition-all duration-300"
      >
        {/* Subtle breathing ambient background glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-violet-600/15 rounded-full blur-3xl pointer-events-none animate-[pulse-slow_5s_ease-in-out_infinite]" />

        {/* Header row with launching rocket */}
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-full bg-[#353046] flex items-center justify-center text-[#c4b5fd] flex-shrink-0 shadow-inner group-hover:bg-[#433d59] transition-colors">
            <RocketLaunchIcon
              size={22}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-6"
            />
          </div>
          <h3 className="font-bold text-white text-lg sm:text-xl tracking-tight group-hover:text-violet-200 transition-colors">
            Let's work together
          </h3>
        </div>

        {/* Body paragraph */}
        <p className="text-[#9ca3af] text-sm sm:text-[15px] leading-relaxed mt-4 mb-6 max-w-2xl font-normal relative z-10">
          I'm available for freelance projects and would love to explore potential collaborations. Feel free to email me, and let's discuss how we can work together!
        </p>

        {/* CTA Button with Spring Hover */}
        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.04, x: 2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <a
              href="mailto:varun.kush3@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#3f3f46] hover:border-[#71717a] bg-[#09090b] text-white text-sm font-medium transition-all duration-150 shadow-[0_2px_0_0_rgba(255,255,255,0.15)] hover:shadow-none"
            >
              <span>Get in touch</span>
              <CaretRightIcon size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
