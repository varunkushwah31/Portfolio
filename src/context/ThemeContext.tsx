import React, { createContext, useContext, useEffect, useState, useMemo } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = "portfolio-theme"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeState, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark"
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "dark" || saved === "light") return saved
    // Default to dark mode to preserve portfolio signature aesthetic
    return "dark"
  })

  useEffect(() => {
    const root = document.documentElement
    if (themeState === "light") {
      root.classList.remove("dark")
      root.classList.add("light")
      root.dataset.theme = "light"
      root.style.colorScheme = "light"
    } else {
      root.classList.remove("light")
      root.classList.add("dark")
      root.dataset.theme = "dark"
      root.style.colorScheme = "dark"
    }
    localStorage.setItem(STORAGE_KEY, themeState)
  }, [themeState])

  const toggleTheme = () => {
    setThemeState((prev: Theme) => (prev === "dark" ? "light" : "dark"))
  }

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
  }

  const value = useMemo(
    () => ({
      theme: themeState,
      toggleTheme,
      setTheme,
    }),
    [themeState]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
