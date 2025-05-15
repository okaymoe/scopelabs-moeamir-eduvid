"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { editVideo, type Video } from "@/src/lib/api"

const editVideoFormSchema = z.object({
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
})

type EditVideoFormValues = z.infer<typeof editVideoFormSchema>

interface EditVideoFormProps {
  video: Video
}

export function EditVideoForm({ video }: EditVideoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<EditVideoFormValues>({
    resolver: zodResolver(editVideoFormSchema),
    defaultValues: {
      title: video.title,
      description: video.description,
    },
  })

  async function onSubmit(values: EditVideoFormValues) {
    setIsSubmitting(true)

    try {
      await editVideo({
        video_id: video.id,
        title: values.title,
        description: values.description,
        user_id: video.user_id,
      })

      toast.success("Video updated successfully!", {
        description: "Your changes have been saved.",
      })

      router.push(`/videos/${video.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error updating video:", error)

      toast.error("Failed to update video", {
        description: "There was an error updating your video. Please try again.",
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

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
