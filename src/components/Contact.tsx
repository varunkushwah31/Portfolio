import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"

const Contact = () => {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
      <div className="bg-muted/60 rounded-lg p-12 text-center">
        <h3 className="text-3xl font-semibold mb-4">Let's work together</h3>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out if you'd like to collaborate or just chat!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            <Mail size={20} />
            <a href="mailto:your.email@example.com">Send Email</a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
              LinkedIn
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
            aria-label="GitHub"
          >
            <Github size={20} className="text-primary" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
            aria-label="Twitter"
          >
            <Twitter size={20} className="text-primary" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-primary" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
