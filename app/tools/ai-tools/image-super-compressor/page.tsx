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
  Loader2,
  Cpu,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ImageSuperCompressorPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [quality, setQuality] = useState([80])
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalFile, setOriginalFile] = useState<File | null>(null)
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

    setOriginalFile(file)
    setOriginalSize(file.size)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setCompressedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const compressImage = async () => {
    if (!originalFile) return

    setIsProcessing(true)

    try {
      const imageCompression = (await import("browser-image-compression")).default

      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        quality: quality[0] / 100,
      }

      const compressedFile = await imageCompression(originalFile, options)
      setCompressedSize(compressedFile.size)

      const reader = new FileReader()
      reader.onload = (e) => {
        setCompressedImage(e.target?.result as string)
        const savingsPercent = Math.round(((originalSize - compressedFile.size) / originalSize) * 100)
        toast({
          title: "Compressed!",
          description: `Reduced size by ${savingsPercent}%`,
        })
      }
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      toast({
        title: "Compression failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedImage) return

    const link = document.createElement("a")
    link.href = compressedImage
    link.download = `compressed-${Date.now()}.jpg`
    link.click()
    toast({ title: "Downloaded!" })
  }

  const handleClear = () => {
    setOriginalImage(null)
    setCompressedImage(null)
    setOriginalFile(null)
    setOriginalSize(0)
    setCompressedSize(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast({ title: "Cleared!" })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const savingsPercent = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
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
                  <BreadcrumbLink href="/tools/ai-tools">AI Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Image Super Compressor</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg flex-shrink-0">
                <Zap className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  Ultra Image Compressor | Shrink Files 90% without Quality Loss
                </h1>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                  Compress images dramatically using advanced browser-based AI. Reduce file sizes by up to 90% while maintaining quality.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
                    <Cpu className="mr-1 h-3 w-3" />
                    Browser AI
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs">
                    <Check className="mr-1 h-3 w-3" />
                    Private & Free
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
                  <CardTitle>Upload & Compress</CardTitle>
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
                        <p className="text-sm text-muted-foreground">Any image format, any size</p>
                      </div>
                    </label>
                  </div>

                  {originalImage && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label>Compression Quality: {quality[0]}%</Label>
                          <Slider
                            value={quality}
                            onValueChange={setQuality}
                            min={10}
                            max={100}
                            step={5}
                            className="mt-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Lower = Smaller file size, Higher = Better quality
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={compressImage}
                          disabled={isProcessing}
                          className="min-h-[44px]"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Compressing...
                            </>
                          ) : (
                            <>
                              <Zap className="mr-2 h-4 w-4" />
                              Compress Image
                            </>
                          )}
                        </Button>
                        {compressedImage && (
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

              {compressedImage && (
                <>
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
                          <div className="text-2xl font-bold text-green-600">{formatSize(compressedSize)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Saved</div>
                          <div className="text-2xl font-bold text-green-600">{savingsPercent}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Original</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative bg-muted rounded-lg overflow-hidden">
                          <img src={originalImage || ""} alt="Original" className="w-full h-auto" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Compressed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative bg-muted rounded-lg overflow-hidden">
                          <img src={compressedImage || ""} alt="Compressed" className="w-full h-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>About Image Super Compressor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    Compress images dramatically using advanced browser-based compression algorithms. Perfect for
                    optimizing images for websites, reducing storage costs, and improving page load speeds.
                  </p>
                  <p>
                    <strong>Benefits:</strong> Faster website loading, lower bandwidth usage, better SEO, improved user experience,
                    and significant storage savings.
                  </p>
                  <p>
                    <strong>Privacy:</strong> All compression happens in your browser. Your images never leave your device.
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
