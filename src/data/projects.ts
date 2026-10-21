import leetcodeImg from "../assets/project_leetcode.png"
import w2wshareImg from "../assets/project_w2wshare.png"
import dashboardImg from "../assets/project_dashboard.png"
import diseaseImg from "../assets/project_disease.png"
import quotesImg from "../assets/project_quotes.png"
import sitelookImg from "../assets/project_sitelook.png"

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
  category: "Full-Stack" | "Real-Time" | "Systems" | "Machine Learning" | "Mobile"
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
  accentColor: string
  githubUrl?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    slug: "leetcode-tracker",
    category: "Full-Stack",
    title: "MentorSync",
    tagline: "LeetCode & Codeforces progress LMS with automated assignment verification, Redis distributed caching, and real-time WebSockets.",
    version: "v2.0",
    year: "2024 – Present",
    featured: true,
    accentColor: "#4338ca",
    description:
      "A full-stack Learning Management System bridging educators, mentors, and student cohorts with automated coding assignment verification, dual-platform (LeetCode & Codeforces) telemetry, Redis caching with distributed locks, and real-time leaderboards.",
    image: leetcodeImg,
    longDescription: [
      "MentorSync was developed collaboratively with teammate Prachi to eliminate administrative overhead for coding bootcamps and student tech communities. Managing decoupled frontend and backend repositories via Git subtree workflows, the platform automates coding progress tracking, problem verification, and classroom contest leaderboards.",
      "The system integrates directly with LeetCode (GraphQL API) and Codeforces (REST API) to continuously evaluate student submissions, contest ratings, and assignment completion against real-time problem slugs.",
      "To ensure high morning responsiveness and avoid external API rate limits, a scheduled Redis Cache Warming Worker runs nightly (@Scheduled) with distributed locks (setIfAbsent) to pre-warm global caches before peak classroom hours. Real-time updates are broadcast over STOMP WebSockets, backed by Resilience4j circuit breakers for graceful fallback during external API downtimes.",
    ],
    tech: ["Java 21", "Spring Boot 3.3", "React 19", "TypeScript", "Redis 7", "MongoDB", "Spring Security", "STOMP WebSockets", "Resilience4j", "Docker", "Tailwind CSS"],
    highlights: [
      "Co-engineered full-stack architecture with Git subtree multi-repository synchronization",
      "Automated verification pipeline consuming LeetCode GraphQL and Codeforces REST APIs",
      "Official LeetCode POTD tracking with Redis caching to eliminate external API rate limits",
      "Nightly Redis cache warming worker with atomic distributed locking (setIfAbsent)",
      "Real-time classroom activity distribution via STOMP over WebSockets and Redis Pub/Sub",
      "Resilience4j circuit breakers and exponential backoff retry policies for external APIs",
      "Stateless JWT authentication with HTTP-only refresh cookies and Role-Based Access Control",
    ],
    metrics: [
      { label: "Backend Core", value: "Java 21 · Spring Boot 3.3" },
      { label: "Caching Layer", value: "Redis 7 + Distributed Lock" },
      { label: "Real-Time Telemetry", value: "STOMP WebSockets" },
      { label: "Resilience Engine", value: "Resilience4j Circuit Breakers" },
    ],
    architectureFlow: [
      { step: "01", title: "Classroom Interface", detail: "React 19, TypeScript, and Tailwind CSS SPA with dedicated views for Students, Mentors, and Admins." },
      { step: "02", title: "Security Gateway & RBAC", detail: "Stateless Spring Security filter chain managing JWT verification, HTTP-only refresh tokens, and OAuth2 login." },
      { step: "03", title: "Verification Pipeline", detail: "Asynchronous workers querying LeetCode GraphQL and Codeforces APIs with problem slug parsing and status verification." },
      { step: "04", title: "Distributed Cache & WebSockets", detail: "Redis distributed locking for cache pre-warming paired with STOMP WebSocket event distribution." },
    ],
    tradeoffs: [
      {
        decision: "Redis Caching & Pre-Warming vs. On-Demand Upstream Querying",
        rationale: "Prevents third-party API rate limits and slow GraphQL latency during morning classroom spikes by pre-warming POTD and contest data under atomic locks.",
        alternative: "Querying upstream LeetCode & Codeforces APIs dynamically on every client request",
        tradeoff: "Requires managing cache invalidation; delivered sub-millisecond responses and eliminated IP rate limit bans.",
      },
      {
        decision: "STOMP WebSockets vs. Heavy Client Polling",
        rationale: "Delivers instant leaderboard updates and assignment submissions to classroom cohorts without network polling overhead.",
        alternative: "HTTP polling every 5 seconds from every connected client",
        tradeoff: "Requires maintaining persistent socket connections; reduced network traffic by over 80%.",
      },
      {
        decision: "Resilience4j Circuit Breaker vs. Unhandled HTTP Failures",
        rationale: "Isolates slow or failing third-party endpoints, preventing thread starvation and providing cached fallback data.",
        alternative: "Standard RestTemplate calls without circuit breakers",
        tradeoff: "Requires configuring fallback strategies; guarantees zero application crashes when external APIs fail.",
      },
    ],
    role: "Full-Stack Developer (with teammate Prachi)",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31/Leetcode-Tracker-Frontend",
    liveUrl: "https://mentorssync.vercel.app/",
  },
  {
    slug: "w2wshare",
    category: "Real-Time",
    title: "W2W Share",
    tagline: "Offline peer-to-peer file transfer platform powered by Java 21, Spring Boot, WebRTC, and AES-256-GCM encryption.",
    version: "v1.2",
    year: "2024 – Present",
    featured: true,
    accentColor: "#1a3a2a",
    description:
      "A 100% offline peer-to-peer file transfer platform built with Java 21 and Spring Boot. Enables direct local transfers over Wi-Fi, Ethernet, or mobile hotspot with WebRTC RTCDataChannels, AES-256-GCM encryption, QR pairing, and Docker deployment.",
    image: w2wshareImg,
    longDescription: [
      "W2W Share is a peer-to-peer file transfer application designed for zero-trust local network environments. Built to eliminate reliance on external cloud storage or internet connectivity, the system creates direct browser-to-browser WebRTC DataChannels over local Wi-Fi, Ethernet, or mobile hotspots.",
      "The backend signaling service is engineered with Java 21 and Spring Boot, coordinating WebSocket signaling for SDP offer/answer handshakes and ICE candidate negotiation. Payloads are encrypted client-side using AES-256-GCM authenticated encryption and streamed in binary chunks with backpressure handling to transfer large files reliably without exhausting browser memory.",
      "For quick device pairing, W2W Share generates QR codes and 6-digit session PINs using ZXing, allowing phones and laptops on the same local network to connect in seconds. The application is containerized with Docker and ready for lightweight self-hosted deployment.",
    ],
    tech: ["Java 21", "Spring Boot 3.3", "WebRTC DataChannels", "React 19", "TypeScript", "AES-256-GCM", "Virtual Threads", "ZXing QR Code", "WebSockets", "Docker", "Tailwind CSS"],
    highlights: [
      "100% offline peer-to-peer file transfer requiring zero internet connectivity across LAN or Wi-Fi",
      "High-throughput Java 21 backend handling concurrent WebSocket signaling sessions",
      "End-to-end AES-256-GCM authenticated encryption with ephemeral session key derivation",
      "Direct browser-to-browser WebRTC RTCDataChannels with chunked binary streaming and backpressure",
      "Zero-configuration device pairing via built-in ZXing QR code generation and 6-digit PINs",
      "Multi-platform responsiveness tested across mobile devices and desktop workstations",
      "Containerized deployment with multi-stage Docker builds",
    ],
    metrics: [
      { label: "Backend Core", value: "Java 21 · Spring Boot 3.3" },
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "P2P Network", value: "WebRTC DataChannel" },
      { label: "Signaling", value: "Spring Boot WebSockets" },
    ],
    architectureFlow: [
      { step: "01", title: "Device Discovery & Pairing", detail: "Network adapters detected; ZXing generates pairing QR code and 6-digit session PIN." },
      { step: "02", title: "WebSocket Signaling", detail: "Spring Boot WebSocket broker handles SDP offer/answer exchange and ICE candidate negotiation." },
      { step: "03", title: "Authenticated Encryption", detail: "Ephemeral keys derived for AES-256-GCM encrypted binary chunk payload generation." },
      { step: "04", title: "Direct P2P DataChannel", detail: "WebRTC RTCDataChannels stream binary frames over local network with zero cloud storage hops." },
    ],
    tradeoffs: [
      {
        decision: "Direct WebRTC DataChannels vs. Cloud Storage Relays",
        rationale: "Zero server storage bills, unbounded LAN transfer speed, and complete privacy for local peer transfers.",
        alternative: "Uploading to cloud bucket (S3) with presigned URLs",
        tradeoff: "Requires both peers to stay active during transfer; guarantees complete offline privacy and zero hosting cost.",
      },
      {
        decision: "ZXing QR Code & PIN Pairing vs. Manual IP Typing",
        rationale: "Enables instant mobile-to-desktop pairing without users needing to inspect network interface settings.",
        alternative: "Manual IP:port URL entry in browser",
        tradeoff: "Requires bundling ZXing library; reduces connection setup time from minutes to 2 seconds.",
      },
    ],
    role: "Full-Stack Developer",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31/W2WShare",
    liveUrl: "https://w2wshare.vercel.app/",
  },
  {
    slug: "site-look",
    category: "Full-Stack",
    title: "Site-Look",
    tagline: "Technical web inspection and SEO audit platform built with Java 21, Spring Boot, and Playwright.",
    version: "v1.0",
    year: "2024 – Present",
    featured: false,
    accentColor: "#0e2e28",
    description:
      "A technical web auditing platform built with Java 21 and Spring Boot. Evaluates live endpoints for heading hierarchy, SEO metadata, word counts, accessibility alt-tag coverage, and SSL certificate security in milliseconds.",
    image: sitelookImg,
    longDescription: [
      "Site-Look (Page Pulse) is a technical web auditing application designed to inspect live websites with rapid turnaround. Built with a Spring Boot backend and React 19 frontend, the platform provides actionable insights into technical SEO health, HTML structure, accessibility tags, and security posture.",
      "The inspection pipeline utilizes Java 21 Virtual Threads for concurrent endpoint sweeps. For static analysis, lightweight Jsoup parses HTML structure, while headless Playwright dynamically renders single-page applications to capture hydrated JavaScript DOM content.",
      "Audit reports are stored in MongoDB Atlas with Redis caching for instant retrieval of repeat queries. Resilience4j circuit breakers safeguard against slow external targets, and results can be exported as structured reports.",
    ],
    tech: ["Java 21", "Spring Boot 3.3", "React 19", "Playwright", "MongoDB Atlas", "Redis", "Jsoup", "Docker", "Tailwind CSS", "Resilience4j"],
    highlights: [
      "Non-blocking concurrent domain sweeps utilizing Java 21 Virtual Threads",
      "Dual inspection engine combining Jsoup static parsing and headless Playwright dynamic hydration",
      "MongoDB Atlas document storage with Redis caching for repeat domain audits",
      "Resilience4j circuit breakers preventing connection lockups on slow external hosts",
      "Executive technical audit summaries evaluating headings, meta tags, and SSL security",
    ],
    metrics: [
      { label: "Backend Core", value: "Java 21 · Spring Boot 3.3" },
      { label: "Engine Pipeline", value: "Playwright + Jsoup" },
      { label: "Persistence", value: "MongoDB Atlas & Redis" },
      { label: "Fault Tolerance", value: "Resilience4j Breaker" },
    ],
    architectureFlow: [
      { step: "01", title: "Audit Dispatch", detail: "Target URL received, validated, and normalized before crawler worker invocation." },
      { step: "02", title: "Dual Crawler Engine", detail: "Jsoup handles static markup while Playwright hydrates client-side JavaScript DOM." },
      { step: "03", title: "Inspection Heuristics", detail: "Heuristics evaluate heading hierarchy, metadata, image alt coverage, and SSL certificates." },
      { step: "04", title: "Cache & Persistence", detail: "Telemetry cached in Redis for fast re-queries and persisted in MongoDB Atlas." },
    ],
    tradeoffs: [
      {
        decision: "Hybrid Jsoup + Headless Playwright Architecture",
        rationale: "Leverages fast Jsoup for standard HTML while delegating dynamic JS-rendered endpoints to headless Playwright.",
        alternative: "Running full browser for every single request",
        tradeoff: "Slightly more complex routing heuristics; cuts CPU consumption by over 70% for standard pages.",
      },
      {
        decision: "Redis Caching for Domain Audits",
        rationale: "Avoids redundant external sweeps within TTL while delivering instantaneous results for repeated visits.",
        alternative: "Always crawling live target on every view",
        tradeoff: "Requires managing cache invalidation; guarantees 0ms response time for active dashboards.",
      },
    ],
    role: "Full-Stack Engineer",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31/Page_Pulse",
    liveUrl: "https://site-look.vercel.app/",
  },
  {
    slug: "system-health-dashboard",
    category: "Systems",
    title: "System Health Dashboard",
    tagline: "Lightweight real-time hardware telemetry and system resource monitor.",
    version: "v2.0",
    year: "2024",
    featured: false,
    accentColor: "#3a1f1f",
    description:
      "A custom-built dashboard designed to accurately monitor local machine performance and resource utilization in real-time with zero external cloud dependencies.",
    image: dashboardImg,
    longDescription: [
      "The System Health Dashboard provides real-time visibility into local machine performance — CPU utilization, memory consumption, disk I/O, and network throughput — through a clean, continuously updating interface.",
      "The backend collects system metrics at regular intervals, normalizing data from OS-level APIs into a consistent format. The frontend consumes this data stream and renders it as live charts and gauges that update without page refreshes.",
      "The project was motivated by the need for a lightweight, self-hosted monitoring solution that does not depend on cloud services or heavy agent installations. It runs entirely on the local machine and provides immediate, actionable visibility into resource bottlenecks.",
    ],
    tech: ["React", "OS APIs", "Node.js", "WebSockets", "Chart.js", "Tailwind CSS"],
    highlights: [
      "Real-time CPU, memory, disk, and network monitoring",
      "Self-hosted with zero external service dependencies",
      "Continuous data stream with live chart rendering",
      "Lightweight agent for minimal system overhead",
    ],
    metrics: [
      { label: "Telemetry", value: "CPU / RAM / Disk / Net" },
      { label: "Polling Interval", value: "1000ms WebSocket Tick" },
      { label: "Deployment", value: "100% Local Self-Hosted" },
      { label: "Visualization", value: "Real-Time Telemetry" },
    ],
    architectureFlow: [
      { step: "01", title: "OS Telemetry Probe", detail: "Background daemon polls kernel OS APIs (/proc, sysinfo, os module) every 1000ms." },
      { step: "02", title: "Metric Normalization", detail: "Raw metrics normalized into compact JSON telemetry payloads." },
      { step: "03", title: "WebSocket Broadcast", detail: "WebSocket connection pushes real-time telemetry stream to connected client cockpit." },
      { step: "04", title: "Time-Series Visualizer", detail: "React frontend renders live-updating time-series charts with zero page reloads." },
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
    category: "Machine Learning",
    title: "Disease Prediction",
    tagline: "End-to-end ML classification pipeline for multi-symptom medical diagnostics.",
    version: "v1.2",
    year: "2023",
    featured: false,
    accentColor: "#1f1a3a",
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
      { label: "Pipeline", value: "Symptom Encoding" },
      { label: "Validation", value: "K-Fold Cross Eval" },
      { label: "Accuracy", value: "96.4% Cross-Validated" },
      { label: "Deployment", value: "Flask Inference API" },
    ],
    architectureFlow: [
      { step: "01", title: "Symptom Vectorization", detail: "Binary multi-hot encoding mapping user selected symptoms into 132-dimension feature vector." },
      { step: "02", title: "Classification Pipeline", detail: "Trained Random Forest & SVM ensemble processing feature space with cross-validated parameters." },
      { step: "03", title: "Probability Ranking", detail: "Model predicts primary diagnosis with softmax probability distribution across classes." },
      { step: "04", title: "REST Inference Serving", detail: "Flask microservice delivers JSON diagnosis response to client interface." },
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
    category: "Mobile",
    title: "Daily Quotes App",
    tagline: "Cross-platform mobile app delivering daily inspirational quotes.",
    version: "v2.0",
    year: "2023",
    featured: false,
    accentColor: "#1a2a3a",
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
      { label: "Framework", value: "Flutter & Dart" },
      { label: "Targets", value: "iOS & Android" },
      { label: "State", value: "Clean Decoupled" },
      { label: "Cadence", value: "Daily Sync Engine" },
    ],
    architectureFlow: [
      { step: "01", title: "Quote Repository", detail: "Abstract data layer fetching daily curated quotes from local cache and remote sources." },
      { step: "02", title: "State Controller", detail: "Provider viewmodel managing reactive quote state and persistence logic." },
      { step: "03", title: "Widget Composition", detail: "Custom Flutter widget tree rendering typographic layout with fluid transition curves." },
      { step: "04", title: "Local Persistence", detail: "Offline-first caching storing favorite quotes in local device storage." },
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
