"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
  Search,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_TEXT = `Hello World! Hello everyone. hello world.
Welcome to the hello world tutorial.
This is a sample text for find and replace.`

export default function FindReplacePage() {
  const [inputText, setInputText] = useState("")
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [replaceCount, setReplaceCount] = useState(0)
  const { toast } = useToast()

  const handleFindReplace = () => {
    if (!findText) {
      toast({ title: "Error", description: "Please enter text to find", variant: "destructive" })
      return
    }

    let result = inputText
    let count = 0

    if (caseSensitive) {
      count = (inputText.match(new RegExp(escapeRegex(findText), "g")) || []).length
      result = inputText.replace(new RegExp(escapeRegex(findText), "g"), replaceText)
    } else {
      count = (inputText.match(new RegExp(escapeRegex(findText), "gi")) || []).length
      result = inputText.replace(new RegExp(escapeRegex(findText), "gi"), replaceText)
    }

    setOutputText(result)
    setReplaceCount(count)
    toast({ title: "Replaced", description: `Found and replaced ${count} occurrence(s)` })
  }

  const escapeRegex = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
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
    a.download = "replaced-text.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setInputText("")
    setFindText("")
    setReplaceText("")
    setOutputText("")
    setReplaceCount(0)
    toast({ title: "Cleared!" })
  }

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT)
    setFindText("hello")
    setReplaceText("hi")
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
                  <BreadcrumbPage>Find and Replace</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg flex-shrink-0">
                <Search className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Find and Replace Text Online
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Find and replace words or phrases in your text. Case-sensitive and case-insensitive options available.
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
                    placeholder="Enter or paste your text..."
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

              <Card className="my-6">
                <CardHeader>
                  <CardTitle>Find and Replace Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="find-text">Find</Label>
                      <Input
                        id="find-text"
                        placeholder="Text to find..."
                        value={findText}
                        onChange={(e) => setFindText(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="replace-text">Replace With</Label>
                      <Input
                        id="replace-text"
                        placeholder="Replacement text..."
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="case-sensitive"
                      checked={caseSensitive}
                      onCheckedChange={setCaseSensitive}
                    />
                    <Label htmlFor="case-sensitive" className="cursor-pointer">
                      Case sensitive
                    </Label>
                  </div>
                  <Button onClick={handleFindReplace} className="w-full sm:w-auto min-h-[48px]">
                    <Search className="mr-2 h-4 w-4" />
                    Find and Replace
                  </Button>
                  {replaceCount > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Found and replaced {replaceCount} occurrence(s)
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Result will appear here..."
                    value={outputText}
                    readOnly
                    className="min-h-[200px] resize-none text-sm sm:text-base bg-muted/30"
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
                  <CardTitle>About Find and Replace</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Find and replace text quickly and easily. This tool allows you to search for specific words or phrases and replace them with new text.
                  </p>
                  <p>
                    <strong>Features:</strong> Case-sensitive or case-insensitive search, replace all occurrences at once, and see how many replacements were made.
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
