"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Pencil } from "lucide-react"

interface EditButtonProps {
  videoId: string
}

export function EditButton({ videoId }: EditButtonProps) {
  return (
    <Link href={`/videos/edit/${videoId}`}>
      <Button variant="outline" size="sm" className="gap-1">
        <Pencil className="h-4 w-4" />
        Edit
      </Button>
    </Link>
  )
}
