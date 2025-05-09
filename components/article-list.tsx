"use client"

import { useState } from "react"
import type { Article } from "@/lib/articles"
import { ArticleCard } from "@/components/article-card"
import { ArticlePreview } from "@/components/article-preview"

interface ArticleListProps {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null)

  const handleOpenPreview = (article: Article) => {
    setPreviewArticle(article)
  }

  const handleClosePreview = () => {
    setPreviewArticle(null)
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-primary/30 bg-card bg-opacity-80 backdrop-blur-sm p-6 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold">Aucun évènement trouvé</h2>
          <p className="text-muted-foreground">Revenez voir plus tard.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border border-primary/30 bg-card bg-opacity-80 backdrop-blur-sm p-6 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} onOpenPreview={() => handleOpenPreview(article)} />
          ))}
        </div>
      </div>

      {/* Preview appears centered on screen */}
      {previewArticle && (
        <ArticlePreview article={previewArticle} isOpen={!!previewArticle} onClose={handleClosePreview} />
      )}
    </>
  )
}
