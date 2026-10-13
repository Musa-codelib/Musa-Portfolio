"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Login failed")
        setLoading(false)
        return
      }
      localStorage.setItem("token", data.token)
      router.push("/admin/dashboard")
    } catch {
      setError("Network error")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-0.5">
            <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"
            />
          </div>
          {error && (
            <p className="font-label-mono text-[12px] text-error">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
