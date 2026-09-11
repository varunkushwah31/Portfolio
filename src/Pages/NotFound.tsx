import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { HouseIcon, FolderIcon } from "@phosphor-icons/react"
import { usePageTitle } from "@/hooks/usePageTitle"

export default function NotFound() {
  usePageTitle("Page Not Found")

  return (
    <div className="min-h-[72vh] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline bg-surface-card text-xs text-muted font-mono mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>404 · Error</span>
        </div>

        {/* Big 404 text */}
        <h1 className="text-6xl sm:text-7xl font-bold text-ink tracking-tight mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-ink mb-3 tracking-tight">
          Page not found
        </h2>

        <p className="text-sm sm:text-base text-muted font-normal leading-relaxed mb-8">
          The page you're looking for doesn't exist, has been removed, or was relocated.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-canvas hover:opacity-90 text-sm font-medium transition-all shadow-xs"
            >
              <HouseIcon size={16} weight="bold" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-hairline bg-surface-card hover:bg-surface-elevated text-ink text-sm font-medium transition-all shadow-xs"
            >
              <FolderIcon size={16} weight="bold" />
              <span>Browse Projects</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
