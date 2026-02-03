import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find and Replace Text Online - Free Text Tool | Tulz.net",
  description: "Find and replace words or phrases in text. Case-sensitive and case-insensitive options available. Free online find and replace tool.",
  keywords: ["find and replace", "text search", "replace text", "bulk replace", "text editor"],
}

export default function FindReplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
