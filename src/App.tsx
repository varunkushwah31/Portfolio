import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Home from "./Pages/Home"
import About from "./Pages/About"
import ProjectsPage from "./Pages/ProjectsPage"
import ResumePage from "./Pages/ResumePage"
import ProjectDetail from "./Pages/ProjectDetail"
import TechStackPage from "./Pages/TechStackPage"
import ScrollToTop from "./components/ScrollToTop"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CommandPalette from "./components/CommandPalette"

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" as const } },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          <Route path="/stack" element={<TechStackPage />} />
          <Route path="/uses" element={<TechStackPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  // Listen for global keyboard shortcut and custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
    }

    const handleOpenCustomEvent = () => setCommandPaletteOpen(true)

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("open-command-palette", handleOpenCustomEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("open-command-palette", handleOpenCustomEvent)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-ink flex flex-col justify-between relative">
      {/* Subtle top & bottom fading grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-fade" />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}

export default App
