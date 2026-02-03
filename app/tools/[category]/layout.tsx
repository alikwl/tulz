import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  categories,
  categoryMetadata,
  getCategoryFromSlug,
  getCategorySlug,
  getToolsByCategory,
} from "@/lib/tools-data"

interface CategoryLayoutProps {
  params: {
    category: string
  }
  children: React.ReactNode
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const category = getCategoryFromSlug(params.category)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }
  }

  const metadata = categoryMetadata[category]
  const toolCount = getToolsByCategory(category).length

  const title = `${metadata.name} - Free Online Tools | Tulz.net`
  const description = `${metadata.description}. Access ${toolCount} free ${metadata.name.toLowerCase()} including ${metadata.keywords.slice(0, 3).join(", ")}. No signup required.`

  return {
    title,
    description,
    keywords: [
      ...metadata.keywords,
      ...metadata.lsiKeywords,
      "free tools",
      "no signup",
      "online tools",
      `free ${metadata.name.toLowerCase()}`,
      `online ${metadata.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/tools/${params.category}`,
    },
  }
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return <>{children}</>
}
