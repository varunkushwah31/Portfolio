import React from "react"

interface LaptopMockupProps {
  imageSrc: string
  alt: string
  className?: string
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ imageSrc, alt, className = "" }) => {
  return (
    <div className={`relative mx-auto flex flex-col items-center select-none ${className}`}>
      {/* Screen Frame (Lid) */}
      <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-t-xl rounded-b-[2px] p-[6px] sm:p-2 border border-zinc-700/60 shadow-2xl overflow-hidden flex flex-col">
        {/* Camera dot */}
        <div className="absolute top-[3px] sm:top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-600 z-20" />
        
        {/* Screen Display */}
        <div className="relative w-full h-full bg-[#0a0a0a] rounded-[3px] sm:rounded-sm overflow-hidden flex items-center justify-center">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative w-[114%] h-2.5 sm:h-3.5 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 rounded-b-md shadow-lg flex justify-center">
        {/* Trackpad notch */}
        <div className="w-12 sm:w-16 h-1 bg-zinc-600/70 rounded-b-sm" />
      </div>
      {/* Bottom shadow */}
      <div className="w-[90%] h-2 bg-black/40 blur-sm rounded-full mt-0.5" />
    </div>
  )
}

export default LaptopMockup
