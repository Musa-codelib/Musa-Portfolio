"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import VideoForm from "../VideoForm"

export default function NewVideoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to create video")
      router.push("/admin/videos")
    } catch (err) {
      console.error(err)
      alert("Failed to create video")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-w-0 p-8">
      <h1 className="font-display text-[28px] font-medium text-primary mb-8">New Video</h1>
      <VideoForm onSubmit={handleSubmit} />
    </div>
  )
}
