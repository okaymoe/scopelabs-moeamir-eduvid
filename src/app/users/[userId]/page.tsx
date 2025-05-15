import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getVideos } from "@/src/lib/api"
import { VideoCard } from "@/src/components/video-card"

interface UserVideosPageProps {
  params: {
    userId: string
  }
}

export async function generateMetadata({ params }: UserVideosPageProps): Promise<Metadata> {
  const { userId } = await params
  return {
    title: `${userId.replace("_", " ")}’s Videos | EduVid`,
    description: `All videos uploaded by ${userId.replace("_", " ")}`,
  }
}

export default async function UserVideosPage({ params }: UserVideosPageProps) {
  const { userId } = await params

  try {
    const videos = await getVideos(userId)
    if (videos.length === 0) notFound()

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {userId.replace("_", " ")}’s Videos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
