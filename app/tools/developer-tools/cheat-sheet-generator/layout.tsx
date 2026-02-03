import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cheat Sheet Generator - Searchable Command Reference | Tulz.net",
  description: "Interactive cheat sheet for Git, Docker, Tailwind CSS, and more. Search commands, copy to clipboard instantly. Free developer reference tool.",
  keywords: ["cheat sheet", "git commands", "docker commands", "tailwind css", "developer reference", "command line"],
}

export default function CheatSheetGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
