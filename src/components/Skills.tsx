import { Card, CardContent } from "@/components/ui/card"
import {
  Code,
  Palette,
  Zap,
  Cpu,
  GitBranch,
  Layers,
} from "lucide-react"

const skillCategories = [
  {
    name: "Frontend",
    icon: Code,
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    name: "UI/UX",
    icon: Palette,
    skills: ["shadcn/ui", "Responsive Design", "Accessibility", "CSS"],
  },
  {
    name: "Performance",
    icon: Zap,
    skills: ["Web Vitals", "Optimization", "SEO", "Testing"],
  },
  {
    name: "Tools",
    icon: Cpu,
    skills: ["VS Code", "Git", "Chrome DevTools", "Figma"],
  },
  {
    name: "Version Control",
    icon: GitBranch,
    skills: ["Git", "GitHub", "GitLab", "Branching Strategies"],
  },
  {
    name: "Architecture",
    icon: Layers,
    skills: ["Component Design", "State Management", "Clean Code", "Design Patterns"],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24 bg-muted/40">
      <div className="mb-12">
        <h3 className="text-3xl font-semibold mb-4">Skills & Stack</h3>
        <p className="text-muted-foreground">
          Technologies and tools I work with
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card
              key={category.name}
              className="transition hover:shadow-md hover:border-primary/50"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-primary" size={24} />
                  <h4 className="font-semibold">{category.name}</h4>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
