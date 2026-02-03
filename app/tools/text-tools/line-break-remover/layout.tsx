import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Line Break Remover - Clean Up Text Format | Tulz.net",
  description: "Remove or reduce line breaks from text online. Clean up text copied from PDFs, emails, and documents with excess line breaks.",
  keywords: ["line break remover", "text formatter", "remove line breaks", "clean text", "text tool"],
}

export default function LineBreakRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
