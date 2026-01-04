"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  highlights: string[]
  link?: string
  featured: boolean
}

interface Internship {
  id: string
  institution: string
  position: string
  period: string
  location: string
  project: string
  technologies: string[]
  highlights: string[]
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [internships, setInternships] = useState<Internship[] | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/data/projects.json").then((res) => res.json()),
      fetch("/data/internships.json").then((res) => res.json()),
    ]).then(([projData, internData]) => {
      setProjects(projData.projects)
      setInternships(internData.internships)
    })
  }, [])

  if (!projects || !internships) return null

  return (
    <section id="projects" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden section-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-pretty mb-3 sm:mb-4">
            Projects
          </h2>
          {/* <p className="text-sm sm:text-base text-foreground/70 max-w-3xl mx-auto">
            A curated selection of projects demonstrating impact, innovation, and technical excellence
          </p> */}
        </div>

        <div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group glass-card rounded-xl p-4 sm:p-6 hover:shadow-md border border-primary/15 hover:border-primary/40 transition-all flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 space-y-3 sm:space-y-4 flex flex-col h-full">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-primary font-bold text-xs sm:text-sm uppercase tracking-widest">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h5 className="text-xs font-bold text-foreground/60 mb-2 uppercase tracking-widest">
                      Key Highlights
                    </h5>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs sm:text-sm text-foreground/70 flex gap-2">
                          <span className="text-primary font-bold min-w-fit mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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

                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all pt-2 group/link"
                    >
                      View Project
                      <ArrowUpRight
                        size={16}
                        className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                      />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
