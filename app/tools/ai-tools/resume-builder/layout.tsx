import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Resume Builder - Create Professional ATS-Friendly Resumes | Tulz.net",
  description:
    "Create professional, ATS-friendly resumes with AI-powered suggestions. Free resume builder with multiple templates and optimization tips. Build your perfect resume in minutes.",
  keywords: [
    "resume builder",
    "AI resume",
    "ATS resume",
    "CV builder",
    "professional resume",
    "resume maker",
    "free resume builder",
  ],
  openGraph: {
    title: "AI Resume Builder - Create Professional Resumes",
    description:
      "Build ATS-friendly resumes with AI optimization. Multiple templates, instant preview, and expert suggestions.",
    type: "website",
    url: "https://tulz.net/tools/ai-tools/resume-builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resume Builder - Professional ATS-Friendly Resumes",
    description:
      "Free AI-powered resume builder with multiple templates and optimization suggestions for better job applications.",
  },
  alternates: {
    canonical: "https://tulz.net/tools/ai-tools/resume-builder",
  },
}

export default function ResumeBuilderLayout({ children }: { children: React.ReactNode }) {
  return children
}
