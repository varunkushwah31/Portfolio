import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-8 border-b">
          <div>
            <p className="font-semibold mb-2 sm:mb-0">Connect with me</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© {year} Your Name. All rights reserved.</p>
          <p className="mt-1">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
