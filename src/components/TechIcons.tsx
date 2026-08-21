import React from "react"

interface IconProps {
  className?: string
  size?: number
}

// 1. JAVA (Official Coffee Cup)
export const JavaIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#5382A1" d="M8.85 17.588s-.52.338-.344.475c.677.525 2.164.717 3.328.717 1.34 0 2.946-.24 3.992-.858 0 0 .324-.265.176-.388-.148-.124-.51.107-.51.107-.954.557-2.392.748-3.66.758-1.127.01-2.454-.153-2.982-.81zm-1.042-2.88s-.552.428-.316.57c.78.468 2.217.708 3.52.745 1.547.042 3.428-.198 4.79-.974 0 0 .372-.284.22-.423-.153-.138-.553.155-.553.155-1.196.68-2.883.87-4.46.883-1.398.01-2.617-.26-3.2-.956z"/>
    <path fill="#E76F00" d="M14.62 10.605c.567.653.284 1.258.284 1.258s.77-.73.208-1.573c-.563-.842-1.39-1.272-1.996-1.848-.564-.537-.53-1.026-.53-1.026s-.194.502.26 1.054c.48.583 1.157 1.417 1.774 2.135zM19.467 19.34c-1.328.918-4.707 1.26-7.397 1.26-2.52 0-5.74-.325-7.587-1.386-.24-.138-.284-.285-.14-.395.145-.11.455.074.455.074 1.69.96 4.673 1.298 7.272 1.3 2.502.002 5.617-.298 6.945-1.127 0 0 .393-.205.518-.088.125.116-.066.362-.066.362z"/>
    <path fill="#5382A1" d="M13.207 9.666c.263.315.688.675 1.08 1.096.56.602.833 1.343.833 1.343s.553-.615.114-1.31c-.437-.698-1.134-1.173-1.637-1.696-.64-.666-.665-1.528-.665-1.528s-.363.85.275 2.095z"/>
    <path fill="#E76F00" d="M20.597 21.726c-1.688 1.01-5.115 1.374-8.067 1.374-2.825 0-6.425-.338-8.52-1.536-.264-.15-.224-.316-.066-.425.158-.108.49.076.49.076 1.954 1.11 5.34 1.456 8.096 1.458 2.656.002 5.89-.317 7.57-1.22 0 0 .428-.184.55-.067.123.118-.053.34-.053.34zm-8.31-18.726s.89 1.01-.274 2.506c-1.126 1.45-.63 2.274-.63 2.274s-.044-.814.773-1.745c.866-.987 1.183-1.85.13-3.035z"/>
  </svg>
)

// 2. SPRING BOOT (Official Leaf)
export const SpringIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      fill="#6DB33F"
      d="M21.574 10.02c-.08-.433-.314-.813-.674-1.082l-7.398-5.55a2.235 2.235 0 0 0-2.684 0L3.42 8.938c-.36.27-.594.65-.674 1.082a2.23 2.23 0 0 0 .783 2.115l7.398 5.55c.394.296.868.444 1.342.444.474 0 .948-.148 1.342-.444l7.398-5.55a2.23 2.23 0 0 0 .783-2.115z"
    />
    <path
      fill="#FFFFFF"
      d="M12.27 7.085c-2.88 0-5.216 2.336-5.216 5.216 0 .584.098 1.144.276 1.668.647-.96 1.745-1.593 2.99-1.593 1.996 0 3.614 1.618 3.614 3.614 0 .428-.075.839-.213 1.22.802.2 1.64.31 2.506.31 2.88 0 5.216-2.336 5.216-5.216 0-2.88-2.336-5.216-5.173-5.219z"
    />
  </svg>
)

// 3. REACT (Official Atom)
export const ReactIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
  </svg>
)

// 4. FLUTTER (Official Birds/Stripes)
export const FlutterIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#02569B" d="M14.314 0L2.3 12 6.07 15.77 21.857 0z" />
    <path fill="#0175C2" d="M14.286 11.514l-6.17 6.172L12 21.572l6.172-6.172z" />
    <path fill="#29B6F6" d="M18.172 7.629L12 13.8l3.771 3.771L21.943 11.4z" />
    <path fill="#02569B" d="M12 21.572l2.285 2.285L21.943 16.2l-3.771-3.771z" />
  </svg>
)

