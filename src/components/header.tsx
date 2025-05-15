"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { ModeToggle } from "@/src/components/mode-toggle"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            EduVid
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/videos/create" className="hover:text-primary transition-colors">
                    Create Video
                  </Link>
                </li>
              </ul>
            </nav>
            <ModeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="block hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos/create"
                    className="block hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Video
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
