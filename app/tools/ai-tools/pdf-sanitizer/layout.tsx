import { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF Metadata Remover | Sanitize Your Documents Free | Tulz.net",
  description: "Remove all metadata from PDF files including author, dates, and GPS data. Free PDF sanitizer for privacy protection.",
  keywords: ["pdf metadata remover", "pdf sanitizer", "remove pdf metadata", "clean pdf", "pdf privacy"],
}

export default function PDFSanitizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
