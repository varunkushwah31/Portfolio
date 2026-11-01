import Hero from "@/components/Hero"
import HighlightedProjects from "@/components/HighlightedProjects"
import EngineeringProofSection from "@/components/EngineeringProofSection"
import LetsTalk from "@/components/LetsTalk"
import { usePageTitle } from "@/hooks/usePageTitle"

const Home = () => {
  usePageTitle()
  return (
    <div className="w-full">
      <Hero />
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        <HighlightedProjects />
        <EngineeringProofSection />
        <LetsTalk />
      </div>
    </div>
  )
}

export default Home
