import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Color Picker - HTML Color Codes, RGB, HEX Picker Tool | Tulz.net",
  description:
    "Advanced color picker with HEX, RGB, HSL, HSV, and CMYK support. Generate color palettes, check WCAG contrast ratios, pick colors from images, and create CSS gradients. Free online color tool with palette generator, accessibility checker, and gradient creator. Perfect for web designers and developers.",
  keywords: [
    "color picker",
    "hex color picker",
    "rgb color picker",
    "color palette generator",
    "color wheel",
    "hsl color picker",
    "hsv color picker",
    "cmyk color converter",
    "color code generator",
    "html color picker",
    "css color picker",
    "web color picker",
    "color scheme generator",
    "color harmony",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "color contrast checker",
    "wcag contrast",
    "accessibility color",
    "color accessibility checker",
    "gradient generator",
    "css gradient",
    "image color picker",
    "eyedropper tool",
    "color extractor",
    "palette from image",
    "color shades",
    "color tints",
    "color tones",
    "monochromatic palette",
    "color psychology",
    "color theory",
    "design colors",
    "brand colors",
    "web design colors",
    "online color tool",
    "free color picker",
  ],
  openGraph: {
    title: "Color Picker - HTML Color Codes, RGB, HEX Picker Tool",
    description:
      "Professional color picker with palette generator, WCAG contrast checker, and gradient creator. Support for HEX, RGB, HSL, HSV, CMYK formats.",
    type: "website",
    url: "/tools/productivity/color-picker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker - HTML Color Codes, RGB, HEX Picker Tool",
    description:
      "Professional color picker with palette generator, WCAG contrast checker, and gradient creator. Free online color tool.",
  },
  alternates: {
    canonical: "/tools/productivity/color-picker",
  },
}

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
