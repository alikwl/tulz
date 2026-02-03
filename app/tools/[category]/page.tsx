import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CategoryNewsletter } from "@/components/category-newsletter"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  Check,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Star,
} from "lucide-react"
import {
  tools,
  categories,
  categoryMetadata,
  categoryFAQs,
  getCategoryFromSlug,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools-data"

export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryFromSlug(params.category)

  if (!category) {
    notFound()
  }

  const metadata = categoryMetadata[category]
  const categoryTools = getToolsByCategory(category)
  const popularTools = categoryTools
    .filter((tool) => tool.popular)
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 5)
  const faqs = categoryFAQs[category]
  const relatedCategories = metadata.relatedCategories

  const CategoryIcon = metadata.icon

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: metadata.name,
            description: metadata.description,
            numberOfItems: categoryTools.length,
            itemListElement: categoryTools.map((tool, index) => ({
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
        <section className={`relative overflow-hidden border-b bg-gradient-to-br ${metadata.gradient} py-16 text-white`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container relative">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white/80 hover:text-white">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools" className="text-white/80 hover:text-white">
                    Tools
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{metadata.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <CategoryIcon className="h-10 w-10" />
                  </div>
                  <div>
                    <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
                      {metadata.name}
                    </h1>
                    <p className="text-lg text-white/90">{metadata.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-lg bg-white/20 px-6 py-3 backdrop-blur-sm">
                  <div className="text-3xl font-bold">{categoryTools.length}</div>
                  <div className="text-sm text-white/90">Free Tools Available</div>
                </div>
                <Link href="/tools">
                  <Button variant="secondary" className="w-full">
                    View All Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold">About {metadata.name}</h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    {metadata.longDescription}
                  </p>

                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold">Key Benefits</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {metadata.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Perfect for:</strong> {metadata.targetAudience}
                    </p>
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">All {metadata.name}</h2>
                    <Badge variant="secondary" className="text-sm">
                      {categoryTools.length} tools
                    </Badge>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {categoryTools.map((tool) => (
                      <Link key={tool.id} href={tool.href}>
                        <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${metadata.gradient} text-white shadow-md transition-transform group-hover:scale-110`}
                              >
                                <tool.icon className="h-7 w-7" />
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {tool.new && (
                                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    New
                                  </Badge>
                                )}
                                {tool.popular && (
                                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 dark:text-orange-300">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    Popular
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <CardTitle className="mt-4 line-clamp-2 text-lg">
                              {tool.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-3">
                              {tool.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4 space-y-2">
                              <div className="text-sm font-semibold text-foreground">
                                Key Features:
                              </div>
                              {tool.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mb-4 flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Check className="mr-1 h-3 w-3" />
                                Free
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Check className="mr-1 h-3 w-3" />
                                No Signup
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Check className="mr-1 h-3 w-3" />
                                Fast
                              </Badge>
                            </div>

                            {tool.usageCount && (
                              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                                <TrendingUp className="h-4 w-4" />
                                <span>{tool.usageCount.toLocaleString()} uses</span>
                              </div>
                            )}

                            <div className="flex gap-2">
                              <Button className="flex-1 group/button">
                                Use This Tool
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>

                <Separator className="my-12" />

                <div>
                  <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Navigation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((cat) => {
                        const catMeta = categoryMetadata[cat]
                        const CatIcon = catMeta.icon
                        const isActive = cat === category
                        return (
                          <Link key={cat} href={`/tools/${catMeta.slug}`}>
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              className="w-full justify-start"
                            >
                              <CatIcon className="mr-2 h-4 w-4" />
                              {cat}
                            </Button>
                          </Link>
                        )
                      })}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Most Popular</CardTitle>
                      <CardDescription>Top tools in this category</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {popularTools.map((tool, index) => (
                        <Link key={tool.id} href={tool.href}>
                          <div className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium group-hover:text-primary">
                                {tool.name}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                                {tool.usageCount?.toLocaleString()} uses
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>

                  <CategoryNewsletter gradient={metadata.gradient} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-12">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold">Related Categories</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCategories.map((cat) => {
                const catMeta = categoryMetadata[cat]
                const CatIcon = catMeta.icon
                const catTools = getToolsByCategory(cat)
                return (
                  <Link key={cat} href={`/tools/${catMeta.slug}`}>
                    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div
                          className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${catMeta.gradient} text-white shadow-lg transition-transform group-hover:scale-110`}
                        >
                          <CatIcon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-xl">{cat}</CardTitle>
                        <CardDescription>{catMeta.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {catTools.length} tools
                          </span>
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
      </main>

      <Footer />
    </div>
  )
}
