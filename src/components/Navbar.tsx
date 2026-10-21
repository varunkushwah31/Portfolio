import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ListIcon,
  XIcon,
  MoonIcon,
  SunIcon,
  TerminalWindowIcon,
  SpeakerHighIcon,
  SpeakerSimpleSlashIcon,
  DownloadSimpleIcon,
  ArrowSquareOutIcon,
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { sound } from '@/lib/sound'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Tech Stack', href: '/tech-stack' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
]

export default function Navbar({ onOpenCommandPalette }: Readonly<NavbarProps>) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(() => sound.isEnabled())
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', handleScroll, { passive: true })
    const unsub = sound.subscribe((enabled) => setSoundEnabled(enabled))
    return () => {
      window.removeEventListener('scroll', handleScroll)
      unsub()
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-md bg-canvas/85 shadow-xs border-b border-hairline/60'
            : 'bg-transparent',
        ].join(' ')}
      >
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo with 3-bar brand mark */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 shrink min-w-0 group"
            aria-label="Varun Kushwah — home"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-0.75 py-1 px-0.5 rounded-md shrink-0"
            >
              <span className="w-0.75 h-3 bg-muted group-hover:bg-ink rounded-full transition-colors" />
              <span className="w-0.75 h-5 bg-ink rounded-full transition-colors" />
              <span className="w-0.75 h-3.5 bg-muted group-hover:bg-ink rounded-full transition-colors" />
            </motion.div>
            <span className="text-sm font-semibold sm:font-medium text-ink group-hover:text-accent transition-colors duration-200 truncate">
              Varun Kushwah
            </span>
          </Link>

          {/* Desktop nav links with animated indicator */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href} className="relative">
                  <Link
                    to={link.href}
                    onClick={() => sound.click()}
                    className={`relative px-3 py-1.5 rounded-md text-sm transition-colors duration-200 block z-10 ${
                      active
                        ? 'text-ink font-semibold'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-surface-elevated/70 border border-hairline rounded-md -z-10 shadow-xs"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right actions cluster */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Audio Feedback Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => sound.toggle()}
              title={soundEnabled ? 'Mute UI sounds' : 'Enable tactile sound feedback'}
              aria-label={soundEnabled ? 'Mute UI sounds' : 'Enable tactile sound feedback'}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
            >
              {soundEnabled ? (
                <SpeakerHighIcon size={18} weight="bold" className="text-emerald-500" />
              ) : (
                <SpeakerSimpleSlashIcon size={18} weight="regular" />
              )}
            </motion.button>

            {/* Dark / Light Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                sound.switchTab()
                toggleTheme()
              }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -6, opacity: 0, rotate: -25 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 6, opacity: 0, rotate: 25 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? (
                    <SunIcon size={18} weight="regular" className="text-amber-400" />
                  ) : (
                    <MoonIcon size={18} weight="regular" className="text-indigo-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Command Palette Launcher */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              title="Command palette (⌘K)"
              aria-label="Open command palette"
              onClick={() => {
                sound.openModal()
                onOpenCommandPalette?.()
              }}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
            >
              <TerminalWindowIcon size={18} weight="regular" />
            </motion.button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="md:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer ml-0.5"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <XIcon size={20} weight="bold" /> : <ListIcon size={20} weight="bold" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-canvas/98 backdrop-blur-xl pt-16 px-4 pb-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1.5 pt-4">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => {
                      sound.click()
                      setMobileOpen(false)
                    }}
                    className={[
                      'px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-150 flex items-center justify-between',
                      active
                        ? 'text-ink font-semibold bg-surface-elevated border border-hairline shadow-xs'
                        : 'text-muted hover:text-ink hover:bg-surface-soft active:scale-[0.99]',
                    ].join(' ')}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Quick Actions in Drawer */}
            <div className="mt-auto pt-6 border-t border-hairline space-y-3">
              <button
                type="button"
                onClick={() => {
                  sound.openModal()
                  setMobileOpen(false)
                  onOpenCommandPalette?.()
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-surface-soft border border-hairline text-ink text-sm font-medium hover:bg-surface-elevated transition-colors"
              >
                <span className="flex items-center gap-2">
                  <TerminalWindowIcon size={16} className="text-emerald-500" />
                  <span>Command Palette</span>
                </span>
                <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card border border-hairline text-muted">
                  ⌘K
                </kbd>
              </button>

              <a
                href="/Varun_Kushwah_Resume.pdf"
                download="Varun_Kushwah_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink text-canvas text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <DownloadSimpleIcon size={16} weight="bold" />
                <span>Download Resume</span>
              </a>

              <div className="flex items-center justify-between text-xs text-muted pt-2 px-1">
                <span>© 2026 Varun Kushwah</span>
                <a
                  href="https://github.com/varunkushwah31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                >
                  <span>@varunkushwah31</span>
                  <ArrowSquareOutIcon size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
