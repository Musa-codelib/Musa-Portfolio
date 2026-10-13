"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import VideoForm from "../VideoForm"

export default function EditVideoPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("/api/videos?admin=true", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const found = (Array.isArray(data) ? data : []).find((v) => v._id === id)
        setVideo(found)
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (data) => {
    setSaving(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to update video")
      router.push("/admin/videos")
    } catch (err) {
      console.error(err)
      alert("Failed to update video")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 font-body text-[14px] text-secondary">Loading...</div>
  if (!video) return <div className="p-8 font-body text-[14px] text-secondary">Video not found.</div>

  return (
    <div className="w-full min-w-0 p-8">
      <h1 className="font-display text-[28px] font-medium text-primary mb-8">Edit Video</h1>
      <VideoForm video={video} onSubmit={handleSubmit} />
    </div>
  )
}
