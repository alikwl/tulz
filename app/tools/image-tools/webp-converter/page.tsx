"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
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
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WebPConverterPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [quality, setQuality] = useState([90])
  const [originalSize, setOriginalSize] = useState(0)
  const [convertedSize, setConvertedSize] = useState(0)
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

    setOriginalSize(file.size)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setConvertedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const convertToWebP = () => {
    if (!originalImage) return

    const img = new Image()
    img.src = originalImage

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const webpData = canvas.toDataURL("image/webp", quality[0] / 100)
        setConvertedImage(webpData)

        const base64Length = webpData.length - `data:image/webp;base64,`.length
        const sizeInBytes = (base64Length * 3) / 4
        setConvertedSize(sizeInBytes)

        toast({ title: "Converted to WebP!", description: "Image optimized successfully" })
      }
    }
  }

  const handleDownload = () => {
    if (!convertedImage) return

    const link = document.createElement("a")
    link.href = convertedImage
    link.download = "optimized-image.webp"
    link.click()
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setOriginalImage(null)
    setConvertedImage(null)
    setOriginalSize(0)
    setConvertedSize(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast({ title: "Cleared!" })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const savingsPercent = originalSize > 0 && convertedSize > 0
    ? Math.round(((originalSize - convertedSize) / originalSize) * 100)
    : 0

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
                  <BreadcrumbPage>WebP Converter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg flex-shrink-0">
                <Zap className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Reduce Image Size by 90% Without Losing Quality
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Convert images to WebP format for faster loading websites. Perfect for improving PageSpeed scores.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Up to 90% Smaller
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
                  <CardTitle>Upload & Convert</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                        <p className="text-sm text-muted-foreground">PNG, JPG, GIF</p>
                      </div>
                    </label>
                  </div>

                  {originalImage && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label>Quality: {quality[0]}%</Label>
                          <Slider
                            value={quality}
                            onValueChange={setQuality}
                            min={10}
                            max={100}
                            step={5}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button onClick={convertToWebP} className="min-h-[44px]">
                          <Zap className="mr-2 h-4 w-4" />
                          Convert to WebP
                        </Button>
                        {convertedImage && (
                          <Button onClick={handleDownload} variant="outline" className="min-h-[44px]">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}
                        <Button onClick={handleClear} variant="outline" className="min-h-[44px]">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {convertedImage && (
                <Card>
                  <CardHeader>
                    <CardTitle>Compression Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Original</div>
                        <div className="text-2xl font-bold">{formatSize(originalSize)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Compressed</div>
                        <div className="text-2xl font-bold text-green-600">{formatSize(convertedSize)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Saved</div>
                        <div className="text-2xl font-bold text-green-600">{savingsPercent}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About WebP Converter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Convert images to WebP format to dramatically reduce file size while maintaining quality. WebP is a modern image format that provides superior compression.
                  </p>
                  <p>
                    <strong>Benefits:</strong> Faster website loading, improved SEO, better Google PageSpeed scores, and reduced bandwidth costs.
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
