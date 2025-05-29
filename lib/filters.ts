import type { Article } from "./articles"

export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc" | "author-asc" | "author-desc"

export interface FilterOptions {
  search?: string
  tags?: string[]
  author?: string
  sortBy?: SortOption
}

export function filterAndSortArticles(articles: Article[], options: FilterOptions): Article[] {
  let filtered = [...articles]

  // Apply search filter
  if (options.search && options.search.trim()) {
    const searchTerm = options.search.toLowerCase().trim()
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm) ||
        article.shortDesc.toLowerCase().includes(searchTerm) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  // Apply tag filter
  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter((article) => article.tags?.some((tag) => options.tags!.includes(tag)))
  }

  // Apply author filter
  if (options.author && options.author.trim()) {
    filtered = filtered.filter((article) => article.author.toLowerCase().includes(options.author!.toLowerCase().trim()))
  }

  // Apply sorting
  switch (options.sortBy) {
    case "newest":
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break
    case "oldest":
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case "title-asc":
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "title-desc":
      filtered.sort((a, b) => b.title.localeCompare(a.title))
      break
    case "author-asc":
      filtered.sort((a, b) => a.author.localeCompare(b.author))
      break
    case "author-desc":
      filtered.sort((a, b) => b.author.localeCompare(a.author))
      break
    default:
      // Default to newest
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return filtered
}

export function getAllTags(articles: Article[]): string[] {
  const tagSet = new Set<string>()
  articles.forEach((article) => {
    article.tags?.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function getAllAuthors(articles: Article[]): string[] {
  const authorSet = new Set<string>()
  articles.forEach((article) => {
    authorSet.add(article.author)
  })
  return Array.from(authorSet).sort()
}
