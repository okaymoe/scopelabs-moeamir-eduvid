import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EduVid. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              href="/videos/create"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Create Video
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
