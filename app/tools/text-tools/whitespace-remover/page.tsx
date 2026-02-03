"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Copy,
  Download,
  Trash2,
  Check,
  Space,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_TEXT = `   This    text    has    extra    spaces

  And   extra     line    breaks   too!

     Trim me!    `

export default function WhitespaceRemoverPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const { toast } = useToast()

  const handleRemoveAll = () => {
    const result = inputText.replace(/\s+/g, "")
    setOutputText(result)
    toast({ title: "All whitespace removed" })
  }

  const handleRemoveExtra = () => {
    const result = inputText.replace(/\s+/g, " ").trim()
    setOutputText(result)
    toast({ title: "Extra whitespace removed" })
  }

  const handleTrimOnly = () => {
    const result = inputText.trim()
    setOutputText(result)
    toast({ title: "Trimmed leading and trailing spaces" })
  }

  const handleNormalize = () => {
    const result = inputText
      .split("\n")
      .map(line => line.trim().replace(/\s+/g, " "))
      .filter(line => line.length > 0)
      .join("\n")
    setOutputText(result)
    toast({ title: "Text normalized" })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
    toast({ title: "Copied!" })
  }

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cleaned-text.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    toast({ title: "Cleared!" })
  }

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT)
    toast({ title: "Sample loaded" })
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
                  <BreadcrumbPage>Whitespace Remover</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg flex-shrink-0">
                <Space className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Whitespace Remover - Clean Extra Spaces
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Remove extra spaces, tabs, and line breaks. Clean and normalize your text formatting.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Free
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste text with extra whitespace..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px] resize-none text-sm sm:text-base font-mono"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 w-full">
                  <Button onClick={handleRemoveExtra} className="min-h-[48px]">
                    Remove Extra
                  </Button>
                  <Button onClick={handleTrimOnly} className="min-h-[48px]">
                    Trim Only
                  </Button>
                  <Button onClick={handleNormalize} className="min-h-[48px]">
                    Normalize
                  </Button>
                  <Button onClick={handleRemoveAll} className="min-h-[48px]">
                    Remove All
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cleaned Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Cleaned text will appear here..."
                    value={outputText}
                    readOnly
                    className="min-h-[200px] resize-none text-sm sm:text-base bg-muted/30 font-mono"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleCopy} variant="outline" size="sm" disabled={!outputText} className="min-h-[40px]">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
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
                  <CardTitle>About Whitespace Remover</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Clean up text by removing unwanted whitespace characters including extra spaces, tabs, and line breaks.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Remove Extra:</strong> Removes extra spaces but keeps single spaces between words</li>
                    <li><strong>Trim Only:</strong> Removes spaces from beginning and end only</li>
                    <li><strong>Normalize:</strong> Cleans each line and removes empty lines</li>
                    <li><strong>Remove All:</strong> Removes all whitespace characters</li>
                  </ul>
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
