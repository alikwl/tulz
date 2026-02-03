import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Word Counter - Character, Sentence & Paragraph Counter | Tulz.net",
  description:
    "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly. No signup required. Perfect for writers, students, and content creators. Real-time statistics as you type.",
  keywords: [
    "word counter",
    "character counter",
    "online word counter",
    "free word counter",
    "count words",
    "word counter with character limit",
    "word counter for essay",
    "real-time word counter",
    "text analyzer",
    "document statistics",
    "word frequency",
    "text metrics",
    "character count tool",
    "writing tools",
    "essay counter",
    "words",
    "characters",
    "sentences",
    "paragraphs",
    "typing",
    "writing",
    "text",
    "content",
    "document",
    "analysis",
    "text counter",
    "letter counter",
    "word count tool",
    "character counting",
    "sentence counter",
    "paragraph counter",
  ],
  openGraph: {
    title: "Free Word Counter - Character, Sentence & Paragraph Counter",
    description:
      "Count words, characters, sentences, and paragraphs instantly. No signup required. Perfect for writers and students.",
    type: "website",
    url: "/tools/text-tools/word-counter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word Counter - Character, Sentence & Paragraph Counter",
    description:
      "Count words, characters, sentences, and paragraphs instantly. No signup required. Perfect for writers and students.",
  },
  alternates: {
    canonical: "/tools/text-tools/word-counter",
  },
}

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
