import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEO Meta Tag Generator - Create Optimized Meta Tags | Tulz.net",
  description: "Generate SEO meta tags for Google, Facebook, and Twitter. Social media previews, copy HTML code. Free SEO tool.",
  keywords: ["seo meta tags", "meta tag generator", "open graph", "twitter cards", "seo tool"],
}

export default function SEOMetaGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
