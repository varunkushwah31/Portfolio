import React from "react"

export interface IconProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

/**
 * Factory to create a standardized Devicon component with official brand colors.
 */
const createDevicon = (iconClass: string, defaultColor: string) => {
  const Component: React.FC<IconProps> = ({ className = "", size, style }) => (
    <i
      className={`devicons ${iconClass} ${className}`.trim()}
      style={{
        fontSize: size ? `${size}px` : undefined,
        width: size ? `${size}px` : undefined,
        height: size ? `${size}px` : undefined,
        color: defaultColor,
        ...style,
      }}
      aria-hidden="true"
    />
  )
  return Component
}

// 1. JAVA (Official Coffee Cup)
export const JavaIcon = createDevicon("devicons-java", "#E76F00")

// 2. SPRING BOOT (Official Leaf)
export const SpringIcon = createDevicon("devicons-spring-icon", "#6DB33F")

// 3. REACT (Official Atom)
export const ReactIcon = createDevicon("devicons-react", "#61DAFB")

// 4. FLUTTER (Official Multi-platform Wings)
export const FlutterIcon = createDevicon("devicons-flutter", "#29B6F6")

// 5. PYTHON (Official Dual Snake)
export const PythonIcon = createDevicon("devicons-python", "#3776AB")

// 6. TYPESCRIPT (Official TS Box)
export const TypeScriptIcon = createDevicon("devicons-typescript-icon", "#3178C6")

// 7. NODE.JS (Official Hexagon)
export const NodeIcon = createDevicon("devicons-nodejs-icon", "#539E43")

// 8. DOCKER (Official Whale with Cargo)
export const DockerIcon = createDevicon("devicons-docker-icon", "#2496ED")

// 9. GIT (Official Branching Logo)
export const GitIcon = createDevicon("devicons-git-icon", "#F05032")

// 10. WEBRTC (Official Real-time Protocol)
export const WebRTCIcon = createDevicon("devicons-webrtc", "#A78BFA")

// 11. TAILWIND CSS (Official Waves)
export const TailwindIcon = createDevicon("devicons-tailwind-icon", "#06B6D4")

// 12. POSTGRESQL (Official Elephant)
export const PostgresIcon = createDevicon("devicons-postgresql", "#336791")

// 13. LINUX (Official Tux Penguin)
export const LinuxIcon = createDevicon("devicons-linux-tux", "#FCC624")

// 14. POSTMAN (Official Runner Circle)
export const PostmanIcon = createDevicon("devicons-postman-icon", "#FF6C37")

// 15. INTELLIJ IDEA (Official JetBrains Icon)
export const IntelliJIcon = createDevicon("devicons-intellij-idea", "#FE2857")

// 16. VS CODE (Official Editor Ribbon)
export const VSCodeIcon = createDevicon("devicons-visual-studio-code", "#007ACC")

// 17. WARP / TERMINAL (Modern Terminal)
export const WarpIcon = createDevicon("devicons-terminal", "#29D2BF")

// 18. OBSIDIAN (Knowledge Crystal)
export const ObsidianIcon = createDevicon("devicons-obsidian-icon", "#7C3AED")

// 19. SPOTIFY (Focus Waves)
export const SpotifyIcon = createDevicon("devicons-spotify-icon", "#1DB954")

// 20. CLOUDFLARE (Edge CDN Cloud)
export const CloudflareIcon = createDevicon("devicons-cloudflare-icon", "#F38020")

// 21. FIGMA (UI Prototype)
export const FigmaIcon = createDevicon("devicons-figma", "#F24E1E")

// 22. VITE (Lightning Tooling)
export const ViteIcon = createDevicon("devicons-vite", "#646CFF")

// 23. WEBSOCKET (Bidirectional Socket)
export const WebSocketIcon = createDevicon("devicons-websocket", "#38BDF8")

// 24. THREE.JS (3D WebGL Graphics)
export const ThreeJSIcon: React.FC<IconProps> = ({ className = "", size = 16, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size, ...style }}
    className={`inline-block ${className}`.trim()}
    aria-hidden="true"
  >
    <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2z" />
    <path d="M12 22V12" />
    <path d="M22 7.5l-10 4.5-10-4.5" />
    <circle cx="12" cy="12" r="2" fill="#38bdf8" stroke="none" />
  </svg>
)

// 25. GSAP (GreenSock Animation Platform)
export const GSAPIcon: React.FC<IconProps> = ({ className = "", size = 16, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: size, height: size, color: "#88CE02", ...style }}
    className={`inline-block ${className}`.trim()}
    aria-hidden="true"
  >
    <path d="M12 2L2 8l10 5 10-5-10-6zM3 14l9 5 9-5M3 18l9 5 9-5" stroke="#88CE02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

