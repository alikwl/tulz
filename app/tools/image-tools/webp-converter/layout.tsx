import { Metadata } from "next"

export const metadata: Metadata = {
  title: "WebP Converter - Reduce Image Size by 90% | Tulz.net",
  description: "Convert images to WebP format for 90% smaller file size. Free image compressor for faster websites and better SEO.",
  keywords: ["webp converter", "image compression", "convert to webp", "reduce file size", "optimize images"],
}

export default function WebPConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
