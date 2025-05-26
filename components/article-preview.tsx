"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, CalendarIcon, Map, TagIcon, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/articles"

interface ArticlePreviewProps {
  article: Article
  isOpen: boolean
  onClose: () => void
}

export function ArticlePreview({ article, isOpen, onClose }: ArticlePreviewProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const formattedDate =
    article.date instanceof Date
      ? article.date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date(article.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

  return (
    <>
      {/* Backdrop with subtle blur */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal - centered on screen */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-lg border border-primary/30 bg-card 
                    shadow-[0_0_30px_rgba(255,0,255,0.5)] animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with image */}
          {article.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <img
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-card/80 p-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold tracking-wider mb-4">{article.title}</h2>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Map className="h-4 w-4 text-secondary" />
                <span>{article.ville}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4 text-secondary" />
                <span>{formattedDate}</span>
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <TagIcon className="h-4 w-4 text-secondary" />
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-secondary/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="prose prose-invert max-w-none mb-6">
              {article.shortDesc ? <p>{article.shortDesc}</p> : <p>{article.content.substring(0, 300)}...</p>}
            </div>

            <div className="flex justify-end">
              <Link href={`/articles/${article._id}`}>
                <Button className="gap-2">
                  Ouvrir la page de l'event
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
