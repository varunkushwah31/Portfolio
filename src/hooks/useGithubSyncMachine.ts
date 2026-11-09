import { useState, useCallback, useEffect, useRef } from "react"
import { sound } from "@/lib/sound"
import {
  REAL_GITHUB_STATS,
  REAL_GITHUB_CONTRIBUTIONS,
  type ContributionDay,
  type GitHubStatsData,
} from "@/data/githubData"

export type GithubSyncStatus = "idle" | "syncing" | "synced" | "fallback"
export type GithubDataSource = "static" | "cache" | "live"

export interface UseGithubSyncMachineReturn {
  status: GithubSyncStatus
  dataSource: GithubDataSource
  contributions: ContributionDay[]
  stats: GitHubStatsData
  lastSyncTime: string
  isRefreshing: boolean
  syncWithGithub: (isManual?: boolean) => Promise<void>
  containerProps: {
    "data-sync-status": GithubSyncStatus
    "data-sync-source": GithubDataSource
  }
}

const getTodayDateStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}
const getCacheKey = () => `portfolio_github_cache_v5_${getTodayDateStr()}`
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes cache within the same day

/**
 * Finite State Machine for GitHub Activity Telemetry Synchronization.
 * States: 'idle' -> 'syncing' -> 'synced' (from live API or fresh cache) | 'fallback' (on network error).
 * Elevates UX with non-blocking updates, DX with typed data flow, and AX with semantic data attributes.
 */
export function useGithubSyncMachine(): UseGithubSyncMachineReturn {
  const [status, setStatus] = useState<GithubSyncStatus>("idle")
  const [dataSource, setDataSource] = useState<GithubDataSource>("static")
  const [contributions, setContributions] = useState<ContributionDay[]>(REAL_GITHUB_CONTRIBUTIONS)
  const [stats, setStats] = useState<GitHubStatsData>(REAL_GITHUB_STATS)
  const [lastSyncTime, setLastSyncTime] = useState<string>("Live")

  const abortControllerRef = useRef<AbortController | null>(null)

  const syncWithGithub = useCallback(async (isManual = false) => {
    if (isManual) {
      sound.click()
    }
    setStatus("syncing")

    // 1. Check local cache first if automatic mount
    if (!isManual) {
      try {
        const cached = localStorage.getItem(getCacheKey())
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            if (parsed.contributions?.length) setContributions(parsed.contributions)
            if (parsed.stats) setStats(parsed.stats)
            setLastSyncTime("Live")
            setDataSource("cache")
            setStatus("synced")
            return
          }
        }
      } catch {
        // ignore cache read failure
      }
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      // 2. Fetch live contributions from public proxy
      const res = await fetch("https://github-contributions-api.jogruber.de/v4/varunkushwah31", {
        signal: controller.signal,
      })

      if (!res.ok) {
        setStatus("fallback")
        return
      }

      const contribData = await res.json()

      if (contribData?.contributions && Array.isArray(contribData.contributions)) {
        // Filter past 53 weeks dynamically from today
        const sorted = contribData.contributions.sort((a: ContributionDay, b: ContributionDay) =>
          a.date.localeCompare(b.date)
        )
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - 371) // 53 weeks back
        const cutoffStr = cutoffDate.toISOString().split("T")[0]
        const past53Weeks = sorted.filter((c: ContributionDay) => c.date >= cutoffStr)

        if (past53Weeks.length > 0) {
          setContributions(past53Weeks)
        }

        // Compute total contributions for last 365 days
        const todayStr = getTodayDateStr()
        const last365 = sorted.filter((c: ContributionDay) => c.date <= todayStr).slice(-365)
        const totalPastYear = last365.reduce((acc: number, c: ContributionDay) => acc + c.count, 0)

        // Compute real-time current streak
        let curStreak = 0
        let idx = sorted.length - 1
        while (idx >= 0 && sorted[idx].date > todayStr) idx--
        const streakEndIdx = idx >= 0 && sorted[idx].count === 0 ? idx - 1 : idx
        idx = streakEndIdx
        while (idx >= 0 && sorted[idx].count > 0) {
          curStreak++
          idx--
        }
        const streakStartIdx = idx + 1

        // Compute longest streak
        let longest = 0
        let tempStreak = 0
        for (const item of sorted) {
          if (item.count > 0) {
            tempStreak++
            if (tempStreak > longest) longest = tempStreak
          } else {
            tempStreak = 0
          }
        }

        // Compute current streak range string dynamically from actual streak dates
        let streakRange = REAL_GITHUB_STATS.currentStreakRange
        if (curStreak > 0 && streakStartIdx >= 0 && streakEndIdx < sorted.length) {
          const startDateObj = new Date(sorted[streakStartIdx].date + "T00:00:00Z")
          const endDateObj = new Date(sorted[streakEndIdx].date + "T00:00:00Z")
          const fmtOpts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", timeZone: "UTC" }
          streakRange = `${startDateObj.toLocaleDateString("en-US", fmtOpts)} – ${endDateObj.toLocaleDateString("en-US", fmtOpts)}`
        }

        // Compute commits in current month dynamically
        const now = new Date()
        const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
        const currentMonthName = now.toLocaleDateString("en-US", { month: "long" })
        const monthCommits = sorted
          .filter((c: ContributionDay) => c.date.startsWith(currentMonthPrefix))
          .reduce((acc: number, c: ContributionDay) => acc + c.count, 0)

        // Compute total all-time commits from all contribution data
        const totalAllTime = sorted.reduce((acc: number, c: ContributionDay) => acc + c.count, 0)

        const freshStats: GitHubStatsData = {
          ...REAL_GITHUB_STATS,
          totalContributionsLastYear: totalPastYear > 0 ? totalPastYear : REAL_GITHUB_STATS.totalContributionsLastYear,
          totalCommits: totalAllTime > 0 ? totalAllTime : REAL_GITHUB_STATS.totalCommits,
          currentStreak: curStreak > 0 ? curStreak : REAL_GITHUB_STATS.currentStreak,
          currentStreakRange: streakRange,
          longestStreak: longest > 0 ? longest : REAL_GITHUB_STATS.longestStreak,
          commitsThisMonth: monthCommits > 0 ? monthCommits : REAL_GITHUB_STATS.commitsThisMonth,
          commitsThisMonthLabel: `${monthCommits > 0 ? monthCommits : REAL_GITHUB_STATS.commitsThisMonth} in ${currentMonthName}`,
        }

        setStats(freshStats)
        setLastSyncTime("Live")
        setDataSource("live")
        setStatus("synced")

        // Cache fresh data
        try {
          localStorage.setItem(
            getCacheKey(),
            JSON.stringify({
              timestamp: Date.now(),
              contributions: past53Weeks.length > 0 ? past53Weeks : REAL_GITHUB_CONTRIBUTIONS,
              stats: freshStats,
            })
          )
        } catch {
          // ignore storage quota error
        }
      } else {
        setStatus("fallback")
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        setStatus("fallback")
      }
    }
  }, [])

  // Auto-run once on mount
  useEffect(() => {
    let isMounted = true
    const timer = setTimeout(() => {
      if (isMounted) {
        void syncWithGithub(false)
      }
    }, 0)

    return () => {
      isMounted = false
      clearTimeout(timer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [syncWithGithub])

  return {
    status,
    dataSource,
    contributions,
    stats,
    lastSyncTime,
    isRefreshing: status === "syncing",
    syncWithGithub,
    containerProps: {
      "data-sync-status": status,
      "data-sync-source": dataSource,
    },
  }
}
