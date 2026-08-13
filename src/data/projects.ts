import leetcodeImg from "../assets/project_leetcode.png"
import mangoshareImg from "../assets/project_mangoshare.png"
import dashboardImg from "../assets/project_dashboard.png"
import diseaseImg from "../assets/project_disease.png"
import quotesImg from "../assets/project_quotes.png"

export interface Project {
  slug: string
  category: string
  title: string
  description: string
  longDescription: string[]
  tech: string[]
  highlights: string[]
  role: string
  status: string
  image: string
}

const projects: Project[] = [
  {
    slug: "leetcode-tracker",
    category: "FULL-STACK",
    title: "LEETCODETRACKER",
    description:
      "A full-stack application designed to track coding progress. Developed collaboratively with a team, effectively managing both frontend and backend integration and complex version control using Git subtree workflows.",
    image: leetcodeImg,
    longDescription: [
      "LeetcodeTracker is a purpose-built full-stack application that provides developers with a structured way to track their coding progress across competitive programming platforms. The application addresses the common challenge of maintaining consistent practice habits and measuring improvement over time.",
      "Built collaboratively with teammate Prachi, the project demanded rigorous coordination between frontend and backend codebases. We adopted Git subtree workflows to manage both parts as a unified repository while preserving independent development histories — a strategy that taught us practical version control patterns beyond basic branching.",
      "The backend handles user authentication, progress persistence, and analytics computation, while the frontend delivers a clean interface for logging solved problems, reviewing history, and visualizing streaks and category breakdowns.",
    ],
    tech: ["Full-stack Development", "Git Subtree Workflows", "Team Collaboration", "REST API", "Authentication"],
    highlights: [
      "Integrated frontend and backend in a single repository using Git subtree workflows",
      "Collaborative development with structured code review and branch management",
      "Progress tracking with streak analytics and category-wise breakdown",
      "User authentication and persistent session management",
    ],
    role: "Full-stack Developer",
    status: "Active Development",
  },
  {
    slug: "mangoshare-clone",
    category: "REAL-TIME",
    title: "MANGOSHARE CLONE",
    description:
      "A file-sharing application clone built from scratch, featuring real-time peer-to-peer communication capabilities.",
    image: mangoshareImg,
    longDescription: [
      "MangoShare Clone is a file-sharing application rebuilt from the ground up to understand and implement the mechanics of real-time peer-to-peer data transfer. Rather than relying on a central server for file relay, the application establishes direct connections between users using WebRTC.",
      "The React-based frontend manages the user interface for file selection, transfer progress visualization, and connection state management. Under the hood, WebRTC handles the signaling process, ICE candidate exchange, and data channel establishment required for direct browser-to-browser communication.",
      "This project served as a deep dive into the WebRTC protocol stack — understanding STUN/TURN servers, session descriptions, and the constraints of NAT traversal — while also exercising frontend state management for real-time UI updates during active transfers.",
    ],
    tech: ["React", "WebRTC", "Peer-to-Peer", "Real-time Communication", "Data Channels"],
    highlights: [
      "Direct browser-to-browser file transfer without server relay",
      "WebRTC signaling and ICE candidate negotiation",
      "Real-time transfer progress tracking and status updates",
      "Built from scratch to understand P2P communication fundamentals",
    ],
    role: "Frontend Developer",
    status: "Completed",
  },
  {
    slug: "system-health-dashboard",
    category: "SYSTEMS",
    title: "SYSTEM HEALTH DASHBOARD",
    description:
      "A custom-built dashboard designed to accurately monitor local machine performance and resource utilization in real-time.",
    image: dashboardImg,
    longDescription: [
      "The System Health Dashboard provides real-time visibility into local machine performance — CPU utilization, memory consumption, disk I/O, and network throughput — through a clean, continuously updating interface.",
      "The backend collects system metrics at regular intervals, normalizing data from OS-level APIs into a consistent format. The frontend consumes this data stream and renders it as live charts and gauges that update without page refreshes.",
      "The project was motivated by the need for a lightweight, self-hosted monitoring solution that does not depend on cloud services or heavy agent installations. It runs entirely on the local machine and provides immediate, actionable visibility into resource bottlenecks.",
    ],
    tech: ["Systems Monitoring", "Real-time Data Visualization", "OS-level APIs", "Live Charts"],
    highlights: [
      "Real-time CPU, memory, disk, and network monitoring",
      "Self-hosted with zero external service dependencies",
      "Continuous data stream with live chart rendering",
      "Lightweight agent for minimal system overhead",
    ],
    role: "Solo Developer",
    status: "Completed",
  },
  {
    slug: "disease-prediction",
    category: "MACHINE LEARNING",
    title: "DISEASE PREDICTION",
    description:
      "A comprehensive end-to-end Machine Learning project mapping user-inputted symptoms to potential disease predictions.",
    image: diseaseImg,
    longDescription: [
      "Disease Prediction is an end-to-end Machine Learning project developed for college coursework. The system accepts a set of user-inputted symptoms and maps them to potential disease predictions using trained classification models.",
      "The data pipeline handles symptom encoding, feature normalization, and model training across multiple classification algorithms. The final model was selected based on cross-validated accuracy metrics and tested against a held-out evaluation set.",
      "The project covered the full ML lifecycle — from raw data cleaning and exploratory analysis through feature engineering, model selection, hyperparameter tuning, and deployment of a prediction interface that non-technical users can interact with.",
    ],
    tech: ["Machine Learning", "Data Processing", "Classification Models", "Feature Engineering", "Python"],
    highlights: [
      "End-to-end ML pipeline from data cleaning to prediction serving",
      "Multiple classification algorithms compared via cross-validation",
      "Symptom-to-disease mapping with probability-ranked outputs",
      "User-facing interface for non-technical interaction",
    ],
    role: "ML Developer",
    status: "Completed",
  },
  {
    slug: "daily-quotes-app",
    category: "MOBILE",
    title: "DAILY QUOTES APP",
    description:
      "A mobile application developed to deliver daily inspirational quotes to users.",
    image: quotesImg,
    longDescription: [
      "The Daily Quotes App is a mobile application built with Flutter that delivers curated inspirational quotes to users on a daily basis. The app combines clean material design with a smooth content-browsing experience.",
      "Flutter's cross-platform capabilities allowed the app to target both Android and iOS from a single Dart codebase. The architecture separates the quote data layer from the presentation layer, making it straightforward to swap data sources or extend the content catalog.",
      "The project served as a hands-on introduction to mobile development patterns — widget composition, state management, navigation, and the build/deploy workflow for mobile platforms.",
    ],
    tech: ["Flutter", "Dart", "Mobile Development", "Cross-platform", "Material Design"],
    highlights: [
      "Cross-platform mobile app from a single Dart codebase",
      "Daily content refresh with curated quote collections",
      "Clean material design with smooth navigation",
      "Separation of data and presentation layers",
    ],
    role: "Mobile Developer",
    status: "Completed",
  },
]

export default projects
