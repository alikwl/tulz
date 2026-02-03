import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Offline OCR | Extract Text from Images Locally | Tulz.net",
  description: "Extract text from images using free AI-powered OCR. Works offline in your browser with 100% privacy. Convert screenshots and documents to text instantly.",
  keywords: ["ocr", "image to text", "text extraction", "free ocr", "offline ocr", "tesseract", "screenshot to text"],
}

export default function OCRImageToTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
