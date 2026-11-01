import { motion } from "framer-motion"

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center relative select-none"
    >
      {/* Top indeterminate glowing loading line */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-50 overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          initial={{ x: "-100%", width: "40%" }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Subtle central loader ring */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border border-hairline opacity-30" />
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent dark:border-emerald-400 dark:border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        </div>
        <span className="text-xs font-mono tracking-wider text-body-muted uppercase">
          Loading...
        </span>
      </div>
    </div>
  )
}
