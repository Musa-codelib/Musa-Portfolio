"use client"

import { useEffect, useState } from "react"

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("/api/contact", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setContacts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="font-label-mono text-[12px] text-secondary">Loading...</p>

  return (
    <div>
      <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight mb-8">
        Contacts
      </h1>
      {contacts.length === 0 ? (
        <p className="font-label-mono text-[12px] text-secondary">No submissions yet.</p>
      ) : (
        <div className="border border-surface-container-high">
          <div className="grid grid-cols-[140px_1fr_2fr_140px] gap-4 px-4 py-3 border-b border-surface-container-high bg-surface-container-low">
            <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Name</span>
            <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Email</span>
            <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Message</span>
            <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Date</span>
          </div>
          {contacts.map((c) => (
            <div
              key={c._id}
              className="grid grid-cols-[140px_1fr_2fr_140px] gap-4 px-4 py-3 border-b border-surface-container-high items-center"
            >
              <span className="font-body text-[15px] text-primary truncate">{c.name || "—"}</span>
              <span className="font-body text-[15px] text-secondary truncate">{c.email || "—"}</span>
              <span className="font-body text-[15px] text-secondary truncate">{c.message || "—"}</span>
              <span className="font-label-mono text-[12px] text-secondary">
                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
