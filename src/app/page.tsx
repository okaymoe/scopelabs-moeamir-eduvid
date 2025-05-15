import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { VideoList } from "@/src/components/video-list"
import { HeroSection } from "@/src/components/hero-section"

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Educational Videos</h2>
          <Link href="/videos/create">
            <Button>Create New Video</Button>
          </Link>
        </div>
        <VideoList />
      </main>
    </div>
  )
}
