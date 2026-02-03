"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  FileText,
  Wrench,
  ArrowRight,
  X,
} from "lucide-react"
import { useSearch } from "@/lib/search-provider"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const { search, addRecentSearch, recentSearches } = useSearch()

  const results = searchQuery.trim() ? search(searchQuery) : []

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      addRecentSearch(query)
    }
  }, [query, addRecentSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery)
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const blogResults = results.filter(r => r.type === "blog")
  const toolResults = results.filter(r => r.type === "tool")

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            name: `Search Results for "${searchQuery}"`,
            url: `https://tulz.net/search?q=${encodeURIComponent(searchQuery)}`,
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8 sm:py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl sm:text-4xl font-bold">Search Results</h1>

            <form onSubmit={handleSearch} className="mx-auto max-w-3xl">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Search tools, blog posts, and more..."
                    className="h-14 pl-12 pr-12 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <Button type="submit" size="lg" className="h-14 px-8">
                  Search
                </Button>
              </div>
            </form>

            {searchQuery && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            )}
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {!searchQuery ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Start Searching</CardTitle>
                      <CardDescription>
                        Search through our collection of 50+ tools and blog articles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-lg border p-3">
                          <Wrench className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium">Tools</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border p-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-medium">Blog Posts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {recentSearches.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Searches</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((recent, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => setSearchQuery(recent)}
                              className="min-h-[36px]"
                            >
                              {recent}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : results.length === 0 ? (
                <Card className="p-12 text-center">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No results found</h2>
                  <p className="text-muted-foreground mb-4">
                    Try different keywords or check your spelling
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </Card>
              ) : (
                <div className="space-y-8">
                  {toolResults.length > 0 && (
                    <article>
                      <div className="mb-4 flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-green-500" />
                        <h2 className="text-xl font-bold">Tools ({toolResults.length})</h2>
                      </div>
                      <ul className="space-y-4">
                        {toolResults.map((item) => (
                          <li key={item.id}>
                            <Link href={item.url}>
                              <Card className="group transition-all hover:shadow-lg active:scale-[0.99]">
                                <CardHeader>
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {item.title}
                                      </CardTitle>
                                      <CardDescription className="mt-2">
                                        {item.description}
                                      </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="capitalize">
                                      {item.category}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex items-center text-sm text-primary font-medium">
                                    Try this tool
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )}

                  {blogResults.length > 0 && (
                    <article>
                      <div className="mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h2 className="text-xl font-bold">Blog Posts ({blogResults.length})</h2>
                      </div>
                      <ul className="space-y-4">
                        {blogResults.map((item) => (
                          <li key={item.id}>
                            <Link href={item.url}>
                              <Card className="group transition-all hover:shadow-lg active:scale-[0.99]">
                                <CardHeader>
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {item.title}
                                      </CardTitle>
                                      <CardDescription className="mt-2">
                                        {item.description}
                                      </CardDescription>
                                      {item.author && item.date && (
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                          <span>{item.author}</span>
                                          <span>•</span>
                                          <span>{new Date(item.date).toLocaleDateString()}</span>
                                        </div>
                                      )}
                                    </div>
                                    <Badge variant="secondary" className="capitalize">
                                      {item.category}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="flex items-center text-sm text-primary font-medium">
                                    Read article
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </article>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
