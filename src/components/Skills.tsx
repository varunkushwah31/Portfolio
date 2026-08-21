import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CopyIcon, CheckIcon, TerminalWindowIcon, ArrowSquareOutIcon, SparkleIcon } from "@phosphor-icons/react"
import { sound } from "@/lib/sound"

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
    value: "JAVA 21",
    label: "CORE BACKEND & VIRTUAL THREADS",
    category: "BACKEND",
    highlight: true,
    codeSnippet: {
      filename: "TelemetryEngine.java",
      language: "Java",
      architectureNote: "Java 21 Virtual Threads & Structured Concurrency for high-throughput, non-blocking telemetry event processing.",
      code: `public record TelemetryRecord(String nodeId, double cpuLoad, long memoryBytes) {}

public class TelemetryEngine {
    // High-concurrency event ingestion with lightweight Virtual Threads
    public void processStream(List<TelemetryRecord> records) {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            for (var record : records) {
                scope.fork(() -> {
                    persistMetricSnapshot(record);
                    return null;
                });
            }
            scope.join();
            scope.throwIfFailed();
        }
    }
}`,
      linkedProject: "system-health-dashboard",
    },
  },
  {
    value: "SPRING BOOT",
    label: "ENTERPRISE REST & SECURITY",
    category: "BACKEND",
    highlight: true,
    codeSnippet: {
      filename: "ProblemTrackerController.java",
      language: "Java / Spring",
      architectureNote: "RESTful API design with stateless JWT token validation, Spring Data JPA repositories, and streak computation.",
      code: `@RestController
@RequestMapping("/api/v1/problems")
@RequiredArgsConstructor
public class ProblemController {
    private final ProblemService problemService;

    @GetMapping("/streak")
    public ResponseEntity<StreakDto> getDeveloperStreak(
            @AuthenticationPrincipal UserPrincipal principal) {
        StreakDto streak = problemService.calculateStreak(principal.getId());
        return ResponseEntity.ok(streak);
    }
}`,
      linkedProject: "leetcode-tracker",
    },
  },
  {
    value: "WEBRTC",
    label: "REAL-TIME P2P DATA CHANNELS",
    category: "REALTIME",
    highlight: true,
    codeSnippet: {
      filename: "PeerDataChannel.ts",
      language: "TypeScript",
      architectureNote: "Direct browser-to-browser UDP data transfer using RTCDataChannel with zero server relay bottleneck.",
      code: `const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

// Initialize high-bandwidth binary data stream
const dataChannel = peerConnection.createDataChannel("fileStream", {
  ordered: true
});

dataChannel.onmessage = (event: MessageEvent<ArrayBuffer>) => {
  chunkAssembler.appendChunk(event.data);
  updateTransferProgress(chunkAssembler.getPercentComplete());
};`,
      linkedProject: "mangoshare-clone",
    },
  },
  {
    value: "REACT 19",
    label: "TELEMETRY HOOKS & STATE",
    category: "FRONTEND & MOBILE",
    highlight: true,
    codeSnippet: {
      filename: "useSystemStream.ts",
      language: "TypeScript / React",
      architectureNote: "Custom React 19 real-time telemetry hook utilizing persistent WebSockets and memoized metric frames.",
      code: `export function useSystemStream(endpoint: string) {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    const socket = new WebSocket(endpoint);
    socket.binaryType = "arraybuffer";
    
    socket.onmessage = (event) => {
      const payload = JSON.parse(new TextDecoder().decode(event.data));
      setMetrics(payload);
    };

    return () => socket.close();
  }, [endpoint]);

  return metrics;
}`,
      linkedProject: "system-health-dashboard",
    },
  },
  {
    value: "GIT SUBTREES",
    label: "MONOREPO REPOSITORY SYNC",
    category: "SYSTEMS & DEVOPS",
    highlight: true,
    codeSnippet: {
      filename: "subtree-sync.sh",
      language: "Shell / Git",
      architectureNote: "Managing decoupled frontend & backend codebases in a single synchronized monorepo repository.",
      code: `#!/usr/bin/env bash
# Push client changes back to upstream frontend repository
git subtree push --prefix=client https://github.com/varun/client.git main

# Pull backend updates into unified root repository with squashed history
git subtree pull --prefix=server https://github.com/varun/server.git main --squash`,
      linkedProject: "leetcode-tracker",
    },
  },
  {
    value: "FLUTTER & DART",
    label: "CROSS-PLATFORM MOBILE",
    category: "FRONTEND & MOBILE",
    codeSnippet: {
      filename: "quote_viewmodel.dart",
      language: "Dart / Flutter",
      architectureNote: "Decoupled Clean Architecture separating presentation widgets from the local cache & repository provider.",
      code: `class QuoteViewModel extends ChangeNotifier {
  final QuoteRepository _repository;
  Quote? _currentQuote;

  QuoteViewModel(this._repository);

  Future<void> fetchDailyQuote() async {
    _currentQuote = await _repository.getDailyCuratedQuote();
    notifyListeners();
  }
}`,
      linkedProject: "daily-quotes-app",
    },
  },
  {
    value: "DOCKER & CI/CD",
    label: "CONTAINER RUNTIMES",
    category: "SYSTEMS & DEVOPS",
    codeSnippet: {
      filename: "Dockerfile",
      language: "Docker",
      architectureNote: "Multi-stage Eclipse Temurin Docker build minimizing image footprint and runtime attack surface.",
      code: `FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
COPY target/application.jar app.jar
EXPOSE 8080
USER 1001
ENTRYPOINT ["java", "-XX:+UseZGC", "-Xmx512m", "-jar", "app.jar"]`,
    },
  },
  {
    value: "PYTHON & ML",
    label: "DATA & CLASSIFICATION",
    category: "BACKEND",
    codeSnippet: {
      filename: "classifier_pipeline.py",
      language: "Python",
      architectureNote: "Scikit-Learn pipeline performing 132-symptom vector encoding and 5-fold cross-validated Random Forest classification.",
      code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('clf', RandomForestClassifier(n_estimators=100, random_state=42))
])

