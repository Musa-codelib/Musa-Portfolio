"use client"

import { useParams } from "next/navigation"
import HighlightForm from "../HighlightForm"

export default function EditHighlightPage() {
  const params = useParams()

  return (
    <div>
      <h1 className="font-display font-semibold text-[40px] text-primary tracking-tight mb-8">
        Edit Highlight
      </h1>
      <HighlightForm highlightId={params.id} />
    </div>
  )
}
