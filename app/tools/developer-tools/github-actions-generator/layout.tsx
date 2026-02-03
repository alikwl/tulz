import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GitHub Actions Generator - Create CI/CD Workflows | Tulz.net",
  description: "Generate GitHub Actions workflows with an easy wizard. Step-by-step guide, multiple templates. Free workflow builder.",
  keywords: ["github actions", "ci/cd", "workflow generator", "github automation", "devops tools"],
}

export default function GitHubActionsGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
