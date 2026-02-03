import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Case Converter - Change Letter Case Online | Tulz.net",
  description: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more. Free online text case converter tool with no signup required.",
  keywords: ["case converter", "text converter", "uppercase", "lowercase", "title case", "sentence case", "text tool"],
}

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
