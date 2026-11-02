import { useState } from "react"
import Hero from "@/components/Hero"
import HighlightedProjects from "@/components/HighlightedProjects"
import EngineeringProofSection from "@/components/EngineeringProofSection"
import LetsTalk from "@/components/LetsTalk"
import { usePageTitle } from "@/hooks/usePageTitle"

const Home = () => {
  usePageTitle()
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null)

  const handleSelectTechFilter = (techId: string | null) => {
    setActiveTechFilter(techId)
  }

  const handleClearFilter = () => {
    setActiveTechFilter(null)
  }

  return (
    <div className="w-full">
      <Hero
        activeTechFilter={activeTechFilter}
        onSelectTechFilter={handleSelectTechFilter}
      />
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        <HighlightedProjects
          activeTechFilter={activeTechFilter}
          onClearFilter={handleClearFilter}
        />
        <EngineeringProofSection />
        <LetsTalk />
      </div>
    </div>
  )
}

export default Home
