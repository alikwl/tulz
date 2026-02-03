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
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/tools/${getCategorySlug(category)}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const implementedTools = [
    "/tools/developer-tools/json-formatter",
    "/tools/developer-tools/base64-encoder-decoder",
    "/tools/image-tools/image-compressor",
    "/tools/text-tools/word-counter",
    "/tools/productivity/color-picker",
    "/tools/productivity/unit-converter",
  ]

  const toolRoutes: MetadataRoute.Sitemap = implementedTools.map((toolPath) => ({
    url: `${baseUrl}${toolPath}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...categoryRoutes, ...toolRoutes]
}
