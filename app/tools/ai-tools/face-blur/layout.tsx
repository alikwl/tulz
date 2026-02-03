import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automatic Face Blur Tool | Protect Privacy in Photos | Tulz.net",
  description: "Automatically detect and blur faces in photos using browser-based AI. Perfect for privacy protection.",
  keywords: ["face blur", "blur faces", "privacy protection", "face detection", "photo privacy"],
}

export default function FaceBlurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
