import React from "react"
import { CodeIcon, TrophyIcon, SparkleIcon } from "@phosphor-icons/react"
import SpotlightCard from "@/components/gsap/SpotlightCard"

export const DsaStatsWidget: React.FC = () => {
  const leetcodeStats = {
    totalSolved: 502,
    totalQuestions: 3300,
    easy: { solved: 210, total: 840 },
    medium: { solved: 238, total: 1750 },
    hard: { solved: 54, total: 750 },
    contestRating: 1846,
    globalRanking: "Top 7.4%",
    streak: 64,
  }

  const codeforcesStats = {
    handle: "varunkushwah",
    rank: "Specialist",
    rating: 1460,
    maxRating: 1510,
    solved: 240,
  }

  return (
    <SpotlightCard className="p-5 sm:p-6" size={500}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
            <CodeIcon size={22} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-ink text-base sm:text-lg">Algorithms &amp; Problem Solving</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                <TrophyIcon size={12} weight="fill" />
                Verified
              </span>
            </div>
            <p className="text-xs text-muted font-normal">LeetCode &amp; Codeforces Competitive Programming</p>
          </div>
        </div>

        {/* Global Percentile */}
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {leetcodeStats.globalRanking}
          </div>
          <div className="text-[11px] text-muted font-sans">Global Percentile</div>
        </div>
      </div>

      {/* LeetCode Distribution Section */}
      <div className="bg-surface-soft p-4 rounded-xl border border-hairline mb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-ink">LEETCODE PROGRESS</span>
            <span className="text-[10px] text-muted font-mono">({leetcodeStats.streak} Day Active Streak)</span>
          </div>
          <div className="text-xs font-mono font-bold text-ink">
            <span className="text-emerald-600 dark:text-emerald-400">{leetcodeStats.totalSolved}</span>
            <span className="text-muted font-normal"> / {leetcodeStats.totalQuestions} Solved</span>
          </div>
        </div>

        {/* Multi-Segment Stacked Progress Bar */}
        <div className="w-full h-3 bg-surface-elevated rounded-full overflow-hidden flex border border-hairline/60">
          <div
            className="h-full bg-[#00b8a3] transition-all duration-500"
            style={{ width: `${(leetcodeStats.easy.solved / leetcodeStats.totalSolved) * 100}%` }}
            title={`Easy: ${leetcodeStats.easy.solved}`}
          />
          <div
            className="h-full bg-[#ffc01e] transition-all duration-500"
            style={{ width: `${(leetcodeStats.medium.solved / leetcodeStats.totalSolved) * 100}%` }}
            title={`Medium: ${leetcodeStats.medium.solved}`}
          />
          <div
            className="h-full bg-[#ff375f] transition-all duration-500"
            style={{ width: `${(leetcodeStats.hard.solved / leetcodeStats.totalSolved) * 100}%` }}
            title={`Hard: ${leetcodeStats.hard.solved}`}
          />
        </div>

        {/* Difficulty Breakdown Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-surface-card p-2 rounded-lg border border-hairline">
            <span className="text-[#00b8a3] font-bold font-mono text-sm block">
              {leetcodeStats.easy.solved}
            </span>
            <span className="text-[10px] text-muted uppercase font-sans">Easy</span>
          </div>

          <div className="bg-surface-card p-2 rounded-lg border border-hairline">
            <span className="text-[#ffc01e] font-bold font-mono text-sm block">
              {leetcodeStats.medium.solved}
            </span>
            <span className="text-[10px] text-muted uppercase font-sans">Medium</span>
          </div>

          <div className="bg-surface-card p-2 rounded-lg border border-hairline">
            <span className="text-[#ff375f] font-bold font-mono text-sm block">
              {leetcodeStats.hard.solved}
            </span>
            <span className="text-[10px] text-muted uppercase font-sans">Hard</span>
          </div>
        </div>
      </div>

      {/* Codeforces & Leadership Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        {/* Codeforces Card */}
        <div className="bg-surface-soft p-3 rounded-xl border border-hairline flex items-center justify-between">
          <div>
            <div className="text-[10px] text-muted font-mono uppercase">Codeforces Rating</div>
            <div className="text-sky-500 font-bold font-mono text-sm mt-0.5">
              {codeforcesStats.rating}{" "}
              <span className="text-muted text-[11px] font-sans font-normal">({codeforcesStats.rank})</span>
            </div>
            <div className="text-[10px] text-muted mt-0.5">Max Rating: {codeforcesStats.maxRating}</div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono text-[10px] font-medium border border-sky-500/20">
            {codeforcesStats.solved}+ Solved
          </span>
        </div>

        {/* Club Coordinator Authority */}
        <div className="bg-surface-soft p-3 rounded-xl border border-hairline flex items-center justify-between">
          <div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono uppercase flex items-center gap-1">
              <SparkleIcon size={11} />
              <span>devup Leadership</span>
            </div>
            <div className="text-ink font-bold text-xs mt-0.5">Java &amp; DSA Coordinator</div>
            <div className="text-[10px] text-muted mt-0.5">Mentored 100+ Students</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* Core DSA Specialties Pills */}
      <div className="pt-3.5 mt-3 border-t border-hairline flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="text-muted font-mono text-[10px] uppercase mr-1">Specialties:</span>
        {["Dynamic Programming", "Graph Theory (BFS/DFS)", "Trees & Tries", "Sliding Window", "Monotonic Stack"].map((topic) => (
          <span
            key={topic}
            className="px-2 py-0.5 rounded-md bg-surface-soft border border-hairline/80 text-body font-mono text-[10px]"
          >
            {topic}
          </span>
        ))}
      </div>
    </SpotlightCard>
  )
}

export default DsaStatsWidget
