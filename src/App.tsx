import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import ProjectDetail from "./Pages/ProjectDetail"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-canvas text-ink">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
