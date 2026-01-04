"use client"

import { useEffect, useState } from "react"
import { ChevronDown, TrendingUp } from "lucide-react"

interface Metric {
  lcpImprovement?: string
  cls?: string
  pdpLcp?: string
}

interface Project {
  name: string
  technologies: string[]
  highlights: string[]
  metrics?: Metric
}

interface Experience {
  id: string
  company: string
  role: string
  period: string
  type: string
  location: string
  projects: Project[]
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[] | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(["blox-core-0"]))

  useEffect(() => {
    fetch("/data/experience.json")
      .then((res) => res.json())
      .then((data) => setExperiences(data.experiences))
  }, [])

  const toggleProject = (id: string) => {
    const newSet = new Set(expandedProjects)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedProjects(newSet)
  }

  if (!experiences) return null

  return (
    <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden section-accent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-pretty mb-3 sm:mb-4">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 max-w-3xl mx-auto">
            Building high-performance web applications and leading optimization initiatives
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-card rounded-xl overflow-hidden border border-primary/15 hover:border-primary/40 transition-all hover:shadow-md"
            >
              <div className="p-4 sm:p-6 hover:bg-primary/2 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2 hover:text-primary transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-primary font-bold text-xs sm:text-base">{exp.role}</p>
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/60">
                    <p className="font-semibold">{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/10 divide-y divide-primary/10">
                {exp.projects.map((project, idx) => {
                  const projectId = `${exp.id}-${idx}`
                  const isExpanded = expandedProjects.has(projectId)

                  return (
                    <div key={projectId} className="bg-background/40">
                      <button
                        onClick={() => toggleProject(projectId)}
                        className="w-full p-4 sm:p-6 flex items-start justify-between gap-3 sm:gap-4 hover:bg-primary/3 transition-colors text-left group"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                            {project.name}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-primary transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 border-t border-primary/10 bg-primary/2">
                          <div>
                            <h5 className="text-xs font-bold text-foreground mb-2 sm:mb-3 uppercase tracking-widest">
                              Key Highlights
                            </h5>
                            <ul className="space-y-1.5 sm:space-y-2">
                              {project.highlights.map((highlight, i) => (
                                <li
                                  key={i}
                                  className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-foreground/80 leading-relaxed"
                                >
                                  <span className="text-primary font-bold min-w-fit mt-0.5">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {project.metrics && (
                            <div className="pt-3 sm:pt-4 border-t border-primary/10">
                              <h5 className="text-xs font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-2 uppercase tracking-widest">
                                <TrendingUp size={14} className="text-primary" />
                                Performance Metrics
                              </h5>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {project.metrics.lcpImprovement && (
                                  <div className="bg-gradient-to-br from-primary/15 to-primary/5 p-2 sm:p-3 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                                    <p className="text-xs text-foreground/60 mb-1 font-semibold">LCP</p>
                                    <p className="text-sm sm:text-base font-black text-primary">
                                      {project.metrics.lcpImprovement}
                                    </p>
                                  </div>
                                )}
                                {project.metrics.cls && (
                                  <div className="bg-gradient-to-br from-destructive/15 to-destructive/5 p-2 sm:p-3 rounded-lg border border-destructive/20 hover:border-destructive/40 transition-all">
                                    <p className="text-xs text-foreground/60 mb-1 font-semibold">CLS</p>
                                    <p className="text-sm sm:text-base font-black text-destructive">{project.metrics.cls}</p>
                                  </div>
                                )}
                                {project.metrics.pdpLcp && (
                                  <div className="bg-gradient-to-br from-primary/15 to-primary/5 p-2 sm:p-3 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
                                    <p className="text-xs text-foreground/60 mb-1 font-semibold">PDP LCP</p>
                                    <p className="text-sm sm:text-base font-black text-primary">
                                      {project.metrics.pdpLcp}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