// 26. TABLEPLUS (Database GUI Client)
export const TablePlusIcon: React.FC<IconProps> = ({ className = "", size = 26, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    style={{ width: size, height: size, ...style }}
    className={`inline-block ${className}`.trim()}
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#0284C7" strokeWidth="1.8" fill="#0284C7" fillOpacity="0.15" />
    <path d="M4 5v5c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 10v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 15v4c0 1.66 3.58 3 8 3 2.1 0 4.02-.31 5.43-.84" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="18" r="4.5" fill="#0284C7" />
    <path d="M18 15.8v4.4M15.8 18h4.4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

// 27. REDIS (In-Memory Key-Value & Cache)
export const RedisIcon = createDevicon("devicons-redis-icon", "#DC382D")

// 28. LEETCODE (Official Platform Icon)
export const LeetCodeIcon: React.FC<IconProps> = ({ className = "", size = 16, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: size, height: size, ...style }}
    className={`inline-block ${className}`.trim()}
    aria-hidden="true"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
)

// 29. GOOGLE (Official 4-Color Icon)
export const GoogleIcon: React.FC<IconProps> = ({ className = "", size = 16, style }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, ...style }}
    className={`inline-block shrink-0 ${className}`.trim()}
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.29 21.46 7.37 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.1z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.54 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
    />
  </svg>
)

// 30. AWS (Official Amazon Web Services Logo with Signature Orange Smile)
export const AWSIcon: React.FC<IconProps> = ({ className = "", size = 16, style }) => (
  <svg
    viewBox="0 0 600 600"
    style={{ width: size, height: size, ...style }}
    className={`inline-block shrink-0 ${className}`.trim()}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M169 251q.1 11 2.3 17.7 2.3 6.6 6.4 14.3 1.4 2.4 1.4 4.6 0 3-3.8 6l-12.6 8.4a10 10 0 0 1-5.2 1.8q-3 0-6-2.8-4.2-4.6-7.2-9.4-3-5-6.1-11.8a74 74 0 0 1-58.7 27.6 55 55 0 0 1-40-14.4 51 51 0 0 1-14.7-38.3q0-25.5 18.2-41.1Q61 198 91.9 198q10 0 21.1 1.6 11 1.6 23 4.4v-14.6q0-22.6-9.4-31.9-9.6-9.2-32.5-9.2-10.5 0-21.6 2.6-11.1 2.7-21.5 6.8a57 57 0 0 1-10.2 3.2q-4.2 0-4.2-6.2V145q0-4.7 1.4-7a15 15 0 0 1 5.6-4.1q10.5-5.4 25.1-9a121 121 0 0 1 31.1-3.8q35.6 0 52.3 16.2 16.5 16.1 16.6 49V251zm-81 30.2q10 0 20.6-3.6a45 45 0 0 0 19-12.7q4.9-5.6 6.8-12.8t2-17.4v-8.3a167 167 0 0 0-37.2-4.6q-19.9 0-29.7 8t-9.8 23q0 14 7.4 21 7.2 7.4 21 7.4m160.3 21.6q-5.3 0-7.6-2-2.4-2-4.2-7.8l-46.9-154.2a35 35 0 0 1-1.8-8q0-4.9 4.8-5h19.6q5.7 0 7.8 2 2.3 2 4 7.8l33.5 132 31.1-132q1.4-6 3.8-7.8 2.5-1.9 8-2h16q5.5 0 8 2t3.7 7.8l31.6 133.7 34.5-133.7q1.9-6 4-7.8a13 13 0 0 1 7.8-2h18.5q4.9 0 5 5 0 1.4-.4 3.2-.2 1.8-1.4 5l-48 154.2q-2 6-4.3 7.8-2.4 1.9-7.6 2h-17.1q-5.7 0-8-2-2.5-2-3.8-8l-31-128.7-30.7 128.5q-1.5 6-3.7 8-2.5 2-8 2zm256.4 5.4a132 132 0 0 1-53.6-11.6q-4.9-2.8-6.2-5.6a14 14 0 0 1-1.2-5.6v-10.1q0-6.2 4.6-6.2 1.8 0 3.6.6l5 2a109 109 0 0 0 45.6 9.3q19 0 29.2-6.5a22 22 0 0 0 10.4-19q0-8.3-5.4-14a50 50 0 0 0-20.2-10.3l-29-9a61 61 0 0 1-31.9-20.4 47.5 47.5 0 0 1 9.8-67.4q8.9-6.8 20.8-10.4a100 100 0 0 1 38.5-2.6q6.8 1 13 2.2 6 1.4 11.3 3.2t8.4 3.6q4.2 2.3 6 5 1.8 2.4 1.8 6.6v9.3q0 6.3-4.6 6.4-2.5 0-7.6-2.4a91 91 0 0 0-38.3-7.8 52 52 0 0 0-26.5 5.6q-9.4 5.6-9.4 17.8 0 8.4 6 14.2 6 5.6 22 11l28.3 9a61 61 0 0 1 30.9 19 45 45 0 0 1 9.2 28q0 13-5.2 23.2a54 54 0 0 1-14.6 17.5q-9.2 7.4-22.1 11.2-13.4 4.2-28.6 4.2"
    />
    <path
      fill="#FF9900"
      d="M542.5 405.2c-65.7 48.5-161 74.2-243.1 74.2-115 0-218.5-42.5-296.7-113.1-6.2-5.6-.6-13.2 6.7-8.8 84.7 49 189 78.8 297 78.8 72.8 0 152.8-15.2 226.5-46.3 11-5 20.3 7.2 9.6 15.2m27.3-31.2c-8.4-10.7-55.5-5.2-76.8-2.6-6.4.8-7.4-4.7-1.6-9 37.5-26.3 99.1-18.7 106.3-10 7.2 9-2 70.7-37 100.3-5.5 4.5-10.7 2.2-8.3-3.8 8-19.8 25.8-64.3 17.4-74.9"
    />
  </svg>
)
