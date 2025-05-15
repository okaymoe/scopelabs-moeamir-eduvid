"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack } from "lucide-react"
import { Slider } from "@/src/components/ui/slider"
import { Button } from "@/src/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"

interface VideoPlayerProps {
  videoUrl: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  console.log("Video URL received:", videoUrl)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)
    container?.addEventListener("mouseleave", () => {
      if (isPlaying) {
        setShowControls(false)
      }
    })

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
      container?.removeEventListener("mouseleave", () => {})
      clearTimeout(timeout)
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateTime)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateTime)
    }
  }, [])

  //  play/pause
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [isPlaying])

  //volume
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = volume
    video.muted = isMuted
  }, [volume, isMuted])

  //rate change / playback stuff
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = playbackRate
  }, [playbackRate])

  // format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // FS
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // listen for the FS change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // skip forward/backward
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={() => setIsPlaying(!isPlaying)}
        onEnded={() => setIsPlaying(false)}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.01}
            onValueChange={(value) => {
              if (videoRef.current) {
                videoRef.current.currentTime = value[0]
              }
            }}
            className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
          />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={skipBackward} className="text-white hover:bg-white/10">
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={skipForward} className="text-white hover:bg-white/10">
              <SkipForward className="h-5 w-5" />
            </Button>

            {/* Vol */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/10"
              >
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    const newVolume = value[0] / 100
                    setVolume(newVolume)
                    setIsMuted(newVolume === 0)
                  }}
                  className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-2.5 [&_[role=slider]]:h-2.5 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
                />
              </div>
            </div>

            {/* timestamp */}
            <div className="text-xs text-white/90 ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/*playback speed*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 text-xs">
                  {playbackRate}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                  <DropdownMenuItem
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={playbackRate === rate ? "bg-muted" : ""}
                  >
                    {rate}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/*Fullscreen */}
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/10">
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
