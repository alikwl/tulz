import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight, Temperature Converter | Tulz.net",
  description:
    "Free online unit converter for length, weight, temperature, area, volume, time, speed, and data size. Convert between metric and imperial units instantly. Includes conversion formulas, history, and favorites. Perfect for students, engineers, and everyday use.",
  keywords: [
    "unit converter",
    "metric converter",
    "imperial converter",
    "temperature converter",
    "length converter",
    "weight converter",
    "distance converter",
    "area converter",
    "volume converter",
    "time converter",
    "speed converter",
    "data size converter",
    "celsius to fahrenheit",
    "fahrenheit to celsius",
    "kg to lbs",
    "pounds to kg",
    "meters to feet",
    "feet to meters",
    "km to miles",
    "miles to km",
    "liters to gallons",
    "gallons to liters",
    "cm to inches",
    "inches to cm",
    "grams to ounces",
    "ounces to grams",
    "kelvin to celsius",
    "mph to kmh",
    "kmh to mph",
    "mb to gb",
    "gb to tb",
    "measurement converter",
    "conversion calculator",
    "unit calculator",
    "online converter",
    "free unit converter",
    "metric to imperial",
    "imperial to metric",
  ],
  openGraph: {
    title: "Unit Converter - Length, Weight, Temperature Converter",
    description:
      "Free online unit converter for all types of measurements. Convert between metric and imperial units with real-time results and conversion formulas.",
    type: "website",
    url: "/tools/productivity/unit-converter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converter - Length, Weight, Temperature Converter",
    description:
      "Free online unit converter for all types of measurements. Real-time conversion with formulas and history.",
  },
  alternates: {
    canonical: "/tools/productivity/unit-converter",
  },
}

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
