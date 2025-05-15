import { getVideos } from "@/src/lib/api"
import { VideoCard } from "@/src/components/video-card"

export async function VideoList() {
  const videos = await getVideos()

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No videos found</h3>
        <p className="text-muted-foreground">Be the first to create an educational video!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
