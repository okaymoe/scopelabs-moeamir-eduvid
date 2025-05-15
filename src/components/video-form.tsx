"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getVideos } from "@/src/lib/api"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { createVideo } from "@/src/lib/api"

const videoFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  video_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
})

type VideoFormValues = z.infer<typeof videoFormSchema>

export function VideoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
    },
  })

  async function onSubmit(values: VideoFormValues) {
    setIsSubmitting(true)
  
    try {
      await createVideo(values)
  
      const videos = await getVideos()
      const latest = videos[videos.length - 1]
  
      if (!latest || !latest.id) {
        throw new Error("Video not found after creation")
      }
  
      toast.success("Video created successfully!", {
        description: "Your video has been added to the platform.",
      })
  
      router.push(`/videos/${latest.id}`)
    } catch (error) {
      console.error("Error creating video:", error)
  
      toast.error("Failed to create video", {
        description: "There was an error creating your video. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title" {...field} />
              </FormControl>
              <FormDescription>A clear, descriptive title for your educational video.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe what your video is about..." className="min-h-32" {...field} />
              </FormControl>
              <FormDescription>Provide details about the content and what viewers will learn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="video_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/video.mp4" {...field} />
              </FormControl>
              <FormDescription>Enter the direct URL to your video file (MP4, WebM, etc.)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Video"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
