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
  ArrowUpDown,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_TEXT = `Zebra
Apple
Mango
Banana
Orange
Grape
Cherry`

export default function TextSortingPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const { toast } = useToast()

  const handleSortAZ = () => {
    const lines = inputText.split("\n").filter(line => line.trim() !== "")
    const sorted = lines.sort((a, b) => a.localeCompare(b))
    setOutputText(sorted.join("\n"))
    toast({ title: "Sorted A-Z" })
  }

  const handleSortZA = () => {
    const lines = inputText.split("\n").filter(line => line.trim() !== "")
    const sorted = lines.sort((a, b) => b.localeCompare(a))
    setOutputText(sorted.join("\n"))
    toast({ title: "Sorted Z-A" })
  }

  const handleSortLength = () => {
    const lines = inputText.split("\n").filter(line => line.trim() !== "")
    const sorted = lines.sort((a, b) => a.length - b.length)
    setOutputText(sorted.join("\n"))
    toast({ title: "Sorted by length (shortest first)" })
  }

  const handleSortRandom = () => {
    const lines = inputText.split("\n").filter(line => line.trim() !== "")
    const shuffled = lines.sort(() => Math.random() - 0.5)
    setOutputText(shuffled.join("\n"))
    toast({ title: "Shuffled randomly" })
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
    a.download = "sorted-text.txt"
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
                  <BreadcrumbPage>Text Sorting</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg flex-shrink-0">
                <ArrowUpDown className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Text Sorting Tool - Sort Lines Alphabetically
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Sort text lines alphabetically (A-Z or Z-A), by length, or randomly shuffle them.
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
                  <CardTitle>Input Lines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter lines to sort (one per line)..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[250px] resize-none text-sm sm:text-base font-mono"
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
                  <Button onClick={handleSortAZ} className="min-h-[48px]">
                    Sort A-Z
                  </Button>
                  <Button onClick={handleSortZA} className="min-h-[48px]">
                    Sort Z-A
                  </Button>
                  <Button onClick={handleSortLength} className="min-h-[48px]">
                    By Length
                  </Button>
                  <Button onClick={handleSortRandom} className="min-h-[48px]">
                    Shuffle
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sorted Lines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Sorted lines will appear here..."
                    value={outputText}
                    readOnly
                    className="min-h-[250px] resize-none text-sm sm:text-base bg-muted/30 font-mono"
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
                  <CardTitle>About Text Sorting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Sort text lines in various ways. Perfect for organizing lists, sorting data, or randomizing entries.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>A-Z:</strong> Sort alphabetically from A to Z</li>
                    <li><strong>Z-A:</strong> Sort in reverse alphabetical order</li>
                    <li><strong>By Length:</strong> Sort by line length (shortest first)</li>
                    <li><strong>Shuffle:</strong> Randomly shuffle all lines</li>
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
