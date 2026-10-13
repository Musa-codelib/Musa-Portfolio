"use client"

import { useEffect, useState } from "react"

export default function SkillsPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("/api/skills", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  const updateCategory = (id, field, value) => {
    setCategories((prev) =>
      prev.map((c) => (c._id === id ? { ...c, [field]: value } : c))
    )
  }

  const addItem = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, items: [...c.items, ""] } : c
      )
    )
  }

  const updateItem = (id, index, value) => {
    setCategories((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, items: c.items.map((item, i) => (i === index ? value : item)) }
          : c
      )
    )
  }

  const removeItem = (id, index) => {
    setCategories((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, items: c.items.filter((_, i) => i !== index) }
          : c
      )
    )
  }

  const saveCategory = async (cat) => {
    setSavingId(cat._id)
    const token = localStorage.getItem("token")
    await fetch(`/api/skills/${cat._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: cat.title, subtitle: cat.subtitle, items: cat.items }),
    })
    setSavingId(null)
  }

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category?")) return
    const token = localStorage.getItem("token")
    const res = await fetch(`/api/skills/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c._id !== id))
    }
  }

  const addCategory = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: "New Category", subtitle: "SUBTITLE", items: [] }),
    })
    const data = await res.json()
    if (data.insertedId) {
      setCategories((prev) => [...prev, { _id: data.insertedId, title: "New Category", subtitle: "SUBTITLE", items: [] }])
    }
  }

  const inputClass = "w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"

  if (loading) return <p className="font-label-mono text-[12px] text-secondary">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight">Skills</h1>
        <button
          onClick={addCategory}
          className="h-10 px-6 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors"
        >
          Add Category
        </button>
      </div>
      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <div key={cat._id} className="border border-surface-container-high p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-0.5">
                <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Title</label>
                <input type="text" value={cat.title} onChange={(e) => updateCategory(cat._id, "title", e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Subtitle</label>
                <input type="text" value={cat.subtitle} onChange={(e) => updateCategory(cat._id, "subtitle", e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">Items</label>
              <div className="flex flex-col gap-2">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={item} onChange={(e) => updateItem(cat._id, i, e.target.value)} className={inputClass} />
                    <button type="button" onClick={() => removeItem(cat._id, i)} className="h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addItem(cat._id)} className="mt-2 h-10 px-4 border border-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase hover:bg-surface-container-low transition-colors self-start">
                + Add Item
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => saveCategory(cat)}
                disabled={savingId === cat._id}
                className="h-10 px-6 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors disabled:opacity-50"
              >
                {savingId === cat._id ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => deleteCategory(cat._id)}
                className="h-10 px-6 bg-error text-on-error font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] border border-error hover:bg-on-error hover:text-error transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
