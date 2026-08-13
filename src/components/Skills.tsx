import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Terminal, ExternalLink, Sparkles } from "lucide-react"

interface SkillItem {
  value: string
  label: string
  category: "BACKEND" | "FRONTEND & MOBILE" | "SYSTEMS & DEVOPS" | "REALTIME"
  highlight?: boolean
  codeSnippet?: {
    filename: string
    language: string
    code: string
    architectureNote: string
    linkedProject?: string
  }
}

const skills: SkillItem[] = [
  {
    value: "JAVA",
    label: "CORE LANGUAGE",
    category: "BACKEND",
    highlight: true,
    codeSnippet: {
      filename: "TelemetryService.java",
      language: "Java",
      architectureNote: "Java 21 Virtual Threads & Pattern Matching for clean high-throughput backend services.",
      code: `public record TelemetryRecord(String nodeId, double cpuLoad, long memoryBytes) {}

public class TelemetryEngine {
    public void processMetrics(TelemetryRecord record) {
        // High-concurrency event processing with Virtual Threads
        Thread.startVirtualThread(() -> {
            System.out.printf("[%s] CPU: %.2f%% | RAM: %d MB%n",
                record.nodeId(), record.cpuLoad(), record.memoryBytes() / (1024 * 1024));
        });
    }
}`,
      linkedProject: "system-health-dashboard",
    },
  },
  {
    value: "SPRING BOOT",
    label: "ENTERPRISE BACKEND",
    category: "BACKEND",
    highlight: true,
    codeSnippet: {
      filename: "ProblemTrackerController.java",
      language: "Java / Spring",
      architectureNote: "RESTful API design with Spring Security, JWT authentication, and JPA repository abstractions.",
      code: `@RestController
@RequestMapping("/api/v1/problems")
@RequiredArgsConstructor
public class ProblemController {
    private final ProblemService problemService;

    @GetMapping("/streak")
    public ResponseEntity<StreakDto> getDeveloperStreak(@AuthenticationPrincipal UserPrincipal user) {
        StreakDto streak = problemService.calculateStreak(user.getId());
        return ResponseEntity.ok(streak);
    }
}`,
      linkedProject: "leetcode-tracker",
    },
  },
  {
    value: "WEBRTC",
    label: "REAL-TIME P2P",
    category: "REALTIME",
    highlight: true,
    codeSnippet: {
      filename: "PeerDataChannel.ts",
      language: "TypeScript",
      architectureNote: "Direct browser-to-browser data transfer using RTCDataChannel with STUN/TURN signaling.",
      code: `const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

const dataChannel = peerConnection.createDataChannel("fileStream", {
  ordered: true
});

dataChannel.onmessage = (event: MessageEvent<ArrayBuffer>) => {
  chunkAssembler.appendChunk(event.data);
  updateTelemetryProgress(chunkAssembler.getPercentComplete());
};`,
      linkedProject: "mangoshare-clone",
    },
  },
  {
    value: "REACT",
    label: "FRONTEND FRAMEWORK",
    category: "FRONTEND & MOBILE",
    highlight: true,
    codeSnippet: {
      filename: "useSystemStream.ts",
      language: "TypeScript / React",
      architectureNote: "Custom React 19 hook with WebSocket real-time subscription and memoized telemetry state.",
      code: `export function useSystemStream(endpoint: string) {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    const socket = new WebSocket(endpoint);
    socket.onmessage = (event) => setMetrics(JSON.parse(event.data));
    return () => socket.close();
  }, [endpoint]);

  return metrics;
}`,
      linkedProject: "system-health-dashboard",
    },
  },
  {
    value: "GIT SUBTREES",
    label: "MONOREPO ARCHITECTURE",
    category: "SYSTEMS & DEVOPS",
    highlight: true,
    codeSnippet: {
      filename: "subtree-sync.sh",
      language: "Shell / Git",
      architectureNote: "Managing decoupled frontend & backend codebases in a single synchronized monorepo repository.",
      code: `# Sync frontend subtree changes to remote client repo
git subtree push --prefix=client https://github.com/varun/client.git main

# Pull backend updates into unified root repository
git subtree pull --prefix=server https://github.com/varun/server.git main --squash`,
      linkedProject: "leetcode-tracker",
    },
  },
  {
    value: "FLUTTER",
    label: "MOBILE CLIENT",
    category: "FRONTEND & MOBILE",
    codeSnippet: {
      filename: "quote_viewmodel.dart",
      language: "Dart / Flutter",
      architectureNote: "Decoupled Clean Architecture separating presentation widgets from the quote data provider layer.",
      code: `class QuoteViewModel extends ChangeNotifier {
  final QuoteRepository _repository;
  Quote? _currentQuote;

  Future<void> fetchDailyQuote() async {
    _currentQuote = await _repository.getDailyCuratedQuote();
    notifyListeners();
  }
}`,
      linkedProject: "daily-quotes-app",
    },
  },
  {
    value: "DEVOPS",
    label: "CI/CD & CONTAINERS",
    category: "SYSTEMS & DEVOPS",
    codeSnippet: {
      filename: "Dockerfile",
      language: "Docker",
      architectureNote: "Multi-stage Docker builds optimizing deployment bundle size and runtime security.",
      code: `FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseZGC", "-jar", "app.jar"]`,
    },
  },
  {
    value: "PYTHON & ML",
    label: "DATA & CLASSIFICATION",
    category: "BACKEND",
    codeSnippet: {
      filename: "classifier_pipeline.py",
      language: "Python",
      architectureNote: "Scikit-Learn pipeline performing symptom vector encoding, model training, and k-fold evaluation.",
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', RandomForestClassifier(n_estimators=100, random_state=42))
])

scores = cross_val_score(pipeline, X_symptoms, y_diagnosis, cv=5)
print(f"Cross-Validation Accuracy: {scores.mean():.4f}")`,
      linkedProject: "disease-prediction",
    },
  },
]

const categories = ["ALL", "BACKEND", "FRONTEND & MOBILE", "SYSTEMS & DEVOPS", "REALTIME"]

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(skills[0])
  const [copied, setCopied] = useState(false)

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === "ALL") return true
    return s.category === activeCategory
  })

  const handleCopyCode = () => {
    if (!selectedSkill?.codeSnippet) return
    navigator.clipboard.writeText(selectedSkill.codeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="skills"
      className="w-full bg-surface-soft relative"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-uppercase text-muted mb-4"
        >
          [ SECTION // 02 ]
        </motion.div>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-4"
        >
          TECHNICAL CAPABILITIES & STACK
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="body-light text-body text-base md:text-lg mb-12 max-w-3xl"
        >
          Click on any technology tile below to inspect live code specimens, architectural patterns, and production implementations.
        </motion.p>

        {/* Category Tabs per DESIGN.md */}
        <div className="flex flex-wrap gap-6 border-b border-hairline mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative pb-3 label-uppercase transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-ink font-bold" : "text-body hover:text-ink"
                }`}
                style={{ fontSize: "13px", letterSpacing: "1.5px" }}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Primary skills — interactive spec-cell grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.value === skill.value

              return (
                <motion.div
                  layout
                  key={skill.value}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-6 border transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? "bg-surface-card border-m-blue-light shadow-lg"
                      : "bg-canvas border-hairline-strong hover:border-hairline"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {/* Selected Indicator Bar */}
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-m-blue-light via-m-blue-dark to-m-red" />
                  )}

                  {skill.highlight && !isSelected && (
                    <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-m-blue-dark rounded-full" />
                  )}

                  <div
                    className={`mb-3 transition-colors ${
                      isSelected ? "text-m-blue-light font-bold" : "text-ink group-hover:text-m-blue-light"
                    }`}
                    style={{
                      fontSize: "var(--font-size-display-sm)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {skill.value}
                  </div>
                  <div className="label-uppercase text-muted flex items-center justify-between text-xs">
                    <span>{skill.label}</span>
                    <span className="text-[10px] font-mono text-m-blue-dark opacity-0 group-hover:opacity-100 transition-opacity">
                      [ SPEC → ]
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Code Specimen & Architecture Blueprint Drawer */}
        <AnimatePresence mode="wait">
          {selectedSkill?.codeSnippet && (
            <motion.div
              key={selectedSkill.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="bg-canvas border border-hairline p-6 md:p-8 mb-16 overflow-hidden shadow-2xl relative"
              style={{ borderRadius: "0px" }}
            >
              {/* Top M-Stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red" />

              {/* Drawer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline-strong mb-6">
                <div className="flex items-center gap-3">
                  <Terminal size={18} className="text-m-blue-light" />
                  <div>
                    <span className="label-uppercase text-ink font-bold text-sm tracking-[1.5px]">
                      {selectedSkill.value} // CODE SPECIMEN
                    </span>
                    <span className="text-hairline mx-2">|</span>
                    <span className="font-mono text-xs text-muted">
                      {selectedSkill.codeSnippet.filename}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyCode}
                    className="btn-text px-3 py-1.5 bg-surface-soft hover:bg-surface-elevated text-ink border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    style={{ borderRadius: "0px" }}
                  >
                    {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                    <span>{copied ? "COPIED" : "COPY CODE"}</span>
                  </button>

                  {selectedSkill.codeSnippet.linkedProject && (
                    <a
                      href={`/project/${selectedSkill.codeSnippet.linkedProject}`}
                      className="btn-text px-3 py-1.5 bg-surface-elevated hover:bg-surface-card text-m-blue-light border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors"
                      style={{ borderRadius: "0px" }}
                    >
                      <span>VIEW PROJECT</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>

              {/* Architecture Blueprint Note */}
              <div className="bg-surface-soft p-4 border border-hairline-strong mb-6 flex items-start gap-3 text-xs">
                <Sparkles size={16} className="text-m-blue-light shrink-0 mt-0.5" />
                <div>
                  <span className="label-uppercase text-m-blue-light font-bold mr-2">ARCHITECTURE NOTE:</span>
                  <span className="body-light text-body-strong leading-relaxed">
                    {selectedSkill.codeSnippet.architectureNote}
                  </span>
                </div>
              </div>

              {/* Code Workspace Display */}
              <div className="bg-[#0c0c0c] border border-hairline-strong p-4 md:p-6 overflow-x-auto">
                <pre className="font-mono text-xs md:text-sm text-body-strong leading-relaxed">
                  <code>{selectedSkill.codeSnippet.code}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills
