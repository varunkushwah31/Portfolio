import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { CaretRightIcon, SparkleIcon } from "@phosphor-icons/react"
import TechStack from "./TechStack"

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
    <section className="max-w-4xl mx-auto px-6 pt-16 sm:pt-20 pb-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
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

        {/* Main 2-line Heading */}
        <motion.div variants={item} className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight leading-[1.15]">
            Hi, I'm{" "}
            <span className="text-ink hover:text-emerald-500 dark:hover:text-emerald-400 inline-block transition-colors duration-300 cursor-pointer">
              Varun Kushwah
            </span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-body-strong tracking-tight mt-1">
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

        {/* Discover more button */}
        <motion.div variants={item} className="mb-4">
          <motion.div
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
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
          </motion.div>
        </motion.div>

        {/* Tech Stack Row */}
        <motion.div variants={item}>
          <TechStack />
        </motion.div>
      </motion.div>
    </section>
  )
}
