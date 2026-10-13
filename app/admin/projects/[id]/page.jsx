"use client"

import { useParams } from "next/navigation"
import ProjectForm from "../ProjectForm"

export default function EditProjectPage() {
  const params = useParams()

  return (
    <div>
      <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight mb-8">
        Edit Project
      </h1>
      <ProjectForm projectId={params.id} />
    </div>
  )
}
