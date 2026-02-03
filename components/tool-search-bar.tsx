"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Clock, TrendingUp, Command } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tool, ToolCategory } from "@/lib/tools-data"
import Link from "next/link"
import { getCategorySlug } from "@/lib/tools-data"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  suggestions: Array<{ type: "tool" | "category"; data: Tool | ToolCategory; label: string }>
  recentSearches: string[]
  onClearRecent: () => void
  isSearching?: boolean
  placeholder?: string
}

export function ToolSearchBar({
  value,
  onChange,
  onSubmit,
  suggestions,
  recentSearches,
  onClearRecent,
  isSearching = false,
  placeholder = "Search tools...",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const showSuggestions = isFocused && (suggestions.length > 0 || recentSearches.length > 0)
  const allSuggestions = [...suggestions]

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle keyboard navigation in dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && allSuggestions[selectedIndex]) {
          const suggestion = allSuggestions[selectedIndex]
          if (suggestion.type === "tool") {
            const tool = suggestion.data as Tool
            window.location.href = tool.href
          } else {
            const category = suggestion.data as ToolCategory
            window.location.href = `/tools/${getCategorySlug(category)}`
          }
        } else if (value.trim()) {
          onSubmit?.(value)
          setIsFocused(false)
        }
        break
      case "Escape":
        setIsFocused(false)
        inputRef.current?.blur()
        break
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  const handleRecentSearchClick = (query: string) => {
    onChange(query)
    onSubmit?.(query)
    setIsFocused(false)
  }

  const popularSearches = ["JSON", "image", "converter", "password", "color"]

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="h-12 pl-10 pr-24 text-base"
          aria-label="Search tools"
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
      </div>

      {showSuggestions && (
        <Card
          ref={dropdownRef}
          className="absolute top-full z-50 mt-2 w-full overflow-hidden shadow-lg"
        >
          <div className="max-h-96 overflow-y-auto">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b">
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => {
                  const isSelected = index === selectedIndex
                  const isTool = suggestion.type === "tool"
                  const tool = isTool ? (suggestion.data as Tool) : null
                  const category = !isTool ? (suggestion.data as ToolCategory) : null

                  return (
                    <Link
                      key={`${suggestion.type}-${suggestion.label}`}
                      href={
                        isTool
                          ? tool!.href
                          : `/tools/${getCategorySlug(category!)}`
                      }
                      className={`flex items-start gap-3 px-3 py-2.5 transition-colors ${
                        isSelected
                          ? "bg-accent"
                          : "hover:bg-accent/50"
                      }`}
                      onClick={() => {
                        onSubmit?.(value)
                        setIsFocused(false)
                      }}
                    >
                      {isTool && tool && (
                        <>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <tool.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{tool.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {tool.description}
                            </div>
                          </div>
                          {tool.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          )}
                        </>
                      )}
                      {!isTool && category && (
                        <>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Search className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{category}</div>
                            <div className="text-xs text-muted-foreground">
                              View category
                            </div>
                          </div>
                        </>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !value && (
              <div>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Recent Searches
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearRecent}
                    className="h-auto py-0 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {recentSearches.map((query) => (
                  <button
                    key={query}
                    onClick={() => handleRecentSearchClick(query)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/50"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{query}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!value && recentSearches.length === 0 && (
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                  Popular Searches
                </div>
                {popularSearches.map((query) => (
                  <button
                    key={query}
                    onClick={() => handleRecentSearchClick(query)}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/50"
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{query}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
