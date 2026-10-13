"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = () => {
    const token = localStorage.getItem("token")
    fetch("/api/projects", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return
    const token = localStorage.getItem("token")
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchProjects()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight">
          Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center h-10 px-6 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors"
        >
          Add New Project
        </Link>
      </div>
      {loading ? (
        <p className="font-label-mono text-[12px] text-secondary">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="font-label-mono text-[12px] text-secondary">No projects found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high">
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase text-secondary px-4 py-3 w-[45%]">Title</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase text-secondary px-4 py-3 w-[20%]">Section</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase text-secondary px-4 py-3 w-[20%]">Status</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase text-secondary px-4 py-3 w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-b border-surface-container-high hover:bg-surface-container-low">
                <td className="font-body text-[15px] text-primary px-4 py-3">{p.title}</td>
                <td className="font-label-mono text-[12px] text-secondary px-4 py-3">{p.section}</td>
                <td className="font-label-mono text-[12px] text-secondary px-4 py-3">{p.status || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`/admin/projects/${p._id}`}
                      className="font-label-caps text-[11px] font-semibold uppercase text-primary hover:text-secondary transition-colors"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
