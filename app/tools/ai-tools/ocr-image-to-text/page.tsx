"use client"

import { useState, useRef } from "react"
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
  Upload,
  Copy,
  Trash2,
  Check,
  ScanText,
  Loader2,
  Download,
  Cpu,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function OCRImageToTextPage() {
  const [image, setImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
      setExtractedText("")
    }
    reader.readAsDataURL(file)
  }

  const processOCR = async () => {
    if (!image) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const Tesseract = (await import("tesseract.js")).default

      const worker = await Tesseract.createWorker("eng", 1, {
        logger: (m: any) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100))
          }
        },
      })

      const { data } = await worker.recognize(image)
      setExtractedText(data.text)

      await worker.terminate()

      toast({
        title: "Text extracted!",
        description: `Found ${data.text.split(/\s+/).length} words`,
      })
    } catch (error) {
      toast({
        title: "OCR failed",
        description: "Please try with a clearer image",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText)
    toast({ title: "Copied to clipboard!" })
  }

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "extracted-text.txt"
    link.click()
    URL.revokeObjectURL(url)
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setImage(null)
    setExtractedText("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast({ title: "Cleared!" })
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
                  <BreadcrumbPage>OCR Image to Text</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg flex-shrink-0">
                <ScanText className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Free Offline OCR | Extract Text from Images Locally
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Extract text from images using AI-powered OCR. All processing happens in your browser - 100% private and free.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Cpu className="mr-1 h-3 w-3" />
                    Browser-Based AI
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    100% Private
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
                  <CardTitle>Upload Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <div className="p-4 bg-muted rounded-full">
                        <Upload className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Click to upload image</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG, WEBP - Screenshots, documents, photos</p>
                      </div>
                    </label>
                  </div>

                  {image && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={processOCR}
                        disabled={isProcessing}
                        className="min-h-[44px]"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing {progress}%
                          </>
                        ) : (
                          <>
                            <ScanText className="mr-2 h-4 w-4" />
                            Extract Text
                          </>
                        )}
                      </Button>
                      <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {image && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Uploaded Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-muted rounded-lg overflow-hidden">
                      <img src={image} alt="Uploaded" className="w-full h-auto max-h-96 object-contain" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {extractedText && (
                <Card>
                  <CardHeader>
                    <CardTitle>Extracted Text</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={extractedText}
                      onChange={(e) => setExtractedText(e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={handleCopy} variant="outline" className="min-h-[44px]">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </Button>
                      <Button onClick={handleDownload} variant="outline" className="min-h-[44px]">
                        <Download className="mr-2 h-4 w-4" />
                        Download TXT
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Words: {extractedText.split(/\s+/).filter(Boolean).length} |
                      Characters: {extractedText.length}
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About OCR Image to Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Extract text from images using Tesseract.js - a powerful OCR engine that runs entirely in your browser.
                    Perfect for converting screenshots, scanned documents, and photos to editable text.
                  </p>
                  <p>
                    <strong>Use Cases:</strong> Extract text from receipts, business cards, screenshots, PDFs converted to images,
                    handwritten notes, and any printed text in photos.
                  </p>
                  <p>
                    <strong>Privacy:</strong> All processing happens locally in your browser. Your images never leave your computer.
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
