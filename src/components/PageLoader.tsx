import { motion } from "framer-motion"

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center relative select-none"
    >
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
