import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image to Text OCR - Extract Text from Images | Tulz.net",
  description: "Extract text from images instantly with free OCR. Copy text from photos, PDFs, and screenshots.",
  keywords: ["ocr", "image to text", "extract text", "photo to text", "text recognition"],
}

export default function ImageToTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
