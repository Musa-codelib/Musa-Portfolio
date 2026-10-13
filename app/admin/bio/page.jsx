"use client"

import { useEffect, useState } from "react"

export default function BioPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [bio, setBio] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("/api/bio", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setBio({
          socialLinks: data.socialLinks || [],
          heroStats: data.heroStats || [],
          videoArchiveLinks: data.videoArchiveLinks || [],
        })
        setLoading(false)
      })
  }, [])

  const addSocialLink = () => {
    setBio((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, { platform: "", url: "" }] }))
  }

  const updateSocialLink = (i, field, value) => {
    setBio((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)),
    }))
  }

  const removeSocialLink = (i) => {
    setBio((prev) => ({ ...prev, socialLinks: prev.socialLinks.filter((_, idx) => idx !== i) }))
  }

  const addHeroStat = () => {
    setBio((prev) => ({ ...prev, heroStats: [...prev.heroStats, { label: "" }] }))
  }

  const updateHeroStat = (i, field, value) => {
    setBio((prev) => ({
      ...prev,
      heroStats: prev.heroStats.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    }))
  }

  const removeHeroStat = (i) => {
    setBio((prev) => ({ ...prev, heroStats: prev.heroStats.filter((_, idx) => idx !== i) }))
  }

  const addVideoArchiveLink = () => {
    setBio((prev) => ({ ...prev, videoArchiveLinks: [...prev.videoArchiveLinks, { text: "", url: "" }] }))
  }

  const updateVideoArchiveLink = (i, field, value) => {
    setBio((prev) => ({
      ...prev,
      videoArchiveLinks: prev.videoArchiveLinks.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)),
    }))
  }

  const removeVideoArchiveLink = (i) => {
    setBio((prev) => ({ ...prev, videoArchiveLinks: prev.videoArchiveLinks.filter((_, idx) => idx !== i) }))
  }

  const handleSave = async () => {
    setSaving(true)
    const token = localStorage.getItem("token")
    await fetch("/api/bio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        socialLinks: bio.socialLinks,
        heroStats: bio.heroStats,
        videoArchiveLinks: bio.videoArchiveLinks,
      }),
    })
    setSaving(false)
  }

  const inputClass = "w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"

  if (loading || !bio) return <p className="font-label-mono text-[12px] text-secondary">Loading...</p>

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight">Site Config</h1>

      <div className="flex flex-col gap-3">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Social Links</label>
        {bio.socialLinks.map((l, i) => (
          <div key={i} className="flex gap-2 items-end">
            <input type="text" value={l.platform} onChange={(e) => updateSocialLink(i, "platform", e.target.value)} className={inputClass} placeholder="GitHub" />
            <input type="text" value={l.url} onChange={(e) => updateSocialLink(i, "url", e.target.value)} className={inputClass} placeholder="https://github.com" />
            {l.url && (
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="h-10 px-3 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors flex items-center justify-center shrink-0">
                ↗
              </a>
            )}
            <button type="button" onClick={() => removeSocialLink(i)} className="h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors whitespace-nowrap">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSocialLink} className="h-10 px-4 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors self-start">
          + Add Link
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Hero Stats</label>
        {bio.heroStats.map((s, i) => (
          <div key={i} className="flex gap-2 items-end">
            <input type="text" value={s.label} onChange={(e) => updateHeroStat(i, "label", e.target.value)} className={inputClass} placeholder="3+ AI Tools Built" />
            <button type="button" onClick={() => removeHeroStat(i)} className="h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors whitespace-nowrap">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addHeroStat} className="h-10 px-4 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors self-start">
          + Add Hero Stat
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Video Archive Links</label>
        {bio.videoArchiveLinks.map((l, i) => (
          <div key={i} className="flex gap-2 items-end">
            <input type="text" value={l.text} onChange={(e) => updateVideoArchiveLink(i, "text", e.target.value)} className={inputClass} placeholder="Google Drive Archive →" />
            <input type="text" value={l.url} onChange={(e) => updateVideoArchiveLink(i, "url", e.target.value)} className={inputClass} placeholder="https://drive.google.com" />
            {l.url && (
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="h-10 px-3 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors flex items-center justify-center shrink-0">
                ↗
              </a>
            )}
            <button type="button" onClick={() => removeVideoArchiveLink(i)} className="h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors whitespace-nowrap">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addVideoArchiveLink} className="h-10 px-4 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors self-start">
          + Add Archive Link
        </button>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="h-12 px-8 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors self-start disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Config"}
      </button>
    </div>
  )
}
