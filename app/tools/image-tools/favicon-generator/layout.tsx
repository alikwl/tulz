import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Favicon Generator - Generate All Website Icons in 1-Click | Tulz.net",
  description: "Generate favicon.ico, Apple Touch Icon, and all website icons instantly from one image.",
  keywords: ["favicon generator", "icon generator", "apple touch icon", "website icons", "favicon creator"],
}

export default function FaviconGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
