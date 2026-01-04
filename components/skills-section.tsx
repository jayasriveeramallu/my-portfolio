"use client"

import { useEffect, useState } from "react"
import { Code2, Zap, Cpu, Wrench } from "lucide-react"

interface SkillsData {
  frontend: string[]
  performance: string[]
  programming: string[]
  tools: string[]
}

const skillIcons = {
  frontend: Code2,
  performance: Zap,
  programming: Cpu,
  tools: Wrench,
}

const skillCategories = [
  { key: "frontend", label: "Frontend Development" },
  { key: "performance", label: "Performance & Optimization" },
  { key: "programming", label: "Programming Languages" },
  { key: "tools", label: "Tools & Platforms" },
]

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillsData | null>(null)

  useEffect(() => {
    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
  }, [])

  if (!skills) return null

  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden section-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-pretty mb-3 sm:mb-4">Skills & Expertise</h2>
          <p className="text-sm sm:text-base text-foreground/70 max-w-3xl mx-auto">
            Specialized in frontend development with a focus on performance optimization and user experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map(({ key, label }) => {
            const Icon = skillIcons[key as keyof typeof skillIcons]
            const categorySkills = skills[key as keyof SkillsData]

            return (
              <div
                key={key}
                className="group glass-card rounded-xl p-5 sm:p-6 hover-lift border border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 group-hover:from-primary/50 group-hover:to-accent/40 transition-all">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                    {label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(categorySkills as string[]).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/15 to-accent/15 text-foreground border border-primary/30 hover:from-primary/30 hover:to-accent/30 hover:border-primary/60 transition-all duration-300 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
