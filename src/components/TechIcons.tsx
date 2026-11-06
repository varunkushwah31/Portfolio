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
