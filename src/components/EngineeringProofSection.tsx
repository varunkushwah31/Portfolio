import React, { useState } from "react"
import GithubActivityWidget from "./GithubActivityWidget"
import DsaStatsWidget from "./DsaStatsWidget"
import GsapReveal from "./gsap/GsapReveal"
import { sound } from "@/lib/sound"

export const EngineeringProofSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "github" | "dsa">("all")

  return (
    <GsapReveal direction="up" distance={25} duration={0.6} className="py-8">
      {/* Header with Tab Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            Engineering Telemetry
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight">
            Technical Proof &amp; Activity
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-surface-card p-1 rounded-xl border border-hairline shadow-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab("all")
              sound.click()
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-surface-elevated text-ink font-semibold shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            All Proof
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("github")
              sound.click()
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "github"
                ? "bg-surface-elevated text-ink font-semibold shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            GitHub
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("dsa")
              sound.click()
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "dsa"
                ? "bg-surface-elevated text-ink font-semibold shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            DSA / LeetCode
          </button>
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 gap-6">
        {(activeTab === "all" || activeTab === "github") && (
          <GithubActivityWidget />
        )}
        {(activeTab === "all" || activeTab === "dsa") && (
          <DsaStatsWidget />
        )}
      </div>
    </GsapReveal>
  )
}

export default EngineeringProofSection
