import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b bg-background/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="font-bold text-lg tracking-tight">
          Your<span className="text-primary">Name</span>
        </h1>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-primary transition" href="#about">About</a>
          <a className="hover:text-primary transition" href="#projects">Projects</a>
          <Button size="sm">Contact</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
