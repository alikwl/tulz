import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Text Humanizer - Convert AI Text to Natural Human Writing | Tulz.net",
  description:
    "Transform AI-generated text into natural, human-like content. Our AI humanizer makes your text sound more authentic, engaging, and bypass AI detectors. Free online tool.",
  keywords: [
    "ai humanizer",
    "ai text humanizer",
    "humanize ai text",
    "make ai text human",
    "bypass ai detection",
    "ai to human converter",
    "natural text generator",
  ],
  openGraph: {
    title: "AI Text Humanizer - Make AI Text Sound Human",
    description:
      "Convert AI-generated content into natural, human-like text. Free AI humanizer tool with multiple tones and styles.",
    type: "website",
    url: "https://tulz.net/tools/ai-tools/ai-humanizer",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Text Humanizer - Convert AI Text to Human Writing",
    description:
      "Transform AI-generated text into natural, human-like content with our free AI humanizer tool.",
  },
  alternates: {
    canonical: "https://tulz.net/tools/ai-tools/ai-humanizer",
  },
}

export default function AIHumanizerLayout({ children }: { children: React.ReactNode }) {
  return children
}
