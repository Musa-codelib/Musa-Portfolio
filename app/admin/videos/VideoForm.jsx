"use client"

import { useState } from "react"
import { uploadImage } from "@/lib/supabase"

const Input = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 px-3 border border-surface-container-high bg-surface-container-lowest font-body text-[14px] text-primary placeholder:text-secondary focus:outline-none focus:border-primary"
    />
  </div>
)

export default function VideoForm({ video, onSubmit }) {
  const [form, setForm] = useState({
    title: video?.title || "",
    formType: video?.formType || "long",
    views: video?.views || "",
    likes: video?.likes || "",
    comments: video?.comments || "",
    category: video?.category || "",
    software: video?.software || "",
    year: video?.year || new Date().getFullYear().toString(),
    channelName: video?.channelName || "",
    date: video?.date || "",
    ytUrl: video?.ytUrl || "",
    uploadedUrl: video?.uploadedUrl || "",
    thumbnail: video?.thumbnail || "",
    linkText: video?.link?.text || "Watch on YouTube",
    linkUrl: video?.link?.url || "",
    active: video?.active ?? true,
  })
  const [uploading, setUploading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const fetchYouTubeData = async (ytUrl) => {
    if (!ytUrl || ytUrl.trim().length === 0) return

    const videoId = extractYouTubeId(ytUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      return
    }

    try {
      setFetching(true)
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${apiKey}`
      )
      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        setError("Video not found or private")
        setFetching(false)
        return
      }

      const video = data.items[0]
      const stats = video.statistics
      const snippet = video.snippet

      const formatCount = (count) => {
        const num = parseInt(count)
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
        if (num >= 1000) return (num / 1000).toFixed(1) + "K"
        return num.toString()
      }

      const channelName = snippet.channelTitle
      const publishDate = snippet.publishedAt.split("T")[0]

      setForm(prev => ({
        ...prev,
        title: snippet.title || prev.title,
        views: formatCount(stats.viewCount) || prev.views,
        likes: formatCount(stats.likeCount) || prev.likes,
        comments: formatCount(stats.commentCount) || prev.comments,
        channelName: channelName || prev.channelName,
        date: publishDate || prev.date
      }))

      setError("")
    } catch (err) {
      console.error("YouTube fetch error:", err)
      setError("Failed to fetch YouTube data")
    } finally {
      setFetching(false)
    }
  }

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const url = await uploadImage(file)
      update("uploadedUrl", url)
    } catch (err) {
      setError("Failed to upload video")
    } finally {
      setUploading(false)
    }
  }

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const url = await uploadImage(file)
      update("thumbnail", url)
    } catch (err) {
      setError("Failed to upload thumbnail")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!form.title.trim()) return setError("Title is required")
    if (!form.uploadedUrl && !form.ytUrl.trim()) {
      return setError("Either upload a video or provide YouTube URL")
    }
    const { linkText, linkUrl, ...rest } = form
    onSubmit({
      ...rest,
      link: { text: linkText, url: linkUrl || form.ytUrl },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="p-3 bg-error/10 border border-error text-error font-body text-[14px]">
          {error}
        </div>
      )}

      <Input label="Title" value={form.title} onChange={(v) => update("title", v)} placeholder="Video title" />

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
          Form Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="formType"
              checked={form.formType === "long"}
              onChange={() => update("formType", "long")}
              className="accent-primary"
            />
            <span className="font-body text-[14px] text-primary">Long Form</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="formType"
              checked={form.formType === "short"}
              onChange={() => update("formType", "short")}
              className="accent-primary"
            />
            <span className="font-body text-[14px] text-primary">Short Form</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input label="Views" value={form.views} onChange={(v) => update("views", v)} placeholder="3.2M" />
        <Input label="Likes" value={form.likes} onChange={(v) => update("likes", v)} placeholder="33.9K" />
        <Input label="Comments" value={form.comments} onChange={(v) => update("comments", v)} placeholder="1.9K" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input label="Category" value={form.category} onChange={(v) => update("category", v)} placeholder="Documentary" />
        <Input label="Software" value={form.software} onChange={(v) => update("software", v)} placeholder="Premiere Pro" />
        <Input label="Year" value={form.year} onChange={(v) => update("year", v)} placeholder="2024" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Channel Name" value={form.channelName} onChange={(v) => update("channelName", v)} placeholder="YouTube Channel Name" />
        <Input label="Date" type="date" value={form.date} onChange={(v) => update("date", v)} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
          YouTube URL
        </label>
        <input
          type="text"
          value={form.ytUrl}
          onChange={(e) => update("ytUrl", e.target.value)}
          onBlur={() => fetchYouTubeData(form.ytUrl)}
          placeholder="https://youtube.com/watch?v=..."
          disabled={fetching}
          className="h-10 px-3 border border-surface-container-high bg-surface-container-lowest font-body text-[14px] text-primary placeholder:text-secondary focus:outline-none focus:border-primary disabled:opacity-50"
        />
        {fetching && (
          <span className="font-body text-[12px] text-secondary">Fetching YouTube data...</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
          Video File
        </label>
        {form.uploadedUrl && (
          <div className="flex items-center gap-3 mb-4">
            <video src={form.uploadedUrl} className="w-32 h-20 rounded object-cover border border-surface-container-high" />
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[12px] text-secondary">Current video</span>
              <button
                type="button"
                onClick={() => update("uploadedUrl", "")}
                className="w-fit h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]"
              >
                Remove Video
              </button>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          disabled={uploading}
          className="font-body text-[14px] text-primary"
        />
        {uploading && <span className="font-body text-[12px] text-secondary">Uploading...</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
          Thumbnail
        </label>
        {form.thumbnail && (
          <div className="flex items-center gap-3 mb-4">
            <img
              src={form.thumbnail}
              alt="Current thumbnail"
              className="w-24 h-14 rounded object-cover border border-surface-container-high"
            />
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[12px] text-secondary">Current thumbnail</span>
              <button
                type="button"
                onClick={() => update("thumbnail", "")}
                className="w-fit h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]"
              >
                Remove Thumbnail
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            disabled={uploading}
            className="font-body text-[14px] text-primary"
          />
          <div className="flex gap-4">
            <input
              type="text"
              value={form.thumbnail}
              onChange={(e) => update("thumbnail", e.target.value)}
              placeholder="Or enter thumbnail URL manually"
              className="flex-1 h-10 px-3 border border-surface-container-high bg-surface-container-lowest font-body text-[14px] text-primary placeholder:text-secondary focus:outline-none focus:border-primary"
            />
            {form.thumbnail && (
              <button
                type="button"
                onClick={() => update("thumbnail", "")}
                className="h-10 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]"
              >
                Clear
              </button>
            )}
          </div>
          {uploading && <span className="font-body text-[12px] text-secondary">Uploading...</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Link Text" value={form.linkText} onChange={(v) => update("linkText", v)} placeholder="Watch on YouTube" />
        <Input label="Link URL" value={form.linkUrl} onChange={(v) => update("linkUrl", v)} placeholder="Defaults to YouTube URL" />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => update("active", !form.active)}
          className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? "bg-primary" : "bg-surface-container-high"}`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-on-primary transition-transform ${form.active ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </div>
        <span className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
          Active
        </span>
      </label>

      <button
        type="submit"
        disabled={uploading}
        className="h-10 px-6 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-primary hover:bg-surface hover:text-primary transition-colors self-start disabled:opacity-50"
      >
        {video ? "Update Video" : "Create Video"}
      </button>
    </form>
  )
}
