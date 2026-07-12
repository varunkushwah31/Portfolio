import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === "/"

  const closeMenu = () => setMobileMenuOpen(false)

  /**
   * On the home page, hash links scroll directly.
   * On other pages, they navigate to /#section via Link.
   */
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
      className="sticky top-0 z-50 bg-canvas border-b border-hairline"
      style={{ height: "64px" }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 h-full">
        {/* Logo / Name — always links home */}
        <Link to="/" className="label-uppercase text-ink">
          VARUN KUSHWAH
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            isHome ? (
              <a
                key={link.href}
                href={link.href.replace("/", "")}
                className="nav-link text-body hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link text-body hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink bg-transparent border-0 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu — full-screen black overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] z-40 bg-canvas flex flex-col">
          {/* M Stripe at top of mobile menu */}
          <div className="m-stripe" />

          <div className="flex flex-col px-6 pt-12 gap-8">
            {navLinks.map((link) =>
              isHome ? (
                <a
                  key={link.href}
                  href={link.href.replace("/", "")}
                  onClick={() => handleNavClick(link.href)}
                  className="text-ink text-[24px] font-bold uppercase tracking-[0px] hover:text-body-strong transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className="text-ink text-[24px] font-bold uppercase tracking-[0px] hover:text-body-strong transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
