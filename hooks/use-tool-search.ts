"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { tools, Tool, ToolCategory, categories } from "@/lib/tools-data"

export type SortOption = "popular" | "newest" | "a-z" | "z-a" | "most-used"

export interface SearchFilters {
  query: string
  categories: ToolCategory[]
  sort: SortOption
  features: string[]
}

const RECENT_SEARCHES_KEY = "tulz-recent-searches"
const MAX_RECENT_SEARCHES = 5

export function useToolSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const [selectedCategories, setSelectedCategories] = useState<ToolCategory[]>(() => {
    const categoryParam = searchParams.get("category")
    return categoryParam ? [categoryParam as ToolCategory] : []
  })
  const [sortBy, setSortBy] = useState<SortOption>((searchParams.get("sort") as SortOption) || "popular")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse recent searches:", e)
      }
    }
  }, [])

  // Debounce search query
  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (debouncedQuery) {
      params.set("search", debouncedQuery)
    }

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    }

    if (sortBy !== "popular") {
      params.set("sort", sortBy)
    }

    if (selectedFeatures.length > 0) {
      params.set("features", selectedFeatures.join(","))
    }

    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname

    if (newUrl !== `${pathname}${window.location.search}`) {
      router.replace(newUrl, { scroll: false })
    }
  }, [debouncedQuery, selectedCategories, sortBy, selectedFeatures, pathname, router])

  // Save to recent searches when user submits
  const saveToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return

    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== query)
      const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES)
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }, [])

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = [...tools]

    // Apply search query
    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase()
      filtered = filtered.filter((tool) => {
        return (
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query) ||
          tool.features.some((feature) => feature.toLowerCase().includes(query))
        )
      })
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tool) => selectedCategories.includes(tool.category))
    }

    // Apply feature filters
    if (selectedFeatures.includes("popular")) {
      filtered = filtered.filter((tool) => tool.popular)
    }
    if (selectedFeatures.includes("new")) {
      filtered = filtered.filter((tool) => tool.new)
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
        break
      case "newest":
        filtered.sort((a, b) => {
          if (a.new && !b.new) return -1
          if (!a.new && b.new) return 1
          return 0
        })
        break
      case "a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "most-used":
        filtered.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
        break
    }

    return filtered
  }, [debouncedQuery, selectedCategories, sortBy, selectedFeatures])

  // Get search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return []

    const query = searchQuery.toLowerCase()
    const suggestions: Array<{ type: "tool" | "category"; data: Tool | ToolCategory; label: string }> = []

    // Add matching tools
    tools.forEach((tool) => {
      if (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      ) {
        suggestions.push({
          type: "tool",
          data: tool,
          label: tool.name,
        })
      }
    })

    // Add matching categories
    categories.forEach((category) => {
      if (category.toLowerCase().includes(query)) {
        suggestions.push({
          type: "category",
          data: category,
          label: category,
        })
      }
    })

    return suggestions.slice(0, 8)
  }, [searchQuery])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedCategories([])
    setSortBy("popular")
    setSelectedFeatures([])
  }, [])

  // Toggle category
  const toggleCategory = useCallback((category: ToolCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }, [])

  // Toggle feature
  const toggleFeature = useCallback((feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    )
  }, [])

  return {
    // Search state
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isSearching,

    // Filters
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    sortBy,
    setSortBy,
    selectedFeatures,
    toggleFeature,

    // Results
    filteredTools,
    totalResults: filteredTools.length,

    // Suggestions
    searchSuggestions,
    recentSearches,
    saveToRecentSearches,
    clearRecentSearches,

    // Actions
    clearAllFilters,

    // Active filters count
    activeFiltersCount: selectedCategories.length + selectedFeatures.length + (debouncedQuery ? 1 : 0),
  }
}
