import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grammar Checker - Check Grammar, Spelling & Punctuation | Tulz.net",
  description:
    "Free online grammar checker. Check and correct grammar, spelling, and punctuation errors instantly. Get suggestions and explanations to improve your writing.",
  keywords: [
    "grammar checker",
    "spell checker",
    "punctuation checker",
    "grammar check",
    "writing assistant",
    "proofreading tool",
    "grammar correction",
  ],
  openGraph: {
    title: "Grammar Checker - Instant Grammar & Spelling Check",
    description:
      "Check your writing for grammar, spelling, and punctuation errors. Get real-time suggestions and detailed explanations.",
    type: "website",
    url: "https://tulz.net/tools/ai-tools/grammar-checker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grammar Checker - Fix Grammar & Spelling Errors",
    description:
      "Free grammar and spell checker with real-time suggestions and detailed explanations for better writing.",
  },
  alternates: {
    canonical: "https://tulz.net/tools/ai-tools/grammar-checker",
  },
}

export default function GrammarCheckerLayout({ children }: { children: React.ReactNode }) {
  return children
}
