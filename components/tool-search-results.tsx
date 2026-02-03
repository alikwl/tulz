"use client"

import { Tool, ToolCategory } from "@/lib/tools-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { X, Search, TrendingUp } from "lucide-react"
import { SortOption } from "@/hooks/use-tool-search"

interface SearchResultsProps {
  tools: Tool[]
  searchQuery: string
  isSearching?: boolean
  activeFilters: {
    categories: ToolCategory[]
    sort: SortOption
    features: string[]
  }
  onRemoveCategory?: (category: ToolCategory) => void
  onRemoveFeature?: (feature: string) => void
  onClearSearch?: () => void
}

function highlightText(text: string, query: string) {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, "gi"))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200 dark:bg-yellow-900/50 text-foreground">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function EmptyState({ searchQuery }: { searchQuery?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No tools found</h3>
      {searchQuery ? (
        <p className="text-muted-foreground max-w-md">
          We couldn't find any tools matching "<span className="font-medium">{searchQuery}</span>". Try
          searching with different keywords or browse all tools.
        </p>
      ) : (
        <p className="text-muted-foreground max-w-md">
          No tools match your current filters. Try adjusting your filters or clear them to see all
          tools.
        </p>
      )}
    </div>
  )
}

export function ToolSearchResults({
  tools,
  searchQuery,
  isSearching = false,
  activeFilters,
  onRemoveCategory,
  onRemoveFeature,
  onClearSearch,
}: SearchResultsProps) {
  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.features.length > 0 ||
    searchQuery

  if (isSearching) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Results Header & Filter Chips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {searchQuery ? (
              <>
                Results for "<span className="text-primary">{searchQuery}</span>"
              </>
            ) : (
              "All Tools"
            )}
          </h2>
          <div className="text-sm text-muted-foreground">
            {tools.length} {tools.length === 1 ? "tool" : "tools"} found
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge
                variant="secondary"
                className="gap-2 pl-3 pr-2 py-1.5"
              >
                <Search className="h-3 w-3" />
                {searchQuery}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSearch}
                  className="h-auto w-auto p-0 hover:bg-transparent"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {activeFilters.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="gap-2 pl-3 pr-2 py-1.5"
              >
                {category}
                {onRemoveCategory && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCategory(category)}
                    className="h-auto w-auto p-0 hover:bg-transparent"
                    aria-label={`Remove ${category} filter`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
            {activeFilters.features.map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="gap-2 pl-3 pr-2 py-1.5"
              >
                {feature === "popular" && "Popular Tools"}
                {feature === "new" && "New Tools"}
                {onRemoveFeature && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFeature(feature)}
                    className="h-auto w-auto p-0 hover:bg-transparent"
                    aria-label={`Remove ${feature} filter`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {tools.length === 0 ? (
        <EmptyState searchQuery={searchQuery} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.id} href={tool.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        {tool.popular && (
                          <Badge variant="default" className="gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Popular
                          </Badge>
                        )}
                        {tool.new && (
                          <Badge variant="secondary">New</Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      {highlightText(tool.name, searchQuery)}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {highlightText(tool.description, searchQuery)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {tool.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="flex-1">{highlightText(feature, searchQuery)}</span>
                        </li>
                      ))}
                    </ul>
                    {tool.usageCount && (
                      <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                        {tool.usageCount.toLocaleString()} uses
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
