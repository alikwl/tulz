import type { Metadata } from "next"

export const metadata: Metadata = {
  title: ".gitignore Generator - Create Gitignore Files | Tulz.net",
  description: "Generate .gitignore files for Node.js, Python, macOS, Windows. Security warnings, custom rules. Free gitignore builder.",
  keywords: ["gitignore generator", "git ignore", "gitignore file", "git templates", "version control"],
}

export default function GitignoreGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
