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
  accentColor: string   // Card background color for visual variety
  githubUrl?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    slug: "leetcode-tracker",
    category: "Full-Stack",
    title: "MentorSync",
    tagline: "High-performance LeetCode & Codeforces LMS with automated assignment verification, Redis distributed cache warming, and clustered WebSockets.",
    version: "v2.5",
    year: "2024 – Present",
    featured: true,
    accentColor: "#4338ca",
    description:
      "A high-performance Learning Management System bridging educators, mentors, and students with automated coding assignment verification, dual-platform (LeetCode & Codeforces) telemetry, nightly Redis cache warming with distributed locks, and real-time clustered leaderboards.",
    image: leetcodeImg,
    longDescription: [
      "MentorSync is an enterprise-grade Learning Management System engineered to eliminate administrative overhead for coding bootcamps, university computer science departments, and competitive programming clubs. By integrating directly with LeetCode (GraphQL API) and Codeforces (REST API), MentorSync continuously tracks problem solutions, contest rating progressions, and assignment deadlines in real-time.",
      "The platform features an official LeetCode Problem of the Day (POTD) tracker with global Redis caching (24h TTL) and a collaborative classroom participation ticker ('14 of 24 students in your classroom have solved today's POTD!'), alongside a live upcoming contest aggregator covering LeetCode Weekly/Biweekly contests and Codeforces Div 1–4 matches with 404-prevention filtering and direct registration redirects.",
      "Engineered for sub-millisecond morning responsiveness, a nightly scheduled Redis Cache Warming Worker runs at 03:00 AM UTC (@Scheduled) with atomic distributed locking via setIfAbsent() (lock:cache:warming) to prime global caches and student statistics before peak traffic. Real-time classroom updates are delivered over STOMP WebSockets connected through a Redis Pub/Sub cluster bridge, while Resilience4j circuit breakers, exponential backoff retries, and 15 req/10s rate limits guarantee fault tolerance against upstream API throttling.",
    ],
    tech: ["Java 21", "Spring Boot 4", "React 19", "TypeScript", "Redis 7+", "MongoDB", "Spring Security", "STOMP WebSockets", "Resilience4j", "Docker", "Tailwind CSS v4"],
    highlights: [
      "Official LeetCode POTD tracker with global Redis caching (24h TTL) and live classroom participation solve tickers",
      "Live upcoming contest schedule aggregating LeetCode (Weekly/Biweekly) and Codeforces (Div 1–4) with 404-prevention filters",
      "Nightly Redis cache warming worker (03:00 UTC) with atomic distributed locks (setIfAbsent) ensuring 0ms peak morning latency",
      "Real-time STOMP over WebSocket communication synchronized across clustered nodes via Redis Pub/Sub cluster bridge",
      "Enterprise resilience with Resilience4j circuit breakers, exponential backoff retries (up to 3x), and 15 req/10s rate limiting",
      "Classroom & assignment management with problem URL title auto-fetch, one-click verification, and student email nudge triggers",
      "Enterprise security with stateless JWT, HTTP-only refresh cookies, Google OAuth2, and 3-tier RBAC (Student, Mentor, Super Admin)",
    ],
    metrics: [
      { label: "Backend Core", value: "Java 21 · Spring Boot 4" },
      { label: "Distributed Caching", value: "Redis 7 + Distributed Lock" },
      { label: "Real-Time Telemetry", value: "STOMP WS + Redis Pub/Sub" },
      { label: "Resilience Engine", value: "Resilience4j Circuit Breaker" },
    ],
    architectureFlow: [
      { step: "01", title: "Classroom Cockpit & Client", detail: "React 19, TypeScript, and Tailwind CSS v4 single-page app delivering dedicated portals for Students, Mentors, and Super Admins." },
      { step: "02", title: "Security Gateway & RBAC", detail: "Stateless Spring Security filter chain managing JWT verification, HTTP-only refresh token rotation, and Google OAuth2 login." },
      { step: "03", title: "Telemetry & Automated Verification", detail: "Asynchronous workers querying LeetCode GraphQL and Codeforces REST APIs, with problem slug parsing and submission verification." },
      { step: "04", title: "Distributed Cache & Cluster Bridge", detail: "Redis distributed locking for nightly cache pre-warming paired with Redis Pub/Sub WebSocket event distribution across nodes." },
    ],
    tradeoffs: [
      {
        decision: "Global Redis Caching & Nightly Cache Warming vs. On-Demand Upstream Querying",
        rationale: "Completely eliminates third-party API rate limits and slow GraphQL latency during morning classroom spikes by pre-warming global POTD, contest schedules, and student stats under atomic Redis locks.",
        alternative: "Querying upstream LeetCode & Codeforces APIs dynamically on every client request",
        tradeoff: "Requires managing distributed lock expiration and cache invalidation; delivered 0ms response times and eliminated IP rate limit bans.",
      },
      {
        decision: "Redis Pub/Sub WebSocket Bridge vs. Single-Node In-Memory WebSockets",
        rationale: "Enables multi-instance containerized deployments where classroom assignment updates and live leaderboards synchronize seamlessly across all instances.",
        alternative: "Standard in-memory WebSocket broker bound to a single server instance",
        tradeoff: "Requires a persistent Redis message broker; ensures zero dropped notifications in clustered or Kubernetes setups.",
      },
      {
        decision: "Resilience4j Circuit Breaker & Exponential Backoff vs. Unthrottled HTTP Calls",
        rationale: "Protects server infrastructure from cascading timeouts when third-party competitive programming APIs experience downtime or high error rates.",
        alternative: "Standard RestTemplate/WebClient calls without circuit breakers or retry policies",
        tradeoff: "Slightly more complex exception handling fallbacks; guarantees graceful degradation to cached Redis data.",
      },
    ],
    role: "Full-Stack Developer & Backend Architect",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31/Leetcode-Tracker-Frontend",
    liveUrl: "https://mentorssync.vercel.app/",
  },
  {
    slug: "w2wshare",
    category: "Real-Time",
    title: "W2W Share",
    tagline: "Production-grade offline E2EE peer-to-peer file transfer engine powered by Java 25 Virtual Threads, Spring Boot 4, WebRTC, and Bouncy Castle cryptography.",
    version: "v2.0",
    year: "2024 – Present",
    featured: true,
    accentColor: "#1a3a2a",
    description:
      "Production-grade 100% offline peer-to-peer file transfer platform powered by Java 25 Virtual Threads and Spring Boot 4.1. Delivers zero-internet LAN/Wi-Fi transfers with WebRTC RTCDataChannels, Bouncy Castle AES-256-GCM encryption, ZXing QR-pairing, and Prometheus/Grafana container observability.",
    image: w2wshareImg,
    longDescription: [
      "W2W Share is an enterprise-grade offline peer-to-peer file transfer platform engineered for zero-trust, high-security local network environments. Built to eliminate reliance on external internet connections, centralized storage servers, or third-party cloud relays, the system establishes direct browser-to-browser WebRTC DataChannels over local Wi-Fi, Ethernet, or mobile hotspots with absolute end-to-end privacy.",
      "The backend architecture is powered by Java 25 Virtual Threads and Spring Boot 4.1, orchestrating high-concurrency WebSocket signaling (/ws/signal), multi-interface network discovery (Wi-Fi, Hotspot, Ethernet), and UDP Subnet Peer Discovery on port 53535. File payloads are protected with Bouncy Castle AES-256-GCM authenticated encryption and streamed in client-side binary chunks with adaptive backpressure control, effortlessly handling multi-gigabyte files (up to 50GB storage quotas) with under 50MB RAM consumption.",
      "For friction-free zero-configuration pairing, W2W Share integrates ZXing QR code generation and 6-digit cryptographic PIN verification, allowing mobile and desktop devices to connect with a single scan without typing IP addresses or ports. The production system is containerized via multi-stage Docker builds (eclipse-temurin:25-jre-noble), monitored continuously with Spring Boot Actuator, Prometheus v2.51, and custom Grafana dashboards.",
    ],
    tech: ["Java 25", "Spring Boot 4.1", "WebRTC DataChannels", "React 19", "TypeScript", "Bouncy Castle Crypto", "Virtual Threads", "ZXing QR Code", "WebSockets", "Docker", "Prometheus", "Grafana", "Tailwind CSS v4"],
    highlights: [
      "100% offline peer-to-peer file transfer requiring zero internet connectivity across LAN, Wi-Fi, or mobile hotspots",
      "High-throughput Java 25 Virtual Threads backend with Tomcat connection pooling supporting 10,000 concurrent sessions",
      "Military-grade Bouncy Castle AES-256-GCM authenticated encryption with ephemeral session key derivation",
      "Direct browser-to-browser WebRTC RTCDataChannels over UDP with streaming backpressure handling up to 50GB file transfers",
      "Instant zero-configuration device pairing via built-in ZXing QR code generation and 6-digit cryptographic PINs",
      "UDP Subnet Peer Broadcast Discovery (port 53535/udp) and dynamic network interface telemetry (Wi-Fi/Ethernet/Loopback)",
      "Production-grade multi-stage Docker deployment with Prometheus metrics scraping and pre-configured Grafana dashboards",
    ],
    metrics: [
      { label: "Backend Core", value: "Java 25 · Virtual Threads" },
      { label: "Encryption", value: "AES-256-GCM · Bouncy Castle" },
      { label: "P2P Network", value: "WebRTC DataChannel (UDP)" },
      { label: "Observability", value: "Prometheus + Grafana" },
    ],
    architectureFlow: [
      { step: "01", title: "Interface Discovery & QR Pairing", detail: "NetworkDiscoveryService auto-detects local network adapters; ZXing generates an instant pairing QR code and 6-digit session PIN." },
      { step: "02", title: "Spring Boot WebSocket Signaling", detail: "Java 25 Virtual Threads broker SDP offer/answer handshakes and ICE candidate negotiation over /ws/signal with 10k connection pooling." },
      { step: "03", title: "E2EE Key Derivation & Encryption", detail: "Peers derive ephemeral keys via Bouncy Castle authenticated AES-256-GCM primitives before chunk transmission." },
      { step: "04", title: "Direct UDP Streaming & Observability", detail: "WebRTC RTCDataChannels stream binary frames over UDP with client backpressure while Actuator streams telemetry to Prometheus/Grafana." },
    ],
    tradeoffs: [
      {
        decision: "Java 25 Virtual Threads with High-Concurrency Tomcat Pooling",
        rationale: "Handles thousands of simultaneous signaling sessions and WebSocket streams with minimal memory overhead compared to fixed OS thread pools.",
        alternative: "Standard ThreadPoolExecutor with fixed worker threads",
        tradeoff: "Requires modern Java 25 runtime; delivers sub-millisecond signaling latency and eliminates thread pool starvation.",
      },
      {
        decision: "Direct WebRTC DataChannel with Client-Side Bouncy Castle AES-256-GCM",
        rationale: "Zero cloud relay bandwidth costs, unlimited transfer speed bounded only by local peer hardware, and complete cryptographic confidentiality.",
        alternative: "Central Cloud Bucket (S3) with Presigned Upload URLs",
        tradeoff: "Requires both peers to remain connected during transfer; completely eliminates cloud storage bills and zero-trust privacy vulnerabilities.",
      },
      {
        decision: "ZXing QR Code & 6-Digit PIN Pairing vs. Manual IP Input",
        rationale: "Enables instant frictionless mobile-to-desktop device pairing without users needing to know or type LAN IP addresses or subnet masks.",
        alternative: "Manual IP:port URL entry in browser address bar",
        tradeoff: "Requires bundling ZXing Java library and QR canvas renderer; cuts connection setup time from minutes to 2 seconds.",
      },
    ],
    role: "Distributed Systems & Full-stack Developer",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31/W2WShare",
    liveUrl: "https://w2wshare.vercel.app/",
  },
  {
    slug: "system-health-dashboard",
    category: "Systems",
    title: "System Health Dashboard",
    tagline: "Lightweight real-time hardware telemetry and system resource monitor.",
    version: "v3.0",
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
    tech: ["React", "OS APIs", "Node.js", "Real-time Telemetry", "Chart.js", "WebSockets"],
    highlights: [
      "Real-time CPU, memory, disk, and network monitoring",
      "Self-hosted with zero external service dependencies",
      "Continuous data stream with live chart rendering",
      "Lightweight agent for minimal system overhead",
    ],
    metrics: [
      { label: "Telemetry", value: "CPU / RAM / Disk / Net" },
      { label: "Polling Rate", value: "1000ms Tick Engine" },
      { label: "Dependencies", value: "Zero Cloud Overhead" },
      { label: "Visualization", value: "Live Real-Time Charts" },
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
      { label: "Accuracy", value: "Optimized Fit" },
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
  {
    slug: "site-look",
    category: "Full-Stack",
    title: "Site-Look",
    tagline: "High-performance technical web inspection & audit engine powered by Java 25 Virtual Threads & Spring Boot.",
    version: "v1.0",
    year: "2024 – Present",
    featured: false,
    accentColor: "#0e2e28",
    description:
      "Enterprise-grade technical web audit engine built with Java 25 and Spring Boot 4.1. Executes non-blocking parallel sweeps across live endpoints, evaluating SEO metadata, heading hierarchy, text-to-HTML ratios, accessibility, and SSL security in milliseconds.",
    image: sitelookImg,
    longDescription: [
      "Site-Look (Page Pulse) is a high-performance web auditing platform engineered to inspect live target web endpoints in milliseconds. Powered by a Spring Boot 4.1 backend and React 19 frontend, the platform audits SEO health, heading hierarchies, word counts, accessibility alt-tag coverage, and SSL security posture.",
      "The backend harnesses Java 25 Virtual Threads to orchestrate concurrent domain crawling and parallel batch sweeps with minimal thread overhead. For deep page inspection, a dual-layer engine pairs lightweight Jsoup HTML parsing with headless Playwright dynamic browser rendering, ensuring JavaScript-heavy single-page apps are fully evaluated.",
      "Audit results and historical trajectories are persisted in MongoDB Atlas with Redis distributed caching for instant repeated queries. The architecture incorporates Spring Cloud Circuit Breakers (Resilience4j) to isolate slow endpoints, Spring Security with JWT authentication, real-time WebSocket progress updates, and automated executive PDF audit reports compiled via OpenPDF.",
    ],
    tech: ["Java 25", "Spring Boot 4.1", "React 19", "Playwright", "MongoDB Atlas", "Redis", "Virtual Threads", "OpenPDF", "Jsoup", "Docker", "Tailwind CSS", "Resilience4j"],
    highlights: [
      "High-throughput web crawler utilizing Java 25 Virtual Threads for non-blocking concurrent domain sweeps",
      "Dual scraping engine pairing Jsoup parsing with headless Playwright for dynamic SPA JavaScript execution",
      "Distributed MongoDB Atlas document store with Redis caching and Resilience4j circuit breakers",
      "Real-time WebSocket audit streaming and automated executive PDF compilation using OpenPDF",
    ],
    metrics: [
      { label: "Backend Core", value: "Java 25 Virtual Threads" },
      { label: "Framework", value: "Spring Boot 4.1" },
      { label: "Engine Pipeline", value: "Playwright + Jsoup" },
      { label: "Persistence", value: "MongoDB Atlas & Redis" },
    ],
    architectureFlow: [
      { step: "01", title: "Target URL Dispatch", detail: "Client initiates audit request; Spring Security & Validation normalizes protocols, validates target DNS, and verifies JWT claims." },
      { step: "02", title: "Concurrent Scraper Engine", detail: "Java 25 Virtual Threads dispatch Jsoup for fast static parsing and headless Playwright for full client-side JavaScript DOM hydration." },
      { step: "03", title: "Inspection & Scoring Heuristics", detail: "Rules evaluate heading hierarchies, text-to-HTML ratios, OpenGraph metadata, accessibility alt tags, and SSL certificate security." },
      { step: "04", title: "Cache, Stream & PDF Export", detail: "Telemetry persisted in MongoDB Atlas, cached in Redis, streamed via WebSockets, and formatted into PDF via OpenPDF." },
    ],
    tradeoffs: [
      {
        decision: "Java 25 Virtual Threads over OS Platform Threads",
        rationale: "Enables millions of concurrent lightweight audit tasks without thread pool exhaustion or high memory overhead.",
        alternative: "Traditional ThreadPoolExecutor with fixed workers",
        tradeoff: "Requires modern JVM runtime (Java 25); allows massive parallel domain crawling with near-zero thread blocking latency.",
      },
      {
        decision: "Hybrid Jsoup + Headless Playwright Inspection",
        rationale: "Leverages blazing-fast Jsoup for static HTML while delegating dynamic JS-rendered endpoints to headless Playwright.",
        alternative: "Single heavy browser instance for all requests",
        tradeoff: "Slightly more complex routing heuristics; cuts resource consumption by over 70% for standard web pages.",
      },
      {
        decision: "Redis Caching with MongoDB Document Store",
        rationale: "Prevents duplicate external HTTP sweeps within TTL while preserving complete historical audit trajectory snapshots.",
        alternative: "Pure SQL relational database without caching",
        tradeoff: "Requires managing cache invalidation; provides sub-millisecond retrieval for repeated domain queries.",
      },
    ],
    role: "Full-Stack Engineer",
    status: "Active Development",
    githubUrl: "https://github.com/varunkushwah31/Page_Pulse",
    liveUrl: "https://site-look.vercel.app/",
  },
]

export default projects

