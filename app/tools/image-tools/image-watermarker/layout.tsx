import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bulk Image Watermarker - Protect 100 Photos in 5 Seconds | Tulz.net",
  description: "Add watermarks to multiple images instantly. Protect your photos with text or logo watermarks in bulk.",
  keywords: ["image watermarker", "bulk watermark", "photo protection", "watermark tool", "batch watermark"],
}

export default function ImageWatermarkerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
