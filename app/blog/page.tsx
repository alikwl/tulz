import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
} from "lucide-react"
import { getAllPosts, getFeaturedPosts, getAllCategories } from "@/lib/mdx"
import { FeaturedCarousel } from "@/components/blog/featured-carousel"
import { BlogContent } from "@/components/blog/blog-content"

export const metadata = {
  title: "Blog | Tulz.net - Tips, Guides & Tutorials",
  description: "Free online tools tips, guides, and tutorials to boost your productivity",
  openGraph: {
    title: "Tulz.net Blog",
    description: "Tips, guides, and tutorials for online tools and productivity",
    images: ["/og-blog.png"],
  },
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = getAllCategories()

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Tulz.net Blog",
            description: "Tips, guides, and tutorials for online tools and productivity",
            url: "https://tulz.net/blog",
            publisher: {
              "@type": "Organization",
              name: "Tulz.net",
              logo: {
                "@type": "ImageObject",
                url: "https://tulz.net/logo.png",
              },
            },
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 py-12 sm:py-16 lg:py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                <Sparkles className="mr-1 h-3 w-3" />
                Blog
              </Badge>
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Tulz.net Blog
              </h1>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-muted-foreground">
                Tips, guides, and tutorials to help you work smarter with our free online tools
              </p>
            </div>
          </div>
        </section>

        <section className="border-b py-8 sm:py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-6 sm:mb-8 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">Featured Posts</h2>
            </div>

            <FeaturedCarousel posts={featuredPosts.map(post => ({
              slug: post.slug,
              title: post.title,
              excerpt: post.description,
              category: post.category,
              author: post.author,
              authorAvatar: post.authorAvatar,
              date: post.date,
              readTime: post.readTime,
              coverImage: post.coverImage,
            }))} />
          </div>
        </section>

        <BlogContent
          initialPosts={allPosts}
          categories={categories}
        />
      </main>

      <Footer />
    </div>
  )
}
