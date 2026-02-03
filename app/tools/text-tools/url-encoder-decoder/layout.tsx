import { Metadata } from "next"

export const metadata: Metadata = {
  title: "URL Encoder/Decoder - Convert URL Strings Online | Tulz.net",
  description: "Encode or decode URLs and URI components. Convert special characters to URL-safe format instantly.",
  keywords: ["url encoder", "url decoder", "uri encoder", "encode url", "decode url", "percent encoding"],
}

export default function URLEncoderDecoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
