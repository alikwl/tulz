import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SVG Icon Colorizer - Change Any Icon Color | Tulz.net",
  description: "Instantly change SVG icon colors without Illustrator. Perfect for designers and developers.",
  keywords: ["svg colorizer", "change icon color", "svg editor", "icon color", "svg tool"],
}

export default function SVGColorizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
