"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Mic,
  MicOff,
  Copy,
  Download,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function VoiceToTextPage() {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (!SpeechRecognition) {
        setIsSupported(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + " "
          } else {
            interimTranscript += transcriptPiece
          }
        }

        setTranscript((prev) => prev + finalTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
        toast({
          title: "Recognition error",
          description: "Please check microphone permissions",
          variant: "destructive",
        })
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [toast])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
      setIsListening(true)
      toast({ title: "Listening..." })
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      toast({ title: "Stopped listening" })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript)
    toast({ title: "Copied to clipboard!" })
  }

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `transcript-${Date.now()}.txt`
    link.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setTranscript("")
    toast({ title: "Cleared!" })
  }

  if (!isSupported) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Not Supported
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b bg-muted/30 py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb className="mb-4 sm:mb-6">
              <BreadcrumbList className="text-xs sm:text-sm">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="hidden sm:block">
                  <BreadcrumbLink href="/tools/ai-tools">AI Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Voice to Text</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg flex-shrink-0">
                <Mic className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Free Voice Typing Tool | Instant Browser Transcription
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Convert speech to text instantly using your browser's built-in AI. No servers, 100% private and free.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    100% Private
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Mic className="mr-1 h-3 w-3" />
                    Real-time
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Voice Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center gap-4 py-8">
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      size="lg"
                      className={`h-24 w-24 rounded-full ${
                        isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="h-12 w-12" />
                      ) : (
                        <Mic className="h-12 w-12" />
                      )}
                    </Button>
                    <p className="text-sm font-medium">
                      {isListening ? "Click to stop recording" : "Click to start recording"}
                    </p>
                    {isListening && (
                      <Badge variant="destructive" className="animate-pulse">
                        Recording...
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button onClick={handleCopy} variant="outline" disabled={!transcript} className="min-h-[44px]">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Text
                    </Button>
                    <Button onClick={handleDownload} variant="outline" disabled={!transcript} className="min-h-[44px]">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button onClick={handleClear} variant="outline" disabled={!transcript} className="min-h-[44px]">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={12}
                    placeholder="Your transcribed text will appear here..."
                    className="text-sm"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Words: {transcript.split(/\s+/).filter(Boolean).length} |
                    Characters: {transcript.length}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Voice to Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Convert speech to text using your browser's built-in Web Speech API. Perfect for dictation,
                    note-taking, transcription, and accessibility.
                  </p>
                  <p>
                    <strong>Use Cases:</strong> Meeting notes, article drafting, accessibility support, quick note-taking,
                    transcription, and hands-free typing.
                  </p>
                  <p>
                    <strong>Privacy:</strong> All processing happens in your browser using built-in capabilities.
                    Your voice never leaves your device.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
