import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Portfolio Website",
    description: "Modern personal portfolio built with React, TypeScript and Tailwind.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Todo App",
    description: "A clean and minimal todo app with local storage support and dark mode.",
    tech: ["React", "localStorage", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "E-Commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and analytics.",
    tech: ["React", "TypeScript", "shadcn/ui", "Chart.js"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with user authentication and instant notifications.",
    tech: ["React", "Firebase", "Tailwind", "Real-time DB"],
    github: "https://github.com",
    live: "https://example.com",
  },
]

const Projects = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-12">
        <h3 className="text-3xl font-semibold mb-4">Featured Projects</h3>
        <p className="text-muted-foreground">
          A selection of my recent work and side projects
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="transition hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
          >
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="text-muted-foreground">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    Code
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-2"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Live
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Projects
