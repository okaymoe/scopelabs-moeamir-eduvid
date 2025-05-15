import { EditVideoForm } from "@/src/components/edit-video-form"
import { getVideoById } from "@/src/lib/api"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface EditVideoPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditVideoPageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const video = await getVideoById(id)
    return {
      title: `Edit: ${video.title} | EduVid`,
      description: `Edit details for ${video.title}`,
    }
  } catch {
    return {
      title: "Video Not Found | EduVid",
      description: "The requested video could not be found",
    }
  }
}


export default async function EditVideoPage({ params }: EditVideoPageProps) {
  const { id } = await params

  try {
    const video = await getVideoById(id)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Video</h1>
        <EditVideoForm video={video} />
      </div>
    )
  } catch {
    notFound()
  }
}