// 5. PYTHON (Official Dual Snake)
export const PythonIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#3776AB"
      d="M11.914 0C8.59 0 6.543.46 5.406 1.488c-.96.867-1.127 2.083-1.127 3.784v2.793h7.793v1.04H3.297c-1.42 0-2.453.33-3.076 1.256C-.46 11.375 0 12.87 0 14.738c0 1.702.43 2.977 1.258 3.784.887.863 2.148 1.152 3.824 1.152h2.246v-3.136c0-1.802.73-3.23 2.274-3.957 1.468-.692 3.167-.715 4.972-.715h.067V8.04H7.957V4.904c0-.98.395-1.57.996-1.926.78-.465 1.957-.465 2.96-.465h5.368c.99 0 1.996.34 2.504.996.48.625.597 1.543.597 2.653v1.88h-3.28v1.04h4.32c1.433 0 2.45-.332 3.078-1.258.68-1.015.68-2.48.68-4.348 0-1.703-.43-2.976-1.258-3.785-.886-.863-2.148-1.152-3.824-1.152h-5.367zm-3.023 2.375a.99.99 0 1 1 0 1.98.99.99 0 0 1 0-1.98z"
    />
    <path
      fill="#FFD43B"
      d="M12.086 24c3.324 0 5.37-.46 6.508-1.488.96-.867 1.127-2.083 1.127-3.784v-2.793h-7.793v-1.04h8.775c1.42 0 2.453-.33 3.076-1.256.68-1.014.22-2.51.22-4.377 0-1.703-.43-2.977-1.258-3.784-.887-.864-2.148-1.153-3.824-1.153h-2.246v3.137c0 1.802-.73 3.23-2.274 3.957-1.468.692-3.167.715-4.972.715h-.067v3.828h6.684v3.136c0 .98-.395 1.57-.996 1.926-.78.465-1.957.465-2.96.465H6.73c-.99 0-1.996-.34-2.504-.996-.48-.625-.597-1.543-.597-2.653v-1.88h3.28v-1.04H2.59c-1.434 0-2.45.332-3.078 1.258-.68 1.015-.68 2.48-.68 4.348 0 1.703.43 2.977 1.258 3.785.886.863 2.148 1.152 3.824 1.152h5.367zm3.023-2.375a.99.99 0 1 1 0-1.98.99.99 0 0 1 0 1.98z"
    />
  </svg>
)

// 6. TYPESCRIPT (Official Blue Box)
export const TypeScriptIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path fill="#FFFFFF" d="M11.75 14.54c-.3.73-.78 1.3-1.44 1.71-.66.41-1.47.62-2.43.62-.99 0-1.85-.24-2.58-.72-.73-.48-1.28-1.16-1.65-2.04l2.12-1.23c.2.47.5.83.9 1.08.4.25.86.38 1.38.38.47 0 .86-.1 1.17-.3.31-.2.46-.48.46-.84 0-.31-.11-.56-.33-.75-.22-.19-.61-.38-1.17-.57l-.92-.32c-1-.34-1.74-.78-2.22-1.32-.48-.54-.72-1.22-.72-2.04 0-.97.38-1.76 1.14-2.37.76-.61 1.73-.91 2.91-.91.93 0 1.75.22 2.46.66.71.44 1.23 1.06 1.56 1.86l-2.04 1.17c-.16-.38-.4-.67-.72-.87-.32-.2-.72-.3-1.2-.3-.42 0-.77.09-1.05.27-.28.18-.42.43-.42.75 0 .28.1.51.3.69.2.18.55.35 1.05.51l.93.31c1.1.37 1.9.83 2.4 1.38.5.55.75 1.24.75 2.07 0 .99-.36 1.79-1.08 2.4zM21.5 6.78h-7v2.25h2.25v10.19h2.5V9.03h2.25V6.78z" />
  </svg>
)

// 7. NODE.JS (Official Hexagon)
export const NodeIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fill="#539E43" d="M12 1.5L2.25 7.125v11.25L12 24l9.75-5.625V7.125L12 1.5zm6.5 14.5l-6.5 3.75-6.5-3.75V9.5l6.5-3.75 6.5 3.75v6.5z" />
    <path fill="#FFFFFF" d="M12 7.5L7.5 10.125v4.75L12 17.5l4.5-2.625v-4.75L12 7.5z" />
  </svg>
)

// 8. DOCKER (Official Whale with Cargo)
export const DockerIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#2496ED"
      d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.93 0h2.119a.185.185 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.17a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m5.86 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.17a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H2.24a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.978 12.04c-.394-.537-1.455-.718-2.222-.505-.125-.436-.34-.84-.633-1.192l-.21-.24-.266.177c-.82.546-1.393 1.344-1.637 2.292-.472-.093-1.442-.093-2.187 0H.17c-.092.428-.152.868-.17 1.317-.116 2.87 1.042 5.56 3.178 7.42 2.378 2.072 5.617 2.893 8.784 2.658 4.707-.35 8.75-3.037 10.453-7.234.908-.18 2.128-.86 2.563-2.176l.08-.244-.24-.132z"
    />
  </svg>
)

