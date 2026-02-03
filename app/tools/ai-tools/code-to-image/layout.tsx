import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Code to Image Generator | Beautiful Syntax Snapshots | Tulz.net",
  description: "Create beautiful images of code snippets for social media. Free code screenshot generator with syntax highlighting and multiple themes.",
  keywords: ["code to image", "code screenshot", "syntax highlighting", "carbon alternative", "code snapshot", "share code"],
}

export default function CodeToImageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
