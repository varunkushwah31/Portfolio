import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  XIcon,
  SquaresFourIcon,
  TableIcon,
  EyeIcon,
  CpuIcon,
  SparkleIcon,
  SlidersHorizontalIcon,
  ArrowCounterClockwiseIcon,
  TerminalWindowIcon,
  PulseIcon,
  BroadcastIcon,
  BrainIcon,
  DeviceMobileIcon,
  StackIcon,
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import projects from "@/data/projects"
import type { Project } from "@/data/projects"
import ProjectQuickSpecModal from "./ProjectQuickSpecModal"
import ProjectVisual from "./ProjectVisual"
import { sound } from "@/lib/sound"

const CATEGORIES = ["ALL", "FULL-STACK", "REAL-TIME", "SYSTEMS", "MACHINE LEARNING", "MOBILE"]
const POPULAR_TECH = ["ALL TECH", "React", "WebRTC", "Node.js", "Python", "Flutter", "Git Subtrees"]

type ViewMode = "grid" | "matrix"
type SortMode = "default" | "featured" | "name"

const getProjectIcon = (slug: string) => {
  switch (slug) {
    case "leetcode-tracker":
      return <TerminalWindowIcon size={14} className="text-m-blue-light" />
    case "mangoshare-clone":
      return <BroadcastIcon size={14} className="text-m-blue-dark" />
    case "system-health-dashboard":
      return <PulseIcon size={14} className="text-m-red" />
    case "disease-prediction":
      return <BrainIcon size={14} className="text-m-blue-light" />
    case "daily-quotes-app":
      return <DeviceMobileIcon size={14} className="text-m-blue-dark" />
    default:
      return <StackIcon size={14} className="text-muted" />
  }
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [selectedTech, setSelectedTech] = useState("ALL TECH")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortMode, setSortMode] = useState<SortMode>("default")
  const [quickSpecProject, setQuickSpecProject] = useState<Project | null>(null)

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: projects.length }
    CATEGORIES.forEach((cat) => {
      if (cat !== "ALL") {
        counts[cat] = projects.filter((p) => p.category.toUpperCase() === cat).length
      }
    })
    return counts
  }, [])

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    let list = projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "ALL" || project.category.toUpperCase() === selectedCategory

      const matchesTech =
        selectedTech === "ALL TECH" ||
        project.tech.some((t) => t.toLowerCase() === selectedTech.toLowerCase())

      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q)) ||
        project.role.toLowerCase().includes(q)

      return matchesCategory && matchesTech && matchesSearch
    })

    if (sortMode === "featured") {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else if (sortMode === "name") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    }

    return list
  }, [selectedCategory, selectedTech, searchQuery, sortMode])

  const handleResetFilters = () => {
    sound.click()
    setSelectedCategory("ALL")
    setSelectedTech("ALL TECH")
    setSearchQuery("")
    setSortMode("default")
  }

  const isFiltered =
    selectedCategory !== "ALL" || selectedTech !== "ALL TECH" || searchQuery.trim().length > 0

  return (
    <section
      id="projects"
      className="w-full bg-canvas relative border-b border-hairline-strong"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section Telemetry Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="label-uppercase text-muted tracking-[3px] text-xs">
              [ SECTION {"//"} 03 ]
            </span>
            <span className="text-hairline">|</span>
            <span className="label-uppercase text-m-blue-light tracking-[1.5px] text-xs font-bold">
              ENGINEERING REPOSITORIES & SYSTEMS
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 text-xs font-mono text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              {projects.length} REPOSITORIES VERIFIED
            </span>
            <span className="text-hairline">|</span>
            <span>100% SPEC VERIFIED</span>
          </motion.div>
        </div>

        {/* Section Headline */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-ink mb-4"
          >
            FEATURED ENGINEERING PROJECTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="body-light text-body text-base md:text-lg max-w-3xl leading-relaxed"
          >
            Custom distributed architectures, WebRTC P2P streaming engines, low-latency telemetry dashboards, and ML diagnostic pipelines built with decoupled engineering layers.
          </motion.p>
        </div>

        {/* Control Console: Search, Filter Tabs, View Switcher */}
        <div className="bg-surface-card border border-hairline p-6 mb-12" style={{ borderRadius: "0px" }}>
          {/* Top Row: Search & View Mode Switcher */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-6 pb-6 border-b border-hairline-strong">
            {/* Search Input */}
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
                <MagnifyingGlassIcon size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH ARCHITECTURES, PROTOCOLS, OR REPOSITORIES..."
                className="w-full bg-surface-soft text-ink pl-11 pr-10 py-3 text-xs md:text-sm font-sans placeholder:text-muted placeholder:font-light border border-hairline focus:border-ink focus:outline-none transition-colors uppercase"
                style={{ borderRadius: "0px", height: "48px" }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-ink transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <XIcon size={16} />
                </button>
              )}
            </div>

            {/* Right Controls: Sort & View Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort Selector */}
              <div className="flex items-center bg-surface-soft border border-hairline px-3 h-[48px]">
                <SlidersHorizontalIcon size={14} className="text-muted mr-2" />
                <span className="label-uppercase text-muted text-[11px] mr-2">SORT:</span>
                <select
                  value={sortMode}
                  onChange={(e) => {
                    sound.click()
                    setSortMode(e.target.value as SortMode)
                  }}
                  className="bg-transparent text-ink text-xs font-sans font-bold uppercase focus:outline-none cursor-pointer"
                >
                  <option value="default" className="bg-surface-card text-ink">DEFAULT</option>
                  <option value="featured" className="bg-surface-card text-ink">FEATURED FIRST</option>
                  <option value="name" className="bg-surface-card text-ink">NAME (A-Z)</option>
                </select>
              </div>

              {/* View Mode Toggle Switcher */}
              <div className="flex items-center bg-surface-soft border border-hairline p-1 h-[48px]">
                <button
                  type="button"
                  onClick={() => {
                    sound.click()
                    setViewMode("grid")
                  }}
                  onMouseEnter={() => sound.hover()}
                  className={`btn-text px-3 h-full flex items-center gap-2 text-xs transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-surface-elevated text-ink border border-hairline"
                      : "text-muted hover:text-ink bg-transparent"
                  }`}
                  style={{ borderRadius: "0px" }}
                  aria-label="Grid View"
                >
                  <SquaresFourIcon size={14} />
                  <span className="hidden sm:inline">GRID</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.click()
                    setViewMode("matrix")
                  }}
                  onMouseEnter={() => sound.hover()}
                  className={`btn-text px-3 h-full flex items-center gap-2 text-xs transition-colors cursor-pointer ${
                    viewMode === "matrix"
                      ? "bg-surface-elevated text-ink border border-hairline"
                      : "text-muted hover:text-ink bg-transparent"
                  }`}
                  style={{ borderRadius: "0px" }}
                  aria-label="Technical Matrix View"
                >
                  <TableIcon size={14} />
                  <span className="hidden sm:inline">SPEC MATRIX</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat
              const count = categoryCounts[cat] || 0
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    sound.switchTab()
                    setSelectedCategory(cat)
                  }}
                  onMouseEnter={() => sound.hover()}
                  className={`relative pb-2 label-uppercase transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive ? "text-ink font-bold" : "text-muted hover:text-ink"
                  }`}
                  style={{ fontSize: "13px", letterSpacing: "1.5px" }}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 font-mono ${
                      isActive ? "bg-surface-elevated text-ink border border-hairline" : "text-muted"
                    }`}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectCategoryLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-m-blue-light via-m-blue-dark to-m-red"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Quick Subsystem Tech Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-hairline-strong">
            <span className="label-uppercase text-muted text-[11px] mr-2 flex items-center gap-1.5">
              <CpuIcon size={12} /> TECH FILTER:
            </span>
            {POPULAR_TECH.map((tech) => {
              const isActive = selectedTech === tech
              return (
                <button
                  type="button"
                  key={tech}
                  onClick={() => {
                    sound.click()
                    setSelectedTech(tech)
                  }}
                  onMouseEnter={() => sound.hover()}
                  className={`text-xs px-2.5 py-1 font-mono transition-colors duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-ink text-canvas border-ink font-bold"
                      : "bg-surface-soft text-muted border-hairline-strong hover:text-ink hover:border-hairline"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {tech}
                </button>
              )
            })}

            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                onMouseEnter={() => sound.hover()}
                className="ml-auto inline-flex items-center gap-1.5 text-xs text-m-blue-light hover:text-ink label-uppercase transition-colors cursor-pointer"
              >
                <ArrowCounterClockwiseIcon size={12} /> RESET ALL
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Filter Diagnostic Bar */}
        <div className="flex items-center justify-between text-xs text-muted mb-8 font-mono">
          <div>
            SHOWING <span className="text-ink font-bold">{filteredProjects.length}</span> OF{" "}
            <span>{projects.length}</span> SPECIFICATIONS
          </div>
          {isFiltered && (
            <div className="text-m-blue-light">
              [ FILTER: {selectedCategory} {"//"} {selectedTech} ]
            </div>
          )}
        </div>

        {/* ============================================================
            VIEW 1: GRID VIEW (Bespoke Interactive Engineering Cards)
            ============================================================ */}
        {viewMode === "grid" && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <div
                    className="bg-surface-card flex flex-col border border-hairline-strong hover:border-hairline transition-all duration-300 group overflow-hidden h-full relative"
                    style={{ borderRadius: "0px" }}
                  >
                    {/* Visual Architecture Header (Vector UI Preview) */}
                    <div className="relative w-full overflow-hidden bg-surface-elevated">
                      <ProjectVisual slug={project.slug} title={project.title} />

                      {/* Top Overlay Badges */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-2 z-10">
                        {project.featured && (
                          <div className="bg-canvas/90 backdrop-blur-sm border border-m-blue-light px-2 py-0.5 text-[9px] font-bold label-uppercase text-m-blue-light flex items-center gap-1">
                            <SparkleIcon size={9} /> FEATURED
                          </div>
                        )}
                        <div className="bg-canvas/90 backdrop-blur-sm border border-hairline px-2 py-0.5 text-[9px] font-mono text-muted">
                          {project.version}
                        </div>
                      </div>

                      {/* Hover Action Strip */}
                      <div className="absolute inset-0 bg-canvas/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4 z-20">
                        <button
                          type="button"
                          onClick={() => {
                            sound.openModal()
                            setQuickSpecProject(project)
                          }}
                          className="btn-text bg-canvas text-ink border border-ink px-4 py-2 text-xs hover:bg-ink hover:text-canvas transition-colors inline-flex items-center gap-2 cursor-pointer"
                          style={{ borderRadius: "0px" }}
                        >
                          <EyeIcon size={14} /> QUICK SPEC
                        </button>
                        <Link
                          to={`/project/${project.slug}`}
                          onClick={() => sound.click()}
                          className="btn-text bg-ink text-canvas border border-ink px-4 py-2 text-xs hover:bg-body-strong transition-colors inline-flex items-center gap-2"
                          style={{ borderRadius: "0px" }}
                        >
                          FULL SPEC <ArrowRightIcon size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category & Year */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="label-uppercase text-m-blue-light text-xs tracking-[1.5px] flex items-center gap-1.5">
                          {getProjectIcon(project.slug)}
                          {project.category}
                        </div>
                        <div className="font-mono text-muted text-xs">
                          {project.year}
                        </div>
                      </div>

                      {/* Title — title-lg (DESIGN.md UPPERCASE 700) */}
                      <h4
                        className="text-ink mb-2 group-hover:text-m-blue-light transition-colors duration-200"
                        style={{
                          fontSize: "var(--font-size-title-lg)",
                          fontWeight: 700,
                          lineHeight: 1.25,
                          textTransform: "uppercase",
                        }}
                      >
                        <Link to={`/project/${project.slug}`} onClick={() => sound.click()}>
                          {project.title}
                        </Link>
                      </h4>

                      {/* Tagline */}
                      <p className="label-uppercase text-muted text-[11px] tracking-[1px] mb-4 line-clamp-1">
                        {project.tagline}
                      </p>

                      {/* Description — body-md / 300 */}
                      <p
                        className="body-light mb-6 flex-1 text-sm text-body line-clamp-3 leading-relaxed"
                      >
                        {project.description}
                      </p>

                      {/* Telemetry Mini-Spec Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-6 bg-surface-soft p-3 border border-hairline-strong">
                        {project.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="overflow-hidden">
                            <div className="text-[10px] label-uppercase text-muted truncate">
                              {m.label}
                            </div>
                            <div className="text-xs font-mono font-bold text-body-strong truncate">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-muted bg-surface-elevated px-2.5 py-1 border border-hairline-strong text-[11px] font-mono"
                            style={{ borderRadius: "0px" }}
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span
                            className="text-muted bg-surface-elevated px-2 py-1 border border-hairline-strong text-[11px] font-mono"
                            style={{ borderRadius: "0px" }}
                          >
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-auto pt-4 border-t border-hairline-strong flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            sound.openModal()
                            setQuickSpecProject(project)
                          }}
                          onMouseEnter={() => sound.hover()}
                          className="label-uppercase text-muted text-xs hover:text-ink inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <EyeIcon size={13} /> QUICK SPEC
                        </button>

                        <Link
                          to={`/project/${project.slug}`}
                          onClick={() => sound.click()}
                          onMouseEnter={() => sound.hover()}
                          className="label-uppercase text-ink text-xs inline-flex items-center gap-2 group-hover:gap-3 group-hover:text-m-blue-light transition-all duration-200 font-bold"
                        >
                          EXPLORE SPEC
                          <ArrowRightIcon size={13} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ============================================================
            VIEW 2: TECHNICAL MATRIX (Engineering Spec Table)
            ============================================================ */}
        {viewMode === "matrix" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-hairline bg-surface-card overflow-hidden"
            style={{ borderRadius: "0px" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-soft border-b border-hairline text-muted font-mono text-xs label-uppercase">
                    <th className="p-4 md:px-6">REPOSITORY {"//"} SYSTEM</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4 hidden md:table-cell">TELEMETRY ARCHITECTURE</th>
                    <th className="p-4 hidden lg:table-cell">SUBSYSTEMS</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-strong text-sm">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.slug}
                      className="hover:bg-surface-elevated/60 transition-colors group"
                    >
                      {/* Project Title & Version */}
                      <td className="p-4 md:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-surface-soft border border-hairline-strong flex items-center justify-center shrink-0">
                            {getProjectIcon(project.slug)}
                          </div>
                          <div>
                            <Link
                              to={`/project/${project.slug}`}
                              onClick={() => sound.click()}
                              className="text-ink font-bold uppercase group-hover:text-m-blue-light transition-colors block text-base"
                            >
                              {project.title}
                            </Link>
                            <div className="font-mono text-xs text-muted">
                              {project.version} · {project.year} · {project.role}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="label-uppercase text-m-blue-light text-xs">
                          {project.category}
                        </span>
                      </td>

                      {/* Telemetry Architecture */}
                      <td className="p-4 hidden md:table-cell">
                        <div className="space-y-1 font-mono text-xs text-body">
                          <div>
                            <span className="text-muted">{project.metrics[0]?.label}: </span>
                            <span className="text-body-strong font-bold">{project.metrics[0]?.value}</span>
                          </div>
                          <div>
                            <span className="text-muted">{project.metrics[1]?.label}: </span>
                            <span className="text-body-strong font-bold">{project.metrics[1]?.value}</span>
                          </div>
                        </div>
                      </td>

                      {/* Subsystems / Tech */}
                      <td className="p-4 hidden lg:table-cell max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono bg-surface-soft px-2 py-0.5 border border-hairline-strong text-muted"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-[11px] font-mono text-muted">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-body-strong">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              project.status.toLowerCase().includes("active")
                                ? "bg-warning animate-pulse"
                                : "bg-success"
                            }`}
                          />
                          {project.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              sound.openModal()
                              setQuickSpecProject(project)
                            }}
                            onMouseEnter={() => sound.hover()}
                            className="btn-text p-2.5 bg-surface-soft hover:bg-surface-elevated text-ink border border-hairline transition-colors cursor-pointer"
                            title="Quick Spec HUD"
                            aria-label="Open Quick Spec"
                          >
                            <EyeIcon size={14} />
                          </button>
                          <Link
                            to={`/project/${project.slug}`}
                            onClick={() => sound.click()}
                            onMouseEnter={() => sound.hover()}
                            className="btn-text px-4 py-2 bg-ink text-canvas hover:bg-body-strong inline-flex items-center gap-1.5 text-xs transition-colors"
                            style={{ borderRadius: "0px" }}
                          >
                            SPEC <ArrowRightIcon size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Empty Diagnostic State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface-card border border-hairline p-12 text-center my-8"
            style={{ borderRadius: "0px" }}
          >
            <div className="w-16 h-16 bg-surface-soft border border-hairline text-muted mx-auto flex items-center justify-center mb-6">
              <MagnifyingGlassIcon size={28} />
            </div>
            <h3 className="text-ink text-xl font-bold uppercase mb-2">
              NO REPOSITORIES MATCH SPECIFIED CRITERIA
            </h3>
            <p className="body-light text-muted max-w-md mx-auto mb-8 text-sm">
              No technical projects matched the search term "{searchQuery}" under the selected category and tech filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              onMouseEnter={() => sound.hover()}
              className="btn-text bg-transparent text-ink border border-ink px-8 py-3 hover:bg-ink hover:text-canvas transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer text-xs"
              style={{ borderRadius: "0px" }}
            >
              <ArrowCounterClockwiseIcon size={14} /> RESET ALL FILTERS
            </button>
          </motion.div>
        )}
      </div>

      {/* Interactive Quick Spec HUD Modal */}
      <ProjectQuickSpecModal
        project={quickSpecProject}
        onClose={() => setQuickSpecProject(null)}
      />
    </section>
  )
}

export default Projects
