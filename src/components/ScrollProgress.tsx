import { motion, useScroll, useSpring } from "framer-motion"

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(to right, #10b981, #34d399, #38bdf8)",
      }}
    />
  )
}

export default ScrollProgress
