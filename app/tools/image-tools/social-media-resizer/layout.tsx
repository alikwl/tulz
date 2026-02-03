import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Media Image Resizer - One Image, Every Size | Tulz.net",
  description: "Resize images for all social media platforms instantly. Generate Instagram, Facebook, Twitter, LinkedIn, YouTube sizes from one upload.",
  keywords: ["social media resizer", "image resizer", "instagram size", "facebook size", "bulk image resize"],
}

export default function SocialMediaResizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
