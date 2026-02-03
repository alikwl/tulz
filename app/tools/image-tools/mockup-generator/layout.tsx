import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Screenshot to SaaS Mockup Generator | Tulz.net",
  description: "Turn screenshots into professional marketing assets. Add browser frames and MacBook mockups instantly.",
  keywords: ["mockup generator", "screenshot mockup", "browser frame", "marketing assets", "product mockup"],
}

export default function MockupGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
