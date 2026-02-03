import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Playground - Interactive JSON Editor | Tulz.net",
  description: "Interactive JSON editor with beautify, minify, and validation. Real-time syntax highlighting. Free JSON formatter tool.",
  keywords: ["json playground", "json editor", "json beautify", "json minify", "json validator"],
}

export default function JSONPlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
