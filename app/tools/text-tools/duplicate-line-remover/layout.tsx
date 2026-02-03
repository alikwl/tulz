import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Duplicate Line Remover - Remove Duplicate Lines | Tulz.net",
  description: "Remove duplicate lines from text online. Keep only unique lines with case-sensitive or case-insensitive options.",
  keywords: ["duplicate remover", "unique lines", "remove duplicates", "text deduplication", "list cleaner"],
}

export default function DuplicateLineRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
