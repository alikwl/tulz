import { Metadata } from "next"

export const metadata: Metadata = {
  title: "YouTube Thumbnail A/B Test Previewer | Tulz.net",
  description: "Predict which thumbnail gets more views. Preview thumbnails in YouTube UI before uploading.",
  keywords: ["youtube thumbnail", "thumbnail tester", "ab test thumbnail", "youtube preview", "thumbnail compare"],
}

export default function ThumbnailPreviewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
