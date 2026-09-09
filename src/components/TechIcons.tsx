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
