"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Clock,
  Calendar,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowRight,
  Mail,
} from "lucide-react"
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data"
import { useToast } from "@/hooks/use-toast"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const post = getBlogPost(resolvedParams.slug)
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Link copied!",
        description: "Article URL copied to clipboard",
      })
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter",
    })
    setEmail("")
  }

  const contentSections = post.content.split("\n## ").filter(Boolean)
  const tableOfContents = contentSections
    .map((section) => {
      const firstLine = section.split("\n")[0]
      if (firstLine && !firstLine.startsWith("#")) {
        return firstLine.replace(/^#+ /, "")
      }
      return null
    })
    .filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.publishedAt,
            author: {
              "@type": "Person",
              name: post.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: "Tulz.net",
              logo: {
                "@type": "ImageObject",
                url: "https://tulz.net/logo.png",
              },
            },
            keywords: post.keywords.join(", "),
          }),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-6 sm:py-8">
          <div className="container px-4 sm:px-6 lg:px-8">
            <Breadcrumb className="mb-4 sm:mb-6">
              <BreadcrumbList className="text-xs sm:text-sm">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-auto max-w-4xl">
              <Badge className="mb-4 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                {post.category}
              </Badge>
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="mb-6 text-base sm:text-lg md:text-xl text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-foreground">{post.author.name}</div>
                    <div className="text-xs">{new Date(post.publishedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="aspect-[21/9] bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />

        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <div className="mx-auto max-w-3xl">
                  <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                      className="min-h-[44px]"
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                      className="min-h-[44px]"
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Tweet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("linkedin")}
                      className="min-h-[44px]"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("copy")}
                      className="min-h-[44px]"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>

                  <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
                    {post.content.split("\n").map((line, index) => {
                      if (line.startsWith("# ")) {
                        return (
                          <h1 key={index} className="text-3xl sm:text-4xl font-bold mt-0 mb-6">
                            {line.replace("# ", "")}
                          </h1>
                        )
                      } else if (line.startsWith("## ")) {
                        return (
                          <h2 key={index} className="text-2xl sm:text-3xl font-bold mt-12 mb-4">
                            {line.replace("## ", "")}
                          </h2>
                        )
                      } else if (line.startsWith("### ")) {
                        return (
                          <h3 key={index} className="text-xl sm:text-2xl font-bold mt-8 mb-3">
                            {line.replace("### ", "")}
                          </h3>
                        )
                      } else if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <p key={index} className="font-bold text-lg mt-4 mb-2">
                            {line.replace(/\*\*/g, "")}
                          </p>
                        )
                      } else if (line.startsWith("- ") || line.startsWith("* ")) {
                        return (
                          <li key={index} className="ml-6 list-disc">
                            {line.replace(/^[*-] /, "")}
                          </li>
                        )
                      } else if (line.startsWith("```")) {
                        return (
                          <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                            <code>{line.replace(/```/g, "")}</code>
                          </pre>
                        )
                      } else if (line.trim() === "") {
                        return <br key={index} />
                      } else {
                        return (
                          <p key={index} className="text-base leading-relaxed mb-4">
                            {line}
                          </p>
                        )
                      }
                    })}
                  </article>

                  <Separator className="my-8 sm:my-12" />

                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-8 sm:my-12" />

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Get More Tips Like This</CardTitle>
                      <CardDescription>
                        Subscribe to our newsletter for weekly productivity tips and tool tutorials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 sm:h-12 flex-1"
                        />
                        <Button type="submit" size="lg" className="min-h-[44px] sm:min-h-[48px]">
                          <Mail className="mr-2 h-4 w-4" />
                          Subscribe
                        </Button>
                      </form>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Join 10,000+ subscribers. No spam, unsubscribe anytime.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Table of Contents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tableOfContents.slice(0, 8).map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading?.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                        >
                          {heading}
                        </a>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Share This Article</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start min-h-[44px]"
                        onClick={() => handleShare("facebook")}
                      >
                        <Facebook className="mr-2 h-4 w-4" />
                        Share on Facebook
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start min-h-[44px]"
                        onClick={() => handleShare("twitter")}
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Share on Twitter
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start min-h-[44px]"
                        onClick={() => handleShare("linkedin")}
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        Share on LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start min-h-[44px]"
                        onClick={() => handleShare("copy")}
                      >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="border-t bg-muted/30 py-12 sm:py-16 lg:py-20">
            <div className="container px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="group h-full overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl active:scale-95">
                      <div
                        className="aspect-video bg-cover bg-center"
                        style={{ backgroundImage: `url(${relatedPost.image})` }}
                      />
                      <CardHeader>
                        <Badge className="mb-2 w-fit bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                          {relatedPost.category}
                        </Badge>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{relatedPost.readTime}</span>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-primary font-medium">
                          Read Article
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
