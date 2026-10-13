"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/lib/supabase"

export default function HighlightForm({ highlightId }) {
  const router = useRouter()
  const isEdit = !!highlightId
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(null)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    template: "ai-tool",
    title: "",
    description: "",
    latestApp: {
      iconUrl: "",
      version: "",
      downloadUrl: "",
    },
    legacyApps: [],
    legacyAllUrl: "",
    video: {
      type: "youtube",
      youtubeUrl: "",
      uploadedUrl: "",
      title: "",
      channel: "",
      channelLogoUrl: "",
      views: "",
      timeAgo: "",
    },
    active: true,
    animationEnabled: true,
    gradientColors: ["#6B3FA0", "#D4A574"],
  })

  useEffect(() => {
    if (isEdit) {
      const token = localStorage.getItem("token")
      fetch("/api/highlights?admin=true", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((highlights) => {
          const h = highlights.find((hl) => hl._id === highlightId)
          if (h) {
            setForm({
              template: h.template || "ai-tool",
              title: h.title || "",
              description: h.description || "",
              latestApp: h.latestApp || { iconUrl: "", version: "", downloadUrl: "" },
              legacyApps: h.legacyApps || [],
              legacyAllUrl: h.legacyAllUrl || "",
              video: h.video || { type: "youtube", youtubeUrl: "", uploadedUrl: "", title: "", channel: "", channelLogoUrl: "", views: "", timeAgo: "" },
              active: h.active !== false,
              animationEnabled: h.animationEnabled !== false,
              gradientColors: h.gradientColors && h.gradientColors.length >= 2
                ? h.gradientColors.slice(0, 2)
                : ["#6B3FA0", "#D4A574"],
            })
          }
        })
    }
  }, [highlightId, isEdit])

  const handleIconUpload = async (e, field) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(field)
    try {
      const url = await uploadImage(file)
      if (field === "latestApp.iconUrl") {
        setForm((prev) => ({ ...prev, latestApp: { ...prev.latestApp, iconUrl: url } }))
      } else if (field === "video.channelLogoUrl") {
        setForm((prev) => ({ ...prev, video: { ...prev.video, channelLogoUrl: url } }))
      }
    } catch (err) {
      setError("Upload failed: " + err.message)
    }
    setUploading(null)
  }

  const handleLegacyIconUpload = async (e, index) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(`legacy-${index}`)
    try {
      const url = await uploadImage(file)
      setForm((prev) => {
        const legacyApps = [...prev.legacyApps]
        legacyApps[index] = { ...legacyApps[index], iconUrl: url }
        return { ...prev, legacyApps }
      })
    } catch (err) {
      setError("Upload failed: " + err.message)
    }
    setUploading(null)
  }

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading("video")
    try {
      const url = await uploadImage(file)
      setForm((prev) => ({ ...prev, video: { ...prev.video, uploadedUrl: url } }))
    } catch (err) {
      setError("Upload failed: " + err.message)
    }
    setUploading(null)
  }

  const addLegacyApp = () => {
    setForm((prev) => ({
      ...prev,
      legacyApps: [...prev.legacyApps, { iconUrl: "", version: "", url: "" }],
    }))
  }

  const updateLegacyApp = (index, field, value) => {
    setForm((prev) => {
      const legacyApps = [...prev.legacyApps]
      legacyApps[index] = { ...legacyApps[index], [field]: value }
      return { ...prev, legacyApps }
    })
  }

  const removeLegacyApp = (index) => {
    setForm((prev) => ({
      ...prev,
      legacyApps: prev.legacyApps.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      const token = localStorage.getItem("token")
      const url = isEdit ? `/api/highlights/${highlightId}` : "/api/highlights"
      const method = isEdit ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Save failed")
        setSaving(false)
        return
      }
      router.push("/admin/highlights")
    } catch {
      setError("Network error")
      setSaving(false)
    }
  }

  const inputClass = "w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"
  const textareaClass = "w-full p-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary resize-none"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Template</label>
        <select
          value={form.template}
          onChange={(e) => setForm((prev) => ({ ...prev, template: e.target.value }))}
          className={inputClass}
        >
          <option value="ai-tool">AI Tool</option>
        </select>
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          required
          className={inputClass}
          placeholder="Get latest MK Roto Masker"
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          required
          rows={4}
          className={textareaClass}
          placeholder="Automated video subject segmentation & rotoscoping engine..."
        />
      </div>

      {/* Latest App Section */}
      <div className="flex flex-col gap-3 p-4 border border-surface-container-high">
        <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Latest App</span>
        <div className="flex flex-col gap-2">
          <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Icon</label>
          {form.latestApp.iconUrl && (
            <div className="flex items-center gap-3">
              <img src={form.latestApp.iconUrl} alt="Current icon" className="w-12 h-12 rounded-lg object-cover" />
              <span className="font-label-mono text-[12px] text-secondary">Current icon uploaded</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => handleIconUpload(e, "latestApp.iconUrl")} className="font-body text-[15px] text-secondary" />
          <p className="font-label-mono text-[11px] text-secondary">Upload new to replace current</p>
          {uploading === "latestApp.iconUrl" && <span className="font-label-mono text-[12px] text-secondary">Uploading...</span>}
          {form.latestApp.iconUrl && (
            <button type="button" onClick={() => setForm(prev => ({ ...prev, latestApp: { ...prev.latestApp, iconUrl: '' } }))} className="w-fit h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]">
              Remove Icon
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">Version</label>
            <input type="text" value={form.latestApp.version} onChange={(e) => setForm((prev) => ({ ...prev, latestApp: { ...prev.latestApp, version: e.target.value } }))} className={inputClass} placeholder="v2.0" />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">Download URL</label>
            <input type="text" value={form.latestApp.downloadUrl} onChange={(e) => setForm((prev) => ({ ...prev, latestApp: { ...prev.latestApp, downloadUrl: e.target.value } }))} className={inputClass} placeholder="https://..." />
          </div>
        </div>
      </div>

      {/* Legacy Apps Section */}
      <div className="flex flex-col gap-3 p-4 border border-surface-container-high">
        <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Legacy Apps</span>
        {form.legacyApps.map((app, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-[10px] text-secondary">Icon</label>
              {app.iconUrl && (
                <div className="flex items-center gap-2">
                  <img src={app.iconUrl} alt="" className="w-10 h-10 rounded object-cover" />
                  <span className="font-label-mono text-[10px] text-secondary">Uploaded</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleLegacyIconUpload(e, i)} className="font-body text-[12px] text-secondary w-32" />
              <p className="font-label-mono text-[10px] text-secondary">Upload new to replace</p>
              {uploading === `legacy-${i}` && <span className="font-label-mono text-[10px] text-secondary">Uploading...</span>}
              {app.iconUrl && (
                <button type="button" onClick={() => updateLegacyApp(i, "iconUrl", "")} className="w-fit h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]">
                  Remove Icon
                </button>
              )}
            </div>
            <input type="text" value={app.version} onChange={(e) => updateLegacyApp(i, "version", e.target.value)} className={inputClass} placeholder="v1.2" />
            <input type="text" value={app.url} onChange={(e) => updateLegacyApp(i, "url", e.target.value)} className={inputClass} placeholder="https://..." />
            <button type="button" onClick={() => removeLegacyApp(i)} className="h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors whitespace-nowrap">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addLegacyApp} className="h-10 px-4 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors self-start">
          + Add Legacy App
        </button>
        <div className="flex flex-col gap-0.5">
          <label className="font-label-mono text-[12px] text-secondary">All Legacy Apps URL</label>
          <input type="text" value={form.legacyAllUrl} onChange={(e) => setForm((prev) => ({ ...prev, legacyAllUrl: e.target.value }))} className={inputClass} placeholder="https://github.com/..." />
        </div>
      </div>

      {/* Video Section */}
      <div className="flex flex-col gap-3 p-4 border border-surface-container-high">
        <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Video</span>
        <div className="flex flex-col gap-0.5">
          <label className="font-label-mono text-[12px] text-secondary">Video Type</label>
          <select
            value={form.video.type}
            onChange={(e) => setForm((prev) => ({ ...prev, video: { ...prev.video, type: e.target.value } }))}
            className={inputClass}
          >
            <option value="youtube">YouTube</option>
            <option value="upload">Upload</option>
          </select>
        </div>
        {form.video.type === "youtube" ? (
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">YouTube URL</label>
            <input type="text" value={form.video.youtubeUrl} onChange={(e) => setForm((prev) => ({ ...prev, video: { ...prev.video, youtubeUrl: e.target.value } }))} className={inputClass} placeholder="https://youtube.com/watch?v=..." />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Upload Video</label>
            {form.video.uploadedUrl && (
              <div className="flex items-center gap-3">
                <video src={form.video.uploadedUrl} className="w-48" controls />
                <span className="font-label-mono text-[12px] text-secondary">Current video uploaded</span>
              </div>
            )}
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="font-body text-[15px] text-secondary" />
            <p className="font-label-mono text-[11px] text-secondary">Upload new to replace current</p>
            {uploading === "video" && <span className="font-label-mono text-[12px] text-secondary">Uploading...</span>}
            {form.video.uploadedUrl && (
              <button type="button" onClick={() => setForm(prev => ({ ...prev, video: { ...prev.video, uploadedUrl: '' } }))} className="w-fit h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]">
                Remove Video
              </button>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">Video Title</label>
            <input type="text" value={form.video.title} onChange={(e) => setForm((prev) => ({ ...prev, video: { ...prev.video, title: e.target.value } }))} className={inputClass} placeholder="How to use Roto Masker 2.0" />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">Channel</label>
            <input type="text" value={form.video.channel} onChange={(e) => setForm((prev) => ({ ...prev, video: { ...prev.video, channel: e.target.value } }))} className={inputClass} placeholder="mkodes" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Channel Logo</label>
          {form.video.channelLogoUrl && (
            <div className="flex items-center gap-3">
              <img src={form.video.channelLogoUrl} alt="Channel logo" className="w-12 h-12 rounded-full object-cover" />
              <span className="font-label-mono text-[12px] text-secondary">Current logo uploaded</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => handleIconUpload(e, "video.channelLogoUrl")} className="font-body text-[12px] text-secondary" />
          <p className="font-label-mono text-[11px] text-secondary">Upload new to replace current</p>
          {uploading === "video.channelLogoUrl" && <span className="font-label-mono text-[12px] text-secondary">Uploading...</span>}
          {form.video.channelLogoUrl && (
            <button type="button" onClick={() => setForm(prev => ({ ...prev, video: { ...prev.video, channelLogoUrl: '' } }))} className="w-fit h-8 px-4 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]">
              Remove Logo
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">Views</label>
            <input type="text" value={form.video.views} onChange={(e) => setForm((prev) => ({ ...prev, video: { ...prev.video, views: e.target.value } }))} className={inputClass} placeholder="303K views" />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="font-label-mono text-[12px] text-secondary">Time Ago</label>
            <input type="text" value={form.video.timeAgo} onChange={(e) => setForm((prev) => ({ ...prev, video: { ...prev.video, timeAgo: e.target.value } }))} className={inputClass} placeholder="2 days ago" />
          </div>
        </div>
      </div>

      {/* Animation Section */}
      <div className="flex flex-col gap-3 p-4 border border-surface-container-high">
        <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Gradient Animation</span>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.animationEnabled === true}
            onChange={(e) => setForm((prev) => ({ ...prev, animationEnabled: e.target.checked }))}
            className="w-4 h-4 accent-primary"
          />
          <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Enable Animation</label>
        </div>
        {form.animationEnabled && (
          <div className="flex flex-col gap-3">
            <label className="font-label-mono text-[12px] text-secondary">Gradient Colors</label>
            {form.gradientColors.map((color, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...form.gradientColors]
                    newColors[i] = e.target.value
                    setForm((prev) => ({ ...prev, gradientColors: newColors }))
                  }}
                  className="w-10 h-10 border border-outline-variant cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...form.gradientColors]
                    newColors[i] = e.target.value
                    setForm((prev) => ({ ...prev, gradientColors: newColors }))
                  }}
                  className={inputClass}
                  placeholder="#6B3FA0"
                />
                <span className="font-label-mono text-[11px] text-secondary">
                  {i === 0 ? "Start Color" : "End Color"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.active === true}
          onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
          className="w-4 h-4 accent-primary"
        />
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Active</label>
      </div>

      {error && <p className="font-label-mono text-[12px] text-error">{error}</p>}

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={saving}
          className="h-12 px-8 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Highlight" : "Create Highlight"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/highlights")}
          className="h-12 px-8 bg-surface-container-lowest text-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface-container-high border border-surface-container-high transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
