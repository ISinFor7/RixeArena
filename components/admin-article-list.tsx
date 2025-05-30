"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditIcon, TrashIcon, EyeIcon } from "lucide-react"
import type { Article } from "@/lib/articles"
import { AdminFilters } from "./admin-filters"
import { filterAndSortArticles, getAllTags, getAllAuthors, type FilterOptions } from "@/lib/filters"
import { FormEvent } from 'react'
import { on } from "events"
interface AdminArticleListProps {
  articles: Article[]
}

export function AdminArticleList({ articles }: AdminArticleListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({ sortBy: "newest" , publishedStatus: "all" })

  const availableTags = useMemo(() => getAllTags(articles), [articles])
  const availableAuthors = useMemo(() => getAllAuthors(articles), [articles])
  const filteredArticles = useMemo(() => filterAndSortArticles(articles, filters), [articles, filters])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
  }
    
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    setDeletingId(id)
    try {
      console.log("Deleting article with ID:", id)
      //const data = await response.json()
    } catch (error) {
      alert("Error deleting article")
      console.error("Delete error:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No articles found</p>
        <Link href="/admin/articles/new">
          <Button>Create Your First Article</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <AdminFilters
        onFiltersChange={handleFiltersChange}
        availableTags={availableTags}
        availableAuthors={availableAuthors}
        totalCount={articles.length}
        filteredCount={filteredArticles.length}
      />

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No articles match your filters</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search criteria or clearing filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article._id}
              className="rounded-lg border border-primary/20 bg-card p-4 transition-colors hover:bg-card/80"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg truncate">{article.title}</h3>
                    {!article.published && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        Non publié
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    {article.tags && article.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {article.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{article.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  {article.shortDesc && <p className="text-sm text-muted-foreground line-clamp-2">{article.shortDesc}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/events/${article._id}`} target="_blank">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/events/${article._id}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <EditIcon className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <form onSubmit={onSubmit}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive"
                      type="submit"
                      //onClick={() => handleDelete(article._id ? article._id:"false", article.title)}
                      disabled={deletingId === article._id}
                    >
                      <TrashIcon className="h-4 w-4" />
                      {deletingId === article._id ? "Deleting..." : "Delete"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
