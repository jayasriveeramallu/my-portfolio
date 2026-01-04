"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Download } from "lucide-react"

interface ProfileData {
  name: string
  role: string
  title: string
  summary: string
  links: {
    github: string
    linkedin: string
    resume: string
  }
}

export default function HeroSection() {
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfile(data))
  }, [])

  if (!profile) return null

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 gradient-mesh" />

      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse opacity-50" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl animate-pulse opacity-50" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse opacity-30" />

      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card hover:scale-105 transition-transform">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-foreground/80">Available for opportunities</span>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest mb-2 sm:mb-3">
              Frontend Engineer
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-pretty leading-tight bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
              {profile.name}
            </h1>
          </div>

          <p className="text-base sm:text-lg text-foreground/70 text-pretty max-w-3xl mx-auto leading-relaxed">
            {profile.summary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-4 sm:pt-6">
         

          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-lg glass-card hover:bg-primary/20 font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <span>GitHub</span>
            <ExternalLink size={16} />
          </a>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-lg glass-card hover:bg-secondary/20 font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <span>LinkedIn</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="pt-6 sm:pt-10">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-xs text-foreground/50 font-medium uppercase tracking-widest">Scroll to explore</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
