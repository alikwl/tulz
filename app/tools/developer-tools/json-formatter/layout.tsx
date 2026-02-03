import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator - Beautify, Minify & Validate JSON | Tulz.net",
  description:
    "Free online JSON formatter tool. Format, validate, beautify, and minify JSON data instantly. Supports large files, tree view, and error highlighting. No signup required. Perfect for developers and API testing.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "format json online",
    "json parser",
    "json pretty print",
    "free online json formatter and validator",
    "json formatter with error highlighting",
    "beautify json code online",
    "json syntax checker",
    "validate json",
    "json tree view",
    "json editor",
    "online json tool",
    "json lint",
    "json viewer",
    "json compiler",
    "json checker",
    "minify json",
    "compress json",
    "json formatting tool",
    "json validation tool",
    "api response formatter",
    "json file validator",
    "json data formatter",
    "json converter",
    "json organizer",
  ],
  openGraph: {
    title: "Free JSON Formatter & Validator - Beautify, Minify & Validate JSON",
    description:
      "Format, validate, beautify, and minify JSON data instantly. Supports large files. No signup required.",
    type: "website",
    url: "/tools/developer-tools/json-formatter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Formatter & Validator - Beautify, Minify & Validate JSON",
    description:
      "Format, validate, beautify, and minify JSON data instantly. Supports large files. No signup required.",
  },
  alternates: {
    canonical: "/tools/developer-tools/json-formatter",
  },
}

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
