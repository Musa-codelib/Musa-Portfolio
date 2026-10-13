"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/api/videos?admin=true", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setVideos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to fetch videos:", err)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this video?")) return
    try {
      const token = localStorage.getItem("token")
      await fetch(`/api/videos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      setVideos(videos.filter((v) => v._id !== id))
    } catch (err) {
      console.error("Failed to delete video:", err)
    }
  }

  const handleToggleActive = async (id, currentActive) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ active: !currentActive }),
      })
      if (!res.ok) throw new Error("Failed to toggle status")
      setVideos(videos.map((v) => (v._id === id ? { ...v, active: !currentActive } : v)))
    } catch (err) {
      console.error("Failed to update video:", err)
    }
  }

  const filtered = videos.filter(
    (v) =>
      v.title?.toLowerCase().includes(search.toLowerCase()) ||
      v.formType?.toLowerCase().includes(search.toLowerCase()) ||
      v.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full min-w-0 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-[32px] text-primary">Videos</h1>
        <Link
          href="/admin/videos/new"
          className="flex items-center justify-center h-12 px-8 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap border border-primary hover:bg-surface hover:text-primary transition-colors"
        >
          Add New Video
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 px-4 border border-surface-container-high bg-surface-container-lowest font-body text-[14px] text-primary placeholder:text-secondary focus:outline-none focus:border-primary"
        />
      </div>

      {loading ? (
        <p className="font-body text-[14px] text-secondary">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="font-body text-[14px] text-secondary">No videos found.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-container-high">
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary py-3">Title</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary py-3">Type</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary py-3">Channel</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary py-3">Platform</th>
              <th className="text-left font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary py-3">Active</th>
              <th className="text-right font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((video) => (
              <tr key={video._id} className="border-b border-surface-container-high">
                <td className="py-4 font-body text-[14px] text-primary max-w-[300px] truncate">{video.title}</td>
                <td className="py-4">
                  <span className="font-label-caps text-[10px] font-semibold uppercase px-2 py-0.5 border border-surface-container-high">
                    {video.formType}
                  </span>
                </td>
                <td className="py-4 font-body text-[14px] text-primary">{video.channelName || "-"}</td>
                <td className="py-4 font-label-mono text-[11px] text-secondary">
                  {video.uploadedUrl ? "Uploaded" : video.ytUrl ? "YouTube" : "None"}
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleToggleActive(video._id, video.active)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      video.active ? "bg-primary" : "bg-surface-container-high"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${
                        video.active ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </td>
                <td className="py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/videos/${video._id}`}
                    className="font-label-caps text-[11px] font-semibold uppercase text-primary hover:text-secondary mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="font-label-caps text-[11px] font-semibold uppercase text-error hover:opacity-70"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
