import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "README Generator - Create Professional GitHub READMEs | Tulz.net",
  description: "Generate professional README.md files for GitHub projects. Live preview, badges, markdown export. Free README builder.",
  keywords: ["readme generator", "github readme", "markdown generator", "readme builder", "project documentation"],
}

export default function READMEGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
