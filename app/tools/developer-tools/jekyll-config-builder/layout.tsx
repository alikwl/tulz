import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jekyll Config Builder - Create _config.yml Files | Tulz.net",
  description: "Build Jekyll _config.yml files with an interactive form. Live preview, instant download. Free Jekyll configuration generator.",
  keywords: ["jekyll config", "_config.yml", "jekyll builder", "static site generator", "jekyll setup"],
}

export default function JekyllConfigBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
