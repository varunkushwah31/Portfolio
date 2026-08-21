import Hero from "@/components/Hero"
import HighlightedProjects from "@/components/HighlightedProjects"
import LatestPosts from "@/components/LatestPosts"
import LetsTalk from "@/components/LetsTalk"
import ScrollProgress from "@/components/ScrollProgress"

const Home = () => {
  return (
    <div className="w-full">
      <ScrollProgress />
      <Hero />
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        <HighlightedProjects />
        <LatestPosts />
        <LetsTalk />
      </div>
    </div>
  )
}

export default Home
