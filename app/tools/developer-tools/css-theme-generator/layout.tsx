import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CSS Theme Generator - Build Custom Themes with Live Preview | Tulz.net",
  description: "Create custom CSS themes with color pickers and live preview. Generate CSS variables, share themes. Free CSS builder.",
  keywords: ["css theme", "theme generator", "css variables", "color scheme", "theme builder"],
}

export default function CSSThemeGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
