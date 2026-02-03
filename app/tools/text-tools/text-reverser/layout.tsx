import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Reverser - Reverse Text, Words & Lines | Tulz.net",
  description: "Reverse text online. Flip text backwards, reverse word order, or reverse lines instantly with this free tool.",
  keywords: ["text reverser", "reverse text", "flip text", "backwards text", "mirror text"],
}

export default function TextReverserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
