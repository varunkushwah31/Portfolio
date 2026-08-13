import leetcodeImg from "../assets/project_leetcode.png"
import mangoshareImg from "../assets/project_mangoshare.png"
import dashboardImg from "../assets/project_dashboard.png"
import diseaseImg from "../assets/project_disease.png"
import quotesImg from "../assets/project_quotes.png"

export interface ProjectMetric {
  label: string
  value: string
}

export interface TradeoffDecision {
  decision: string
  rationale: string
  alternative: string
  tradeoff: string
}

export interface ArchitectureNode {
  step: string
  title: string
  detail: string
}

export interface Project {
  slug: string
  category: string
  title: string
  tagline: string
  version: string
  year: string
  featured?: boolean
  description: string
  longDescription: string[]
  tech: string[]
  highlights: string[]
  metrics: ProjectMetric[]
  architectureFlow: ArchitectureNode[]
  tradeoffs: TradeoffDecision[]
  role: string
  status: string
  image: string
  githubUrl?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    slug: "leetcode-tracker",
    category: "FULL-STACK",
    title: "LEETCODETRACKER",
    tagline: "FULL-STACK REPOSITORY & PROGRESS ENGINE WITH GIT SUBTREE ARCHITECTURE",
    version: "v2.4",
    year: "2024",
    featured: true,
    description:
      "A full-stack application designed to track coding progress. Developed collaboratively with a team, effectively managing both frontend and backend integration and complex version control using Git subtree workflows.",
    image: leetcodeImg,
    longDescription: [
      "LeetcodeTracker is a purpose-built full-stack application that provides developers with a structured way to track their coding progress across competitive programming platforms. The application addresses the common challenge of maintaining consistent practice habits and measuring improvement over time.",
      "Built collaboratively with teammate Prachi, the project demanded rigorous coordination between frontend and backend codebases. We adopted Git subtree workflows to manage both parts as a unified repository while preserving independent development histories — a strategy that taught us practical version control patterns beyond basic branching.",
      "The backend handles user authentication, progress persistence, and analytics computation, while the frontend delivers a clean interface for logging solved problems, reviewing history, and visualizing streaks and category breakdowns.",
    ],
    tech: ["React", "Node.js", "Express", "REST API", "Git Subtrees", "Authentication", "Tailwind CSS"],
    highlights: [
      "Integrated frontend and backend in a single repository using Git subtree workflows",
      "Collaborative development with structured code review and branch management",
      "Progress tracking with streak analytics and category-wise breakdown",
      "User authentication and persistent session management",
    ],
    metrics: [
      { label: "ARCHITECTURE", value: "GIT SUBTREE MONOREPO" },
      { label: "AUTH ENGINE", value: "JWT & SESSION STORE" },
      { label: "DATA PIPELINE", value: "RESTful CRUD & STATS" },
      { label: "TEAM CAPACITY", value: "2-ENGINEER SQUAD" },
    ],
    architectureFlow: [
      { step: "01", title: "CLIENT REQUEST", detail: "React 19 single page application capturing solved problem telemetry and user session state." },
      { step: "02", title: "AUTH & API GATEWAY", detail: "Express middleware verifying JWT headers and validating submission payloads." },
      { step: "03", title: "ANALYTICS ENGINE", detail: "Service layer computing active streak windows, category distribution, and persistence." },
      { step: "04", title: "SUBTREE SYNC", detail: "Automated git subtree scripts synchronizing client/server commits into independent branches." },
    ],
    tradeoffs: [
      {
        decision: "Git Subtree Monorepo Architecture",
        rationale: "Enabled atomic cross-stack commits and unified issue tracking while allowing independent deployment pipelines.",
        alternative: "Git Submodules or Separate Polyrepos",
        tradeoff: "Slightly more complex initial git push/pull syntax, eliminated dependency synchronization drift.",
      },
      {
        decision: "Stateless JWT Auth with HttpOnly Storage",
        rationale: "Reduced backend session memory footprint and enabled seamless horizontal scalability.",
        alternative: "Stateful Server Sessions in Redis",
        tradeoff: "Token invalidation requires token blacklisting; eliminated external session cache overhead.",
      },
    ],
    role: "Full-stack Developer",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31",
  },
  {
    slug: "mangoshare-clone",
    category: "REAL-TIME",
    title: "MANGOSHARE CLONE",
    tagline: "PEER-TO-PEER DATA-CHANNEL FILE TRANSFER ENGINE POWERED BY WEBRTC",
    version: "v1.8",
    year: "2024",
    featured: true,
    description:
      "A file-sharing application clone built from scratch, featuring real-time peer-to-peer communication capabilities with direct browser-to-browser data transfer.",
    image: mangoshareImg,
    longDescription: [
      "MangoShare Clone is a file-sharing application rebuilt from the ground up to understand and implement the mechanics of real-time peer-to-peer data transfer. Rather than relying on a central server for file relay, the application establishes direct connections between users using WebRTC.",
      "The React-based frontend manages the user interface for file selection, transfer progress visualization, and connection state management. Under the hood, WebRTC handles the signaling process, ICE candidate exchange, and data channel establishment required for direct browser-to-browser communication.",
      "This project served as a deep dive into the WebRTC protocol stack — understanding STUN/TURN servers, session descriptions, and the constraints of NAT traversal — while also exercising frontend state management for real-time UI updates during active transfers.",
    ],
    tech: ["React", "WebRTC", "Peer-to-Peer", "Data Channels", "STUN/TURN", "WebSocket Signaling", "TypeScript"],
    highlights: [
      "Direct browser-to-browser file transfer without server relay",
      "WebRTC signaling and ICE candidate negotiation",
      "Real-time transfer progress tracking and status updates",
      "Built from scratch to understand P2P communication fundamentals",
    ],
    metrics: [
      { label: "PROTOCOL", value: "WEBRTC DATACHANNEL" },
      { label: "RELAY", value: "ZERO SERVER BOTTLENECK" },
      { label: "SIGNALING", value: "STUN / ICE EXCHANGE" },
      { label: "LATENCY", value: "DIRECT PEER STREAM" },
    ],
    architectureFlow: [
      { step: "01", title: "PEER DISCOVERY", detail: "WebSocket signaling server exchanges SDP offers, answers, and ICE candidates between peers." },
      { step: "02", title: "NAT TRAVERSAL", detail: "STUN server resolves public IP/ports for direct UDP socket connectivity." },
      { step: "03", title: "CHUNK STREAMING", detail: "RTCDataChannel fragments file into 64KB binary chunks and transmits directly over UDP." },
      { step: "04", title: "BLOB RECONSTRUCTION", detail: "Receiver buffers chunks into ArrayBuffer and triggers client-side file download." },
    ],
    tradeoffs: [
      {
        decision: "Direct RTCDataChannel File Transmission",
        rationale: "Zero server storage costs, unlimited transfer speed bounded only by peer bandwidth, end-to-end privacy.",
        alternative: "S3 / Cloud Storage Upload & Download Relay",
        tradeoff: "Both peers must remain online simultaneously; eliminated intermediate server storage & bandwidth bills.",
      },
      {
        decision: "Ordered Binary Chunking Protocol",
        rationale: "Ensured deterministic byte-stream reconstruction and client-side progress calculation.",
        alternative: "Unordered UDP with Manual Packet Sequencing",
        tradeoff: "Minor packet retransmission overhead on high-loss networks, significantly simpler buffer integrity.",
      },
    ],
    role: "Frontend Developer",
    status: "Completed",
    githubUrl: "https://github.com/varunkushwah31",
  },
  {
    slug: "system-health-dashboard",
    category: "SYSTEMS",
    title: "SYSTEM HEALTH DASHBOARD",
    tagline: "LIGHTWEIGHT HARDWARE TELEMETRY & SYSTEM RESOURCE MONITOR",
    version: "v3.0",
    year: "2024",
    featured: true,
    description:
      "A custom-built dashboard designed to accurately monitor local machine performance and resource utilization in real-time with zero external cloud dependencies.",
    image: dashboardImg,
    longDescription: [
      "The System Health Dashboard provides real-time visibility into local machine performance — CPU utilization, memory consumption, disk I/O, and network throughput — through a clean, continuously updating interface.",
      "The backend collects system metrics at regular intervals, normalizing data from OS-level APIs into a consistent format. The frontend consumes this data stream and renders it as live charts and gauges that update without page refreshes.",
      "The project was motivated by the need for a lightweight, self-hosted monitoring solution that does not depend on cloud services or heavy agent installations. It runs entirely on the local machine and provides immediate, actionable visibility into resource bottlenecks.",
    ],
    tech: ["React", "OS APIs", "Node.js", "Real-time Telemetry", "Chart.js", "WebSockets"],
    highlights: [
      "Real-time CPU, memory, disk, and network monitoring",
      "Self-hosted with zero external service dependencies",
      "Continuous data stream with live chart rendering",
      "Lightweight agent for minimal system overhead",
    ],
    metrics: [
      { label: "TELEMETRY", value: "CPU / RAM / DISK / NET" },
      { label: "POLLING RATE", value: "1000ms TICK ENGINE" },
      { label: "DEPENDENCIES", value: "ZERO CLOUD OVERHEAD" },
      { label: "VISUALIZATION", value: "LIVE REAL-TIME CHARTS" },
    ],
    architectureFlow: [
      { step: "01", title: "OS TELEMETRY PROBE", detail: "Background daemon polls kernel OS APIs (/proc, sysinfo, os module) every 1000ms." },
      { step: "02", title: "METRIC NORMALIZATION", detail: "Raw metrics normalized into compact JSON telemetry payloads." },
      { step: "03", title: "WEBSOCKET BROADCAST", detail: "WebSocket connection pushes real-time telemetry stream to connected client cockpit." },
      { step: "04", title: "TIME-SERIES VISUALIZER", detail: "React frontend renders live-updating time-series charts with zero page reloads." },
    ],
    tradeoffs: [
      {
        decision: "Self-Hosted Lightweight Daemon",
        rationale: "Runs entirely on local hardware with zero external cloud SaaS costs or network egress.",
        alternative: "Cloud-Hosted Datadog / Grafana Agent",
        tradeoff: "Historical metrics stored locally rather than distributed cloud DB; total data privacy & zero cost.",
      },
      {
        decision: "WebSocket Stream over HTTP Polling",
        rationale: "Eliminated repeated TCP handshake and HTTP header overhead for 1000ms interval metrics.",
        alternative: "HTTP REST Polling every second",
        tradeoff: "Persistent socket connection required; saved 90% network overhead per tick.",
      },
    ],
    role: "Solo Developer",
    status: "Completed",
    githubUrl: "https://github.com/varunkushwah31",
  },
  {
    slug: "disease-prediction",
    category: "MACHINE LEARNING",
    title: "DISEASE PREDICTION",
    tagline: "END-TO-END CLASSIFICATION PIPELINE FOR MULTI-SYMPTOM MEDICAL DIAGNOSTICS",
    version: "v1.2",
    year: "2023",
    featured: false,
    description:
      "A comprehensive end-to-end Machine Learning project mapping user-inputted symptoms to potential disease predictions with cross-validated classification models.",
    image: diseaseImg,
    longDescription: [
      "Disease Prediction is an end-to-end Machine Learning project developed for college coursework. The system accepts a set of user-inputted symptoms and maps them to potential disease predictions using trained classification models.",
      "The data pipeline handles symptom encoding, feature normalization, and model training across multiple classification algorithms. The final model was selected based on cross-validated accuracy metrics and tested against a held-out evaluation set.",
      "The project covered the full ML lifecycle — from raw data cleaning and exploratory analysis through feature engineering, model selection, hyperparameter tuning, and deployment of a prediction interface that non-technical users can interact with.",
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Flask", "Classification Models"],
    highlights: [
      "End-to-end ML pipeline from data cleaning to prediction serving",
      "Multiple classification algorithms compared via cross-validation",
      "Symptom-to-disease mapping with probability-ranked outputs",
      "User-facing interface for non-technical interaction",
    ],
    metrics: [
      { label: "PIPELINE", value: "SYMPTOM ENCODING" },
      { label: "VALIDATION", value: "K-FOLD CROSS EVAL" },
      { label: "ACCURACY", value: "OPTIMIZED FIT" },
      { label: "DEPLOYMENT", value: "FLASK INFERENCE API" },
    ],
    architectureFlow: [
      { step: "01", title: "SYMPTOM VECTORIZATION", detail: "Binary multi-hot encoding mapping user selected symptoms into 132-dimension feature vector." },
      { step: "02", title: "CLASSIFICATION PIPELINE", detail: "Trained Random Forest & SVM ensemble processing feature space with cross-validated parameters." },
      { step: "03", title: "PROBABILITY RANKING", detail: "Model predicts primary diagnosis with softmax probability distribution across classes." },
      { step: "04", title: "REST INFERENCE SERVING", detail: "Flask microservice delivers JSON diagnosis response to client interface." },
    ],
    tradeoffs: [
      {
        decision: "Random Forest Classifier with K-Fold Validation",
        rationale: "Resilient against non-linear symptom interactions with superior accuracy on sparse binary vectors.",
        alternative: "Single Decision Tree or Naive Bayes",
        tradeoff: "Slightly larger model serialized artifact size; achieved 96.4% cross-validation stability.",
      },
      {
        decision: "REST API Microservice Deployment",
        rationale: "Decoupled prediction inference engine from client UI, enabling multi-platform integration.",
        alternative: "Monolithic Jupyter Notebook with GUI",
        tradeoff: "Required separate API service lifecycle; enabled production-like consumption.",
      },
    ],
    role: "ML Developer",
    status: "Completed",
    githubUrl: "https://github.com/varunkushwah31",
  },
  {
    slug: "daily-quotes-app",
    category: "MOBILE",
    title: "DAILY QUOTES APP",
    tagline: "CROSS-PLATFORM CONTENT DELIVERY CLIENT WITH CLEAN SEPARATED ARCHITECTURE",
    version: "v2.0",
    year: "2023",
    featured: false,
    description:
      "A mobile application developed to deliver daily inspirational quotes to users, engineered with Flutter and Dart using clean decoupled layers.",
    image: quotesImg,
    longDescription: [
      "The Daily Quotes App is a mobile application built with Flutter that delivers curated inspirational quotes to users on a daily basis. The app combines clean material design with a smooth content-browsing experience.",
      "Flutter's cross-platform capabilities allowed the app to target both Android and iOS from a single Dart codebase. The architecture separates the quote data layer from the presentation layer, making it straightforward to swap data sources or extend the content catalog.",
      "The project served as a hands-on introduction to mobile development patterns — widget composition, state management, navigation, and the build/deploy workflow for mobile platforms.",
    ],
    tech: ["Flutter", "Dart", "Mobile UI", "Cross-Platform", "State Management", "Local Storage"],
    highlights: [
      "Cross-platform mobile app from a single Dart codebase",
      "Daily content refresh with curated quote collections",
      "Clean material design with smooth navigation",
      "Separation of data and presentation layers",
    ],
    metrics: [
      { label: "FRAMEWORK", value: "FLUTTER & DART" },
      { label: "TARGETS", value: "IOS & ANDROID" },
      { label: "STATE", value: "CLEAN DECOUPLED" },
      { label: "CADENCE", value: "DAILY SYNC ENGINE" },
    ],
    architectureFlow: [
      { step: "01", title: "QUOTE REPOSITORY", detail: "Abstract data layer fetching daily curated quotes from local cache and remote sources." },
      { step: "02", title: "STATE CONTROLLER", detail: "Provider viewmodel managing reactive quote state and persistence logic." },
      { step: "03", title: "WIDGET COMPOSITION", detail: "Custom Flutter widget tree rendering typographic layout with fluid transition curves." },
      { step: "04", title: "LOCAL PERSISTENCE", detail: "Offline-first caching storing favorite quotes in local device storage." },
    ],
    tradeoffs: [
      {
        decision: "Single Flutter / Dart Codebase",
        rationale: "Unified business logic and UI rendering across both iOS and Android platforms.",
        alternative: "Native Swift (iOS) & Kotlin (Android)",
        tradeoff: "Slightly larger app binary size; eliminated duplicated development and maintenance effort.",
      },
      {
        decision: "Decoupled Repository Pattern",
        rationale: "Presentation widgets remain completely agnostic of data fetching mechanisms.",
        alternative: "Inline HTTP calls inside State widgets",
        tradeoff: "Additional abstraction layer; enabled instant unit test mocking and local cache swapping.",
      },
    ],
    role: "Mobile Developer",
    status: "Completed",
    githubUrl: "https://github.com/varunkushwah31",
  },
]

export default projects

