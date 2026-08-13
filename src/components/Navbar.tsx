import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  const location = useLocation()
  const isHome = location.pathname === "/"

  const closeMenu = () => setMobileMenuOpen(false)

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
    if (!isHome) {
      setActiveSection("")
      return
    }

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
          ? "bg-canvas/90 backdrop-blur-md border-b border-hairline"
          : "bg-canvas border-b border-hairline-strong"
      }`}
      style={{ height: "64px" }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 h-full">
        {/* Logo / Name — with subtle scale on hover */}
        <Link
          to="/"
          className="label-uppercase text-ink hover:text-body-strong transition-colors duration-200 flex items-center gap-3 group"
        >
          {/* M Tricolor vertical bar badge beside name */}
          <span className="w-[3px] h-4 bg-gradient-to-b from-m-blue-light via-m-blue-dark to-m-red transform group-hover:scale-y-125 transition-transform duration-300" />
          VARUN KUSHWAH
        </Link>

        {/* Desktop Nav Links & Action Triggers */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = isHome && activeSection === link.id
            return isHome ? (
              <a
                key={link.href}
                href={link.href.replace("/", "")}
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
                className="relative py-2 nav-link text-xs lg:text-sm uppercase tracking-wider text-body hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          })}

          {/* Quick Command HUD Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="btn-text px-2.5 py-1 bg-surface-soft hover:bg-surface-elevated text-muted hover:text-ink border border-hairline text-[11px] font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
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
              onClick={onOpenResume}
              className="btn-text px-3 py-1.5 bg-ink text-canvas hover:bg-body-strong text-xs font-bold transition-colors cursor-pointer"
              style={{ borderRadius: "0px" }}
            >
              CV / RESUME
            </button>
          )}
        </div>

        {/* Mobile Right Cluster */}
        <div className="flex items-center gap-2 md:hidden">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="px-2 py-1 bg-surface-soft text-ink border border-hairline font-mono text-xs"
            >
              ⌘K
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink bg-transparent border-0 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden fixed inset-0 top-[64px] z-40 bg-canvas/98 backdrop-blur-lg flex flex-col"
          >
            {/* M Stripe at top of mobile menu */}
            <div className="m-stripe" />

            <div className="flex flex-col px-6 pt-12 gap-8">
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
                      className="text-ink text-2xl font-bold uppercase tracking-tight hover:text-m-blue-dark transition-colors duration-200 flex items-center justify-between group"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs label-uppercase text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        [ 0{idx + 1} ]
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={closeMenu}
                      className="text-ink text-2xl font-bold uppercase tracking-tight hover:text-m-blue-dark transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

