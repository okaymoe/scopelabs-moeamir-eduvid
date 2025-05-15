import { VideoPlayer } from "@/src/components/video-player"
import { CommentSection } from "@/src/components/comment-section"
import { getVideoById } from "@/src/lib/api"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { EditButton } from "./edit-button"

interface VideoPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const video = await getVideoById(id)
    return {
      title: `${video.title} | EduVid`,
      description: video.description,
    }
  } catch {
    return {
      title: "Video Not Found | EduVid",
      description: "The requested video could not be found",
    }
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params

  try {
    const video = await getVideoById(id)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <Link
              href={`/users/${video.user_id}`}
              className="text-sm text-primary underline"
            >
              By {video.user_id.replace("_", " ")}
            </Link>
          </div>
          <EditButton videoId={id} />
        </div>

        <p className="text-muted-foreground mb-6">{video.description}</p>

        <div className="mb-8">
          <VideoPlayer videoUrl={video.video_url} />
        </div>

        <CommentSection videoId={id} />
      </div>
    )
  } catch {
    notFound()
  }
}
