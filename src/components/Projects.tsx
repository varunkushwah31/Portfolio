import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const projects = [
  {
    title: "Portfolio Website",
    description: "Modern personal portfolio built with React, TypeScript and Tailwind.",
  },
  {
    title: "Todo App",
    description: "A clean and minimal todo app with local storage support.",
  },
]

const Projects = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <h3 className="text-3xl font-semibold mb-10">Projects</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="transition hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Projects
