import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Learn Anything, Anytime</h1>
          <p className="text-xl text-white/90 mb-8">
            Create, share, and watch educational videos on our platform. Join our community of learners and educators
            today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/videos/create">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                + Create a Video
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
