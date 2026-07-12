import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls to top on route change.
 * If navigating to /#hash, scrolls to that element instead.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
