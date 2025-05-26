"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinIcon, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
  onOpenPreview: () => void
}

export function ArticleCard({ article, onOpenPreview }: ArticleCardProps) {
  // Format the date to be more prominent
  const formattedDate =
    article.date instanceof Date
      ? article.date.toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
        })
      : new Date(article.date).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
        })

  // Get year separately for styling
  const year =
    article.date instanceof Date ? article.date.getFullYear() : new Date(article.date).getFullYear()

  // Get first few words of title (1-3 words)
  const titleWords = article.title.split(" ")
  const shortTitle = titleWords.slice(0, Math.min(3, titleWords.length)).join(" ")

  // Get additional tags (all except the first one)
  const additionalTags = article.tags && article.tags.length > 1 ? article.tags.slice(1) : []

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onOpenPreview()
  }

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card className="h-full overflow-hidden transition-all card-glow neon-border">
        {/* Compact header with truncated title */}
        <CardHeader className="p-3 pb-2">
          <CardTitle className="truncate text-base tracking-wider">{shortTitle.toUpperCase()}</CardTitle>
        </CardHeader>

        <div className="flex flex-col">
          {/* Prominent date display */}
          <div className="px-3 py-2 text-center border-y border-primary/20">
            <div className="text-lg font-bold text-secondary">{formattedDate}</div>
            <div className="text-xs text-muted-foreground">{year}</div>
          </div>

          {/* Compact content */}
          <CardContent className="p-3">
            <div className="flex flex-col gap-2 text-xs">
              {/* Author */}
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3 text-secondary" />
                <span className="truncate">{article.ville}</span>
              </div>

              {/* Tags - show first tag and +X indicator */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <TagIcon className="h-3 w-3 text-secondary" />
                  <div className="flex flex-wrap gap-1">
                    {/* Always show first tag */}
                    <Badge variant="outline" className="text-xs border-secondary/50">
                      {article.tags[0]}
                    </Badge>

                    {/* Show +X for additional tags */}
                    {additionalTags.length > 0 && (
                      <Badge variant="outline" className="text-xs border-secondary/50">
                        +{additionalTags.length}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
