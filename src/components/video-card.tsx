"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { formatDate } from "@/src/lib/utils"
import type { Video } from "@/src/lib/api"

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const router = useRouter()

  const goToVideo = () => {
    router.push(`/videos/${video.id}`)
  }

  const goToUser = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/users/${video.user_id}`)
  }

  return (
    <Card
      onClick={goToVideo}
      className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{video.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="aspect-video bg-black rounded-md mb-4 overflow-hidden">
          <video
            src={video.video_url}
            muted
            preload="metadata"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <p className="text-muted-foreground line-clamp-2">{video.description}</p>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        <div className="flex justify-between w-full">
          <span
            onClick={goToUser}
            className="underline text-primary cursor-pointer"
          >
            {video.user_id.replace("_", " ")}
          </span>
          <span>{formatDate(video.created_at)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
