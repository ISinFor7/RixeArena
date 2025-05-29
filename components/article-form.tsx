"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SaveIcon, ArrowLeftIcon } from "lucide-react"
import type { Article } from "@/lib/articles"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ArticleFormProps {
  article?: Article
  mode: "create" | "edit"
}

export function ArticleForm({ article, mode }: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" className="gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Retour à la gestion des events
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-wider">
            {mode === "create" ? "CREATE NEW ARTICLE" : "EDIT ARTICLE"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "create" ? "Add a new article to your collection" : "Update article information"}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm p-6">
        {error && (
          <div className="mb-6 rounded-md bg-destructive/10 border border-destructive/20 p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Use the form action directly */}
        <form
          action={mode === "create" ? "/api/events/create" : `/api/events/update?id=${article?._id}`}
          method="POST"
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={article?.title || ""}
                placeholder="Enter article title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                defaultValue={article?.author || ""}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Description rapide</Label>
            <Textarea
              id="shortDesc"
              name="shortDesc"
              defaultValue={article?.shortDesc || ""}
              placeholder="Brief description of the article (optional)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Start Date *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={article?.date ? new Date(article.date).toISOString().split('T')[0] : ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFin">End Date *</Label>
            <Input
              id="dateFin"
              name="dateFin"
              type="date"
              defaultValue={article?.dateFin ? new Date(article.dateFin).toISOString().split('T')[0] : ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={article?.content || ""}
              placeholder="Write your article content here..."
              rows={12}
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={article?.imageUrl || ""}
                placeholder="https://example.com/image.jpg"
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="adresse">Address</Label>
              <Input
                id="adresse"
                name="adresse"
                defaultValue={article?.adresse || ""}
                placeholder="Event address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ville">City</Label>
              <Input
                id="ville"
                name="ville"
                defaultValue={article?.ville || ""}
                placeholder="Event city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                defaultValue={article?.tags?.join(", ") || ""}
                placeholder="React, JavaScript, Web Development (comma separated)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Link href="/admin">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="gap-2">
              <SaveIcon className="h-4 w-4" />
              {mode === "create" ? "Create Article" : "Update Article"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
