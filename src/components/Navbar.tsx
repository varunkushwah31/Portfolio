import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b bg-background/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="font-bold text-lg tracking-tight">
          Your<span className="text-primary">Name</span>
        </h1>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-primary transition" href="#about">About</a>
          <a className="hover:text-primary transition" href="#skills">Skills</a>
          <a className="hover:text-primary transition" href="#projects">Projects</a>
          <a className="hover:text-primary transition" href="#contact">Contact</a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-primary/10 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-primary/10 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-primary/10 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            <a
              onClick={closeMenu}
              className="hover:text-primary transition py-2"
              href="#about"
            >
              About
            </a>
            <a
              onClick={closeMenu}
              className="hover:text-primary transition py-2"
              href="#skills"
            >
              Skills
            </a>
            <a
              onClick={closeMenu}
              className="hover:text-primary transition py-2"
              href="#projects"
            >
              Projects
            </a>
            <a
              onClick={closeMenu}
              className="hover:text-primary transition py-2"
              href="#contact"
            >
              Contact
            </a>
            <Button className="w-full mt-2">Get In Touch</Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
