"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Input } from "@/src/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { getCommentsByVideoId, createComment, type Comment } from "@/src/lib/api"
import { formatDate } from "@/src/lib/utils"

interface CommentSectionProps {
  videoId: string
}

const commentFormSchema = z.object({
  user_id: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(50, {
      message: "Name must not exceed 50 characters.",
    }),
  content: z
    .string()
    .min(3, {
      message: "Comment must be at least 3 characters.",
    })
    .max(500, {
      message: "Comment must not exceed 500 characters.",
    }),
})

type CommentFormValues = z.infer<typeof commentFormSchema>

export function CommentSection({ videoId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      user_id: "",
      content: "",
    },
  })

  useEffect(() => {
    async function loadComments() {
      try {
        const fetchedComments = await getCommentsByVideoId(videoId)
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
        toast.error("Failed to load comments", {
          description: "There was an error loading the comments.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadComments()
  }, [videoId])

  async function onSubmit(values: CommentFormValues) {
    setIsSubmitting(true)

    try {
      const newComment = await createComment({
        video_id: videoId,
        user_id: values.user_id,
        content: values.content,
      })

      const refreshedComments = await getCommentsByVideoId(videoId)
      setComments(refreshedComments)

      form.reset({
        user_id: values.user_id, 
        content: "",
      })

      toast.success("Comment added", {
        description: "Your comment has been posted successfully.",
      })
    } catch (error) {
      console.error("Error posting comment:", error)

      toast.error("Failed to post comment", {
        description: "There was an error posting your comment. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      <div className="bg-muted/40 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Add a comment</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share your thoughts..." className="min-h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Comment list */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{comment.user_id.replace("_", " ")}</h4>
                <span className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
