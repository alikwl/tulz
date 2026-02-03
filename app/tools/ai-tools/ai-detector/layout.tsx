import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Content Detector - Detect AI-Generated Text | Tulz.net",
  description:
    "Detect whether text was written by AI or humans. Our AI detector analyzes content patterns to identify ChatGPT, GPT-4, and other AI-generated text. Free and accurate.",
  keywords: [
    "ai detector",
    "ai content detector",
    "chatgpt detector",
    "detect ai writing",
    "ai generated text detector",
    "ai checker",
    "content authenticity",
  ],
  openGraph: {
    title: "AI Content Detector - Check if Text is AI-Generated",
    description:
      "Detect AI-generated content with high accuracy. Identify text from ChatGPT, GPT-4, and other AI models instantly.",
    type: "website",
    url: "https://tulz.net/tools/ai-tools/ai-detector",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Detector - Detect AI-Generated Text",
    description:
      "Free AI detector to identify ChatGPT and AI-generated content with detailed analysis and confidence scores.",
  },
  alternates: {
    canonical: "https://tulz.net/tools/ai-tools/ai-detector",
  },
}

export default function AIDetectorLayout({ children }: { children: React.ReactNode }) {
  return children
}
