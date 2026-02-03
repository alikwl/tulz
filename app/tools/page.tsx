"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowRight } from "lucide-react"
import {
  tools,
  categories,
  categoryMetadata,
  getCategorySlug,
  getToolsByCategory,
} from "@/lib/tools-data"
import { useToolSearch } from "@/hooks/use-tool-search"
import { ToolSearchBar } from "@/components/tool-search-bar"
import { ToolFilterPanel, MobileFilterButton } from "@/components/tool-filter-panel"
import { ToolSearchResults } from "@/components/tool-search-results"

export default function ToolsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isSearching,
    selectedCategories,
    toggleCategory,
    sortBy,
    setSortBy,
    selectedFeatures,
    toggleFeature,
    filteredTools,
    totalResults,
    searchSuggestions,
    recentSearches,
    saveToRecentSearches,
    clearRecentSearches,
    clearAllFilters,
    activeFiltersCount,
  } = useToolSearch()

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      saveToRecentSearches(query)
    }
  }

  const showCategoryBrowse = !debouncedQuery && selectedCategories.length === 0

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Free Online Tools",
            description: "Free online tools for developers, designers, and creators",
            numberOfItems: tools.length,
            itemListElement: tools.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareApplication",
                name: tool.name,
                description: tool.description,
                applicationCategory: tool.category,
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
            })),
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12">
          <div className="container">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tools</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mb-8 text-center">
              <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">
                All Free Online Tools
              </h1>
              <p className="text-lg text-muted-foreground">
                Professional AI-powered tools for developers, designers, and creators
              </p>
            </div>

            {/* Search Bar */}
            <div className="mx-auto max-w-3xl">
              <ToolSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
                suggestions={searchSuggestions}
                recentSearches={recentSearches}
                onClearRecent={clearRecentSearches}
                isSearching={isSearching}
                placeholder="Search tools by name, category, or feature..."
              />
            </div>

            {/* Mobile Filter Button */}
            <div className="mt-4 lg:hidden">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <MobileFilterButton activeFiltersCount={activeFiltersCount} onClick={() => setMobileFiltersOpen(true)} />
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-96 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                    <ToolFilterPanel
                      selectedCategories={selectedCategories}
                      onToggleCategory={toggleCategory}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      selectedFeatures={selectedFeatures}
                      onToggleFeature={toggleFeature}
                      onClearAll={() => {
                        clearAllFilters()
                        setMobileFiltersOpen(false)
                      }}
                      activeFiltersCount={activeFiltersCount}
                      className="border-0"
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </section>

        {/* Category Browse Section */}
        {showCategoryBrowse && (
          <section className="border-b bg-muted/20 py-12">
            <div className="container">
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-3xl font-bold">Browse by Category</h2>
                <p className="text-muted-foreground">
                  Explore our organized collection of professional tools
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const meta = categoryMetadata[category]
                  const CategoryIcon = meta.icon
                  const toolCount = getToolsByCategory(category).length
                  return (
                    <Link key={category} href={`/tools/${getCategorySlug(category)}`}>
                      <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <CardHeader>
                          <div
                            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-lg transition-transform group-hover:scale-110`}
                          >
                            <CategoryIcon className="h-8 w-8" />
                          </div>
                          <CardTitle className="text-xl">{category}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {meta.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{toolCount} tools</Badge>
                            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Main Content Section with Filters and Results */}
        <section className="py-12">
          <div className="container">
            <div className="flex gap-8">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-4">
                  <ToolFilterPanel
                    selectedCategories={selectedCategories}
                    onToggleCategory={toggleCategory}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    selectedFeatures={selectedFeatures}
                    onToggleFeature={toggleFeature}
                    onClearAll={clearAllFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>
              </aside>

              {/* Results */}
              <div className="flex-1 min-w-0">
                <ToolSearchResults
                  tools={filteredTools}
                  searchQuery={debouncedQuery}
                  isSearching={isSearching}
                  activeFilters={{
                    categories: selectedCategories,
                    sort: sortBy,
                    features: selectedFeatures,
                  }}
                  onRemoveCategory={toggleCategory}
                  onRemoveFeature={toggleFeature}
                  onClearSearch={() => setSearchQuery("")}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