// 9. GIT (Official Orange Branching Logo)
export const GitIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#F05032"
      d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.808 2.585l3.228 3.228a1.782 1.782 0 0 1 2.26 2.274l3.102 3.103a1.783 1.783 0 0 1 1.83 2.99l-3.34 3.34a1.783 1.783 0 0 1-2.988-1.83l-3.04-3.04a1.783 1.783 0 0 1-1.745-.484 1.785 1.785 0 0 1-.485-1.745L4.41 7.2L.454 11.156a1.5 1.5 0 0 0 0 2.127l10.48 10.478a1.5 1.5 0 0 0 2.126 0l10.486-10.486a1.504 1.504 0 0 0 0-2.345z"
    />
  </svg>
)

// 10. WEBRTC (Official Logo)
export const WebRTCIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0"
      stroke="#A78BFA"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="18" r="2" fill="#A78BFA" />
  </svg>
)

// 11. TAILWIND CSS (Official Cyan Waves)
export const TailwindIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#06B6D4"
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z"
    />
  </svg>
)

// 12. POSTGRESQL (Official Elephant Head)
export const PostgresIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#336791"
      d="M12.002 0c-4.475 0-7.854 2.378-8.887 6.47-.852 3.376-.05 7.15 2.125 9.877l.034.043c.125.153.257.3.397.439l-.49 2.012a.667.667 0 0 0 .788.804l2.12-.472c1.233.567 2.57.858 3.913.858 4.476 0 7.855-2.378 8.888-6.47.852-3.377.05-7.15-2.125-9.877l-.034-.043a6.837 6.837 0 0 0-.397-.439l.49-2.012a.667.667 0 0 0-.788-.804l-2.12.472A8.995 8.995 0 0 0 12.002 0zm1.758 3.513c1.696.064 3.037.93 3.655 2.361.344.797.408 1.705.183 2.598-.445 1.764-1.895 3.048-3.69 3.27l-.447.055.203.402c.414.821.572 1.748.455 2.678l-.05.397-.394-.075c-1.127-.215-2.112-.84-2.772-1.758l-.297-.413-.48.172c-1.28.46-2.674.34-3.823-.33-.943-.55-1.574-1.464-1.73-2.507-.22-1.474.394-2.923 1.64-3.876l.39-.297-.24-.43c-.45-.806-.57-1.762-.338-2.69.445-1.765 1.895-3.05 3.69-3.27l.447-.055-.203-.402a5.418 5.418 0 0 1-.455-2.678l.05-.397.394.075c1.127.215 2.112.84 2.772 1.758l.297.413.48-.172c.382-.138.777-.206 1.173-.206z"
    />
  </svg>
)

// 13. LINUX (Official Tux / Shell)
export const LinuxIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#FCC624"
      d="M12.012 0c-2.424 0-4.385 1.956-4.385 4.372 0 1.258.535 2.39 1.393 3.187-.04.426-.062.862-.062 1.306 0 2.21.575 4.225 1.545 5.674-.91.564-1.57 1.544-1.69 2.705-.184 1.765.815 3.42 2.392 3.96 1.488.51 3.12-.047 3.92-1.32.798 1.273 2.43 1.83 3.918 1.32 1.578-.54 2.576-2.195 2.392-3.96-.12-1.16-.78-2.14-1.69-2.705.97-1.45 1.545-3.464 1.545-5.674 0-.444-.022-.88-.062-1.306.858-.797 1.393-1.93 1.393-3.187C20.397 1.956 18.436 0 16.012 0h-4z"
    />
  </svg>
)

// 14. POSTMAN (Official Orange Runner/Circle)
export const PostmanIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fill="#FF6C37"
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.83 14.887l-2.438 1.408a.844.844 0 01-1.154-.309l-.822-1.424a.844.844 0 01.309-1.154l2.438-1.408a.844.844 0 011.154.309l.822 1.424a.844.844 0 01-.309 1.154z"
    />
  </svg>
)

// 15. INTELLIJ IDEA (Official JetBrains Icon)
export const IntelliJIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="5" fill="#000000" />
    <path
      d="M4.5 19.5L9.5 4.5H19.5L14.5 19.5H4.5Z"
      fill="url(#ij-gradient)"
    />
    <path d="M7 7.5H8.5V14H7V7.5Z" fill="#FFFFFF" />
    <path d="M10.5 12.5C10.5 13.6 11.4 14 12.5 14C13.6 14 14.5 13.4 14.5 12.2V7.5H13V12.2C13 12.6 12.7 12.8 12.5 12.8C12.3 12.8 12 12.6 12 12.2V7.5H10.5V12.5Z" fill="#FFFFFF" />
    <path d="M7 15.5H14.5V17H7V15.5Z" fill="#087CFA" />
    <defs>
      <linearGradient id="ij-gradient" x1="4.5" y1="4.5" x2="19.5" y2="19.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FE2857" />
        <stop offset="0.5" stopColor="#9B30FF" />
        <stop offset="1" stopColor="#087CFA" />
      </linearGradient>
    </defs>
  </svg>
)

