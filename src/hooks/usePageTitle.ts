import { useEffect } from "react"

const BASE_TITLE = "Varun Kushwah"

export function usePageTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — ${BASE_TITLE}`
    } else {
      document.title = `${BASE_TITLE} — Software Developer`
    }
  }, [title])
}

export default usePageTitle