scores = cross_val_score(pipeline, X_symptoms, y_diagnosis, cv=5)
print(f"5-Fold Cross-Val Accuracy: {scores.mean():.4f}")`,
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
    sound.click()
    navigator.clipboard.writeText(selectedSkill.codeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="skills"
      className="w-full bg-surface-soft relative border-b border-hairline-strong"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="label-uppercase text-muted text-xs tracking-[3px]">
            [ SECTION // 02 ]
          </span>
          <span className="text-hairline">|</span>
          <span className="label-uppercase text-m-blue-light text-xs tracking-[1.5px] font-bold">
            TECHNICAL CAPABILITIES & CODE SPECIMENS
          </span>
        </motion.div>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink mb-4"
        >
          ENGINEERED TECH STACK
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="body-light text-body text-base md:text-lg mb-12 max-w-3xl leading-relaxed"
        >
          Select any technology below to inspect live code specimens, architectural design patterns, and deployed implementations.
        </motion.p>

        {/* Category Tabs per DESIGN.md */}
        <div className="flex flex-wrap gap-6 border-b border-hairline mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                type="button"
                key={cat}
                onClick={() => {
                  sound.switchTab()
                  setActiveCategory(cat)
                }}
                onMouseEnter={() => sound.hover()}
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
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    sound.click()
                    setSelectedSkill(skill)
                  }}
                  onMouseEnter={() => sound.hover()}
                  className={`p-6 border transition-all duration-200 relative group cursor-pointer ${
                    isSelected
                      ? "bg-surface-card border-m-blue-light shadow-xl"
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
                    className={`mb-2 transition-colors ${
                      isSelected ? "text-m-blue-light font-bold" : "text-ink group-hover:text-m-blue-light"
                    }`}
                    style={{
                      fontSize: "var(--font-size-display-sm)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      textTransform: "uppercase",
                    }}
                  >
                    {skill.value}
                  </div>
                  <div className="label-uppercase text-muted flex items-center justify-between text-[11px]">
                    <span className="truncate pr-2">{skill.label}</span>
                    <span className="text-[10px] font-mono text-m-blue-light opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      [ SPEC → ]
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Code Specimen & Architecture Blueprint Workbench */}
        <AnimatePresence mode="wait">
          {selectedSkill?.codeSnippet && (
            <motion.div
              key={selectedSkill.value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="bg-canvas border border-hairline p-6 md:p-8 overflow-hidden shadow-2xl relative"
              style={{ borderRadius: "0px" }}
            >
              {/* Top M-Stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red" />

              {/* Workbench Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline-strong mb-6">
                <div className="flex items-center gap-3">
                  <TerminalWindowIcon size={18} className="text-m-blue-light" />
                  <div>
                    <span className="label-uppercase text-ink font-bold text-sm tracking-[1.5px]">
                      {selectedSkill.value} {"//"} CODE SPECIMEN
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
                    type="button"
                    onMouseEnter={() => sound.hover()}
                    className="btn-text px-3 py-1.5 bg-surface-soft hover:bg-surface-elevated text-ink border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    style={{ borderRadius: "0px" }}
                  >
                    {copied ? <CheckIcon size={13} className="text-success" /> : <CopyIcon size={13} />}
                    <span>{copied ? "COPIED" : "COPY CODE"}</span>
                  </button>

                  {selectedSkill.codeSnippet.linkedProject && (
                    <a
                      href={`/project/${selectedSkill.codeSnippet.linkedProject}`}
                      onClick={() => sound.click()}
                      onMouseEnter={() => sound.hover()}
                      className="btn-text px-3 py-1.5 bg-surface-elevated hover:bg-surface-card text-m-blue-light border border-hairline text-xs inline-flex items-center gap-1.5 transition-colors"
                      style={{ borderRadius: "0px" }}
                    >
                      <span>VIEW PROJECT SPEC</span>
                      <ArrowSquareOutIcon size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Architecture Blueprint Note */}
              <div className="bg-surface-soft p-4 border border-hairline-strong mb-6 flex items-start gap-3 text-xs">
                <SparkleIcon size={16} className="text-m-blue-light shrink-0 mt-0.5" />
                <div>
                  <span className="label-uppercase text-m-blue-light font-bold mr-2">
                    ARCHITECTURE NOTE:
                  </span>
                  <span className="body-light text-body-strong leading-relaxed">
                    {selectedSkill.codeSnippet.architectureNote}
                  </span>
                </div>
              </div>

              {/* Code Workspace Display with Line Numbers */}
              <div className="bg-[#0c0c0c] border border-hairline-strong p-4 md:p-6 overflow-x-auto font-mono text-xs md:text-sm text-body-strong leading-relaxed">
                <pre>
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
