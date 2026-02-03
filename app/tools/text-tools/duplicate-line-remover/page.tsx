"use client"

import { useState } from "react"
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
  Copy,
  Download,
  Trash2,
  Check,
  List,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_TEXT = `apple
banana
apple
orange
banana
grape
apple
orange
mango`

export default function DuplicateLineRemoverPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 })
  const { toast } = useToast()

  const handleRemoveDuplicates = (caseSensitive: boolean) => {
    const lines = inputText.split("\n")
    const seen = new Set<string>()
    const unique: string[] = []

    lines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(key) && line.trim() !== "") {
        seen.add(key)
        unique.push(line)
      }
    })

    setOutputText(unique.join("\n"))
    setStats({
      original: lines.filter(l => l.trim() !== "").length,
      unique: unique.length,
      removed: lines.filter(l => l.trim() !== "").length - unique.length
    })
    toast({ title: "Duplicates removed", description: `Removed ${lines.filter(l => l.trim() !== "").length - unique.length} duplicate lines` })
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
    a.download = "unique-lines.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    setStats({ original: 0, unique: 0, removed: 0 })
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
                  <BreadcrumbPage>Duplicate Line Remover</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg flex-shrink-0">
                <List className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Duplicate Line Remover - Keep Only Unique Lines
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Remove duplicate lines from text and keep only unique entries. Perfect for cleaning lists and data.
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
                  <CardDescription>Enter each line on a new line</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter lines here (one per line)..."
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-md">
                  <Button onClick={() => handleRemoveDuplicates(true)} className="min-h-[48px]">
                    Remove (Case Sensitive)
                  </Button>
                  <Button onClick={() => handleRemoveDuplicates(false)} className="min-h-[48px]">
                    Remove (Ignore Case)
                  </Button>
                </div>
              </div>

              {stats.original > 0 && (
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{stats.original}</div>
                        <div className="text-sm text-muted-foreground">Original Lines</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{stats.unique}</div>
                        <div className="text-sm text-muted-foreground">Unique Lines</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{stats.removed}</div>
                        <div className="text-sm text-muted-foreground">Duplicates Removed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Unique Lines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Unique lines will appear here..."
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
                  <CardTitle>About Duplicate Line Remover</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Remove duplicate lines from your text lists quickly and easily. This tool is perfect for cleaning up email lists, removing duplicate entries from data, or deduplicating any line-based text.
                  </p>
                  <p>
                    <strong>Options:</strong> Choose between case-sensitive (Apple ≠ apple) or case-insensitive (Apple = apple) duplicate removal based on your needs.
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
