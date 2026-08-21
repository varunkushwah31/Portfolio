import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListIcon, XIcon ,MoonIcon, TerminalWindowIcon } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            ? 'backdrop-blur-md bg-[#0a0a0a]/90 border-b border-[#27272a]'
            : 'border-b border-[#27272a]',
        ].join(' ')}
        style={{ backgroundColor: scrolled ? 'rgba(10,10,10,0.90)' : '#0a0a0a' }}
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
              className="flex items-center gap-[3px] py-1 px-0.5 rounded-md"
            >
              <span className="w-[3px] h-3 bg-zinc-300 group-hover:bg-white rounded-full transition-colors" />
              <span className="w-[3px] h-5 bg-white rounded-full transition-colors" />
              <span className="w-[3px] h-3.5 bg-zinc-300 group-hover:bg-white rounded-full transition-colors" />
            </motion.div>
            <span className="text-sm font-medium text-[#fafafa] group-hover:text-white transition-colors duration-200">
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
                        ? 'text-white font-medium'
                        : 'text-[#a1a1aa] hover:text-[#fafafa]'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white/10 border border-white/20 rounded-md -z-10 shadow-sm"
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
              title="Dark mode"
              aria-label="Dark mode"
              className="w-9 h-9 flex items-center justify-center rounded-md text-[#71717a] hover:text-[#fafafa] hover:bg-[#171717] transition-colors duration-200 cursor-pointer"
            >
              <MoonIcon size={18} weight="regular" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Command palette (⌘K)"
              aria-label="Open command palette"
              onClick={onOpenCommandPalette}
              className="w-9 h-9 flex items-center justify-center rounded-md text-[#71717a] hover:text-[#fafafa] hover:bg-[#171717] transition-colors duration-200 cursor-pointer"
            >
              <TerminalWindowIcon size={18} weight="regular" />
            </motion.button>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-[#71717a] hover:text-[#fafafa] hover:bg-[#171717] transition-colors duration-200"
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
            className="fixed inset-0 z-40 flex flex-col bg-[#0a0a0a] pt-16"
          >
            <nav className="flex flex-col gap-1 px-4 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={[
                    'px-4 py-3 rounded-lg text-base transition-colors duration-200',
                    isActive(link.href)
                      ? 'text-white bg-white/10'
                      : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#171717]',
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
