import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { CaretRightIcon, SparkleIcon } from "@phosphor-icons/react"
import TechStack from "./TechStack"
import HeroScene3D from "./three/HeroScene3D"
import BackgroundCanvas3D from "./three/BackgroundCanvas3D"
import MagneticButton from "./gsap/MagneticButton"
import TextScramble from "./gsap/TextScramble"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const dynamicMessages = [
  { prefix: "I craft", highlight: "scalable" },
  { prefix: "I engineer", highlight: "resilient" },
  { prefix: "I build", highlight: "distributed" },
  { prefix: "I architect", highlight: "real-time" },
  { prefix: "I develop", highlight: "high-performance" },
]

const phraseVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Hero() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % dynamicMessages.length)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="max-w-5xl mx-auto px-6 pt-12 sm:pt-16 pb-12 relative overflow-visible">
      {/* Three.js Ambient Particle Constellation Background */}
      <BackgroundCanvas3D className="opacity-70 dark:opacity-85" />

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center mb-8">
          {/* Left Column: Hero Content & Bio */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Profile Avatar & Live Status Badge */}
            <motion.div variants={item} className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative w-fit">
                <img
                  src="/profile.jpg"
                  alt="Varun Kushwah"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-center shadow-xl shadow-pink-500/10 hover:scale-105 transition-transform duration-300 bg-black"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-canvas" />
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-hairline bg-surface-card/90 backdrop-blur-sm text-xs text-body-strong shadow-sm w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Available for internships &amp; new opportunities</span>
              </div>
            </motion.div>

            {/* Main 2-line Heading with GSAP Text Scramble */}
            <motion.div variants={item} className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight leading-[1.15]">
                Hi, I'm{" "}
                <span className="text-ink hover:text-emerald-500 dark:hover:text-emerald-400 inline-block transition-colors duration-300 cursor-pointer">
                  <TextScramble text="Varun Kushwah" trigger="both" duration={0.65} />
                </span>
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-body-strong tracking-tight mt-1">
                Software Developer
              </h2>
            </motion.div>

            {/* Bio sentence with dynamic rotating highlighted phrase */}
            <motion.p
              variants={item}
              className="text-body text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
            >
              <motion.span
                layout
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-baseline align-baseline relative"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={messageIndex}
                    variants={phraseVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="inline-flex items-baseline gap-1.5 whitespace-nowrap"
                  >
                    <span>{dynamicMessages[messageIndex].prefix}</span>
                    <span className="text-emerald-500 dark:text-emerald-300 font-medium underline decoration-emerald-500/70 decoration-wavy decoration-1 underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-200 transition-colors cursor-default">
                      {dynamicMessages[messageIndex].highlight}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </motion.span>{" "}
              things with code. <strong>Java Coordinator</strong> at{" "}
              <a
                href="https://devup.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-strong font-semibold hover:text-accent underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-emerald-500 transition-colors inline-flex items-center gap-0.5"
              >
                <span>devup</span>
                <SparkleIcon size={12} className="text-emerald-600 dark:text-emerald-400 inline" />
              </a>
              , building resilient backend systems with <strong>Java &amp; Spring Boot</strong>, and exploring real-time <strong>WebRTC</strong> protocols.
            </motion.p>

            {/* Discover more button with GSAP Magnetic Interaction */}
            <motion.div variants={item} className="mb-4">
              <MagneticButton strength={0.35}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-hairline hover:border-emerald-500/50 dark:hover:border-emerald-400/50 bg-surface-card hover:bg-surface-elevated text-ink hover:text-emerald-500 dark:hover:text-emerald-400 text-xs sm:text-sm font-medium transition-all duration-200 group shadow-xs hover:shadow-sm"
                >
                  <span>Discover more</span>
                  <CaretRightIcon
                    size={13}
                    weight="bold"
                    className="group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-200"
                  />
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column: Three.js Interactive 3D WebRTC Distributed Mesh Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex items-center justify-center"
          >
            <div className="w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none h-[340px] sm:h-[380px] lg:h-[400px] bg-surface-card/40 backdrop-blur-xs border border-hairline/80 rounded-2xl p-1.5 shadow-sm hover:shadow-md transition-all">
              <HeroScene3D />
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