// 16. VS CODE (Official Visual Studio Code Ribbon)
export const VSCodeIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M17.5 1.5L6.5 10.5L2 7L0.5 8.5L4.5 12L0.5 15.5L2 17L6.5 13.5L17.5 22.5L23.5 19.5V4.5L17.5 1.5Z"
      fill="#007ACC"
    />
    <path
      d="M17.5 1.5L6.5 10.5L17.5 12V1.5Z"
      fill="#1F8AD2"
    />
    <path
      d="M17.5 22.5L6.5 13.5L17.5 12V22.5Z"
      fill="#0065A9"
    />
    <path
      d="M17.5 12L23.5 16.5V7.5L17.5 12Z"
      fill="#1F8AD2"
    />
  </svg>
)

// 17. WARP TERMINAL (Official Warp Lightning / Terminal)
export const WarpIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="5" fill="#010409" />
    <path
      d="M4.5 7.5L11.5 12L4.5 16.5V7.5Z"
      fill="url(#warp-grad)"
    />
    <path
      d="M12.5 15H19.5V16.5H12.5V15Z"
      fill="#29D2BF"
    />
    <defs>
      <linearGradient id="warp-grad" x1="4.5" y1="7.5" x2="11.5" y2="16.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#01A8F5" />
        <stop offset="1" stopColor="#29D2BF" />
      </linearGradient>
    </defs>
  </svg>
)

// 18. OBSIDIAN (Official Purple Crystal)
export const ObsidianIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L4 9L6.5 20L12 22L17.5 20L20 9L12 2Z"
      fill="#7C3AED"
    />
    <path
      d="M12 2L6.5 20L12 22V2Z"
      fill="#6D28D9"
    />
    <path
      d="M12 6L8 10L12 18L16 10L12 6Z"
      fill="#A78BFA"
    />
  </svg>
)

// 19. SPOTIFY (Official Green Music Waves)
export const SpotifyIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="12" fill="#1DB954" />
    <path
      fill="#FFFFFF"
      d="M17.5 11.2c-2.8-.7-7.3-.8-9.9.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3-.9 7.9-.8 11.1.1.4.1.6.6.5 1-.1.4-.6.6-1.3.2zm-.1 2.6c-.3.4-.7.5-1.1.2-2.3-.7-5.9-.9-8.4-.2-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 2.9-.8 6.9-.6 9.6.2.4.2.5.7.3 1.2zm-1.3 2.5c-.2.3-.6.4-.9.2-1.9-.6-4.6-.7-6.5-.2-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 2.2-.6 5.2-.5 7.4.2.3.2.4.6.4 1z"
    />
  </svg>
)

// 20. CLOUDFLARE (Official Orange Cloud)
export const CloudflareIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18.2 11.2C17.7 8.2 15.1 6 12 6c-2.4 0-4.5 1.3-5.5 3.3C4.2 9.6 2.5 11.6 2.5 14c0 2.8 2.2 5 5 5h10.5c2.2 0 4-1.8 4-4 0-2-1.5-3.6-3.8-3.8z"
      fill="#F38020"
    />
  </svg>
)

// 21. FIGMA (Official 5-Piece Brand SVG)
export const FigmaIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
    <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
    <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
    <path d="M12 7h4a2.5 2.5 0 1 1 0 5h-4V7z" fill="#1ABCFE" />
    <path d="M8 12h4v5a2.5 2.5 0 1 1-4-2.5V12z" fill="#0ACF83" />
  </svg>
)

// 22. VITE (Official Lightning Shield)
export const ViteIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21.5 3.5L12.5 20.5L3.5 3.5L14.5 5.5L21.5 3.5Z"
      fill="url(#vite-grad)"
    />
    <path
      d="M13 2.5L7 13.5H11.5L10 20.5L18 9.5H13.5L15 2.5H13Z"
      fill="#FFD62E"
    />
    <defs>
      <linearGradient id="vite-grad" x1="3.5" y1="3.5" x2="21.5" y2="20.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#41D1FF" />
        <stop offset="1" stopColor="#BD34FE" />
      </linearGradient>
    </defs>
  </svg>
)

// 23. WEBSOCKET
export const WebSocketIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 12h3l3-8 6 16 3-8h3"
      stroke="#38BDF8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
