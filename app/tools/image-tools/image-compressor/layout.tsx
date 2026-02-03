import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Image Compressor - Reduce Photo Size Online | Tulz.net",
  description:
    "Compress images online for free. Reduce JPG, PNG, WebP file size up to 80% without quality loss. Batch compression. Privacy-first - all processing in your browser. No signup required.",
  keywords: [
    "image compressor",
    "compress jpg",
    "reduce image size",
    "photo compressor",
    "image optimizer",
    "compress png online",
    "batch image compression",
    "compress image without losing quality online free",
    "reduce photo size for website",
    "bulk image compressor online",
    "optimize images for web",
    "image size reducer",
    "photo size reducer",
    "compress jpeg",
    "online image compressor",
    "free image compression tool",
    "reduce image file size",
    "compress pictures",
    "image file size reducer",
    "compress photos online",
    "webp compressor",
    "image compression tool",
    "optimize photos for web",
    "reduce image kb",
    "compress images for website",
    "photo optimizer",
    "image weight reducer",
    "compress multiple images",
  ],
  openGraph: {
    title: "Free Image Compressor - Reduce Photo Size Online",
    description:
      "Compress images online for free. Reduce JPG, PNG, WebP file size up to 80%. Batch compression. No quality loss.",
    type: "website",
    url: "/tools/image-tools/image-compressor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Compressor - Reduce Photo Size Online",
    description:
      "Compress images online for free. Reduce JPG, PNG, WebP file size up to 80%. Batch compression. No quality loss.",
  },
  alternates: {
    canonical: "/tools/image-tools/image-compressor",
  },
}

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
