import React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
  HouseIcon,
  UserIcon,
  GitForkIcon,
  CpuIcon,
  BriefcaseIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react"
import { sound } from "@/lib/sound"

interface MobileBottomNavProps {
  onOpenCommandPalette?: () => void
}

interface NavTab {
  id: string
  label: string
  path: string
  icon: React.ComponentType<{ size?: number; weight?: "bold" | "regular" | "fill"; className?: string }>
}

const navTabs: NavTab[] = [
  { id: "home", label: "Home", path: "/", icon: HouseIcon },
  { id: "about", label: "About", path: "/about", icon: UserIcon },
  { id: "projects", label: "Projects", path: "/projects", icon: GitForkIcon },
  { id: "stack", label: "Stack", path: "/tech-stack", icon: CpuIcon },
  { id: "resume", label: "Resume", path: "/resume", icon: BriefcaseIcon },
]

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenCommandPalette,
}) => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const prefetchRoute = (path: string) => {
    switch (path) {
      case "/":
        void import("@/Pages/Home").catch(() => {})
        break
      case "/about":
        void import("@/Pages/About").catch(() => {})
        break
      case "/projects":
        void import("@/Pages/ProjectsPage").catch(() => {})
        break
      case "/tech-stack":
        void import("@/Pages/TechStackPage").catch(() => {})
        break
      case "/resume":
        void import("@/Pages/ResumePage").catch(() => {})
        break
    }
  }

  return (
    <nav
      aria-label="Mobile Bottom App Navigation"
      className="md:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 max-w-md mx-auto pointer-events-auto select-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="relative rounded-2xl border border-hairline/80 bg-surface-card/90 dark:bg-canvas/90 backdrop-blur-xl shadow-xl shadow-black/15 p-1.5 flex items-center justify-between gap-1">
        {navTabs.map((tab) => {
          const active = isActive(tab.path)
          const Icon = tab.icon

          return (
            <Link
              key={tab.id}
              to={tab.path}
              onClick={() => sound.click()}
              onTouchStart={() => prefetchRoute(tab.path)}
              onMouseEnter={() => prefetchRoute(tab.path)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 grow min-h-11.5 active:scale-95 ${
                active ? "text-emerald-500 font-semibold" : "text-muted hover:text-ink"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="mobileActiveTabIndicator"
                  className="absolute inset-0 bg-surface-elevated/90 dark:bg-surface-soft/80 border border-hairline rounded-xl -z-10 shadow-2xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                size={20}
                weight={active ? "bold" : "regular"}
                className={`transition-transform duration-200 ${
                  active ? "scale-110 text-emerald-500" : "text-muted"
                }`}
              />

              <span className="text-[10px] tracking-tight leading-none mt-1">
                {tab.label}
              </span>

              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />
              )}
            </Link>
          )
        })}

        {/* Quick CLI Terminal Launcher Button */}
        <button
          type="button"
          onClick={() => {
            sound.openModal()
            onOpenCommandPalette?.()
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-muted hover:text-ink hover:bg-surface-elevated transition-all duration-150 shrink-0 min-h-11.5 active:scale-95 cursor-pointer"
          title="Open Developer CLI & Command Palette"
          aria-label="Open Developer CLI & Command Palette"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-surface-elevated border border-hairline text-emerald-500">
            <TerminalWindowIcon size={16} weight="bold" />
          </div>
          <span className="text-[10px] tracking-tight text-muted font-mono leading-none mt-1">
            CLI
          </span>
        </button>
      </div>
    </nav>
  )
}

export default MobileBottomNav
