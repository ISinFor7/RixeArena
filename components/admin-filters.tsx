"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, XIcon, ChevronDownIcon } from "lucide-react"
import type { SortOption, FilterOptions, PublishedFilter } from "@/lib/filters"

interface AdminFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  availableTags: string[]
  availableAuthors: string[]
  totalCount: number
  filteredCount: number
}

export function AdminFilters({
  onFiltersChange,
  availableTags,
  availableAuthors,
  totalCount,
  filteredCount,
}: AdminFiltersProps) {
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [publishedStatus, setPublishedStatus] = useState<PublishedFilter>("all")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showTagMenu, setShowTagMenu] = useState(false)
  const [showAuthorMenu, setShowAuthorMenu] = useState(false)
  const [showPublishedMenu, setShowPublishedMenu] = useState(false)

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const filters: FilterOptions = {
      search,
      tags: selectedTags,
      author: selectedAuthor,
      sortBy,
      publishedStatus,
      ...newFilters,
    }
    onFiltersChange(filters)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    updateFilters({ search: value })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]
    setSelectedTags(newTags)
    updateFilters({ tags: newTags })
    setShowTagMenu(false)
  }

  const handleAuthorChange = (author: string) => {
    const newAuthor = author === selectedAuthor ? "" : author
    setSelectedAuthor(newAuthor)
    updateFilters({ author: newAuthor })
    setShowAuthorMenu(false)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    updateFilters({ sortBy: sort })
    setShowSortMenu(false)
  }

  const handlePublishedChange = (status: PublishedFilter) => {
    setPublishedStatus(status)
    updateFilters({ publishedStatus: status })
    setShowPublishedMenu(false)
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedTags([])
    setSelectedAuthor("")
    setSortBy("newest")
    setPublishedStatus("all")
    updateFilters({ search: "", tags: [], author: "", sortBy: "newest" })
  }

  const hasActiveFilters = search || selectedTags.length > 0 || selectedAuthor || sortBy !== "newest" || publishedStatus !== "all"

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Date décroissante" },
    { value: "oldest", label: "Date croissante" },
    { value: "title-asc", label: "Titre A-Z" },
    { value: "title-desc", label: "Titre Z-A" },
    { value: "author-asc", label: "Author A-Z" },
    { value: "author-desc", label: "Author Z-A" },
  ]

  const publishedOptions: { value: PublishedFilter; label: string }[] = [
    { value: "all", label: "All Articles" },
    { value: "published", label: "Published Only" },
    { value: "unpublished", label: "Unpublished Only" },
  ]
  // Close menus when clicking outside
  const handleOutsideClick = () => {
    setShowSortMenu(false)
    setShowTagMenu(false)
    setShowAuthorMenu(false)
    setShowPublishedMenu(false)
  }

  return (
    <>
      {/* Backdrop to close menus */}
      {(showSortMenu || showTagMenu || showAuthorMenu || showPublishedMenu) && (
        <div className="fixed inset-0 z-[90]" onClick={handleOutsideClick} />
      )}

      <div className="space-y-4 mb-6">
        {/* Search and Controls Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Recherchez un article, du contenu..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Published Status Filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setShowPublishedMenu(!showPublishedMenu)
                  setShowSortMenu(false)
                  setShowTagMenu(false)
                  setShowAuthorMenu(false)
                }}
              >
                Status: {publishedOptions.find((opt) => opt.value === publishedStatus)?.label}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
              {showPublishedMenu && (
                <div className="absolute right-0 top-full mt-1 z-[100] w-48 rounded-md border border-primary/30 bg-card shadow-xl backdrop-blur-sm">
                  <div className="p-1">
                    {publishedOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handlePublishedChange(option.value)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors ${
                          publishedStatus === option.value ? "bg-accent" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setShowSortMenu(!showSortMenu)
                  setShowTagMenu(false)
                  setShowAuthorMenu(false)
                  setShowPublishedMenu(false)
                }}
              >
                Tri: {sortOptions.find((opt) => opt.value === sortBy)?.label}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 z-[100] w-48 rounded-md border border-primary/30 bg-card shadow-xl backdrop-blur-sm">
                  <div className="p-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors ${
                          sortBy === option.value ? "bg-accent" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Author Filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setShowAuthorMenu(!showAuthorMenu)
                  setShowSortMenu(false)
                  setShowTagMenu(false)
                  setShowPublishedMenu(false)
                }}
              >
                Auteur {selectedAuthor && `(${selectedAuthor})`}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
              {showAuthorMenu && (
                <div className="absolute right-0 top-full mt-1 z-[100] w-48 rounded-md border border-primary/30 bg-card shadow-xl backdrop-blur-sm">
                  <div className="p-1 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => handleAuthorChange("")}
                      className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors ${
                        !selectedAuthor ? "bg-accent" : ""
                      }`}
                    >
                      Tout les auteurs
                    </button>
                    {availableAuthors.map((author) => (
                      <button
                        key={author}
                        onClick={() => handleAuthorChange(author)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors ${
                          selectedAuthor === author ? "bg-accent" : ""
                        }`}
                      >
                        {author}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags Filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  setShowTagMenu(!showTagMenu)
                  setShowSortMenu(false)
                  setShowAuthorMenu(false)
                  setShowPublishedMenu(false)
                }}
              >
                Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
              {showTagMenu && (
                <div className="absolute right-0 top-full mt-1 z-[100] w-48 rounded-md border border-primary/30 bg-card shadow-xl backdrop-blur-sm">
                  <div className="p-1 max-h-48 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors ${
                          selectedTags.includes(tag) ? "bg-accent" : ""
                        }`}
                      >
                        {tag} {selectedTags.includes(tag) && "✓"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <XIcon className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtres actifs:</span>

            {publishedStatus !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {publishedStatus === "published" ? "Published" : "Unpublished"}
                <button onClick={() => handlePublishedChange("all")}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {selectedAuthor && (
              <Badge variant="secondary" className="gap-1">
                Auteur: {selectedAuthor}
                <button onClick={() => handleAuthorChange(selectedAuthor)}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => handleTagToggle(tag)}>
                  <XIcon className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {sortBy !== "newest" && (
              <Badge variant="outline">{sortOptions.find((opt) => opt.value === sortBy)?.label}</Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {filteredCount} events sur {totalCount} affichés
          </span>
        </div>
      </div>
    </>
  )
}
