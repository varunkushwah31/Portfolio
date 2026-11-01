import { useState, useEffect, lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MobileBottomNav from "./components/MobileBottomNav"
import PageLoader from "./components/PageLoader"

// Dynamic route-level code splitting
const Home = lazy(() => import("./Pages/Home"))
const About = lazy(() => import("./Pages/About"))
const ProjectsPage = lazy(() => import("./Pages/ProjectsPage"))
const ResumePage = lazy(() => import("./Pages/ResumePage"))
const ProjectDetail = lazy(() => import("./Pages/ProjectDetail"))
const TechStackPage = lazy(() => import("./Pages/TechStackPage"))
const NotFound = lazy(() => import("./Pages/NotFound"))

// Dynamic modal code splitting
const CommandPalette = lazy(() => import("./components/CommandPalette"))
const RecruiterQuickPitchModal = lazy(() => import("./components/RecruiterQuickPitchModal"))

function AppRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="grow flex flex-col w-full">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          <Route path="/stack" element={<TechStackPage />} />
          <Route path="/uses" element={<TechStackPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [recruiterPitchOpen, setRecruiterPitchOpen] = useState(false)

  // Listen for global keyboard shortcut and custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
    }

    const handleOpenCommandPalette = () => setCommandPaletteOpen(true)
    const handleOpenRecruiterPitch = () => setRecruiterPitchOpen(true)

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("open-command-palette", handleOpenCommandPalette)
    window.addEventListener("open-recruiter-pitch", handleOpenRecruiterPitch)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("open-command-palette", handleOpenCommandPalette)
      window.removeEventListener("open-recruiter-pitch", handleOpenRecruiterPitch)
    }
  }, [])

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between relative transition-colors duration-200">
      {/* Subtle & blurry background grid overlay */}
      <div className="fixed -inset-2 pointer-events-none z-0 bg-grid-fade" />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="grow flex flex-col w-full pb-20 md:pb-0">
          <AppRoutes />
        </main>
        <Footer />
      </div>

      {/* Mobile Floating App Tab Bar */}
      <MobileBottomNav onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Global Command Palette (Loaded on demand) */}
      <Suspense fallback={null}>
        {commandPaletteOpen && (
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />
        )}
      </Suspense>

      {/* Global Recruiter 30s Quick Pitch Modal (Loaded on demand) */}
      <Suspense fallback={null}>
        {recruiterPitchOpen && (
          <RecruiterQuickPitchModal
            isOpen={recruiterPitchOpen}
            onClose={() => setRecruiterPitchOpen(false)}
          />
        )}
      </Suspense>
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
