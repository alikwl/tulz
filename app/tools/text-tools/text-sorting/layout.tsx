import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Sorting Tool - Sort Lines Alphabetically | Tulz.net",
  description: "Sort text lines alphabetically (A-Z or Z-A), by length, or shuffle randomly. Free online text sorting tool.",
  keywords: ["text sorter", "sort alphabetically", "sort lines", "alphabetize text", "shuffle text"],
}

export default function TextSortingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
