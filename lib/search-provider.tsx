"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import Fuse from "fuse.js"

export interface SearchItem {
  id: string
  type: "blog" | "tool"
  title: string
  description: string
  category: string
  tags: string[]
  url: string
  content?: string
  author?: string
  date?: string
}

interface SearchContextType {
  searchItems: SearchItem[]
  search: (query: string) => SearchItem[]
  recentSearches: string[]
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
  isLoading: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

const RECENT_SEARCHES_KEY = "tulz-recent-searches"
const MAX_RECENT_SEARCHES = 5

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load search index
  useEffect(() => {
    async function loadSearchIndex() {
      try {
        const response = await fetch("/search-index.json")
        const data: SearchItem[] = await response.json()
        setSearchItems(data)

        // Initialize Fuse.js
        const fuseInstance = new Fuse<SearchItem>(data, {
          keys: [
            { name: "title", weight: 0.4 },
            { name: "description", weight: 0.3 },
            { name: "category", weight: 0.1 },
            { name: "tags", weight: 0.1 },
            { name: "content", weight: 0.1 },
          ],
          threshold: 0.3,
          includeScore: true,
          minMatchCharLength: 2,
        })

        setFuse(fuseInstance)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load search index:", error)
        setIsLoading(false)
      }
    }

    loadSearchIndex()
  }, [])

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored))
        } catch (e) {
          console.error("Failed to parse recent searches:", e)
        }
      }
    }
  }, [])

  // Save recent searches to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches))
    }
  }, [recentSearches])

  const search = useCallback(
    (query: string): SearchItem[] => {
      if (!fuse || !query.trim()) {
        return []
      }

      const results = fuse.search(query, { limit: 10 })
      return results.map(result => result.item)
    },
    [fuse]
  )

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return

    setRecentSearches(prev => {
      // Remove if already exists
      const filtered = prev.filter(s => s.toLowerCase() !== query.toLowerCase())
      // Add to beginning
      const updated = [query, ...filtered]
      // Keep only max items
      return updated.slice(0, MAX_RECENT_SEARCHES)
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    }
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchItems,
        search,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider")
  }
  return context
}
