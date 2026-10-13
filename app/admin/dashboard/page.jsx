"use client"

import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [counts, setCounts] = useState({ projects: 0, contacts: 0, skills: 0 })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      fetch("/api/projects", { headers }).then((r) => r.json()),
      fetch("/api/contact", { headers }).then((r) => r.json()),
      fetch("/api/skills", { headers }).then((r) => r.json()),
    ]).then(([projects, contacts, skills]) => {
      setCounts({
        projects: Array.isArray(projects) ? projects.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
      })
    })
  }, [])

  const cards = [
    { label: "Projects", value: counts.projects, href: "/admin/projects" },
    { label: "Skills", value: counts.skills, href: "/admin/skills" },
    { label: "Contacts", value: counts.contacts, href: "/admin/contacts" },
  ]

  return (
    <div>
      <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-surface-container-lowest border border-surface-container-high p-6 flex flex-col justify-between hover:border-primary transition-colors"
            style={{ boxShadow: "0 8px 16px -2px rgba(0,0,0,0.08), 0 16px 32px -4px rgba(0,0,0,0.12)" }}
          >
            <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.04em]">
              {card.label}
            </span>
            <span className="font-display font-semibold text-[72px] text-primary tracking-tight my-1">
              {card.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
