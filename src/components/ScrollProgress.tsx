import React from "react"
import { motion, useScroll } from "framer-motion"

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left pointer-events-none will-change-transform"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #10b981 0%, #34d399 50%, #38bdf8 100%)",
        transformOrigin: "0%",
        transform: "translateZ(0)",
      }}
    />
  )
}

export default ScrollProgress
