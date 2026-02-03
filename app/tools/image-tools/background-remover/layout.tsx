import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Remove Background in 1-Click (HD & Free) | Tulz.net",
  description: "Remove backgrounds from images instantly. Free background remover for product photos, portraits, and professional images. No signup required.",
  keywords: ["background remover", "remove background", "transparent background", "bg remover", "cut out image"],
}

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
