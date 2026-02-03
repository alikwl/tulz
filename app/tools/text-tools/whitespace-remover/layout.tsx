import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Whitespace Remover - Remove Extra Spaces Online | Tulz.net",
  description: "Remove extra spaces, tabs, and whitespace from text. Clean and normalize text formatting instantly.",
  keywords: ["whitespace remover", "remove spaces", "trim text", "clean text", "normalize text"],
}

export default function WhitespaceRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
