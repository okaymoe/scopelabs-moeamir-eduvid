"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404")

  // cool little glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7
      if (shouldGlitch) {
        setGlitchText("CH4NN3L N0T F0UND")
        setTimeout(() => setGlitchText("404"), 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      <div className="relative w-full max-w-2xl aspect-video rounded-lg border-8 border-gray-800 bg-black overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-static opacity-30 animate-flicker"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
          <h1 className="text-6xl font-bold mb-2 animate-glitch tracking-widest">{glitchText}</h1>
          <div className="h-1 w-32 bg-white/50 mb-4 animate-scan"></div>
          <h2 className="text-2xl font-semibold mb-4 tracking-wide animate-flicker-slow">SIGNAL LOST</h2>
          <p className="text-gray-300 mb-6 max-w-md animate-flicker-slow">
            We couldn't tune into this channel. The content you're looking for doesn't exist or has been moved, sorry :/
          </p>
          <Link href="/">
            <Button className="bg-white text-black hover:bg-gray-300 transition-all animate-pulse">
              RETURN TO BROADCAST
            </Button>
          </Link>
        </div>

        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
      </div>

      <div className="w-40 h-10 bg-gray-800 mt-2 rounded-t-lg"></div>
    </div>
  )
}
