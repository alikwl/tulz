"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Type,
  Copy,
  Download,
  Trash2,
  Check,
  CaseSensitive,
  ArrowRight,
  Sparkles,
  Calendar,
  Star,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_TEXT = `this is a sample text that you can use to test the case converter. it has multiple sentences. you can convert it to UPPERCASE, lowercase, Title Case, Sentence case, or Capitalize Each Word.`

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const { toast } = useToast()

  const handleUppercase = () => {
    const result = inputText.toUpperCase()
    setOutputText(result)
    toast({ title: "Converted to UPPERCASE" })
  }

  const handleLowercase = () => {
    const result = inputText.toLowerCase()
    setOutputText(result)
    toast({ title: "Converted to lowercase" })
  }

  const handleTitleCase = () => {
    const result = inputText
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    setOutputText(result)
    toast({ title: "Converted to Title Case" })
  }

  const handleSentenceCase = () => {
    const result = inputText
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase())
    setOutputText(result)
    toast({ title: "Converted to Sentence case" })
  }

  const handleCapitalizeEach = () => {
    const result = inputText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
    setOutputText(result)
    toast({ title: "Capitalized Each Word" })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
    toast({ title: "Copied!", description: "Text copied to clipboard" })
  }

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted-text.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!", description: "Text saved as TXT file" })
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    toast({ title: "Cleared!", description: "All text has been cleared" })
  }

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT)
    toast({ title: "Sample loaded", description: "Try the conversion buttons!" })
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
                  <BreadcrumbLink href="/tools/text-tools">Text Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Case Converter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg flex-shrink-0">
                <CaseSensitive className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Text Case Converter - Change Letter Case Online
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more. Fast and free case converter tool.
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-xs sm:text-sm font-semibold">4.9/5</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Updated Jan 2024</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Free
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    No Signup
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Input Text</CardTitle>
                  <CardDescription>Enter or paste your text below</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type or paste your text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px] resize-none text-sm sm:text-base"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleLoadSample} variant="outline" size="sm" className="min-h-[40px]">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Load Sample
                    </Button>
                    <Button onClick={handleClear} variant="outline" size="sm" className="min-h-[40px]">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="my-6 flex flex-col items-center gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 w-full">
                  <Button onClick={handleUppercase} className="min-h-[48px]">
                    UPPERCASE
                  </Button>
                  <Button onClick={handleLowercase} className="min-h-[48px]">
                    lowercase
                  </Button>
                  <Button onClick={handleTitleCase} className="min-h-[48px]">
                    Title Case
                  </Button>
                  <Button onClick={handleSentenceCase} className="min-h-[48px]">
                    Sentence case
                  </Button>
                  <Button onClick={handleCapitalizeEach} className="min-h-[48px] col-span-2 sm:col-span-3 lg:col-span-1">
                    Capitalize Each
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Converted Text</CardTitle>
                  <CardDescription>Your converted text will appear here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Converted text will appear here..."
                    value={outputText}
                    readOnly
                    className="min-h-[200px] resize-none text-sm sm:text-base bg-muted/30"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleCopy} variant="outline" size="sm" disabled={!outputText} className="min-h-[40px]">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Text
                    </Button>
                    <Button onClick={handleDownload} variant="outline" size="sm" disabled={!outputText} className="min-h-[40px]">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>About Text Case Converter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Our Text Case Converter is a free online tool that allows you to change the case of any text. Whether you need to convert text to uppercase, lowercase, title case, sentence case, or capitalize each word, this tool makes it easy and fast.
                  </p>
                  <p>
                    <strong>Use Cases:</strong> Perfect for formatting titles, correcting text from caps lock, preparing content for social media, formatting code, and standardizing text for documents.
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
