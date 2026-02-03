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
  Link2,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const SAMPLE_ENCODED = `https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den`
const SAMPLE_DECODED = `https://example.com/search?q=hello world&lang=en`

export default function URLEncoderDecoderPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const { toast } = useToast()

  const handleEncode = () => {
    try {
      const result = encodeURIComponent(inputText)
      setOutputText(result)
      toast({ title: "URL encoded successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to encode URL", variant: "destructive" })
    }
  }

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(inputText)
      setOutputText(result)
      toast({ title: "URL decoded successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Invalid URL encoding", variant: "destructive" })
    }
  }

  const handleEncodeURI = () => {
    try {
      const result = encodeURI(inputText)
      setOutputText(result)
      toast({ title: "URI encoded (preserves special chars)" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to encode URI", variant: "destructive" })
    }
  }

  const handleDecodeURI = () => {
    try {
      const result = decodeURI(inputText)
      setOutputText(result)
      toast({ title: "URI decoded successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Invalid URI encoding", variant: "destructive" })
    }
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
    a.download = "url-result.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    toast({ title: "Cleared!" })
  }

  const handleLoadEncoded = () => {
    setInputText(SAMPLE_ENCODED)
    toast({ title: "Sample encoded URL loaded" })
  }

  const handleLoadDecoded = () => {
    setInputText(SAMPLE_DECODED)
    toast({ title: "Sample decoded URL loaded" })
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
                  <BreadcrumbPage>URL Encoder/Decoder</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg flex-shrink-0">
                <Link2 className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  URL Encoder/Decoder - Convert URL Strings
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Encode or decode URLs and URI components. Convert special characters to URL-safe format.
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
                  <CardTitle>Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter URL or text to encode/decode..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[150px] resize-none text-sm sm:text-base font-mono"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleLoadDecoded} variant="outline" size="sm" className="min-h-[40px]">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Sample URL
                    </Button>
                    <Button onClick={handleLoadEncoded} variant="outline" size="sm" className="min-h-[40px]">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Sample Encoded
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
                  <Button onClick={handleEncode} className="min-h-[48px]">
                    Encode
                  </Button>
                  <Button onClick={handleDecode} className="min-h-[48px]">
                    Decode
                  </Button>
                  <Button onClick={handleEncodeURI} className="min-h-[48px]">
                    Encode URI
                  </Button>
                  <Button onClick={handleDecodeURI} className="min-h-[48px]">
                    Decode URI
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Result will appear here..."
                    value={outputText}
                    readOnly
                    className="min-h-[150px] resize-none text-sm sm:text-base bg-muted/30 font-mono"
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
                  <CardTitle>About URL Encoder/Decoder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Convert text and URLs to URL-safe format or decode URL-encoded strings back to readable text.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Encode:</strong> Converts all special characters (encodeURIComponent)</li>
                    <li><strong>Decode:</strong> Converts encoded text back to original (decodeURIComponent)</li>
                    <li><strong>Encode URI:</strong> Encodes full URI, preserves / and : (encodeURI)</li>
                    <li><strong>Decode URI:</strong> Decodes full URI (decodeURI)</li>
                  </ul>
                  <p className="text-sm">
                    <strong>Use Case:</strong> Perfect for encoding query parameters, creating shareable URLs, or decoding URLs received from external sources.
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
