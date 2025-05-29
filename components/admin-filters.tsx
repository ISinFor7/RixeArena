"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, XIcon, ChevronDownIcon } from "lucide-react"
import type { SortOption, FilterOptions } from "@/lib/filters"

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
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showTagMenu, setShowTagMenu] = useState(false)
  const [showAuthorMenu, setShowAuthorMenu] = useState(false)

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const filters: FilterOptions = {
      search,
      tags: selectedTags,
      author: selectedAuthor,
      sortBy,
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

  const clearFilters = () => {
    setSearch("")
    setSelectedTags([])
    setSelectedAuthor("")
    setSortBy("newest")
    updateFilters({ search: "", tags: [], author: "", sortBy: "newest" })
  }

  const hasActiveFilters = search || selectedTags.length > 0 || selectedAuthor || sortBy !== "newest"

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
    { value: "author-asc", label: "Author A-Z" },
    { value: "author-desc", label: "Author Z-A" },
  ]

  // Close menus when clicking outside
  const handleOutsideClick = () => {
    setShowSortMenu(false)
    setShowTagMenu(false)
    setShowAuthorMenu(false)
  }

  return (
    <>
      {/* Backdrop to close menus */}
      {(showSortMenu || showTagMenu || showAuthorMenu) && (
        <div className="fixed inset-0 z-[90]" onClick={handleOutsideClick} />
      )}

      <div className="space-y-4 mb-6">
        {/* Search and Controls Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles, authors, content..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
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
                }}
              >
                Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}
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
                }}
              >
                Author {selectedAuthor && `(${selectedAuthor})`}
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
                      All Authors
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
            <span className="text-sm text-muted-foreground">Active filters:</span>

            {selectedAuthor && (
              <Badge variant="secondary" className="gap-1">
                Author: {selectedAuthor}
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
            Showing {filteredCount} of {totalCount} articles
          </span>
        </div>
      </div>
    </>
  )
}
