"use client"

import type React from "react"

import { useState } from "react"
import { SplashScreen } from "./SplashScreen"

export function RootShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)


  const handleSplashComplete = () => {
    setShowSplash(false)
    // didn't know how to prevent this from happening on each render but i learned how to do it, sessionstorage is a good solution. noted for future works.
    sessionStorage.setItem("hasVisited", "true")
  }

  return showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : <>{children}</>
}
