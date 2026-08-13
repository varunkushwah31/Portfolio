import ScrollProgress from "@/components/ScrollProgress"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import MStripe from "@/components/MStripe"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

const Home = () => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <MStripe />
        <About />
        <MStripe />
        <Skills />
        <MStripe />
        <Projects />
        <MStripe />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home

