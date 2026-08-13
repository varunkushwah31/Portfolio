import { useState, useEffect } from "react"
import ScrollProgress from "@/components/ScrollProgress"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import MStripe from "@/components/MStripe"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CommandPalette from "@/components/CommandPalette"
import ResumeModal from "@/components/ResumeModal"

const Home = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [resumeModalOpen, setResumeModalOpen] = useState(false)

  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true)
    window.addEventListener("open-command-palette", handleOpenPalette)
    return () => window.removeEventListener("open-command-palette", handleOpenPalette)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
      <main className="overflow-hidden">
        <Hero onOpenResume={() => setResumeModalOpen(true)} />
        <MStripe />
        <About />
        <MStripe />
        <Skills />
        <MStripe />
        <Projects />
        <MStripe />
        <Contact />
      </main>
      <Footer />

      {/* Global Engineering Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  )
}

export default Home
