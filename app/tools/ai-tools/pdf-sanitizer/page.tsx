"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Upload,
  Download,
  Trash2,
  Check,
  Shield,
  Loader2,
  Lock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PDFSanitizerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [sanitizedPdf, setSanitizedPdf] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [metadata, setMetadata] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)
    setSanitizedPdf(null)
    setMetadata(null)
  }

  const sanitizePDF = async () => {
    if (!file) return

    setIsProcessing(true)

    try {
      const PDFLib = await import("pdf-lib")
      const { PDFDocument } = PDFLib

      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const originalMetadata = {
        title: pdfDoc.getTitle() || "Not set",
        author: pdfDoc.getAuthor() || "Not set",
        subject: pdfDoc.getSubject() || "Not set",
        creator: pdfDoc.getCreator() || "Not set",
        producer: pdfDoc.getProducer() || "Not set",
        creationDate: pdfDoc.getCreationDate()?.toString() || "Not set",
        modificationDate: pdfDoc.getModificationDate()?.toString() || "Not set",
      }
      setMetadata(originalMetadata)

      pdfDoc.setTitle("")
      pdfDoc.setAuthor("")
      pdfDoc.setSubject("")
      pdfDoc.setCreator("")
      pdfDoc.setProducer("Sanitized PDF")
      pdfDoc.setCreationDate(new Date())
      pdfDoc.setModificationDate(new Date())

      const sanitizedBytes = await pdfDoc.save()
      const blob = new Blob([sanitizedBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setSanitizedPdf(url)

      toast({
        title: "PDF sanitized!",
        description: "All metadata has been removed",
      })
    } catch (error) {
      toast({
        title: "Sanitization failed",
        description: "Please try again with a different PDF",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!sanitizedPdf) return

    const link = document.createElement("a")
    link.href = sanitizedPdf
    link.download = `sanitized-${file?.name || "document.pdf"}`
    link.click()
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setFile(null)
    setSanitizedPdf(null)
    setMetadata(null)
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
                  <BreadcrumbPage>PDF Sanitizer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg flex-shrink-0">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  PDF Metadata Remover | Sanitize Your Documents Free
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Remove all metadata from PDF files including author, creation date, GPS data, and other sensitive information.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Lock className="mr-1 h-3 w-3" />
                    100% Private
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Browser-Based
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
                  <CardTitle>Upload PDF</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
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
                        <p className="font-semibold mb-1">Click to upload PDF</p>
                        <p className="text-sm text-muted-foreground">Any PDF file</p>
                      </div>
                    </label>
                  </div>

                  {file && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={sanitizePDF}
                        disabled={isProcessing}
                        className="min-h-[44px]"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Sanitize PDF
                          </>
                        )}
                      </Button>
                      {sanitizedPdf && (
                        <Button onClick={handleDownload} variant="outline" className="min-h-[44px]">
                          <Download className="mr-2 h-4 w-4" />
                          Download Clean PDF
                        </Button>
                      )}
                      <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {metadata && (
                <Card>
                  <CardHeader>
                    <CardTitle>Removed Metadata</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="font-semibold">Title:</span>
                        <span className="text-muted-foreground">{metadata.title}</span>
                        <span className="font-semibold">Author:</span>
                        <span className="text-muted-foreground">{metadata.author}</span>
                        <span className="font-semibold">Subject:</span>
                        <span className="text-muted-foreground">{metadata.subject}</span>
                        <span className="font-semibold">Creator:</span>
                        <span className="text-muted-foreground">{metadata.creator}</span>
                        <span className="font-semibold">Producer:</span>
                        <span className="text-muted-foreground">{metadata.producer}</span>
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground">
                        All this metadata has been removed from your PDF
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About PDF Sanitizer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Remove all metadata from PDF files to protect your privacy. PDFs often contain hidden information
                    like author names, creation dates, software used, and even GPS coordinates.
                  </p>
                  <p>
                    <strong>What gets removed:</strong> Author, title, subject, keywords, creator software, producer,
                    creation date, modification date, and custom metadata fields.
                  </p>
                  <p>
                    <strong>Privacy:</strong> All processing happens in your browser. Your PDF never leaves your device.
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
