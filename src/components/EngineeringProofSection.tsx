import React from "react"
import GithubActivityWidget from "./GithubActivityWidget"
import GsapReveal from "./gsap/GsapReveal"

export const EngineeringProofSection: React.FC = () => {
  return (
    <GsapReveal direction="up" distance={25} duration={0.65} className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            Engineering proof
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink tracking-tight">
            Activity &amp; open source
          </h2>
        </div>
      </div>

      <GithubActivityWidget />
    </GsapReveal>
  )
}

export default EngineeringProofSection
