import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface BlogPostFrontmatter {
  title: string
  description: string
  date: string
  author: string
  authorAvatar?: string
  category: string
  coverImage: string
  featured?: boolean
  keywords: string[]
  slug?: string
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string
  content: string
  readTime: string
  excerpt: string
}

export function getAllCategories() {
  const categories = ["tutorials", "tips", "news", "guides"]
  return categories
}

export function getPostsByCategory(category: string): BlogPost[] {
  const categoryPath = path.join(postsDirectory, category)

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const fileNames = fs.readdirSync(categoryPath).filter(file => file.endsWith(".mdx"))

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(categoryPath, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug,
      content,
      readTime: stats.text,
      excerpt: data.description || content.slice(0, 160),
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || "Tulz Team",
      authorAvatar: data.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=tulz",
      category: data.category || category,
      coverImage: data.coverImage,
      featured: data.featured || false,
      keywords: data.keywords || [],
    } as BlogPost
  })

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export function getAllPosts(): BlogPost[] {
  const categories = getAllCategories()
  const allPosts: BlogPost[] = []

  categories.forEach(category => {
    const posts = getPostsByCategory(category)
    allPosts.push(...posts)
  })

  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export function getPostBySlug(category: string, slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, category, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const stats = readingTime(content)

    return {
      slug,
      content,
      readTime: stats.text,
      excerpt: data.description || content.slice(0, 160),
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || "Tulz Team",
      authorAvatar: data.authorAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=tulz",
      category: data.category || category,
      coverImage: data.coverImage,
      featured: data.featured || false,
      keywords: data.keywords || [],
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured).slice(0, 3)
}

export function getRelatedPosts(currentCategory: string, currentSlug: string, limit = 3): BlogPost[] {
  const categoryPosts = getPostsByCategory(currentCategory)
  return categoryPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
}

export function getPopularPosts(limit = 5): BlogPost[] {
  return getAllPosts().slice(0, limit)
}
