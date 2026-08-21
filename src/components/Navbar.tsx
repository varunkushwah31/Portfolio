import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { List, X, SpeakerHigh, SpeakerSlash, TerminalWindow, FileText } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { sound } from "@/lib/sound"

const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Contact", href: "/#contact", id: "contact" },
]

interface NavbarProps {
  onOpenCommandPalette?: () => void
  onOpenResume?: () => void
}

const Navbar = ({ onOpenCommandPalette, onOpenResume }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled())
  const location = useLocation()
  const isHome = location.pathname === "/"

  const closeMenu = () => setMobileMenuOpen(false)

  const toggleSound = () => {
    const newState = sound.toggle()
    setSoundEnabled(newState)
  }

  // Track scroll position to add header border / backdrop density
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver for active link highlighting on Home
  useEffect(() => {
    if (!isHome) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sectionIds = ["about", "skills", "projects", "contact"]
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome])

  const handleNavClick = (href: string) => {
    sound.click()
    closeMenu()
    if (isHome) {
      const hash = href.replace("/", "")
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <nav
      id="top-nav"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/92 backdrop-blur-md border-b border-hairline"
          : "bg-canvas border-b border-hairline-strong"
      }`}
      style={{ height: "64px" }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 h-full">
        {/* Logo / Name with M-tricolor accent */}
        <Link
          to="/"
          onClick={() => sound.click()}
          className="label-uppercase text-ink hover:text-body-strong transition-colors duration-200 flex items-center gap-3 group select-none"
        >
          <span className="w-[3px] h-4 bg-gradient-to-b from-m-blue-light via-m-blue-dark to-m-red transform group-hover:scale-y-125 transition-transform duration-300" />
          <span className="tracking-[1.5px] font-bold">VARUN KUSHWAH</span>
        </Link>

        {/* Desktop Nav Links & Action Controls */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = isHome && activeSection === link.id
            return isHome ? (
              <a
                key={link.href}
                href={link.href.replace("/", "")}
                onMouseEnter={() => sound.hover()}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`relative py-2 nav-link text-xs lg:text-sm uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-ink font-bold" : "text-body hover:text-ink"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavStripe"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onMouseEnter={() => sound.hover()}
                onClick={() => sound.click()}
                className="relative py-2 nav-link text-xs lg:text-sm uppercase tracking-wider text-body hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          })}

          {/* Audio FX Toggle Button */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.hover()}
            className={`p-2 border transition-colors cursor-pointer flex items-center justify-center ${
              soundEnabled
                ? "bg-surface-elevated text-m-blue-light border-m-blue-light/50"
                : "bg-surface-soft text-muted border-hairline hover:text-ink"
            }`}
            style={{ borderRadius: "0px", height: "34px", width: "34px" }}
            title={soundEnabled ? "Audio telemetry active (Click to mute)" : "Enable tactile audio telemetry"}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <SpeakerHigh size={15} /> : <SpeakerSlash size={15} />}
          </button>

          {/* Quick Command HUD Button */}
          {onOpenCommandPalette && (
            <button
              onClick={() => {
                sound.openModal()
                onOpenCommandPalette()
              }}
              onMouseEnter={() => sound.hover()}
              className="btn-text px-2.5 py-1.5 bg-surface-soft hover:bg-surface-elevated text-muted hover:text-ink border border-hairline text-[11px] font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              style={{ borderRadius: "0px" }}
              title="Open Command Palette (Cmd + K)"
            >
              <span>⌘K</span>
              <span className="hidden lg:inline">COMMAND</span>
            </button>
          )}

          {/* Resume Spec Button */}
          {onOpenResume && (
            <button
              onClick={() => {
                sound.openModal()
                onOpenResume()
              }}
              onMouseEnter={() => sound.hover()}
              className="btn-text px-4 py-2 bg-ink text-canvas hover:bg-body-strong text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              style={{ borderRadius: "0px" }}
            >
              <FileText size={13} />
              <span>CV / RESUME</span>
            </button>
          )}
        </div>

        {/* Mobile Right Cluster */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleSound}
            className={`p-2 border font-mono text-xs ${
              soundEnabled
                ? "bg-surface-elevated text-m-blue-light border-m-blue-light/50"
                : "bg-surface-soft text-muted border-hairline"
            }`}
            style={{ borderRadius: "0px", height: "38px", width: "38px" }}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <SpeakerHigh size={16} /> : <SpeakerSlash size={16} />}
          </button>

          {onOpenCommandPalette && (
            <button
              onClick={() => {
                sound.openModal()
                onOpenCommandPalette()
              }}
              className="px-2.5 py-1.5 bg-surface-soft text-ink border border-hairline font-mono text-xs inline-flex items-center gap-1"
              style={{ borderRadius: "0px", height: "38px" }}
            >
              <TerminalWindow size={14} className="text-m-blue-light" />
              <span>⌘K</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.click()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="p-2 text-ink bg-surface-soft border border-hairline cursor-pointer focus:outline-none flex items-center justify-center"
            style={{ borderRadius: "0px", height: "38px", width: "38px" }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-[64px] z-40 bg-canvas/98 backdrop-blur-lg flex flex-col justify-between"
          >
            {/* M Stripe at top of mobile menu */}
            <div className="m-stripe shrink-0" />

            <div className="flex flex-col px-6 pt-8 gap-6 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                >
                  {isHome ? (
                    <a
                      href={link.href.replace("/", "")}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className="text-ink text-2xl font-bold uppercase tracking-tight hover:text-m-blue-dark transition-colors duration-200 flex items-center justify-between group py-2 border-b border-hairline-strong"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs label-uppercase text-muted font-mono">
                        [ 0{idx + 1} ]
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => {
                        sound.click()
                        closeMenu()
                      }}
                      className="text-ink text-2xl font-bold uppercase tracking-tight hover:text-m-blue-dark transition-colors duration-200 flex items-center justify-between py-2 border-b border-hairline-strong"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs label-uppercase text-muted font-mono">
                        [ 0{idx + 1} ]
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile Actions Drawer */}
              <div className="pt-6 space-y-3">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      closeMenu()
                      sound.openModal()
                      onOpenResume()
                    }}
                    className="btn-text w-full py-3.5 bg-ink text-canvas font-bold text-xs flex items-center justify-center gap-2"
                    style={{ borderRadius: "0px" }}
                  >
                    <FileText size={15} /> VIEW CV / RESUME SPEC
                  </button>
                )}
                {onOpenCommandPalette && (
                  <button
                    onClick={() => {
                      closeMenu()
                      sound.openModal()
                      onOpenCommandPalette()
                    }}
                    className="btn-text w-full py-3.5 bg-surface-card border border-hairline text-ink text-xs flex items-center justify-center gap-2"
                    style={{ borderRadius: "0px" }}
                  >
                    <TerminalWindow size={15} className="text-m-blue-light" /> COMMAND HUD (⌘K)
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Footer Strip */}
            <div className="p-6 bg-surface-soft border-t border-hairline flex items-center justify-between text-xs font-mono text-muted">
              <span>VARUN KUSHWAH · DEVUP</span>
              <span className="text-m-blue-light font-bold">BMW M SPEC</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
