import React from "react"

interface MobileMockupProps {
  imageSrc: string
  alt: string
  className?: string
}

export const MobileMockup: React.FC<MobileMockupProps> = ({ imageSrc, alt, className = "" }) => {
  return (
    <div className={`relative mx-auto flex items-center justify-center select-none ${className}`}>
      {/* Angled / Portrait Phone Frame matching reference */}
      <div className="relative w-36 sm:w-40 aspect-[9/19] bg-[#1a1a1a] rounded-[24px] p-2 border-2 border-zinc-700/70 shadow-2xl overflow-hidden flex flex-col transform -rotate-12 group-hover:-rotate-6 group-hover:scale-105 transition-transform duration-500">
        {/* Dynamic island / Speaker notch */}
        <div className="w-12 h-3.5 bg-black rounded-full mx-auto mb-1 flex items-center justify-center flex-shrink-0 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 ml-auto mr-1" />
        </div>

        {/* Screen Display */}
        <div className="relative w-full flex-1 bg-[#0a0a0a] rounded-[16px] overflow-hidden flex items-center justify-center">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover object-top transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Home bar */}
        <div className="w-10 h-1 bg-zinc-600 rounded-full mx-auto mt-1 flex-shrink-0" />
      </div>
    </div>
  )
}

export default MobileMockup
