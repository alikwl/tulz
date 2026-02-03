import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - Online Base64 Tool | Tulz.net",
  description:
    "Free online Base64 encoder and decoder tool. Encode text and files to Base64, decode Base64 strings. Support for images with instant preview, multiple character encodings, and URL-safe format. 100% client-side processing, no file size limits.",
  keywords: [
    "base64 encode",
    "base64 decode",
    "base64 converter",
    "encode to base64",
    "decode from base64",
    "image to base64",
    "base64 to image",
    "base64 encoder online",
    "base64 decoder online",
    "base64 tool",
    "file to base64",
    "base64 image encoder",
    "online base64 converter",
    "base64 encoding tool",
    "base64 decoding tool",
    "url safe base64",
    "base64 file encoder",
    "convert image to base64",
    "base64 string decoder",
    "free base64 tool",
    "base64 data uri",
    "encode file to base64",
    "decode base64 string",
    "base64 converter free",
    "online base64 encoder",
    "base64 image converter",
    "text to base64",
    "base64 to text",
  ],
  openGraph: {
    title: "Base64 Encoder/Decoder - Online Base64 Tool",
    description:
      "Free online Base64 encoder and decoder. Encode text and files to Base64, decode Base64 strings with image preview support.",
    type: "website",
    url: "/tools/developer-tools/base64-encoder-decoder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder/Decoder - Online Base64 Tool",
    description:
      "Free online Base64 encoder and decoder. Encode text and files to Base64, decode Base64 strings with image preview support.",
  },
  alternates: {
    canonical: "/tools/developer-tools/base64-encoder-decoder",
  },
}

export default function Base64ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
