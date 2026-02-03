import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Smart Paraphraser - Rewrite Text While Keeping Meaning | Tulz.net",
  description:
    "Paraphrase and rewrite text while maintaining original meaning. Multiple paraphrasing modes for essays, articles, and content. Free online paraphrasing tool.",
  keywords: [
    "paraphraser",
    "paraphrasing tool",
    "rewrite text",
    "rephrase",
    "article rewriter",
    "sentence rephraser",
    "plagiarism-free",
  ],
  openGraph: {
    title: "Smart Paraphraser - Rewrite Text Intelligently",
    description:
      "Paraphrase and rewrite any text while preserving meaning. Multiple styles available for academic, creative, and professional writing.",
    type: "website",
    url: "https://tulz.net/tools/ai-tools/paraphraser",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Paraphraser - Intelligent Text Rewriting",
    description:
      "Free online paraphrasing tool with multiple modes. Rewrite text while maintaining original meaning and context.",
  },
  alternates: {
    canonical: "https://tulz.net/tools/ai-tools/paraphraser",
  },
}

export default function ParaphraserLayout({ children }: { children: React.ReactNode }) {
  return children
}
