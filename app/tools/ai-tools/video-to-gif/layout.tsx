import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Video to GIF Converter | Browser-Based FFmpeg | Tulz.net",
  description: "Convert videos to GIFs using FFmpeg in your browser. No uploads, completely free and private video to GIF conversion.",
  keywords: ["video to gif", "convert video to gif", "ffmpeg browser", "free gif converter", "video converter"],
}

export default function VideoToGIFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
