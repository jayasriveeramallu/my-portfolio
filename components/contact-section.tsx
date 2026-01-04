"use client"

import { useEffect, useState } from "react"
import { Mail, Linkedin, Github } from "lucide-react"

interface ProfileData {
  email: string
  phone: string
  links: {
    github: string
    linkedin: string
  }
}

export default function ContactSection() {
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfile(data))
  }, [])

  if (!profile) return null

  return (
    <section id="contact" className="py-2 sm:py-1 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-pretty mb-3 sm:mb-4">Get In Touch</h2>
        <p className="text-sm sm:text-base text-foreground/70 mb-8 sm:mb-10">
          I'm always interested in hearing about exciting projects and opportunities. Feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center mb-8 sm:mb-10">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-xl transition-all hover:scale-105 text-xs sm:text-sm w-full sm:w-auto"
          >
            <Mail size={16} />
            Send Email
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-lg glass-card hover:bg-primary/20 font-semibold transition-all hover:scale-105 text-xs sm:text-sm w-full sm:w-auto"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-lg glass-card hover:bg-secondary/20 font-semibold transition-all hover:scale-105 text-xs sm:text-sm w-full sm:w-auto"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>

        {/* <p className="text-xs sm:text-sm text-foreground/60">
          {profile.email} • {profile.phone}
        </p> */}
      </div>
    </section>
  )
}
