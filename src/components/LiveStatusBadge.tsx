import { motion } from "framer-motion"

interface LiveStatusBadgeProps {
  statusText?: string
  subText?: string
}

const LiveStatusBadge = ({
  statusText = "SYS.ONLINE",
  subText = "AVAILABLE FOR DEPLOYMENT",
}: LiveStatusBadgeProps) => {
  return (
    <div
      className="inline-flex items-center gap-3 bg-surface-card px-3.5 py-1.5 border border-hairline-strong shadow-sm"
      style={{ borderRadius: "0px" }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <motion.span
          animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inline-flex h-full w-full bg-success rounded-full opacity-75"
        />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
      </span>

      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] uppercase">
        <span className="text-ink">{statusText}</span>
        <span className="text-muted opacity-40">{"//"}</span>
        <span className="text-body-strong font-light">{subText}</span>
      </div>
    </div>
  )
}

export default LiveStatusBadge
