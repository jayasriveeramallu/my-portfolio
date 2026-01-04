"use client"

import { useEffect, useState } from "react"
import { LucideAward, Briefcase, BookOpen } from "lucide-react"

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

interface InternshipsData {
  internships: Internship[]
}

interface Certification {
  id: string
  title: string
  issuer: string
  year: number
}

interface CertificationsData {
  certifications: Certification[]
}

interface Award {
  id: string
  title: string
  issuer?: string
  year: string | number
  featured: boolean
}

interface AwardsData {
  awards: Award[]
}

export default function EducationSection() {
  const [internships, setInternships] = useState<InternshipsData | null>(null)
  const [certifications, setCertifications] = useState<Certification[] | null>(null)
  const [awards, setAwards] = useState<Award[] | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/data/internships.json").then((res) => res.json()),
      fetch("/data/certifications.json").then((res) => res.json()),
      fetch("/data/awards.json").then((res) => res.json()),
    ]).then(([internsData, certsData, awardsData]) => {
      setInternships(internsData)
      setCertifications(certsData.certifications)
      setAwards(awardsData.awards)
    })
  }, [])

  if (!internships || !certifications || !awards) return null

  const featuredAwards = awards.filter((a) => a.featured)

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-8 relative overflow-hidden section-accent">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Internships */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-pretty mb-12">Research & Internships</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {internships.internships.map((intern) => (
              <div
                key={intern.id}
                className="p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{intern.institution}</h3>
                    <p className="text-sm text-primary font-medium">{intern.position}</p>
                  </div>
                </div>

                <p className="text-sm text-foreground/70 mb-3">{intern.period}</p>
                <p className="text-sm font-semibold text-foreground mb-3">{intern.project}</p>

                <ul className="space-y-2 mb-4">
                  {intern.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className="text-sm text-foreground/70 flex gap-2">
                      <span className="text-primary">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {intern.technologies.slice(0, 2).map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        {featuredAwards.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-pretty mb-6 sm:mb-8">
              Awards & Recognition
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {featuredAwards.map((award) => (
                <div
                  key={award.id}
                  className="glass-card rounded-xl p-4 sm:p-5 border border-accent/15 hover:border-accent/40 hover:bg-accent/10 transition-all text-center"
                >
                  <LucideAward size={28} className="text-accent mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-bold text-foreground mb-1 text-xs sm:text-sm leading-tight">{award.title}</h3>
                  {award.issuer && <p className="text-xs text-foreground/60 mb-1">{award.issuer}</p>}
                  <p className="text-xs text-foreground/50">{award.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-pretty mb-6 sm:mb-8">Certifications</h2>
          <div className="space-y-2 sm:space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="glass-card rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-primary/15 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-start justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-start gap-3 flex-grow min-w-0">
                  <BookOpen size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground text-xs sm:text-sm leading-tight">{cert.title}</h4>
                    <p className="text-xs text-foreground/60">{cert.issuer}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-foreground/50 whitespace-nowrap font-medium flex-shrink-0">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
