"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { uploadImage } from "@/lib/supabase"

export default function ProjectForm({ projectId }) {
  const router = useRouter()
  const isEdit = !!projectId
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    section: "ai-tools",
    title: "",
    label: "",
    id: "",
    description: "",
    status: "",
    featured: false,
    techStack: [],
    links: [],
    imageUrl: "",
    imageAlt: "",
  })

  const [techInput, setTechInput] = useState("")
  const [linkText, setLinkText] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  useEffect(() => {
    if (isEdit) {
      const token = localStorage.getItem("token")
      fetch("/api/projects", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((projects) => {
          const p = projects.find((proj) => proj._id === projectId)
          if (p) {
            setForm({
              section: p.section || "ai-tools",
              title: p.title || "",
              label: p.label || "",
              id: p.id || "",
              description: p.description || "",
              status: p.status || "",
              featured: p.featured || false,
              techStack: p.techStack || [],
              links: p.links || [],
              imageUrl: p.imageUrl || "",
              imageAlt: p.imageAlt || "",
            })
          }
        })
    }
  }, [projectId, isEdit])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const addTech = () => {
    if (!techInput.trim()) return
    setForm((prev) => ({ ...prev, techStack: [...prev.techStack, techInput.trim()] }))
    setTechInput("")
  }

  const removeTech = (i) => {
    setForm((prev) => ({ ...prev, techStack: prev.techStack.filter((_, idx) => idx !== i) }))
  }

  const addLink = () => {
    if (!linkText.trim() || !linkUrl.trim()) return
    setForm((prev) => ({ ...prev, links: [...prev.links, { text: linkText.trim(), url: linkUrl.trim() }] }))
    setLinkText("")
    setLinkUrl("")
  }

  const removeLink = (i) => {
    setForm((prev) => ({ ...prev, links: prev.links.filter((_, idx) => idx !== i) }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      handleChange("imageUrl", url)
    } catch (err) {
      setError("Upload failed: " + err.message)
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      let links = form.links
      if (linkText.trim() && linkUrl.trim()) {
        links = [...links, { text: linkText.trim(), url: linkUrl.trim() }]
        setLinkText("")
        setLinkUrl("")
      }
      console.log("Submitting form:", { ...form, links })
      const token = localStorage.getItem("token")
      const url = isEdit ? `/api/projects/${projectId}` : "/api/projects"
      const method = isEdit ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, links }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Save failed")
        setSaving(false)
        return
      }
      router.push("/admin/projects")
    } catch {
      setError("Network error")
      setSaving(false)
    }
  }

  const inputClass = "w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"
  const textareaClass = "w-full p-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary resize-none"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Section</label>
        <select
          value={form.section}
          onChange={(e) => handleChange("section", e.target.value)}
          className={inputClass}
        >
          <option value="ai-tools">AI Tools</option>
          <option value="web">Web</option>
        </select>
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
          Label <span className="normal-case">(e.g. FLAGSHIP RELEASE · 2025)</span>
        </label>
        <input
          type="text"
          value={form.label || ""}
          onChange={(e) => setForm(prev => ({ ...prev, label: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
          ID <span className="normal-case">(e.g. AUDIO_TRANSCRIBE_ENGINE)</span>
        </label>
        <input
          type="text"
          value={form.id || ""}
          onChange={(e) => setForm(prev => ({ ...prev, id: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          rows={4}
          className={textareaClass}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Status</label>
        <select
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className={inputClass}
        >
          {['Production Active', 'Production', 'Coming Soon', 'none'].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.featured === true}
          onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
          className="w-4 h-4 accent-primary"
        />
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Featured (Hero Card)</label>
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Image Alt Text</label>
        <input type="text" value={form.imageAlt} onChange={(e) => handleChange("imageAlt", e.target.value)} className={inputClass} placeholder="Describe the image" />
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Thumbnail</label>
        {form.imageUrl ? (
          <div className="flex flex-col gap-2">
            <img 
              src={form.imageUrl} 
              alt="Current thumbnail" 
              className="w-48 h-28 object-cover border border-surface-container-high"
            />
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, imageUrl: '' }))}
              className="w-fit h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors"
            >
              Remove Thumbnail
            </button>
          </div>
        ) : (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="font-body text-[15px] text-secondary" />
            {uploading && <span className="font-label-mono text-[12px] text-secondary">Uploading...</span>}
          </>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Tech Stack</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
            className={inputClass}
            placeholder="Type and press Add"
          />
          <button type="button" onClick={addTech} className="h-12 px-4 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors whitespace-nowrap">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.techStack.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 border border-surface-container-high font-label-mono text-[12px] text-primary">
              {t}
              <button type="button" onClick={() => removeTech(i)} className="text-secondary hover:text-error ml-1">&times;</button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Links</label>
        <div className="flex gap-2">
          <input type="text" value={linkText} onChange={(e) => setLinkText(e.target.value)} className={inputClass} placeholder="Link text" />
          <input type="text" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className={inputClass} placeholder="URL" />
          <button type="button" onClick={addLink} className="h-12 px-4 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors whitespace-nowrap">
            Add
          </button>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          {form.links.map((l, i) => (
            <div key={i} className="flex items-center gap-2 font-label-mono text-[12px] text-secondary">
              <span>{l.text}</span>
              <span>→</span>
              <span className="truncate">{l.url}</span>
              <button type="button" onClick={() => removeLink(i)} className="text-secondary hover:text-error ml-1">&times;</button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="font-label-mono text-[12px] text-error">{error}</p>}

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="h-12 px-8 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="h-12 px-8 bg-surface-container-lowest text-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface-container-high border border-surface-container-high transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
