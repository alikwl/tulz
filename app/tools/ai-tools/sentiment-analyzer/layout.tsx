import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Sentiment Analysis | Free Local Text Analyzer | Tulz.net",
  description: "Analyze text sentiment using browser-based AI. Detect emotions, tone, and sentiment in text with complete privacy.",
  keywords: ["sentiment analysis", "emotion detection", "text analysis", "ai sentiment", "tone analyzer"],
}

export default function SentimentAnalyzerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
