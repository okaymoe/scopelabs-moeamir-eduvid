import { VideoForm } from "@/src/components/video-form"

export const metadata = {
  title: "Create New Video | EduVid",
  description: "Add a new educational video to the platform",
}

export default function CreateVideoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Video</h1>
      <VideoForm />
    </div>
  )
}
