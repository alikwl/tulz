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
  Scissors,
  Sparkles,
  Image as ImageIcon,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BackgroundRemoverPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
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
      setOriginalImage(event.target?.result as string)
      setProcessedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const processImage = async () => {
    if (!originalImage) return

    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const img = new Image()
      img.src = originalImage

      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")

        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            const brightness = (r + g + b) / 3
            if (brightness > 200 || (Math.abs(r - g) < 30 && Math.abs(g - b) < 30)) {
              data[i + 3] = 0
            }
          }

          ctx.putImageData(imageData, 0, 0)
          setProcessedImage(canvas.toDataURL("image/png"))
          toast({ title: "Background removed!", description: "Basic removal applied" })
        }
      }
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "removed-background.png"
    link.click()
    toast({ title: "Downloaded!", description: "Image saved successfully" })
  }

  const handleClear = () => {
    setOriginalImage(null)
    setProcessedImage(null)
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
                  <BreadcrumbLink href="/tools/image-tools">Image Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Background Remover</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg flex-shrink-0">
                <Scissors className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Remove Background in 1-Click (HD & Free)
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Remove backgrounds from images instantly. Perfect for product photos, portraits, and professional images.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Free & HD Quality
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Instant Processing
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
                        <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    </label>
                  </div>

                  {originalImage && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={processImage}
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
                            <Scissors className="mr-2 h-4 w-4" />
                            Remove Background
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

              {(originalImage || processedImage) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {originalImage && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Original</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.03)_10px,rgba(0,0,0,.03)_20px)] rounded-lg overflow-hidden">
                          <img src={originalImage} alt="Original" className="w-full h-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {processedImage && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Background Removed</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="relative bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.03)_10px,rgba(0,0,0,.03)_20px)] rounded-lg overflow-hidden">
                          <img src={processedImage} alt="Processed" className="w-full h-auto" />
                        </div>
                        <Button onClick={handleDownload} className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download PNG
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About Background Remover</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Remove backgrounds from your images instantly. Perfect for creating product photos, profile pictures, and marketing materials.
                  </p>
                  <p>
                    <strong>Use Cases:</strong> E-commerce product photos, professional headshots, social media content, presentations, and design projects.
                  </p>
                  <p className="text-sm">
                    <strong>Note:</strong> This is a browser-based tool. For best results with complex images, consider using specialized AI background removal services.
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
