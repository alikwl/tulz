import { MetadataRoute } from "next"
import { tools, categories, getCategorySlug } from "@/lib/tools-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tulz.net"
  const currentDate = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/tools/${getCategorySlug(category)}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Include ALL tool pages
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: tool.popular ? 0.9 : 0.7,
  }))

  return [...routes, ...categoryRoutes, ...toolRoutes]
}
