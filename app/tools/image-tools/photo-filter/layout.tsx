import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Glitch & Retrowave Photo Filter - Viral Cyberpunk Look | Tulz.net",
  description: "Give your photos the viral cyberpunk look. Apply glitch, VHS, and retrowave filters instantly.",
  keywords: ["photo filter", "glitch effect", "retrowave", "cyberpunk filter", "vhs filter", "aesthetic filter"],
}

export default function PhotoFilterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
