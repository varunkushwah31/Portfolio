import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-28 text-center">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Building <span className="text-primary">modern</span><br />
          web experiences
        </h2>

        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
          I’m a frontend developer focused on React, TypeScript, and crafting
          clean, user-friendly interfaces.
        </p>

        <div className="flex justify-center gap-4">
          <Button size="lg">View Projects</Button>
          <Button size="lg" variant="outline">GitHub</Button>
        </div>
      </div>

      {/* background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/10 to-transparent" />
    </section>
  )
}

export default Hero
