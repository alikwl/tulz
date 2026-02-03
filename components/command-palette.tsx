"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/lib/search-provider"
import {
  FileText,
  Wrench,
  Clock,
  X,
  Search,
  TrendingUp,
} from "lucide-react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { search, recentSearches, addRecentSearch, clearRecentSearches } = useSearch()
  const router = useRouter()

  const results = query.trim() ? search(query) : []

  // Cmd+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = useCallback((item: any) => {
    setOpen(false)
    setQuery("")

    if (item.url) {
      addRecentSearch(query)
      router.push(item.url)
    } else if (item.query) {
      // Recent search
      setQuery(item.query)
      addRecentSearch(item.query)
    }
  }, [query, addRecentSearch, router])

  const handleRecentClick = useCallback((recentQuery: string) => {
    setQuery(recentQuery)
  }, [])

  const groupedResults = {
    blog: results.filter(r => r.type === "blog"),
    tool: results.filter(r => r.type === "tool"),
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors min-h-[44px]"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Search...</span>
        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search tools, blog posts, and more..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">No results found</p>
              <p className="text-xs text-muted-foreground">
                Try different keywords or check your spelling
              </p>
            </div>
          </CommandEmpty>

          {!query && recentSearches.length > 0 && (
            <>
              <CommandGroup heading={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
              }>
                {recentSearches.map((recent, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleRecentClick(recent)}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{recent}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {groupedResults.blog.length > 0 && (
            <CommandGroup heading={
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Blog Posts</span>
              </div>
            }>
              {groupedResults.blog.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => handleSelect(item)}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <div className="flex items-center gap-2 w-full">
                    <FileText className="h-4 w-4 flex-shrink-0 text-blue-500" />
                    <span className="font-medium truncate flex-1">{item.title}</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 ml-6">
                    {item.description}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {groupedResults.tool.length > 0 && (
            <>
              {groupedResults.blog.length > 0 && <CommandSeparator />}
              <CommandGroup heading={
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  <span>Tools</span>
                </div>
              }>
                {groupedResults.tool.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => handleSelect(item)}
                    className="flex flex-col items-start gap-1 py-3"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Wrench className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="font-medium truncate flex-1">{item.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 ml-6">
                      {item.description}
                    </p>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
