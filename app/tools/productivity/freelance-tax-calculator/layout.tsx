import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Freelance Tax Calculator - Estimate Self-Employment Taxes | Tulz.net",
  description: "Calculate estimated taxes for freelancers and self-employed. Visual breakdown, expense tracking. Free tax estimator tool.",
  keywords: ["freelance tax", "self-employment tax", "tax calculator", "freelancer tools", "tax estimator"],
}

export default function FreelanceTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
