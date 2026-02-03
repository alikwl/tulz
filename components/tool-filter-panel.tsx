"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { categories, ToolCategory, getCategoryIcon } from "@/lib/tools-data"
import { SortOption } from "@/hooks/use-tool-search"
import {
  ArrowUpDown,
  Star,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  selectedCategories: ToolCategory[]
  onToggleCategory: (category: ToolCategory) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  selectedFeatures: string[]
  onToggleFeature: (feature: string) => void
  onClearAll: () => void
  activeFiltersCount: number
  className?: string
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "most-used", label: "Most Used" },
  { value: "newest", label: "Newest First" },
  { value: "a-z", label: "A-Z" },
  { value: "z-a", label: "Z-A" },
]

const featureOptions = [
  { value: "popular", label: "Popular Tools", icon: Star },
  { value: "new", label: "New Tools", icon: Sparkles },
]

export function ToolFilterPanel({
  selectedCategories,
  onToggleCategory,
  sortBy,
  onSortChange,
  selectedFeatures,
  onToggleFeature,
  onClearAll,
  activeFiltersCount,
  className,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    sort: true,
    features: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-auto py-1 text-xs"
            >
              Clear All
            </Button>
          )}
        </div>

        <Separator className="mb-4" />

        <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <button
                onClick={() => toggleSection("categories")}
                className="flex w-full items-center justify-between mb-3 text-sm font-semibold"
              >
                <span>Categories</span>
                {expandedSections.categories ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.categories && (
                <div className="space-y-3">
                  {categories.map((category) => {
                    const Icon = getCategoryIcon(category)
                    const isSelected = selectedCategories.includes(category)
                    return (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={isSelected}
                          onCheckedChange={() => onToggleCategory(category)}
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="flex flex-1 items-center gap-2 text-sm font-normal cursor-pointer"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span>{category}</span>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <Separator />

            {/* Sort Options */}
            <div>
              <button
                onClick={() => toggleSection("sort")}
                className="flex w-full items-center justify-between mb-3 text-sm font-semibold"
              >
                <span>Sort By</span>
                {expandedSections.sort ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.sort && (
                <RadioGroup value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                  <div className="space-y-3">
                    {sortOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                        <Label
                          htmlFor={`sort-${option.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}
            </div>

            <Separator />

            {/* Feature Filters */}
            <div>
              <button
                onClick={() => toggleSection("features")}
                className="flex w-full items-center justify-between mb-3 text-sm font-semibold"
              >
                <span>Features</span>
                {expandedSections.features ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {expandedSections.features && (
                <div className="space-y-3">
                  {featureOptions.map((option) => {
                    const Icon = option.icon
                    const isSelected = selectedFeatures.includes(option.value)
                    return (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${option.value}`}
                          checked={isSelected}
                          onCheckedChange={() => onToggleFeature(option.value)}
                        />
                        <Label
                          htmlFor={`feature-${option.value}`}
                          className="flex flex-1 items-center gap-2 text-sm font-normal cursor-pointer"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span>{option.label}</span>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <p className="font-medium mb-1">All tools are:</p>
              <ul className="space-y-0.5 ml-4">
                <li>• 100% Free to use</li>
                <li>• No sign-up required</li>
                <li>• Work in your browser</li>
                <li>• Privacy-focused</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>
    </Card>
  )
}

// Mobile Filter Sheet Component
export function MobileFilterButton({
  activeFiltersCount,
  onClick,
}: {
  activeFiltersCount: number
  onClick: () => void
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative w-full sm:w-auto"
    >
      <ArrowUpDown className="mr-2 h-4 w-4" />
      Filters
      {activeFiltersCount > 0 && (
        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {activeFiltersCount}
        </span>
      )}
    </Button>
  )
}
