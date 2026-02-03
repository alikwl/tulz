import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Launch Checklist - SEO, Performance & Security | Tulz.net",
  description: "Complete pre-launch checklist for websites. Check SEO, performance, security readiness. Generate PDF reports. Free website launch tool.",
  keywords: ["website launch", "launch checklist", "seo checklist", "website readiness", "pre-launch audit"],
}

export default function WebsiteLaunchChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
