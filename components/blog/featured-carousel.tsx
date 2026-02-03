"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight, Clock, User, Sparkles } from "lucide-react"

interface FeaturedPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorAvatar?: string
  date: string
  readTime: string
  coverImage: string
}

interface FeaturedCarouselProps {
  posts: FeaturedPost[]
}

export function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  if (posts.length === 0) return null

  return (
    <div className="relative">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem key={post.slug} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/blog/${post.category}/${post.slug}`}>
                <Card className="group h-full overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl active:scale-95">
                  <div
                    className="aspect-video bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 text-xs">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Read Article
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-12" />
        <CarouselNext className="right-0 translate-x-12" />
      </Carousel>
    </div>
  )
}
