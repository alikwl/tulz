import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Voice Typing Tool | Instant Browser Transcription | Tulz.net",
  description: "Convert speech to text instantly using browser AI. Free voice typing with real-time transcription. No uploads, 100% private.",
  keywords: ["voice to text", "speech to text", "voice typing", "dictation", "transcription", "speech recognition"],
}

export default function VoiceToTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
