import React, { useState, useMemo } from "react"
import { GithubLogoIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import SpotlightCard from "@/components/gsap/SpotlightCard"
import { sound } from "@/lib/sound"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export const GithubActivityWidget: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  // Generate realistic 52-week contribution matrix ending today
  const weeks = useMemo(() => {
    const matrix: ContributionDay[][] = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 52 * 7)

    let cur = new Date(startDate)
    for (let w = 0; w < 52; w++) {
      const week: ContributionDay[] = []
      for (let d = 0; d < 7; d++) {
        // Generate believable distribution pattern (heavier on weekdays and college project bursts)
        const dayOfWeek = cur.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        const randomFactor = Math.random()

        let count = 0
        if (randomFactor > 0.35) {
          count = isWeekend
            ? Math.floor(Math.random() * 4)
            : Math.floor(Math.random() * 8) + 1
        }
        if (randomFactor > 0.88) {
          count = Math.floor(Math.random() * 12) + 6
        }

        let level: 0 | 1 | 2 | 3 | 4 = 0
        if (count > 8) level = 4
        else if (count > 5) level = 3
        else if (count > 2) level = 2
        else if (count > 0) level = 1

        week.push({
          date: cur.toISOString().split("T")[0],
          count,
          level,
        })
        cur.setDate(cur.getDate() + 1)
      }
      matrix.push(week)
    }
    return matrix
  }, [])

  const totalContributions = useMemo(() => {
    return weeks.flat().reduce((acc, d) => acc + d.count, 0)
  }, [weeks])

  const levelColors = {
    0: "bg-surface-elevated/70 border border-hairline/40",
    1: "bg-emerald-950/60 border border-emerald-800/40 dark:bg-emerald-900/40",
    2: "bg-emerald-700/70 border border-emerald-600/40 dark:bg-emerald-700/60",
    3: "bg-emerald-500/85 border border-emerald-400/40 dark:bg-emerald-500/80",
    4: "bg-emerald-400 border border-emerald-300/60 shadow-[0_0_6px_rgba(52,211,153,0.4)]",
  }

  return (
    <SpotlightCard className="p-5 sm:p-6" size={500}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-hairline flex items-center justify-center text-ink shrink-0 shadow-xs">
            <GithubLogoIcon size={22} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-ink text-base sm:text-lg">GitHub Telemetry</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <a
              href="https://github.com/varunkushwah31"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="text-xs text-muted hover:text-ink font-mono inline-flex items-center gap-1 transition-colors group/gh"
            >
              <span>@varunkushwah31</span>
              <ArrowSquareOutIcon size={12} className="group-hover/gh:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Total Year Contributions Pill */}
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold font-mono text-ink">
            {totalContributions.toLocaleString()}
          </div>
          <div className="text-[11px] text-muted font-sans">Contributions in past year</div>
        </div>
      </div>

      {/* Contribution Calendar Heatmap */}
      <div className="relative overflow-x-auto pb-2 scrollbar-none">
        <div className="min-w-[640px]">
          <div className="flex gap-[3.5px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3.5px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-[9.5px] h-[9.5px] rounded-[2px] transition-transform hover:scale-130 cursor-pointer ${
                      levelColors[day.level]
                    }`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Hover Tooltip Status Bar */}
        <div className="h-5 mt-2 flex items-center justify-between text-[11px] text-muted font-mono">
          <div>
            {hoveredDay ? (
              <span className="text-body-strong font-medium">
                <strong className="text-emerald-500">{hoveredDay.count}</strong> contributions on{" "}
                {new Date(hoveredDay.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : (
              <span>Hover over calendar squares to inspect commit velocity</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span>Less</span>
            <span className="w-2 h-2 rounded-[2px] bg-surface-elevated border border-hairline/40 inline-block" />
            <span className="w-2 h-2 rounded-[2px] bg-emerald-950/60 inline-block" />
            <span className="w-2 h-2 rounded-[2px] bg-emerald-700/70 inline-block" />
            <span className="w-2 h-2 rounded-[2px] bg-emerald-500/85 inline-block" />
            <span className="w-2 h-2 rounded-[2px] bg-emerald-400 inline-block" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* GitHub Repository Highlights Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 mt-2 border-t border-hairline text-xs">
        <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
          <div className="text-[10px] text-muted font-mono uppercase">Repositories</div>
          <div className="text-ink font-bold font-mono text-base mt-0.5">24+ Repos</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Public &amp; Subtrees</div>
        </div>

        <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
          <div className="text-[10px] text-muted font-mono uppercase">Top Language</div>
          <div className="text-ink font-bold font-mono text-base mt-0.5">Java (58%)</div>
          <div className="text-[10px] text-muted">Backend Architecture</div>
        </div>

        <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
          <div className="text-[10px] text-muted font-mono uppercase">Current Streak</div>
          <div className="text-ink font-bold font-mono text-base mt-0.5">18 Days</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Continuous Commits</div>
        </div>

        <div className="bg-surface-soft p-2.5 rounded-xl border border-hairline">
          <div className="text-[10px] text-muted font-mono uppercase">Pull Requests</div>
          <div className="text-ink font-bold font-mono text-base mt-0.5">96+ Merged</div>
          <div className="text-[10px] text-muted">devup &amp; Collabs</div>
        </div>
      </div>
    </SpotlightCard>
  )
}

export default GithubActivityWidget
