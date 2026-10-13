"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthorized(true)
      return
    }
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setAuthorized(true)
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin/login")
  }

  if (!authorized) return null
  if (pathname === "/admin/login") return <>{children}</>

  const links = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Highlights", href: "/admin/highlights" },
    { label: "Videos", href: "/admin/videos" },
    { label: "Skills", href: "/admin/skills" },
    { label: "Site Config", href: "/admin/bio" },
    { label: "Contacts", href: "/admin/contacts" },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-48 border-r border-surface-container-high flex flex-col p-6">
        <Link href="/admin/dashboard" className="font-display font-bold text-[18px] text-primary tracking-tight mb-8">
          MUSA Admin
        </Link>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors py-2 ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? "text-primary border-l-2 border-primary pl-2"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary hover:text-error transition-colors py-2 text-left"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto w-full min-w-0">{children}</main>
    </div>
  )
}
