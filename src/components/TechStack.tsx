import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { CaretRightIcon } from "@phosphor-icons/react"
import {
  JavaIcon,
  SpringIcon,
  ReactIcon,
  FlutterIcon,
  PythonIcon,
  TypeScriptIcon,
  NodeIcon,
  DockerIcon,
  GitIcon,
  WebRTCIcon,
  TailwindIcon,
} from "./TechIcons"

export interface TechItem {
  id: string
  name: string
  icon: React.FC<{ size?: number; className?: string }>
}

export const techItems: TechItem[] = [
  { id: "java", name: "Java", icon: JavaIcon },
  { id: "spring-boot", name: "Spring Boot", icon: SpringIcon },
  { id: "react", name: "React", icon: ReactIcon },
  { id: "flutter", name: "Flutter", icon: FlutterIcon },
  { id: "python", name: "Python", icon: PythonIcon },
  { id: "webrtc", name: "WebRTC", icon: WebRTCIcon },
  { id: "typescript", name: "TypeScript", icon: TypeScriptIcon },
  { id: "node", name: "Node.js", icon: NodeIcon },
  { id: "docker", name: "Docker", icon: DockerIcon },
  { id: "git", name: "Git", icon: GitIcon },
  { id: "tailwind", name: "Tailwind CSS", icon: TailwindIcon },
]

interface TechStackProps {
  items?: TechItem[]
  title?: string
  titleSize?: "sm" | "lg"
  exploreText?: string
  exploreLink?: string
  className?: string
  reverse?: boolean
  speedSeconds?: number
  rows?: 1 | 2
}

/**
 * Single Marquee Track Row
 */
function MarqueeRow({
  items,
  reverse = false,
  speedSeconds = 38,
}: Readonly<{
  items: TechItem[]
  reverse?: boolean
  speedSeconds?: number
}>) {
  // Repeat items 3 times in each track so each track is ~4500px wide,
  // ensuring zero gap or hitch on even ultra-wide 4K screens.
  const duplicatedSet = [...items, ...items, ...items]

  return (
    <div className="flex items-center select-none py-1">
      {/* Primary Track */}
      <div
        className={`marquee-track shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {duplicatedSet.map((tech, idx) => {
          const Icon = tech.icon
          return (
            <Link
              key={`track1-${tech.id}-${idx}`}
              to={`/tech-stack#${tech.id}`}
              className="group/pill inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-hairline bg-surface-card hover:bg-surface-elevated text-xs sm:text-sm text-body-strong hover:border-zinc-500/70 dark:hover:border-zinc-400/70 hover:text-ink transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:scale-105 active:scale-95 shrink-0"
            >
              <Icon
                size={16}
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/pill:scale-115"
              />
              <span className="whitespace-nowrap font-medium">{tech.name}</span>
            </Link>
          )
        })}
      </div>

      {/* Duplicate Track (Seamless Loop Mirror) */}
      <div
        className={`marquee-track shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speedSeconds}s` }}
        aria-hidden="true"
      >
        {duplicatedSet.map((tech, idx) => {
          const Icon = tech.icon
          return (
            <Link
              key={`track2-${tech.id}-${idx}`}
              to={`/tech-stack#${tech.id}`}
              tabIndex={-1}
              className="group/pill inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-hairline bg-surface-card hover:bg-surface-elevated text-xs sm:text-sm text-body-strong hover:border-zinc-500/70 dark:hover:border-zinc-400/70 hover:text-ink transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:scale-105 active:scale-95 shrink-0"
            >
              <Icon
                size={16}
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/pill:scale-115"
              />
              <span className="whitespace-nowrap font-medium">{tech.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function TechStack({
  items,
  title = "Tech stack",
  titleSize = "sm",
  exploreText = "View all",
  exploreLink = "/tech-stack",
  className = "mt-10",
  reverse = false,
  speedSeconds = 38,
  rows = 1,
}: Readonly<TechStackProps>) {
  const activeItems = items && items.length > 0 ? items : techItems
  // If 2 rows are selected, split the items between top & bottom rows
  const half = Math.ceil(activeItems.length / 2)
  const row1Items = rows === 2 ? activeItems.slice(0, half) : activeItems
  const row2Items = rows === 2 ? activeItems.slice(half) : []

  return (
    <div className={className}>
      {/* Header aligned with content container */}
      <div className="flex items-center justify-between mb-4">
        {titleSize === "lg" ? (
          <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {title}
          </h2>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
            className="text-xs text-muted font-medium uppercase tracking-wider"
          >
            {title}
          </motion.p>
        )}

        {exploreText && (
          <Link
            to={exploreLink}
            className="text-xs text-muted hover:text-ink font-medium inline-flex items-center gap-1 transition-colors group/link"
          >
            <span>{exploreText}</span>
            <CaretRightIcon
              size={12}
              weight="bold"
              className="group-hover/link:translate-x-0.5 transition-transform"
            />
          </Link>
        )}
      </div>

      {/* Endless Horizontal Scroll Across Entire Page */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden py-1">
        {/* Soft Left Edge Gradient Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 z-10 bg-linear-to-r from-canvas via-canvas/90 to-transparent" />

        {/* Soft Right Edge Gradient Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 z-10 bg-linear-to-l from-canvas via-canvas/90 to-transparent" />

        {/* Scrolling Tracks */}
        <div className="flex flex-col gap-2.5">
          <MarqueeRow
            items={row1Items}
            reverse={reverse}
            speedSeconds={speedSeconds}
          />
          {rows === 2 && (
            <MarqueeRow
              items={row2Items}
              reverse={!reverse}
              speedSeconds={speedSeconds + 4}
            />
          )}
        </div>
      </div>
    </div>
  )
}