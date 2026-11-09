import { useState } from "react"
import {
  DownloadSimpleIcon,
  ArrowSquareOutIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  LinkSimpleIcon,
  CheckIcon,
  FilePdfIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react"
import { sound } from "@/lib/sound"
import { useClipboardMachine } from "@/hooks"

interface ResumePdfViewerProps {
  pdfUrl?: string
  previewImgUrl?: string
  fileName?: string
}

export type ViewerState = "loading" | "ready" | "fallback"

export default function ResumePdfViewer({
  pdfUrl = "/Varun_Kushwah_Resume.pdf",
  previewImgUrl = "/resume_preview.png",
  fileName = "Varun_Kushwah_Resume.pdf",
}: Readonly<ResumePdfViewerProps>) {
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [viewerState, setViewerState] = useState<ViewerState>("loading")
  const clipboard = useClipboardMachine({ duration: 2200 })

  const handleZoomIn = () => {
    sound.click()
    setZoomLevel((prev) => Math.min(prev + 15, 145))
  }

  const handleZoomOut = () => {
    sound.click()
    setZoomLevel((prev) => Math.max(prev - 15, 70))
  }

  const handleResetZoom = () => {
    sound.click()
    setZoomLevel(100)
  }

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + pdfUrl
    void clipboard.copy(fullUrl)
  }

  return (
    <div className="w-full rounded-2xl border border-hairline bg-surface-card overflow-hidden shadow-sm transition-all">
      {/* Top PDF Controls Toolbar */}
      <div className="p-3 sm:p-4 bg-surface-elevated/70 border-b border-hairline flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Document Information */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
            <FilePdfIcon size={16} weight="bold" />
          </div>
          <div className="truncate">
            <div className="font-semibold text-ink truncate text-xs sm:text-sm">
              {fileName}
            </div>
            <div className="text-[11px] text-muted font-mono">
              ATS-Optimized 100% · Single Page · ~115 KB
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Zoom Controls (Desktop/Tablet) */}
          <div className="hidden sm:flex items-center bg-canvas border border-hairline rounded-lg p-0.5">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 70}
              className="p-1.5 rounded-md hover:bg-surface-elevated disabled:opacity-30 disabled:pointer-events-none text-muted hover:text-ink transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <MagnifyingGlassMinusIcon size={15} weight="bold" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-[11px] font-mono text-muted hover:text-ink font-semibold"
              title="Reset Zoom"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 145}
              className="p-1.5 rounded-md hover:bg-surface-elevated disabled:opacity-30 disabled:pointer-events-none text-muted hover:text-ink transition-colors cursor-pointer"
              title="Zoom In"
            >
              <MagnifyingGlassPlusIcon size={15} weight="bold" />
            </button>
          </div>

          {/* Copy Direct Link */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-canvas hover:bg-surface-elevated text-xs font-medium text-ink transition-colors cursor-pointer"
            title="Copy Direct PDF URL"
            {...clipboard.triggerProps}
            data-testid="pdf-viewer-copy-link-btn"
          >
            {clipboard.isCopied ? (
              <>
                <CheckIcon size={14} weight="bold" className="text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <LinkSimpleIcon size={14} weight="bold" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* Open in New Window */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-canvas hover:bg-surface-elevated text-xs font-medium text-ink transition-colors"
            title="Open PDF in new window"
          >
            <ArrowSquareOutIcon size={14} weight="bold" />
            <span className="hidden sm:inline">Open in Tab</span>
          </a>

          {/* Direct Download */}
          <a
            href={pdfUrl}
            download={fileName}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
            title="Download PDF"
          >
            <DownloadSimpleIcon size={14} weight="bold" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Main Document Viewer Canvas */}
      <div
        className="relative w-full bg-zinc-900/10 dark:bg-zinc-950/40 min-h-145 sm:min-h-187.5 flex items-center justify-center p-2 sm:p-6 overflow-x-auto"
        data-viewer-state={viewerState}
      >
        {viewerState === "loading" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas/60 backdrop-blur-xs z-10 pointer-events-none"
            role="status"
            aria-live="polite"
          >
            <CircleNotchIcon size={28} className="animate-spin text-emerald-500" />
            <span className="text-xs font-mono text-muted uppercase tracking-wider">Rendering PDF Document...</span>
          </div>
        )}

        {viewerState !== "fallback" ? (
          <div
            className="w-full max-w-4xl transition-all duration-200 shadow-xl rounded-lg overflow-hidden bg-white"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          >
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Varun Kushwah Resume PDF"
              className="w-full h-162.5 sm:h-215 border-none"
              onLoad={() => setViewerState("ready")}
              onError={() => setViewerState("fallback")}
            />
          </div>
        ) : (
          /* Mobile / Disabled PDF iframe fallback */
          <div className="w-full max-w-2xl bg-surface-card border border-hairline rounded-xl p-4 sm:p-6 text-center space-y-4">
            <div className="rounded-lg overflow-hidden border border-hairline shadow-md max-h-125">
              <img
                src={previewImgUrl}
                alt="Varun Kushwah Resume Preview"
                className="w-full object-cover object-top"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">
                Inline PDF rendering is limited on your browser.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium"
                >
                  <ArrowSquareOutIcon size={14} weight="bold" />
                  <span>Open PDF Document</span>
                </a>
                <a
                  href={pdfUrl}
                  download={fileName}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-hairline bg-surface-elevated text-ink text-xs font-medium"
                >
                  <DownloadSimpleIcon size={14} weight="bold" />
                  <span>Download File</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-surface-elevated/40 border-t border-hairline flex items-center justify-between text-[11px] text-muted">
        <span>Single-Page Technical Resume · Verified ATS Compatible</span>
        <span className="font-mono">Updated August 2026</span>
      </div>
    </div>
  )
}
