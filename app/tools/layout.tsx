import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Online Tools - AI & Productivity Tools | Tulz.net",
  description:
    "Access free online tools for developers, designers, and creators. No signup required. AI tools, JSON formatter, image compressor, and more.",
  keywords: [
    "free online tools",
    "developer tools",
    "AI tools",
    "productivity tools",
    "online utilities",
    "JSON formatter",
    "image compressor",
    "text tools",
    "grammar checker",
    "AI humanizer",
  ],
  openGraph: {
    title: "Free Online Tools - AI & Productivity Tools | Tulz.net",
    description:
      "Access free online tools for developers, designers, and creators. AI-powered tools, formatters, and more. No signup required.",
    type: "website",
  },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
