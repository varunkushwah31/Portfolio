import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListIcon, XIcon, MoonIcon, SunIcon, TerminalWindowIcon } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

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
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 border-b border-hairline',
          scrolled
            ? 'backdrop-blur-md bg-canvas/90 shadow-sm'
            : 'bg-canvas',
        ].join(' ')}
      >
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* Logo with 3-bar brand mark matching bonabrian */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Varun Kushwah — home"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="flex items-center gap-0.75 py-1 px-0.5 rounded-md"
            >
              <span className="w-0.75 h-3 bg-muted group-hover:bg-ink rounded-full transition-colors" />
              <span className="w-0.75 h-5 bg-ink rounded-full transition-colors" />
              <span className="w-0.75 h-3.5 bg-muted group-hover:bg-ink rounded-full transition-colors" />
            </motion.div>
            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors duration-200">
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

          {/* Right icons cluster */}
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -6, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 6, opacity: 0, rotate: 30 }}
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

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Command palette (⌘K)"
              aria-label="Open command palette"
              onClick={onOpenCommandPalette}
              className="w-9 h-9 flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
            >
              <TerminalWindowIcon size={18} weight="regular" />
            </motion.button>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-muted hover:text-ink hover:bg-surface-elevated transition-colors duration-200 cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <XIcon size={18} weight="bold" /> : <ListIcon size={18} weight="bold" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-canvas border-b border-hairline pt-16"
          >
            <nav className="flex flex-col gap-1 px-4 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'px-4 py-3 rounded-lg text-base transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-ink font-semibold bg-surface-elevated'
                      : 'text-muted hover:text-ink hover:bg-surface-soft',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
