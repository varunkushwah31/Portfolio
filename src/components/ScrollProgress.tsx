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
      className="fixed top-0 left-0 right-0 h-[4px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, var(--color-m-blue-light) 0%, var(--color-m-blue-light) 33.33%, var(--color-m-blue-dark) 33.33%, var(--color-m-blue-dark) 66.66%, var(--color-m-red) 66.66%, var(--color-m-red) 100%)",
      }}
    />
  )
}

export default ScrollProgress
